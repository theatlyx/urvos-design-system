"use client";

import React from "react";
import { clsx } from "clsx";
import { FileSearch, UserCheck, Calendar } from "lucide-react";

export interface ImpressionItem {
  id: string;
  summary: string;
  assessor: string;
  date: string;
  status: "draft" | "completed" | "in-progress";
  prognosis?: string;
}

export interface ClinicalImpressionProps {
  impressions: ImpressionItem[];
  className?: string;
}

export function ClinicalImpression({ impressions, className }: ClinicalImpressionProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
        <FileSearch className="h-5 w-5 text-urvos-primary" />
        <h3 className="text-base font-bold text-urvos-text">Clinical Assessment & Impression</h3>
      </div>

      <div className="space-y-3">
        {impressions.map((imp) => (
          <div key={imp.id} className="p-4 border border-urvos-border rounded-xl bg-urvos-surface-muted/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-urvos-primary/10 text-urvos-primary">
                {imp.status}
              </span>
              <div className="flex items-center gap-1 text-xs text-urvos-text-subtle">
                <Calendar className="h-3.5 w-3.5" />
                <span>{imp.date}</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-urvos-text leading-snug">{imp.summary}</p>

            {imp.prognosis && (
              <p className="text-xs text-urvos-text-subtle bg-urvos-surface p-2 rounded border border-urvos-border/50">
                <span className="font-bold text-urvos-text">Prognosis:</span> {imp.prognosis}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-xs text-urvos-text-subtle pt-1">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Assessed by {imp.assessor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
