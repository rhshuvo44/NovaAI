import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accent?: "primary" | "accent";
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, accent = "primary", className }: StatCardProps) {
  const isPositive = trend && trend.value >= 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              accent === "primary"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                : "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend && (
          <p
            className={cn(
              "mt-3 flex items-center gap-1 text-xs font-medium",
              isPositive ? "text-success" : "text-error"
            )}
          >
            {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
