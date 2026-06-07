"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Calendar, Menu, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      {/* Mobile menu */}
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="left-0 top-0 h-full max-w-64 translate-x-0 translate-y-0 rounded-none p-0 sm:rounded-none">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Global search */}
      <form onSubmit={submitSearch} className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search correspondence, 2003–2026…"
          className="h-9 w-full rounded-full border border-input bg-muted/40 pl-9 pr-4 text-sm outline-none transition-colors focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/30"
        />
      </form>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <div className="hidden items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <Calendar className="h-3.5 w-3.5" />
          07 Jun 2026
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="flex items-center gap-2 pl-1">
          <Avatar>
            <AvatarFallback style={{ backgroundColor: "#dc2626" }}>
              EC
            </AvatarFallback>
          </Avatar>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">Executive User</p>
            <p className="text-[11px] text-muted-foreground">COCO Leadership</p>
          </div>
        </div>
      </div>
    </header>
  );
}
