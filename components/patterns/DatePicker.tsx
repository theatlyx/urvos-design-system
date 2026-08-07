"use client";

import { useState, useRef, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";

const datePickerVariants = cva("datepicker-btn", {
  variants: {
    size: {
      sm: "datepicker-btn--sm",
      md: "datepicker-btn--md",
      lg: "datepicker-btn--lg",
    },
    error: {
      true: "datepicker-btn--error",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface DatePickerProps extends VariantProps<typeof datePickerVariants> {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  size,
  error,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 });

  const toggleOpen = () => {
    if (disabled) return;
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".datepicker-dropdown")
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="datepicker-wrapper" ref={containerRef}>
      <button
        type="button"
        className={datePickerVariants({ size, error })}
        onClick={toggleOpen}
        disabled={disabled}
      >
        <CalendarIcon size={16} className="datepicker-btn__icon" />
        <span className={`datepicker-btn__label ${!value ? "datepicker-btn__label--muted" : ""}`}>
          {value ? format(value, "PPP") : placeholder}
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="datepicker-dropdown"
            style={{
              position: "absolute",
              top: dropdownCoords.top,
              left: dropdownCoords.left,
              zIndex: 9999,
            }}
          >
            <CalendarGrid
              value={value}
              onSelect={(d) => {
                onChange?.(d);
                setOpen(false);
              }}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function buildMonthGrid(month: Date): Date[] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });
  const days: Date[] = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

function CalendarGrid({
  value,
  onSelect,
}: {
  value?: Date;
  onSelect: (d: Date) => void;
}) {
  const [month, setMonth] = useState(value ?? new Date());
  const days = buildMonthGrid(month);

  return (
    <div className="space-y-4">
      <div className="flex justify-center pt-1 relative items-center">
        <button
          type="button"
          className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt"
          onClick={() => setMonth((m) => addMonths(m, -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
        <button
          type="button"
          className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt"
          onClick={() => setMonth((m) => addMonths(m, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <table className="w-full border-collapse space-y-1">
        <thead>
          <tr className="flex w-full mt-2">
            {dayNames.map((n) => (
              <th key={n} className="rdp-head_cell">
                {n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: days.length / 7 }, (_, week) => (
            <tr key={week} className="rdp-row">
              {days.slice(week * 7, week * 7 + 7).map((day) => {
                const selected = !!value && isSameDay(day, value);
                const outside = !isSameMonth(day, month);
                return (
                  <td key={day.toISOString()} className="rdp-cell">
                    <button
                      type="button"
                      onClick={() => onSelect(day)}
                      className={[
                        "rdp-day",
                        selected ? "rdp-day_selected btn--primary" : "",
                        isToday(day) && !selected ? "rdp-day_today" : "",
                        outside ? "rdp-day_outside" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {format(day, "d")}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
