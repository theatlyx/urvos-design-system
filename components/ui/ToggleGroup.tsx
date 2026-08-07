"use client";

import React, { createContext, useContext } from "react";
import { clsx } from "clsx";

interface ToggleGroupContextValue {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: any) => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({});

export interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function ToggleGroup({
  type = "single",
  value,
  onValueChange,
  size = "default",
  variant = "default",
  children,
  className,
}: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ type, value, onValueChange, size, variant }}>
      <div className={clsx("inline-flex items-center justify-center gap-1 rounded-md p-1 bg-urvos-surface-muted border border-urvos-border", className)}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export function ToggleGroupItem({ value: itemValue, children, className, ...props }: ToggleGroupItemProps) {
  const { type, value, onValueChange, size, variant } = useContext(ToggleGroupContext);

  const isSelected = type === "single"
    ? value === itemValue
    : Array.isArray(value) && value.includes(itemValue);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (!onValueChange) return;

    if (type === "single") {
      onValueChange(itemValue);
    } else if (Array.isArray(value)) {
      if (value.includes(itemValue)) {
        onValueChange(value.filter((v) => v !== itemValue));
      } else {
        onValueChange([...value, itemValue]);
      }
    } else {
      onValueChange([itemValue]);
    }
  };

  const sizeClasses =
    size === "sm" ? "h-7 px-2 text-xs" : size === "lg" ? "h-10 px-4 text-base" : "h-8 px-3 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      className={clsx(
        "inline-flex items-center justify-center rounded transition-all font-medium focus:outline-none focus:ring-2 focus:ring-urvos-primary disabled:opacity-50",
        sizeClasses,
        isSelected
          ? "bg-urvos-primary text-white shadow-sm"
          : "text-urvos-text hover:bg-urvos-surface hover:text-urvos-primary",
        variant === "outline" && !isSelected && "border border-urvos-border",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
