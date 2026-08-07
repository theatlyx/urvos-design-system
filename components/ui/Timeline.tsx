"use client";
import { type ReactNode } from "react";
import { clsx } from "clsx";
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export type TimelineVariant = "info" | "success" | "warning" | "error";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  variant?: TimelineVariant;
  badge?: ReactNode;
  icon?: ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const DEFAULT_ICONS: Record<TimelineVariant, typeof Info> = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error:   AlertCircle,
};

const ICON_COLORS: Record<TimelineVariant, string> = {
  info:    "var(--sig-info)",
  success: "var(--sig-success)",
  warning: "var(--sig-caution)",
  error:   "var(--sig-critical)",
};

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={clsx("timeline", className)}>
      {events.map((event) => {
        const variant = event.variant ?? "info";
        const IconComponent = DEFAULT_ICONS[variant];
        const iconColor = ICON_COLORS[variant];

        return (
          <div key={event.id} className="timeline__item">
            <div className="timeline__aside">
              <div className={clsx("timeline__dot", `timeline__dot--${variant}`)}>
                {event.icon ?? (
                  <IconComponent
                    style={{ width: 16, height: 16, color: iconColor }}
                  />
                )}
              </div>
              <div className="timeline__connector" />
            </div>

            <div className="timeline__content">
              <div className="timeline__date">{event.date}</div>
              <div className="timeline__title">{event.title}</div>
              {event.description && (
                <div className="timeline__desc">{event.description}</div>
              )}
              {event.badge && <div className="timeline__badge">{event.badge}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
