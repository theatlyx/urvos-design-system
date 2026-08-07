"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { AlertTriangle, Target, ListChecks, RefreshCw, CheckCircle2, Plus, Clock } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

interface Goal { id: number; domain: string; goal: string; metric: string; targetDate: string; status: "active" | "achieved" | "modified"; }
interface Intervention { id: number; goalId: number; type: string; action: string; frequency: string; assignedTo: string; status: "ordered" | "inprogress" | "done"; }

const goals: Goal[] = [
  { id: 1, domain: "Cardiac", goal: "Stabilize hemodynamic status", metric: "BP < 140/90, HR 60-100", targetDate: "72h", status: "active" },
  { id: 2, domain: "Pain", goal: "Achieve adequate chest pain relief", metric: "VAS Pain Score < 3/10", targetDate: "24h", status: "active" },
  { id: 3, domain: "Medications", goal: "Optimize antiplatelet therapy", metric: "Aspirin + Ticagrelor DAPT initiated", targetDate: "Today", status: "achieved" },
  { id: 4, domain: "Mobility", goal: "Ambulate in room without dyspnea", metric: "Borg Scale < 3 post-ambulation", targetDate: "Day 3", status: "active" },
  { id: 5, domain: "Education", goal: "Patient understands cardiac risk factors", metric: "Patient can name 3 modifiable risk factors", targetDate: "Day 2", status: "active" },
];

const interventions: Intervention[] = [
  { id: 1, goalId: 1, type: "Monitoring", action: "Continuous ECG monitoring", frequency: "Continuous", assignedTo: "Nurse", status: "inprogress" },
  { id: 2, goalId: 1, type: "Medication", action: "Metoprolol 25mg BD for rate control", frequency: "BD", assignedTo: "Nurse", status: "ordered" },
  { id: 3, goalId: 2, type: "PRN Medication", action: "Morphine 2mg IV PRN severe pain (>6/10)", frequency: "PRN", assignedTo: "Nurse", status: "ordered" },
  { id: 4, goalId: 3, type: "Medication", action: "Aspirin 100mg + Ticagrelor 90mg DAPT", frequency: "OD + BD", assignedTo: "Nurse", status: "done" },
  { id: 5, goalId: 4, type: "Physiotherapy", action: "Graded ambulation — bedside sitting Day 1", frequency: "Twice daily", assignedTo: "PT Dept", status: "ordered" },
  { id: 6, goalId: 5, type: "Education", action: "Cardiac rehab education: diet, activity, meds", frequency: "Once", assignedTo: "Clinical Educator", status: "ordered" },
];

const domainColor: Record<string, string> = { Cardiac: "bg-rose-50 text-rose-700 border-rose-200", Pain: "bg-amber-50 text-amber-700 border-amber-200", Medications: "bg-violet-50 text-violet-700 border-violet-200", Mobility: "bg-emerald-50 text-emerald-700 border-emerald-200", Education: "bg-blue-50 text-blue-700 border-blue-200" };
const intStatusColor: Record<string, string> = { ordered: "text-amber-600", inprogress: "text-blue-600", done: "text-emerald-600" };
const intStatusIcon: Record<string, React.ReactNode> = { ordered: <Clock className="w-3 h-3" />, inprogress: <RefreshCw className="w-3 h-3" />, done: <CheckCircle2 className="w-3 h-3" /> };

export function CarePlanCreation({ className }: { className?: string }) {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const relatedInterventions = selectedGoal ? interventions.filter(i => i.goalId === selectedGoal) : interventions;

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">Care Plan</h1>
          <p className="text-xs text-urvos-text-subtle">Rajesh Kumar · MRN-8819 · NSTEMI · Admitted 24 Jul 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">NSTEMI — Active Plan</Badge>
          <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add Goal</Button>
        </div>
      </div>

      {/* GOALS GRID */}
      <div>
        <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-urvos-primary" /> Care Goals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {goals.map(goal => (
            <button key={goal.id} onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)} className={clsx("p-3 rounded-xl border text-left transition-all", selectedGoal === goal.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background")}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-full border", domainColor[goal.domain])}>{goal.domain}</span>
                {goal.status === "achieved"
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  : <Clock className="w-4 h-4 text-amber-500 shrink-0" />}
              </div>
              <p className="text-sm font-semibold leading-tight">{goal.goal}</p>
              <p className="text-[10px] text-urvos-text-subtle mt-1">{goal.metric}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-urvos-text-subtle">Target: {goal.targetDate}</span>
                <span className="text-[10px] text-urvos-primary font-medium">{interventions.filter(i => i.goalId === goal.id).length} interventions</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* INTERVENTIONS */}
      <div>
        <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3 flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-urvos-primary" />
          {selectedGoal ? `Interventions for Goal #${selectedGoal}` : "All Interventions"}
          {selectedGoal && <button onClick={() => setSelectedGoal(null)} className="text-urvos-primary hover:underline font-normal">Clear filter</button>}
        </h2>
        <div className="rounded-xl border border-urvos-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-urvos-background border-b border-urvos-border">
              <tr>
                {["Type", "Intervention / Action", "Frequency", "Assigned To", "Status"].map(col => (
                  <th key={col} className="px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-urvos-border">
              {relatedInterventions.map(i => (
                <tr key={i.id} className="hover:bg-urvos-background transition-colors">
                  <td className="px-3 py-2.5"><Badge variant="info" className="text-[10px]">{i.type}</Badge></td>
                  <td className="px-3 py-2.5 font-medium">{i.action}</td>
                  <td className="px-3 py-2.5 text-urvos-text-subtle">{i.frequency}</td>
                  <td className="px-3 py-2.5 text-urvos-text-subtle">{i.assignedTo}</td>
                  <td className="px-3 py-2.5">
                    <span className={clsx("flex items-center gap-1 font-semibold capitalize", intStatusColor[i.status])}>
                      {intStatusIcon[i.status]} {i.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
