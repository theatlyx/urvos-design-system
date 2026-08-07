import React from 'react';
import { ToothData } from '../ToothChart';

interface HistoryTabProps {
  activeTooth: ToothData;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ activeTooth }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-urvos-text">Clinical Timeline</h3>
      {activeTooth.history && activeTooth.history.length > 0 ? (
        <div className="relative border-l border-gray-200 ml-3 space-y-6">
          {[...activeTooth.history].reverse().map((event, idx) => (
            <div key={event.id || idx} className="pl-6 relative">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1.5 border-2 border-white" />
              <p className="text-sm font-medium text-urvos-text">{event.action}</p>
              <div className="flex items-center gap-2 text-xs text-urvos-text-muted mt-1">
                <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                <span>•</span>
                <span>{event.user}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-urvos-text-muted italic">No history available for this tooth.</p>
      )}
    </div>
  );
};
