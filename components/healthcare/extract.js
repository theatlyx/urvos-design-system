const fs = require('fs');
const html = fs.readFileSync('components/healthcare/extracted-odontogram.html', 'utf8');

const teethMatches = [...html.matchAll(/<g class=\"teeth-(\d+)[^\>]*>(.*?)<\/g>/g)];

let teethPaths = {};
teethMatches.forEach(match => {
  const toothId = match[1];
  let inner = match[2];
  inner = inner.replace(/stroke-width/g, 'strokeWidth')
               .replace(/stroke-linecap/g, 'strokeLinecap')
               .replace(/stroke-linejoin/g, 'strokeLinejoin')
               .replace(/fill-rule/g, 'fillRule')
               .replace(/clip-rule/g, 'clipRule')
               .replace(/<title>\d+<\/title>/, '');
  
  inner = inner.replace(/fill=\"currentColor\"/g, 'fill={fill}')
               .replace(/stroke=\"currentColor\"/g, 'stroke={stroke}');

  teethPaths[toothId] = inner;
});

let componentCode = `import React from 'react';

interface ToothProps {
  id: string;
  fill?: string;
  stroke?: string;
  onClick?: () => void;
  className?: string;
}

const teethData: Record<string, React.FC<Omit<ToothProps, 'id'>>> = {
`;

for (const [id, paths] of Object.entries(teethPaths)) {
  componentCode += `  "${id}": ({ fill = 'transparent', stroke = 'currentColor', onClick, className }) => (
    <g id={"tooth-${id}"} onClick={onClick} className={className} style={{cursor: 'pointer'}}>
      ${paths}
    </g>
  ),
`;
}

componentCode += `};

export const CustomToothChartSVG: React.FC<{
  toothState: Record<string, { fill?: string; stroke?: string }>;
  onToothClick: (id: string) => void;
}> = ({ toothState, onToothClick }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 409 694" className="w-full h-auto max-h-[600px]">
      {Object.entries(teethData).map(([id, ToothComponent]) => {
        const state = toothState[id] || { fill: 'transparent', stroke: 'currentColor' };
        return (
          <ToothComponent 
            key={id} 
            fill={state.fill} 
            stroke={state.stroke} 
            onClick={() => onToothClick(id)} 
          />
        );
      })}
    </svg>
  );
};
`;

fs.writeFileSync('components/healthcare/CustomToothChartSVG.tsx', componentCode);
console.log('Generated CustomToothChartSVG.tsx successfully.');
