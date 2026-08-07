"use client";

import React from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { clsx } from "clsx";

export interface ScatterDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ChartScatterProps {
  data: ScatterDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
}

export function ChartScatter({
  data,
  xAxisLabel = "Systolic BP (mmHg)",
  yAxisLabel = "Heart Rate (bpm)",
  height = 300,
  className,
}: ChartScatterProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className)}>
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-urvos-text">{xAxisLabel} vs {yAxisLabel}</h4>
      </div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--urvos-border, #E2E8F0)" />
            <XAxis dataKey="x" name={xAxisLabel} unit="" stroke="var(--urvos-text-subtle, #64748B)" fontSize={12} />
            <YAxis dataKey="y" name={yAxisLabel} unit="" stroke="var(--urvos-text-subtle, #64748B)" fontSize={12} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Observations" data={data} fill="var(--brand-solid, #0B5B8E)" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
