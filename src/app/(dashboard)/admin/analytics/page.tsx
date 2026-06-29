"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { EmptyState } from "@/components/empty-state/empty-state";
import { useAnalyticsSummary } from "@/hooks";

export default function AdminAnalyticsPage() {
  const [range, setRange] = React.useState("30");
  const { data, isLoading } = useAnalyticsSummary(Number(range));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Usage trends across the workspace.</p>
        </div>
        <Tabs value={range} onValueChange={setRange}>
          <TabsList>
            <TabsTrigger value="7">7d</TabsTrigger>
            <TabsTrigger value="30">30d</TabsTrigger>
            <TabsTrigger value="90">90d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily activity</CardTitle>
          <CardDescription>
            {data ? `${data.rangeStart.slice(0, 10)} – ${data.rangeEnd.slice(0, 10)}` : "Loading…"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoading && data?.dailyTimeSeries.length ? (
            <LineChart data={data.dailyTimeSeries} xKey="date" yKey="count" height={320} />
          ) : (
            <EmptyState title="No activity in this range" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity by category</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && data?.categoryBreakdown.length ? (
            <BarChart
              data={data.categoryBreakdown as unknown as Record<string, unknown>[]}
              xKey="category"
              yKey="count"
              height={320}
            />
          ) : (
            <EmptyState title="No data yet" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
