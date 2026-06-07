import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Gauge,
  Inbox,
  ListChecks,
  Send,
  Timer,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DepartmentBarChart,
  DonutChart,
  VolumeTrendChart,
} from "@/components/charts/charts";
import { PriorityBadge, StatusBadge } from "@/components/shared/status-badge";
import {
  getBottlenecks,
  getDepartmentPerformance,
  getExecutiveInsights,
  getKpis,
  getStakeholderBreakdown,
  getVolumeTrend,
} from "@/lib/analytics";
import { formatDate, formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const kpis = getKpis();
  const trend = getVolumeTrend();
  const departments = getDepartmentPerformance();
  const stakeholders = getStakeholderBreakdown();
  const bottlenecks = getBottlenecks(6);
  const insights = getExecutiveInsights().slice(0, 2);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Dashboard"
        description="Enterprise-wide view of Shell correspondence operations. Real-time pipeline health, SLA performance and emerging bottlenecks."
        icon={<Gauge className="h-5 w-5" />}
        actions={
          <Button asChild variant="outline">
            <Link href="/reporting">
              View reporting <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Incoming"
          value={formatNumber(kpis.totalIncoming)}
          icon={<Inbox className="h-5 w-5" />}
          accent="info"
          trend={{ value: "+18% QoQ", direction: "up", good: true }}
          hint="this quarter"
        />
        <KpiCard
          label="Outgoing"
          value={formatNumber(kpis.totalOutgoing)}
          icon={<Send className="h-5 w-5" />}
          accent="primary"
          trend={{ value: "+9% QoQ", direction: "up", good: true }}
          hint="this quarter"
        />
        <KpiCard
          label="Open Actions"
          value={formatNumber(kpis.openActions)}
          icon={<ListChecks className="h-5 w-5" />}
          accent="warning"
          hint={`${kpis.criticalOpen} critical`}
        />
        <KpiCard
          label="Overdue Actions"
          value={formatNumber(kpis.overdueActions)}
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="destructive"
          trend={{ value: "-12% vs last mo", direction: "down", good: true }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="SLA Compliance"
          value={`${kpis.slaCompliance}%`}
          icon={<Gauge className="h-5 w-5" />}
          accent="success"
          trend={{ value: "+4 pts", direction: "up", good: true }}
          hint="target 90%"
        />
        <KpiCard
          label="Avg Response Time"
          value={`${kpis.avgResponseTimeDays}d`}
          icon={<Clock className="h-5 w-5" />}
          accent="info"
          trend={{ value: "-1.6d", direction: "down", good: true }}
        />
        <KpiCard
          label="Avg Transit Time"
          value={`${kpis.avgTransitTimeDays}d`}
          icon={<Timer className="h-5 w-5" />}
          accent="primary"
          hint="received → assigned"
        />
        <KpiCard
          label="Avg COCO Processing"
          value={`${kpis.avgProcessingTimeDays}d`}
          icon={<Timer className="h-5 w-5" />}
          accent="warning"
          hint="submitted → processed"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Correspondence Volume Trend</CardTitle>
            <CardDescription>
              Incoming vs outgoing over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VolumeTrendChart data={trend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stakeholder Mix</CardTitle>
            <CardDescription>Incoming by stakeholder type</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={stakeholders} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Department performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Action volume and overdue load by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentBarChart data={departments} />
          </CardContent>
        </Card>

        {/* Top bottlenecks */}
        <Card>
          <CardHeader>
            <CardTitle>Top Bottlenecks</CardTitle>
            <CardDescription>Oldest open actions in the pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bottlenecks.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between gap-2 rounded-lg border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {b.correspondenceRef}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {b.owner} · {b.department}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <PriorityBadge priority={b.priority} />
                  <span className="text-xs font-semibold text-red-600">
                    {b.ageDays > 0 ? `${b.ageDays}d overdue` : `due in ${-b.ageDays}d`}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insights teaser + bottleneck table */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recently Overdue Actions</CardTitle>
              <CardDescription>Requires executive attention</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/actions">
                All actions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bottlenecks.slice(0, 5).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <StatusBadge status={b.status} />
                    <p className="truncate text-sm">{b.description}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    due {formatDate(b.dueDate)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle>AI Executive Insights</CardTitle>
            <CardDescription>Generated by COCO Intelligence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((i) => (
              <div key={i.title} className="rounded-lg border bg-background p-3">
                <p className="text-sm font-semibold leading-snug">{i.title}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {i.detail}
                </p>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/reporting">
                Full executive report <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
