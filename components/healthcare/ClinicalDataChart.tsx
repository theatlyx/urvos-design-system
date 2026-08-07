import React from "react";
import { clsx } from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface ChartDataPoint {
  date: string;
  value: number;
}

interface ClinicalDataChartProps {
  title: string;
  data: ChartDataPoint[];
  unit: string;
  normalRange?: [number, number];
  className?: string;
}

export function ClinicalDataChart({ title, data, unit, normalRange, className }: ClinicalDataChartProps) {
  const latestValue = data.length > 0 ? data[data.length - 1].value : 0;
  const previousValue = data.length > 1 ? data[data.length - 2].value : latestValue;
  const trend = latestValue > previousValue ? 'up' : latestValue < previousValue ? 'down' : 'stable';
  
  // Calculate relative change
  const percentChange = previousValue === 0 ? 0 : Math.abs(((latestValue - previousValue) / previousValue) * 100).toFixed(1);

  // Status calculation based on normal range
  let status: "normal" | "abnormal" = "normal";
  if (normalRange) {
    if (latestValue < normalRange[0] || latestValue > normalRange[1]) {
      status = "abnormal";
    }
  }

  return (
    <div className={clsx("p-5 rounded-urvos-xl bg-urvos-surface border border-urvos-border shadow-urvos-soft flex flex-col", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-urvos-text-subtle mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className={clsx(
              "text-3xl font-bold tracking-tight font-mono",
              status === "abnormal" ? "text-urvos-danger" : "text-urvos-ink"
            )}>
              {latestValue}
            </span>
            <span className="text-sm font-medium text-urvos-text-muted">{unit}</span>
          </div>
        </div>
        
        <div className={clsx(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
          trend === 'up' && status === 'normal' ? "bg-urvos-success-bg text-urvos-success" :
          trend === 'up' && status === 'abnormal' ? "bg-urvos-danger-bg text-urvos-danger" :
          trend === 'down' && status === 'normal' ? "bg-urvos-success-bg text-urvos-success" :
          trend === 'down' && status === 'abnormal' ? "bg-urvos-warning-bg text-urvos-warning" :
          "bg-urvos-surface-alt text-urvos-text-subtle"
        )}>
          {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : trend === 'down' ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          {percentChange}%
        </div>
      </div>

      {/* Decorative Chart Area - SVG Placeholder for actual chart integration (e.g., Recharts) */}
      <div className="relative h-24 mt-auto w-full flex items-end justify-between gap-1 group">
        {data.map((point, i) => {
          // Normalize height for the bars between 10% and 100%
          const maxVal = Math.max(...data.map(d => d.value), normalRange ? normalRange[1] : 0);
          const heightPercent = Math.max(10, (point.value / (maxVal || 1)) * 100);
          
          let isAbnormal = false;
          if (normalRange) {
            isAbnormal = point.value < normalRange[0] || point.value > normalRange[1];
          }

          return (
            <div key={i} className="relative flex-1 group/bar h-full flex flex-col justify-end">
              <div 
                className={clsx(
                  "w-full rounded-t-sm transition-all duration-300 group-hover:opacity-40 group-hover/bar:opacity-100",
                  isAbnormal ? "bg-urvos-danger/60 group-hover/bar:bg-urvos-danger" : "bg-urvos-primary/40 group-hover/bar:bg-urvos-primary"
                )}
                style={{ height: `${heightPercent}%` }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-urvos-ink text-urvos-surface px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap shadow-xl">
                  {point.date}: {point.value}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Normal Range Indicator Lines */}
        {normalRange && (
          <div className="absolute inset-0 pointer-events-none border-y border-dashed border-urvos-success/30 z-0" 
               style={{ 
                 top: '10%', // approximate
                 bottom: '10%' // approximate
               }} 
          />
        )}
      </div>
    </div>
  );
}
