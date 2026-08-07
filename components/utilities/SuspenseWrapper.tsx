"use client";

import React, { Suspense, ReactNode } from "react";
import { Skeleton } from "../ui/Skeleton";

export interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseWrapper({
  children,
  fallback = (
    <div className="w-full p-4 space-y-3">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-20 w-full" />
    </div>
  ),
}: SuspenseWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
