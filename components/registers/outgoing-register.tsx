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
  DeliveryBadge,
  StakeholderBadge,
} from "@/components/shared/status-badge";
import { DEPARTMENTS } from "@/lib/data/constants";
import type { OutgoingCorrespondence } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const DELIVERY_STATUSES = [
  "Draft",
  "Queued",
  "Processing",
  "Dispatched",
  "Delivered",
  "Acknowledged",
  "Returned",
];

export function OutgoingRegister({
  records,
}: {
  records: OutgoingCorrespondence[];
}) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [delivery, setDelivery] = useState("all");
  const [selected, setSelected] = useState<OutgoingCorrespondence | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (
        q &&
        ![r.subject, r.recipient, r.referenceNumber, r.owner]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      if (dept !== "all" && r.department !== dept) return false;
      if (delivery !== "all" && r.deliveryStatus !== delivery) return false;
      return true;
    });
  }, [records, q, dept, delivery]);

  const hasFilters = q || dept !== "all" || delivery !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reference, subject, recipient, owner…"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <FilterSelect value={dept} onChange={setDept} options={DEPARTMENTS} placeholder="Department" allLabel="All Departments" />
        <FilterSelect value={delivery} onChange={setDelivery} options={DELIVERY_STATUSES} placeholder="Delivery" allLabel="All Delivery" className="h-9 w-[160px]" />
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => { setQ(""); setDept("all"); setDelivery("all"); }}>
            <X className="h-4 w-4" /> Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {filtered.length} of {records.length}
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Draft</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead className="text-center">Processing</TableHead>
              <TableHead>Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id} className="cursor-pointer" onClick={() => setSelected(r)}>
                <TableCell className="font-mono text-xs">{r.referenceNumber}</TableCell>
                <TableCell className="max-w-[260px]">
                  <p className="truncate font-medium">{r.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.documentType}</p>
                </TableCell>
                <TableCell className="max-w-[170px]">
                  <p className="truncate text-sm">{r.recipient}</p>
                  <StakeholderBadge type={r.stakeholderType} />
                </TableCell>
                <TableCell className="text-sm">{r.department}</TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {formatDate(r.draftCompletedDate)}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {formatDate(r.sentDate)}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {r.cocoProcessingTime !== null ? (
                    <Badge variant={r.cocoProcessingTime > 5 ? "warning" : "success"}>
                      {r.cocoProcessingTime}d
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <DeliveryBadge status={r.deliveryStatus} />
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                  No correspondence matches your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">{selected.referenceNumber}</Badge>
                  <DeliveryBadge status={selected.deliveryStatus} />
                </div>
                <DialogTitle className="pt-2">{selected.subject}</DialogTitle>
                <DialogDescription>To {selected.recipient}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <Field label="Stakeholder Type" value={selected.stakeholderType} />
                <Field label="Document Type" value={selected.documentType} />
                <Field label="Department" value={selected.department} />
                <Field label="Owner" value={selected.owner} />
                <Field label="Draft Completed" value={formatDate(selected.draftCompletedDate)} />
                <Field label="Submitted To COCO" value={formatDate(selected.submittedToCocoDate)} />
                <Field label="Processed" value={formatDate(selected.processedDate)} />
                <Field label="Sent" value={formatDate(selected.sentDate)} />
                <Field
                  label="COCO Processing Time"
                  value={
                    selected.cocoProcessingTime !== null
                      ? `${selected.cocoProcessingTime} days`
                      : "In progress"
                  }
                />
              </div>
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Summary
                </p>
                <p className="mt-1 text-sm">{selected.summary}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">#{t}</Badge>
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
