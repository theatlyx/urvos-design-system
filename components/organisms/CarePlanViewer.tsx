"use client";

import React from "react";
import { clsx } from "clsx";
import { ClipboardList, Target, CheckCircle } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface CarePlanGoal {
  id: string;
  description: string;
  targetDate: string;
  status: "achieved" | "in-progress" | "on-hold";
}

export interface CarePlanActivity {
  id: string;
  title: string;
  frequency: string;
}

export interface CarePlanViewerProps {
  title?: string;
  category?: string;
  status?: "active" | "completed" | "draft";
  goals: CarePlanGoal[];
  activities: CarePlanActivity[];
  className?: string;
}

export function CarePlanViewer({
  title = "Post-MI Cardiac Rehabilitation Plan",
  category = "Cardiology Management",
  status = "active",
  goals,
  activities,
  className,
}: CarePlanViewerProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-urvos-primary" />
          <div>
            <h3 className="font-bold text-base text-urvos-text">{title}</h3>
            <span className="text-xs text-urvos-text-subtle">{category}</span>
          </div>
        </div>
        <Badge variant={status === "active" ? "success" : "neutral"}>{status.toUpperCase()}</Badge>
      </div>

      {/* Goals */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-urvos-text-subtle uppercase flex items-center gap-1">
          <Target className="h-3.5 w-3.5" /> Clinical Goals ({goals.length})
        </h4>
        <div className="space-y-1.5">
          {goals.map((g) => (
            <div key={g.id} className="flex items-center justify-between p-2.5 rounded bg-urvos-surface-muted/50 text-xs">
              <span className="font-medium text-urvos-text">{g.description}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-urvos-text-muted">Target: {g.targetDate}</span>
                <Badge variant={g.status === "achieved" ? "success" : "caution"}>{g.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-2 pt-2 border-t border-urvos-border">
        <h4 className="text-xs font-bold text-urvos-text-subtle uppercase flex items-center gap-1">
          <CheckCircle className="h-3.5 w-3.5" /> Interventions & Activities
        </h4>
        <div className="grid gap-2 md:grid-cols-2">
          {activities.map((a) => (
            <div key={a.id} className="p-2.5 rounded border border-urvos-border bg-urvos-surface text-xs">
              <span className="font-semibold text-urvos-text block">{a.title}</span>
              <span className="text-urvos-text-subtle text-[11px]">Frequency: {a.frequency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
