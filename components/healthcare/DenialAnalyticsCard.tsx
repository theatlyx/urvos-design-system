"use client";

import React from "react";
import { clsx } from "clsx";
import { AlertOctagon, FileWarning, RefreshCcw, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export interface ClaimDenial {
  id: string;
  claimId: string;
  patientName: string;
  denialCode: string; // e.g., CARC 96, RARC N382
  denialReason: string;
  amount: string;
  suggestedAction: string;
  deadlineDate: string;
}

export interface DenialAnalyticsCardProps {
  denials: ClaimDenial[];
  onTriggerAppeal?: (denialId: string) => void;
  className?: string;
}

export function DenialAnalyticsCard({
  denials,
  onTriggerAppeal,
  className,
}: DenialAnalyticsCardProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="w-5 h-5 text-urvos-destructive" />
          <div>
            <h4 className="font-semibold text-base text-urvos-text">RCM Claim Denial Advice (835 ERA)</h4>
            <p className="text-xs text-urvos-text-subtle">Uncollected revenue requiring documentation or code appeal</p>
          </div>
        </div>

        <Badge variant="critical">{denials.length} Active Denials</Badge>
      </div>

      <div className="space-y-3">
        {denials.map((denial) => (
          <div key={denial.id} className="p-4 border border-urvos-destructive/20 bg-urvos-destructive/5 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-urvos-text">{denial.patientName}</span>
                  <span className="font-mono text-xs text-urvos-text-subtle">Claim #{denial.claimId}</span>
                </div>
                <div className="text-xs font-mono font-semibold text-urvos-destructive mt-0.5">
                  Code {denial.denialCode}: {denial.denialReason}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-urvos-text-subtle">Denied Amount</div>
                <div className="text-base font-bold text-urvos-destructive">{denial.amount}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-urvos-destructive/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="text-urvos-text-subtle">
                Action: <strong className="text-urvos-text">{denial.suggestedAction}</strong> (Appeal Deadline: {denial.deadlineDate})
              </div>

              {onTriggerAppeal && (
                <Button size="sm" variant="secondary" className="text-xs border-urvos-destructive/30 text-urvos-destructive hover:bg-urvos-destructive/10" onClick={() => onTriggerAppeal(denial.id)}>
                  <RefreshCcw className="w-3 h-3 mr-1" /> Re-submit Appeal
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
