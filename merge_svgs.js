const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// 1. Build a coordinate map from the original full chart
const fullChartContent = fs.readFileSync('./components/healthcare/dental/dental-chart-2.svg', 'utf8');
const fullDom = new JSDOM(fullChartContent, { contentType: "text/xml" });
const fullDoc = fullDom.window.document;

const coordinateMap = {};
const fullDentalChart = fullDoc.querySelector('g[id="dental-chart-2"]');
if (fullDentalChart) {
  for (const child of fullDentalChart.children) {
    if (child.tagName === 'g' && /^\d{2}---/.test(child.id)) {
      const toothNumber = child.id.substring(0, 2);
      coordinateMap[toothNumber] = child.getAttribute('transform');
    }
  }
}

// 2. Parse individual files
const teethDir = './components/healthcare/dental/teeth-number-name/';
const files = fs.readdirSync(teethDir).filter(f => f.endsWith('.svg'));

let mergedGroups = '';
let count = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(teethDir, file), 'utf8');
  const dom = new JSDOM(content, { contentType: "text/xml" });
  const document = dom.window.document;
  
  const dentalChart = document.querySelector('g[id="dental-chart-2"]');
  if (!dentalChart) continue;
  
  let toothGroup = null;
  for (const child of dentalChart.children) {
    if (child.tagName === 'g' && /^\d{2}---/.test(child.id)) {
      toothGroup = child;
      break;
    }
  }
  if (!toothGroup) continue;

  const toothNumber = toothGroup.id.substring(0, 2);
  const correctTransform = coordinateMap[toothNumber] || toothGroup.getAttribute('transform');

  // To drop the "extra strokes" (findings), we ONLY extract the base tooth group (e.g. Group-14)
  // which is typically the first <g> child of the toothGroup.
  let baseTooth = null;
  for (const child of toothGroup.children) {
    if (child.tagName === 'g' && child.id.startsWith('Group-')) {
      baseTooth = child;
      break;
    }
  }
  
  // If we couldn't find a Group-, fallback to the whole toothGroup, but ideally we find it
  let nodeToExtract = baseTooth || toothGroup;

  let innerHtml = nodeToExtract.outerHTML;
  innerHtml = innerHtml.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, '');
  
  // React conversions
  innerHtml = innerHtml.replace(/fill-rule="/g, 'fillRule="');
  innerHtml = innerHtml.replace(/font-family="/g, 'fontFamily="');
  innerHtml = innerHtml.replace(/font-size="/g, 'fontSize="');
  innerHtml = innerHtml.replace(/font-weight="/g, 'fontWeight="');
  innerHtml = innerHtml.replace(/clip-path="/g, 'clipPath="');
  innerHtml = innerHtml.replace(/class="/g, 'className="');
  
  let wrapperHtml = `<g id="dental-chart-2-wrapper-${toothNumber}" fill="#000000">\n${innerHtml}\n</g>`;
  
  mergedGroups += `
      <g 
        id="tooth-wrapper-${toothNumber}" 
        transform="${correctTransform}"
        onClick={(e) => { e.stopPropagation(); onClick?.("${toothNumber}"); }}
      >
        ${wrapperHtml}
      </g>
`;
  count++;
}

console.log(`Parsed ${count} teeth from the individual files.`);

const componentCode = `import React from 'react';

interface DentalChartSVGProps {
  selectedTeeth?: string[];
  onClick?: (toothId: string) => void;
  className?: string;
  strokeWidth?: number;
}

export const UnifiedDentalChartSVG: React.FC<DentalChartSVGProps> = ({
  selectedTeeth = [],
  onClick,
  className = "",
  strokeWidth = 2
}) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 4806 2744" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        ${mergedGroups}
      </g>
    </svg>
  );
};
`;

fs.writeFileSync('./components/healthcare/UnifiedDentalChartSVG.tsx', componentCode);
console.log('Successfully generated UnifiedDentalChartSVG.tsx');

