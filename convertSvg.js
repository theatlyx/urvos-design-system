const fs = require('fs');

const svgStr = fs.readFileSync('components/healthcare/dental-chart-2.svg', 'utf8');

let jsx = svgStr.replace(/<g\s+id="([^"]+)"/g, '<g onClick={(e) => { e.stopPropagation(); onClick?.("$1"); }} id="$1"');

jsx = jsx.replace(/fill-rule/g, 'fillRule');
jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
jsx = jsx.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
jsx = jsx.replace(/xml:space/g, 'xmlSpace');
jsx = jsx.replace(/xmlns:xlink/g, 'xmlnsXlink');
jsx = jsx.replace(/class=/g, 'className=');

jsx = jsx.replace(/<svg /, '<svg width="100%" height="100%" ');

jsx = jsx.replace(
    /<g onClick=\{\(e\) => \{ e\.stopPropagation\(\); onClick\?\("\$1"\); \}\} id="([^"]+)"/g,
    '<g onClick={(e) => { e.stopPropagation(); onClick?.("$1"); }} id="$1" style={{ fill: toothState && toothState["$1"] ? toothState["$1"] : undefined, outline: mappedId === "$1" ? "2px solid red" : "none", cursor: "pointer" }} '
);

jsx = jsx.replace(/fill="[^"]*"/g, '');

const componentCode = `
import React from 'react';

interface Props {
  onClick?: (id: string) => void;
  toothState?: Record<string, string>;
  mappedId?: string;
  className?: string;
}

export const RawDentalChartSVG: React.FC<Props> = ({ onClick, toothState, mappedId, className }) => {
  return (
    <div className={className}>
      ${jsx}
    </div>
  );
};
`;

fs.writeFileSync('components/healthcare/RawDentalChartSVG.tsx', componentCode);
console.log('Done!');
