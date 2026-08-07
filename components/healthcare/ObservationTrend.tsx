import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { Observation } from "@medplum/fhirtypes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

const observationTrendVariants = cva(
  "w-full rounded-md border border-urvos-border bg-urvos-surface shadow-sm",
  {
    variants: {
      variant: {
        default: "p-4",
        card: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ObservationTrendProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof observationTrendVariants> {
  title: string;
  observations: Observation[];
  yAxisDomain?: [number | "auto", number | "auto"];
  referenceRange?: { low?: number; high?: number };
}

export const ObservationTrend = React.forwardRef<HTMLDivElement, ObservationTrendProps>(
  ({ className, variant, title, observations, yAxisDomain = ["auto", "auto"], referenceRange, ...props }, ref) => {
    
    // Sort and format data for Recharts
    const data = React.useMemo(() => {
      const validObs = observations.filter(o => o.effectiveDateTime && o.valueQuantity?.value !== undefined);
      
      const sorted = [...validObs].sort((a, b) => 
        new Date(a.effectiveDateTime!).getTime() - new Date(b.effectiveDateTime!).getTime()
      );

      return sorted.map(o => {
        const date = new Date(o.effectiveDateTime!);
        return {
          date: date.toLocaleDateString(),
          timestamp: date.getTime(),
          value: o.valueQuantity?.value,
          unit: o.valueQuantity?.unit
        };
      });
    }, [observations]);

    const unit = data.length > 0 ? data[0].unit : "";

    return (
      <div
        ref={ref}
        className={clsx(observationTrendVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-urvos-border pb-3">
          <h3 className="text-lg font-semibold text-urvos-text">{title}</h3>
          <span className="text-sm text-urvos-text-subtle">
            {data.length} records {unit ? `(${unit})` : ""}
          </span>
        </div>

        <div className="mt-4 h-64 w-full">
          {data.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-urvos-border text-urvos-text-subtle">
              No data available for trend
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: 'var(--text-2)', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  domain={yAxisDomain} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'var(--text-2)', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    borderColor: 'var(--border)',
                    borderRadius: '0.375rem',
                    boxShadow: 'var(--shadow-pop)'
                  }}
                  itemStyle={{ color: 'var(--brand-solid)' }}
                />
                
                {referenceRange?.low !== undefined && (
                  <ReferenceLine y={referenceRange.low} stroke="var(--sig-caution)" strokeDasharray="3 3" />
                )}
                {referenceRange?.high !== undefined && (
                  <ReferenceLine y={referenceRange.high} stroke="var(--sig-critical)" strokeDasharray="3 3" />
                )}

                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--brand-solid)" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--brand-solid)', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  }
);

ObservationTrend.displayName = "ObservationTrend";
