import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
        <FileQuestion className="h-8 w-8" />
      </div>
      <div>
        <p className="font-display text-5xl font-semibold">404</p>
        <p className="mt-2 text-lg font-medium">This page doesn&apos;t exist</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The page you&apos;re looking for may have been moved or deleted.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
