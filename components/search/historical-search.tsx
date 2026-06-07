"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  Filter,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSelect } from "@/components/shared/filter-select";
import { StakeholderBadge, StatusBadge } from "@/components/shared/status-badge";
import { DEPARTMENTS, DOCUMENT_TYPES } from "@/lib/data/constants";
import type { ArchiveRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const STAKEHOLDER_TYPES = [
  "Regulator",
  "Government Ministry",
  "JV Partner",
  "Vendor",
  "Community",
  "NGO",
  "Legal",
];
const STATUSES = [
  "Received",
  "Assigned",
  "In Progress",
  "Response Drafted",
  "Submitted To COCO",
  "Sent",
  "Closed",
];

export function HistoricalSearch({ records }: { records: ArchiveRecord[] }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [year, setYear] = useState("all");
  const [sender, setSender] = useState("all");
  const [recipient, setRecipient] = useState("all");
  const [dept, setDept] = useState("all");
  const [stakeholder, setStakeholder] = useState("all");
  const [docType, setDocType] = useState("all");
  const [status, setStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(true);

  const years = useMemo(
    () =>
      Array.from(new Set(records.map((r) => String(new Date(r.date).getFullYear()))))
        .sort()
        .reverse(),
    [records]
  );
  const senders = useMemo(
    () => Array.from(new Set(records.map((r) => r.sender))).sort(),
    [records]
  );
  const recipients = useMemo(
    () => Array.from(new Set(records.map((r) => r.recipient))).sort(),
    [records]
  );

  const filtered = useMemo(() => {
    return records.filter((r) => {
      if (
        q &&
        ![r.title, r.sender, r.recipient, r.referenceNumber, r.summary, ...r.tags]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      )
        return false;
      if (year !== "all" && !r.date.startsWith(year)) return false;
      if (sender !== "all" && r.sender !== sender) return false;
      if (recipient !== "all" && r.recipient !== recipient) return false;
      if (dept !== "all" && r.department !== dept) return false;
      if (stakeholder !== "all" && r.stakeholderType !== stakeholder) return false;
      if (docType !== "all" && r.documentType !== docType) return false;
      if (status !== "all" && r.status !== status) return false;
      return true;
    });
  }, [records, q, year, sender, recipient, dept, stakeholder, docType, status]);

  const results = filtered.slice(0, 60);

  // AI summary panel content derived from current result set.
  const aiSummary = useMemo(() => buildAiSummary(filtered, q), [filtered, q]);

  function clearAll() {
    setYear("all");
    setSender("all");
    setRecipient("all");
    setDept("all");
    setStakeholder("all");
    setDocType("all");
    setStatus("all");
  }
  const activeFilters =
    [year, sender, recipient, dept, stakeholder, docType, status].filter(
      (v) => v !== "all"
    ).length;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Try "NUPRC gas flare approval", "community compensation", "vendor registration"…'
              className="h-12 w-full rounded-lg border border-input bg-background pl-11 pr-4 text-base outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            className="h-12"
            onClick={() => setShowFilters((s) => !s)}
          >
            <Filter className="h-4 w-4" /> Filters
            {activeFilters > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
            <FilterSelect value={year} onChange={setYear} options={years} placeholder="Year" allLabel="All Years" className="h-9 w-[120px]" />
            <FilterSelect value={sender} onChange={setSender} options={senders} placeholder="Sender" allLabel="Any Sender" className="h-9 w-[180px]" />
            <FilterSelect value={recipient} onChange={setRecipient} options={recipients} placeholder="Recipient" allLabel="Any Recipient" className="h-9 w-[180px]" />
            <FilterSelect value={dept} onChange={setDept} options={DEPARTMENTS} placeholder="Department" allLabel="All Departments" />
            <FilterSelect value={stakeholder} onChange={setStakeholder} options={STAKEHOLDER_TYPES} placeholder="Stakeholder" allLabel="All Stakeholders" />
            <FilterSelect value={docType} onChange={setDocType} options={DOCUMENT_TYPES} placeholder="Doc Type" allLabel="All Types" className="h-9 w-[140px]" />
            <FilterSelect value={status} onChange={setStatus} options={STATUSES} placeholder="Status" allLabel="All Statuses" className="h-9 w-[160px]" />
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X className="h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Results */}
        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              records found across 2003–2026
              {results.length < filtered.length && (
                <span className="text-muted-foreground"> · showing {results.length}</span>
              )}
            </p>
          </div>

          {results.map((r) => (
            <Link key={r.id} href={`/search/${r.id}`}>
              <Card className="group cursor-pointer transition-all hover:border-primary/40 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {r.referenceNumber}
                        </Badge>
                        <Badge variant={r.direction === "Incoming" ? "default" : "secondary"}>
                          {r.direction}
                        </Badge>
                      </div>
                      <h3 className="mt-1.5 font-semibold leading-snug group-hover:text-primary">
                        {r.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {r.summary}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(r.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {r.sender}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" /> {r.recipient}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> {r.department}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <StakeholderBadge type={r.stakeholderType} />
                    <StatusBadge status={r.status} />
                    {r.tags.slice(0, 3).map((t) => (
                      <Badge key={t} variant="secondary" className="font-normal">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {results.length === 0 && (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Search className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-3">No records match your search.</p>
                <p className="text-sm">Try broadening your filters or query.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Summary panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> AI Search Summary
              </CardTitle>
              <CardDescription>
                Synthesised across the current result set
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{aiSummary.narrative}</p>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Key facets
                </p>
                {aiSummary.facets.map((f) => (
                  <div key={f.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{f.label}</span>
                    <span className="font-medium">{f.value}</span>
                  </div>
                ))}
              </div>

              {aiSummary.topTags.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Recurring themes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {aiSummary.topTags.map((t) => (
                      <Badge key={t} variant="default" className="font-normal">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function buildAiSummary(records: ArchiveRecord[], query: string) {
  if (records.length === 0) {
    return {
      narrative:
        "No correspondence matched the current query. Adjust filters or broaden your search terms to surface relevant historical records.",
      facets: [],
      topTags: [] as string[],
    };
  }
  const years = records.map((r) => new Date(r.date).getFullYear());
  const minY = Math.min(...years);
  const maxY = Math.max(...years);
  const incoming = records.filter((r) => r.direction === "Incoming").length;

  const stakeholderCount = new Map<string, number>();
  const tagCount = new Map<string, number>();
  for (const r of records) {
    stakeholderCount.set(r.stakeholderType, (stakeholderCount.get(r.stakeholderType) ?? 0) + 1);
    for (const t of r.tags) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
  }
  const topStakeholder = [...stakeholderCount.entries()].sort((a, b) => b[1] - a[1])[0];
  const topTags = [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);

  const narrative = `Found ${records.length} correspondence records${
    query ? ` relating to "${query}"` : ""
  } spanning ${minY}–${maxY}. ${incoming} are inbound and ${
    records.length - incoming
  } outbound. The dominant stakeholder group is ${topStakeholder[0].toLowerCase()} (${
    topStakeholder[1]
  } records). The earliest matching record can be retrieved instantly — demonstrating full auditability of the archive back to 2003.`;

  return {
    narrative,
    facets: [
      { label: "Records", value: String(records.length) },
      { label: "Date range", value: `${minY}–${maxY}` },
      { label: "Inbound / Outbound", value: `${incoming} / ${records.length - incoming}` },
      { label: "Top stakeholder", value: topStakeholder[0] },
    ],
    topTags,
  };
}
