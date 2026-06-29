"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-error dark:bg-red-900/30">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <div>
        <p className="font-display text-5xl font-semibold">500</p>
        <p className="mt-2 text-lg font-medium">Something went wrong</p>
        <p className="mt-1 text-sm text-muted-foreground">
          An unexpected error occurred. Our team has been notified.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
