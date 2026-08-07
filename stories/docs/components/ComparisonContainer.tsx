import React from 'react';

interface ComparisonContainerProps {
  children: React.ReactNode;
}

/**
 * A container that renders its children side-by-side:
 * Left side: Light theme (data-theme removed)
 * Right side: Dark theme (data-theme="dark")
 */
export const ComparisonContainer: React.FC<ComparisonContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 p-4 min-h-[500px]">
      {/* Light Mode Container */}
      <div 
        className="flex-1 border rounded-lg overflow-hidden bg-white text-urvos-ink shadow-sm"
        // Ensure no theme data attribute overrides it to dark if it was set globally
        data-theme="light"
      >
        <div className="bg-urvos-surface-muted p-2 border-b font-medium text-sm flex justify-between items-center">
          <span>Light Mode</span>
          <span className="text-xs text-urvos-text-muted">data-theme="light"</span>
        </div>
        <div className="p-8 bg-urvos-surface h-full">
          {children}
        </div>
      </div>

      {/* Dark Mode Container */}
      <div 
        className="flex-1 border border-urvos-border rounded-lg overflow-hidden bg-[#0D0B1F] text-[#F8FAFC] shadow-sm dark"
        data-theme="dark"
      >
        <div className="bg-[#1A182E] p-2 border-b border-[#2D2A4A] font-medium text-sm flex justify-between items-center">
          <span>Dark Mode</span>
          <span className="text-xs text-gray-400">data-theme="dark"</span>
        </div>
        <div className="p-8 bg-[#0D0B1F] h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
