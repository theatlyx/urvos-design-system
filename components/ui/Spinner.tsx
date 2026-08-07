"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const spinnerVariants = cva("spinner", {
  variants: {
    size: {
      xs: "spinner--xs",
      sm: "spinner--sm",
      md: "spinner--md",
      lg: "spinner--lg",
      xl: "spinner--xl",
    },
    color: {
      primary: "", // default — uses var(--brand-solid)
      white:   "spinner--white",
      muted:   "spinner--muted",
    },
  },
  defaultVariants: { size: "md", color: "primary" },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  label?: string;
  className?: string;
}

export function Spinner({ size, color, label = "Loading…", className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(spinnerVariants({ size, color }), className)}
    />
  );
}
