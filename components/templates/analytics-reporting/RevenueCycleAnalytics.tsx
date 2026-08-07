"use client";

import React from "react";
import { clsx } from "clsx";
import { DollarSign, TrendingUp, AlertOctagon } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function RevenueCycleAnalytics({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Revenue Cycle & Denial Waterfall Analytics</h1>
          <p className="text-xs text-urvos-text-subtle">Payer reimbursement rates, CARC denial waterfall, and collection velocity</p>
        </div>
        <Badge variant="success">94.2% Clean Claim Rate</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1">
          <div className="text-urvos-text-subtle">Gross Billed Revenue</div>
          <div className="text-xl font-black text-urvos-text">₹42,80,000</div>
        </div>
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1">
          <div className="text-urvos-text-subtle">Net Collected Cash</div>
          <div className="text-xl font-black text-emerald-600">₹38,10,000</div>
        </div>
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1">
          <div className="text-urvos-text-subtle">Outstanding AR (&gt;60d)</div>
          <div className="text-xl font-black text-amber-600">₹4,70,000</div>
        </div>
      </div>
    </div>
  );
}
