import { actions, archive, incoming, officers, outgoing } from "@/lib/data/store";
import { isOverdue, type Department } from "@/lib/types";
import { REFERENCE_DATE } from "@/lib/utils";

// ============================================================================
// Aggregations powering the dashboards. Pure functions over the mock store —
// the same shape an API/Power BI dataset would later return.
// ============================================================================

export interface KpiSummary {
  totalIncoming: number;
  totalOutgoing: number;
  openActions: number;
  overdueActions: number;
  slaCompliance: number;
  avgResponseTimeDays: number;
  avgTransitTimeDays: number;
  avgProcessingTimeDays: number;
  criticalOpen: number;
}

export function getKpis(): KpiSummary {
  const openActions = actions.filter(
    (a) => a.status !== "Closed" && a.status !== "Sent"
  ).length;
  const overdueActions = actions.filter((a) => isOverdue(a)).length;

  const closedOrOnTrack = actions.filter((a) => !isOverdue(a)).length;
  const slaCompliance = Math.round((closedOrOnTrack / actions.length) * 100);

  const transitTimes = incoming
    .map((r) => r.transitTime)
    .filter((t): t is number => t !== null);
  const avgTransit =
    transitTimes.reduce((s, t) => s + t, 0) / (transitTimes.length || 1);

  const procTimes = outgoing
    .map((r) => r.cocoProcessingTime)
    .filter((t): t is number => t !== null);
  const avgProc = procTimes.reduce((s, t) => s + t, 0) / (procTimes.length || 1);

  return {
    totalIncoming: incoming.length,
    totalOutgoing: outgoing.length,
    openActions,
    overdueActions,
    slaCompliance,
    avgResponseTimeDays: Number(((avgTransit + avgProc) / 1.5).toFixed(1)),
    avgTransitTimeDays: Number(avgTransit.toFixed(1)),
    avgProcessingTimeDays: Number(avgProc.toFixed(1)),
    criticalOpen: actions.filter(
      (a) => a.priority === "Critical" && a.status !== "Closed"
    ).length,
  };
}

// Volume trend over the last 6 months (combined incoming + outgoing).
export function getVolumeTrend() {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const now = new Date("2026-06-07");
  const buckets: { month: string; incoming: number; outgoing: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = months[d.getMonth()];
    const inc = incoming.filter((r) => r.dateReceived.startsWith(key)).length;
    const out = outgoing.filter((r) => r.draftCompletedDate.startsWith(key)).length;
    buckets.push({ month: label, incoming: inc, outgoing: out });
  }
  return buckets;
}

// Department performance — volume, overdue, SLA.
export function getDepartmentPerformance() {
  const map = new Map<
    Department,
    { department: Department; total: number; overdue: number; onTime: number }
  >();
  for (const a of actions) {
    const cur =
      map.get(a.department) ??
      { department: a.department, total: 0, overdue: 0, onTime: 0 };
    cur.total += 1;
    if (isOverdue(a)) cur.overdue += 1;
    else cur.onTime += 1;
    map.set(a.department, cur);
  }
  return Array.from(map.values())
    .map((d) => ({
      ...d,
      sla: Math.round((d.onTime / (d.total || 1)) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}

// Top bottlenecks — oldest open items still sitting in the pipeline.
export function getBottlenecks(limit = 6) {
  return actions
    .filter((a) => a.status !== "Closed" && a.status !== "Sent")
    .map((a) => {
      const ageDays = Math.round(
        (REFERENCE_DATE.getTime() - new Date(a.dueDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return { ...a, ageDays };
    })
    .sort((a, b) => b.ageDays - a.ageDays)
    .slice(0, limit);
}

export function getStakeholderBreakdown() {
  const map = new Map<string, number>();
  for (const r of incoming) {
    map.set(r.stakeholderType, (map.get(r.stakeholderType) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getStatusDistribution() {
  const map = new Map<string, number>();
  for (const a of actions) {
    map.set(a.status, (map.get(a.status) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

// Archive volume by year (historical search context, 2003–2026).
export function getArchiveByYear() {
  const map = new Map<number, number>();
  for (const r of archive) {
    const y = new Date(r.date).getFullYear();
    map.set(y, (map.get(y) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([year, count]) => ({ year: String(year), count }))
    .sort((a, b) => a.year.localeCompare(b.year));
}

export function getOfficerLeaderboard() {
  return [...officers].sort((a, b) => {
    if (b.slaCompliance !== a.slaCompliance)
      return b.slaCompliance - a.slaCompliance;
    return a.avgTurnaroundDays - b.avgTurnaroundDays;
  });
}

// SLA trend (monthly compliance %) for the SLA monitor.
export function getSlaTrend() {
  const base = [88, 84, 90, 86, 92, 94];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((m, i) => ({ month: m, compliance: base[i], target: 90 }));
}

// Executive narrative insights (simulated AI/analytics summaries).
export interface ExecInsight {
  title: string;
  detail: string;
  trend: "up" | "down" | "flat";
  delta: string;
  sentiment: "positive" | "negative" | "neutral";
}

export function getExecutiveInsights(): ExecInsight[] {
  return [
    {
      title: "Regulatory correspondence increased 18% this quarter",
      detail:
        "Driven by NUPRC production reporting queries and PIA compliance directives. Recommend pre-positioning Regulatory Affairs capacity ahead of Q3 filing deadlines.",
      trend: "up",
      delta: "+18%",
      sentiment: "neutral",
    },
    {
      title: "Average assignment time reduced from 5.2 to 1.8 days",
      detail:
        "Automated stamping and routing cut transit time by 65%. Fastest improvement observed in Regulatory Affairs and Government Relations.",
      trend: "down",
      delta: "-65%",
      sentiment: "positive",
    },
    {
      title: "SLA compliance reached 94% — above the 90% target",
      detail:
        "Sixth consecutive month above target. Community Relations remains the primary drag at 81% due to multi-party settlement negotiations.",
      trend: "up",
      delta: "+4 pts",
      sentiment: "positive",
    },
    {
      title: "Overdue critical actions concentrated in 2 departments",
      detail:
        "62% of overdue critical items sit with Community Relations and Legal & Compliance. A focused clearance sprint could recover an estimated 11 working days.",
      trend: "flat",
      delta: "2 depts",
      sentiment: "negative",
    },
  ];
}

export const CHART_COLORS = [
  "hsl(359 76% 49%)",
  "hsl(217 91% 60%)",
  "hsl(47 96% 51%)",
  "hsl(142 71% 45%)",
  "hsl(262 83% 58%)",
  "hsl(199 89% 48%)",
  "hsl(24 95% 53%)",
  "hsl(330 81% 60%)",
  "hsl(173 80% 40%)",
];
