"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, ShieldCheck } from "lucide-react";
import { ImmunizationRecord } from "../../healthcare/ImmunizationRecord";
import { Badge } from "../../ui/Badge";

export function PediatricGrowthSchedule({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Pediatric Growth Percentiles & Vaccine Schedule</h1>
          <p className="text-xs text-urvos-text-subtle">WHO growth curves (Weight/Height-for-age) & UIP immunization schedule</p>
        </div>
        <Badge variant="success">50th Percentile Growth</Badge>
      </div>

      <ImmunizationRecord
        title="UIP Infant Vaccine Schedule"
        records={[
          { id: "IMM-1", vaccineName: "BCG + OPV-0 + HepB-Birth", targetDisease: "Tuberculosis / Polio / HepB", doseNumber: "Birth Dose", dateGiven: "2026-01-10", status: "completed" },
          { id: "IMM-2", vaccineName: "Pentavalent-1 + Rotavirus-1", targetDisease: "DPT / HepB / Hib / Rota", doseNumber: "6 Weeks", dateGiven: "2026-02-22", status: "completed" },
        ]}
      />
    </div>
  );
}
