"use client";

import React from "react";
import { clsx } from "clsx";
import { ArrowLeft, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { Button } from "../../ui/Button";

export interface MinimalApplicationShellProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function MinimalApplicationShell({
  title,
  subtitle,
  onBack,
  onClose,
  children,
  className,
}: MinimalApplicationShellProps) {
  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col font-sans text-urvos-text", className)}>
      {/* MINIMAL HEADER */}
      <header className="h-14 border-b border-urvos-border bg-urvos-surface px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button onClick={onBack} className="p-1.5 hover:bg-urvos-background rounded-lg text-urvos-text-subtle">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold text-urvos-text">{title}</h2>
            {subtitle && <p className="text-[11px] text-urvos-text-subtle">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-urvos-text-subtle font-mono flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-urvos-primary mr-1" /> ABDM Compliant
          </span>
          {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-urvos-background rounded-lg text-urvos-text-subtle">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">{children}</main>
    </div>
  );
}
