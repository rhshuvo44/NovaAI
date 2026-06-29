"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { notificationService } from "@/services/api/notification.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { PaginationParams } from "@/types/api";

export function useNotifications(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.notifications(params),
    queryFn: () => notificationService.list(params),
  });
}

/** Polls every 30s for new notifications - a pragmatic stand-in for a push channel. */
export function useUnreadNotificationCount() {
  const { isSignedIn, isLoaded } = useAuth();

  return useQuery({
    queryKey: queryKeys.notificationUnreadCount,
    queryFn: notificationService.unreadCount,
    enabled: isLoaded && isSignedIn,
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
