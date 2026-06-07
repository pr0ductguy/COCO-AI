import { Badge } from "@/components/ui/badge";
import type {
  ActionStatus,
  DeliveryStatus,
  Priority,
  RiskLevel,
  StakeholderType,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ActionStatus, string> = {
  Received: "bg-slate-100 text-slate-700",
  Assigned: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-800",
  "Response Drafted": "bg-violet-100 text-violet-700",
  "Submitted To COCO": "bg-cyan-100 text-cyan-700",
  Sent: "bg-emerald-100 text-emerald-700",
  Closed: "bg-emerald-600/15 text-emerald-700",
};

export function StatusBadge({ status }: { status: ActionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {status}
    </span>
  );
}

const PRIORITY_VARIANT: Record<Priority, string> = {
  Critical: "bg-red-100 text-red-700 ring-1 ring-red-200",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        PRIORITY_VARIANT[priority]
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          priority === "Critical"
            ? "bg-red-500"
            : priority === "High"
              ? "bg-orange-500"
              : priority === "Medium"
                ? "bg-amber-500"
                : "bg-slate-400"
        )}
      />
      {priority}
    </span>
  );
}

const RISK_VARIANT: Record<RiskLevel, "destructive" | "warning" | "secondary"> = {
  Critical: "destructive",
  High: "destructive",
  Medium: "warning",
  Low: "secondary",
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return <Badge variant={RISK_VARIANT[risk]}>{risk} Risk</Badge>;
}

const DELIVERY_STYLES: Record<DeliveryStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Queued: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-800",
  Dispatched: "bg-cyan-100 text-cyan-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Acknowledged: "bg-emerald-600/15 text-emerald-700",
  Returned: "bg-red-100 text-red-700",
};

export function DeliveryBadge({ status }: { status: DeliveryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        DELIVERY_STYLES[status]
      )}
    >
      {status}
    </span>
  );
}

export function StakeholderBadge({ type }: { type: StakeholderType }) {
  return (
    <Badge variant="muted" className="font-normal">
      {type}
    </Badge>
  );
}
