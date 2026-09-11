"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryProvider>
        {children}
        <Toaster
          position="bottom-right"
          expand
          visibleToasts={4}
          toastOptions={{
            classNames: {
              toast: "rounded-xl border border-border bg-surface-raised text-foreground shadow-lg",
              title: "text-sm font-semibold",
              description: "text-xs text-muted-foreground",
              success: "border-l-4 border-l-success",
              error: "border-l-4 border-l-error",
              info: "border-l-4 border-l-accent",
              warning: "border-l-4 border-l-warning",
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}
