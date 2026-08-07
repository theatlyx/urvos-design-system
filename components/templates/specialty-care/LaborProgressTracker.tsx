"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Activity, Clock, AlertTriangle, Heart, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

// Mock partograph data: cervical dilation at each hour
const partographData = [
  { hour: 0, dilation: 3, alertLine: 3, actionLine: 3, fhr: 142, contractions: 2 },
  { hour: 1, dilation: 3.5, alertLine: 4, actionLine: 4, fhr: 138, contractions: 2 },
  { hour: 2, dilation: 4, alertLine: 5, actionLine: 5, fhr: 145, contractions: 3 },
  { hour: 3, dilation: 5, alertLine: 6, actionLine: 6, fhr: 150, contractions: 3 },
  { hour: 4, dilation: 6, alertLine: 7, actionLine: 7, fhr: 148, contractions: 4 },
  { hour: 5, dilation: 6.5, alertLine: 8, actionLine: 8, fhr: 143, contractions: 4 },
  { hour: 6, dilation: 7, alertLine: 9, actionLine: 9, fhr: 136, contractions: 5 },
  { hour: 7, dilation: 8, alertLine: 10, actionLine: 10, fhr: 152, contractions: 5 },
];

// Helper: map value 0-10 to SVG Y-axis (10=top=y10, 0=bottom=y200)
const yScale = (v: number, min = 0, max = 10, h = 200) => h - ((v - min) / (max - min)) * h + 10;
const xScale = (i: number, total = 8, w = 520) => 30 + (i / (total - 1)) * w;

export function LaborProgressTracker({ className }: { className?: string }) {
  const [currentDilation] = useState(7);
  const progressPct = (currentDilation / 10) * 100;

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">WHO Partograph — Labor Progress Tracker</h1>
          <p className="text-xs text-urvos-text-subtle">Priya Sharma · G2P1 · EDD: 28 Jul 2026 · POG: 39+2 weeks</p>
        </div>
        <Badge variant="caution">Active Labor · {currentDilation} cm Dilated</Badge>
      </div>

      {/* VITALS STRIP */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Cervical Dilation", value: `${currentDilation} cm`, sub: "/ 10 cm", color: "text-urvos-primary" },
          { label: "FHR (Last)", value: "152 bpm", sub: "Normal 120-160", color: "text-emerald-600" },
          { label: "Contractions", value: "5 / 10 min", sub: "≥ 45 sec duration", color: "text-amber-600" },
          { label: "Effacement", value: "80%", sub: "Near complete", color: "text-violet-600" },
        ].map(v => (
          <div key={v.label} className="p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center">
            <p className={clsx("text-2xl font-black", v.color)}>{v.value}</p>
            <p className="text-[10px] text-urvos-text-subtle">{v.sub}</p>
            <p className="text-[10px] font-semibold text-urvos-text-subtle mt-0.5">{v.label}</p>
          </div>
        ))}
      </div>

      {/* DILATION PROGRESS BAR */}
      <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Cervical Dilation Progress</p>
          <span className="text-xs text-urvos-text-subtle">{currentDilation} cm / 10 cm — Active Phase</span>
        </div>
        <div className="relative h-4 bg-urvos-background rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-urvos-primary rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          {/* Alert line at 7cm */}
          <div className="absolute inset-y-0 w-px bg-amber-500" style={{ left: "70%" }} />
          {/* Action line at 8cm */}
          <div className="absolute inset-y-0 w-px bg-rose-500" style={{ left: "80%" }} />
        </div>
        <div className="flex items-center gap-4 mt-2 text-[10px] text-urvos-text-subtle">
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-full bg-urvos-primary" /> Actual dilation</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-full bg-amber-500" /> Alert line (7cm)</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-full bg-rose-500" /> Action line (8cm)</span>
        </div>
      </div>

      {/* SVG PARTOGRAPH */}
      <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface overflow-x-auto">
        <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">Partograph Chart</h3>
        <svg viewBox="0 0 580 230" className="w-full min-w-[500px] font-sans">
          {/* Y-axis grid lines */}
          {[0, 2, 4, 6, 8, 10].map(v => (
            <g key={v}>
              <line x1="25" x2="555" y1={yScale(v)} y2={yScale(v)} stroke="#e2e8f0" strokeWidth="0.5" />
              <text x="20" y={yScale(v) + 4} textAnchor="end" fontSize="8" fill="#94a3b8">{v}</text>
            </g>
          ))}
          {/* Hour labels */}
          {partographData.map((d, i) => (
            <text key={i} x={xScale(i)} y={225} textAnchor="middle" fontSize="8" fill="#94a3b8">{d.hour}h</text>
          ))}
          {/* Alert line (expected 1 cm/h from baseline) */}
          <polyline points={partographData.map((d, i) => `${xScale(i)},${yScale(d.alertLine)}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
          {/* Action line */}
          <polyline points={partographData.map((d, i) => `${xScale(i)},${yScale(d.actionLine)}`).join(" ")} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
          {/* Actual dilation line */}
          <polyline points={partographData.map((d, i) => `${xScale(i)},${yScale(d.dilation)}`).join(" ")} fill="none" stroke="var(--color-urvos-primary, #3b82f6)" strokeWidth="2.5" />
          {/* Data points */}
          {partographData.map((d, i) => (
            <circle key={i} cx={xScale(i)} cy={yScale(d.dilation)} r="4" fill="var(--color-urvos-primary, #3b82f6)" stroke="white" strokeWidth="1.5" />
          ))}
          {/* Axis labels */}
          <text x="8" y="115" textAnchor="middle" fontSize="9" fill="#64748b" transform="rotate(-90, 8, 115)">Dilation (cm)</text>
          <text x="290" y="15" textAnchor="middle" fontSize="9" fill="#64748b">Cervical Dilation Curve</text>
        </svg>
      </div>

      {/* FHR GRID */}
      <div className="rounded-xl border border-urvos-border overflow-hidden">
        <div className="px-4 py-2 bg-urvos-background border-b border-urvos-border">
          <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-500" /> Fetal Heart Rate & Contractions
          </h3>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-urvos-background border-b border-urvos-border">
            <tr>
              <th className="px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase">Hour</th>
              <th className="px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase">FHR (bpm)</th>
              <th className="px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase">Contractions / 10 min</th>
              <th className="px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase">Dilation</th>
              <th className="px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase">FHR Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-urvos-border">
            {partographData.map((d, i) => (
              <tr key={i} className="hover:bg-urvos-background transition-colors">
                <td className="px-4 py-2 font-medium">{d.hour}h</td>
                <td className="px-4 py-2 font-mono">{d.fhr}</td>
                <td className="px-4 py-2">{d.contractions}</td>
                <td className="px-4 py-2 font-semibold text-urvos-primary">{d.dilation} cm</td>
                <td className="px-4 py-2">
                  {d.fhr >= 120 && d.fhr <= 160
                    ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Normal</span>
                    : <span className="text-rose-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Abnormal</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-urvos-text-subtle">Obstetrician: Dr. S. Pillai · Midwife: Nurse R. Thomas</p>
        <Button size="sm">Record Vitals</Button>
      </div>
    </div>
  );
}
