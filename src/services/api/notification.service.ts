import { apiGetPaginated, apiGet, apiPatch, apiDelete } from "./helpers";
import type { Notification } from "@/types/ai";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const notificationService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Notification>> =>
    apiGetPaginated<Notification>("/notifications", params),

  unreadCount: (): Promise<{ count: number }> => apiGet<{ count: number }>("/notifications/unread-count"),

  markAsRead: (id: string): Promise<Notification> => apiPatch<Notification>(`/notifications/${id}/read`),

  markAllAsRead: (): Promise<{ updatedCount: number }> =>
    apiPatch<{ updatedCount: number }>("/notifications/mark-all-read"),

  delete: (id: string): Promise<null> => apiDelete(`/notifications/${id}`),
};
