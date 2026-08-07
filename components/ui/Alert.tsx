"use client";
import { type ReactNode, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

/* ── Variants ─────────────────────────────────────────────────── */
const alertVariants = cva("alert", {
  variants: {
    variant: {
      info:    "alert--info",
      success: "alert--success",
      warning: "alert--warning",
      error:   "alert--error",
    },
  },
  defaultVariants: { variant: "info" },
});

const ICONS: Record<string, typeof Info> = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error:   AlertCircle,
};

/* ── Props ────────────────────────────────────────────────────── */
export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children?: ReactNode;
  /** Show a dismiss (×) button */
  dismissible?: boolean;
  /** Override the left icon */
  icon?: ReactNode;
  /** Optional action button/link */
  action?: ReactNode;
  className?: string;
  onDismiss?: () => void;
}

/* ── Component ────────────────────────────────────────────────── */
export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  icon,
  action,
  className,
  onDismiss,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const IconComponent = ICONS[variant ?? "info"];

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div role="alert" className={clsx(alertVariants({ variant }), className)}>
      <span className="alert__icon">
        {icon ?? <IconComponent style={{ width: 20, height: 20 }} />}
      </span>

      <div className="alert__body">
        {title && <div className="alert__title">{title}</div>}
        {children && <div className="alert__desc">{children}</div>}
        {action && <div className="alert__action">{action}</div>}
      </div>

      {dismissible && (
        <button
          className="alert__close"
          aria-label="Dismiss alert"
          onClick={handleDismiss}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>
      )}
    </div>
  );
}

/* ── Convenience exports ──────────────────────────────────────── */
export const AlertInfo    = (p: Omit<AlertProps, "variant">) => <Alert {...p} variant="info" />;
export const AlertSuccess = (p: Omit<AlertProps, "variant">) => <Alert {...p} variant="success" />;
export const AlertWarning = (p: Omit<AlertProps, "variant">) => <Alert {...p} variant="warning" />;
export const AlertError   = (p: Omit<AlertProps, "variant">) => <Alert {...p} variant="error" />;
