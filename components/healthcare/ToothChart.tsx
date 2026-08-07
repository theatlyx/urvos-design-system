"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { clsx } from 'clsx';
import { CustomOdontogram } from './ToothChartEngine/CustomOdontogram';
import { ToothSurfaceSelector } from './ToothSurfaceSelector';
import { ToothInspectorPanel } from './ToothInspector';
import { TreatmentPlanWorkspace } from './TreatmentPlanWorkspace';
import {
  MousePointer2, Eraser, AlertCircle, Sparkles, ShieldCheck,
  Syringe, Crosshair, XSquare, Scissors, AlertTriangle, X, Skull
} from 'lucide-react';
import { useToothSelection } from './hooks/useToothSelection';

// ----------------------------------------------------------------------
// DATA MODELS & CONSTANTS
// ----------------------------------------------------------------------

export type ConditionStatus = 'existing' | 'planned' | 'in_progress' | 'completed' | 'watch';
export type ToothSurface = 'M' | 'O' | 'D' | 'F' | 'B' | 'L' | 'I';

export interface ClinicalFinding {
  id: string;
  type: string;
  surfaces: ToothSurface[];
  severity?: "early" | "moderate" | "severe";
  status: "existing" | "planned" | "watch";
  createdAt: string;
  createdBy: string;
  provider?: string;
  visitId?: string;
}

export interface ClinicalTreatment {
  id: string;
  type: string;
  surfaces: ToothSurface[];
  status: "planned" | "in_progress" | "completed" | "existing";
  provider?: string;
  procedureCode?: string;
  material?: string;
  visitId?: string;
  phaseId?: string;
  createdBy?: string;
  acceptanceStatus?: "not_presented" | "presented" | "accepted" | "declined" | "deferred";
  completedAt?: string;
  createdAt: string;
}

export interface ToothNote {
  id: string;
  type: string;
  text: string;
  author: string;
  createdAt: string;
  timestamp: string;
}

export interface ToothAttachment {
  id: string;
  type: "xray" | "photo" | "cbct" | "scan";
  url: string;
  uploadedAt: string;
}

export interface PerioRecord {
  pockets: Record<string, number>;
  recession: Record<string, number>;
  bleeding: Record<string, boolean>;
  mobility: 0 | 1 | 2 | 3;
  furcation: null | 1 | 2 | 3;
}

export interface ToothHistoryEvent {
  id: string;
  type: "finding" | "treatment" | "note" | "attachment";
  action: string;
  timestamp: string;
  user: string;
}

export interface ToothData {
  id: string;
  selected: boolean;
  findings: ClinicalFinding[];
  treatments: ClinicalTreatment[];
  notes: ToothNote[];
  attachments: ToothAttachment[];
  perio?: PerioRecord;
  history: ToothHistoryEvent[];
}

export interface ToothChartState {
  teeth: Record<string, ToothData>;
}

export const expandSurfaceGroup = (group: string): ToothSurface[] => {
  const map: Record<string, ToothSurface[]> = {
    'MOD': ['M', 'O', 'D'],
    'MODBL': ['M', 'O', 'D', 'B', 'L'],
    'MO': ['M', 'O'],
    'DO': ['D', 'O'],
    'BOL': ['B', 'O', 'L'],
    'MID': ['M', 'I', 'D'],
    'MI': ['M', 'I'],
    'DI': ['D', 'I'],
  };
  if (map[group.toUpperCase()]) return map[group.toUpperCase()];
  
  // Fallback: split string if they are valid surfaces
  const valid = ['M', 'O', 'D', 'F', 'B', 'L', 'I'];
  return group.toUpperCase().split('').filter(s => valid.includes(s)) as ToothSurface[];
};

export const CLINICAL_TOOLS = [
  // Findings (Pathology)
  { id: 'caries', label: 'Caries', icon: AlertCircle, color: 'text-clinical-caries', category: 'finding', tooltip: 'Tooth decay/cavity' },
  { id: 'missing', label: 'Missing', icon: XSquare, color: 'text-clinical-missing', category: 'finding', tooltip: 'Missing tooth' },
  { id: 'impacted', label: 'Impacted', icon: AlertTriangle, color: 'text-clinical-impacted', category: 'finding', tooltip: 'Impacted tooth' },
  { id: 'fracture', label: 'Fracture', icon: Skull, color: 'text-clinical-fracture', category: 'finding', tooltip: 'Broken or fractured tooth' },
  { id: 'root_remnant', label: 'Root Remnant', icon: Scissors, color: 'text-clinical-in-progress', category: 'finding', tooltip: 'Retained root' },
  
  // Restorations (Existing work)
  { id: 'amalgam', label: 'Amalgam', icon: Sparkles, color: 'text-urvos-text-muted', category: 'restoration', tooltip: 'Silver filling' },
  { id: 'composite', label: 'Composite', icon: Sparkles, color: 'text-clinical-existing', category: 'restoration', tooltip: 'White filling' },
  { id: 'crown_full', label: 'Full Crown', icon: ShieldCheck, color: 'text-clinical-watch', category: 'restoration', tooltip: 'Full coverage crown' },
  { id: 'implant', label: 'Implant', icon: Syringe, color: 'text-clinical-in-progress', category: 'restoration', tooltip: 'Dental implant' },
  
  // Treatments (Planned)
  { id: 'endo_treatment', label: 'Root Canal', icon: Crosshair, color: 'text-clinical-in-progress', category: 'treatment', tooltip: 'Endodontic treatment' },
  { id: 'extraction_planned', label: 'Plan Ext', icon: Scissors, color: 'text-urvos-danger', category: 'treatment', tooltip: 'Planned extraction' },

  // Selection
  { id: 'select', label: 'Select', icon: MousePointer2, color: 'text-urvos-primary', category: 'selection', tooltip: 'Select teeth' },
  { id: 'clear', label: 'Clear Selected', icon: Eraser, color: 'text-urvos-text', category: 'selection' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

const getConditionColor = (toolId: string, status?: ConditionStatus): string => {
  if (status === 'planned') return 'var(--urvos-color-clinical-planned)';
  if (status === 'completed') return 'var(--urvos-color-clinical-completed)';
  if (status === 'existing') return 'var(--urvos-color-clinical-existing)';
  if (status === 'in_progress') return 'var(--urvos-color-clinical-in-progress)';
  if (status === 'watch') return 'var(--urvos-color-clinical-watch)';
  
  // Default to finding colors
  const tool = CLINICAL_TOOLS.find(t => t.id === toolId);
  if (toolId === 'caries') return 'var(--urvos-color-clinical-caries)';
  if (toolId === 'missing') return 'var(--urvos-color-clinical-missing)';
  if (toolId === 'fracture') return 'var(--urvos-color-clinical-fracture)';
  if (toolId === 'impacted') return 'var(--urvos-color-clinical-impacted)';
  
  return 'var(--urvos-color-clinical-existing)';
};

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

export interface ToothChartProps {
  value: ToothChartState;
  onChange?: (state: ToothChartState) => void;
  onSave?: (state: ToothChartState) => void;
  readOnly?: boolean;
  className?: string;
}

export const ToothChart = ({
  value,
  onChange,
  onSave,
  readOnly = false,
  className,
}: ToothChartProps) => {
  const [mounted, setMounted] = useState(false);
  
  const {
    internalActiveTool,
    setInternalActiveStatus,
    internalActiveStatus,
    handleToolClick,
    applyToolToSelected,
    handleSelectionChange,
    handleRemoveRecord,
    handleAddNote,
    applyToolToSurface,
    selectedTeethList,
    clearKey,
    updateRecordStatus,
    toggleSurfaceOnRecord
  } = useToothSelection({ value, onChange, readOnly });

  useEffect(() => {
    setMounted(true);
  }, []);

  const showBatchActions = selectedTeethList.length > 1;
  const showSurfaceSelector = selectedTeethList.length === 1 && !readOnly;

  const activeConditionsList = useMemo(() => {
    const items: { toothId: string; toolLabel: string; recordId: string; details: string }[] = [];
    Object.values(value.teeth).forEach(tooth => {
      const allRecords = [...tooth.findings, ...tooth.treatments];
      allRecords.forEach(record => {
        const tool = CLINICAL_TOOLS.find(t => t.id === record.type);
        if (tool) {
          let details = [];
          if (record.status) details.push(record.status);
          if (record.surfaces && record.surfaces.length > 0) details.push(record.surfaces.join(','));
          
          items.push({
            toothId: tooth.id,
            toolLabel: tool.label,
            recordId: record.id,
            details: details.length > 0 ? `(${details.join(' - ')})` : ''
          });
        }
      });
    });
    return items.sort((a, b) => parseInt(a.toothId) - parseInt(b.toothId));
  }, [value.teeth]);

  const teethConditions = useMemo(() => {
    const conditions: Record<string, { label: string; teeth: string[]; outlineColor: string; fillColor: string }> = {};

    Object.values(value.teeth).forEach(tooth => {
      // Handle selections
      if (tooth.selected) {
        if (!conditions['selected']) {
          conditions['selected'] = { label: 'Selected', teeth: [], outlineColor: 'var(--urvos-color-action-primary)', fillColor: 'var(--urvos-color-action-primary-hover)' };
        }
        conditions['selected'].teeth.push(`teeth-${tooth.id}`);
      }

      // Handle clinical findings
      const allRecords = [...tooth.findings, ...tooth.treatments];
      allRecords.forEach(record => {
        const tool = CLINICAL_TOOLS.find(t => t.id === record.type);
        const conditionKey = `${record.type}-${record.status || 'default'}`;
        
        if (!conditions[conditionKey]) {
          conditions[conditionKey] = {
            label: tool?.label || 'Condition',
            teeth: [],
            outlineColor: getConditionColor(record.type, record.status as any),
            fillColor: getConditionColor(record.type, record.status as any) + '80', // Add some transparency
          };
        }
        
        conditions[conditionKey].teeth.push(`teeth-${tooth.id}`);
      });
    });

    return Object.values(conditions);
  }, [value.teeth]);

  const defaultSelectedTeeth = useMemo(() => {
    return Object.values(value.teeth)
      .filter(t => t.selected)
      .map(t => `teeth-${t.id}`);
  }, [value.teeth]);

  const activeToolConfig = useMemo(() => CLINICAL_TOOLS.find(t => t.id === internalActiveTool), [internalActiveTool]);
  const interactionMode = (!activeToolConfig || activeToolConfig.category === 'selection') ? 'tooth' : 'surface';
  const activeHoverColor = (interactionMode === 'surface' && internalActiveTool) 
    ? getConditionColor(internalActiveTool, internalActiveStatus) 
    : 'transparent';

  if (!mounted) return null;

  return (
    <div className={clsx("flex flex-col h-full bg-urvos-surface-sunken rounded-xl", className)}>
      {/* TOOLBAR */}
      {!readOnly && (
        <div className="flex-none p-4 border-b border-urvos-border bg-urvos-surface rounded-t-xl flex flex-col gap-3 shadow-sm">
          {/* Status Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-urvos-text-muted uppercase tracking-wider mr-2">Status:</span>
            {(['existing', 'planned', 'completed'] as ConditionStatus[]).map(status => (
              <button
                key={status}
                onClick={() => setInternalActiveStatus(status)}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                  internalActiveStatus === status
                    ? "bg-urvos-surface-alt border-urvos-border text-urvos-primary"
                    : "bg-urvos-surface border-urvos-border text-urvos-text-muted hover:bg-urvos-surface-alt"
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Tools */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {CLINICAL_TOOLS.map(tool => {
                const Icon = tool.icon;
                const isActive = internalActiveTool === tool.id;
                
                if (tool.id === 'clear') {
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-urvos-border hover:bg-urvos-danger-bg text-urvos-danger transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {tool.label}
                    </button>
                  );
                }
                
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    title={tool.tooltip}
                    className={clsx(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                      isActive 
                        ? "bg-urvos-surface border-urvos-border shadow-sm text-urvos-text" 
                        : "bg-urvos-surface border-transparent hover:bg-urvos-surface-alt text-urvos-text-muted"
                    )}
                  >
                    <Icon className={clsx("w-4 h-4", tool.color)} />
                    {tool.label}
                  </button>
                );
              })}
            </div>

            {onSave && (
              <button 
                onClick={() => onSave(value)}
                className="px-4 py-1.5 bg-urvos-primary hover:bg-urvos-primary-hover text-urvos-text-inverse rounded-lg font-medium text-sm transition-colors shadow-sm"
              >
                Save Chart
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div 
          className="flex-1 flex flex-col items-center justify-center relative p-8 h-[600px] w-full"
          style={{ '--active-hover-color': activeHoverColor } as React.CSSProperties}
        >
           <CustomOdontogram
             className="w-full h-full max-w-6xl max-h-full"
             onToothClick={handleSelectionChange}
             onSurfaceClick={(toothId, surfaceId) => applyToolToSurface(toothId, surfaceId)}
             selectedTeeth={Object.keys(value.teeth).filter(id => value.teeth[id]?.selected)}
             teethData={value.teeth}
             interactionMode={interactionMode}
             readOnly={readOnly}
           />
           <div className="absolute bottom-6 left-8 flex items-center gap-4 bg-urvos-surface/90 backdrop-blur-sm p-3 rounded-xl border border-urvos-border shadow-sm text-xs font-medium text-urvos-text-muted">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-clinical-existing"></div>Existing</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-clinical-planned"></div>Planned</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-clinical-in-progress"></div>In Progress</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-clinical-completed"></div>Completed</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-clinical-watch"></div>Watch</div>
           </div>
        </div>
        
        {/* RIGHT PANEL - INSPECTOR */}
        {!readOnly && (
          <ToothInspectorPanel 
            teeth={selectedTeethList}
            onApplyTool={applyToolToSelected}
            onRemoveRecord={handleRemoveRecord}
            onToggleSurface={toggleSurfaceOnRecord}
            onAddNote={handleAddNote}
          />
        )}
      </div>
      
      {/* BOTTOM PANEL - TREATMENT PLAN */}
      {!readOnly && (
        <TreatmentPlanWorkspace 
          teeth={value.teeth} 
          onSelectTooth={(toothId) => {
            // Clear current selection and select only this tooth
            const newState = { ...value, teeth: { ...value.teeth } };
            Object.keys(newState.teeth).forEach(id => {
              newState.teeth[id] = { ...newState.teeth[id], selected: id === toothId };
            });
            onChange?.(newState);
          }}
          onUpdateTreatmentStatus={(toothId, treatmentId, status) => {
            if (updateRecordStatus) updateRecordStatus(toothId, treatmentId, status as ConditionStatus);
          }}
          onRemoveTreatment={handleRemoveRecord}
        />
      )}
    </div>
  );
};

