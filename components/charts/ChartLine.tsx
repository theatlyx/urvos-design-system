"use client";

import * as React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { clsx } from "clsx";

export interface ChartLineProps {
  data: any[];
  lines: {
    key: string;
    color?: string;
    name?: string;
  }[];
  xAxisKey?: string;
  height?: number;
  className?: string;
}

export function ChartLine({
  data,
  lines,
  xAxisKey = "name",
  height = 300,
  className,
}: ChartLineProps) {
  return (
    <div className={clsx("chart-container", className)} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
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
              color: "var(--text-1)"
            }} 
            itemStyle={{ color: "var(--text-1)" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          {lines.map((line, idx) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name || line.key}
              stroke={line.color || `var(--brand-${(idx % 4) + 1})`}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
