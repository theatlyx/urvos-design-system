"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { AlertTriangle, CheckCircle2, Clock, ArrowRight, User, FileText, Stethoscope, Pill, FlaskConical } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const handoffs = [
  {
    id: 1,
    patient: "Rajesh Kumar",
    mrn: "MRN-8819",
    age: 45,
    gender: "M",
    bed: "Room 302 / Bed A",
    diagnosis: "ACS — Unstable Angina",
    handingOff: "Dr. A. Sharma",
    receivingTo: "Dr. P. Nair",
    shift: "Night → Morning",
    acuity: "HIGH",
    flags: ["Active Chest Pain", "Awaiting Cath Lab", "NPO since 22:00"],
    situation: "Patient admitted 8h ago with exertional chest pain and ST-depression V4-V6. Troponin borderline at 0.12.",
    background: "Known HTN & DM2. On Telmisartan, Metformin. No prior cardiac history. Allergic to Penicillin.",
    assessment: "Likely NSTEMI. Awaiting repeat Troponin at 06:00. Cardiology consulted. Cath lab on standby.",
    recommendations: "Continue dual antiplatelet. NPO. Repeat ECG q2h. If Troponin positive → activate cath lab.",
    signed: false,
  },
  {
    id: 2,
    patient: "Meena Iyer",
    mrn: "MRN-4421",
    age: 62,
    gender: "F",
    bed: "Room 210 / Bed B",
    diagnosis: "Septic Shock — UTI source",
    handingOff: "Dr. V. Reddy",
    receivingTo: "Dr. A. Sharma",
    shift: "Night → Morning",
    acuity: "CRITICAL",
    flags: ["Active Vasopressors", "MAP < 65", "Blood Cx Pending"],
    situation: "Patient presented with fever, hypotension and altered sensorium. Source likely UTI → pyelonephritis.",
    background: "DM2, CKD stage 3. On insulin. Last creatinine 2.1 mg/dL.",
    assessment: "Septic shock. On Norepinephrine 0.12 mcg/kg/min, MAP 63. Meropenem started 4h ago.",
    recommendations: "Target MAP ≥65. Reassess vasopressors hourly. Follow blood cultures. Nephrology consult if Cr rises.",
    signed: true,
  },
];

const acuityColor: Record<string, string> = {
  HIGH: "bg-urvos-warning-bg text-urvos-warning border-urvos-warning",
  CRITICAL: "bg-urvos-danger-bg text-urvos-danger border-urvos-danger",
  MODERATE: "bg-urvos-glass text-urvos-primary border-urvos-primary",
};

export function ClinicalHandoffView({ className }: { className?: string }) {
  const [selected, setSelected] = useState(1);
  const active = handoffs.find(h => h.id === selected)!;

  return (
    <div className={clsx("space-y-4 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">Clinical Handoff — SBAR</h1>
          <p className="text-xs text-urvos-text-subtle">Shift: Night → Morning Shift • {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-urvos-text-subtle">
          <span className="px-2 py-1 rounded-full bg-urvos-primary/10 text-urvos-primary font-semibold">
            {handoffs.length} Patients to Handoff
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* PATIENT LIST */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider">Handoff Roster</h3>
          {handoffs.map(h => (
            <button key={h.id} onClick={() => setSelected(h.id)} className={clsx("w-full text-left p-3 rounded-xl border transition-all", selected === h.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background")}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{h.patient}</p>
                  <p className="text-[10px] text-urvos-text-subtle">{h.mrn} · {h.bed}</p>
                  <p className="text-[10px] text-urvos-primary font-medium mt-0.5">{h.diagnosis}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={clsx("text-[10px] font-bold px-1.5 py-0.5 rounded border", acuityColor[h.acuity])}>{h.acuity}</span>
                  {h.signed ? <CheckCircle2 className="w-4 h-4 text-urvos-success" /> : <Clock className="w-4 h-4 text-urvos-warning" />}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {h.flags.slice(0, 2).map(f => (
                  <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full bg-urvos-danger-bg border border-urvos-danger text-urvos-danger font-medium">⚠ {f}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* SBAR DETAIL */}
        <div className="lg:col-span-2 space-y-3">
          {/* Patient Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-urvos-border bg-urvos-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center font-bold text-sm">
                {active.patient.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-sm">{active.patient} · {active.age}y {active.gender}</p>
                <p className="text-xs text-urvos-text-subtle">{active.mrn} · {active.bed}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={clsx("text-xs font-bold px-2 py-0.5 rounded-full border", acuityColor[active.acuity])}>
                <AlertTriangle className="w-3 h-3 inline mr-1" />{active.acuity} ACUITY
              </span>
              <p className="text-[10px] text-urvos-text-subtle">{active.handingOff} <ArrowRight className="w-3 h-3 inline" /> {active.receivingTo}</p>
            </div>
          </div>

          {/* Active Flags */}
          <div className="flex flex-wrap gap-1.5">
            {active.flags.map(f => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-urvos-danger-bg border border-urvos-danger text-urvos-danger font-semibold">⚠ {f}</span>
            ))}
          </div>

          {/* SBAR Cards */}
          {[
            { icon: Stethoscope, label: "S — Situation", color: "text-urvos-primary bg-urvos-glass border-urvos-primary", content: active.situation },
            { icon: FileText, label: "B — Background", color: "text-violet-600 bg-violet-50 border-violet-200", content: active.background },
            { icon: FlaskConical, label: "A — Assessment", color: "text-urvos-warning bg-urvos-warning-bg border-urvos-warning", content: active.assessment },
            { icon: Pill, label: "R — Recommendations", color: "text-urvos-success bg-urvos-success-bg border-urvos-success", content: active.recommendations },
          ].map(({ icon: Icon, label, color, content }) => (
            <div key={label} className={clsx("p-3 rounded-xl border text-sm", color)}>
              <p className="font-bold text-xs mb-1 flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" />{label}</p>
              <p className="text-xs leading-relaxed opacity-90">{content}</p>
            </div>
          ))}

          {/* Sign-off */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-urvos-text-subtle">
              Receiving: <span className="font-semibold text-urvos-text">{active.receivingTo}</span>
            </p>
            {active.signed ? (
              <span className="flex items-center gap-1.5 text-xs text-urvos-success font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Handoff Signed
              </span>
            ) : (
              <Button size="sm">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Sign & Accept Handoff
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
