import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-foreground",
        primary: "border-transparent bg-primary/15 text-primary dark:bg-primary/20",
        accent: "border-transparent bg-accent/15 text-accent dark:bg-accent/20",
        success: "border-transparent bg-success/15 text-success dark:bg-success/25",
        warning: "border-transparent bg-warning/15 text-warning dark:bg-warning/25",
        error: "border-transparent bg-error/15 text-error dark:bg-error/25",
        outline: "border-border-strong text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
