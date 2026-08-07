"use client";

import React from "react";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";

export interface SankeyFlow {
  from: string;
  to: string;
  value: number;
}

export interface ChartSankeyProps {
  flows: SankeyFlow[];
  title?: string;
  className?: string;
}

export function ChartSankey({ flows, title = "Patient Referral & Transition Flow", className }: ChartSankeyProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <h4 className="text-sm font-semibold text-urvos-text">{title}</h4>
      <div className="space-y-3">
        {flows.map((flow, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-urvos-border rounded-lg bg-urvos-surface-muted/50">
            <span className="text-xs font-semibold text-urvos-text">{flow.from}</span>
            <div className="flex items-center gap-2 text-urvos-primary">
              <span className="text-xs font-bold bg-urvos-primary/10 px-2 py-0.5 rounded">{flow.value} pts</span>
              <ArrowRight className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-urvos-text">{flow.to}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
