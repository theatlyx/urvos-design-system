"use client";

import React from "react";
import { clsx } from "clsx";
import { TestTube, Star, Plus } from "lucide-react";
import { Button } from "../../ui/Button";
import { FavoriteOrdersPanel } from "../../healthcare/FavoriteOrdersPanel";

export function LabOrderEntry({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Diagnostic Lab & Order Entry Panel</h1>
          <p className="text-xs text-urvos-text-subtle">
            e-Order laboratory panels with priority selection & insurance coverage check
          </p>
        </div>
        <Button size="sm">+ Submit Diagnostic Order</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs">
            <h3 className="font-bold text-sm text-urvos-text">Active Order Draft</h3>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-urvos-primary/10 text-urvos-primary font-mono font-bold rounded">
                Complete Blood Count (CBC)
              </span>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 font-mono font-bold rounded">
                Lipid Profile Panel
              </span>
            </div>
          </div>
        </div>

        <FavoriteOrdersPanel
          orders={[
            { id: "ORD-1", name: "Cardiac Enzyme Panel", type: "Laboratory", details: "Troponin I, CK-MB, Myoglobin", frequency: "STAT" },
            { id: "ORD-2", name: "Comprehensive Metabolic Panel (CMP)", type: "Laboratory", details: "KFT, LFT, Electrolytes", frequency: "Routine" },
          ]}
        />
      </div>
    </div>
  );
}
