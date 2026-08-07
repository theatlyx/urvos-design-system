"use client";

import React from "react";
import { clsx } from "clsx";
import { AlertOctagon, FileCheck, ShieldAlert } from "lucide-react";

export interface AdvancedDirectiveProps {
  dnrStatus: boolean;
  dniStatus: boolean;
  proxyName?: string;
  proxyPhone?: string;
  verifiedDate?: string;
  className?: string;
}

export function AdvancedDirective({
  dnrStatus = true,
  dniStatus = true,
  proxyName = "Eleanor Vance (Spouse)",
  proxyPhone = "(555) 234-5678",
  verifiedDate = "Oct 12, 2023",
  className,
}: AdvancedDirectiveProps) {
  return (
    <div className={clsx("w-full border-2 border-urvos-danger/40 bg-urvos-danger/5 rounded-xl p-5 shadow-sm space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-urvos-danger font-bold text-sm">
          <AlertOctagon className="h-5 w-5" />
          <span>Advanced Directives & Resuscitation Status</span>
        </div>
        <span className="text-xs font-semibold text-urvos-text-subtle">Verified: {verifiedDate}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className={clsx("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border", dnrStatus ? "bg-urvos-danger text-urvos-text-inverse border-urvos-danger" : "bg-urvos-surface text-urvos-text border-urvos-border")}>
          {dnrStatus ? "DNR (Do Not Resuscitate)" : "Full Code"}
        </span>
        <span className={clsx("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border", dniStatus ? "bg-urvos-danger text-urvos-text-inverse border-urvos-danger" : "bg-urvos-surface text-urvos-text border-urvos-border")}>
          {dniStatus ? "DNI (Do Not Intubate)" : "Intubate Allowed"}
        </span>
      </div>

      {proxyName && (
        <div className="pt-2 border-t border-urvos-danger/20 text-xs text-urvos-text flex items-center justify-between">
          <span><strong className="text-urvos-text">Healthcare Proxy:</strong> {proxyName}</span>
          <span className="font-semibold text-urvos-primary">{proxyPhone}</span>
        </div>
      )}
    </div>
  );
}
