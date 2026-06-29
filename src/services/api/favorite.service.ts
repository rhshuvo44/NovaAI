import { apiGetPaginated, apiPost, apiDeleteWithBody } from "./helpers";
import type { Favorite, FavoriteEntityType } from "@/types/ai";
import type { PaginatedData, PaginationParams } from "@/types/api";

export const favoriteService = {
  list: (params?: PaginationParams & { entityType?: FavoriteEntityType }): Promise<PaginatedData<Favorite>> =>
    apiGetPaginated<Favorite>("/favorites", params),

  add: (entityType: FavoriteEntityType, entityId: string): Promise<Favorite> =>
    apiPost<Favorite>("/favorites", { entityType, entityId }),

  remove: (entityType: FavoriteEntityType, entityId: string): Promise<null> =>
    apiDeleteWithBody("/favorites", { entityType, entityId }),
};
