"use client";

import React, { useRef, useState } from "react";
import { clsx } from "clsx";

export interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  className?: string;
}

export function PinInput({ length = 4, onComplete, className }: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const pin = next.join("");
    if (pin.length === length && !next.includes("")) {
      onComplete?.(pin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-12 w-12 text-center text-lg font-bold border border-urvos-border rounded-lg bg-urvos-surface focus:border-urvos-primary focus:ring-2 focus:ring-urvos-primary/20 outline-none transition-all"
        />
      ))}
    </div>
  );
}
