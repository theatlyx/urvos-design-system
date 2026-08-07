"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { clsx } from "clsx";

export interface ChartSparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number | string;
  className?: string;
}

export function ChartSparkline({
  data,
  color = "#0284C7",
  height = 32,
  width = 96,
  className,
}: ChartSparklineProps) {
  const chartData = data.map((val, idx) => ({ idx, val }));

  return (
    <div className={clsx("inline-block", className)} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
