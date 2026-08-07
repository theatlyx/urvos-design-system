import React, { useCallback } from 'react';
import { clsx } from 'clsx';
import { adultGeometry } from '../geometry/adult';
import { ToothData, ToothSurface } from '../ToothChart';
import { Tooth } from './Tooth';

export interface CustomOdontogramProps {
  className?: string;
  onToothClick?: (toothId: string) => void;
  onSurfaceClick?: (toothId: string, surfaceId: ToothSurface) => void;
  selectedTeeth?: string[]; // array of selected tooth IDs
  teethData?: Record<string, ToothData>; // Used to pass clinical data down
  interactionMode?: 'tooth' | 'surface';
  readOnly?: boolean;
}

export const CustomOdontogram: React.FC<CustomOdontogramProps> = ({
  className,
  onToothClick,
  onSurfaceClick,
  selectedTeeth = [],
  teethData = {},
  interactionMode = 'tooth',
  readOnly = false
}) => {
  const handleToothClick = useCallback((id: string) => {
    if (readOnly) return;
    onToothClick?.(id);
  }, [readOnly, onToothClick]);

  return (
    <svg 
      className={clsx(
        className,
        interactionMode === 'surface' ? 'cursor-crosshair' : 'cursor-pointer'
      )} 
      viewBox="0 0 800 240" 
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', minHeight: 300 }}
    >
      <g className="dentition-layer">
        {Object.values(adultGeometry).map((geom) => {
          const isSelected = selectedTeeth.includes(geom.id);
          const toothData = teethData[geom.id];
          
          return (
            <g 
              key={geom.id} 
              onClick={(e) => {
                // If the click already hit a surface and we're in surface mode, don't trigger the tooth click
                if (interactionMode === 'surface' && (e.target as SVGElement).closest('.surface-path')) {
                  return;
                }
                handleToothClick(geom.id);
              }}
              className="group"
            >
              {/* Selection Highlight background behind the tooth */}
              {isSelected && (
                <rect 
                  x={geom.center.x - 22} 
                  y={geom.center.y - 22} 
                  width={44} 
                  height={44} 
                  rx={8} 
                  fill="var(--urvos-surface-sunken)" 
                  stroke="var(--urvos-primary)"
                  strokeWidth="2"
                  className="pointer-events-none"
                />
              )}
              
              <Tooth 
                geometry={geom} 
                data={toothData}
                interactionMode={interactionMode}
                onSurfaceClick={(surfaceId) => {
                  if (readOnly) return;
                  onSurfaceClick?.(geom.id, surfaceId);
                }}
              />
              
              {/* Invisible hit box for easier clicking */}
              <rect 
                x={geom.center.x - 20} 
                y={geom.center.y - 20} 
                width={40} 
                height={40} 
                fill="transparent"
                className={interactionMode === 'surface' ? 'pointer-events-none' : ''}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
