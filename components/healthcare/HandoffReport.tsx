"use client";

import React from "react";
import { clsx } from "clsx";
import { Stethoscope, AlertTriangle, UserCheck, Clock, FileSpreadsheet } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface SbarReport {
  patientName: string;
  roomBed: string;
  mrn: string;
  outgoingNurse: string;
  incomingNurse: string;
  shiftType: "Day Shift" | "Night Shift" | "Evening Shift";
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  highRiskAlerts: string[];
}

export interface NursingHandoffReportProps {
  report: SbarReport;
  onAcknowledgeHandoff?: () => void;
  className?: string;
}

export function NursingHandoffReport({
  report,
  onAcknowledgeHandoff,
  className,
}: NursingHandoffReportProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className)}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-urvos-primary" />
            <h4 className="font-semibold text-base text-urvos-text">Nursing Shift Handoff (SBAR Protocol)</h4>
          </div>
          <div className="text-xs text-urvos-text-subtle mt-0.5">
            Patient: <strong className="text-urvos-text">{report.patientName}</strong> (Bed {report.roomBed} • MRN: {report.mrn})
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="caution">{report.shiftType}</Badge>
          <span className="text-xs text-urvos-text-subtle">
            {report.outgoingNurse} → {report.incomingNurse}
          </span>
        </div>
      </div>

      {/* ALERTS BAR */}
      {report.highRiskAlerts.length > 0 && (
        <div className="p-3 bg-urvos-error-bg border border-urvos-error/20 rounded-lg text-xs space-y-1 text-urvos-error">
          <div className="font-bold flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 text-urvos-error" />
            <span>High Risk Shift Warnings ({report.highRiskAlerts.length}):</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 font-medium pl-1">
            {report.highRiskAlerts.map((alert, i) => (
              <li key={i}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SBAR SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
          <div className="font-bold uppercase tracking-wider text-urvos-primary">S - Situation</div>
          <p className="text-urvos-text leading-relaxed">{report.situation}</p>
        </div>

        <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
          <div className="font-bold uppercase tracking-wider text-urvos-primary">B - Background</div>
          <p className="text-urvos-text leading-relaxed">{report.background}</p>
        </div>

        <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
          <div className="font-bold uppercase tracking-wider text-urvos-primary">A - Assessment</div>
          <p className="text-urvos-text leading-relaxed">{report.assessment}</p>
        </div>

        <div className="p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1">
          <div className="font-bold uppercase tracking-wider text-urvos-primary">R - Recommendation</div>
          <p className="text-urvos-text leading-relaxed">{report.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
