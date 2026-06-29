import { ChatHistorySidebar } from "@/features/chat/components/chat-history-sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-m-6 flex h-[calc(100vh-4rem)] lg:-mx-8">
      <ChatHistorySidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
