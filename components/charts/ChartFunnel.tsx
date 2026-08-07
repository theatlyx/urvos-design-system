"use client";

import React from "react";
import { clsx } from "clsx";

export interface FunnelStage {
  label: string;
  count: number;
  color?: string;
}

export interface ChartFunnelProps {
  stages: FunnelStage[];
  className?: string;
}

export function ChartFunnel({ stages, className }: ChartFunnelProps) {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-3", className)}>
      <h4 className="text-sm font-semibold text-urvos-text mb-2">Triage & Referral Pipeline</h4>
      <div className="space-y-2">
        {stages.map((stage, idx) => {
          const widthPct = Math.max(15, Math.round((stage.count / maxCount) * 100));
          return (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-32 text-xs font-semibold text-urvos-text truncate text-right">
                {stage.label}
              </span>
              <div className="flex-1 bg-urvos-surface-muted rounded-lg overflow-hidden h-7 flex items-center p-1">
                <div
                  className="h-full rounded-md transition-all flex items-center justify-end px-2"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: stage.color || "#0284C7",
                  }}
                >
                  <span className="text-xs font-bold text-white leading-none">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
