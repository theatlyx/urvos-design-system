import React, { useState } from 'react';
import { clsx } from 'clsx';
import { User, Calendar, Stethoscope, Clock, ShieldAlert } from 'lucide-react';

export interface Encounter {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  provider: string;
  chair: string;
  chiefComplaint?: string;
  status: 'draft' | 'signed';
}

interface VisitWorkspaceProps {
  encounter: Encounter;
  onStatusChange?: (status: 'draft' | 'signed') => void;
  children: React.ReactNode;
  className?: string;
}

export const VisitWorkspace = ({ encounter, onStatusChange, children, className }: VisitWorkspaceProps) => {
  return (
    <div className={clsx("flex flex-col h-full bg-urvos-surface", className)}>
      {/* HEADER */}
      <div className="flex-none bg-white border-b border-urvos-border p-4 shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-urvos-text leading-tight">{encounter.patientName}</h1>
              <p className="text-xs text-urvos-text-muted">ID: {encounter.patientId}</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-urvos-border"></div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-urvos-text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(encounter.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-urvos-text-muted mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(encounter.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-urvos-border"></div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs text-urvos-text-muted">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{encounter.provider}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-urvos-text-muted mt-0.5">
              <span className="font-semibold text-urvos-text">Chair:</span> {encounter.chair}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-urvos-text-muted">Status:</span>
            <div className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-semibold border flex items-center gap-1.5",
              encounter.status === 'draft' ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-green-50 border-green-200 text-green-700"
            )}>
              {encounter.status === 'draft' ? <ShieldAlert className="w-4 h-4" /> : null}
              {encounter.status.toUpperCase()}
            </div>
          </div>

          {encounter.status === 'draft' && onStatusChange && (
            <button 
              onClick={() => onStatusChange('signed')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Sign Encounter
            </button>
          )}
        </div>
      </div>

      {/* CHIEF COMPLAINT BANNER */}
      {encounter.chiefComplaint && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3 px-6 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-yellow-600 flex-none mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-0.5">Chief Complaint</h4>
            <p className="text-sm text-yellow-900">{encounter.chiefComplaint}</p>
          </div>
        </div>
      )}

      {/* CHARTING AREA */}
      <div className="flex-1 overflow-hidden p-4">
        {children}
      </div>
    </div>
  );
};
