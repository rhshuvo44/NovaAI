import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from "./helpers";
import type { Prompt, AIFeature } from "@/types/ai";
import type { PaginatedData, PaginationParams } from "@/types/api";

export interface CreatePromptInput {
  title: string;
  content: string;
  feature?: AIFeature;
  isPublic?: boolean;
}

export const promptService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Prompt>> => apiGetPaginated<Prompt>("/prompts", params),

  getById: (id: string): Promise<Prompt> => apiGet<Prompt>(`/prompts/${id}`),

  create: (input: CreatePromptInput): Promise<Prompt> => apiPost<Prompt>("/prompts", input),

  update: (id: string, input: Partial<CreatePromptInput>): Promise<Prompt> =>
    apiPatch<Prompt>(`/prompts/${id}`, input),

  toggleFavorite: (id: string): Promise<Prompt> => apiPatch<Prompt>(`/prompts/${id}/favorite`),

  optimize: (id: string): Promise<Prompt> => apiPost<Prompt>(`/prompts/${id}/optimize`),

  delete: (id: string): Promise<null> => apiDelete(`/prompts/${id}`),
};
