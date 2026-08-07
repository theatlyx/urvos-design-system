"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function Carousel({ children, autoPlay = false, interval = 3000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = children.length;

  const prev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, total]);

  if (total === 0) return null;

  return (
    <div className={clsx("relative overflow-hidden rounded-xl border border-urvos-border bg-urvos-surface shadow-sm", className)}>
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {children.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  idx === currentIndex ? "w-6 bg-urvos-primary" : "w-2 bg-urvos-border"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
