"use client";

import React, { useRef, useState, useMemo } from "react";
import { clsx } from "clsx";

export interface VirtualColumn<T> {
  key: string;
  header: string;
  width: number;
  accessor?: (row: T) => React.ReactNode;
}

export interface VirtualizedTableProps<T> {
  data: T[];
  columns: VirtualColumn<T>[];
  rowHeight?: number;
  containerHeight?: number;
  className?: string;
}

export function VirtualizedTable<T extends { id: string | number }>({
  data,
  columns,
  rowHeight = 44,
  containerHeight = 400,
  className,
}: VirtualizedTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = data.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const endIndex = Math.min(
    data.length - 1,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + 2
  );

  const visibleRows = useMemo(() => {
    return data.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      top: (startIndex + index) * rowHeight,
    }));
  }, [data, startIndex, endIndex, rowHeight]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className={clsx("w-full border border-urvos-border rounded-lg overflow-hidden shadow-sm bg-urvos-surface", className)}>
      {/* Header */}
      <div className="flex bg-urvos-surface-muted border-b border-urvos-border font-semibold text-xs text-urvos-text-subtle uppercase px-4 py-3">
        {columns.map((col) => (
          <div key={col.key} style={{ width: col.width }} className="flex-shrink-0">
            {col.header}
          </div>
        ))}
      </div>

      {/* Scroll Viewport */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: containerHeight }}
        className="relative overflow-y-auto"
      >
        <div style={{ height: totalHeight, width: "100%", position: "relative" }}>
          {visibleRows.map(({ item, top }) => (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top,
                left: 0,
                right: 0,
                height: rowHeight,
              }}
              className="flex items-center px-4 border-b border-urvos-border text-sm text-urvos-text hover:bg-urvos-surface-muted/50 transition-colors"
            >
              {columns.map((col) => (
                <div key={col.key} style={{ width: col.width }} className="flex-shrink-0 truncate pr-2">
                  {col.accessor ? col.accessor(item) : (item as any)[col.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
