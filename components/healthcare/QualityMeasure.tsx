import React from 'react';
import { clsx } from 'clsx';
import { Award, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export interface QualityMeasureData {
  id: string;
  title: string;
  description: string;
  score: number;
  target: number;
  status: 'met' | 'not-met' | 'pending';
  lastUpdated: string;
}

export interface QualityMeasureProps extends React.HTMLAttributes<HTMLDivElement> {
  measure: QualityMeasureData;
}

export function QualityMeasure({ measure, className, ...props }: QualityMeasureProps) {
  const percentage = Math.min(100, Math.max(0, (measure.score / measure.target) * 100));
  
  const getStatusColor = (status: QualityMeasureData['status']) => {
    switch (status) {
      case 'met': return 'text-urvos-success';
      case 'not-met': return 'text-urvos-destructive';
      case 'pending': return 'text-urvos-warning';
    }
  };

  const getStatusBg = (status: QualityMeasureData['status']) => {
    switch (status) {
      case 'met': return 'bg-urvos-success';
      case 'not-met': return 'bg-urvos-destructive';
      case 'pending': return 'bg-urvos-warning';
    }
  };

  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm', className)} {...props}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center mr-3">
            <Award className="w-5 h-5 text-urvos-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-urvos-text">{measure.title}</h3>
            <p className="text-xs text-urvos-text-muted mt-0.5">{measure.description}</p>
          </div>
        </div>
        <div className={clsx('flex items-center text-sm font-medium', getStatusColor(measure.status))}>
          {measure.status === 'met' && <CheckCircle className="w-4 h-4 mr-1" />}
          {measure.status === 'not-met' && <AlertCircle className="w-4 h-4 mr-1" />}
          {measure.status === 'pending' && <TrendingUp className="w-4 h-4 mr-1" />}
          <span className="capitalize">{measure.status.replace('-', ' ')}</span>
        </div>
      </div>
      
      <div className="space-y-2 mt-6">
        <div className="flex justify-between text-sm">
          <span className="text-urvos-text font-medium">Score: {measure.score}</span>
          <span className="text-urvos-text-muted flex items-center"><Target className="w-3 h-3 mr-1" /> Target: {measure.target}</span>
        </div>
        
        <div className="w-full bg-urvos-background rounded-full h-2.5 border border-urvos-border overflow-hidden">
          <div 
            className={clsx('h-2.5 rounded-full transition-all duration-500 ease-out', getStatusBg(measure.status))} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="text-right text-xs text-urvos-text-muted pt-1">
          Last updated: {new Date(measure.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
