"use client";

import React from "react";
import { clsx } from "clsx";
import { CheckCircle2, Clock, AlertTriangle, FileCheck, DollarSign, ShieldAlert } from "lucide-react";

export interface ClaimStep {
  id: string;
  title: string;
  timestamp: string;
  status: "completed" | "current" | "pending" | "denied";
  description?: string;
}

export interface ClaimStatusTimelineProps {
  claimId: string;
  payerName: string;
  totalClaimAmount: string;
  approvedAmount?: string;
  steps: ClaimStep[];
  className?: string;
}

export function ClaimStatusTimeline({
  claimId,
  payerName,
  totalClaimAmount,
  approvedAmount,
  steps,
  className,
}: ClaimStatusTimelineProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-urvos-primary" />
            <h4 className="font-semibold text-base text-urvos-text">Insurance Claim Lifecycle: {claimId}</h4>
          </div>
          <p className="text-xs text-urvos-text-subtle mt-0.5">Payer: <strong>{payerName}</strong></p>
        </div>

        <div className="text-right">
          <div className="text-xs text-urvos-text-subtle">Total Claim Value</div>
          <div className="text-base font-bold text-urvos-text">{totalClaimAmount}</div>
          {approvedAmount && <div className="text-xs text-urvos-success font-semibold">Approved: {approvedAmount}</div>}
        </div>
      </div>

      {/* TIMELINE STEPS */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-urvos-border">
        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const isDenied = step.status === "denied";

          return (
            <div key={step.id} className="relative flex items-start space-x-3">
              {/* STEP DOT */}
              <div
                className={clsx(
                  "absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold z-10 transition-colors",
                  isCompleted && "bg-urvos-success text-urvos-text-inverse border-urvos-success",
                  isCurrent && "bg-urvos-primary text-urvos-text-inverse border-urvos-primary animate-pulse",
                  isDenied && "bg-urvos-destructive text-urvos-text-inverse border-urvos-destructive",
                  step.status === "pending" && "bg-urvos-surface text-urvos-text-subtle border-urvos-border"
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : isDenied ? <ShieldAlert className="w-3 h-3" /> : null}
              </div>

              {/* STEP BODY */}
              <div className="flex-1 bg-urvos-background p-3 rounded-lg border border-urvos-border">
                <div className="flex items-center justify-between">
                  <span className={clsx("text-xs font-semibold", isDenied ? "text-urvos-destructive" : "text-urvos-text")}>
                    {step.title}
                  </span>
                  <span className="text-[10px] font-mono text-urvos-text-subtle">{step.timestamp}</span>
                </div>
                {step.description && <p className="text-xs text-urvos-text-subtle mt-1">{step.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
