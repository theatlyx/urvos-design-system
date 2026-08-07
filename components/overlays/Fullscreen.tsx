"use client";

import React from "react";
import { clsx } from "clsx";
import { Maximize2, Minimize2 } from "lucide-react";
import { Portal } from "../utilities/Portal";

export interface FullscreenProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Fullscreen({ isOpen, onClose, title = "Full Screen Clinical View", children, className }: FullscreenProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={clsx("fixed inset-0 z-50 bg-urvos-surface flex flex-col animate-in fade-in-0", className)}>
        <header className="px-6 py-4 border-b border-urvos-border flex items-center justify-between bg-urvos-surface-muted">
          <h2 className="text-base font-bold text-urvos-text">{title}</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-urvos-text-subtle hover:text-urvos-text p-2 rounded-lg hover:bg-urvos-border transition-colors"
          >
            <Minimize2 className="h-4 w-4" /> Exit Fullscreen
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </Portal>
  );
}
