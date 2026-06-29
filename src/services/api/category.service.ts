import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from "./helpers";
import type { Category } from "@/types/document";
import type { PaginatedData, PaginationParams } from "@/types/api";

export interface CreateCategoryInput {
  name: string;
  description?: string;
  parentId?: string;
  icon?: string;
  color?: string;
}

export const categoryService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Category>> =>
    apiGetPaginated<Category>("/categories", params),

  getById: (id: string): Promise<Category> => apiGet<Category>(`/categories/${id}`),

  create: (input: CreateCategoryInput): Promise<Category> => apiPost<Category>("/categories", input),

  update: (id: string, input: Partial<CreateCategoryInput>): Promise<Category> =>
    apiPatch<Category>(`/categories/${id}`, input),

  delete: (id: string): Promise<null> => apiDelete(`/categories/${id}`),
};
