"use client";

import React from "react";
import { clsx } from "clsx";
import { FileSignature, Clock, CheckCircle2, Lock, FileText } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export interface UnsignedChartItem {
  id: string;
  patientName: string;
  encounterDate: string;
  encounterType: string;
  providerName: string;
  daysPending: number;
  isLockWarning?: boolean;
}

export interface UnsignedChartsCardProps {
  charts: UnsignedChartItem[];
  onSignChart?: (chartId: string) => void;
  onSignAll?: () => void;
  className?: string;
}

export function UnsignedChartsCard({
  charts,
  onSignChart,
  onSignAll,
  className,
}: UnsignedChartsCardProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center space-x-2">
          <FileSignature className="w-5 h-5 text-urvos-primary" />
          <div>
            <h4 className="font-semibold text-base text-urvos-text">Unsigned Chart Notes Inbox</h4>
            <p className="text-xs text-urvos-text-subtle">Completed encounters requiring provider signature lock</p>
          </div>
        </div>

        {charts.length > 0 && onSignAll && (
          <Button size="sm" onClick={onSignAll}>
            Sign All ({charts.length})
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {charts.length === 0 ? (
          <div className="text-center py-6 text-xs text-urvos-text-subtle">
            🎉 All clinical notes are electronically signed and locked.
          </div>
        ) : (
          charts.map((chart) => (
            <div
              key={chart.id}
              className={clsx(
                "p-3.5 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs",
                chart.isLockWarning
                  ? "bg-urvos-error-bg border-urvos-error/30"
                  : "bg-urvos-background border-urvos-border"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-urvos-text">{chart.patientName}</span>
                  <Badge variant="neutral">{chart.encounterType}</Badge>
                  {chart.isLockWarning && (
                    <span className="text-[10px] font-bold text-urvos-error flex items-center">
                      <Lock className="w-3 h-3 mr-0.5" /> Locks in 24h
                    </span>
                  )}
                </div>
                <div className="text-urvos-text-subtle flex items-center space-x-3">
                  <span>Encounter Date: <strong>{chart.encounterDate}</strong></span>
                  <span>•</span>
                  <span>Provider: {chart.providerName}</span>
                  <span>•</span>
                  <span className={clsx("font-semibold", chart.daysPending >= 3 ? "text-urvos-error" : "text-urvos-warning")}>
                    Pending: {chart.daysPending}d
                  </span>
                </div>
              </div>

              {onSignChart && (
                <Button size="sm" variant="secondary" onClick={() => onSignChart(chart.id)}>
                  Sign & Lock Note
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
