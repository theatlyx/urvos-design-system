"use client";

import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { clsx } from "clsx";

export interface RadarMetric {
  subject: string;
  A: number;
  B?: number;
  fullMark?: number;
}

export interface ChartRadarProps {
  data: RadarMetric[];
  title?: string;
  seriesALabel?: string;
  seriesBLabel?: string;
  height?: number;
  className?: string;
}

export function ChartRadar({
  data,
  title = "Multi-Domain Clinical Assessment",
  seriesALabel = "Current Evaluation",
  seriesBLabel,
  height = 300,
  className,
}: ChartRadarProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className)}>
      {title && <h4 className="text-sm font-semibold text-urvos-text mb-2">{title}</h4>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="var(--urvos-border, #E2E8F0)" />
            <PolarAngleAxis dataKey="subject" stroke="var(--urvos-text-subtle, #64748B)" fontSize={12} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
            <Radar name={seriesALabel} dataKey="A" stroke="var(--brand-solid, #0B5B8E)" fill="var(--brand-solid, #0B5B8E)" fillOpacity={0.5} />
            {seriesBLabel && (
              <Radar name={seriesBLabel} dataKey="B" stroke="var(--sig-caution, #DE8A16)" fill="var(--sig-caution, #DE8A16)" fillOpacity={0.4} />
            )}
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
