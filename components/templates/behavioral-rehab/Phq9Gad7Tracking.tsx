"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, BarChart2 } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

// PHQ-9 data over last 6 visits
const phqData = [
  { visit: "Mar 2026", phq9: 18, gad7: 14, label: "Severe" },
  { visit: "Apr 2026", phq9: 15, gad7: 12, label: "Moderate-Severe" },
  { visit: "May 2026", phq9: 12, gad7: 10, label: "Moderate" },
  { visit: "Jun 2026", phq9: 9, gad7: 8, label: "Moderate" },
  { visit: "Jul 2026", phq9: 7, gad7: 6, label: "Mild" },
  { visit: "Jul-24", phq9: 5, gad7: 4, label: "Minimal" },
];

const phq9Qs = ["Anhedonia", "Depressed mood", "Sleep disturbance", "Fatigue", "Appetite changes", "Worthlessness", "Concentration issues", "Psychomotor changes", "Suicidal ideation"];
const currentPhqAnswers = [1, 1, 1, 0, 1, 0, 1, 0, 0]; // 0-3 per question

const gad7Qs = ["Feeling anxious", "Uncontrollable worry", "Excessive worry", "Trouble relaxing", "Restlessness", "Irritability", "Fearful feelings"];
const currentGadAnswers = [1, 0, 1, 1, 0, 1, 0];

const answerLabel = ["Not at all", "Several days", "More than half", "Nearly every day"];
const answerStyle = ["bg-urvos-background", "bg-amber-50 border-amber-200", "bg-orange-50 border-orange-200", "bg-rose-50 border-rose-200"];

const yScale = (v: number, max = 27, h = 120) => h - (v / max) * h + 10;
const xScale = (i: number, total: number, w = 480) => 30 + (i / (total - 1)) * w;

export function Phq9Gad7Tracking({ className }: { className?: string }) {
  const [tab, setTab] = useState<"trend" | "phq9" | "gad7">("trend");
  const phq9Total = currentPhqAnswers.reduce((a, b) => a + b, 0);
  const gad7Total = currentGadAnswers.reduce((a, b) => a + b, 0);
  const prevPhq9 = phqData[phqData.length - 2].phq9;
  const improvement = prevPhq9 - phq9Total;

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">PHQ-9 & GAD-7 Tracking</h1>
          <p className="text-xs text-urvos-text-subtle">Arun Mehta · MRN-6612 · Depression & Anxiety Monitoring · Dr. K. Pillai (Psychiatry)</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={phq9Total <= 4 ? "success" : phq9Total <= 9 ? "info" : "caution"}>PHQ-9: {phq9Total}</Badge>
          <Badge variant={gad7Total <= 4 ? "success" : gad7Total <= 9 ? "info" : "caution"}>GAD-7: {gad7Total}</Badge>
        </div>
      </div>

      {/* SCORE CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "PHQ-9 Score", value: phq9Total, max: 27, severity: phq9Total <= 4 ? "Minimal" : phq9Total <= 9 ? "Mild" : phq9Total <= 14 ? "Moderate" : "Severe", color: phq9Total <= 9 ? "text-emerald-600" : "text-amber-600" },
          { label: "GAD-7 Score", value: gad7Total, max: 21, severity: gad7Total <= 4 ? "Minimal" : gad7Total <= 9 ? "Mild" : gad7Total <= 14 ? "Moderate" : "Severe", color: gad7Total <= 9 ? "text-emerald-600" : "text-amber-600" },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
            <p className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider">{s.label}</p>
            <p className={clsx("text-4xl font-black mt-1", s.color)}>{s.value}<span className="text-lg text-urvos-text-subtle font-normal">/{s.max}</span></p>
            <p className={clsx("text-sm font-semibold", s.color)}>{s.severity}</p>
            <div className="mt-2 h-2 bg-urvos-background rounded-full overflow-hidden">
              <div className={clsx("h-full rounded-full", s.value <= 9 ? "bg-emerald-500" : s.value <= 14 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${(s.value / s.max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* TREND INDICATOR */}
      <div className={clsx("flex items-center gap-3 p-3 rounded-xl border text-sm font-semibold", improvement > 0 ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700")}>
        {improvement > 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
        PHQ-9 {improvement > 0 ? `improved by ${improvement} points` : `unchanged`} since last visit. Continue current treatment plan.
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-urvos-border">
        {(["trend", "phq9", "gad7"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={clsx("px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors -mb-px border-b-2", tab === t ? "border-urvos-primary text-urvos-primary" : "border-transparent text-urvos-text-subtle hover:text-urvos-text")}>
            {t === "trend" ? "📈 Trend Chart" : t === "phq9" ? "PHQ-9 Detail" : "GAD-7 Detail"}
          </button>
        ))}
      </div>

      {/* TREND CHART */}
      {tab === "trend" && (
        <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface overflow-x-auto">
          <svg viewBox="0 0 540 160" className="w-full min-w-[480px]">
            {/* Grid */}
            {[0, 5, 10, 15, 20, 27].map(v => (
              <g key={v}>
                <line x1="25" x2="515" y1={yScale(v)} y2={yScale(v)} stroke="#e2e8f0" strokeWidth="0.5" />
                <text x="20" y={yScale(v) + 4} textAnchor="end" fontSize="8" fill="#94a3b8">{v}</text>
              </g>
            ))}
            {/* X labels */}
            {phqData.map((d, i) => (
              <text key={i} x={xScale(i, phqData.length)} y={155} textAnchor="middle" fontSize="8" fill="#94a3b8">{d.visit}</text>
            ))}
            {/* PHQ-9 line */}
            <polyline points={phqData.map((d, i) => `${xScale(i, phqData.length)},${yScale(d.phq9)}`).join(" ")} fill="none" stroke="#6366f1" strokeWidth="2.5" />
            {phqData.map((d, i) => <circle key={i} cx={xScale(i, phqData.length)} cy={yScale(d.phq9)} r="4" fill="#6366f1" stroke="white" strokeWidth="1.5" />)}
            {/* GAD-7 line */}
            <polyline points={phqData.map((d, i) => `${xScale(i, phqData.length)},${yScale(d.gad7)}`).join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
            {phqData.map((d, i) => <circle key={i} cx={xScale(i, phqData.length)} cy={yScale(d.gad7)} r="3.5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />)}
            {/* Legend */}
            <circle cx="60" cy="145" r="4" fill="#6366f1" />
            <text x="68" y="149" fontSize="8" fill="#64748b">PHQ-9</text>
            <circle cx="110" cy="145" r="4" fill="#f59e0b" />
            <text x="118" y="149" fontSize="8" fill="#64748b">GAD-7</text>
          </svg>
        </div>
      )}

      {/* PHQ-9 DETAIL */}
      {tab === "phq9" && (
        <div className="space-y-2">
          {phq9Qs.map((q, i) => (
            <div key={q} className={clsx("flex items-center gap-3 p-3 rounded-xl border text-xs", answerStyle[currentPhqAnswers[i]])}>
              <span className="w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
              <span className="flex-1 font-medium">{q}</span>
              <Badge variant={currentPhqAnswers[i] === 0 ? "success" : currentPhqAnswers[i] === 1 ? "info" : "critical"} className="text-[10px] shrink-0">
                {answerLabel[currentPhqAnswers[i]]} ({currentPhqAnswers[i]})
              </Badge>
            </div>
          ))}
          <p className="text-xs font-bold text-urvos-text-subtle text-right pt-2">Total: {phq9Total} / 27</p>
        </div>
      )}

      {/* GAD-7 DETAIL */}
      {tab === "gad7" && (
        <div className="space-y-2">
          {gad7Qs.map((q, i) => (
            <div key={q} className={clsx("flex items-center gap-3 p-3 rounded-xl border text-xs", answerStyle[currentGadAnswers[i]])}>
              <span className="w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</span>
              <span className="flex-1 font-medium">{q}</span>
              <Badge variant={currentGadAnswers[i] === 0 ? "success" : currentGadAnswers[i] === 1 ? "info" : "critical"} className="text-[10px] shrink-0">
                {answerLabel[currentGadAnswers[i]]} ({currentGadAnswers[i]})
              </Badge>
            </div>
          ))}
          <p className="text-xs font-bold text-urvos-text-subtle text-right pt-2">Total: {gad7Total} / 21</p>
        </div>
      )}
    </div>
  );
}
