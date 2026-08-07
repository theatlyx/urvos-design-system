import React from "react";
import { clsx } from "clsx";
import { Activity, Stethoscope, Pill, FileText, Calendar } from "lucide-react";

export type TimelineEventType = "visit" | "prescription" | "lab" | "procedure" | "note";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  date: string;
  title: string;
  provider: string;
  description?: string;
  status?: "completed" | "pending" | "scheduled";
}

interface PatientTimelineViewProps {
  events: TimelineEvent[];
  className?: string;
}

const getEventIcon = (type: TimelineEventType) => {
  switch (type) {
    case "visit":
      return <Calendar className="w-4 h-4" />;
    case "prescription":
      return <Pill className="w-4 h-4" />;
    case "lab":
      return <Activity className="w-4 h-4" />;
    case "procedure":
      return <Stethoscope className="w-4 h-4" />;
    case "note":
      return <FileText className="w-4 h-4" />;
  }
};

const getEventColor = (type: TimelineEventType) => {
  switch (type) {
    case "visit":
      return "bg-urvos-glass text-urvos-primary border-urvos-primary/20";
    case "prescription":
      return "bg-urvos-warning-bg text-urvos-warning border-urvos-warning/20";
    case "lab":
      return "bg-urvos-success-bg text-urvos-success border-urvos-success/20";
    case "procedure":
      return "bg-urvos-danger-bg text-urvos-danger border-urvos-danger/20";
    case "note":
      return "bg-urvos-surface-alt text-urvos-text-subtle border-urvos-border";
  }
};

export function PatientTimelineView({ events, className }: PatientTimelineViewProps) {
  // Sort events by date descending
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={clsx("relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-urvos-border", className)}>
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Timeline Node */}
          <div className={clsx(
            "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-urvos-surface shadow-urvos-soft z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2",
            getEventColor(event.type)
          )}>
            {getEventIcon(event.type)}
          </div>
          
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-urvos-lg border border-urvos-border bg-urvos-surface shadow-urvos-soft hover:shadow-urvos-hover transition-all duration-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-medium text-urvos-primary">{event.date}</span>
              {event.status && (
                <span className={clsx(
                  "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
                  event.status === "completed" ? "bg-urvos-success-bg text-urvos-success" :
                  event.status === "scheduled" ? "bg-urvos-info-bg text-urvos-info" :
                  "bg-urvos-warning-bg text-urvos-warning"
                )}>
                  {event.status}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-urvos-ink text-sm mb-1">{event.title}</h3>
            <p className="text-xs text-urvos-text-subtle font-medium mb-2">{event.provider}</p>
            {event.description && (
              <p className="text-sm text-urvos-text-muted mt-2 line-clamp-2">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
