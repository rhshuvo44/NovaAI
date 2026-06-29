"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications, useUnreadNotificationCount, useMarkNotificationRead } from "@/hooks";
import { EmptyState } from "@/components/empty-state/empty-state";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { data: unread } = useUnreadNotificationCount();
  const { data: notifications } = useNotifications({ page: 1, limit: 5 });
  const markAsRead = useMarkNotificationRead();

  const count = unread?.count ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications?.items.length ? (
          notifications.items.map((notification) => (
            <DropdownMenuItem
              key={notification._id}
              className={cn("flex flex-col items-start gap-0.5 py-2", !notification.isRead && "bg-amber-50/60 dark:bg-amber-900/10")}
              onClick={() => {
                if (!notification.isRead) markAsRead.mutate(notification._id);
              }}
            >
              <span className="text-sm font-medium">{notification.title}</span>
              <span className="line-clamp-2 text-xs text-muted-foreground">{notification.message}</span>
              <span className="text-[11px] text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <EmptyState title="No notifications yet" className="py-8" />
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/notifications" className="justify-center text-sm font-medium text-primary">
            View all
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
