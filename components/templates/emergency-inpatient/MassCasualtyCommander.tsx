"use client";

import React from "react";
import { clsx } from "clsx";
import { ShieldAlert, Users, Activity } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function MassCasualtyCommander({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Mass Casualty Incident (MCI) Incident Command</h1>
          <p className="text-xs text-urvos-text-subtle">Disaster surge management, START triage tracking (Red, Yellow, Green, Black)</p>
        </div>
        <Badge variant="critical">MCI Surge Active (12 Inbound)</Badge>
      </div>

      <div className="grid grid-cols-4 gap-4 text-xs font-bold text-center">
        <div className="p-3 bg-rose-500/20 text-rose-600 rounded-lg">Immediate (Red): 4</div>
        <div className="p-3 bg-amber-500/20 text-amber-600 rounded-lg">Delayed (Yellow): 5</div>
        <div className="p-3 bg-emerald-500/20 text-emerald-600 rounded-lg">Minor (Green): 3</div>
        <div className="p-3 bg-urvos-surface border border-urvos-border rounded-lg">Expectant (Black): 0</div>
      </div>
    </div>
  );
}
