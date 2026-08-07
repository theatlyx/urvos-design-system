"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { clsx } from "clsx";

export interface ChartGaugeProps {
  value: number; // 0 to 100
  title?: string;
  label?: string;
  className?: string;
}

export function ChartGauge({ value, title = "Clinical Risk Index", label = "Moderate Risk", className }: ChartGaugeProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  const data = [
    { name: "Score", value: normalizedValue },
    { name: "Remaining", value: 100 - normalizedValue },
  ];

  const getColor = (val: number) => {
    if (val < 35) return "#0EA968"; // Low risk (green)
    if (val < 70) return "#DE8A16"; // Moderate risk (amber)
    return "#DE3F68"; // High risk (red)
  };

  const activeColor = getColor(normalizedValue);

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center", className)}>
      <h4 className="text-sm font-semibold text-urvos-text mb-2">{title}</h4>
      <div className="relative w-48 h-32 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="80%"
              innerRadius={55}
              outerRadius={75}
              stroke="none"
            >
              <Cell fill={activeColor} />
              <Cell fill="var(--surface-soft, #F1F5F9)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-urvos-text leading-none">{normalizedValue}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold -mt-2" style={{ color: activeColor }}>
        {label}
      </span>
    </div>
  );
}
