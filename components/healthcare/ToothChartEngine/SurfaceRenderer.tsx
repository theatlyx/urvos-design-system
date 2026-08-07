import React from 'react';
import { ToothGeometry } from '../geometry/adult';
import { ToothSurface } from '../ToothChart';
import { clsx } from 'clsx';

interface Props {
  geometry: ToothGeometry;
  interactionMode?: 'tooth' | 'surface';
  onSurfaceClick?: (surfaceId: ToothSurface) => void;
  surfaceFills?: Partial<Record<ToothSurface, string>>;
}

export const SurfaceRenderer: React.FC<Props> = ({ geometry, interactionMode = 'tooth', onSurfaceClick, surfaceFills = {} }) => {
  const [hoveredSurface, setHoveredSurface] = React.useState<string | null>(null);

  return (
    <g className="surface-renderer">
      {geometry.surfaces.map((surface) => {
        const isHovered = interactionMode === 'surface' && hoveredSurface === surface.id;
        const baseFill = surfaceFills[surface.id as ToothSurface] || "var(--urvos-color-background-surface)";

        return (
          <path
            key={surface.id}
            d={surface.path}
            fill={baseFill}
            stroke="var(--urvos-color-border-strong)"
            strokeWidth="1"
            className={clsx(
              "surface-path transition-colors duration-200",
              interactionMode === 'surface' && "cursor-crosshair"
            )}
            style={isHovered ? { fill: 'var(--active-hover-color)', opacity: 0.7 } : {}}
            onMouseEnter={() => setHoveredSurface(surface.id)}
            onMouseLeave={() => setHoveredSurface(null)}
            onClick={(e) => {
              if (interactionMode === 'surface') {
                e.stopPropagation(); // prevent bubbling to the tooth group if handled here
                onSurfaceClick?.(surface.id as ToothSurface);
              }
            }}
          />
        );
      })}
    </g>
  );
};
