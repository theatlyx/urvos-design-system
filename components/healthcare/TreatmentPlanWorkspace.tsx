import React, { useMemo } from 'react';
import { ToothData, CLINICAL_TOOLS } from './ToothChart';
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown, Check, Trash2, Calendar } from 'lucide-react';

interface TreatmentPlanWorkspaceProps {
  teeth: Record<string, ToothData>;
  onSelectTooth?: (toothId: string) => void;
  onUpdateTreatmentStatus?: (toothId: string, treatmentId: string, status: string) => void;
  onRemoveTreatment?: (toothId: string, treatmentId: string) => void;
}

export const TreatmentPlanWorkspace: React.FC<TreatmentPlanWorkspaceProps> = ({
  teeth,
  onSelectTooth,
  onUpdateTreatmentStatus,
  onRemoveTreatment
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const treatments = useMemo(() => {
    const list: any[] = [];
    Object.values(teeth).forEach(tooth => {
      tooth.treatments.forEach(t => {
        const tool = CLINICAL_TOOLS.find(c => c.id === t.type);
        list.push({
          toothId: tooth.id,
          ...t,
          label: tool?.label || t.type
        });
      });
    });
    // Sort by status and then by tooth ID
    return list.sort((a, b) => {
      if (a.status !== b.status) {
        const order = { 'planned': 0, 'in_progress': 1, 'completed': 2, 'existing': 3 };
        return (order[a.status as keyof typeof order] || 4) - (order[b.status as keyof typeof order] || 4);
      }
      return parseInt(a.toothId) - parseInt(b.toothId);
    });
  }, [teeth]);

  const planned = treatments.filter(t => t.status === 'planned');
  const inProgress = treatments.filter(t => t.status === 'in_progress');
  const completed = treatments.filter(t => t.status === 'completed' || t.status === 'existing');

  if (!isExpanded) {
    return (
      <div className="border-t border-urvos-border bg-white p-3 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-gray-50 transition-colors rounded-b-xl" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-sm text-urvos-text">Treatment Plan</h3>
          <div className="flex gap-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{planned.length} Planned</span>
            <span className="text-xs font-medium px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">{inProgress.length} In Progress</span>
          </div>
        </div>
        <ChevronUp className="w-5 h-5 text-gray-400" />
      </div>
    );
  }

  const renderSection = (title: string, list: any[], colorClass: string) => {
    if (list.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className={clsx("w-2 h-2 rounded-full", colorClass)}></span>
          {title} ({list.length})
        </h4>
        <div className="border border-urvos-border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-urvos-text-muted text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-2">Tooth</th>
                <th className="px-4 py-2">Procedure</th>
                <th className="px-4 py-2">Surfaces</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map(t => (
                <tr key={t.id} className="bg-white hover:bg-blue-50/50 cursor-pointer transition-colors" onClick={() => onSelectTooth?.(t.toothId)}>
                  <td className="px-4 py-3 font-medium text-urvos-text">#{t.toothId}</td>
                  <td className="px-4 py-3 text-urvos-text">{t.label}</td>
                  <td className="px-4 py-3 text-urvos-text-muted">{t.surfaces?.join('') || '-'}</td>
                  <td className="px-4 py-3 text-urvos-text-muted text-xs">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {t.status === 'planned' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateTreatmentStatus?.(t.toothId, t.id, 'in_progress'); }}
                          className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded" title="Start Treatment"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      )}
                      {(t.status === 'planned' || t.status === 'in_progress') && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateTreatmentStatus?.(t.toothId, t.id, 'completed'); }}
                          className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded" title="Complete"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); onRemoveTreatment?.(t.toothId, t.id); }}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t border-urvos-border bg-white flex flex-col shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] h-[40vh] transition-all rounded-b-xl z-10 relative">
      <div className="flex-none p-3 border-b border-urvos-border flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsExpanded(false)}>
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-sm text-urvos-text">Treatment Plan</h3>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {renderSection("Planned", planned, "bg-orange-500")}
        {renderSection("In Progress", inProgress, "bg-purple-500")}
        {renderSection("Completed / Existing", completed, "bg-green-500")}
        {treatments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-urvos-text-muted">
            <p className="text-sm">No treatments planned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
