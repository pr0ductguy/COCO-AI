import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Download,
  Minus,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DonutChart,
  VolumeTrendChart,
  YearBarChart,
} from "@/components/charts/charts";
import {
  getArchiveByYear,
  getExecutiveInsights,
  getKpis,
  getStakeholderBreakdown,
  getStatusDistribution,
  getVolumeTrend,
} from "@/lib/analytics";

export const metadata = { title: "Executive Reporting · COCO AI" };

export default function ReportingPage() {
  const insights = getExecutiveInsights();
  const trend = getVolumeTrend();
  const stakeholders = getStakeholderBreakdown();
  const statuses = getStatusDistribution();
  const byYear = getArchiveByYear();
  const kpis = getKpis();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Reporting"
        description="AI-generated insights and management summaries for COCO leadership. Quarter-over-quarter trends, performance shifts and emerging risks at a glance."
        icon={<BarChart3 className="h-5 w-5" />}
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export Brief
          </Button>
        }
      />

      {/* Management summary band */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Management Summary — Q2 2026</p>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                Correspondence throughput is up with SLA compliance at{" "}
                <span className="font-semibold text-foreground">{kpis.slaCompliance}%</span>,
                six consecutive months above target. Assignment times have fallen
                sharply following automated routing. Residual risk is concentrated
                in Community Relations and Legal & Compliance, where a focused
                clearance sprint is recommended.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insight cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((i) => {
          const Icon =
            i.trend === "up" ? ArrowUpRight : i.trend === "down" ? ArrowDownRight : Minus;
          return (
            <Card key={i.title} className="animate-fade-in">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold leading-snug">{i.title}</p>
                  <Badge
                    variant={
                      i.sentiment === "positive"
                        ? "success"
                        : i.sentiment === "negative"
                          ? "destructive"
                          : "secondary"
                    }
                    className="shrink-0 gap-1"
                  >
                    <Icon className="h-3 w-3" />
                    {i.delta}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Volume Trend</CardTitle>
            <CardDescription>Incoming vs outgoing, last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <VolumeTrendChart data={trend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Status</CardTitle>
            <CardDescription>Actions by lifecycle stage</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={statuses} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Historical Volume by Year</CardTitle>
            <CardDescription>Archived correspondence, 2003–2026</CardDescription>
          </CardHeader>
          <CardContent>
            <YearBarChart data={byYear} />
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
    </div>
  );
}
