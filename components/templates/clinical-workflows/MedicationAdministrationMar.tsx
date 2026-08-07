"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Pill, Clock, CheckCircle2, AlertTriangle, XCircle, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../../ui/Badge";

type MarStatus = "given" | "due" | "missed" | "held" | "na";

interface MarEntry { medication: string; route: string; dose: string; frequency: string; prescribedBy: string; administrations: Record<string, MarStatus>; }

const timeSlots = ["06:00", "08:00", "10:00", "12:00", "14:00", "18:00", "22:00"];

const marData: MarEntry[] = [
  { medication: "Aspirin 100mg", route: "PO", dose: "100mg", frequency: "OD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "given", "18:00": "due", "22:00": "na" } },
  { medication: "Ticagrelor 90mg", route: "PO", dose: "90mg", frequency: "BD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "due", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "Atorvastatin 40mg", route: "PO", dose: "40mg", frequency: "OD nocte", prescribedBy: "Dr. Sharma", administrations: { "06:00": "na", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "due" } },
  { medication: "Pantoprazole 40mg", route: "IV", dose: "40mg", frequency: "OD AC", prescribedBy: "Nurse Order", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "Metoprolol 25mg", route: "PO", dose: "25mg", frequency: "BD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "missed", "14:00": "na", "18:00": "due", "22:00": "na" } },
  { medication: "Enoxaparin 40mg", route: "SC", dose: "40mg", frequency: "OD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "na", "08:00": "given", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "NaCl 0.9% 100mL IV", route: "IV", dose: "100mL", frequency: "QID", prescribedBy: "Nurse Order", administrations: { "06:00": "given", "08:00": "na", "10:00": "given", "12:00": "na", "14:00": "given", "18:00": "due", "22:00": "na" } },
];

const statusIcon: Record<MarStatus, React.ReactNode> = {
  given: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  due: <Clock className="w-4 h-4 text-amber-500" />,
  missed: <XCircle className="w-4 h-4 text-rose-500" />,
  held: <AlertTriangle className="w-4 h-4 text-violet-500" />,
  na: <span className="text-urvos-border text-lg leading-none">—</span>,
};
const statusCell: Record<MarStatus, string> = {
  given: "bg-emerald-50 border-emerald-200",
  due: "bg-amber-50 border-amber-200",
  missed: "bg-rose-50 border-rose-200",
  held: "bg-violet-50 border-violet-200",
  na: "bg-transparent border-transparent",
};

export function MedicationAdministrationMar({ className }: { className?: string }) {
  const [date, setDate] = useState("2026-07-24");

  return (
    <div className={clsx("space-y-4 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">Medication Administration Record</h1>
          <p className="text-xs text-urvos-text-subtle">Rajesh Kumar · MRN-8819 · Room 302A · Dr. A. Sharma</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background"><ChevronLeft className="w-4 h-4" /></button>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" />
          <button className="p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap items-center gap-3 text-[11px]">
        {(Object.entries({ given: "Administered ✓", due: "Due Now", missed: "Missed", held: "Held", na: "N/A for slot" }) as [MarStatus, string][]).map(([status, label]) => (
          <div key={status} className="flex items-center gap-1.5">
            {statusIcon[status]}
            <span className="text-urvos-text-subtle">{label}</span>
          </div>
        ))}
      </div>

      {/* MAR GRID */}
      <div className="overflow-x-auto rounded-xl border border-urvos-border">
        <table className="w-full text-xs min-w-[700px]">
          <thead className="bg-urvos-background border-b border-urvos-border">
            <tr>
              <th className="px-4 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px] w-56">Medication</th>
              <th className="px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]">Route</th>
              <th className="px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]">Prescribed By</th>
              {timeSlots.map(ts => (
                <th key={ts} className="px-2 py-2.5 text-center font-mono text-[10px] text-urvos-text-subtle font-semibold">{ts}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-urvos-border">
            {marData.map((entry, i) => (
              <tr key={i} className="hover:bg-urvos-background transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <Pill className="w-3.5 h-3.5 shrink-0 mt-0.5 text-urvos-primary" />
                    <div>
                      <p className="font-semibold text-urvos-text">{entry.medication}</p>
                      <p className="text-[10px] text-urvos-text-subtle">{entry.dose} · {entry.frequency}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">{entry.route}</span></td>
                <td className="px-3 py-3 text-urvos-text-subtle text-[10px]">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {entry.prescribedBy}
                  </div>
                </td>
                {timeSlots.map(ts => {
                  const status = entry.administrations[ts] as MarStatus;
                  return (
                    <td key={ts} className="px-2 py-3">
                      <div className={clsx("w-8 h-8 rounded-lg border flex items-center justify-center mx-auto cursor-pointer hover:opacity-80 transition-opacity", statusCell[status])}>
                        {statusIcon[status]}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER SUMMARY */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Scheduled", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter(v => v !== "na").length, 0), color: "text-urvos-text" },
          { label: "Administered", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter(v => v === "given").length, 0), color: "text-emerald-600" },
          { label: "Pending", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter(v => v === "due").length, 0), color: "text-amber-600" },
          { label: "Missed", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter(v => v === "missed").length, 0), color: "text-rose-600" },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center">
            <p className={clsx("text-2xl font-black", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-urvos-text-subtle mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
