"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { setAccessTokenGetter } from "@/services/api/client";

export function useApiAuthSync(): void {
  const getAccessToken = useAuthStore((s) => s.getAccessToken);

  useEffect(() => {
    setAccessTokenGetter(() => getAccessToken());
  }, [getAccessToken]);
}
