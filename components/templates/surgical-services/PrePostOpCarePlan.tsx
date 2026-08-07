"use client";

import React from "react";
import { clsx } from "clsx";
import { Stethoscope, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function PrePostOpCarePlan({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Pre-Op & PACU Post-Op Surgical Checklist</h1>
          <p className="text-xs text-urvos-text-subtle">WHO Surgical Safety Checklist, NPO status, and PACU Aldrete Recovery Score</p>
        </div>
        <Badge variant="success">Aldrete Score: 9/10 (Ready for Ward Transfer)</Badge>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs">
        <h3 className="font-bold text-sm text-urvos-text">WHO Surgical Safety Check</h3>
        <ul className="space-y-1 text-urvos-text-subtle list-disc list-inside">
          <li>Patient Identity, Site & Procedure Confirmed</li>
          <li>Surgical Site Marked by Surgeon</li>
          <li>Anesthesia Machine & Medication Check Complete</li>
        </ul>
      </div>
    </div>
  );
}
