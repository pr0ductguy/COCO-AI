import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PerformanceBoard } from "@/components/registers/performance-board";
import { getOfficerLeaderboard } from "@/lib/analytics";

export const metadata = { title: "Performance · COCO AI" };

export default function PerformancePage() {
  const officers = getOfficerLeaderboard();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Dashboard"
        description="Officer-level performance across volume, turnaround, SLA compliance, overdue load and active workload. Identify top performers and capacity bottlenecks."
        icon={<Trophy className="h-5 w-5" />}
      />
      <PerformanceBoard officers={officers} />
    </div>
  );
}
