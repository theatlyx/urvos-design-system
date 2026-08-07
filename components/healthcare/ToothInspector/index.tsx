import React, { useState } from 'react';
import { clsx } from "clsx";
import { ChevronDown, Clock, FileText, ImageIcon, ActivityIcon } from 'lucide-react';
import { ToothData, CLINICAL_TOOLS, ToothSurface } from '../ToothChart';
import { ToothSurfaceSelector } from '../ToothSurfaceSelector';
import { OverviewTab } from './OverviewTab';
import { HistoryTab } from './HistoryTab';
import { NotesTab } from './NotesTab';
import { ImagesTab } from './ImagesTab';

interface ToothInspectorPanelProps {
  teeth: ToothData[];
  onApplyTool: (toolId: string, surfaces?: ToothSurface[]) => void;
  onRemoveRecord: (toothId: string, recordId: string) => void;
  onToggleSurface?: (toothId: string, recordId: string, surface: ToothSurface) => void;
  onAddNote?: (toothId: string, type: string, text: string) => void;
  className?: string;
}

type TabType = 'overview' | 'history' | 'notes' | 'images' | 'perio';

export const ToothInspectorPanel = ({ teeth, onApplyTool, onRemoveRecord, onToggleSurface, onAddNote, className }: ToothInspectorPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeToothId, setActiveToothId] = useState<string | null>(null);
  const [activeSurfaces, setActiveSurfaces] = useState<ToothSurface[]>([]);

  React.useEffect(() => {
    if (teeth.length === 1) {
      setActiveToothId(teeth[0].id);
    } else if (teeth.length === 0) {
      setActiveToothId(null);
    } else if (activeToothId && !teeth.find(t => t.id === activeToothId)) {
      setActiveToothId(null);
    }
  }, [teeth, activeToothId]);

  if (teeth.length === 0) {
    return (
      <div className={clsx("w-[420px] max-w-[520px] flex-none border-l border-urvos-border bg-urvos-surface flex flex-col items-center justify-center p-8 text-center", className)}>
        <ActivityIcon className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-sm font-semibold text-urvos-text mb-2">No Tooth Selected</h3>
        <p className="text-xs text-urvos-text-muted">Select one or more teeth on the chart to view details and apply treatments.</p>
      </div>
    );
  }

  const isBatchMode = teeth.length > 1 && !activeToothId;
  const activeTooth = activeToothId ? teeth.find(t => t.id === activeToothId) : null;

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: ActivityIcon },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'perio', label: 'Perio', icon: ActivityIcon },
  ];

  return (
    <div className={clsx("w-[420px] min-w-[420px] max-w-[520px] flex-none border-l border-urvos-border bg-white flex flex-col h-full", className)}>
      
      {/* HEADER */}
      <div className="flex-none p-4 border-b border-urvos-border bg-urvos-surface">
        {isBatchMode ? (
          <div>
            <h2 className="text-lg font-semibold text-urvos-text mb-2">{teeth.length} Teeth Selected</h2>
            {teeth.length <= 8 ? (
              <div className="flex flex-wrap gap-2">
                {teeth.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveToothId(t.id)}
                    className="px-2 py-1 rounded bg-white border border-urvos-border hover:bg-gray-50 text-xs font-medium text-urvos-text shadow-sm"
                  >
                    {t.id}
                  </button>
                ))}
              </div>
            ) : (
              <button className="flex items-center justify-between w-full px-3 py-2 bg-white border border-urvos-border rounded-lg text-sm text-urvos-text shadow-sm hover:bg-gray-50 transition-colors">
                <span>Show List</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {teeth.length > 1 && (
                  <button 
                    onClick={() => setActiveToothId(null)}
                    className="text-xs text-blue-600 hover:underline mr-2"
                  >
                    &larr; Back to Batch
                  </button>
                )}
                <h2 className="text-lg font-semibold text-urvos-text">Tooth {activeTooth?.id}</h2>
              </div>
              <p className="text-xs text-urvos-text-muted mt-0.5">Clinical Details</p>
            </div>
            {teeth.length === 1 && (
              <div className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold uppercase tracking-wider border border-green-200">
                Adult
              </div>
            )}
          </div>
        )}
      </div>

      {/* SINGLE MODE TABS */}
      {!isBatchMode && (
        <div className="flex border-b border-urvos-border px-2 flex-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex-1 flex flex-col items-center gap-1 p-3 text-xs font-medium border-b-2 transition-colors",
                  isActive 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-urvos-text-muted hover:text-urvos-text hover:bg-gray-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* CONTENT */}
      <div className="flex-1 overflow-auto bg-urvos-surface-sunken p-4">
        
        {/* BATCH MODE CONTENT */}
        {isBatchMode && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-urvos-border shadow-sm">
              <h3 className="text-sm font-semibold text-urvos-text mb-3">Batch Actions</h3>
              
              <div className="mb-4">
                <h4 className="text-xs font-medium text-urvos-text-muted mb-2">1. Select Surfaces (Optional)</h4>
                <ToothSurfaceSelector 
                  selectedSurfaces={activeSurfaces}
                  onChange={setActiveSurfaces}
                />
              </div>

              <h4 className="text-xs font-medium text-urvos-text-muted mb-2">2. Apply Treatment / Finding</h4>
              <div className="grid grid-cols-2 gap-2">
                {CLINICAL_TOOLS.filter(t => t.category !== 'selection').map(tool => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                         onApplyTool(tool.id, activeSurfaces.length > 0 ? activeSurfaces : undefined);
                         setActiveSurfaces([]);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-urvos-border hover:bg-gray-50 text-xs font-medium text-urvos-text shadow-sm transition-colors text-left"
                    >
                      <Icon className={clsx("w-4 h-4 flex-none", tool.color)} />
                      <span className="truncate">{tool.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={() => {
                     const text = window.prompt("Enter batch note text:");
                     if (text && onAddNote) {
                       teeth.forEach(t => onAddNote(t.id, "Batch Note", text));
                     }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 text-xs font-medium text-blue-700 transition-colors text-left"
                >
                  <FileText className="w-4 h-4 flex-none" />
                  <span className="truncate">Add Batch Note</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 text-xs font-medium text-blue-700 transition-colors text-left">
                  <ImageIcon className="w-4 h-4 flex-none" />
                  <span className="truncate">Upload Images</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-urvos-border shadow-sm">
              <h3 className="text-sm font-semibold text-urvos-text mb-3">Selection Summary</h3>
              <div className="space-y-2">
                 {(() => {
                   const summaries: Record<string, number> = {};
                   let healthyCount = 0;
                   teeth.forEach(t => {
                     let hasFindings = false;
                     if (t.findings && t.findings.length > 0) {
                       t.findings.forEach(f => {
                         const label = CLINICAL_TOOLS.find(ct => ct.id === f.type)?.label || f.type;
                         summaries[label] = (summaries[label] || 0) + 1;
                         hasFindings = true;
                       });
                     }
                     if (t.treatments && t.treatments.length > 0) {
                       t.treatments.forEach(tr => {
                         const label = CLINICAL_TOOLS.find(ct => ct.id === tr.type)?.label || tr.type;
                         const key = `${tr.status === 'existing' ? 'Existing' : tr.status === 'planned' ? 'Planned' : 'Completed'} ${label}`;
                         summaries[key] = (summaries[key] || 0) + 1;
                         hasFindings = true;
                       });
                     }
                     if (!hasFindings) healthyCount++;
                   });
                   
                   return (
                     <ul className="space-y-2">
                       {healthyCount > 0 && (
                         <li className="flex justify-between text-xs p-2 bg-gray-50 rounded border border-gray-100">
                           <span className="text-urvos-text-muted">Healthy</span>
                           <span className="font-semibold">{healthyCount}</span>
                         </li>
                       )}
                       {Object.entries(summaries).map(([label, count]) => (
                         <li key={label} className="flex justify-between text-xs p-2 bg-blue-50 rounded border border-blue-100">
                           <span className="text-blue-700">{label}</span>
                           <span className="font-semibold text-blue-900">{count}</span>
                         </li>
                       ))}
                     </ul>
                   );
                 })()}
              </div>
            </div>
          </div>
        )}

        {/* SINGLE MODE CONTENT */}
        {!isBatchMode && activeTooth && (
          <div className="space-y-6 h-full">
            {activeTab === 'overview' && (
              <OverviewTab activeTooth={activeTooth} onRemoveRecord={onRemoveRecord} onToggleSurface={onToggleSurface} />
            )}
            {activeTab === 'notes' && (
              <NotesTab activeTooth={activeTooth} onAddNote={onAddNote || (() => {})} />
            )}
            {activeTab === 'history' && (
              <HistoryTab activeTooth={activeTooth} />
            )}
            {activeTab === 'images' && (
              <ImagesTab />
            )}
            {activeTab === 'perio' && (
              <div className="flex flex-col items-center text-center opacity-50 py-12">
                 <ActivityIcon className="w-12 h-12 mb-3 mx-auto text-gray-400" />
                 <p className="text-sm text-urvos-text-muted">Perio chart coming soon.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
