"use client";

import React from "react";
import { clsx } from "clsx";
import { Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function BedManagementSystem({ className }: { className?: string }) {
  const beds = [
    { bed: "301", patient: "Rajesh Kumar", status: "Occupied", housekeeping: "Clean" },
    { bed: "302", patient: "Vikram Seth", status: "Occupied", housekeeping: "Clean" },
    { bed: "303", patient: "Vacant", status: "Available", housekeeping: "Sanitized & Ready" },
    { bed: "304", patient: "Discharging", status: "Pending Discharge", housekeeping: "Cleaning Required" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Inpatient Ward Bed Management (Ward 3B)</h1>
          <p className="text-xs text-urvos-text-subtle">Real-time bed availability, housekeeping status, and discharge queue</p>
        </div>
        <Badge variant="success">1 Bed Available</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {beds.map((b) => (
          <div key={b.bed} className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span>Bed {b.bed}</span>
              <Badge variant={b.status === "Available" ? "success" : b.status === "Occupied" ? "neutral" : "caution"}>
                {b.status}
              </Badge>
            </div>
            <div className="text-urvos-text font-semibold">{b.patient}</div>
            <div className="text-[10px] text-urvos-text-subtle">HK: {b.housekeeping}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
