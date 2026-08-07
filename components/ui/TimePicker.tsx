"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { clsx } from "clsx";

interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
  value?: string; // "HH:mm"
  onChange?: (time: string) => void;
  error?: boolean;
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, value, onChange, error, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center w-full max-w-[150px]">
        <Clock className="absolute left-3 w-4 h-4 text-urvos-ink-light pointer-events-none" />
        <input
          type="time"
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={clsx(
            "input pl-9",
            error && "input[data-state=error]", // simulate error state
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
TimePicker.displayName = "TimePicker";
