"use client";

import React from "react";
import { clsx } from "clsx";
import { Users2, Dna } from "lucide-react";

export interface FamilyHistoryItem {
  relation: string;
  condition: string;
  onsetAge?: string;
  note?: string;
}

export interface FamilyHistoryProps {
  history: FamilyHistoryItem[];
  className?: string;
}

export function FamilyHistory({ history, className }: FamilyHistoryProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
        <Users2 className="h-5 w-5 text-urvos-primary" />
        <h3 className="text-base font-bold text-urvos-text">Family Medical History (FHIR)</h3>
      </div>

      <div className="divide-y divide-urvos-border">
        {history.map((fh, idx) => (
          <div key={idx} className="py-3 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded">
                {fh.relation}
              </span>
              <p className="text-sm font-bold text-urvos-text mt-1">{fh.condition}</p>
              {fh.note && <p className="text-xs text-urvos-text-subtle">{fh.note}</p>}
            </div>
            {fh.onsetAge && (
              <span className="text-xs text-urvos-text-subtle bg-urvos-surface-muted px-2 py-1 rounded border border-urvos-border">
                Onset: Age {fh.onsetAge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
