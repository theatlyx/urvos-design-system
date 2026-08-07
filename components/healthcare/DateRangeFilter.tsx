import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface DateRangeFilterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: DateRange;
  onChange: (range: DateRange) => void;
  presets?: { label: string; range: () => DateRange }[];
}

export function DateRangeFilter({
  value,
  onChange,
  presets = [
    { label: 'Today', range: () => ({ startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] }) },
    { label: 'Last 7 Days', range: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      return { startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] };
    }},
    { label: 'Last 30 Days', range: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 30);
      return { startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] };
    }},
  ],
  className,
  ...props
}: DateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('relative', className)} {...props}>
      <button
        type="button"
        className="flex items-center px-4 py-2 bg-urvos-surface border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary transition-colors hover:bg-urvos-surface-hover"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="w-4 h-4 text-urvos-text-muted mr-2" />
        <span className="text-sm text-urvos-text font-medium">
          {value.startDate === value.endDate ? value.startDate : `${value.startDate} - ${value.endDate}`}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-urvos-surface border border-urvos-border rounded-lg shadow-xl w-72">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-urvos-text-muted uppercase">Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="px-2 py-1 text-xs bg-urvos-surface-hover border border-urvos-border rounded text-urvos-text hover:bg-urvos-primary hover:text-urvos-text-inverse transition-colors"
                    onClick={() => {
                      onChange(preset.range());
                      setIsOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-urvos-text-muted uppercase">Custom Range</label>
              <div className="flex space-x-2 items-center">
                <input
                  type="date"
                  className="w-full px-2 py-1 text-sm bg-urvos-background border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary"
                  value={value.startDate}
                  onChange={(e) => onChange({ ...value, startDate: e.target.value })}
                />
                <span className="text-urvos-text-muted">-</span>
                <input
                  type="date"
                  className="w-full px-2 py-1 text-sm bg-urvos-background border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary"
                  value={value.endDate}
                  onChange={(e) => onChange({ ...value, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-urvos-border">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-urvos-text-inverse bg-urvos-primary rounded hover:bg-opacity-90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
