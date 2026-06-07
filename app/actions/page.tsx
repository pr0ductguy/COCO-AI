import { ListChecks } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ActionTracker } from "@/components/registers/action-tracker";
import { actions } from "@/lib/data/store";

export const metadata = { title: "Action Tracker · COCO AI" };

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Action Tracker"
        description="Every correspondence becomes a tracked action. Monitor ownership, due dates, progress and reminders across the full lifecycle from Received to Closed."
        icon={<ListChecks className="h-5 w-5" />}
      />
      <ActionTracker actions={actions} />
    </div>
  );
}
