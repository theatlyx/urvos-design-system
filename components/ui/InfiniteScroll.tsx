"use client";

import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { Spinner } from "./Spinner";

export interface InfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function InfiniteScroll({
  hasMore,
  loadMore,
  isLoading,
  children,
  className,
}: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className={clsx("w-full space-y-3", className)}>
      {children}
      <div ref={observerRef} className="py-4 flex justify-center items-center min-h-[40px]">
        {isLoading && <Spinner size="md" />}
        {!hasMore && !isLoading && (
          <span className="text-xs text-urvos-text-subtle">No more items to load</span>
        )}
      </div>
    </div>
  );
}
