import { useMemo } from 'react';
import { ToothData, ToothSurface } from '../ToothChart';

export interface ToothDisplayModel {
  surfaceFills: Partial<Record<ToothSurface, string>>;
  globalConditions: {
    isMissing: boolean;
    missingColor?: string;
    isExtPlanned: boolean;
    extPlannedColor?: string;
    crown: null | { color: string };
    rootCanal: null | { color: string };
    implant: null | { color: string };
  };
  badges: {
    findingsCount: number;
    notesCount: number;
  };
}

const getConditionColor = (type: string, status?: string): string => {
  if (status === 'planned') return 'var(--urvos-color-clinical-planned)';
  if (status === 'completed') return 'var(--urvos-color-clinical-completed)';
  if (status === 'existing') return 'var(--urvos-color-clinical-existing)';
  if (status === 'in_progress') return 'var(--urvos-color-clinical-in-progress)';
  if (status === 'watch') return 'var(--urvos-color-clinical-watch)';
  
  if (type === 'caries') return 'var(--urvos-color-clinical-caries)';
  if (type === 'fracture') return 'var(--urvos-color-clinical-fracture)';
  if (type === 'impacted') return 'var(--urvos-color-clinical-impacted)';
  if (type === 'missing') return 'var(--urvos-color-clinical-missing)';
  if (type === 'extraction_planned') return 'var(--urvos-color-clinical-planned)';
  
  return 'var(--urvos-color-clinical-existing)';
};

// Priority for surface rendering conflicts: Planned > In Progress > Completed > Existing > Watch
const STATUS_PRIORITY: Record<string, number> = {
  'planned': 5,
  'in_progress': 4,
  'completed': 3,
  'existing': 2,
  'watch': 1,
};

export const useToothDisplayModel = (data?: ToothData): ToothDisplayModel => {
  return useMemo(() => {
    const model: ToothDisplayModel = {
      surfaceFills: {},
      globalConditions: {
        isMissing: false,
        isExtPlanned: false,
        crown: null,
        rootCanal: null,
        implant: null,
      },
      badges: {
        findingsCount: 0,
        notesCount: 0,
      }
    };

    if (!data) return model;

    model.badges.findingsCount = data.findings.length;
    model.badges.notesCount = data.notes.length;

    const allRecords = [...data.findings, ...data.treatments];
    
    // Process surfaces (conflict resolution by priority)
    const surfaceHighestPriority: Partial<Record<ToothSurface, number>> = {};

    allRecords.forEach(record => {
      if (record.surfaces && record.surfaces.length > 0) {
        const color = getConditionColor(record.type, record.status);
        const priority = STATUS_PRIORITY[record.status || ''] || 0;
        
        record.surfaces.forEach(surface => {
          const currentPriority = surfaceHighestPriority[surface] || -1;
          if (priority >= currentPriority) {
            model.surfaceFills[surface] = color;
            surfaceHighestPriority[surface] = priority;
          }
        });
      }
    });

    // Process global conditions
    const wholeToothRecords = allRecords.filter(r => !r.surfaces || r.surfaces.length === 0);
    
    wholeToothRecords.forEach(record => {
      const color = getConditionColor(record.type, record.status);
      
      if (record.type === 'missing') {
        model.globalConditions.isMissing = true;
        model.globalConditions.missingColor = color;
      }
      if (record.type === 'extraction_planned') {
        model.globalConditions.isExtPlanned = true;
        model.globalConditions.extPlannedColor = color;
      }
      if (record.type === 'crown_full') {
        model.globalConditions.crown = { color };
      }
      if (record.type === 'endo_treatment') {
        model.globalConditions.rootCanal = { color };
      }
      if (record.type === 'implant') {
        model.globalConditions.implant = { color };
      }
    });

    return model;
  }, [data]);
};
