"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, ShieldCheck, RefreshCw } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

export function Hl7MessageMonitor({ className }: { className?: string }) {
  const messages = [
    { id: "MSG-10029", type: "ADT^A08 (Patient Update)", status: "ACK Processed", timestamp: "2026-07-24 10:14:02", latency: "14ms" },
    { id: "MSG-10028", type: "ORM^O01 (Order General)", status: "ACK Processed", timestamp: "2026-07-24 10:12:45", latency: "22ms" },
    { id: "MSG-10027", type: "ORU^R01 (Observation Result)", status: "ACK Processed", timestamp: "2026-07-24 10:10:11", latency: "18ms" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">HL7 v2.x Interface Engine Monitor</h1>
          <p className="text-xs text-urvos-text-subtle">Real-time MLLP TCP stream, ADT/ORM/ORU message queue latency & error repair</p>
        </div>
        <Badge variant="success">Interface Active (0 Queued)</Badge>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-urvos-text font-mono">{m.id} • {m.type}</div>
              <div className="text-[11px] text-urvos-text-subtle">{m.timestamp} • Latency: {m.latency}</div>
            </div>
            <Badge variant="success">{m.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
