"use client";

import { Users, FileText, Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatCard } from "@/components/cards/stat-card";
import { StatCardSkeleton } from "@/components/loaders/skeletons";
import { BarChart } from "@/components/charts/bar-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useAnalyticsSummary, useUsers } from "@/hooks";

export default function AdminDashboardPage() {
  const { data: analytics, isLoading } = useAnalyticsSummary(30);
  const { data: users } = useUsers({ page: 1, limit: 1 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Workspace-wide metrics and activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total users" value={users?.meta.totalItems ?? 0} icon={Users} accent="primary" />
            <StatCard
              label="Events tracked (30d)"
              value={analytics?.dailyTimeSeries.reduce((sum, d) => sum + d.count, 0) ?? 0}
              icon={Activity}
              accent="accent"
            />
            <StatCard label="Categories" value={analytics?.categoryBreakdown.length ?? 0} icon={FileText} accent="primary" />
            <StatCard label="AI requests (30d)" value={analytics?.categoryBreakdown.find((c) => c.category === "ai_request")?.count ?? 0} icon={Sparkles} accent="accent" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event volume by category</CardTitle>
            <CardDescription>Last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.categoryBreakdown.length ? (
              <BarChart
                data={analytics.categoryBreakdown as unknown as Record<string, unknown>[]}
                xKey="category"
                yKey="count"
              />
            ) : (
              <EmptyState title="No data yet" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category distribution</CardTitle>
            <CardDescription>Share of total tracked events.</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.categoryBreakdown.length ? (
              <PieChart data={analytics.categoryBreakdown.map((c) => ({ name: c.category, value: c.count }))} />
            ) : (
              <EmptyState title="No data yet" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
