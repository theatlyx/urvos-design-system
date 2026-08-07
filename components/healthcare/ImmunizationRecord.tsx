"use client";

import React from "react";
import { clsx } from "clsx";
import { Syringe, ShieldCheck, AlertCircle } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface ImmunizationItem {
  id: string;
  vaccineName: string;
  targetDisease: string;
  doseNumber: string; // e.g. Dose 1 of 2
  dateGiven: string;
  expirationDate?: string;
  manufacturer?: string;
  status: "completed" | "overdue" | "scheduled";
}

export interface ImmunizationRecordProps {
  records: ImmunizationItem[];
  title?: string;
  className?: string;
}

export function ImmunizationRecord({
  records,
  title = "Immunization & Vaccine Registry",
  className,
}: ImmunizationRecordProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <Syringe className="h-5 w-5 text-urvos-primary" />
          <h3 className="font-bold text-base text-urvos-text">{title}</h3>
        </div>
        <span className="text-xs text-urvos-text-subtle">{records.length} record(s)</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {records.map((item) => (
          <div
            key={item.id}
            className="p-3.5 border border-urvos-border rounded-lg bg-urvos-surface-muted/40 space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-sm text-urvos-text">{item.vaccineName}</span>
                <Badge
                  variant={
                    item.status === "completed"
                      ? "success"
                      : item.status === "overdue"
                      ? "critical"
                      : "caution"
                  }
                >
                  {item.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-urvos-text-subtle mt-0.5">{item.targetDisease}</p>
            </div>

            <div className="pt-2 border-t border-urvos-border/50 flex items-center justify-between text-[11px] text-urvos-text-muted">
              <span>{item.doseNumber}</span>
              <span>Given: {item.dateGiven}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
