"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { authService } from "@/services/api";
import { queryKeys } from "@/constants/query-keys";

/**
 * Fetches the backend `User` record for the currently authenticated Clerk
 * session. Distinct from Clerk's own `useUser()`, which only knows about
 * Clerk-side profile data (name, avatar) - this hook returns our app's
 * role, permissions, and account status.
 */
export function useCurrentUser() {
  const { isSignedIn, isLoaded } = useAuth();

  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: authService.getCurrentUser,
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 1000,
  });
}
