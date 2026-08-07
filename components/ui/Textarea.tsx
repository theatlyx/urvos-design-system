"use client";

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const textareaVariants = cva("textarea", {
  variants: {
    state: {
      default: "",
      error: "textarea--error",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, error, ...props }, ref) => {
    // Treat legacy `error` boolean as state="error" to ensure backwards compatibility
    const currentState = error ? "error" : state;
    
    return (
      <textarea
        className={clsx(textareaVariants({ state: currentState }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
