"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Heart, Thermometer, Activity, Wifi, WifiOff, Bell, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "../../ui/Badge";

interface Patient { id: number; name: string; mrn: string; condition: string; hr: number; bp: string; spo2: number; temp: number; rr: number; status: "stable" | "warning" | "critical"; connected: boolean; }

const patients: Patient[] = [
  { id: 1, name: "Rajesh Kumar", mrn: "MRN-8819", condition: "Post-ACS monitoring", hr: 72, bp: "124/80", spo2: 98, temp: 37.1, rr: 16, status: "stable", connected: true },
  { id: 2, name: "Meena Iyer", mrn: "MRN-4421", condition: "CHF — cardiac rehab", hr: 88, bp: "138/90", spo2: 94, temp: 37.3, rr: 19, status: "warning", connected: true },
  { id: 3, name: "Suresh Patel", mrn: "MRN-7762", condition: "COPD — home O2", hr: 92, bp: "145/95", spo2: 91, temp: 36.8, rr: 22, status: "critical", connected: true },
  { id: 4, name: "Kavitha Nair", mrn: "MRN-5530", condition: "Gestational DM", hr: 78, bp: "110/70", spo2: 99, temp: 37.0, rr: 15, status: "stable", connected: false },
];

const statusColor: Record<string, string> = { stable: "border-emerald-200 bg-emerald-50/50", warning: "border-amber-200 bg-amber-50/50", critical: "border-rose-300 bg-rose-50/50" };
const statusDot: Record<string, string> = { stable: "bg-emerald-500", warning: "bg-amber-500 animate-pulse", critical: "bg-rose-600 animate-pulse" };
const statusBadge: Record<string, "success" | "caution" | "critical"> = { stable: "success", warning: "caution", critical: "critical" };

function VitalChip({ label, value, unit, alert }: { label: string; value: string | number; unit: string; alert?: boolean }) {
  return (
    <div className={clsx("flex flex-col items-center px-2.5 py-2 rounded-lg border text-center min-w-[60px]", alert ? "border-rose-200 bg-rose-50" : "border-urvos-border bg-urvos-background")}>
      <p className={clsx("text-base font-black leading-tight", alert ? "text-rose-600" : "text-urvos-text")}>{value}</p>
      <p className={clsx("text-[10px]", alert ? "text-rose-500" : "text-urvos-text-subtle")}>{unit}</p>
      <p className="text-[9px] text-urvos-text-subtle mt-0.5">{label}</p>
    </div>
  );
}

export function RemoteMonitoringDashboard({ className }: { className?: string }) {
  const [selected, setSelected] = useState(1);
  const active = patients.find(p => p.id === selected)!;

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Wifi className="w-5 h-5 text-urvos-primary" /> Remote Patient Monitoring
          </h1>
          <p className="text-xs text-urvos-text-subtle">4 patients · Live vitals stream · Auto-alert at threshold breach</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success">3 Online</Badge>
          <Badge variant="neutral">1 Offline</Badge>
          <Badge variant="critical">1 Critical</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* PATIENT ROSTER */}
        <div className="space-y-2">
          {patients.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id)} className={clsx("w-full text-left p-3 rounded-xl border-2 transition-all", selected === p.id ? "border-urvos-primary bg-urvos-primary/5" : statusColor[p.status] + " hover:opacity-90")}>
              <div className="flex items-start gap-2.5">
                <div className="relative mt-0.5">
                  <div className="w-8 h-8 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className={clsx("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-urvos-surface", p.connected ? statusDot[p.status] : "bg-slate-400")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold truncate">{p.name}</p>
                    <Badge variant={statusBadge[p.status]} className="text-[9px] py-0 shrink-0">{p.status}</Badge>
                  </div>
                  <p className="text-[10px] text-urvos-text-subtle">{p.mrn}</p>
                  <p className="text-[10px] text-urvos-text-subtle truncate mt-0.5">{p.condition}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-semibold">
                    <span className="flex items-center gap-0.5"><Heart className="w-2.5 h-2.5 text-rose-500" />{p.hr}</span>
                    <span>{p.bp}</span>
                    <span className={clsx(p.spo2 < 94 ? "text-rose-600" : "text-emerald-600")}>SpO₂ {p.spo2}%</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        <div className="lg:col-span-2 space-y-4">
          <div className={clsx("p-4 rounded-xl border-2 space-y-4", statusColor[active.status])}>
            {/* Patient header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-base">{active.name}</p>
                <p className="text-xs text-urvos-text-subtle">{active.mrn} · {active.condition}</p>
              </div>
              <div className="flex items-center gap-2">
                {active.connected ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-slate-400" />}
                <Badge variant={statusBadge[active.status]}>{active.status}</Badge>
              </div>
            </div>

            {/* VITALS GRID */}
            <div className="flex flex-wrap gap-2">
              <VitalChip label="Heart Rate" value={active.hr} unit="bpm" alert={active.hr > 100 || active.hr < 50} />
              <VitalChip label="Blood Pressure" value={active.bp} unit="mmHg" alert={parseInt(active.bp.split("/")[0]) > 140} />
              <VitalChip label="SpO₂" value={active.spo2} unit="%" alert={active.spo2 < 94} />
              <VitalChip label="Temperature" value={active.temp} unit="°C" alert={active.temp > 38.5} />
              <VitalChip label="Resp. Rate" value={active.rr} unit="/min" alert={active.rr > 20 || active.rr < 12} />
            </div>

            {/* CRITICAL ALERT */}
            {active.status === "critical" && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-600 text-white text-sm font-semibold">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                SpO₂ {active.spo2}% — Below threshold (94%). Oxygen therapy review required immediately.
              </div>
            )}
            {active.status === "warning" && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500 text-white text-sm font-semibold">
                <Bell className="w-5 h-5 shrink-0" />
                BP elevated at {active.bp} mmHg. Review antihypertensive plan.
              </div>
            )}
            {active.status === "stable" && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-700 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                All vitals within target range. Continue current monitoring protocol.
              </div>
            )}
          </div>

          {/* SIMULATED TREND (sparkline) */}
          <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
            <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">HR Trend — Last 12h</h3>
            <svg viewBox="0 0 400 60" className="w-full">
              <polyline points="0,40 30,38 60,35 90,42 120,38 150,32 180,36 210,30 240,35 270,33 300,36 330,34 360,32 390,35" fill="none" stroke="var(--color-urvos-primary, #3b82f6)" strokeWidth="2" />
              <polyline points="0,40 30,38 60,35 90,42 120,38 150,32 180,36 210,30 240,35 270,33 300,36 330,34 360,32 390,35 390,60 0,60" fill="var(--color-urvos-primary, #3b82f6)" fillOpacity="0.1" />
            </svg>
            <div className="flex justify-between text-[10px] text-urvos-text-subtle mt-1">
              <span>12h ago</span><span>6h ago</span><span>Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
