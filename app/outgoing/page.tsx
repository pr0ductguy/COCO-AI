import { Download, Plus, Send } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { OutgoingRegister } from "@/components/registers/outgoing-register";
import { outgoing } from "@/lib/data/store";

export const metadata = { title: "Outgoing · COCO AI" };

export default function OutgoingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Outgoing Correspondence"
        description="Outbound register tracking Shell correspondence from draft to delivery. COCO processing time is calculated automatically from submission to processing."
        icon={<Send className="h-5 w-5" />}
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button>
              <Plus className="h-4 w-4" /> New Dispatch
            </Button>
          </>
        }
      />
      <OutgoingRegister records={outgoing} />
    </div>
  );
}
