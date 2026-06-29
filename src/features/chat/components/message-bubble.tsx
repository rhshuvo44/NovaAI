import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { CopyButton } from "@/components/shared/copy-button";
import { MessageRole, type Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === MessageRole.ASSISTANT;

  return (
    <div className={cn("group flex gap-3", isAssistant ? "flex-row" : "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isAssistant
            ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
        )}
      >
        {isAssistant ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      <div className={cn("max-w-[80%] space-y-1", isAssistant ? "items-start" : "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm",
            isAssistant
              ? "annotation-tick bg-surface-raised border border-border"
              : "bg-amber-400 text-ink-950"
          )}
        >
          {isAssistant ? (
            <MarkdownRenderer content={message.content} />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
        {isAssistant && (
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <CopyButton value={message.content} className="h-6 px-2 text-xs" />
          </div>
        )}
      </div>
    </div>
  );
}
