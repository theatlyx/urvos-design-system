"use client";

import { ReactNode, CSSProperties } from "react";
import Link from "next/link";

type BentoVariant = "surface" | "brand" | "cyan" | "orange" | "purple" | "soft-mint" | "soft-lavender" | "soft-peach" | "soft-sky" | "soft-rose" | "soft-surface" | "glass";
type BentoSize    = "sm" | "md" | "lg";
type BentoSpan    = 1 | 2 | 3 | 4;

interface BentoCardProps {
  children:     ReactNode;
  variant?:     BentoVariant;
  size?:        BentoSize;
  span?:        BentoSpan;
  rowSpan?:     1 | 2;
  href?:        string;
  external?:    boolean;
  onClick?:     () => void;
  hover?:       boolean;
  className?:   string;
  noPadding?:   boolean;
  style?:       CSSProperties;
}

const PADDING: Record<BentoSize, string> = {
  sm: "var(--compact-padding)",
  md: "var(--card-padding)",
  lg: "var(--card-padding)",
};

export function BentoCard({
  children,
  variant = "surface",
  size = "lg",
  span,
  rowSpan,
  href,
  external = false,
  onClick,
  hover = false,
  className = "",
  noPadding = false,
  style,
}: BentoCardProps) {
  const classes = ["bento"];
  if (variant !== "surface") classes.push(`bento-${variant}`);
  if (onClick || href) classes.push("bento-clickable");
  if (hover && !onClick && !href) classes.push("bento-clickable");
  if (className) classes.push(className);

  const computedStyle: CSSProperties = {
    ...(noPadding ? {} : { padding: PADDING[size] }),
    ...(span ? { gridColumn: `span ${span}` } : {}),
    ...(rowSpan === 2 ? { gridRow: "span 2" } : {}),
    ...(onClick || href ? { cursor: "pointer" } : {}),
    ...style,
  };

  const inner = (
    <>
      {variant === "brand" && <div className="bento-glow" />}
      <div className="bento-content">{children}</div>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes.join(" ")} style={{ ...computedStyle, textDecoration: "none" }}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes.join(" ")} style={{ ...computedStyle, textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={classes.join(" ")}
        style={computedStyle}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className={classes.join(" ")} style={computedStyle}>
      {inner}
    </div>
  );
}
