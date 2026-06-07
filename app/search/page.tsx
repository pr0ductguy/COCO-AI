import { Suspense } from "react";
import { Archive } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { HistoricalSearch } from "@/components/search/historical-search";
import { Badge } from "@/components/ui/badge";
import { archive } from "@/lib/data/store";

export const metadata = { title: "Historical Search · COCO AI" };

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Historical Search & Retrieval"
        description="Enterprise search across every piece of correspondence from 2003 to 2026. Instantly retrieve, filter and summarise records with AI — the answer to 'can we find the 2003 letter?'"
        icon={<Archive className="h-5 w-5" />}
        actions={
          <Badge variant="secondary" className="gap-1.5">
            <Archive className="h-3.5 w-3.5" />
            {archive.length.toLocaleString()} records indexed
          </Badge>
        }
      />
      <Suspense fallback={<div className="text-muted-foreground">Loading search…</div>}>
        <HistoricalSearch records={archive} />
      </Suspense>
    </div>
  );
}
