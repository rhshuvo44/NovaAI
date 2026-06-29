"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService, analyticsService } from "@/services/api/analytics.service";
import { queryKeys } from "@/constants/query-keys";

export function useDashboardOverview() {
  return useQuery({
    queryKey: queryKeys.dashboardOverview,
    queryFn: dashboardService.getOverview,
    staleTime: 60 * 1000,
  });
}

export function useAnalyticsSummary(daysBack = 30) {
  return useQuery({
    queryKey: queryKeys.analyticsSummary(daysBack),
    queryFn: () => analyticsService.getSummary(daysBack),
    staleTime: 5 * 60 * 1000,
  });
}
