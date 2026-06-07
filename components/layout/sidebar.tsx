"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { NAV_GROUPS, NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
          <span className="text-lg font-black text-primary-foreground">C</span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight">COCO AI</p>
          <p className="text-[11px] text-sidebar-foreground/60">
            Searchable · Auditable · Actionable
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-6 overflow-y-auto scrollbar-thin px-3 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group}>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              {group}
            </p>
            <ul className="space-y-1">
              {NAV_ITEMS.filter((i) => i.group === group).map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
          <Sparkles className="h-4 w-4 text-accent" />
          <div className="leading-tight">
            <p className="text-xs font-semibold">Azure OpenAI</p>
            <p className="text-[10px] text-sidebar-foreground/50">
              Intelligence engine ready
            </p>
          </div>
        </div>
        <p className="px-2 pt-3 text-[10px] text-sidebar-foreground/40">
          Shell Corporate Correspondence · Prototype
        </p>
      </div>
    </aside>
  );
}
