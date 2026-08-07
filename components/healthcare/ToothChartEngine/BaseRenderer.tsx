import React from 'react';
import { ToothGeometry } from '../geometry/adult';

interface Props {
  geometry: ToothGeometry;
}

export const BaseRenderer: React.FC<Props> = ({ geometry }) => {
  return (
    <g className="base-renderer pointer-events-none">
      <path 
        d={geometry.outline} 
        fill="none" 
        stroke="var(--border)" 
        strokeWidth="1" 
      />
      <text
        x={geometry.labelPosition.x}
        y={geometry.labelPosition.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--text-2)"
        fontSize="12"
        fontWeight="500"
      >
        {geometry.id}
      </text>
    </g>
  );
};
