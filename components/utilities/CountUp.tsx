"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter — ease-out cubic from 0 → target.
 * Handles string values (returns as-is) and numeric values (animates).
 */
export function CountUp({
  target,
  duration = 400,
  prefix = "",
  suffix = "",
}: {
  target: string | number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState<string | number>(
    typeof target === "number" ? 0 : target
  );
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (typeof target !== "number" || target === 0) {
      setDisplay(target);
      return;
    }

    const numTarget = target;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numTarget * eased);
      setDisplay(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current !== null) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  if (typeof display === "string") return <>{prefix}{display}{suffix}</>;
  return <>{prefix}{display.toLocaleString("en-IN")}{suffix}</>;
}