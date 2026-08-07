"use client";

import React from "react";
import { clsx } from "clsx";
import { BookOpen, CheckCircle, AlertCircle } from "lucide-react";

export interface GuidelineRule {
  title: string;
  recommendation: string;
  evidenceGrade: "Grade A" | "Grade B" | "Grade C";
  source: string;
}

export interface ClinicalGuidelinesProps {
  guidelines: GuidelineRule[];
  className?: string;
}

export function ClinicalGuidelines({ guidelines, className }: ClinicalGuidelinesProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
        <BookOpen className="h-5 w-5 text-urvos-primary" />
        <h3 className="text-base font-bold text-urvos-text">CDS Clinical Guidelines (PlanDefinition)</h3>
      </div>

      <div className="space-y-3">
        {guidelines.map((g, idx) => (
          <div key={idx} className="p-4 border border-urvos-border rounded-xl bg-urvos-surface-muted/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-urvos-text">{g.title}</span>
              <span className="text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded border border-urvos-primary/20">
                {g.evidenceGrade}
              </span>
            </div>
            <p className="text-xs text-urvos-text leading-relaxed">{g.recommendation}</p>
            <span className="text-[10px] text-urvos-text-subtle block">Source: {g.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
