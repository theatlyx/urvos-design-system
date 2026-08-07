"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, Clock, FileSignature, AlertCircle, Calendar, CheckCircle2, User } from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { PreChartPanel } from "../../healthcare/PreChartPanel";
import { UnsignedChartsCard } from "../../healthcare/UnsignedChartsCard";

export interface AppointmentItem {
  id: string;
  time: string;
  patientName: string;
  age: number;
  gender: string;
  type: string;
  status: "Waiting" | "In-Progress" | "Completed";
}

export interface ClinicalOverviewDashboardProps {
  providerName: string;
  appointments: AppointmentItem[];
  className?: string;
}

export function ClinicalOverviewDashboard({
  providerName = "Dr. Anita Sharma",
  appointments = [
    { id: "1", time: "09:00 AM", patientName: "Rajesh Kumar", age: 45, gender: "M", type: "Follow-up", status: "In-Progress" },
    { id: "2", time: "09:30 AM", patientName: "Priya Mehta", age: 32, gender: "F", type: "New Consult", status: "Waiting" },
    { id: "3", time: "10:00 AM", patientName: "Amit Shah", age: 58, gender: "M", type: "Lab Review", status: "Waiting" },
  ],
  className,
}: ClinicalOverviewDashboardProps) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Clinical OPD Command Center</h1>
          <p className="text-xs text-urvos-text-subtle">
            Good morning, <strong className="text-urvos-text">{providerName}</strong> • {appointments.length} appointments scheduled today
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm">+ New Patient Encounter</Button>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: PRE-CHART & UNSIGNED NOTES */}
        <div className="lg:col-span-2 space-y-6">
          <PreChartPanel
            data={{
              patientName: "Rajesh Kumar",
              age: 45,
              gender: "Male",
              chiefComplaint: "Chest tightness & exertional dyspnea x 3 days",
              lastVitals: { bp: "138/88", hr: 82, temp: "98.6°F", spo2: 98 },
              activeDiagnoses: ["Essential Hypertension", "Type 2 Diabetes Mellitus"],
              pendingOrders: ["ECG 12-Lead", "Troponin I Lab"],
              riskScore: "MODERATE",
            }}
          />

          <UnsignedChartsCard
            charts={[
              { id: "CH-1", patientName: "Sanjay Patel", encounterDate: "2026-07-23", encounterType: "OPD Consultation", providerName: providerName, daysPending: 1 },
              { id: "CH-2", patientName: "Kavita Rao", encounterDate: "2026-07-22", encounterType: "Follow-up", providerName: providerName, daysPending: 2, isLockWarning: true },
            ]}
          />
        </div>

        {/* RIGHT COLUMN: APPOINTMENT ROSTER */}
        <div className="bg-urvos-surface border border-urvos-border rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-urvos-border pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-urvos-primary" />
              <h3 className="font-semibold text-base text-urvos-text">Today's Roster</h3>
            </div>
            <Badge variant="neutral">{appointments.length} Patients</Badge>
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-3 border border-urvos-border rounded-lg bg-urvos-background flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-urvos-text">{apt.patientName}</div>
                  <div className="text-[11px] text-urvos-text-subtle">
                    {apt.time} • {apt.type} ({apt.age}y/{apt.gender})
                  </div>
                </div>
                <Badge variant={apt.status === "In-Progress" ? "success" : apt.status === "Waiting" ? "caution" : "neutral"}>
                  {apt.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
