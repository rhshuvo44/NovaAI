"use client";

import { formatDistanceToNow } from "date-fns";
import { Bell, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListItemSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import { cn } from "@/lib/utils";
import {
  useNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useDeleteNotification,
} from "@/hooks";

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications({ page: 1, limit: 30 });
  const markAllRead = useMarkAllNotificationsRead();
  const markRead = useMarkNotificationRead();
  const deleteNotification = useDeleteNotification();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay on top of activity in your workspace.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()}>
          <Check className="h-3.5 w-3.5" />
          Mark all read
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </div>
      ) : data?.items.length ? (
        <div className="space-y-2">
          {data.items.map((notification) => (
            <Card
              key={notification._id}
              className={cn(
                "flex items-start gap-3 p-4",
                !notification.isRead && "border-amber-300 bg-amber-50/50 dark:border-amber-700 dark:bg-amber-900/10"
              )}
            >
              <Bell className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {!notification.isRead && (
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => markRead.mutate(notification._id)}>
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-error"
                  onClick={() => deleteNotification.mutate(notification._id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={Bell} title="You're all caught up" description="No notifications right now." />
      )}
    </div>
  );
}
