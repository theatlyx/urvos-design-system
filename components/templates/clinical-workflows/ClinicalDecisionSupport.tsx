"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Zap, AlertTriangle, CheckCircle2, Info, XCircle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

interface CdsAlert {
  id: number;
  type: "contraindication" | "interaction" | "recommendation" | "order-set" | "reminder";
  priority: "critical" | "high" | "moderate" | "info";
  title: string;
  detail: string;
  source: string;
  actions?: string[];
  dismissed?: boolean;
}

const alerts: CdsAlert[] = [
  { id: 1, type: "contraindication", priority: "critical", title: "NSAID Contraindicated in NSTEMI", detail: "Diclofenac 50mg (ordered) is contraindicated in ACS. NSAIDs increase cardiovascular mortality in acute coronary syndrome. Discontinue immediately.", source: "ACC/AHA 2023 ACS Guidelines", actions: ["Discontinue NSAID", "Suggest Paracetamol 1g TDS instead"] },
  { id: 2, type: "interaction", priority: "high", title: "Drug Interaction: Ticagrelor + Simvastatin", detail: "Ticagrelor inhibits CYP3A4 — may increase Simvastatin levels 5-fold. Risk of myopathy/rhabdomyolysis. Switch to Atorvastatin or Rosuvastatin.", source: "Medscape Drug Interactions DB", actions: ["Switch to Atorvastatin 40mg OD", "Dismiss — patient tolerating well"] },
  { id: 3, type: "order-set", priority: "high", title: "NSTEMI Order Set Available", detail: "Evidence-based NSTEMI order set includes: DAPT, anticoagulation, beta-blocker, statin, nitrate PRN, and cardiac monitoring. Click to apply.", source: "Urvos Clinical Decision Library", actions: ["Apply NSTEMI Order Set", "View Order Details"] },
  { id: 4, type: "recommendation", priority: "moderate", title: "Prophylactic Anticoagulation Recommended", detail: "Patient on bed rest post-ACS without anticoagulation. DVT prophylaxis with Enoxaparin 40mg SC OD recommended per ACCP guidelines.", source: "ACCP 2022 VTE Prophylaxis Guidelines", actions: ["Order Enoxaparin 40mg SC OD", "Patient already on LMWH — dismiss"] },
  { id: 5, type: "reminder", priority: "info", title: "Troponin Repeat Due at 06:00", detail: "Serial Troponin I ordered — 3h repeat due at 06:00 AM. Positive Troponin → activate Cath Lab pathway immediately.", source: "Clinical Protocol Reminder", actions: ["Order Now", "Remind in 30 min"] },
];

const priorityStyle: Record<string, string> = {
  critical: "border-rose-300 bg-rose-50/60",
  high: "border-amber-300 bg-amber-50/60",
  moderate: "border-blue-300 bg-blue-50/60",
  info: "border-urvos-border bg-urvos-surface",
};
const priorityIcon: Record<string, React.ReactNode> = {
  critical: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
  high: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  moderate: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
  info: <Info className="w-5 h-5 text-slate-400 shrink-0" />,
};
const priorityBadge: Record<string, "critical" | "caution" | "info" | "neutral"> = { critical: "critical", high: "caution", moderate: "info", info: "neutral" };

export function ClinicalDecisionSupportTemplate({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState<number[]>([1, 2]);
  const [dismissed, setDismiss] = useState<number[]>([]);
  const visible = alerts.filter(a => !dismissed.includes(a.id));

  const toggle = (id: number) => setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div className={clsx("space-y-4 font-sans text-urvos-text", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-urvos-primary" /> Clinical Decision Support
          </h1>
          <p className="text-xs text-urvos-text-subtle">Active CDS alerts for Rajesh Kumar · MRN-8819 · ACS / NSTEMI</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="critical">{visible.filter(a => a.priority === "critical").length} Critical</Badge>
          <Badge variant="caution">{visible.filter(a => a.priority === "high").length} High</Badge>
        </div>
      </div>

      {visible.length === 0 && (
        <div className="flex flex-col items-center py-12 text-urvos-text-subtle">
          <CheckCircle2 className="w-10 h-10 mb-3 text-emerald-500" />
          <p className="font-semibold">No active CDS alerts</p>
          <p className="text-xs mt-1">All alerts have been addressed or dismissed.</p>
        </div>
      )}

      <div className="space-y-3">
        {visible.map(alert => {
          const isExpanded = expanded.includes(alert.id);
          return (
            <div key={alert.id} className={clsx("rounded-xl border overflow-hidden transition-all", priorityStyle[alert.priority])}>
              <button onClick={() => toggle(alert.id)} className="w-full flex items-center gap-3 p-4 text-left">
                {priorityIcon[alert.priority]}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold">{alert.title}</p>
                    <Badge variant={priorityBadge[alert.priority]} className="text-[10px]">{alert.priority}</Badge>
                    <Badge variant="neutral" className="text-[10px] capitalize">{alert.type.replace("-", " ")}</Badge>
                  </div>
                  {!isExpanded && <p className="text-xs text-urvos-text-subtle mt-0.5 truncate">{alert.detail}</p>}
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-urvos-text-subtle shrink-0" /> : <ChevronDown className="w-4 h-4 text-urvos-text-subtle shrink-0" />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-current/10">
                  <p className="text-sm leading-relaxed mt-3">{alert.detail}</p>
                  <div className="flex items-center gap-1 text-[10px] text-urvos-text-subtle">
                    <ExternalLink className="w-3 h-3" />
                    Source: <span className="font-medium ml-1">{alert.source}</span>
                  </div>
                  {alert.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {alert.actions.map((action, i) => (
                        <Button key={i} size="sm" variant={i === 0 ? "primary" : "secondary"} onClick={() => i === alert.actions!.length - 1 && setDismiss(prev => [...prev, alert.id])}>
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
