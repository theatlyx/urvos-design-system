"use client";

import React from "react";
import { clsx } from "clsx";
import { Target, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "../ui/Progress";

export interface GoalItem {
  id: string;
  title: string;
  targetDate: string;
  progressPct: number;
  status: "achieved" | "in-progress" | "cancelled";
  category: string;
}

export interface GoalTrackerProps {
  goals: GoalItem[];
  className?: string;
}

export function GoalTracker({ goals, className }: GoalTrackerProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-urvos-primary" />
          <h3 className="text-base font-bold text-urvos-text">FHIR Patient Health Goals</h3>
        </div>
        <span className="text-xs font-semibold text-urvos-text-subtle">{goals.length} active goals</span>
      </div>

      <div className="space-y-4">
        {goals.map((g) => (
          <div key={g.id} className="p-4 border border-urvos-border rounded-xl bg-urvos-surface space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded">
                {g.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-urvos-text-subtle">
                <Clock className="h-3.5 w-3.5" />
                <span>Target: {g.targetDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-urvos-text">{g.title}</span>
              <span className="text-xs font-bold text-urvos-text">{g.progressPct}%</span>
            </div>

            <Progress value={g.progressPct} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
