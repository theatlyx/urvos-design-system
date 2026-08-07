"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, Users, Target, ShieldCheck } from "lucide-react";
import { ChartGauge } from "../../charts/ChartGauge";
import { ChartRadar } from "../../charts/ChartRadar";
import { Badge } from "../../ui/Badge";

export function PopulationHealthDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Population Health & Chronic Care Analytics</h1>
          <p className="text-xs text-urvos-text-subtle">
            Cohort management, NCQA quality measure compliance, and clinical risk stratification
          </p>
        </div>
        <Badge variant="info">Active Cohort: Diabetes & HTN (1,420 Patients)</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartGauge value={78} title="HbA1c Target Compliance (<7.0%)" label="78% Cohort Target Met" />
        <ChartRadar
          title="Quality Measures Dimensions (NCQA / HEDIS)"
          seriesALabel="Facility Quality Score"
          seriesBLabel="National Benchmark"
          data={[
            { subject: "Diabetes Screening", A: 92, B: 85, fullMark: 100 },
            { subject: "BP Control (<130/80)", A: 78, B: 80, fullMark: 100 },
            { subject: "Statin Adherence", A: 88, B: 75, fullMark: 100 },
            { subject: "Eye Exam Compliance", A: 65, B: 70, fullMark: 100 },
            { subject: "Kidney Disease Mon.", A: 84, B: 78, fullMark: 100 },
          ]}
        />
      </div>
    </div>
  );
}
