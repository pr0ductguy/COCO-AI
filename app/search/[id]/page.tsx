import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock,
  Download,
  FileText,
  History,
  Share2,
  Sparkles,
  User,
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
import { Separator } from "@/components/ui/separator";
import {
  StakeholderBadge,
  StatusBadge,
} from "@/components/shared/status-badge";
import { archive, getArchiveById } from "@/lib/data/store";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return archive.map((r) => ({ id: r.id }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = getArchiveById(id);
  if (!record) notFound();

  const related = archive
    .filter(
      (r) =>
        r.id !== record.id &&
        (r.stakeholderType === record.stakeholderType ||
          r.tags.some((t) => record.tags.includes(t)))
    )
    .slice(0, 4);

  const timeline = [
    { label: "Correspondence dated", date: record.date, icon: CalendarDays },
    { label: "Received & stamped by COCO", date: record.date, icon: FileText },
    { label: "Routed to " + record.department, date: record.date, icon: Building2 },
    { label: "Current status: " + record.status, date: record.date, icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/search">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      {/* Header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {record.referenceNumber}
            </Badge>
            <Badge variant={record.direction === "Incoming" ? "default" : "secondary"}>
              {record.direction}
            </Badge>
            <StatusBadge status={record.status} />
            <StakeholderBadge type={record.stakeholderType} />
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{record.title}</h1>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Meta icon={<User className="h-4 w-4" />} label="Sender" value={record.sender} />
            <Meta icon={<Building2 className="h-4 w-4" />} label="Recipient" value={record.recipient} />
            <Meta icon={<CalendarDays className="h-4 w-4" />} label="Date" value={formatDate(record.date)} />
            <Meta icon={<FileText className="h-4 w-4" />} label="Department" value={record.department} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* AI summary */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> AI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{record.summary}</p>
            </CardContent>
          </Card>

          {/* Document properties */}
          <Card>
            <CardHeader>
              <CardTitle>Correspondence Profile</CardTitle>
              <CardDescription>Full record metadata & audit detail</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
              <Prop label="Reference Number" value={record.referenceNumber} mono />
              <Prop label="Direction" value={record.direction} />
              <Prop label="Document Type" value={record.documentType} />
              <Prop label="Stakeholder Type" value={record.stakeholderType} />
              <Prop label="Department" value={record.department} />
              <Prop label="Status" value={record.status} />
              <Prop label="Date" value={formatDate(record.date)} />
              <Prop label="Pages" value={`${record.pages}`} />
              <Prop label="File Size" value={`${(record.fileSizeKb / 1024).toFixed(1)} MB`} />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags & Themes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {record.tags.map((t) => (
                <Badge key={t} variant="secondary" className="font-normal">
                  #{t}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: timeline + related */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-4 w-4" /> Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-5 border-l border-border pl-5">
                {timeline.map((t, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.45rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-background">
                      <t.icon className="h-3 w-3" />
                    </span>
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(t.date)}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Correspondence</CardTitle>
              <CardDescription>Similar stakeholder or theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/search/${r.id}`}
                  className="block rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
                >
                  <p className="truncate text-sm font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(r.date)} · {r.stakeholderType}
                  </p>
                </Link>
              ))}
              {related.length === 0 && (
                <p className="text-sm text-muted-foreground">No related records.</p>
              )}
              <Separator className="my-2" />
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/search">Search the full archive</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}

function Prop({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`font-medium ${mono ? "font-mono text-xs" : ""}`}>{value}</p>
    </div>
  );
}
