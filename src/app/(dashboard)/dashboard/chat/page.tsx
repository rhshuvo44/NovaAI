"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateChat } from "@/hooks";

export default function ChatIndexPage() {
  const router = useRouter();
  const createChat = useCreateChat();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
        <Sparkles className="h-7 w-7" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold">Start a conversation</p>
        <p className="text-sm text-muted-foreground">Ask a question, draft something, or think out loud.</p>
      </div>
      <Button
        onClick={() => createChat.mutate(undefined, { onSuccess: (chat) => router.push(`/dashboard/chat/${chat._id}`) })}
      >
        New chat
      </Button>
    </div>
  );
}
