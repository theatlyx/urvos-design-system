"use client";
import { clsx } from "clsx";

export type ProgressColor = "default" | "success" | "warning" | "danger" | "gradient";
export type ProgressSize  = "xs" | "sm" | "md" | "lg";

export interface ProgressProps {
  /** 0–100 */
  value: number;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const colorMap: Record<ProgressColor, string> = {
  default:  "",
  success:  "progress__bar--success",
  warning:  "progress__bar--warning",
  danger:   "progress__bar--danger",
  gradient: "progress__bar--gradient",
};

export function Progress({
  value,
  size = "md",
  color = "default",
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={clsx("progress", `progress--${size}`, className)}>
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${clampedValue}%`}
        className={clsx("progress__bar", colorMap[color])}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

/* ── Labelled progress (with row above showing label + value) ── */
export interface LabelledProgressProps extends ProgressProps {
  label: string;
}

export function LabelledProgress({ label, showValue = true, ...rest }: LabelledProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, rest.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="label">{label}</span>
        {showValue && <span className="caption">{clampedValue}%</span>}
      </div>
      <Progress {...rest} label={label} />
    </div>
  );
}
