"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileText, Lock, RefreshCw, BarChart2 } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const frameworks = [
  {
    id: "nabh",
    label: "NABH",
    fullName: "National Accreditation Board for Hospitals",
    score: 87,
    total: 100,
    status: "Compliant",
    lastAudit: "14 Jan 2026",
    nextAudit: "14 Jan 2027",
    checks: [
      { area: "Patient Rights & Education", status: "pass", score: 92 },
      { area: "Patient Assessment", status: "pass", score: 88 },
      { area: "Care of Patients", status: "pass", score: 85 },
      { area: "Medication Management", status: "warn", score: 74 },
      { area: "Hospital Infection Control", status: "pass", score: 90 },
      { area: "Quality Improvement", status: "warn", score: 70 },
    ],
  },
  {
    id: "hipaa",
    label: "HIPAA",
    fullName: "Health Insurance Portability & Accountability Act",
    score: 94,
    total: 100,
    status: "Compliant",
    lastAudit: "01 Mar 2026",
    nextAudit: "01 Mar 2027",
    checks: [
      { area: "PHI Access Controls", status: "pass", score: 97 },
      { area: "Audit Logging", status: "pass", score: 95 },
      { area: "Encryption at Rest", status: "pass", score: 100 },
      { area: "Business Associate Agreements", status: "pass", score: 92 },
      { area: "Breach Notification Policy", status: "pass", score: 88 },
      { area: "HIPAA Training Records", status: "warn", score: 78 },
    ],
  },
  {
    id: "dpdp",
    label: "DPDP Act",
    fullName: "Digital Personal Data Protection Act 2023",
    score: 71,
    total: 100,
    status: "Action Required",
    lastAudit: "20 Jun 2026",
    nextAudit: "20 Sep 2026",
    checks: [
      { area: "Consent Management", status: "fail", score: 58 },
      { area: "Data Fiduciary Registration", status: "pass", score: 90 },
      { area: "Data Minimisation", status: "warn", score: 70 },
      { area: "Right to Erasure Implementation", status: "fail", score: 45 },
      { area: "Cross-border Data Transfer Logs", status: "pass", score: 88 },
      { area: "Grievance Redressal Officer", status: "pass", score: 100 },
    ],
  },
];

const statusIcon = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle };
const statusStyle = { pass: "text-emerald-600", warn: "text-amber-600", fail: "text-rose-600" };
const statusBg = { pass: "bg-emerald-50 border-emerald-200", warn: "bg-amber-50 border-amber-200", fail: "bg-rose-50 border-rose-200" };

export function ComplianceDashboard({ className }: { className?: string }) {
  const [selected, setSelected] = useState("nabh");
  const fw = frameworks.find(f => f.id === selected)!;

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-urvos-primary" />
            Regulatory Compliance Dashboard
          </h1>
          <p className="text-xs text-urvos-text-subtle">NABH · HIPAA · DPDP 2023 · Automated compliance scoring</p>
        </div>
        <Button size="sm" variant="secondary">
          <FileText className="w-3.5 h-3.5 mr-1.5" /> Export Compliance Report
        </Button>
      </div>

      {/* FRAMEWORK SELECTOR */}
      <div className="grid grid-cols-3 gap-3">
        {frameworks.map(f => (
          <button key={f.id} onClick={() => setSelected(f.id)} className={clsx("p-4 rounded-xl border text-left transition-all", selected === f.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background")}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold">{f.label}</p>
                <p className="text-[10px] text-urvos-text-subtle leading-tight mt-0.5">{f.fullName}</p>
              </div>
              <span className={clsx("text-xs font-bold ml-2 shrink-0", f.score >= 85 ? "text-emerald-600" : f.score >= 70 ? "text-amber-600" : "text-rose-600")}>{f.score}%</span>
            </div>
            <div className="mt-3 h-1.5 bg-urvos-border rounded-full overflow-hidden">
              <div className={clsx("h-full rounded-full", f.score >= 85 ? "bg-emerald-500" : f.score >= 70 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${f.score}%` }} />
            </div>
            <p className={clsx("text-[10px] font-semibold mt-1.5", f.score >= 85 ? "text-emerald-600" : f.score >= 70 ? "text-amber-600" : "text-rose-600")}>{f.status}</p>
          </button>
        ))}
      </div>

      {/* DETAIL PANEL */}
      <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base">{fw.label} — {fw.fullName}</h2>
            <p className="text-xs text-urvos-text-subtle">Last audit: {fw.lastAudit} · Next: {fw.nextAudit}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={fw.status === "Compliant" ? "success" : "critical"}>{fw.status}</Badge>
            <button className="p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background text-urvos-text-subtle"><RefreshCw className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* OVERALL SCORE */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-urvos-background border border-urvos-border">
          <div className="text-3xl font-black text-urvos-text">{fw.score}<span className="text-lg text-urvos-text-subtle font-normal">/{fw.total}</span></div>
          <div className="flex-1">
            <div className="h-3 bg-urvos-border rounded-full overflow-hidden">
              <div className={clsx("h-full rounded-full transition-all", fw.score >= 85 ? "bg-emerald-500" : fw.score >= 70 ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${fw.score}%` }} />
            </div>
            <p className="text-xs text-urvos-text-subtle mt-1">Overall compliance score</p>
          </div>
        </div>

        {/* AREA BREAKDOWN */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider">Area-wise Breakdown</h3>
          {fw.checks.map(check => {
            const Icon = statusIcon[check.status as keyof typeof statusIcon];
            return (
              <div key={check.area} className={clsx("flex items-center gap-3 p-2.5 rounded-lg border text-xs", statusBg[check.status as keyof typeof statusBg])}>
                <Icon className={clsx("w-4 h-4 shrink-0", statusStyle[check.status as keyof typeof statusStyle])} />
                <span className="flex-1 font-medium">{check.area}</span>
                <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden shrink-0">
                  <div className={clsx("h-full rounded-full", check.status === "pass" ? "bg-emerald-500" : check.status === "warn" ? "bg-amber-500" : "bg-rose-500")} style={{ width: `${check.score}%` }} />
                </div>
                <span className={clsx("font-bold shrink-0", statusStyle[check.status as keyof typeof statusStyle])}>{check.score}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
