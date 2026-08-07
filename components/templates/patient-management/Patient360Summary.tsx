"use client";

import React from "react";
import { clsx } from "clsx";
import { User, Activity, AlertTriangle, Pill, FileText } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Feedback";

export function Patient360Summary({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      {/* PATIENT HEADER */}
      <div className="p-5 bg-urvos-surface border border-urvos-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-4">
          <Avatar name="Ananya Roy" size="lg" status="online" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-urvos-text">Ananya Roy</h1>
              <Badge variant="success">ABHA Verified</Badge>
            </div>
            <div className="text-xs text-urvos-text-subtle mt-0.5 flex flex-wrap gap-2">
              <span>38y / Female</span>
              <span>•</span>
              <span>MRN: MRN-99182</span>
              <span>•</span>
              <span>ABHA: 91-0021-9988-1234</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="critical">Allergy: Penicillin G</Badge>
        </div>
      </div>

      {/* 360 PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text">Active Diagnoses</h3>
          <ul className="text-xs space-y-1 text-urvos-text-subtle list-disc list-inside">
            <li>Essential Hypertension (I10)</li>
            <li>Asthma, Unspecified (J45.909)</li>
          </ul>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text">Current Medications</h3>
          <ul className="text-xs space-y-1 text-urvos-text-subtle list-disc list-inside">
            <li>Tab. Telmisartan 40mg PO daily</li>
            <li>Inhaler Budesonide 200mcg BID</li>
          </ul>
        </div>

        <div className="p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2">
          <h3 className="font-bold text-sm text-urvos-text">Recent Lab Results</h3>
          <div className="text-xs space-y-1">
            <div className="flex justify-between font-semibold"><span>HbA1c:</span> 5.8% (Normal)</div>
            <div className="flex justify-between font-semibold text-amber-600"><span>Serum K+:</span> 3.3 mEq/L (Low)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
