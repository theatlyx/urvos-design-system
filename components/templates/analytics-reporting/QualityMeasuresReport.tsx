"use client";

import React from "react";
import { clsx } from "clsx";
import { ShieldCheck, Award } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { ChartGauge } from "../../charts/ChartGauge";

export function QualityMeasuresReport({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">NABH & NCQA Hospital Quality Indicators</h1>
          <p className="text-xs text-urvos-text-subtle">Quality compliance, hand hygiene auditing, and surgical site infection (SSI) tracking</p>
        </div>
        <Badge variant="success">NABH Accredited Facility</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartGauge value={96} title="Hand Hygiene Audit Compliance Rate" label="96% Audit Pass Score" />
        <div className="p-5 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs">
          <h3 className="font-bold text-sm text-urvos-text">Clinical Quality KPIs</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-urvos-border pb-1">
              <span>Surgical Site Infection (SSI) Rate:</span>
              <span className="font-bold text-emerald-600">0.02% (Target &lt; 0.5%)</span>
            </div>
            <div className="flex justify-between border-b border-urvos-border pb-1">
              <span>Patient Fall Incident Rate:</span>
              <span className="font-bold text-emerald-600">0 per 1,000 bed days</span>
            </div>
            <div className="flex justify-between">
              <span>Medication Reconciled at Discharge:</span>
              <span className="font-bold text-emerald-600">98.4% Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
