"use client";
import { type ReactNode } from "react";
import { clsx } from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type DeltaDir = "up" | "down" | "flat";

export interface StatCardProps {
  title: string;
  value: string | number;
  delta?: string | number;
  deltaDir?: DeltaDir;
  deltaLabel?: string;
  icon?: ReactNode;
  iconBg?: string;
  footer?: string;
  /** Optional sparkline / mini chart content */
  sparkline?: ReactNode;
  className?: string;
}

const DELTA_ICONS: Record<DeltaDir, typeof TrendingUp> = {
  up:   TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

export function StatCard({
  title,
  value,
  delta,
  deltaDir = "up",
  deltaLabel,
  icon,
  iconBg,
  footer,
  sparkline,
  className,
}: StatCardProps) {
  const DeltaIcon = DELTA_ICONS[deltaDir];

  return (
    <div className={clsx("stat-card", className)}>
      <div className="stat-card__header">
        <span className="stat-card__title">{title}</span>
        {icon && (
          <span className="stat-card__icon" style={{ backgroundColor: iconBg }}>
            {icon}
          </span>
        )}
      </div>

      <div className="stat-card__value">{value}</div>

      {(delta !== undefined || deltaLabel) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className={clsx("stat-card__delta", `stat-card__delta--${deltaDir}`)}>
            <DeltaIcon style={{ width: 13, height: 13 }} />
            {delta}
          </span>
          {deltaLabel && <span className="stat-card__footer">{deltaLabel}</span>}
        </div>
      )}

      {footer && !deltaLabel && <div className="stat-card__footer">{footer}</div>}

      {sparkline && <div className="stat-card__sparkline">{sparkline}</div>}
    </div>
  );
}
