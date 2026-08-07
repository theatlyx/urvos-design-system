"use client";

import React from "react";
import { clsx } from "clsx";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";

export function ClinicalReportsDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Clinical Registries & Disease Reports</h1>
          <p className="text-xs text-urvos-text-subtle">Generate & export disease registries, immunization coverage, and clinical outcomes</p>
        </div>
        <Button size="sm">
          <Download className="w-3.5 h-3.5 mr-1" /> Export CSV Report
        </Button>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs">
        <h3 className="font-bold text-sm text-urvos-text">Active Clinical Registries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
            <div className="text-urvos-text-subtle">Diabetes Type 2 Registry</div>
            <div className="text-lg font-bold text-urvos-text">1,420 Patients</div>
          </div>
          <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
            <div className="text-urvos-text-subtle">Hypertension Cohort</div>
            <div className="text-lg font-bold text-urvos-text">2,890 Patients</div>
          </div>
          <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
            <div className="text-urvos-text-subtle">Asthma & COPD Registry</div>
            <div className="text-lg font-bold text-urvos-text">640 Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
