"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Activity, Search, Filter, Download, AlertTriangle, User, FileText, Eye, Lock, ChevronDown } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const auditLogs = [
  { id: 1, ts: "2026-07-24 09:42:17", actor: "Dr. A. Sharma", role: "Senior Physician", action: "VIEW_PATIENT_RECORD", resource: "Rajesh Kumar (MRN-8819)", ip: "10.0.1.45", severity: "info", outcome: "success" },
  { id: 2, ts: "2026-07-24 09:40:05", actor: "Nurse Anita Desai", role: "ICU RN", action: "UPDATE_MEDICATION_ORDER", resource: "Meena Iyer (MRN-4421) — Norepinephrine dose", ip: "10.0.2.12", severity: "info", outcome: "success" },
  { id: 3, ts: "2026-07-24 09:38:44", actor: "admin@urvos.health", role: "System Admin", action: "EXPORT_PATIENT_DATA", resource: "Bulk export — Q2 2026 (2,184 records)", ip: "203.0.113.10", severity: "critical", outcome: "flagged" },
  { id: 4, ts: "2026-07-24 09:35:11", actor: "Dr. P. Nair", role: "Cardiologist", action: "PRESCRIBE_CONTROLLED_SUBSTANCE", resource: "Morphine 4mg IV — Bed 302A", ip: "10.0.1.67", severity: "warn", outcome: "success" },
  { id: 5, ts: "2026-07-24 09:30:02", actor: "billing@apollohospitals.com", role: "Billing Staff", action: "VIEW_INSURANCE_DETAILS", resource: "Rajesh Kumar (MRN-8819) — TPA Details", ip: "10.0.3.20", severity: "info", outcome: "success" },
  { id: 6, ts: "2026-07-24 09:28:55", actor: "Unknown", role: "—", action: "FAILED_LOGIN_ATTEMPT", resource: "admin@urvos.health (5 failed attempts)", ip: "185.220.101.42", severity: "critical", outcome: "blocked" },
  { id: 7, ts: "2026-07-24 09:20:14", actor: "Dr. V. Shah", role: "Radiologist", action: "DOWNLOAD_DICOM_STUDY", resource: "CT Chest — Meena Iyer", ip: "10.0.1.88", severity: "info", outcome: "success" },
  { id: 8, ts: "2026-07-24 09:15:33", actor: "Dr. A. Sharma", role: "Senior Physician", action: "DELETE_DRAFT_NOTE", resource: "SOAP Note Draft (unsaved)", ip: "10.0.1.45", severity: "warn", outcome: "success" },
];

const severityStyle: Record<string, string> = {
  critical: "bg-rose-50 text-rose-700 border-rose-200",
  warn: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-sky-50 text-sky-700 border-sky-200",
};
const outcomeStyle: Record<string, string> = {
  success: "text-emerald-600",
  flagged: "text-rose-600 font-bold",
  blocked: "text-rose-600 font-bold",
};
const actionIcon: Record<string, React.ReactNode> = {
  VIEW_PATIENT_RECORD: <Eye className="w-3.5 h-3.5" />,
  UPDATE_MEDICATION_ORDER: <Activity className="w-3.5 h-3.5" />,
  EXPORT_PATIENT_DATA: <Download className="w-3.5 h-3.5" />,
  PRESCRIBE_CONTROLLED_SUBSTANCE: <AlertTriangle className="w-3.5 h-3.5" />,
  VIEW_INSURANCE_DETAILS: <FileText className="w-3.5 h-3.5" />,
  FAILED_LOGIN_ATTEMPT: <Lock className="w-3.5 h-3.5" />,
  DOWNLOAD_DICOM_STUDY: <Download className="w-3.5 h-3.5" />,
  DELETE_DRAFT_NOTE: <FileText className="w-3.5 h-3.5" />,
};

export function AuditLogsView({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = auditLogs.filter(l =>
    (filter === "all" || l.severity === filter) &&
    (search === "" || l.actor.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-urvos-primary" /> HIPAA Audit Log
          </h1>
          <p className="text-xs text-urvos-text-subtle">All PHI access and modification events · Tamper-proof · Retained 7 years</p>
        </div>
        <Button size="sm" variant="secondary">
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Events (24h)", value: "2,841", color: "text-urvos-text" },
          { label: "Critical Alerts", value: "2", color: "text-rose-600" },
          { label: "Failed Logins", value: "7", color: "text-amber-600" },
          { label: "PHI Exports", value: "1", color: "text-rose-600" },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center">
            <p className={clsx("text-2xl font-black", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-urvos-text-subtle mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-0 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by user or action..." className="w-full pl-9 pr-3 py-2 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" />
        </div>
        <div className="flex gap-1">
          {["all", "critical", "warn", "info"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={clsx("px-3 py-2 rounded-lg text-xs font-medium capitalize border transition-colors", filter === f ? "border-urvos-primary bg-urvos-primary text-white" : "border-urvos-border bg-urvos-surface text-urvos-text-subtle hover:bg-urvos-background")}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-urvos-border overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-urvos-background border-b border-urvos-border">
            <tr>
              {["Timestamp", "Actor", "Action", "Resource / Detail", "IP Address", "Outcome"].map(col => (
                <th key={col} className="px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-urvos-border">
            {filtered.map(log => (
              <tr key={log.id} className={clsx("transition-colors hover:bg-urvos-background", log.severity === "critical" && "bg-rose-50/40")}>
                <td className="px-3 py-2.5 font-mono text-urvos-text-subtle whitespace-nowrap">{log.ts}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-urvos-text-subtle shrink-0" />
                    <div>
                      <p className="font-medium">{log.actor}</p>
                      <p className="text-[10px] text-urvos-text-subtle">{log.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium", severityStyle[log.severity])}>
                    {actionIcon[log.action]}
                    <span className="font-mono text-[10px]">{log.action}</span>
                  </span>
                </td>
                <td className="px-3 py-2.5 text-urvos-text max-w-xs truncate">{log.resource}</td>
                <td className="px-3 py-2.5 font-mono text-urvos-text-subtle">{log.ip}</td>
                <td className={clsx("px-3 py-2.5 capitalize", outcomeStyle[log.outcome])}>{log.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2.5 border-t border-urvos-border bg-urvos-background flex items-center justify-between text-xs text-urvos-text-subtle">
          <span>Showing {filtered.length} of {auditLogs.length} events</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-urvos-border hover:bg-urvos-surface">← Prev</button>
            <button className="px-2 py-1 rounded border border-urvos-border hover:bg-urvos-surface">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
