"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { aiService } from "@/services/api/ai.service";
import { ApiError } from "@/services/api/api-error";
import type { GenerateContentInput } from "@/types/ai";

export function useGenerateContent() {
  return useMutation({
    mutationFn: (input: GenerateContentInput) => aiService.generateContent(input),
    onError: (error: ApiError) => toast.error(error.firstDetailMessage ?? error.message),
  });
}

export function useOptimizePromptText() {
  return useMutation({
    mutationFn: (prompt: string) => aiService.optimizePrompt(prompt),
    onError: (error: ApiError) => toast.error(error.firstDetailMessage ?? error.message),
  });
}

export function useSummarizeText() {
  return useMutation({
    mutationFn: ({ text, maxSentences }: { text: string; maxSentences?: number }) =>
      aiService.summarize(text, maxSentences),
    onError: (error: ApiError) => toast.error(error.firstDetailMessage ?? error.message),
  });
}

export function useGenerateTags() {
  return useMutation({
    mutationFn: (content: string) => aiService.generateTags(content),
    onError: (error: ApiError) => toast.error(error.firstDetailMessage ?? error.message),
  });
}

export function useRecommendations(limit?: number) {
  return useQuery({
    queryKey: ["ai", "recommendations", limit],
    queryFn: () => aiService.getRecommendations(limit),
    staleTime: 10 * 60 * 1000,
  });
}
