"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Radio, Users, MapPin, Activity, AlertTriangle, CheckCircle2, Phone, Zap } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

type Code = "blue" | "red" | "black" | "yellow";

const codes: { code: Code; label: string; desc: string; color: string; active: boolean }[] = [
  { code: "blue", label: "Code Blue", desc: "Cardiac / Respiratory Arrest", color: "bg-blue-600 text-white border-blue-600", active: true },
  { code: "red", label: "Code Red", desc: "Fire Emergency", color: "bg-rose-600 text-white border-rose-600", active: false },
  { code: "black", label: "Code Black", desc: "Bomb Threat / Security", color: "bg-gray-900 text-white border-gray-900", active: false },
  { code: "yellow", label: "Code Yellow", desc: "Internal Disaster / Mass Casualty", color: "bg-amber-500 text-white border-amber-500", active: false },
];

const codeBlueLog = [
  { time: "09:42:05", actor: "Nurse Anita Desai (ICU)", msg: "Code Blue activated — Bed 14A — Meena Iyer, MRN-4421 — Cardiac arrest", type: "activation" },
  { time: "09:42:12", actor: "System", msg: "Alert broadcast sent to Crash Team: Dr. Sharma, Dr. Nair, Anesthesia, Pharmacy", type: "system" },
  { time: "09:42:30", actor: "Dr. A. Sharma", msg: "On my way — 3 minutes out", type: "response" },
  { time: "09:42:45", actor: "Dr. P. Nair (Cardio)", msg: "Acknowledged. CPR started? Defib ready?", type: "response" },
  { time: "09:43:00", actor: "Nurse Anita Desai", msg: "CPR in progress. AED attached. Rhythm: VF", type: "update" },
  { time: "09:43:10", actor: "System", msg: "Crash cart dispatched to ICU Bed 14A", type: "system" },
  { time: "09:44:00", actor: "Dr. A. Sharma", msg: "Arrived. Shock delivered 200J. Resuming CPR.", type: "update" },
  { time: "09:47:30", actor: "Dr. A. Sharma", msg: "ROSC achieved. Sinus rhythm. Moving to monitored bed.", type: "resolved" },
];

const logStyle: Record<string, string> = {
  activation: "border-rose-200 bg-rose-50 text-rose-700",
  system: "border-urvos-border bg-urvos-background text-urvos-text-subtle",
  response: "border-blue-200 bg-blue-50 text-blue-700",
  update: "border-amber-200 bg-amber-50 text-amber-700",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

export function EmergencyCodeManager({ className }: { className?: string }) {
  const [activeCode, setActiveCode] = useState<Code | null>("blue");
  const [broadcastMsg, setBroadcastMsg] = useState("");

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-600 animate-pulse" /> Emergency Code Manager
          </h1>
          <p className="text-xs text-urvos-text-subtle">Apollo Hospitals, Mumbai · Broadcast to all departments instantly</p>
        </div>
        <Badge variant="critical">1 Active Code</Badge>
      </div>

      {/* CODE BUTTONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {codes.map(c => (
          <button key={c.code} onClick={() => setActiveCode(activeCode === c.code ? null : c.code)} className={clsx("p-3 rounded-xl border-2 text-left transition-all", c.active ? c.color + " shadow-lg" : "bg-urvos-surface border-urvos-border text-urvos-text hover:bg-urvos-background")}>
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm">{c.label}</p>
              {c.active && <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
            </div>
            <p className={clsx("text-[10px] mt-0.5", c.active ? "opacity-80" : "text-urvos-text-subtle")}>{c.desc}</p>
          </button>
        ))}
      </div>

      {/* ACTIVE CODE PANEL */}
      {activeCode === "blue" && (
        <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50/40 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-blue-700 text-base flex items-center gap-2">
                <Zap className="w-5 h-5" /> CODE BLUE — ACTIVE
              </h2>
              <p className="text-xs text-blue-600">ICU Bed 14A · Meena Iyer (MRN-4421) · Cardiac Arrest · Since 09:42:05</p>
            </div>
            <Button size="sm" variant="secondary" className="text-blue-700 border-blue-400">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resolve Code
            </Button>
          </div>

          {/* Crash Team Status */}
          <div>
            <p className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-2">Crash Team Status</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Dr. A. Sharma", role: "Lead Physician", status: "arrived" },
                { name: "Dr. P. Nair", role: "Cardiology", status: "arrived" },
                { name: "Dr. R. Gupta", role: "Anesthesia", status: "en-route" },
                { name: "Pharmacy", role: "Crash Meds", status: "dispatched" },
              ].map(m => (
                <div key={m.name} className={clsx("flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium", m.status === "arrived" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : m.status === "en-route" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-blue-200 bg-blue-50 text-blue-700")}>
                  {m.status === "arrived" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-[10px] opacity-70">{m.role} · {m.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast */}
          <div className="flex gap-2">
            <input type="text" value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} placeholder="Broadcast update to crash team…" className="flex-1 px-3 py-2 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/40" />
            <Button size="sm"><Radio className="w-3.5 h-3.5 mr-1" /> Broadcast</Button>
          </div>
        </div>
      )}

      {/* EVENT LOG */}
      <div>
        <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">Code Blue Event Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {codeBlueLog.map((entry, i) => (
            <div key={i} className={clsx("flex items-start gap-3 p-2.5 rounded-xl border text-xs", logStyle[entry.type])}>
              <span className="font-mono shrink-0 opacity-70">{entry.time}</span>
              <div>
                <p className="font-semibold">{entry.actor}</p>
                <p className="opacity-90 leading-relaxed">{entry.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
