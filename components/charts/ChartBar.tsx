"use client";

import * as React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { clsx } from "clsx";

export interface ChartBarProps {
  data: any[];
  bars: {
    key: string;
    color?: string;
    name?: string;
  }[];
  xAxisKey?: string;
  height?: number;
  className?: string;
}

export function ChartBar({
  data,
  bars,
  xAxisKey = "name",
  height = 300,
  className,
}: ChartBarProps) {
  return (
    <div className={clsx("chart-container", className)} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="var(--text-3)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="var(--text-3)" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dx={-10}
          />
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
            cursor={{ fill: "var(--surface-soft)" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          {bars.map((bar, idx) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.name || bar.key}
              fill={bar.color || `var(--brand-${(idx % 4) + 1})`}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
