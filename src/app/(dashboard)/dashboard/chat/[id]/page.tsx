"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MessageBubble } from "@/features/chat/components/message-bubble";
import { TypingIndicator } from "@/features/chat/components/typing-indicator";
import { ChatInput } from "@/features/chat/components/chat-input";
import { FullPageSpinner } from "@/components/loaders/spinner";
import { ErrorState } from "@/components/empty-state/error-state";
import { useChatMessages, useSendMessage } from "@/hooks";

export default function ChatConversationPage() {
  const params = useParams<{ id: string }>();
  const { data: messages, isLoading, isError, refetch } = useChatMessages(params.id);
  const sendMessage = useSendMessage(params.id);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sendMessage.isPending]);

  if (isLoading) return <FullPageSpinner />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {messages?.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">Send a message to get started.</p>
          )}
          {messages?.map((message) => <MessageBubble key={message._id} message={message} />)}
          {sendMessage.isPending && <TypingIndicator />}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="border-t border-border p-4 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <ChatInput
            onSend={(content) => sendMessage.mutate(content)}
            disabled={sendMessage.isPending}
          />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI Workspace can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
