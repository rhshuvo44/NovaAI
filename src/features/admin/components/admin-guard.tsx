"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { useCurrentUser } from "@/hooks";
import { FullPageSpinner } from "@/components/loaders/spinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading } = useCurrentUser();
  const { isManagerOrAbove } = usePermissions();

  React.useEffect(() => {
    if (!isLoading && !isManagerOrAbove) {
      router.replace("/dashboard");
    }
  }, [isLoading, isManagerOrAbove, router]);

  if (isLoading || !isManagerOrAbove) {
    return <FullPageSpinner />;
  }

  return <>{children}</>;
}
