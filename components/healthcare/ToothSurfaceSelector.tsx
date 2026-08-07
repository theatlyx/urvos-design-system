import React from 'react';
import { clsx } from 'clsx';
import { ToothSurface as Surface } from './ToothChart';

interface ToothSurfaceSelectorProps {
  selectedSurfaces: Surface[];
  onChange: (surfaces: Surface[]) => void;
  className?: string;
}

export const ToothSurfaceSelector = ({
  selectedSurfaces,
  onChange,
  className
}: ToothSurfaceSelectorProps) => {
  const toggleSurface = (surface: Surface) => {
    if (selectedSurfaces.includes(surface)) {
      onChange(selectedSurfaces.filter(s => s !== surface));
    } else {
      onChange([...selectedSurfaces, surface]);
    }
  };

  const isSelected = (surface: Surface) => selectedSurfaces.includes(surface);

  return (
    <div className={clsx("relative w-24 h-24 mx-auto", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Buccal/Facial (Top) */}
        <path
          d="M 20 20 L 80 20 L 65 35 L 35 35 Z"
          fill={isSelected('B') ? "#60a5fa" : "#ffffff"}
          stroke="#94a3b8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-100 transition-colors"
          onClick={() => toggleSurface('B')}
        />
        {/* Lingual (Bottom) */}
        <path
          d="M 35 65 L 65 65 L 80 80 L 20 80 Z"
          fill={isSelected('L') ? "#60a5fa" : "#ffffff"}
          stroke="#94a3b8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-100 transition-colors"
          onClick={() => toggleSurface('L')}
        />
        {/* Mesial (Left) */}
        <path
          d="M 20 20 L 35 35 L 35 65 L 20 80 Z"
          fill={isSelected('M') ? "#60a5fa" : "#ffffff"}
          stroke="#94a3b8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-100 transition-colors"
          onClick={() => toggleSurface('M')}
        />
        {/* Distal (Right) */}
        <path
          d="M 80 20 L 80 80 L 65 65 L 65 35 Z"
          fill={isSelected('D') ? "#60a5fa" : "#ffffff"}
          stroke="#94a3b8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-100 transition-colors"
          onClick={() => toggleSurface('D')}
        />
        {/* Occlusal (Center) */}
        <rect
          x="35"
          y="35"
          width="30"
          height="30"
          fill={isSelected('O') ? "#60a5fa" : "#ffffff"}
          stroke="#94a3b8"
          strokeWidth="2"
          className="cursor-pointer hover:fill-blue-100 transition-colors"
          onClick={() => toggleSurface('O')}
        />
      </svg>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <span className="text-[10px] font-bold text-slate-400 absolute top-2">B</span>
        <span className="text-[10px] font-bold text-slate-400 absolute bottom-2">L</span>
        <span className="text-[10px] font-bold text-slate-400 absolute left-2">M</span>
        <span className="text-[10px] font-bold text-slate-400 absolute right-2">D</span>
        <span className="text-[10px] font-bold text-slate-600">O</span>
      </div>
    </div>
  );
};
