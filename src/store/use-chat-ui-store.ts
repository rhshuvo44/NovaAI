import { create } from "zustand";

interface ChatUIState {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;

  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;

  draftMessage: string;
  setDraftMessage: (message: string) => void;
}

export const useChatUIStore = create<ChatUIState>()((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),

  isStreaming: false,
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),

  draftMessage: "",
  setDraftMessage: (message) => set({ draftMessage: message }),
}));
