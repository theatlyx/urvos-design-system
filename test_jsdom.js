const fs = require('fs');
const { JSDOM } = require('jsdom');

const svgData = fs.readFileSync('./components/healthcare/dental/dental-chart-2.svg', 'utf8');
const dom = new JSDOM(svgData, { contentType: 'image/svg+xml' });
const doc = dom.window.document;

// 1. Process all groups matching tooth patterns
const groups = Array.from(doc.querySelectorAll('g'));
groups.forEach(g => {
    const id = g.getAttribute('id') || '';
    const match = id.match(/\b([1-4][1-8])\b/);

    if (match) {
        const toothNum = match[1];
        g.setAttribute('id', toothNum);
        g.setAttribute('class', 'tooth');

        // Remove any text nodes immediately
        Array.from(g.querySelectorAll('text')).forEach(t => t.remove());

        // 2. Unnest nested Figma <g> nodes to expose raw path children directly
        const innerGroups = Array.from(g.querySelectorAll('g'));
        innerGroups.forEach(innerG => {
            while (innerG.firstChild) {
                g.appendChild(innerG.firstChild);
            }
            innerG.remove();
        });

        // 3. Clean up inner path elements AND DELETE SCRIBBLES
        const allPaths = Array.from(g.children).filter(c => c.tagName.toLowerCase() === 'path');
        allPaths.forEach((child, index) => {
            child.removeAttribute('id'); // Keep code lightweight
            
            // Critical fix: A base tooth consists of exactly 5 surfaces + 1 outline = max 6 paths.
            // Any path drawn after these first 6 paths is a scribble/finding drawn on top in Figma.
            // We safely delete any paths beyond the 6th to perfectly clean the tooth!
            if (index >= 6) {
                child.remove();
            }
        });
    }
});

// Clear out fixed root canvas restrictions to enable real responsiveness
const svgRoot = doc.querySelector('svg');
if (svgRoot) {
    svgRoot.removeAttribute('width');
    svgRoot.removeAttribute('height');
    svgRoot.setAttribute('width', '100%');
    svgRoot.setAttribute('height', '100%');
}

// 4. Save clean data directly to your target directory
const finalSvg = doc.querySelector('svg').outerHTML;
fs.writeFileSync('./components/healthcare/dental/clean-chart.svg', finalSvg, 'utf8');
console.log("Successfully flattened inner groups and DELETED scribbles into clean-chart.svg!");
