import { cn } from "@/lib/utils";

export function SkipNav() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:left-4 focus:top-4",
        "focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5",
        "focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      )}
    >
      Skip to main content
    </a>
  );
}
