import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface ChartAreaProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  height?: number;
  showLegend?: boolean;
  showGridLines?: boolean;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const ChartArea: React.FC<ChartAreaProps> = ({
  data,
  categories,
  index,
  colors = DEFAULT_COLORS,
  valueFormatter = (value: number) => value.toString(),
  height = 300,
  showLegend = true,
  showGridLines = true,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGridLines && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          )}
          <XAxis
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--text-3)' }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--text-3)' }}
            tickFormatter={valueFormatter}
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }}
            itemStyle={{ color: 'var(--text-1)', fontSize: '14px' }}
            labelStyle={{ color: 'var(--text-2)', marginBottom: '4px', fontSize: '12px' }}
            formatter={(value: any) => [valueFormatter(Number(value)), undefined]}
          />
          {showLegend && (
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: 'var(--text-2)' }}
            />
          )}
          {categories.map((category, idx) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[idx % colors.length]}
              fill={colors[idx % colors.length]}
              fillOpacity={0.2}
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
