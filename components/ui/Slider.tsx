"use client";
import { type ReactNode } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { clsx } from "clsx";

export interface SliderProps {
  /** Current value(s). Single number or [min, max] for range. */
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  /** Show the current value label below the slider */
  showValue?: boolean;
  label?: string;
  className?: string;
}

export function Slider({
  value,
  defaultValue = [50],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  onValueCommit,
  showValue = false,
  label,
  className,
}: SliderProps) {
  const current = value ?? defaultValue;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }} className={className}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="label">{label}</span>
          {showValue && (
            <span className="caption">{current.join(" – ")}</span>
          )}
        </div>
      )}

      <SliderPrimitive.Root
        className={clsx("slider", disabled && "slider--disabled")}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
        aria-label={label}
      >
        <SliderPrimitive.Track className="slider__track">
          <SliderPrimitive.Range className="slider__range" />
        </SliderPrimitive.Track>
        {current.map((_, i) => (
          <SliderPrimitive.Thumb key={i} className="slider__thumb" />
        ))}
      </SliderPrimitive.Root>

      {!label && showValue && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="caption">{current.join(" – ")}</span>
        </div>
      )}
    </div>
  );
}
