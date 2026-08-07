"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Activity, Heart, Thermometer, Radio, AlertTriangle } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function RealTimeMonitoringDashboard({ className }: { className?: string }) {
  const [pulse, setPulse] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(70 + Math.floor(Math.random() * 8));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <h1 className="text-xl font-bold text-urvos-text">ICU Live Telemetry Monitoring Stream</h1>
          </div>
          <p className="text-xs text-urvos-text-subtle">Real-time WebSocket physiological vital signs feed • Bedside Monitors 1-4</p>
        </div>
        <Badge variant="success" icon={<Activity className="w-3 h-3 text-emerald-500 animate-spin" />}>
          Live Telemetry Connected
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-urvos-text-subtle">
            <span>ICU Bed 1 • Patient A</span>
            <Badge variant="success">Normal</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="text-2xl font-black text-urvos-text">{pulse} <span className="text-xs font-normal">bpm</span></span>
          </div>
          <div className="text-[10px] text-urvos-text-subtle font-mono">SpO2: 99% • BP: 122/78</div>
        </div>

        <div className="p-4 bg-urvos-surface border border-rose-500/30 bg-rose-500/5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-urvos-text-subtle">
            <span>ICU Bed 2 • Patient B</span>
            <Badge variant="critical">Tachycardia</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-600 animate-ping" />
            <span className="text-2xl font-black text-rose-600">128 <span className="text-xs font-normal">bpm</span></span>
          </div>
          <div className="text-[10px] text-rose-600 font-mono font-semibold">SpO2: 92% • BP: 94/60</div>
        </div>
      </div>
    </div>
  );
}
