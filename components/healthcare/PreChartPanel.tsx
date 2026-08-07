"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, Heart, Thermometer, User, FileText, AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface PreChartData {
  patientName: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  lastVitals: {
    bp: string;
    hr: number;
    temp: string;
    spo2: number;
  };
  activeDiagnoses: string[];
  pendingOrders: string[];
  riskScore: "LOW" | "MODERATE" | "HIGH";
}

export interface PreChartPanelProps {
  data: PreChartData;
  onOpenFullChart?: () => void;
  className?: string;
}

export function PreChartPanel({ data, onOpenFullChart, className }: PreChartPanelProps) {
  return (
    <div className={clsx("bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft p-5 space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-urvos-primary" />
            <h4 className="font-semibold text-base text-urvos-text">60-Second Pre-Chart Overview</h4>
          </div>
          <div className="text-xs text-urvos-text-subtle mt-0.5">
            {data.patientName} ({data.age}y / {data.gender}) • Complaint: <strong className="text-urvos-text">{data.chiefComplaint}</strong>
          </div>
        </div>

        <Badge
          variant={data.riskScore === "HIGH" ? "critical" : data.riskScore === "MODERATE" ? "caution" : "success"}
        >
          {data.riskScore} Clinical Risk
        </Badge>
      </div>

      {/* VITALS SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-urvos-background p-3 rounded-urvos-md border border-urvos-border text-xs">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-urvos-danger" />
          <div>
            <div className="text-urvos-text-subtle text-[10px]">Blood Pressure</div>
            <div className="font-bold text-urvos-text">{data.lastVitals.bp} mmHg</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-urvos-success" />
          <div>
            <div className="text-urvos-text-subtle text-[10px]">Pulse / HR</div>
            <div className="font-bold text-urvos-text">{data.lastVitals.hr} bpm</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-urvos-warning" />
          <div>
            <div className="text-urvos-text-subtle text-[10px]">Temperature</div>
            <div className="font-bold text-urvos-text">{data.lastVitals.temp}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-urvos-info" />
          <div>
            <div className="text-urvos-text-subtle text-[10px]">SpO2</div>
            <div className="font-bold text-urvos-text">{data.lastVitals.spo2}%</div>
          </div>
        </div>
      </div>

      {/* DIAGNOSES & ORDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <div className="font-semibold text-urvos-text">Active Diagnoses</div>
          <div className="flex flex-wrap gap-1">
            {data.activeDiagnoses.map((d) => (
              <span key={d} className="px-2 py-0.5 bg-urvos-background border border-urvos-border rounded text-urvos-text font-medium">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="font-semibold text-urvos-text">Pending Orders & Labs</div>
          <div className="flex flex-wrap gap-1">
            {data.pendingOrders.map((o) => (
              <span key={o} className="px-2 py-0.5 bg-urvos-warning-bg border border-urvos-warning/20 text-urvos-warning rounded font-medium">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
