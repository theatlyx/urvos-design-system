import { useState } from 'react';
import { ToothChartState, ToothSurface, ConditionStatus, CLINICAL_TOOLS, ToothData } from '../ToothChart';
import { ClinicalEventBus } from '../ClinicalEventBus';

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useToothSelection({
  value,
  onChange,
  readOnly = false
}: {
  value: ToothChartState;
  onChange?: (state: ToothChartState) => void;
  readOnly?: boolean;
}) {
  const [internalActiveTool, setInternalActiveTool] = useState<string>("select");
  const [internalActiveStatus, setInternalActiveStatus] = useState<ConditionStatus>("existing");
  const [activeSurfaces, setActiveSurfaces] = useState<ToothSurface[]>([]);
  const [clearKey, setClearKey] = useState(0);

  const getToolCategory = (toolId: string) => CLINICAL_TOOLS.find(t => t.id === toolId)?.category || 'finding';

  interface RecordIdentity {
    type: string;
    category: string;
    status?: string;
    provider?: string;
    procedureCode?: string;
    material?: string;
    visitId?: string;
  }

  const addSurfaceToClinicalRecord = (
    tooth: ToothData, 
    identity: RecordIdentity, 
    surfacesToToggle?: ToothSurface[]
  ) => {
    const targetArray = identity.category === 'finding' ? tooth.findings : tooth.treatments;
    
    // Find if a record for this identity already exists on this tooth
    const existingIndex = targetArray.findIndex(r => {
      if (r.type !== identity.type) return false;
      if (r.status !== identity.status) return false;
      
      const tr = r as any;
      if (identity.provider && tr.provider !== identity.provider) return false;
      if (identity.visitId && tr.visitId !== identity.visitId) return false;
      
      return true;
    });

    let action = '';
    let added: ToothSurface[] = [];
    let removed: ToothSurface[] = [];
    const now = new Date().toISOString();

    if (existingIndex > -1) {
      const record = targetArray[existingIndex];
      const isSurfaceClick = surfacesToToggle && surfacesToToggle.length > 0;
      
      if (isSurfaceClick) {
        // Toggle the specific surfaces
        let newRecordSurfaces = [...(record.surfaces || [])];
        surfacesToToggle.forEach(s => {
          if (newRecordSurfaces.includes(s)) {
            newRecordSurfaces = newRecordSurfaces.filter(rs => rs !== s);
            removed.push(s);
          } else {
            newRecordSurfaces.push(s);
            added.push(s);
          }
        });
        
        if (newRecordSurfaces.length === 0) {
          targetArray.splice(existingIndex, 1);
          action = `Removed ${identity.type} (all surfaces cleared)`;
          ClinicalEventBus.publish({
            type: identity.category === 'finding' ? 'FINDING_REMOVED' : 'TREATMENT_REMOVED',
            toothId: tooth.id,
            recordId: record.id,
            payload: { type: identity.type }
          });
        } else {
          record.surfaces = newRecordSurfaces;
          action = `Updated ${identity.type}. Added: ${added.length ? added.join(',') : 'none'}. Removed: ${removed.length ? removed.join(',') : 'none'}`;
          ClinicalEventBus.publish({
            type: 'SURFACE_MODIFIED',
            toothId: tooth.id,
            recordId: record.id,
            payload: { surfaces: newRecordSurfaces }
          });
        }
      } else {
        // Whole tooth toggle off
        targetArray.splice(existingIndex, 1);
        action = `Removed ${identity.type}`;
        ClinicalEventBus.publish({
          type: identity.category === 'finding' ? 'FINDING_REMOVED' : 'TREATMENT_REMOVED',
          toothId: tooth.id,
          recordId: record.id,
          payload: { type: identity.type }
        });
      }
    } else {
      const newSurfaces = surfacesToToggle && surfacesToToggle.length > 0 ? [...surfacesToToggle] : undefined;
      
      const newId = generateId();
      if (identity.category === 'finding') {
        tooth.findings.push({
          id: newId,
          type: identity.type,
          surfaces: newSurfaces ?? [],
          status: 'watch',
          createdAt: now,
          createdBy: 'System',
          provider: identity.provider,
          visitId: identity.visitId
        });
        ClinicalEventBus.publish({
          type: 'FINDING_CREATED',
          toothId: tooth.id,
          recordId: newId,
          payload: { type: identity.type, surfaces: newSurfaces }
        });
      } else if (identity.category === 'treatment' || identity.category === 'restoration') {
        tooth.treatments.push({
          id: newId,
          type: identity.type,
          surfaces: newSurfaces ?? [],
          status: identity.status as any,
          createdAt: now,
          createdBy: 'System',
          provider: identity.provider,
          visitId: identity.visitId,
          procedureCode: identity.procedureCode,
          material: identity.material
        });
        ClinicalEventBus.publish({
          type: 'TREATMENT_CREATED',
          toothId: tooth.id,
          recordId: newId,
          payload: { type: identity.type, status: identity.status, surfaces: newSurfaces }
        });
      }
      action = `Added ${identity.type}` + (newSurfaces ? ` on ${newSurfaces.join(',')}` : '');
    }

    tooth.history.push({
      id: generateId(),
      type: identity.category === 'finding' ? 'finding' : 'treatment',
      action: action,
      timestamp: now,
      user: 'System'
    });
  };

  const handleClearSelection = () => {
    const newState = { ...value, teeth: { ...value.teeth } };
    Object.keys(newState.teeth).forEach(id => {
      newState.teeth[id] = { ...newState.teeth[id], selected: false };
    });
    setClearKey(k => k + 1);
    onChange?.(newState);
  };

  const applyToolToSelected = (toolId: string, customSurfaces?: ToothSurface[]) => {
    const selectedTeethList = Object.values(value.teeth).filter(t => t.selected);
    if (selectedTeethList.length > 0) {
      const newState = { ...value, teeth: { ...value.teeth } };
      selectedTeethList.forEach(tooth => {
        const newTooth = { ...tooth, findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] };
        
        const category = getToolCategory(toolId);
        const identity = {
          type: toolId,
          category,
          status: category === 'finding' ? 'watch' : internalActiveStatus,
        };
        addSurfaceToClinicalRecord(newTooth, identity, customSurfaces || activeSurfaces);
        
        newState.teeth[tooth.id] = newTooth;
      });
      onChange?.(newState);
      setActiveSurfaces([]);
    }
  };

  const handleToolClick = (toolId: string) => {
    if (toolId === 'clear') {
       handleClearSelection();
       return;
    }
    if (internalActiveTool === toolId) {
       setInternalActiveTool("");
       return;
    }
    setInternalActiveTool(toolId);
    
    const tool = CLINICAL_TOOLS.find(t => t.id === toolId);
    if (tool && tool.category !== 'selection') {
      applyToolToSelected(toolId);
    }
  };

  const applyToolToSurface = (toothId: string, surfaceId: ToothSurface) => {
    if (readOnly) return;
    
    const tool = CLINICAL_TOOLS.find(t => t.id === internalActiveTool);
    if (!tool || tool.category === 'selection') return;

    const newState = { ...value, teeth: { ...value.teeth } };
    const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
    const newTooth = { ...tooth, findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] };
    
    const identity = {
      type: internalActiveTool,
      category: tool.category,
      status: tool.category === 'finding' ? 'watch' : internalActiveStatus,
    };
    addSurfaceToClinicalRecord(newTooth, identity, [surfaceId]);
    
    newState.teeth[toothId] = newTooth;
    onChange?.(newState);
  };

  const handleSelectionChange = (toothId: string) => {
    if (readOnly) return;
    
    const newState = { ...value, teeth: { ...value.teeth } };
    const currentTool = CLINICAL_TOOLS.find(t => t.id === internalActiveTool);

    if (!currentTool || currentTool.category === "selection") {
      const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
      newState.teeth[toothId] = { ...tooth, selected: !tooth.selected };
    } else {
      const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
      const newTooth = { ...tooth, findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] };
      
      const identity = {
        type: internalActiveTool,
        category: currentTool.category,
        status: currentTool.category === 'finding' ? 'watch' : internalActiveStatus,
      };
      addSurfaceToClinicalRecord(newTooth, identity, activeSurfaces);
      
      newState.teeth[toothId] = newTooth;
    }

    onChange?.(newState);
  };

  const handleRemoveRecord = (toothId: string, recordId: string) => {
    const newState = { ...value, teeth: { ...value.teeth } };
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    
    tooth.findings = tooth.findings.filter(r => r.id !== recordId);
    tooth.treatments = tooth.treatments.filter(r => r.id !== recordId);
    onChange?.(newState);
  };

  const handleAddNote = (toothId: string, type: string, text: string) => {
    const newState = { ...value, teeth: { ...value.teeth } };
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    
    const newTooth = { ...tooth, notes: [...tooth.notes], history: [...tooth.history] };
    const now = new Date().toISOString();
    
    const newNoteId = generateId();
    newTooth.notes.push({
      id: newNoteId,
      type,
      text,
      author: 'Dr. User',
      createdAt: now,
      timestamp: now
    });
    
    newTooth.history.push({
      id: generateId(),
      type: 'note',
      action: `Added ${type}`,
      timestamp: now,
      user: 'Dr. User'
    });
    
    ClinicalEventBus.publish({
      type: 'NOTE_ADDED',
      toothId: tooth.id,
      recordId: newNoteId,
      payload: { type, text }
    });
    
    newState.teeth[toothId] = newTooth;
    onChange?.(newState);
  };

  const updateRecordStatus = (toothId: string, recordId: string, status: ConditionStatus) => {
    const newState = { ...value, teeth: { ...value.teeth } };
    const tooth = newState.teeth[toothId];
    if (!tooth) return;

    const newTooth = { ...tooth, treatments: [...tooth.treatments], findings: [...tooth.findings], history: [...tooth.history] };
    
    // Update treatments
    let recordCategory = '';
    const tIndex = newTooth.treatments.findIndex(t => t.id === recordId);
    if (tIndex > -1) {
      newTooth.treatments[tIndex] = { ...newTooth.treatments[tIndex], status: status as any };
      recordCategory = 'treatment';
    } else {
      // Update findings
      const fIndex = newTooth.findings.findIndex(f => f.id === recordId);
      if (fIndex > -1) {
        newTooth.findings[fIndex] = { ...newTooth.findings[fIndex], status: status as any };
        recordCategory = 'finding';
      }
    }

    if (recordCategory) {
      ClinicalEventBus.publish({
        type: recordCategory === 'finding' ? 'FINDING_UPDATED' : 'TREATMENT_UPDATED',
        toothId: tooth.id,
        recordId: recordId,
        payload: { status }
      });
    }

    newTooth.history.push({
      id: generateId(),
      type: 'treatment',
      action: `Updated status to ${status}`,
      timestamp: new Date().toISOString(),
      user: 'Dr. User'
    });

    newState.teeth[toothId] = newTooth;
    onChange?.(newState);
  };

  const toggleSurfaceOnRecord = (toothId: string, recordId: string, surface: ToothSurface) => {
    if (readOnly) return;
    const newState = { ...value, teeth: { ...value.teeth } };
    const tooth = newState.teeth[toothId];
    if (!tooth) return;

    const newTooth = { ...tooth, treatments: [...tooth.treatments], findings: [...tooth.findings] };
    
    let isFinding = false;
    let rIndex = newTooth.treatments.findIndex(t => t.id === recordId);
    if (rIndex === -1) {
      rIndex = newTooth.findings.findIndex(f => f.id === recordId);
      isFinding = true;
    }
    
    if (rIndex === -1) return;

    const record = isFinding ? { ...newTooth.findings[rIndex] } : { ...newTooth.treatments[rIndex] };
    
    let newSurfaces = [...(record.surfaces || [])];
    if (newSurfaces.includes(surface)) {
      newSurfaces = newSurfaces.filter(s => s !== surface);
    } else {
      newSurfaces.push(surface);
    }

    if (newSurfaces.length === 0) {
      ClinicalEventBus.publish({
        type: isFinding ? 'FINDING_REMOVED' : 'TREATMENT_REMOVED',
        toothId: tooth.id,
        recordId: record.id,
        payload: { type: record.type }
      });
      handleRemoveRecord(toothId, recordId);
      return;
    }

    record.surfaces = newSurfaces;
    if (isFinding) {
      newTooth.findings[rIndex] = record as any;
    } else {
      newTooth.treatments[rIndex] = record as any;
    }
    
    ClinicalEventBus.publish({
      type: 'SURFACE_MODIFIED',
      toothId: tooth.id,
      recordId: record.id,
      payload: { surfaces: newSurfaces }
    });

    newState.teeth[toothId] = newTooth;
    onChange?.(newState);
  };

  const selectedTeethList = Object.values(value.teeth).filter(t => t.selected);

  return {
    internalActiveTool,
    setInternalActiveTool,
    internalActiveStatus,
    setInternalActiveStatus,
    activeSurfaces,
    setActiveSurfaces,
    clearKey,
    handleToolClick,
    applyToolToSelected,
    handleClearSelection,
    handleSelectionChange,
    handleRemoveRecord,
    handleAddNote,
    applyToolToSurface,
    selectedTeethList,
    updateRecordStatus,
    toggleSurfaceOnRecord
  };
}
