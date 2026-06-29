import { apiGet, apiGetPaginated, apiPost, apiPatch, apiDelete } from "./helpers";
import type { Document, CreateDocumentInput, UpdateDocumentInput } from "@/types/document";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const documentService = {
  list: (params?: PaginationParams): Promise<PaginatedData<Document>> =>
    apiGetPaginated<Document>("/documents", params),

  search: (query: string): Promise<Document[]> => apiGet<Document[]>("/documents/search", { params: { q: query } }),

  getById: (id: string): Promise<Document> => apiGet<Document>(`/documents/${id}`),

  create: (input: CreateDocumentInput): Promise<Document> => apiPost<Document>("/documents", input),

  update: (id: string, input: UpdateDocumentInput): Promise<Document> => apiPatch<Document>(`/documents/${id}`, input),

  archive: (id: string): Promise<Document> => apiPatch<Document>(`/documents/${id}/archive`),

  delete: (id: string): Promise<null> => apiDelete(`/documents/${id}`),

  bulkDelete: (ids: string[]): Promise<{ deletedCount: number }> =>
    apiPost<{ deletedCount: number }>("/documents/bulk-delete", { ids }),
};
