import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { ToothData, CLINICAL_TOOLS, ToothSurface } from '../ToothChart';

interface OverviewTabProps {
  activeTooth: ToothData;
  onRemoveRecord: (toothId: string, recordId: string) => void;
  onToggleSurface?: (toothId: string, recordId: string, surface: ToothSurface) => void;
}

const MiniSurfaceIcon = ({ surfaces, colorClass = "fill-blue-500" }: { surfaces: string[], colorClass?: string }) => {
  const has = (s: string[]) => s.some(x => surfaces.includes(x)) ? colorClass : 'fill-gray-200';
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" className="flex-none drop-shadow-sm">
      <polygon points="0,0 20,0 14,6 6,6" className={has(['B', 'F'])} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="6,14 14,14 20,20 0,20" className={has(['L'])} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="0,0 6,6 6,14 0,20" className={has(['M'])} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="20,0 14,6 14,14 20,20" className={has(['D'])} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="6" y="6" width="8" height="8" className={has(['O', 'I'])} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

export const OverviewTab: React.FC<OverviewTabProps> = ({ activeTooth, onRemoveRecord, onToggleSurface }) => {
  return (
    <>
      <div>
        <h3 className="text-sm font-semibold text-urvos-text mb-3">Active Findings</h3>
        {activeTooth.findings && activeTooth.findings.length > 0 ? (
          <ul className="space-y-2">
            {activeTooth.findings.map(finding => {
              const tool = CLINICAL_TOOLS.find(t => t.id === finding.type);
              return (
                <li key={finding.id} className="bg-white p-3 rounded-lg border border-urvos-border shadow-sm flex items-start justify-between group">
                  <div className="flex items-center gap-3">
                    {tool && <tool.icon className={clsx("w-5 h-5", tool.color)} />}
                    <div>
                      <p className="text-sm font-medium text-urvos-text">{tool?.label || finding.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {finding.status || 'Active'}
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          {['M', 'I', 'L', 'D', 'F'].map(s => {
                            const isActive = finding.surfaces?.includes(s as ToothSurface);
                            return (
                              <button
                                key={s}
                                onClick={() => onToggleSurface?.(activeTooth.id, finding.id, s as ToothSurface)}
                                className={clsx(
                                  "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors",
                                  isActive ? "bg-gray-800 text-white hover:bg-red-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveRecord(activeTooth.id, finding.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-urvos-text-muted italic bg-white p-3 rounded-lg border border-urvos-border border-dashed text-center">No active findings.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-urvos-text mb-3">Treatments</h3>
        {activeTooth.treatments && activeTooth.treatments.length > 0 ? (
          <ul className="space-y-2">
            {activeTooth.treatments.map(treatment => {
              const tool = CLINICAL_TOOLS.find(t => t.id === treatment.type);
              return (
                <li key={treatment.id} className="bg-white p-3 rounded-lg border border-urvos-border shadow-sm flex items-start justify-between group">
                  <div className="flex items-center gap-3">
                    {tool && <tool.icon className={clsx("w-5 h-5", tool.color)} />}
                    <div>
                      <p className="text-sm font-medium text-urvos-text">{tool?.label || treatment.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={clsx(
                          "text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full",
                          treatment.status === 'existing' && "bg-blue-100 text-blue-700",
                          treatment.status === 'planned' && "bg-orange-100 text-orange-700",
                          treatment.status === 'completed' && "bg-green-100 text-green-700",
                          treatment.status === 'in_progress' && "bg-purple-100 text-purple-700"
                        )}>
                          {treatment.status}
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          {['M', 'I', 'L', 'D', 'F'].map(s => {
                            const isActive = treatment.surfaces?.includes(s as ToothSurface);
                            return (
                              <button
                                key={s}
                                onClick={() => onToggleSurface?.(activeTooth.id, treatment.id, s as ToothSurface)}
                                className={clsx(
                                  "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors",
                                  isActive ? (
                                    treatment.status === 'planned' ? 'bg-orange-500 text-white hover:bg-orange-600' :
                                    treatment.status === 'completed' ? 'bg-green-500 text-white hover:bg-green-600' :
                                    treatment.status === 'existing' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-purple-500 text-white hover:bg-purple-600'
                                  ) : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveRecord(activeTooth.id, treatment.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-urvos-text-muted italic bg-white p-3 rounded-lg border border-urvos-border border-dashed text-center">No treatments planned or completed.</p>
        )}
      </div>
    </>
  );
};
