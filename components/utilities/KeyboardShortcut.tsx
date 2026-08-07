"use client";

import React from "react";
import { clsx } from "clsx";

export interface KeyboardShortcutProps {
  keys: string[];
  className?: string;
}

export function KeyboardShortcut({ keys, className }: KeyboardShortcutProps) {
  return (
    <div className={clsx("inline-flex items-center gap-1", className)}>
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="px-2 py-0.5 text-[10px] font-mono font-bold text-urvos-text bg-urvos-surface-muted border border-urvos-border rounded shadow-xs"
        >
          {k}
        </kbd>
      ))}
    </div>
  );
}
