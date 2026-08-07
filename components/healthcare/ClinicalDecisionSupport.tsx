import React from 'react';
import { clsx } from 'clsx';
import { Lightbulb, Info, AlertTriangle, ShieldAlert, X } from 'lucide-react';

export interface CDSRecord {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  source?: string;
  actionable?: boolean;
  actionLabel?: string;
}

export interface ClinicalDecisionSupportProps extends React.HTMLAttributes<HTMLDivElement> {
  recommendations: CDSRecord[];
  onAction?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function ClinicalDecisionSupport({ recommendations, onAction, onDismiss, className, ...props }: ClinicalDecisionSupportProps) {
  const getSeverityIcon = (severity: CDSRecord['severity']) => {
    switch (severity) {
      case 'info': return <Info className="w-5 h-5 text-urvos-primary" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-urvos-warning" />;
      case 'critical': return <ShieldAlert className="w-5 h-5 text-urvos-danger" />;
    }
  };

  const getSeverityClasses = (severity: CDSRecord['severity']) => {
    switch (severity) {
      case 'info': return 'bg-urvos-glass border-urvos-primary/20';
      case 'warning': return 'bg-urvos-warning-bg border-urvos-warning/20';
      case 'critical': return 'bg-urvos-danger-bg border-urvos-danger/20';
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <div className={clsx('space-y-3', className)} {...props}>
      <div className="flex items-center text-urvos-text font-semibold mb-4">
        <Lightbulb className="w-5 h-5 mr-2 text-urvos-warning" />
        Clinical Decision Support
      </div>
      
      {recommendations.map((rec) => (
        <div 
          key={rec.id} 
          className={clsx('relative p-4 rounded-urvos-md border flex flex-col sm:flex-row sm:items-start gap-4', getSeverityClasses(rec.severity))}
        >
          {onDismiss && (
            <button 
              onClick={() => onDismiss(rec.id)}
              className="absolute top-2 right-2 text-urvos-text-muted hover:text-urvos-text p-1 rounded-full hover:bg-urvos-surface/50 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <div className="flex-shrink-0 mt-0.5">
            {getSeverityIcon(rec.severity)}
          </div>
          
          <div className="flex-1 pr-6">
            <h4 className="font-semibold text-urvos-text">{rec.title}</h4>
            <p className="text-sm text-urvos-text-muted mt-1">{rec.description}</p>
            {rec.source && (
              <p className="text-xs text-urvos-text-muted mt-2 font-medium">Source: {rec.source}</p>
            )}
          </div>
          
          {rec.actionable && onAction && (
            <div className="mt-3 sm:mt-0 flex-shrink-0">
              <button 
                onClick={() => onAction(rec.id)}
                className="px-4 py-2 text-sm font-medium bg-urvos-surface border border-urvos-border rounded-urvos-md hover:bg-urvos-surface-alt text-urvos-text transition-colors shadow-urvos-soft"
              >
                {rec.actionLabel || 'Take Action'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
