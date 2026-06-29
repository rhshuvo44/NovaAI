"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminNavSections } from "@/constants/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <DashboardShell sections={adminNavSections}>{children}</DashboardShell>
    </AdminGuard>
  );
}
