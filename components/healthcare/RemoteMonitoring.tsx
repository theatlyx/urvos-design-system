"use client";

import React from "react";
import { clsx } from "clsx";
import { Radio, Heart, Activity, Thermometer } from "lucide-react";

export interface TelemetryFeed {
  device: string;
  metric: string;
  value: string;
  unit: string;
  status: "normal" | "alert" | "warning";
  timestamp: string;
}

export interface RemoteMonitoringProps {
  feeds: TelemetryFeed[];
  className?: string;
}

export function RemoteMonitoring({ feeds, className }: RemoteMonitoringProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-urvos-border pb-3">
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-urvos-danger animate-pulse" />
          <h3 className="text-base font-bold text-urvos-text">Remote Patient Monitoring (RPM Telemetry)</h3>
        </div>
        <span className="text-xs font-mono bg-urvos-primary/10 text-urvos-primary px-2 py-0.5 rounded font-bold">
          LIVE FEED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {feeds.map((f, idx) => (
          <div key={idx} className="p-4 border border-urvos-border rounded-xl bg-urvos-surface space-y-1">
            <span className="text-xs font-bold text-urvos-text-subtle uppercase">{f.device}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-urvos-text">{f.value}</span>
              <span className="text-xs font-semibold text-urvos-text-subtle">{f.unit}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-urvos-border/50 text-[10px]">
              <span className={clsx("font-bold uppercase px-1.5 py-0.5 rounded", f.status === "alert" ? "bg-urvos-danger/10 text-urvos-danger" : "bg-urvos-success/10 text-urvos-success")}>
                {f.status}
              </span>
              <span className="text-urvos-text-subtle">{f.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
