"use client";

import React from "react";
import { clsx } from "clsx";

export interface HeatmapCell {
  day: string;
  hour: string;
  intensity: number; // 0 to 4
}

export interface ChartHeatmapProps {
  data: HeatmapCell[];
  title?: string;
  className?: string;
}

export function ChartHeatmap({ data, title = "Hourly Vital Signs Intensity", className }: ChartHeatmapProps) {
  const days = Array.from(new Set(data.map((d) => d.day)));
  const hours = Array.from(new Set(data.map((d) => d.hour)));

  const getBgColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-urvos-surface-soft";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-blue-300 text-blue-900";
      case 3:
        return "bg-blue-500 text-white";
      case 4:
        return "bg-urvos-primary text-white font-bold";
      default:
        return "bg-urvos-surface-soft";
    }
  };

  return (
    <div className={clsx("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className)}>
      <h4 className="text-sm font-semibold text-urvos-text mb-3">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr>
              <th className="p-1 text-left font-medium text-urvos-text-subtle w-16">Day</th>
              {hours.map((h) => (
                <th key={h} className="p-1 font-medium text-urvos-text-subtle">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="p-1 text-left font-semibold text-urvos-text">{day}</td>
                {hours.map((hour) => {
                  const cell = data.find((d) => d.day === day && d.hour === hour);
                  const intensity = cell ? cell.intensity : 0;
                  return (
                    <td key={hour} className="p-1">
                      <div
                        className={clsx(
                          "w-7 h-7 rounded flex items-center justify-center transition-colors",
                          getBgColor(intensity)
                        )}
                        title={`${day} ${hour}: Intensity ${intensity}`}
                      >
                        {intensity > 0 ? intensity : ""}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
