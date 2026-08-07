"use client";

import React from "react";
import { clsx } from "clsx";
import { Pill, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

export function PharmacyOrderDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Pharmacy Dispensing & Order Queue</h1>
          <p className="text-xs text-urvos-text-subtle">Outpatient & Inpatient eRx queue, dispensing verification, and barcode print</p>
        </div>
        <Badge variant="caution">3 Orders Pending Dispense</Badge>
      </div>

      <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-bold text-urvos-text">eRx #RX-9981 • Patient: Rajesh Kumar</span>
          <Button size="sm">Dispense & Print Barcode</Button>
        </div>
        <p className="text-urvos-text-subtle">Medications: Tab. Telmisartan 40mg (30 tabs) • Tab. Pantoprazole 40mg (14 tabs)</p>
      </div>
    </div>
  );
}
