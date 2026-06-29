"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Message AI Workspace…" }: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border-strong bg-surface p-2 shadow-sm">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          event.target.style.height = "auto";
          event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        className="min-h-0 flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      <Button size="icon" disabled={disabled || value.trim().length === 0} onClick={handleSend} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
