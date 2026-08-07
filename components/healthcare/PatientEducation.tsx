import React from 'react';
import { clsx } from 'clsx';
import { BookOpen, ExternalLink, FileText, PlayCircle, Download } from 'lucide-react';

export interface EducationMaterial {
  id: string;
  title: string;
  type: 'article' | 'video' | 'pdf';
  description: string;
  url: string;
  dateAssigned: string;
  status: 'assigned' | 'viewed' | 'completed';
}

export interface PatientEducationProps extends React.HTMLAttributes<HTMLDivElement> {
  materials: EducationMaterial[];
  onAction?: (material: EducationMaterial) => void;
}

export function PatientEducation({ materials, onAction, className, ...props }: PatientEducationProps) {
  const getTypeIcon = (type: EducationMaterial['type']) => {
    switch (type) {
      case 'article': return <FileText className="w-5 h-5" />;
      case 'video': return <PlayCircle className="w-5 h-5" />;
      case 'pdf': return <Download className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: EducationMaterial['status']) => {
    switch (status) {
      case 'assigned': 
        return <span className="px-2 py-0.5 text-xs rounded bg-urvos-warning-bg text-urvos-warning border border-urvos-warning/20 font-medium">Assigned</span>;
      case 'viewed':
        return <span className="px-2 py-0.5 text-xs rounded bg-urvos-glass text-urvos-primary border border-urvos-primary/20 font-medium">Viewed</span>;
      case 'completed':
        return <span className="px-2 py-0.5 text-xs rounded bg-urvos-success-bg text-urvos-success border border-urvos-success/20 font-medium">Completed</span>;
    }
  };

  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft', className)} {...props}>
      <div className="p-4 border-b border-urvos-border bg-urvos-surface/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-urvos-text flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-urvos-primary" />
          Patient Education Materials
        </h3>
        <span className="text-sm text-urvos-text-muted bg-urvos-background px-2 py-1 rounded border border-urvos-border">
          {materials.length} Items
        </span>
      </div>
      
      <div className="divide-y divide-urvos-border">
        {materials.length === 0 ? (
          <div className="p-6 text-center text-urvos-text-muted">
            <p>No education materials assigned.</p>
          </div>
        ) : (
          materials.map((item) => (
            <div key={item.id} className="p-4 hover:bg-urvos-surface-alt transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start flex-1">
                <div className="w-10 h-10 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary flex-shrink-0 mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-urvos-text">{item.title}</h4>
                  <p className="text-sm text-urvos-text-muted mt-1">{item.description}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    {getStatusBadge(item.status)}
                    <span className="text-xs text-urvos-text-muted">Assigned: {new Date(item.dateAssigned).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 sm:self-center">
                <button
                  onClick={() => onAction && onAction(item)}
                  className="w-full sm:w-auto px-4 py-2 flex items-center justify-center text-sm font-medium text-urvos-primary bg-urvos-surface border border-urvos-border rounded hover:bg-urvos-surface-alt transition-colors shadow-urvos-soft"
                >
                  {item.type === 'video' ? 'Watch' : item.type === 'pdf' ? 'Download' : 'Read'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
