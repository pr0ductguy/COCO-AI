import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; direction: "up" | "down" | "flat"; good?: boolean };
  accent?: "primary" | "success" | "warning" | "destructive" | "info";
  hint?: string;
}

const ACCENTS: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-100 text-emerald-600",
  warning: "bg-amber-100 text-amber-600",
  destructive: "bg-red-100 text-red-600",
  info: "bg-blue-100 text-blue-600",
};

export function KpiCard({
  label,
  value,
  icon,
  trend,
  accent = "primary",
  hint,
}: KpiCardProps) {
  const TrendIcon =
    trend?.direction === "up"
      ? ArrowUpRight
      : trend?.direction === "down"
        ? ArrowDownRight
        : Minus;
  const trendGood = trend?.good ?? trend?.direction === "up";

  return (
    <Card className="relative overflow-hidden p-5 transition-shadow hover:shadow-md animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            ACCENTS[accent]
          )}
        >
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              trendGood ? "text-emerald-600" : "text-red-600"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {trend.value}
          </span>
        )}
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  );
}
