"use client";

import React from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={clsx("flex items-center justify-between w-full", className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all",
                  isCompleted
                    ? "bg-urvos-success text-white"
                    : isCurrent
                    ? "bg-urvos-primary text-white ring-4 ring-urvos-primary/20"
                    : "bg-urvos-surface-muted text-urvos-text-subtle border border-urvos-border"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span
                className={clsx(
                  "text-xs font-semibold hidden sm:inline-block",
                  isCurrent ? "text-urvos-text" : "text-urvos-text-subtle"
                )}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={clsx(
                  "flex-1 h-0.5 mx-3 transition-colors",
                  idx < currentStep ? "bg-urvos-success" : "bg-urvos-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
