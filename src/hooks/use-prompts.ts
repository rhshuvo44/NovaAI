"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promptService, type CreatePromptInput } from "@/services/api/prompt.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { PaginationParams } from "@/types/api";

export function usePrompts(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.prompts(params),
    queryFn: () => promptService.list(params),
  });
}

export function usePrompt(id: string) {
  return useQuery({
    queryKey: queryKeys.prompt(id),
    queryFn: () => promptService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePromptInput) => promptService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Prompt saved");
    },
    onError: (error: ApiError) => toast.error(error.firstDetailMessage ?? error.message),
  });
}

export function useUpdatePrompt(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Partial<CreatePromptInput>) => promptService.update(id, input),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.prompt(id), updated);
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Prompt updated");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useTogglePromptFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promptService.toggleFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useOptimizePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promptService.optimize(id),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.prompt(updated._id), updated);
      toast.success("Prompt optimized");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promptService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Prompt deleted");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}
