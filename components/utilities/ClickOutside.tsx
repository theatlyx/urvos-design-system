"use client";

import React, { useEffect, useRef } from "react";

export interface ClickOutsideProps {
  onClickOutside: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ClickOutside({ onClickOutside, children, className }: ClickOutsideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
