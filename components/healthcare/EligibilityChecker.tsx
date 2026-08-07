"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Search, ShieldCheck, AlertCircle, CreditCard, DollarSign, Calendar } from "lucide-react";
import { Button } from "../ui/Button";

export interface EligibilityResult {
  policyNumber: string;
  payerName: string;
  subscriberName: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  copayAmount: string;
  deductibleRemaining: string;
  annualMaxLimit: string;
  coverageEndDate: string;
  requiresPreAuth: boolean;
}

export interface EligibilityCheckerProps {
  onCheckEligibility?: (memberId: string, payerId: string) => Promise<EligibilityResult>;
  initialData?: EligibilityResult;
  className?: string;
}

export function EligibilityChecker({
  onCheckEligibility,
  initialData,
  className,
}: EligibilityCheckerProps) {
  const [memberId, setMemberId] = useState("");
  const [payerId, setPayerId] = useState("STAR");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(initialData || null);

  const handleRunCheck = async () => {
    if (!onCheckEligibility) return;
    setLoading(true);
    try {
      const res = await onCheckEligibility(memberId, payerId);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className)}>
      <div className="flex items-center space-x-2 border-b border-urvos-border pb-3">
        <CreditCard className="w-5 h-5 text-urvos-primary" />
        <h4 className="font-semibold text-base text-urvos-text">Insurance Eligibility Verification</h4>
      </div>

      {/* INPUT FORM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Member / Policy ID (e.g. POL-9921)"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-background"
        />

        <select
          value={payerId}
          onChange={(e) => setPayerId(e.target.value)}
          className="px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-background"
        >
          <option value="STAR">Star Health Insurance</option>
          <option value="HDFC">HDFC ERGO Health</option>
          <option value="ICICI">ICICI Lombard</option>
          <option value="NIVA">Niva Bupa Health</option>
        </select>

        <Button size="sm" onClick={handleRunCheck} disabled={loading}>
          {loading ? "Verifying EDI 270..." : "Check Real-Time Eligibility"}
        </Button>
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="pt-3 border-t border-urvos-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-urvos-text">{result.subscriberName}</span>
              <span className="text-xs text-urvos-text-subtle font-mono">({result.policyNumber})</span>
            </div>

            <span
              className={clsx(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1",
                result.status === "ACTIVE" ? "bg-urvos-success-bg text-urvos-success border border-urvos-success/20" : "bg-urvos-error-bg text-urvos-error border border-urvos-error/20"
              )}
            >
              {result.status === "ACTIVE" ? <ShieldCheck className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
              <span>{result.status}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-urvos-background p-3 rounded-lg border border-urvos-border">
            <div>
              <div className="text-urvos-text-subtle">Co-Pay / Visit</div>
              <div className="font-bold text-urvos-text">{result.copayAmount}</div>
            </div>
            <div>
              <div className="text-urvos-text-subtle">Deductible Remaining</div>
              <div className="font-bold text-urvos-text">{result.deductibleRemaining}</div>
            </div>
            <div>
              <div className="text-urvos-text-subtle">Annual Coverage Cap</div>
              <div className="font-bold text-urvos-text">{result.annualMaxLimit}</div>
            </div>
            <div>
              <div className="text-urvos-text-subtle">Pre-Auth Needed?</div>
              <div className={clsx("font-bold", result.requiresPreAuth ? "text-urvos-warning" : "text-urvos-success")}>
                {result.requiresPreAuth ? "Yes (Required)" : "No (Auto-Approved)"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
