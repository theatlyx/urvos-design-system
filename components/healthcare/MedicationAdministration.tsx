"use client";

import React from "react";
import { clsx } from "clsx";
import { Pill, CheckCircle2, Clock, AlertTriangle, UserCheck } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface MedicationAdminItem {
  id: string;
  medicationName: string;
  dosage: string;
  route: string; // e.g. IV, Oral, Subcutaneous
  status: "completed" | "in-progress" | "not-done" | "on-hold";
  administeredAt: string;
  practitionerName: string;
  notes?: string;
}

export interface MedicationAdministrationProps {
  items: MedicationAdminItem[];
  title?: string;
  className?: string;
}

export function MedicationAdministration({
  items,
  title = "Medication Administration Log (MAR)",
  className,
}: MedicationAdministrationProps) {
  const getStatusBadge = (status: MedicationAdminItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in-progress":
        return <Badge variant="caution">In Progress</Badge>;
      case "on-hold":
        return <Badge variant="neutral">On Hold</Badge>;
      case "not-done":
        return <Badge variant="critical">Not Done</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-urvos-primary" />
          <h3 className="font-bold text-base text-urvos-text">{title}</h3>
        </div>
        <span className="text-xs text-urvos-text-subtle">{items.length} dose record(s)</span>
      </div>

      <div className="divide-y divide-urvos-border">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-urvos-text">{item.medicationName}</span>
                <span className="text-xs text-urvos-text-subtle font-mono">({item.dosage} • {item.route})</span>
                {getStatusBadge(item.status)}
              </div>
              {item.notes && <p className="text-xs text-urvos-text-subtle">{item.notes}</p>}
              <div className="flex items-center gap-3 text-[11px] text-urvos-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.administeredAt}
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="h-3 w-3" /> {item.practitionerName}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
