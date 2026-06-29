import { apiGetPaginated, apiPost, apiDelete } from "./helpers";
import type { Tag } from "@/types/document";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const tagService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Tag>> => apiGetPaginated<Tag>("/tags", params),

  create: (name: string): Promise<Tag> => apiPost<Tag>("/tags", { name }),

  delete: (id: string): Promise<null> => apiDelete(`/tags/${id}`),
};
