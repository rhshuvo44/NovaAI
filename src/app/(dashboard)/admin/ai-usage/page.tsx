"use client";

import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useAnalyticsSummary, useDashboardOverview } from "@/hooks";
import { StatCard } from "@/components/cards/stat-card";

export default function AdminAiUsagePage() {
  const { data: analytics, isLoading } = useAnalyticsSummary(30);
  const { data: overview } = useDashboardOverview();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">AI Usage</h1>
        <p className="text-sm text-muted-foreground">Track AI feature usage across the workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Your tokens used (this month)"
          value={(overview?.aiTokensUsedThisMonth ?? 0).toLocaleString()}
          icon={Sparkles}
          accent="accent"
        />
        <StatCard label="Active AI chats" value={overview?.activeChatCount ?? 0} icon={Sparkles} accent="primary" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request volume, last 30 days</CardTitle>
          <CardDescription>
            All tracked API activity, including AI feature calls. A dedicated per-feature token breakdown requires
            an admin-level usage export from the backend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoading && analytics?.dailyTimeSeries.length ? (
            <LineChart data={analytics.dailyTimeSeries} xKey="date" yKey="count" color="#3fa7a0" height={300} />
          ) : (
            <EmptyState title="No usage data yet" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
