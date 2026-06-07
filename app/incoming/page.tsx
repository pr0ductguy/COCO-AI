import { Download, Inbox, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { IncomingRegister } from "@/components/registers/incoming-register";
import { incoming } from "@/lib/data/store";

export const metadata = { title: "Incoming · COCO AI" };

export default function IncomingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Incoming Correspondence"
        description="Inbound register of correspondence received from regulators, government, partners, vendors and communities. Transit time is calculated automatically from stamping to assignment."
        icon={<Inbox className="h-5 w-5" />}
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button>
              <Plus className="h-4 w-4" /> Log Correspondence
            </Button>
          </>
        }
      />
      <IncomingRegister records={incoming} />
    </div>
  );
}
