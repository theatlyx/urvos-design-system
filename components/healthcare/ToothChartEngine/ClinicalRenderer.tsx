import React from 'react';
import { ToothGeometry } from '../geometry/adult';
import { ToothDisplayModel } from './useToothDisplayModel';

interface Props {
  geometry: ToothGeometry;
  globalConditions: ToothDisplayModel['globalConditions'];
}

export const ClinicalRenderer: React.FC<Props> = ({ geometry, globalConditions }) => {
  const { isMissing, missingColor, isExtPlanned, extPlannedColor, crown, rootCanal, implant } = globalConditions;

  const cx = geometry.center.x;
  const cy = geometry.center.y;
  const size = 36;
  const half = size / 2;
  const rootY = cy + (geometry.id.startsWith('1') || geometry.id.startsWith('2') ? -size : size);

  return (
    <g className="clinical-renderer pointer-events-none">
      {/* Crown */}
      {crown && (
        <rect 
          x={cx - half - 2} 
          y={cy - half - 2} 
          width={size + 4} 
          height={size + 4} 
          fill="none"
          stroke={crown.color}
          strokeWidth="3"
          rx="4"
        />
      )}

      {/* Root Canal */}
      {rootCanal && (
        <line 
          x1={cx} 
          y1={cy} 
          x2={cx} 
          y2={rootY} 
          stroke={rootCanal.color}
          strokeWidth="3"
        />
      )}

      {/* Implant */}
      {implant && (
        <path 
          d={`M ${cx - 4} ${rootY} L ${cx + 4} ${rootY} L ${cx} ${cy} Z`}
          fill={implant.color}
        />
      )}

      {/* Missing - Gray X */}
      {isMissing && (
        <g stroke={missingColor || "var(--urvos-color-clinical-missing)"} strokeWidth="3" strokeLinecap="round">
          <line x1={cx - half} y1={cy - half} x2={cx + half} y2={cy + half} />
          <line x1={cx + half} y1={cy - half} x2={cx - half} y2={cy + half} />
        </g>
      )}

      {/* Extraction Planned - Red X */}
      {isExtPlanned && !isMissing && (
        <g stroke={extPlannedColor || "var(--urvos-color-clinical-planned)"} strokeWidth="3" strokeLinecap="round">
          <line x1={cx - half} y1={cy - half} x2={cx + half} y2={cy + half} />
          <line x1={cx + half} y1={cy - half} x2={cx - half} y2={cy + half} />
        </g>
      )}
    </g>
  );
};
