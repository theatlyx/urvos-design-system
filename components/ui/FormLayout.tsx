"use client";

import React from "react";
import { clsx } from "clsx";

export interface FormLayoutProps {
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function FormLayout({ columns = 2, children, className }: FormLayoutProps) {
  return (
    <div
      className={clsx(
        "grid gap-4 w-full",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-1 md:grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-3": columns === 3,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
