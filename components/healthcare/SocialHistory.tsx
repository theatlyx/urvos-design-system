"use client";

import React from "react";
import { clsx } from "clsx";
import { HeartHandshake, Cigarette, Wine, Home, Activity } from "lucide-react";

export interface SocialDeterminant {
  category: "Tobacco" | "Alcohol" | "Housing" | "Exercise" | "Diet";
  status: string;
  detail: string;
}

export interface SocialHistoryProps {
  factors: SocialDeterminant[];
  className?: string;
}

export function SocialHistory({ factors, className }: SocialHistoryProps) {
  const getIcon = (cat: SocialDeterminant["category"]) => {
    switch (cat) {
      case "Tobacco": return <Cigarette className="h-4 w-4 text-urvos-warning" />;
      case "Alcohol": return <Wine className="h-4 w-4 text-urvos-primary" />;
      case "Housing": return <Home className="h-4 w-4 text-urvos-success" />;
      default: return <Activity className="h-4 w-4 text-urvos-primary" />;
    }
  };

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
        <HeartHandshake className="h-5 w-5 text-urvos-primary" />
        <h3 className="text-base font-bold text-urvos-text">Social History & SDOH Determinants</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {factors.map((f, idx) => (
          <div key={idx} className="p-3 border border-urvos-border rounded-lg bg-urvos-surface-muted/30 flex items-start gap-3">
            <div className="p-2 rounded-md bg-urvos-surface border border-urvos-border mt-0.5">{getIcon(f.category)}</div>
            <div>
              <span className="text-xs font-bold text-urvos-text-subtle uppercase">{f.category}</span>
              <h5 className="text-sm font-bold text-urvos-text">{f.status}</h5>
              <p className="text-xs text-urvos-text-subtle">{f.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
