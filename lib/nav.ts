import {
  Archive,
  BarChart3,
  Brain,
  FileText,
  Gauge,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Send,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
  group: "Overview" | "Operations" | "Intelligence";
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Executive Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Enterprise-wide correspondence overview",
    group: "Overview",
  },
  {
    title: "Incoming",
    href: "/incoming",
    icon: Inbox,
    description: "Inbound correspondence register",
    group: "Operations",
  },
  {
    title: "Outgoing",
    href: "/outgoing",
    icon: Send,
    description: "Outbound correspondence register",
    group: "Operations",
  },
  {
    title: "Action Tracker",
    href: "/actions",
    icon: ListChecks,
    description: "Every correspondence as an action",
    group: "Operations",
  },
  {
    title: "SLA Monitor",
    href: "/sla",
    icon: Gauge,
    description: "Compliance, overdue & handling time",
    group: "Operations",
  },
  {
    title: "Performance",
    href: "/performance",
    icon: Trophy,
    description: "Officer performance & leaderboard",
    group: "Operations",
  },
  {
    title: "AI Letter Intelligence",
    href: "/intelligence",
    icon: Brain,
    description: "Upload & auto-extract correspondence",
    group: "Intelligence",
  },
  {
    title: "Executive Reporting",
    href: "/reporting",
    icon: BarChart3,
    description: "Insights & management summaries",
    group: "Intelligence",
  },
  {
    title: "Historical Search",
    href: "/search",
    icon: Archive,
    description: "Retrieve records from 2003–2026",
    group: "Intelligence",
  },
];

export const NAV_GROUPS = ["Overview", "Operations", "Intelligence"] as const;

export { FileText };
