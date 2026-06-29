"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { favoriteService } from "@/services/api/favorite.service";
import { queryKeys } from "@/constants/query-keys";
import { ApiError } from "@/services/api/api-error";
import type { FavoriteEntityType } from "@/types/ai";
import type { PaginationParams } from "@/types/api";

export function useFavorites(params?: PaginationParams & { entityType?: FavoriteEntityType }) {
  return useQuery({
    queryKey: queryKeys.favorites(params),
    queryFn: () => favoriteService.list(params),
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entityType, entityId }: { entityType: FavoriteEntityType; entityId: string }) =>
      favoriteService.add(entityType, entityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Added to favorites");
    },
    onError: (error: ApiError) => {
      if (!error.message.toLowerCase().includes("already")) toast.error(error.message);
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entityType, entityId }: { entityType: FavoriteEntityType; entityId: string }) =>
      favoriteService.remove(entityType, entityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Removed from favorites");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}
