"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/use-auth-store";
import { authService } from "@/services/api";
import { queryKeys } from "@/constants/query-keys";

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}
