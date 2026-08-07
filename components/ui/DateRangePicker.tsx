"use client";

import * as React from "react";
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
  isBefore,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (date?: DateRange) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
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

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  className,
  error,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value?.from ?? new Date());
  const days = buildMonthGrid(month);

  const handleSelect = (day: Date) => {
    if (!value?.from || (value.from && value.to)) {
      onChange?.({ from: day, to: undefined });
      return;
    }
    if (isBefore(day, value.from)) {
      onChange?.({ from: day, to: value.from });
    } else {
      onChange?.({ from: value.from, to: day });
    }
    setOpen(false);
  };

  const rangeClass = (day: Date) => {
    if (!value?.from) return null;
    const inRange =
      !!value.to && !isBefore(day, value.from) && !isBefore(value.to, day);
    return inRange ? "bg-urvos-primary/10 text-urvos-ink" : null;
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={clsx(
            "combobox justify-start text-left font-normal",
            !value && "text-urvos-ink-light",
            error && "combobox--error",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd, y")} - {format(value.to, "LLL dd, y")}
              </>
            ) : (
              format(value.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 rounded-urvos-md border border-urvos-border bg-urvos-surface p-3 shadow-urvos-hover animate-in fade-in-0 zoom-in-95"
        >
          <div className="space-y-4">
            <div className="flex justify-center pt-1 relative items-center">
              <button
                type="button"
                onClick={() => setMonth((m) => addMonths(m, -1))}
                className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
              <button
                type="button"
                onClick={() => setMonth((m) => addMonths(m, 1))}
                className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <table className="w-full border-collapse space-y-1">
              <thead>
                <tr className="flex w-full mt-2">
                  {dayNames.map((n) => (
                    <th
                      key={n}
                      className="text-urvos-ink-light rounded-md w-9 font-normal text-[0.8rem]"
                    >
                      {n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: days.length / 7 }, (_, week) => (
                  <tr key={week} className="flex w-full mt-2">
                    {days.slice(week * 7, week * 7 + 7).map((day) => {
                      const outside = !isSameMonth(day, month);
                      const selected = !!value?.from && !!value.to && !isBefore(day, value.from) && !isBefore(value.to, day);
                      const isFrom = !!value?.from && isSameDay(day, value.from);
                      const isTo = !!value?.to && isSameDay(day, value.to);
                      return (
                        <td key={day.toISOString()} className="h-9 w-9 text-center text-sm p-0 relative">
                          <button
                            type="button"
                            onClick={() => handleSelect(day)}
                            className={clsx(
                              "h-9 w-9 p-0 font-normal rounded-urvos-sm",
                              rangeClass(day),
                              (isFrom || isTo) &&
                                "bg-urvos-primary text-white hover:bg-urvos-primary hover:text-white",
                              !outside && !selected && !isFrom && !isTo && "hover:bg-urvos-surface-alt",
                              outside && "text-urvos-ink-light opacity-50"
                            )}
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
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
