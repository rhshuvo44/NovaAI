"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { documentService } from "@/services/api";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { CreateDocumentInput, UpdateDocumentInput } from "@/types/document";
import type { PaginationParams } from "@/types/api";

export function useDocuments(params?: PaginationParams) {
  return useQuery({
    queryKey: queryKeys.documents(params),
    queryFn: () => documentService.list(params),
  });
}

export function useDocumentSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.documentSearch(query),
    queryFn: () => documentService.search(query),
    enabled: query.trim().length > 0,
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: queryKeys.document(id),
    queryFn: () => documentService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateDocumentInput) => documentService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document created");
    },
    onError: (error: ApiError) => {
      toast.error(error.firstDetailMessage ?? error.message);
    },
  });
}

export function useUpdateDocument(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateDocumentInput) => documentService.update(id, input),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.document(id), updated);
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document saved");
    },
    onError: (error: ApiError) => {
      toast.error(error.firstDetailMessage ?? error.message);
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document deleted");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useArchiveDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => documentService.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document archived");
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useBulkDeleteDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => documentService.bulkDelete(ids),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success(`Deleted ${result.deletedCount} document${result.deletedCount === 1 ? "" : "s"}`);
    },
    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}
