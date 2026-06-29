"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Topbar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/layout/command-palette";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useApiAuthSync } from "@/hooks/use-api-auth-sync";
import type { NavSection } from "@/constants/navigation";

interface DashboardShellProps {
  sections: NavSection[];
  children: React.ReactNode;
}

export function DashboardShell({ sections, children }: DashboardShellProps) {
  useApiAuthSync();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar sections={sections} />
      <MobileNav sections={sections} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
