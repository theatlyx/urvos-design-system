import React from 'react';
import { clsx } from 'clsx';
import { Clock, Activity, FileText, Pill, Syringe, Calendar } from 'lucide-react';

export interface TimelineEvent {
  id: string;
  type: 'encounter' | 'lab' | 'medication' | 'immunization' | 'note';
  title: string;
  date: string;
  description?: string;
  performer?: string;
}

export interface PatientTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[];
}

export function PatientTimeline({ events, className, ...props }: PatientTimelineProps) {
  // Sort events by date descending
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'encounter': return <Calendar className="w-4 h-4" />;
      case 'lab': return <Activity className="w-4 h-4" />;
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'immunization': return <Syringe className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'encounter': return 'bg-urvos-primary text-urvos-text-inverse border-urvos-primary';
      case 'lab': return 'bg-urvos-info text-urvos-text-inverse border-urvos-info';
      case 'medication': return 'bg-urvos-success text-urvos-text-inverse border-urvos-success';
      case 'immunization': return 'bg-urvos-caution text-urvos-text-inverse border-urvos-caution';
      case 'note': return 'bg-urvos-neutral text-urvos-text-inverse border-urvos-neutral';
    }
  };

  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-urvos-lg p-5 shadow-urvos-soft', className)} {...props}>
      <h3 className="text-lg font-semibold text-urvos-text flex items-center mb-6">
        <Clock className="w-5 h-5 mr-2 text-urvos-primary" />
        Clinical Timeline
      </h3>
      
      <div className="relative border-l-2 border-urvos-border ml-3 space-y-8">
        {sortedEvents.length === 0 ? (
          <p className="text-sm text-urvos-text-muted pl-4">No timeline events found.</p>
        ) : (
          sortedEvents.map((event) => (
            <div key={event.id} className="relative pl-8">
              <div 
                className={clsx(
                  'absolute -left-[17px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm',
                  getEventColor(event.type)
                )}
              >
                {getEventIcon(event.type)}
              </div>
              
              <div className="bg-urvos-background border border-urvos-border rounded-urvos-md p-4 shadow-urvos-soft hover:shadow-urvos-hover transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="font-semibold text-urvos-text">{event.title}</h4>
                  <span className="text-xs font-medium text-urvos-text-muted bg-urvos-surface px-2 py-1 rounded mt-1 sm:mt-0 border border-urvos-border">
                    {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {event.description && (
                  <p className="text-sm text-urvos-text-muted mt-1">{event.description}</p>
                )}
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-urvos-border/50 text-xs text-urvos-text-muted">
                  <span className="capitalize px-2 py-0.5 rounded bg-urvos-surface-hover border border-urvos-border">
                    {event.type}
                  </span>
                  {event.performer && (
                    <span className="font-medium">By: {event.performer}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
