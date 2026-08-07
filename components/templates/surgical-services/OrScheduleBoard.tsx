"use client";

import React from "react";
import { clsx } from "clsx";
import { Stethoscope, Clock, ShieldCheck } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function OrScheduleBoard({ className }: { className?: string }) {
  const cases = [
    { id: "OR-1", suite: "OR Suite 1", procedure: "Laparoscopic Cholecystectomy", patient: "Ramesh Gupta", surgeon: "Dr. V. Malhotra", status: "In-Progress", startTime: "08:30 AM" },
    { id: "OR-2", suite: "OR Suite 2", procedure: "Total Knee Arthroplasty", patient: "Sunita Rao", surgeon: "Dr. A. Kulkarni", status: "Pre-Op Prep", startTime: "10:00 AM" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Operating Room (OR) Master Schedule Board</h1>
          <p className="text-xs text-urvos-text-subtle">Suite turnover, anesthesia readiness, and intra-operative case tracking</p>
        </div>
        <Badge variant="caution">2 OR Suites Active</Badge>
      </div>

      <div className="space-y-3">
        {cases.map((c) => (
          <div key={c.id} className="p-4 bg-urvos-surface border border-urvos-border rounded-xl flex items-center justify-between text-xs">
            <div className="space-y-1">
              <div className="font-bold text-sm text-urvos-text">{c.suite} • {c.procedure}</div>
              <div className="text-urvos-text-subtle">Patient: {c.patient} • Surgeon: {c.surgeon} • Start: {c.startTime}</div>
            </div>
            <Badge variant={c.status === "In-Progress" ? "success" : "caution"}>{c.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
