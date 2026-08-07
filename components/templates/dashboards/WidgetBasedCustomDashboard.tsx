"use client";

import React from "react";
import { clsx } from "clsx";
import { LayoutGrid, Plus, Move } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";

export function WidgetBasedCustomDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Customizable Provider Widget Dashboard</h1>
          <p className="text-xs text-urvos-text-subtle">
            Configurable clinical layout • Drag and position widgets according to specialty preferences
          </p>
        </div>
        <Button size="sm" variant="secondary">
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Widget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2">
            <span>Widget: Quick Order Sets</span>
            <Move className="w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" />
          </div>
          <p className="text-xs text-urvos-text-subtle">Order CBC, LFT, KFT in 1-click</p>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2">
            <span>Widget: ABDM Consents</span>
            <Move className="w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" />
          </div>
          <p className="text-xs text-urvos-text-subtle">3 Active Consent Artifacts</p>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2">
            <span>Widget: Tele-Consult Room</span>
            <Move className="w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" />
          </div>
          <p className="text-xs text-urvos-text-subtle">Next call in 15 mins</p>
        </div>
      </div>
    </div>
  );
}
