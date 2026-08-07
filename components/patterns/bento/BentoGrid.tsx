"use client";

import { ReactNode, CSSProperties } from "react";

type BentoGridCols = 1 | 2 | 3 | 4 | "auto";
type BentoGridGap  = "tight" | "default" | "loose";

interface BentoGridProps {
  children:     ReactNode;
  cols?:        BentoGridCols;
  gap?:         BentoGridGap;
  className?:   string;
  style?:       CSSProperties;
}

const GAP: Record<BentoGridGap, string> = {
  tight:   "var(--form-gap)",
  default: "var(--card-gap)",
  loose:   "var(--section-gap)",
};

export function BentoGrid({
  children,
  cols = "auto",
  gap = "default",
  className = "",
  style,
}: BentoGridProps) {
  const classes = ["bento-grid"];
  if (cols !== "auto") classes.push(`bento-grid-${cols}`);
  if (gap === "tight") classes.push("bento-grid-tight");
  if (gap === "loose") classes.push("bento-grid-loose");
  if (className) classes.push(className);

  const computedStyle: CSSProperties = {
    ...(cols === "auto" ? { gap: GAP[gap] } : {}),
    ...style,
  };

  return (
    <div className={classes.join(" ")} style={computedStyle}>
      {children}
    </div>
  );
}
