"use client";

import React from "react";
import { clsx } from "clsx";
import { Calendar, UserCheck } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function HomeHealthScheduler({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Home Visit Care Scheduler & Nurse Routing</h1>
          <p className="text-xs text-urvos-text-subtle">Home nurse dispatch, GPS routing, and home blood draw appointments</p>
        </div>
        <Badge variant="info">3 Home Visits Scheduled Today</Badge>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs">
        <div className="font-bold text-sm text-urvos-text">Nurse: Sister Lakshmi (RN)</div>
        <div className="text-urvos-text-subtle">Visit 1 (10:00 AM): Wound Dressing Change • Patient: Mrs. Kapadia</div>
      </div>
    </div>
  );
}
