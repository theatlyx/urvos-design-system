"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ArrowRight, CheckCircle2, Clock, AlertCircle, Search, User, Hospital, FileText, Phone, ExternalLink } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

const referrals = [
  { id: "REF-2026-0041", patient: "Rajesh Kumar", mrn: "MRN-8819", age: 45, from: "Dr. A. Sharma (Gen. Medicine)", to: "Dr. P. Nair (Cardiology)", reason: "NSTEMI workup — cardiac catheterization evaluation", priority: "urgent", status: "pending", created: "Today 09:30", facility: "Apollo Hospitals, Mumbai" },
  { id: "REF-2026-0039", patient: "Meena Iyer", mrn: "MRN-4421", age: 62, from: "Dr. V. Reddy (ICU)", to: "Nephrology", reason: "AKI on CKD — Cr 2.1, rising trend", priority: "urgent", status: "accepted", created: "Today 07:15", facility: "Apollo Hospitals, Mumbai" },
  { id: "REF-2026-0037", patient: "Suresh Patel", mrn: "MRN-7762", age: 58, from: "Dr. M. Gupta (GP)", to: "Orthopedics", reason: "R knee OA grade 3 — surgical opinion", priority: "routine", status: "scheduled", created: "Yesterday", facility: "Fortis Hospital, Pune" },
  { id: "REF-2026-0035", patient: "Kavitha Nair", mrn: "MRN-5530", age: 34, from: "Dr. S. Pillai (OBG)", to: "Endocrinology", reason: "Gestational diabetes — insulin initiation", priority: "routine", status: "completed", created: "22 Jul 2026", facility: "Apollo Hospitals, Mumbai" },
];

const priorityStyle: Record<string, string> = { urgent: "critical", routine: "info" };
const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  scheduled: "bg-violet-50 text-violet-700 border-violet-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};
const statusIcon: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3.5 h-3.5" />,
  accepted: <CheckCircle2 className="w-3.5 h-3.5" />,
  scheduled: <FileText className="w-3.5 h-3.5" />,
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
};

export function ReferralManagement({ className }: { className?: string }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState("REF-2026-0041");
  const filtered = referrals.filter(r =>
    (statusFilter === "all" || r.status === statusFilter) &&
    (search === "" || r.patient.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  );
  const activeRef = referrals.find(r => r.id === selected)!;

  return (
    <div className={clsx("space-y-4 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold">Referral Management</h1>
          <p className="text-xs text-urvos-text-subtle">Inbound & outbound specialist referrals · ABDM-linked</p>
        </div>
        <Button size="sm">+ New Referral</Button>
      </div>

      {/* SUMMARY PILLS */}
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "accepted", "scheduled", "completed"].map(s => {
          const count = s === "all" ? referrals.length : referrals.filter(r => r.status === s).length;
          return (
            <button key={s} onClick={() => setStatusFilter(s)} className={clsx("px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors", statusFilter === s ? "border-urvos-primary bg-urvos-primary text-white" : "border-urvos-border bg-urvos-surface text-urvos-text-subtle hover:bg-urvos-background")}>
              {s} ({count})
            </button>
          );
        })}
        <div className="relative ml-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient or ID..." className="pl-8 pr-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* REFERRAL LIST */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.map(ref => (
            <button key={ref.id} onClick={() => setSelected(ref.id)} className={clsx("w-full text-left p-3 rounded-xl border transition-all", selected === ref.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background")}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold">{ref.patient}</p>
                    <Badge variant={priorityStyle[ref.priority] as "critical" | "info"} className="text-[9px] py-0">{ref.priority}</Badge>
                  </div>
                  <p className="text-[10px] text-urvos-text-subtle">{ref.mrn} · {ref.id}</p>
                  <p className="text-[10px] text-urvos-primary font-medium mt-0.5 flex items-center gap-1">
                    <span className="truncate">{ref.from.split("(")[1]?.slice(0, -1) || ref.from}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{ref.to}</span>
                  </p>
                  <p className="text-[10px] text-urvos-text-subtle mt-0.5 truncate">{ref.reason}</p>
                </div>
                <span className={clsx("flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0", statusStyle[ref.status])}>
                  {statusIcon[ref.status]} {ref.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* REFERRAL DETAIL */}
        <div className="lg:col-span-3 p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold text-base">{activeRef.id}</p>
              <p className="text-xs text-urvos-text-subtle">{activeRef.created}</p>
            </div>
            <span className={clsx("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border", statusStyle[activeRef.status])}>
              {statusIcon[activeRef.status]} {activeRef.status.charAt(0).toUpperCase() + activeRef.status.slice(1)}
            </span>
          </div>

          {/* Patient */}
          <div className="p-3 rounded-xl bg-urvos-background border border-urvos-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center font-bold text-sm shrink-0">
              {activeRef.patient.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-sm">{activeRef.patient} · {activeRef.age}y</p>
              <p className="text-xs text-urvos-text-subtle">{activeRef.mrn}</p>
            </div>
            <Badge variant={(priorityStyle[activeRef.priority] as "critical" | "info")} className="ml-auto">{activeRef.priority}</Badge>
          </div>

          {/* Route */}
          <div className="flex items-start gap-3 text-xs">
            <div className="flex-1 p-3 rounded-xl bg-urvos-background border border-urvos-border">
              <p className="text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1">From</p>
              <p className="font-semibold text-sm">{activeRef.from.split("(")[0].trim()}</p>
              <p className="text-urvos-primary text-[10px]">{activeRef.from.split("(")[1]?.replace(")", "") || ""}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-urvos-text-subtle mt-4 shrink-0" />
            <div className="flex-1 p-3 rounded-xl bg-urvos-primary/5 border border-urvos-primary/30">
              <p className="text-[10px] font-bold text-urvos-primary uppercase tracking-wider mb-1">To</p>
              <p className="font-semibold text-sm">{activeRef.to}</p>
              <p className="text-urvos-text-subtle text-[10px] flex items-center gap-1"><Hospital className="w-3 h-3" />{activeRef.facility}</p>
            </div>
          </div>

          {/* Reason */}
          <div>
            <p className="text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1">Referral Reason</p>
            <p className="text-sm">{activeRef.reason}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-urvos-border">
            {activeRef.status === "pending" && <>
              <Button size="sm"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Accept</Button>
              <Button size="sm" variant="secondary"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Request More Info</Button>
            </>}
            <Button size="sm" variant="secondary"><FileText className="w-3.5 h-3.5 mr-1" /> Attach Notes</Button>
            <Button size="sm" variant="secondary"><Phone className="w-3.5 h-3.5 mr-1" /> Contact Specialist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
