"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MessageSquare, Plus, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListItemSkeleton } from "@/components/loaders/skeletons";
import { EmptyState } from "@/components/empty-state/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useChats, useCreateChat, useArchiveChat, useDeleteChat } from "@/hooks";

export function ChatHistorySidebar() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();
  const { data, isLoading } = useChats({ page: 1, limit: 50 });
  const createChat = useCreateChat();
  const archiveChat = useArchiveChat();
  const deleteChat = useDeleteChat();

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-border">
      <div className="p-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => createChat.mutate(undefined, { onSuccess: (chat) => router.push(`/dashboard/chat/${chat._id}`) })}
        >
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3">
        {isLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        ) : data?.items.length ? (
          <ul className="space-y-1 pb-3">
            {data.items.map((chat) => {
              const isActive = params.id === chat._id;
              return (
                <li key={chat._id} className="group relative">
                  <Link
                    href={`/dashboard/chat/${chat._id}`}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      isActive ? "bg-amber-50 dark:bg-amber-900/20" : "hover:bg-muted"
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{chat.title}</span>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                        aria-label="Chat options"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => archiveChat.mutate(chat._id)}>
                        <Archive className="h-3.5 w-3.5" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-error"
                        onClick={() => {
                          deleteChat.mutate(chat._id);
                          if (isActive) router.push("/dashboard/chat");
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState title="No chats yet" description="Start a new conversation." className="py-12" />
        )}
      </ScrollArea>
    </div>
  );
}
