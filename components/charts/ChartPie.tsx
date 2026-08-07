"use client";

import * as React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { clsx } from "clsx";

export interface ChartPieProps {
  data: {
    name: string;
    value: number;
    color?: string;
  }[];
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  className?: string;
}

export function ChartPie({
  data,
  height = 300,
  innerRadius = "50%",
  outerRadius = "80%",
  className,
}: ChartPieProps) {
  return (
    <div className={clsx("chart-container", className)} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            stroke="var(--surface)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || `var(--brand-${(index % 4) + 1})`} 
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--surface)", 
              border: "1px solid var(--border)", 
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-pop)",
              color: "var(--text-1)",
              padding: "8px 12px",
            }} 
            itemStyle={{ color: "var(--text-1)" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
