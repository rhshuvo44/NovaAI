import { apiGet, apiPost } from "./helpers";
import type { DashboardOverview } from "@/types/ai";

export interface AnalyticsSummary {
  categoryBreakdown: { category: string; count: number }[];
  dailyTimeSeries: { date: string; count: number }[];
  rangeStart: string;
  rangeEnd: string;
}

export const analyticsService = {
  getSummary: (daysBack = 30): Promise<AnalyticsSummary> =>
    apiGet<AnalyticsSummary>("/analytics/summary", { params: { daysBack } }),

  track: (eventName: string, category: string, properties?: Record<string, unknown>): Promise<void> =>
    apiPost("/analytics/track", { eventName, category, properties }),
};

export const dashboardService = {
  getOverview: (): Promise<DashboardOverview> => apiGet<DashboardOverview>("/dashboard/overview"),
};
