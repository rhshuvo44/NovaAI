"use client";

import { FileBarChart, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart } from "@/components/charts/pie-chart";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useAnalyticsSummary, useDashboardOverview } from "@/hooks";
import { toast } from "sonner";

export default function AdminReportsPage() {
  const { data: analytics } = useAnalyticsSummary(30);
  const { data: overview } = useDashboardOverview();

  function exportCsv() {
    if (!analytics) return;
    const rows = [
      ["date", "count"],
      ...analytics.dailyTimeSeries.map((d) => [d.date, String(d.count)]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-workspace-activity-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <FileBarChart className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">Reports</h1>
            <p className="text-sm text-muted-foreground">Summary report built from the last 30 days of activity.</p>
          </div>
        </div>
        <Button variant="outline" onClick={exportCsv} disabled={!analytics}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workspace summary</CardTitle>
            <CardDescription>Snapshot of current state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total documents</span>
              <span className="font-medium">{overview?.documentCount ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Archived documents</span>
              <span className="font-medium">{overview?.archivedDocumentCount ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active AI chats</span>
              <span className="font-medium">{overview?.activeChatCount ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saved prompts</span>
              <span className="font-medium">{overview?.promptCount ?? "—"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics?.categoryBreakdown.length ? (
              <PieChart data={analytics.categoryBreakdown.map((c) => ({ name: c.category, value: c.count }))} />
            ) : (
              <EmptyState title="No data for this period" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
