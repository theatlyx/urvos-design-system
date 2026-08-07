"use client";
import { ReactNode } from "react";

type Variant = "critical" | "caution" | "success" | "info" | "ai" | "neutral" | "danger" | "warning";

export interface BadgeProps {
  variant?: Variant;
  icon?: ReactNode;
  onRemove?: () => void;
  className?: string;
  children: ReactNode;
}

/**
 * Signal-color badges are meant to be clinically meaningful — critical,
 * caution, success, info map directly to the fixed sig-* tokens and should
 * never be reassigned to mean something else on a given screen. "ai" and
 * "neutral" are the two decorative-only variants.
 */
export function Badge({ variant = "neutral", icon, onRemove, children }: BadgeProps) {
  const variantClass = variant === "danger" ? "badge--critical" : variant === "warning" ? "badge--caution" : `badge--${variant}`;
  return (
    <span className={`badge ${variantClass}`}>
      {icon ?? <span className="badge__dot" aria-hidden="true" />}
      {children}
      {onRemove && (
        <span
          className="badge__remove"
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={onRemove}
          onKeyDown={(e) => e.key === "Enter" && onRemove()}
        >
          ✕
        </span>
      )}
    </span>
  );
}
