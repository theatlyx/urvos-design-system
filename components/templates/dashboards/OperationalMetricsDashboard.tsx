"use client";

import React from "react";
import { clsx } from "clsx";
import { Activity, Clock, Users, Building2 } from "lucide-react";
import { ChartHeatmap } from "../../charts/ChartHeatmap";
import { ChartGauge } from "../../charts/ChartGauge";

export function OperationalMetricsDashboard({ className }: { className?: string }) {
  return (
    <div className={clsx("space-y-6 font-sans text-urvos-text", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-urvos-text">Hospital Operations & Facility Metrics</h1>
          <p className="text-xs text-urvos-text-subtle">
            Bed occupancy rate, OPD waiting times density, and provider capacity utilization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartGauge value={84} title="Inpatient Bed Occupancy Rate" label="84% Capacity (42/50 Beds)" />
        <ChartHeatmap
          title="Hourly OPD Patient Check-in Density"
          data={[
            { day: "Mon", hour: "09:00", intensity: 4 },
            { day: "Mon", hour: "11:00", intensity: 4 },
            { day: "Mon", hour: "14:00", intensity: 2 },
            { day: "Tue", hour: "09:00", intensity: 3 },
            { day: "Tue", hour: "11:00", intensity: 4 },
            { day: "Tue", hour: "14:00", intensity: 1 },
          ]}
        />
      </div>
    </div>
  );
}
