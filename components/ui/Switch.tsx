"use client";

import React, { forwardRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const switchVariants = cva("switch", {
  variants: {
    size: {
      sm: "switch--sm",
      md: "switch--md",
      lg: "switch--lg",
    },
    state: {
      default: "",
      error: "switch--error",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  error?: boolean;
}

export const Switch = forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size, state, error, ...props }, ref) => {
    const currentState = error ? "error" : state;
    return (
      <SwitchPrimitive.Root
        className={clsx(switchVariants({ size, state: currentState }), className)}
        {...props}
        ref={ref}
      >
        <SwitchPrimitive.Thumb className="switch-thumb" />
      </SwitchPrimitive.Root>
    );
  }
);
Switch.displayName = SwitchPrimitive.Root.displayName;
