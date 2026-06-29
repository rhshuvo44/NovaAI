import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from "./helpers";
import type { Chat, Message, SendMessageResult } from "@/types/chat";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const chatService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Chat>> => apiGetPaginated<Chat>("/chats", params),

  create: (title?: string): Promise<Chat> => apiPost<Chat>("/chats", { title }),

  getById: (id: string): Promise<Chat> => apiGet<Chat>(`/chats/${id}`),

  getMessages: (id: string): Promise<Message[]> => apiGet<Message[]>(`/chats/${id}/messages`),

  sendMessage: (id: string, content: string): Promise<SendMessageResult> =>
    apiPost<SendMessageResult>(`/chats/${id}/messages`, { content }),

  archive: (id: string): Promise<Chat> => apiPatch<Chat>(`/chats/${id}/archive`),

  delete: (id: string): Promise<null> => apiDelete(`/chats/${id}`),
};
