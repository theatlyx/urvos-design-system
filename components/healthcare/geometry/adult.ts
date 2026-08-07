export type SurfaceName = 'M' | 'O' | 'D' | 'B' | 'L' | 'F' | 'I';

export interface ToothSurfaceGeometry {
  id: SurfaceName;
  path: string; // The SVG path for this specific surface
}

export interface ToothGeometry {
  id: string; // "11", "26", etc.
  outline: string;
  root?: string; // Optional root path
  surfaces: ToothSurfaceGeometry[];
  labelPosition: { x: number; y: number };
  center: { x: number; y: number };
}

// Helper to generate a classic 5-surface box geometry
// Center square is O (or I for anteriors)
// Surrounding trapezoids are M, D, B, L/F
function generateSurfacePaths(x: number, y: number, size: number, isUpper: boolean, isAnterior: boolean) {
  const half = size / 2;
  const innerHalf = size / 4;

  const left = x - half;
  const right = x + half;
  const top = y - half;
  const bottom = y + half;

  const inLeft = x - innerHalf;
  const inRight = x + innerHalf;
  const inTop = y - innerHalf;
  const inBottom = y + innerHalf;

  // The center is always O or I
  const centerPath = `M ${inLeft} ${inTop} L ${inRight} ${inTop} L ${inRight} ${inBottom} L ${inLeft} ${inBottom} Z`;

  // Top trapezoid
  const topPath = `M ${left} ${top} L ${right} ${top} L ${inRight} ${inTop} L ${inLeft} ${inTop} Z`;
  // Bottom trapezoid
  const bottomPath = `M ${left} ${bottom} L ${right} ${bottom} L ${inRight} ${inBottom} L ${inLeft} ${inBottom} Z`;
  // Left trapezoid
  const leftPath = `M ${left} ${top} L ${inLeft} ${inTop} L ${inLeft} ${inBottom} L ${left} ${bottom} Z`;
  // Right trapezoid
  const rightPath = `M ${right} ${top} L ${inRight} ${inTop} L ${inRight} ${inBottom} L ${right} ${bottom} Z`;

  // Map to surface names
  // Usually B (Buccal) is Top for Uppers, Bottom for Lowers
  // L (Lingual) is Bottom for Uppers, Top for Lowers
  // M (Mesial) is Right for Right quadrant (1x, 4x) and Left for Left quadrant (2x, 3x) -> Actually depends on quadrant! We'll handle this in the generator.

  return {
    center: centerPath,
    top: topPath,
    bottom: bottomPath,
    left: leftPath,
    right: rightPath
  };
}

export function generateAdultDentition(): Record<string, ToothGeometry> {
  const teeth: Record<string, ToothGeometry> = {};
  
  const TOOTH_SIZE = 36;
  const GAP = 8;
  const START_X = TOOTH_SIZE / 2;
  const UPPER_Y = 60;
  const LOWER_Y = 160;

  // Quadrants
  // 1: 18 to 11 (Upper Right) - right side of patient, left side of screen
  // 2: 21 to 28 (Upper Left) - left side of patient, right side of screen
  // 4: 48 to 41 (Lower Right)
  // 3: 31 to 38 (Lower Left)

  const quadrants = [
    { prefix: 1, y: UPPER_Y, isUpper: true, ids: [8, 7, 6, 5, 4, 3, 2, 1] },
    { prefix: 2, y: UPPER_Y, isUpper: true, ids: [1, 2, 3, 4, 5, 6, 7, 8] },
    { prefix: 4, y: LOWER_Y, isUpper: false, ids: [8, 7, 6, 5, 4, 3, 2, 1] },
    { prefix: 3, y: LOWER_Y, isUpper: false, ids: [1, 2, 3, 4, 5, 6, 7, 8] },
  ];

  let currentX = START_X;

  quadrants.forEach((q, qIndex) => {
    // Reset X for bottom row
    if (qIndex === 2) currentX = START_X;

    q.ids.forEach((id) => {
      const isAnterior = id <= 3;
      const isLeftQuadrant = q.prefix === 2 || q.prefix === 3;
      
      const fullId = `${q.prefix}${id}`;
      
      const paths = generateSurfacePaths(currentX, q.y, TOOTH_SIZE, q.isUpper, isAnterior);

      // Map paths to standard surfaces M, O, D, B, L
      const buccalPath = q.isUpper ? paths.top : paths.bottom;
      const lingualPath = q.isUpper ? paths.bottom : paths.top;
      
      // Mesial is towards the midline. 
      // For Q1, Q4 (Right), midline is on the right side of their group -> Mesial is right.
      // For Q2, Q3 (Left), midline is on the left side of their group -> Mesial is left.
      const mesialPath = isLeftQuadrant ? paths.left : paths.right;
      const distalPath = isLeftQuadrant ? paths.right : paths.left;
      const occlusalPath = paths.center; // or I

      const surfaces: ToothSurfaceGeometry[] = [
        { id: isAnterior ? 'I' : 'O', path: occlusalPath },
        { id: 'M', path: mesialPath },
        { id: 'D', path: distalPath },
        { id: isAnterior ? 'F' : 'B', path: buccalPath },
        { id: 'L', path: lingualPath }
      ];

      // Outline path (full square)
      const half = TOOTH_SIZE / 2;
      const outline = `M ${currentX - half} ${q.y - half} L ${currentX + half} ${q.y - half} L ${currentX + half} ${q.y + half} L ${currentX - half} ${q.y + half} Z`;

      teeth[fullId] = {
        id: fullId,
        center: { x: currentX, y: q.y },
        outline,
        surfaces,
        labelPosition: { x: currentX, y: q.isUpper ? q.y - TOOTH_SIZE + 4 : q.y + TOOTH_SIZE - 4 }
      };

      currentX += TOOTH_SIZE + GAP;
      
      // Add extra gap at midline
      if (id === 1 && (q.prefix === 1 || q.prefix === 4)) {
        currentX += GAP * 2;
      }
    });
  });

  return teeth;
}

export const adultGeometry = generateAdultDentition();
