"use client";

import React, { useEffect } from "react";

export interface HotkeyProps {
  keyCombo: string; // e.g. "Control+k" or "Meta+k"
  onTrigger: () => void;
}

export function Hotkey({ keyCombo, onTrigger }: HotkeyProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const parts = keyCombo.toLowerCase().split("+");
      const key = parts[parts.length - 1];

      const matchCtrl = parts.includes("control") || parts.includes("ctrl") ? e.ctrlKey : true;
      const matchMeta = parts.includes("meta") || parts.includes("cmd") || parts.includes("⌘") ? e.metaKey : true;
      const matchAlt = parts.includes("alt") ? e.altKey : true;
      const matchShift = parts.includes("shift") ? e.shiftKey : true;

      if (e.key.toLowerCase() === key && matchCtrl && matchMeta && matchAlt && matchShift) {
        e.preventDefault();
        onTrigger();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyCombo, onTrigger]);

  return null;
}
