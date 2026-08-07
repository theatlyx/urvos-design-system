"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Lock, AlertTriangle, FileText, CheckCircle2, Search, User, Clock, Shield } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const controlledSubstances = [
  { id: 1, drug: "Morphine 10mg/mL", schedule: "II", vial: "LOT-2026-M-0441", qty: 10, unit: "vials", status: "sealed", location: "Narcotic Safe A" },
  { id: 2, drug: "Fentanyl 50mcg/mL", schedule: "II", vial: "LOT-2026-F-0812", qty: 5, unit: "ampoules", status: "sealed", location: "Narcotic Safe A" },
  { id: 3, drug: "Midazolam 5mg/mL", schedule: "IV", vial: "LOT-2026-MD-0221", qty: 20, unit: "vials", status: "sealed", location: "ICU Safe B" },
  { id: 4, drug: "Tramadol 100mg Tab", schedule: "IV", vial: "LOT-2026-TR-1114", qty: 50, unit: "tabs", status: "partial", location: "Ward Safe C" },
  { id: 5, drug: "Codeine 30mg Tab", schedule: "V", vial: "LOT-2026-CD-0992", qty: 30, unit: "tabs", status: "sealed", location: "OPD Safe D" },
];

const dispensingLog = [
  { id: 1, ts: "09:42", drug: "Morphine 4mg IV", patient: "Meena Iyer (MRN-4421)", dispensedBy: "PharmD. Renu", witnessedBy: "Nurse Anita Desai", orderedBy: "Dr. A. Sharma", wastes: 6, qty: 4 },
  { id: 2, ts: "08:30", drug: "Fentanyl 25mcg IV", patient: "Rajesh Kumar (MRN-8819)", dispensedBy: "PharmD. Suresh", witnessedBy: "Nurse R. Thomas", orderedBy: "Dr. P. Nair", wastes: 25, qty: 25 },
  { id: 3, ts: "07:00", drug: "Midazolam 2mg IV", patient: "Suresh Patel (MRN-7762)", dispensedBy: "PharmD. Renu", witnessedBy: "Nurse K. Singh", orderedBy: "Dr. V. Reddy", wastes: 3, qty: 2 },
];

export function NarcoticSubstanceLog({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const filtered = controlledSubstances.filter(c => c.drug.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Lock className="w-5 h-5 text-urvos-primary" /> Narcotic Substance Log
          </h1>
          <p className="text-xs text-urvos-text-subtle">Schedule II–V Controlled Substances · Dual-witness dispensing · NDPS Act compliant</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">NDPS Act 1985</Badge>
          <Button size="sm"><FileText className="w-3.5 h-3.5 mr-1" /> Audit Report</Button>
        </div>
      </div>

      {/* STOCK OVERVIEW */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total CS Drugs Tracked", value: controlledSubstances.length, icon: "💊", color: "text-urvos-text" },
          { label: "Today's Dispensings", value: dispensingLog.length, icon: "📤", color: "text-blue-600" },
          { label: "Discrepancies Found", value: 0, icon: "⚠️", color: "text-emerald-600" },
        ].map(s => (
          <div key={s.label} className="p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className={clsx("text-2xl font-black", s.color)}>{s.value}</p>
            <p className="text-[10px] text-urvos-text-subtle mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* INVENTORY TABLE */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2"><Shield className="w-4 h-4 text-urvos-primary" /> Current Stock</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drug..." className="pl-8 pr-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" />
          </div>
        </div>
        <div className="rounded-xl border border-urvos-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-urvos-background border-b border-urvos-border">
              <tr>{["Drug", "Schedule", "Lot Number", "Quantity", "Status", "Location"].map(col => (
                <th key={col} className="px-3 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase">{col}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-urvos-border">
              {filtered.map(cs => (
                <tr key={cs.id} className="hover:bg-urvos-background transition-colors">
                  <td className="px-3 py-2.5 font-semibold">{cs.drug}</td>
                  <td className="px-3 py-2.5"><Badge variant={cs.schedule === "II" ? "critical" : cs.schedule === "IV" ? "caution" : "info"} className="text-[10px]">Sch-{cs.schedule}</Badge></td>
                  <td className="px-3 py-2.5 font-mono text-[10px] text-urvos-text-subtle">{cs.vial}</td>
                  <td className="px-3 py-2.5 font-bold">{cs.qty} {cs.unit}</td>
                  <td className="px-3 py-2.5">
                    {cs.status === "sealed" ? <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Sealed</span> : <span className="text-amber-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Open/Partial</span>}
                  </td>
                  <td className="px-3 py-2.5 text-urvos-text-subtle">{cs.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISPENSING LOG */}
      <div>
        <h2 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">Today's Dispensing Log</h2>
        <div className="space-y-2">
          {dispensingLog.map(log => (
            <div key={log.id} className="p-3 rounded-xl border border-urvos-border bg-urvos-surface text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Clock className="w-3 h-3 text-urvos-text-subtle" />
                    <span className="font-mono text-urvos-text-subtle">{log.ts}</span>
                    <span className="font-bold">{log.drug}</span>
                    <span className="text-urvos-text-subtle">→ {log.patient}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-urvos-text-subtle">
                    <span><User className="w-3 h-3 inline mr-0.5" /> Dispensed by: <span className="font-medium text-urvos-text">{log.dispensedBy}</span></span>
                    <span>Witnessed: <span className="font-medium text-urvos-text">{log.witnessedBy}</span></span>
                    <span>Ordered: <span className="font-medium text-urvos-text">{log.orderedBy}</span></span>
                  </div>
                  <div className="flex gap-3 mt-1 text-[10px]">
                    <span className="text-blue-600">Dispensed: {log.qty} mcg/mg</span>
                    <span className="text-amber-600">Wasted: {log.wastes} mcg/mg</span>
                    <span className="text-emerald-600">Total reconciled ✓</span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
