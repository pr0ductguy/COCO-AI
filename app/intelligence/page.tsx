import { Brain } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { LetterIntelligence } from "@/components/intelligence/letter-intelligence";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "AI Letter Intelligence · COCO AI" };

export default function IntelligencePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Letter Intelligence"
        description="Upload incoming correspondence and let COCO AI extract structured data — sender, reference, due date, required action, stakeholder and risk — then generate an executive summary."
        icon={<Brain className="h-5 w-5" />}
        actions={
          <Badge variant="secondary" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Azure OpenAI · simulated
          </Badge>
        }
      />
      <LetterIntelligence />
    </div>
  );
}
