"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { BookOpen, Heart, Clock, CheckCircle2, User, MapPin, Phone, Calendar, AlertTriangle, Plus } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

type SessionStatus = "completed" | "scheduled" | "missed" | "cancelled";

const sessions = [
  { id: 1, patient: "Arun Mehta", mrn: "MRN-6612", date: "Mon, 21 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "CBT — Individual", goals: "Cognitive restructuring, thought journalling", status: "completed" as SessionStatus, notes: "Patient showed improved affect. Completed thought record exercise independently." },
  { id: 2, patient: "Arun Mehta", mrn: "MRN-6612", date: "Wed, 23 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "CBT — Individual", goals: "Behavioral activation, scheduling pleasant activities", status: "completed" as SessionStatus, notes: "Completed weekly activity schedule. Walked 20 min daily." },
  { id: 3, patient: "Arun Mehta", mrn: "MRN-6612", date: "Fri, 25 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "Group Therapy — Social Anxiety", goals: "Peer interaction, graded exposure", status: "scheduled" as SessionStatus, notes: "" },
  { id: 4, patient: "Arun Mehta", mrn: "MRN-6612", date: "Mon, 28 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "Family Session", goals: "Psychoeducation, communication skills", status: "scheduled" as SessionStatus, notes: "" },
];

const sessionStatusStyle: Record<SessionStatus, string> = {
  completed: "bg-emerald-50 border-emerald-200 text-emerald-700",
  scheduled: "bg-blue-50 border-blue-200 text-blue-700",
  missed: "bg-rose-50 border-rose-200 text-rose-700",
  cancelled: "bg-slate-50 border-slate-200 text-slate-500",
};
const sessionStatusIcon: Record<SessionStatus, React.ReactNode> = {
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
  scheduled: <Clock className="w-3.5 h-3.5" />,
  missed: <AlertTriangle className="w-3.5 h-3.5" />,
  cancelled: <AlertTriangle className="w-3.5 h-3.5" />,
};

const treatmentGoals = [
  { goal: "Reduce PHQ-9 score to < 5 (minimal depression)", progress: 85, current: 5, target: 5, achieved: true },
  { goal: "Eliminate suicidal ideation (Item 9 = 0)", progress: 100, current: 0, target: 0, achieved: true },
  { goal: "Improve sleep — 7+ hours without medication", progress: 60, current: 5.5, target: 7, achieved: false },
  { goal: "Return to work (part-time initially)", progress: 30, current: null, target: null, achieved: false },
];

export function TherapyPlanViewer({ className }: { className?: string }) {
  const [selected, setSelected] = useState(0);
  const active = sessions[selected];

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-urvos-primary" /> Therapy Plan Viewer
          </h1>
          <p className="text-xs text-urvos-text-subtle">Arun Mehta · MRN-6612 · CBT Program — Major Depressive Disorder · Week 8 of 12</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary"><Plus className="w-3.5 h-3.5 mr-1" /> Add Session</Button>
          <Button size="sm">Update Goals</Button>
        </div>
      </div>

      {/* TREATMENT GOALS */}
      <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-3">
        <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-urvos-primary" /> Treatment Goals
        </h2>
        {treatmentGoals.map((g, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium flex-1">{g.goal}</p>
              {g.achieved
                ? <span className="text-emerald-600 flex items-center gap-1 text-xs font-semibold shrink-0"><CheckCircle2 className="w-3.5 h-3.5" /> Achieved</span>
                : <span className="text-xs font-semibold text-amber-600 shrink-0">{g.progress}%</span>}
            </div>
            <div className="h-1.5 bg-urvos-background rounded-full overflow-hidden">
              <div className={clsx("h-full rounded-full transition-all", g.achieved ? "bg-emerald-500" : "bg-urvos-primary")} style={{ width: `${g.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* SESSION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider">Session Roster</h2>
          {sessions.map((s, i) => (
            <button key={s.id} onClick={() => setSelected(i)} className={clsx("w-full text-left p-3 rounded-xl border transition-all", selected === i ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background")}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold">{s.date} · {s.time}</p>
                  <p className="text-xs text-urvos-primary font-medium">{s.type}</p>
                  <p className="text-[10px] text-urvos-text-subtle mt-0.5">{s.therapist}</p>
                </div>
                <span className={clsx("flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize", sessionStatusStyle[s.status])}>
                  {sessionStatusIcon[s.status]} {s.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* SESSION DETAIL */}
        <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold text-sm">{active.date} at {active.time}</p>
              <p className="text-xs text-urvos-primary font-medium">{active.type}</p>
            </div>
            <span className={clsx("flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border", sessionStatusStyle[active.status])}>
              {sessionStatusIcon[active.status]} {active.status.charAt(0).toUpperCase() + active.status.slice(1)}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 text-urvos-text-subtle">
              <User className="w-3.5 h-3.5" /> <span className="font-medium text-urvos-text">{active.therapist}</span>
            </div>
            <div className="flex items-center gap-2 text-urvos-text-subtle">
              <Clock className="w-3.5 h-3.5" /> <span className="font-medium text-urvos-text">50 minute session</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1">Session Goals</p>
            <p className="text-xs leading-relaxed">{active.goals}</p>
          </div>

          {active.notes && (
            <div>
              <p className="text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1">Therapist Notes</p>
              <div className="p-3 rounded-lg bg-urvos-background border border-urvos-border text-xs leading-relaxed">{active.notes}</div>
            </div>
          )}

          {active.status === "scheduled" && (
            <div className="flex gap-2 pt-2 border-t border-urvos-border">
              <Button size="sm" className="flex-1 justify-center">Start Session</Button>
              <Button size="sm" variant="secondary">Reschedule</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
