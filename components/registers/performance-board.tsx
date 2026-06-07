"use client";

import { useState } from "react";
import { Crown, Medal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ComparisonBarChart } from "@/components/charts/charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Officer } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

export function PerformanceBoard({ officers }: { officers: Officer[] }) {
  const [metric, setMetric] = useState<"lettersProcessed" | "avgTurnaroundDays" | "openWorkload">(
    "lettersProcessed"
  );

  const chartData = [...officers]
    .sort((a, b) => (b[metric] as number) - (a[metric] as number))
    .map((o) => ({ label: o.name.split(" ")[0] + " " + o.name.split(" ")[1][0], [metric]: o[metric] }));

  const metricMeta = {
    lettersProcessed: { name: "Letters Processed", color: "hsl(217 91% 60%)", unit: "" },
    avgTurnaroundDays: { name: "Avg Turnaround (days)", color: "hsl(47 96% 51%)", unit: "d" },
    openWorkload: { name: "Open Workload", color: "hsl(359 76% 49%)", unit: "" },
  } as const;

  return (
    <div className="space-y-6">
      {/* Top 3 podium */}
      <div className="grid gap-4 sm:grid-cols-3">
        {officers.slice(0, 3).map((o, i) => (
          <Card
            key={o.id}
            className={cn(
              "relative overflow-hidden",
              i === 0 && "ring-2 ring-amber-400"
            )}
          >
            <div
              className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full opacity-10"
              style={{ backgroundColor: o.avatarColor }}
            />
            <CardContent className="flex items-center gap-4 p-5">
              <div className="relative">
                <Avatar className="h-14 w-14">
                  <AvatarFallback style={{ backgroundColor: o.avatarColor }}>
                    {initials(o.name)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white",
                    i === 0 ? "bg-amber-400" : i === 1 ? "bg-slate-400" : "bg-orange-400"
                  )}
                >
                  {i === 0 ? <Crown className="h-3.5 w-3.5" /> : <Medal className="h-3.5 w-3.5" />}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{o.name}</p>
                <p className="truncate text-xs text-muted-foreground">{o.role}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="success">{o.slaCompliance}% SLA</Badge>
                  <span className="text-xs text-muted-foreground">
                    {o.lettersProcessed} letters
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Leaderboard table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Officer Leaderboard</CardTitle>
            <CardDescription>Ranked by SLA compliance, then turnaround</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8 pl-6">#</TableHead>
                  <TableHead>Officer</TableHead>
                  <TableHead className="text-center">Letters</TableHead>
                  <TableHead className="text-center">Turnaround</TableHead>
                  <TableHead className="text-center">Overdue</TableHead>
                  <TableHead>SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers.map((o, i) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-6 font-semibold text-muted-foreground">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            style={{ backgroundColor: o.avatarColor }}
                            className="text-[10px]"
                          >
                            {initials(o.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="leading-tight">
                          <p className="text-sm font-medium">{o.name}</p>
                          <p className="text-xs text-muted-foreground">{o.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center tabular-nums">{o.lettersProcessed}</TableCell>
                    <TableCell className="text-center tabular-nums">{o.avgTurnaroundDays}d</TableCell>
                    <TableCell className="text-center">
                      {o.overdueCount > 0 ? (
                        <Badge variant="destructive">{o.overdueCount}</Badge>
                      ) : (
                        <Badge variant="success">0</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={o.slaCompliance}
                          className="w-16"
                          indicatorClassName={cn(
                            o.slaCompliance >= 90
                              ? "bg-emerald-500"
                              : o.slaCompliance >= 80
                                ? "bg-amber-500"
                                : "bg-red-500"
                          )}
                        />
                        <span className="w-9 text-right text-xs font-semibold tabular-nums">
                          {o.slaCompliance}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Comparison chart with metric switch */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
            <CardDescription>Compare officers across key metrics</CardDescription>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {(
                [
                  ["lettersProcessed", "Volume"],
                  ["avgTurnaroundDays", "Speed"],
                  ["openWorkload", "Workload"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMetric(key)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                    metric === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ComparisonBarChart
              data={chartData}
              dataKey={metric}
              name={metricMeta[metric].name}
              color={metricMeta[metric].color}
              unit={metricMeta[metric].unit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
