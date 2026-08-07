"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full p-6 border border-urvos-danger/30 bg-urvos-danger/5 rounded-xl flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-urvos-danger/10 text-urvos-danger rounded-full">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-base text-urvos-text">Component Error Encountered</h4>
            <p className="text-xs text-urvos-text-subtle mt-1 max-w-md">
              {this.state.error?.message || "An unexpected rendering error occurred inside this clinical view."}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={this.resetError} className="gap-2 mt-2">
            <RefreshCw className="h-3.5 w-3.5" /> Retry Component
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
