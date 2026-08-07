import React from 'react';
import { clsx } from 'clsx';
import { Activity, AlertTriangle, CheckCircle, FileText, Calendar as CalendarIcon, User } from 'lucide-react';

// --- LabResultViewer ---

export interface LabResult {
  id: string;
  testName: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
  category?: string;
}

export interface LabResultViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  results: LabResult[];
  patientName?: string;
}

export function LabResultViewer({ results, patientName, className, ...props }: LabResultViewerProps) {
  const getStatusIcon = (status: LabResult['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-urvos-success" />;
      case 'abnormal':
        return <AlertTriangle className="w-5 h-5 text-urvos-warning" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-urvos-destructive animate-pulse" />;
      default:
        return <Activity className="w-5 h-5 text-urvos-text-muted" />;
    }
  };

  const getStatusClass = (status: LabResult['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-urvos-success/10 text-urvos-success border-urvos-success/20';
      case 'abnormal':
        return 'bg-urvos-warning/10 text-urvos-warning border-urvos-warning/20';
      case 'critical':
        return 'bg-urvos-destructive/10 text-urvos-destructive border-urvos-destructive/20 font-bold';
      default:
        return 'bg-urvos-surface text-urvos-text border-urvos-border';
    }
  };

  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-xl shadow-sm overflow-hidden', className)} {...props}>
      <div className="p-4 border-b border-urvos-border bg-urvos-surface/50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-urvos-text flex items-center">
            <Activity className="w-5 h-5 mr-2 text-urvos-primary" />
            Lab Results
          </h3>
          {patientName && <p className="text-sm text-urvos-text-muted mt-1">Patient: {patientName}</p>}
        </div>
        <div className="flex space-x-2 text-sm">
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-urvos-success mr-1"></span> Normal</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-urvos-warning mr-1"></span> Abnormal</span>
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-urvos-destructive mr-1"></span> Critical</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-urvos-text">
          <thead className="bg-urvos-background uppercase text-xs font-semibold text-urvos-text-muted border-b border-urvos-border">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Reference Range</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-urvos-border">
            {results.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-urvos-text-muted">
                  No lab results available.
                </td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result.id} className="hover:bg-urvos-surface-hover transition-colors">
                  <td className="px-4 py-3 font-medium">{result.testName}</td>
                  <td className="px-4 py-3">
                    <span className={clsx('px-2 py-1 rounded border', getStatusClass(result.status))}>
                      {result.value} {result.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-urvos-text-muted">{result.referenceRange}</td>
                  <td className="px-4 py-3 text-urvos-text-muted">{new Date(result.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 flex justify-center">
                    {getStatusIcon(result.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- CarePlanViewer ---

export interface CarePlanGoal {
  id: string;
  description: string;
  status: 'in-progress' | 'achieved' | 'not-achieved';
  targetDate?: string;
}

export interface CarePlanActivity {
  id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  performer?: string;
}

export interface CarePlan {
  id: string;
  title: string;
  period: { start: string; end?: string };
  intent: string;
  goals: CarePlanGoal[];
  activities: CarePlanActivity[];
}

export interface CarePlanViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: CarePlan;
}

export function CarePlanViewer({ plan, className, ...props }: CarePlanViewerProps) {
  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-6', className)} {...props}>
      {/* Header */}
      <div className="flex justify-between items-start border-b border-urvos-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-urvos-text flex items-center">
            <FileText className="w-6 h-6 mr-2 text-urvos-primary" />
            {plan.title}
          </h2>
          <p className="text-sm text-urvos-text-muted mt-1 capitalize">Intent: {plan.intent}</p>
        </div>
        <div className="text-sm text-urvos-text-muted bg-urvos-background px-3 py-1 rounded-full border border-urvos-border flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1" />
          {new Date(plan.period.start).toLocaleDateString()} {plan.period.end ? `- ${new Date(plan.period.end).toLocaleDateString()}` : '(Ongoing)'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals */}
        <div className="space-y-3">
          <h3 className="font-semibold text-urvos-text border-b border-urvos-border pb-2">Goals</h3>
          <ul className="space-y-3">
            {plan.goals.length === 0 ? (
              <p className="text-sm text-urvos-text-muted">No goals specified.</p>
            ) : (
              plan.goals.map((goal) => (
                <li key={goal.id} className="flex items-start bg-urvos-background p-3 rounded-lg border border-urvos-border">
                  {goal.status === 'achieved' ? (
                    <CheckCircle className="w-5 h-5 text-urvos-success flex-shrink-0 mt-0.5" />
                  ) : goal.status === 'in-progress' ? (
                    <Activity className="w-5 h-5 text-urvos-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-urvos-warning flex-shrink-0 mt-0.5" />
                  )}
                  <div className="ml-3">
                    <p className="text-sm text-urvos-text font-medium">{goal.description}</p>
                    <div className="flex space-x-3 mt-1 text-xs text-urvos-text-muted">
                      <span className="capitalize">Status: {goal.status.replace('-', ' ')}</span>
                      {goal.targetDate && <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Activities */}
        <div className="space-y-3">
          <h3 className="font-semibold text-urvos-text border-b border-urvos-border pb-2">Activities & Interventions</h3>
          <ul className="space-y-3">
            {plan.activities.length === 0 ? (
              <p className="text-sm text-urvos-text-muted">No activities specified.</p>
            ) : (
              plan.activities.map((activity) => (
                <li key={activity.id} className="bg-urvos-background p-3 rounded-lg border border-urvos-border border-l-4" 
                    style={{ borderLeftColor: activity.status === 'completed' ? '#10b981' : activity.status === 'in-progress' ? '#3b82f6' : '#9ca3af' }}>
                  <p className="text-sm font-semibold text-urvos-text">{activity.title}</p>
                  {activity.description && <p className="text-xs text-urvos-text-muted mt-1">{activity.description}</p>}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-urvos-border/50 text-xs text-urvos-text-muted">
                    <span className="capitalize font-medium">Status: {activity.status.replace('-', ' ')}</span>
                    {activity.performer && (
                      <span className="flex items-center bg-urvos-surface px-2 py-0.5 rounded border border-urvos-border">
                        <User className="w-3 h-3 mr-1" /> {activity.performer}
                      </span>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
