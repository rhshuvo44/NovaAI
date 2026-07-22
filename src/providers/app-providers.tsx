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
          toastOptions={{
            classNames: {
              toast: "rounded-xl border border-border bg-surface-raised text-foreground shadow-lg",
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}
