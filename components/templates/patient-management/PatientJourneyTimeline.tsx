"use client";

import React from "react";
import { clsx } from "clsx";
import { Clock, Calendar, Stethoscope, TestTube, FileText } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function PatientJourneyTimeline({ className }: { className?: string }) {
  const events = [
    { date: "2026-07-24", title: "OPD Cardiology Consult", type: "Encounter", provider: "Dr. Anita Sharma", status: "Completed" },
    { date: "2026-07-20", title: "12-Lead ECG & Blood Panel", type: "Lab", provider: "Fortis Diagnostics", status: "Verified" },
    { date: "2026-06-10", title: "Annual Physical Exam", type: "Encounter", provider: "Dr. Rajesh Gupta", status: "Archived" },
  ];

  return (
    <div className={clsx("max-w-2xl mx-auto space-y-6 font-sans text-urvos-text", className)}>
      <div className="border-b border-urvos-border pb-4">
        <h1 className="text-xl font-bold text-urvos-text">Patient Episode-of-Care Journey</h1>
        <p className="text-xs text-urvos-text-subtle">Chronological timeline of encounters, diagnostic labs, and treatments</p>
      </div>

      <div className="space-y-4 relative border-l-2 border-urvos-primary/30 pl-4 ml-2">
        {events.map((e, idx) => (
          <div key={idx} className="relative space-y-1">
            <div className="w-3 h-3 bg-urvos-primary rounded-full absolute -left-[23px] top-1 border-2 border-urvos-surface" />
            <div className="text-[11px] font-mono text-urvos-text-subtle">{e.date}</div>
            <div className="p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-urvos-text">{e.title}</div>
                <div className="text-urvos-text-subtle">{e.provider}</div>
              </div>
              <Badge variant="neutral">{e.type}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
