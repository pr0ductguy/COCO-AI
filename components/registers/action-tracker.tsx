"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BellRing, CheckCircle2, Search, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FilterSelect } from "@/components/shared/filter-select";
import { PriorityBadge, StatusBadge } from "@/components/shared/status-badge";
import { DEPARTMENTS } from "@/lib/data/constants";
import { ACTION_STATUSES, type ActionItem } from "@/lib/types";
import { cn, daysBetween, formatDate } from "@/lib/utils";

type Reminder = { kind: "overdue" | "due-soon" | "on-track"; label: string };

function reminderFor(a: ActionItem): Reminder {
  if (a.status === "Closed" || a.status === "Sent")
    return { kind: "on-track", label: "Complete" };
  const days = daysBetween(new Date(), a.dueDate);
  if (days === null) return { kind: "on-track", label: "—" };
  if (days < 0) return { kind: "overdue", label: `${-days}d overdue` };
  if (days <= 3) return { kind: "due-soon", label: `due in ${days}d` };
  return { kind: "on-track", label: `due in ${days}d` };
}

export function ActionTracker({ actions }: { actions: ActionItem[] }) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [tab, setTab] = useState<"all" | "overdue" | "due-soon">("all");

  const enriched = useMemo(
    () => actions.map((a) => ({ ...a, reminder: reminderFor(a) })),
    [actions]
  );

  const overdueCount = enriched.filter((a) => a.reminder.kind === "overdue").length;
  const dueSoonCount = enriched.filter((a) => a.reminder.kind === "due-soon").length;

  const filtered = useMemo(() => {
    return enriched.filter((a) => {
      if (tab === "overdue" && a.reminder.kind !== "overdue") return false;
      if (tab === "due-soon" && a.reminder.kind !== "due-soon") return false;
      if (
        q &&
        ![a.correspondenceRef, a.description, a.owner]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      if (dept !== "all" && a.department !== dept) return false;
      if (status !== "all" && a.status !== status) return false;
      return true;
    });
  }, [enriched, q, dept, status, tab]);

  return (
    <div className="space-y-4">
      {/* Reminder summary tiles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          onClick={() => setTab("all")}
          className={cn(
            "flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/40",
            tab === "all" && "ring-2 ring-primary"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{enriched.length}</p>
            <p className="text-xs text-muted-foreground">Total actions</p>
          </div>
        </button>
        <button
          onClick={() => setTab("due-soon")}
          className={cn(
            "flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/40",
            tab === "due-soon" && "ring-2 ring-amber-400"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{dueSoonCount}</p>
            <p className="text-xs text-muted-foreground">Due within 3 days</p>
          </div>
        </button>
        <button
          onClick={() => setTab("overdue")}
          className={cn(
            "flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/40",
            tab === "overdue" && "ring-2 ring-red-400"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{overdueCount}</p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search action, reference or owner…"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <FilterSelect value={dept} onChange={setDept} options={DEPARTMENTS} placeholder="Department" allLabel="All Departments" />
        <FilterSelect value={status} onChange={setStatus} options={ACTION_STATUSES} placeholder="Status" allLabel="All Statuses" className="h-9 w-[160px]" />
        {(q || dept !== "all" || status !== "all" || tab !== "all") && (
          <Button variant="ghost" size="sm" onClick={() => { setQ(""); setDept("all"); setStatus("all"); setTab("all"); }}>
            <X className="h-4 w-4" /> Clear
          </Button>
        )}
        <div className="ml-auto text-xs text-muted-foreground">
          {filtered.length} actions
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Reference</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Reminder</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px]">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <span
                    className={cn(
                      "block h-2 w-2 rounded-full",
                      a.reminder.kind === "overdue"
                        ? "bg-red-500 animate-pulse"
                        : a.reminder.kind === "due-soon"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    )}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{a.correspondenceRef}</TableCell>
                <TableCell className="max-w-[280px]">
                  <p className="truncate text-sm font-medium">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.department} · {a.direction}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm">{a.owner}</TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {formatDate(a.dueDate)}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-medium",
                      a.reminder.kind === "overdue"
                        ? "text-red-600"
                        : a.reminder.kind === "due-soon"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                    )}
                  >
                    {a.reminder.kind !== "on-track" && <BellRing className="h-3 w-3" />}
                    {a.reminder.label}
                  </span>
                </TableCell>
                <TableCell><PriorityBadge priority={a.priority} /></TableCell>
                <TableCell><StatusBadge status={a.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={Math.max(0, Math.min(100, a.progress))}
                      indicatorClassName={
                        a.reminder.kind === "overdue" ? "bg-red-500" : "bg-primary"
                      }
                    />
                    <span className="w-8 text-right text-xs text-muted-foreground">
                      {Math.max(0, Math.min(100, a.progress))}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                  No actions match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
