import React from 'react';
import { ImageIcon, Plus } from 'lucide-react';

export const ImagesTab: React.FC = () => {
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-urvos-text">Images & X-Rays</h3>
        <button className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
          <Plus className="w-3 h-3" /> Upload
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center opacity-50 py-12">
        <ImageIcon className="w-12 h-12 mb-3 mx-auto text-gray-400" />
        <p className="text-sm text-urvos-text-muted">No images attached.</p>
      </div>
    </div>
  );
};
