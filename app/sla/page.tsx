import { AlertTriangle, Clock, Gauge, Target } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/shared/kpi-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GaugeChart,
  SlaTrendChart,
} from "@/components/charts/charts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  getDepartmentPerformance,
  getKpis,
  getSlaTrend,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const metadata = { title: "SLA Monitor · COCO AI" };

export default function SlaPage() {
  const kpis = getKpis();
  const trend = getSlaTrend();
  const departments = getDepartmentPerformance();

  return (
    <div className="space-y-6">
      <PageHeader
        title="SLA Monitor"
        description="Service-level performance across COCO. Track compliance against the 90% target, overdue load, average handling time and team-by-team comparison."
        icon={<Gauge className="h-5 w-5" />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="SLA Compliance"
          value={`${kpis.slaCompliance}%`}
          icon={<Target className="h-5 w-5" />}
          accent="success"
          trend={{ value: "+4 pts", direction: "up", good: true }}
          hint="target 90%"
        />
        <KpiCard
          label="Overdue Actions"
          value={kpis.overdueActions}
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="destructive"
        />
        <KpiCard
          label="Avg Handling Time"
          value={`${kpis.avgResponseTimeDays}d`}
          icon={<Clock className="h-5 w-5" />}
          accent="info"
          trend={{ value: "-1.6d", direction: "down", good: true }}
        />
        <KpiCard
          label="Critical Open"
          value={kpis.criticalOpen}
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Compliance</CardTitle>
            <CardDescription>Current period vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <GaugeChart value={kpis.slaCompliance} label="SLA Met" />
            <p className="text-center text-xs text-muted-foreground">
              {kpis.slaCompliance >= 90
                ? "Above the 90% executive target"
                : "Below the 90% executive target"}
            </p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>SLA Compliance Trend</CardTitle>
            <CardDescription>Monthly compliance against target</CardDescription>
          </CardHeader>
          <CardContent>
            <SlaTrendChart data={trend} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Comparison</CardTitle>
          <CardDescription>
            SLA performance and overdue load by department
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departments.map((d) => (
            <div key={d.department} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{d.department}</span>
                <div className="flex items-center gap-3">
                  {d.overdue > 0 && (
                    <Badge variant="destructive">{d.overdue} overdue</Badge>
                  )}
                  <span
                    className={cn(
                      "w-12 text-right font-semibold tabular-nums",
                      d.sla >= 90
                        ? "text-emerald-600"
                        : d.sla >= 80
                          ? "text-amber-600"
                          : "text-red-600"
                    )}
                  >
                    {d.sla}%
                  </span>
                </div>
              </div>
              <Progress
                value={d.sla}
                indicatorClassName={cn(
                  d.sla >= 90
                    ? "bg-emerald-500"
                    : d.sla >= 80
                      ? "bg-amber-500"
                      : "bg-red-500"
                )}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
