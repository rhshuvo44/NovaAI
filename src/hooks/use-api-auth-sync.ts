"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { setAuthTokenGetter } from "@/services/api/client";

/**
 * Wires the Axios client's request interceptor to Clerk's `getToken()`.
 * Mount this once near the app root (inside ClerkProvider) so every
 * subsequent API call automatically carries a fresh session token.
 */
export function useApiAuthSync(): void {
  const { getToken } = useAuth();

  useEffect(() => {
    setAuthTokenGetter(() => getToken());
  }, [getToken]);
}
