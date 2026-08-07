"use client";

import React from "react";
import { clsx } from "clsx";
import { AlertOctagon, Clock, Activity } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function TriageDashboard({ className }: { className?: string }) {
  const triageQueue = [
    { id: "TR-1", patient: "Sunil Varma", esiLevel: "ESI Level 1 (Resuscitation)", complaint: "Acute Respiratory Arrest", waitTime: "0 mins" },
    { id: "TR-2", patient: "Aarti Deshmukh", esiLevel: "ESI Level 2 (Emergent)", complaint: "Chest Pain / STEMI suspect", waitTime: "4 mins" },
    { id: "TR-3", patient: "Karan Patel", esiLevel: "ESI Level 3 (Urgent)", complaint: "Abdominal Pain", waitTime: "18 mins" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Emergency Department Triage (ESI 1-5)</h1>
          <p className="text-xs text-urvos-text-subtle">Emergency Severity Index acuity assignment & waiting room queue</p>
        </div>
        <Badge variant="critical">1 ESI-1 STAT Critical</Badge>
      </div>

      <div className="space-y-3">
        {triageQueue.map((t) => (
          <div key={t.id} className={clsx("p-4 border rounded-xl flex items-center justify-between text-xs", t.esiLevel.includes("Level 1") ? "bg-rose-500/10 border-rose-500/30" : "bg-urvos-surface border-urvos-border")}>
            <div className="space-y-1">
              <div className="font-bold text-sm text-urvos-text">{t.patient} ({t.esiLevel})</div>
              <div className="text-urvos-text-subtle">Complaint: {t.complaint} • Waiting: {t.waitTime}</div>
            </div>
            <Badge variant={t.esiLevel.includes("Level 1") ? "critical" : t.esiLevel.includes("Level 2") ? "caution" : "neutral"}>
              {t.esiLevel.split(" ")[2]}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
