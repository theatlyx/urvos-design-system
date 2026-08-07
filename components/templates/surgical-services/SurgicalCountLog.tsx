"use client";

import React from "react";
import { clsx } from "clsx";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function SurgicalCountLog({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Intra-Operative Surgical Safety Count Log</h1>
          <p className="text-xs text-urvos-text-subtle">Sponge, needle, & instrument reconciliation with dual-scrub witness verification</p>
        </div>
        <Badge variant="success">Count Verified Correct</Badge>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs">
        <div className="grid grid-cols-3 gap-3 font-bold border-b border-urvos-border pb-2">
          <span>Item Category</span>
          <span>Initial / Pre-Closure</span>
          <span>Final Count Verification</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <span>Lap Sponges (Ray-Tec)</span>
          <span>10 / 10</span>
          <span className="text-emerald-600 font-bold">10 Correct</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <span>Suture Needles</span>
          <span>12 / 12</span>
          <span className="text-emerald-600 font-bold">12 Correct</span>
        </div>
      </div>
    </div>
  );
}
