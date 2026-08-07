"use client";

import React from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";
import { clsx } from "clsx";

export interface BubblePoint {
  x: number; // Age or metric
  y: number; // Blood Pressure
  z: number; // Risk Score (Bubble Size)
  name: string;
}

export interface ChartBubbleProps {
  data: BubblePoint[];
  title?: string;
  className?: string;
}

export function ChartBubble({ data, title = "Multi-Dimensional Risk Distribution", className }: ChartBubbleProps) {
  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className)}>
      <h4 className="text-sm font-semibold text-urvos-text">{title}</h4>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis type="number" dataKey="x" name="Age" unit=" yrs" stroke="#94A3B8" fontSize={12} />
            <YAxis type="number" dataKey="y" name="Systolic BP" unit=" mmHg" stroke="#94A3B8" fontSize={12} />
            <ZAxis type="number" dataKey="z" range={[60, 400]} name="Risk Index" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#0284C7">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.z > 70 ? "#DE3F68" : "#0284C7"} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
