"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationService } from "@/services/api/notification.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { PaginationParams } from "@/types/api";
import { useAuthStore } from "@/store/use-auth-store";

export function useNotifications(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.notifications(params),
    queryFn: () => notificationService.list(params),
  });
}

export function useUnreadNotificationCount() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: queryKeys.notificationUnreadCount,
    queryFn: notificationService.unreadCount,
    enabled: isAuthenticated,
    refetchInterval: 30_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}
