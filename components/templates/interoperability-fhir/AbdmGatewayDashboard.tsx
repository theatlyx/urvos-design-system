"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Wifi, CheckCircle2, XCircle, AlertTriangle, Activity, RefreshCw, Clock, ArrowRight, FileText } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

type TxStatus = "success" | "pending" | "failed";

const transactions = [
  { id: "TXN-2026-8841", ts: "09:42:05", type: "ABHA Verification", patient: "Rajesh Kumar", abha: "91-8829-1029-4410", status: "success" as TxStatus, latency: "312ms" },
  { id: "TXN-2026-8840", ts: "09:38:22", type: "Consent Fetch (HIU)", patient: "Meena Iyer", abha: "91-7721-0011-2200", status: "success" as TxStatus, latency: "487ms" },
  { id: "TXN-2026-8839", ts: "09:35:14", type: "Health Record Push (HIP)", patient: "Suresh Patel", abha: "91-4410-8811-5500", status: "failed" as TxStatus, latency: "—" },
  { id: "TXN-2026-8838", ts: "09:30:00", type: "PHR Link Request", patient: "Kavitha Nair", abha: "91-3300-7722-9901", status: "pending" as TxStatus, latency: "—" },
  { id: "TXN-2026-8837", ts: "09:22:48", type: "Insurance NHCX Claim", patient: "Amit Shah", abha: "91-2200-4411-6631", status: "success" as TxStatus, latency: "621ms" },
  { id: "TXN-2026-8836", ts: "09:15:30", type: "ABHA OTP Verification", patient: "Sunita Rao", abha: "91-5500-1133-2244", status: "success" as TxStatus, latency: "258ms" },
];

const statusIcon: Record<TxStatus, React.ReactNode> = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  pending: <Clock className="w-4 h-4 text-amber-500" />,
  failed: <XCircle className="w-4 h-4 text-rose-500" />,
};
const statusStyle: Record<TxStatus, string> = {
  success: "text-emerald-600",
  pending: "text-amber-600",
  failed: "text-rose-600 font-bold",
};

export function AbdmGatewayDashboard({ className }: { className?: string }) {
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className={clsx("space-y-5 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Wifi className="w-5 h-5 text-urvos-primary" /> ABDM Gateway Dashboard
          </h1>
          <p className="text-xs text-urvos-text-subtle">ABHA · HIP/HIU · NHCX · PHR · ABDM Gateway v2.5</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Gateway Online</Badge>
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors", autoRefresh ? "border-urvos-primary bg-urvos-primary/10 text-urvos-primary" : "border-urvos-border text-urvos-text-subtle")}>
            <RefreshCw className={clsx("w-3 h-3", autoRefresh && "animate-spin")} /> Auto-Refresh
          </button>
        </div>
      </div>

      {/* STATUS TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "ABHA Verifications", value: "1,284", change: "+12 today", color: "text-emerald-600", icon: "🪪" },
          { label: "Consents Fetched", value: "421", change: "+5 pending", color: "text-blue-600", icon: "📋" },
          { label: "Health Records Pushed", value: "89", change: "2 failed", color: "text-violet-600", icon: "📤" },
          { label: "NHCX Claims Filed", value: "36", change: "₹14.2L value", color: "text-amber-600", icon: "🏥" },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={clsx("text-2xl font-black", stat.color)}>{stat.value}</p>
            <p className="text-xs font-medium text-urvos-text">{stat.label}</p>
            <p className="text-[10px] text-urvos-text-subtle mt-0.5">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* SERVICE HEALTH */}
      <div className="p-4 rounded-xl border border-urvos-border bg-urvos-surface">
        <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">Service Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "ABDM Auth Service", latency: "98ms", status: "online" },
            { name: "ABHA Verification API", latency: "312ms", status: "online" },
            { name: "HIU Consent Service", latency: "487ms", status: "online" },
            { name: "HIP Record Push", latency: "—", status: "degraded" },
            { name: "NHCX Claims API", latency: "621ms", status: "online" },
            { name: "PHR Link Service", latency: "—", status: "maintenance" },
          ].map(svc => (
            <div key={svc.name} className={clsx("flex items-center gap-2.5 p-2.5 rounded-lg border text-xs", svc.status === "online" ? "border-emerald-200 bg-emerald-50" : svc.status === "degraded" ? "border-amber-200 bg-amber-50" : "border-urvos-border bg-urvos-background")}>
              <span className={clsx("w-2.5 h-2.5 rounded-full shrink-0", svc.status === "online" ? "bg-emerald-500" : svc.status === "degraded" ? "bg-amber-500 animate-pulse" : "bg-slate-400")} />
              <div className="min-w-0">
                <p className="font-semibold truncate">{svc.name}</p>
                <p className="text-[10px] text-urvos-text-subtle capitalize">{svc.status} {svc.latency !== "—" && `· ${svc.latency}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSACTION LOG */}
      <div>
        <h3 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3">Recent Transactions</h3>
        <div className="rounded-xl border border-urvos-border overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-urvos-background border-b border-urvos-border">
              <tr>{["Time", "Transaction ID", "Type", "Patient / ABHA", "Status", "Latency"].map(col => (
                <th key={col} className="px-3 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase">{col}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-urvos-border">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-urvos-background transition-colors">
                  <td className="px-3 py-2.5 font-mono text-urvos-text-subtle">{tx.ts}</td>
                  <td className="px-3 py-2.5 font-mono text-[10px] text-urvos-primary">{tx.id}</td>
                  <td className="px-3 py-2.5 font-medium">{tx.type}</td>
                  <td className="px-3 py-2.5">
                    <p className="font-semibold">{tx.patient}</p>
                    <p className="text-[10px] font-mono text-urvos-text-subtle">{tx.abha}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={clsx("flex items-center gap-1 capitalize", statusStyle[tx.status])}>
                      {statusIcon[tx.status]} {tx.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-mono">{tx.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
