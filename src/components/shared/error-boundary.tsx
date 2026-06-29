"use client";

import * as React from "react";
import { ErrorState } from "@/components/empty-state/error-state";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // In production this should report to an error tracking service
    // (Sentry, etc.) instead of logging to the console.
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, info);
    }
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return <ErrorState onRetry={this.reset} />;
    }

    return this.props.children;
  }
}
