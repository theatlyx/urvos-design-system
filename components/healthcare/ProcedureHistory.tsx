"use client";

import React from "react";
import { clsx } from "clsx";
import { Stethoscope, Calendar, UserCheck } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface ProcedureItem {
  id: string;
  procedureName: string;
  code?: string; // SNOMED / CPT
  performedDate: string;
  performerName: string;
  status: "completed" | "in-progress" | "stopped";
  outcome?: string;
}

export interface ProcedureHistoryProps {
  procedures: ProcedureItem[];
  title?: string;
  className?: string;
}

export function ProcedureHistory({
  procedures,
  title = "Surgical & Clinical Procedure History",
  className,
}: ProcedureHistoryProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-urvos-primary" />
          <h3 className="font-bold text-base text-urvos-text">{title}</h3>
        </div>
      </div>

      <div className="space-y-3">
        {procedures.map((proc) => (
          <div key={proc.id} className="p-4 border border-urvos-border rounded-lg bg-urvos-surface space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-sm text-urvos-text">{proc.procedureName}</h4>
                {proc.code && <span className="text-xs text-urvos-text-subtle font-mono">Code: {proc.code}</span>}
              </div>
              <Badge variant={proc.status === "completed" ? "success" : "caution"}>
                {proc.status}
              </Badge>
            </div>

            {proc.outcome && <p className="text-xs text-urvos-text-subtle">Outcome: {proc.outcome}</p>}

            <div className="flex items-center gap-4 text-[11px] text-urvos-text-muted pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Performed: {proc.performedDate}
              </span>
              <span className="flex items-center gap-1">
                <UserCheck className="h-3 w-3" /> By: {proc.performerName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
