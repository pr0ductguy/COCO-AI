"use client";

import { useCallback, useRef, useState } from "react";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  FileText,
  Hash,
  Loader2,
  RotateCcw,
  Sparkles,
  Tag,
  Target,
  UploadCloud,
  User,
  Zap,
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
import { Progress } from "@/components/ui/progress";
import { RiskBadge } from "@/components/shared/status-badge";
import { EXTRACTION_STAGES, simulateExtraction } from "@/lib/ai-extract";
import type { ExtractedFields } from "@/lib/integrations";
import { cn, formatDate } from "@/lib/utils";

type Phase = "idle" | "processing" | "done";

export function LetterIntelligence() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<ExtractedFields | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback((name: string) => {
    setFileName(name);
    setPhase("processing");
    setStage(0);
    setResult(null);
    let s = 0;
    const interval = setInterval(() => {
      s += 1;
      if (s >= EXTRACTION_STAGES.length) {
        clearInterval(interval);
        setResult(simulateExtraction(name));
        setPhase("done");
      } else {
        setStage(s);
      }
    }, 650);
  }, []);

  function handleFiles(files: FileList | null) {
    if (files && files.length > 0) run(files[0].name);
  }

  function reset() {
    setPhase("idle");
    setResult(null);
    setFileName("");
    setStage(0);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Upload / processing column */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Document Upload
            </CardTitle>
            <CardDescription>
              Drop a scanned letter or PDF — COCO AI extracts the key fields
              automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {phase === "idle" && (
              <>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  onClick={() => inputRef.current?.click()}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-medium">Drag & drop a document</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse · PDF, PNG, JPG, TIFF
                    </p>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Or try a sample:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "NUPRC_Gas_Flare_Approval.pdf",
                      "Bonny_Community_Compensation.pdf",
                      "NCDMB_Content_Query.pdf",
                      "Schlumberger_Vendor_PQ.pdf",
                    ].map((f) => (
                      <Button
                        key={f}
                        variant="outline"
                        size="sm"
                        onClick={() => run(f)}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        {f.replace(/_/g, " ").replace(".pdf", "")}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {phase === "processing" && (
              <div className="space-y-5 py-6">
                <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{fileName}</p>
                    <p className="text-xs text-muted-foreground">Processing…</p>
                  </div>
                </div>
                <Progress value={((stage + 1) / EXTRACTION_STAGES.length) * 100} />
                <ul className="space-y-2">
                  {EXTRACTION_STAGES.map((label, i) => (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center gap-2 text-sm transition-colors",
                        i < stage
                          ? "text-emerald-600"
                          : i === stage
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                      )}
                    >
                      {i < stage ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : i === stage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border" />
                      )}
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {phase === "done" && result && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{fileName}</p>
                    <p className="text-xs text-emerald-700">
                      Extraction complete · {result.confidence}% confidence
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Extraction confidence
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={result.confidence} indicatorClassName="bg-emerald-500" />
                    <span className="text-sm font-semibold">{result.confidence}%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={reset}>
                  <RotateCcw className="h-4 w-4" /> Process another document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results column */}
      <div className="lg:col-span-3">
        {phase !== "done" || !result ? (
          <Card className="flex h-full min-h-[420px] items-center justify-center border-dashed">
            <div className="text-center text-muted-foreground">
              <Brain />
              <p className="mt-3 text-sm">
                Extracted fields and AI summary will appear here.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Extracted Fields</CardTitle>
                  <CardDescription>
                    Auto-detected by COCO Intelligence
                  </CardDescription>
                </div>
                <RiskBadge risk={result.riskLevel} />
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ExtractField icon={<User className="h-4 w-4" />} label="Sender" value={result.sender} />
                <ExtractField icon={<Building2 className="h-4 w-4" />} label="Recipient" value={result.recipient} />
                <ExtractField icon={<FileText className="h-4 w-4" />} label="Subject" value={result.subject} className="sm:col-span-2" />
                <ExtractField icon={<Hash className="h-4 w-4" />} label="Reference Number" value={result.referenceNumber} mono />
                <ExtractField icon={<CalendarClock className="h-4 w-4" />} label="Due Date" value={formatDate(result.dueDate)} />
                <ExtractField icon={<Tag className="h-4 w-4" />} label="Stakeholder Type" value={result.stakeholderType} />
                <ExtractField icon={<Target className="h-4 w-4" />} label="Risk Level" value={result.riskLevel} />
                <ExtractField icon={<Zap className="h-4 w-4" />} label="Required Action" value={result.requiredAction} className="sm:col-span-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> AI-Generated Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{result.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm">Create Action</Button>
                  <Button size="sm" variant="outline">Route to Department</Button>
                  <Button size="sm" variant="outline">Save to Register</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function Brain() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
      <Sparkles className="h-7 w-7 text-muted-foreground" />
    </div>
  );
}

function ExtractField({
  icon,
  label,
  value,
  className,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  mono?: boolean;
}) {
  return (
    <div className={cn("rounded-lg border bg-background p-3", className)}>
      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className={cn("text-sm font-medium", mono && "font-mono")}>{value}</p>
    </div>
  );
}
