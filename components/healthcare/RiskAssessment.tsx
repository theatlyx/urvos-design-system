"use client";

import React from "react";
import { clsx } from "clsx";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export interface RiskScore {
  name: string;
  score: string | number;
  level: "low" | "moderate" | "high" | "critical";
  description: string;
}

export interface RiskAssessmentProps {
  scores: RiskScore[];
  className?: string;
}

export function RiskAssessment({ scores, className }: RiskAssessmentProps) {
  const getLevelBadge = (lvl: RiskScore["level"]) => {
    switch (lvl) {
      case "low":
        return "bg-urvos-success/10 text-urvos-success border-urvos-success/30";
      case "moderate":
        return "bg-urvos-warning/10 text-urvos-warning border-urvos-warning/30";
      case "high":
      case "critical":
        return "bg-urvos-danger/10 text-urvos-danger border-urvos-danger/30";
    }
  };

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
        <ShieldAlert className="h-5 w-5 text-urvos-danger" />
        <h3 className="text-base font-bold text-urvos-text">Clinical Risk Assessment Scores</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scores.map((sc, idx) => (
          <div key={idx} className="p-4 border border-urvos-border rounded-xl bg-urvos-surface flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-urvos-text-subtle uppercase">{sc.name}</span>
              <span className={clsx("text-xs font-bold px-2 py-0.5 rounded border capitalize", getLevelBadge(sc.level))}>
                {sc.level} Risk
              </span>
            </div>
            <div className="text-2xl font-black text-urvos-text">{sc.score}</div>
            <p className="text-xs text-urvos-text-subtle">{sc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
