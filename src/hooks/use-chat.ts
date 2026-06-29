"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { chatService } from "@/services/api/chat.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import { MessageRole, type Message } from "@/types/chat";
import type { PaginationParams } from "@/types/api";

export function useChats(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.chats(params),
    queryFn: () => chatService.list(params),
  });
}

export function useChat(id: string) {
  return useQuery({
    queryKey: queryKeys.chat(id),
    queryFn: () => chatService.getById(id),
    enabled: Boolean(id),
  });
}

export function useChatMessages(id: string) {
  return useQuery({
    queryKey: queryKeys.chatMessages(id),
    queryFn: () => chatService.getMessages(id),
    enabled: Boolean(id),
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title?: string) => chatService.create(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

/**
 * Sends a message and optimistically appends both the user's message and a
 * "thinking" placeholder to the message list, then reconciles with the real
 * assistant response once the request resolves.
 */
export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => chatService.sendMessage(chatId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.chatMessages(chatId) });
      const previous = queryClient.getQueryData<Message[]>(queryKeys.chatMessages(chatId));

      const optimisticUserMessage: Message = {
        _id: `optimistic-${Date.now()}`,
        chatId,
        userId: "me",
        role: MessageRole.USER,
        content,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Message[]>(queryKeys.chatMessages(chatId), (old) => [
        ...(old ?? []),
        optimisticUserMessage,
      ]);

      return { previous };
    },
    onError: (error: ApiError, _content, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.chatMessages(chatId), context.previous);
      }
      toast.error(error.message);
    },
    onSuccess: (result) => {
      queryClient.setQueryData<Message[]>(queryKeys.chatMessages(chatId), (old) => {
        const withoutOptimistic = (old ?? []).filter((m) => !m._id.startsWith("optimistic-"));
        return [...withoutOptimistic, result.userMessage, result.assistantMessage];
      });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useArchiveChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => chatService.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Chat archived");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => chatService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Chat deleted");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}
