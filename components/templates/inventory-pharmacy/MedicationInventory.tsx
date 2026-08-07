"use client";

import React from "react";
import { clsx } from "clsx";
import { Pill, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/Badge";

export function MedicationInventory({ className }: { className?: string }) {
  const stockItems = [
    { id: "STK-1", name: "Tab. Telmisartan 40mg", batch: "B-9918", expiry: "2027-11-30", stock: 1200, unit: "Tabs", status: "Optimal" },
    { id: "STK-2", name: "Inj. Paracetamol 1000mg IV", batch: "B-4421", expiry: "2026-08-15", stock: 45, unit: "Vials", status: "Low Stock Warning" },
    { id: "STK-3", name: "Inj. Morphine Sulfate 10mg", batch: "N-0012", expiry: "2028-01-10", stock: 12, unit: "Ampoules", status: "Narcotic Controlled" },
  ];

  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Hospital Pharmacy & Stock Inventory</h1>
          <p className="text-xs text-urvos-text-subtle">Stock levels, reorder thresholds, expiry alerts, and narcotic tracking</p>
        </div>
        <Badge variant="caution">1 Low Stock Alert</Badge>
      </div>

      <div className="space-y-3">
        {stockItems.map((item) => (
          <div key={item.id} className="p-3.5 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-urvos-text">{item.name}</div>
              <div className="text-[11px] text-urvos-text-subtle">
                Batch: {item.batch} • Expires: {item.expiry}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-bold font-mono text-sm">{item.stock} {item.unit}</span>
              <Badge variant={item.status.includes("Low") ? "caution" : item.status.includes("Narcotic") ? "critical" : "success"}>
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
