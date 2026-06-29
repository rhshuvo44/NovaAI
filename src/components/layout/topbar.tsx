"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NotificationBell } from "@/components/layout/notification-bell";
import { ProfileDropdown } from "@/components/layout/profile-dropdown";
import { useUIStore } from "@/store";

export function Topbar() {
  const { setMobileNavOpen, setCommandPaletteOpen } = useUIStore();

  return (
    <header className="glass-surface sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileNavOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden lg:block">
        <Breadcrumb />
      </div>

      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-surface-sunken px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong sm:ml-4"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search or jump to…</span>
        <kbd className="ml-auto hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <NotificationBell />
        <ProfileDropdown />
      </div>
    </header>
  );
}
