"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { userNavSections } from "@/constants/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell sections={userNavSections}>{children}</DashboardShell>;
}
