import { apiClient } from "./client";
import { apiGet, apiDelete } from "./helpers";
import type { ApiSuccessResponse } from "@/types/api";

export interface Upload {
  _id: string;
  ownerId: string;
  type: "image" | "pdf" | "document" | "video";
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  secureUrl: string;
  createdAt: string;
}

export const uploadService = {
  upload: async (file: File, onProgress?: (percent: number) => void): Promise<Upload> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiClient.post<ApiSuccessResponse<Upload>>("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
    });
    return res.data.data;
  },

  getById: (id: string): Promise<Upload> => apiGet<Upload>(`/uploads/${id}`),

  getSignedUrl: (id: string): Promise<{ url: string }> => apiGet<{ url: string }>(`/uploads/${id}/signed-url`),

  delete: (id: string): Promise<null> => apiDelete(`/uploads/${id}`),
};
