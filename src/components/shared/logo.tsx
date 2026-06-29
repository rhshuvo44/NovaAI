import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}

export function Logo({ className, href = "/", showWordmark = true }: LogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 group", className)}>
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm">
        AI
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          NovaAI
        </span>
      )}
    </Link>
  );
}
