"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSelect } from "@/components/shared/filter-select";
import {
  PriorityBadge,
  StakeholderBadge,
  StatusBadge,
} from "@/components/shared/status-badge";
import { DEPARTMENTS } from "@/lib/data/constants";
import { ACTION_STATUSES, type IncomingCorrespondence } from "@/lib/types";
import { cn, formatDate, daysBetween } from "@/lib/utils";

const STAKEHOLDER_TYPES = [
  "Regulator",
  "Government Ministry",
  "JV Partner",
  "Vendor",
  "Community",
  "NGO",
  "Legal",
];
const PRIORITIES = ["Critical", "High", "Medium", "Low"];

export function IncomingRegister({
  records,
}: {
  records: IncomingCorrespondence[];
}) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [stakeholder, setStakeholder] = useState("all");
  const [selected, setSelected] = useState<IncomingCorrespondence | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (
        q &&
        ![r.subject, r.sender, r.referenceNumber, r.assignedOwner]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      if (dept !== "all" && r.department !== dept) return false;
      if (status !== "all" && r.status !== status) return false;
      if (priority !== "all" && r.priority !== priority) return false;
      if (stakeholder !== "all" && r.stakeholderType !== stakeholder)
        return false;
      return true;
    });
  }, [records, q, dept, status, priority, stakeholder]);

  const hasFilters =
    q || dept !== "all" || status !== "all" || priority !== "all" || stakeholder !== "all";

  function reset() {
    setQ("");
    setDept("all");
    setStatus("all");
    setPriority("all");
    setStakeholder("all");
  }

  return (
    <div className="space-y-4">
      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reference, subject, sender, owner…"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <FilterSelect value={dept} onChange={setDept} options={DEPARTMENTS} placeholder="Department" allLabel="All Departments" />
        <FilterSelect value={status} onChange={setStatus} options={ACTION_STATUSES} placeholder="Status" allLabel="All Statuses" className="h-9 w-[160px]" />
        <FilterSelect value={priority} onChange={setPriority} options={PRIORITIES} placeholder="Priority" allLabel="All Priorities" className="h-9 w-[140px]" />
        <FilterSelect value={stakeholder} onChange={setStakeholder} options={STAKEHOLDER_TYPES} placeholder="Stakeholder" allLabel="All Stakeholders" />
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <X className="h-4 w-4" /> Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {filtered.length} of {records.length}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className="text-center">Transit</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => {
              const overdue =
                daysBetween(new Date(), r.dueDate)! < 0 &&
                r.status !== "Closed";
              return (
                <TableRow
                  key={r.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(r)}
                >
                  <TableCell className="font-mono text-xs">
                    {r.referenceNumber}
                  </TableCell>
                  <TableCell className="max-w-[260px]">
                    <p className="truncate font-medium">{r.subject}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.documentType}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-[170px]">
                    <p className="truncate text-sm">{r.sender}</p>
                    <StakeholderBadge type={r.stakeholderType} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(r.dateReceived)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm">
                    {r.assignedOwner}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "whitespace-nowrap text-sm",
                      overdue && "font-semibold text-red-600"
                    )}
                  >
                    {formatDate(r.dueDate)}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {r.transitTime !== null ? (
                      <Badge variant={r.transitTime > 5 ? "warning" : "muted"}>
                        {r.transitTime}d
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={r.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                  No correspondence matches your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {selected.referenceNumber}
                  </Badge>
                  <PriorityBadge priority={selected.priority} />
                  <StatusBadge status={selected.status} />
                </div>
                <DialogTitle className="pt-2">{selected.subject}</DialogTitle>
                <DialogDescription>
                  From {selected.sender}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <Field label="Stakeholder Type" value={selected.stakeholderType} />
                <Field label="Document Type" value={selected.documentType} />
                <Field label="Department" value={selected.department} />
                <Field label="Date Received" value={formatDate(selected.dateReceived)} />
                <Field label="Date Stamped" value={formatDate(selected.dateStamped)} />
                <Field label="Date Assigned" value={formatDate(selected.dateAssigned)} />
                <Field label="Assigned Owner" value={selected.assignedOwner} />
                <Field label="Due Date" value={formatDate(selected.dueDate)} />
                <Field
                  label="Transit Time"
                  value={
                    selected.transitTime !== null
                      ? `${selected.transitTime} days`
                      : "Pending assignment"
                  }
                />
              </div>

              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  AI Summary
                </p>
                <p className="mt-1 text-sm">{selected.summary}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    #{t}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
