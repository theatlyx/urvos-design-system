"use client";

import React from "react";
import { clsx } from "clsx";
import { Bell, X, CheckCircle, AlertTriangle } from "lucide-react";
import { Portal } from "../utilities/Portal";

export interface InAppNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  className?: string;
}

export function InAppNotification({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  className,
}: InAppNotificationProps) {
  if (!isOpen) return null;

  const getTypeStyle = () => {
    switch (type) {
      case "success": return "border-urvos-success/40 bg-urvos-success/10 text-urvos-success";
      case "warning": return "border-urvos-warning/40 bg-urvos-warning/10 text-urvos-warning";
      case "error": return "border-urvos-danger/40 bg-urvos-danger/10 text-urvos-danger";
      default: return "border-urvos-primary/40 bg-urvos-primary/10 text-urvos-primary";
    }
  };

  return (
    <Portal>
      <div className={clsx("fixed top-4 right-4 z-50 max-w-sm w-full bg-urvos-surface border rounded-xl p-4 shadow-xl flex items-start gap-3 animate-in slide-in-from-top-4", getTypeStyle(), className)}>
        <Bell className="h-5 w-5 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="text-xs font-bold text-urvos-text leading-none">{title}</h4>
          <p className="text-xs text-urvos-text-subtle mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="text-urvos-text-subtle hover:text-urvos-text p-0.5">
          <X className="h-4 w-4" />
        </button>
      </div>
    </Portal>
  );
}
