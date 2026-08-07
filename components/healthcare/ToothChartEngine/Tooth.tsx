import React from 'react';
import { ToothGeometry } from '../geometry/adult';
import { BaseRenderer } from './BaseRenderer';
import { SurfaceRenderer } from './SurfaceRenderer';
import { ClinicalRenderer } from './ClinicalRenderer';
import { ToothData, ToothSurface } from '../ToothChart';
import { useToothDisplayModel } from './useToothDisplayModel';

interface ToothProps {
  geometry: ToothGeometry;
  data?: ToothData;
  interactionMode?: 'tooth' | 'surface';
  onSurfaceClick?: (surfaceId: ToothSurface) => void;
}

export const Tooth: React.FC<ToothProps> = React.memo(({ geometry, data, interactionMode = 'tooth', onSurfaceClick }) => {
  const displayModel = useToothDisplayModel(data);

  return (
    <g id={`tooth-${geometry.id}`} className="tooth-group relative">
      {/* Badges */}
      {displayModel.badges.findingsCount > 0 && (
        <g transform={`translate(${geometry.center.x - 12}, ${geometry.id.startsWith('1') || geometry.id.startsWith('2') ? geometry.center.y - 45 : geometry.center.y + 45})`}>
          <circle cx="0" cy="0" r="8" fill="var(--urvos-color-status-danger)" />
          <text x="0" y="3" fontSize="10" fill="var(--urvos-color-background-surface)" textAnchor="middle" fontWeight="bold">{displayModel.badges.findingsCount}</text>
        </g>
      )}
      {displayModel.badges.notesCount > 0 && (
        <g transform={`translate(${geometry.center.x + 12}, ${geometry.id.startsWith('1') || geometry.id.startsWith('2') ? geometry.center.y - 45 : geometry.center.y + 45})`}>
          <circle cx="0" cy="0" r="8" fill="var(--urvos-color-status-info)" />
          <text x="0" y="3" fontSize="10" fill="var(--urvos-color-background-surface)" textAnchor="middle" fontWeight="bold">N</text>
        </g>
      )}

      <BaseRenderer geometry={geometry} />
      <SurfaceRenderer 
        geometry={geometry} 
        interactionMode={interactionMode}
        onSurfaceClick={onSurfaceClick}
        surfaceFills={displayModel.surfaceFills}
      />
      <ClinicalRenderer geometry={geometry} globalConditions={displayModel.globalConditions} />
    </g>
  );
});

Tooth.displayName = 'Tooth';
