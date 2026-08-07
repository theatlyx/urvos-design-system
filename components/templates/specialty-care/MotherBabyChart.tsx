"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Baby, Heart, AlertTriangle, CheckCircle2, Thermometer, Activity } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

interface Vitals { time: string; temp: number; hr: number; rr: number; spo2: number; bp: string; }

const motherVitals: Vitals[] = [
  { time: "06:00", temp: 37.2, hr: 82, rr: 16, spo2: 98, bp: "120/78" },
  { time: "09:00", temp: 37.4, hr: 88, rr: 18, spo2: 97, bp: "118/75" },
  { time: "12:00", temp: 37.1, hr: 80, rr: 16, spo2: 99, bp: "122/80" },
];

const babyVitals: { time: string; hr: number; rr: number; temp: number; spo2: number; weight: string; }[] = [
  { time: "06:00", hr: 145, rr: 48, temp: 36.8, spo2: 96, weight: "3.2 kg" },
  { time: "09:00", hr: 142, rr: 46, temp: 37.0, spo2: 97, weight: "3.2 kg" },
  { time: "12:00", hr: 148, rr: 50, temp: 36.9, spo2: 97, weight: "3.2 kg" },
];

const apgarScores = [
  { time: "1 min", color: 2, cry: 2, movement: 1, pulse: 2, respiration: 2, total: 9 },
  { time: "5 min", color: 2, cry: 2, movement: 2, pulse: 2, respiration: 2, total: 10 },
];

export function MotherBabyChart({ className }: { className?: string }) {
  const [tab, setTab] = useState<"mother" | "baby">("mother");

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">Mother-Baby Chart</h1>
          <p className="text-xs text-urvos-text-subtle">Post-Partum Care · Delivered 24 Jul 2026 at 04:18 AM · Maternity Ward</p>
        </div>
        <Badge variant="success">Both Stable</Badge>
      </div>

      {/* DYAD CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm">P</div>
            <div>
              <p className="font-semibold text-sm">Priya Sharma (Mother)</p>
              <p className="text-xs text-urvos-text-subtle">MRN-9921 · 28y · G2P2 · LSCS</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[{ label: "HR", value: "82 bpm" }, { label: "BP", value: "120/78" }, { label: "SpO₂", value: "98%" }].map(v => (
              <div key={v.label} className="p-2 rounded-lg bg-urvos-background border border-urvos-border">
                <p className="font-bold text-urvos-primary">{v.value}</p>
                <p className="text-[10px] text-urvos-text-subtle">{v.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" /> Post-op stable · Uterus firm · No bleeding
          </div>
        </div>

        <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Baby Sharma (Neonate)</p>
              <p className="text-xs text-urvos-text-subtle">DOB: 24 Jul 2026 · 04:18 AM · Full-term · 3.2 kg</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[{ label: "HR", value: "145 bpm" }, { label: "SpO₂", value: "97%" }, { label: "Temp", value: "36.9°C" }].map(v => (
              <div key={v.label} className="p-2 rounded-lg bg-urvos-background border border-urvos-border">
                <p className="font-bold text-urvos-primary">{v.value}</p>
                <p className="text-[10px] text-urvos-text-subtle">{v.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" /> APGAR 9/10 (1 min) · Breastfeeding initiated
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-urvos-border">
        {(["mother", "baby"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={clsx("px-4 py-2 text-sm font-semibold capitalize transition-colors -mb-px border-b-2", tab === t ? "border-urvos-primary text-urvos-primary" : "border-transparent text-urvos-text-subtle hover:text-urvos-text")}>
            {t === "mother" ? "👩 Mother Vitals" : "👶 Baby Vitals & APGAR"}
          </button>
        ))}
      </div>

      {/* MOTHER VITALS TABLE */}
      {tab === "mother" && (
        <div className="rounded-xl border border-urvos-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-urvos-background border-b border-urvos-border">
              <tr>{["Time", "Temp (°C)", "HR (bpm)", "RR (/min)", "SpO₂ (%)", "BP (mmHg)"].map(col => (
                <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase">{col}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-urvos-border">
              {motherVitals.map(v => (
                <tr key={v.time} className="hover:bg-urvos-background">
                  <td className="px-4 py-2.5 font-semibold">{v.time}</td>
                  <td className="px-4 py-2.5 flex items-center gap-1"><Thermometer className="w-3 h-3 text-rose-400" />{v.temp}</td>
                  <td className="px-4 py-2.5 flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500" />{v.hr}</td>
                  <td className="px-4 py-2.5">{v.rr}</td>
                  <td className="px-4 py-2.5">{v.spo2}%</td>
                  <td className="px-4 py-2.5 font-semibold text-urvos-primary">{v.bp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BABY VITALS + APGAR */}
      {tab === "baby" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-urvos-border overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-urvos-background border-b border-urvos-border">
                <tr>{["Time", "HR (bpm)", "RR (/min)", "Temp (°C)", "SpO₂ (%)", "Weight"].map(col => (
                  <th key={col} className="px-4 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase">{col}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-urvos-border">
                {babyVitals.map(v => (
                  <tr key={v.time} className="hover:bg-urvos-background">
                    <td className="px-4 py-2.5 font-semibold">{v.time}</td>
                    <td className="px-4 py-2.5 flex items-center gap-1"><Heart className="w-3 h-3 text-blue-400" />{v.hr}</td>
                    <td className="px-4 py-2.5">{v.rr}</td>
                    <td className="px-4 py-2.5">{v.temp}</td>
                    <td className="px-4 py-2.5">{v.spo2}%</td>
                    <td className="px-4 py-2.5 font-semibold">{v.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* APGAR */}
          <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
            <h3 className="text-xs font-bold uppercase tracking-wider text-urvos-text-subtle mb-3">APGAR Scores</h3>
            <div className="grid grid-cols-2 gap-3">
              {apgarScores.map(a => (
                <div key={a.time} className={clsx("p-3 rounded-xl border text-center", a.total >= 7 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50")}>
                  <p className={clsx("text-3xl font-black", a.total >= 7 ? "text-emerald-600" : "text-amber-600")}>{a.total}</p>
                  <p className="text-sm font-semibold text-urvos-text">{a.time} APGAR</p>
                  <p className={clsx("text-xs font-medium", a.total >= 7 ? "text-emerald-600" : "text-amber-600")}>{a.total >= 7 ? "Normal" : "Needs Attention"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
