"use client";

import React from "react";
import { clsx } from "clsx";

export interface MasonryProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode[];
  className?: string;
}

export function Masonry({ columns = 3, gap = 16, children, className }: MasonryProps) {
  const columnCols: React.ReactNode[][] = Array.from({ length: columns }, () => []);

  children.forEach((child, index) => {
    columnCols[index % columns].push(child);
  });

  return (
    <div className={clsx("flex w-full", className)} style={{ gap: `${gap}px` }}>
      {columnCols.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col flex-1" style={{ gap: `${gap}px` }}>
          {colItems.map((item, itemIdx) => (
            <React.Fragment key={itemIdx}>{item}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
