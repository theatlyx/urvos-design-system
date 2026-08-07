const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../components/healthcare');

// Regex to find standard Tailwind colors (e.g., bg-red-500, text-slate-800, border-gray-200)
// as well as arbitrary values (e.g., bg-[#0B5B8E], text-white)
// It deliberately ignores urvos-* classes
const hardcodedRegex = /\b(bg|text|border|ring|shadow|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}(?:\/\d+)?\b|\b(bg|text|border|ring|shadow|fill|stroke)-(white|black|transparent|current)\b|\b(bg|text|border|ring|shadow|fill|stroke)-\[#[a-fA-F0-9]{3,8}\]/g;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const results = [];

walkDir(COMPONENTS_DIR, function(filePath) {
  if (filePath.endsWith('.tsx') && !filePath.includes('.stories.')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
      let match;
      while ((match = hardcodedRegex.exec(line)) !== null) {
        results.push({
          file: path.basename(filePath),
          class: match[0],
          line: idx + 1
        });
      }
    });
  }
});

// Write CSV
const csvHeader = "Component,Hardcoded Class,Line Number\n";
const csvRows = results.map(r => `${r.file},${r.class},${r.line}`).join('\n');
fs.writeFileSync(path.join(__dirname, '../audit-results.csv'), csvHeader + csvRows);

// Generate Sample Batch Report for Patient-Facing Components
const patientFacing = ['PatientBanner.tsx', 'PatientSummary.tsx', 'PatientSearch.tsx', 'PatientTimeline.tsx', 'PatientPortal.tsx'];
const sampleMatches = results.filter(r => patientFacing.includes(r.file));

console.log("### Sample Batch Report (Patient-Facing Components)\n");
console.log("| Component | Hardcoded Class | Line Number |");
console.log("| :--- | :--- | :--- |");
sampleMatches.slice(0, 15).forEach(r => {
  console.log(`| ${r.file} | \`${r.class}\` | ${r.line} |`);
});
if (sampleMatches.length > 15) {
  console.log(`| ... and ${sampleMatches.length - 15} more instances | | |`);
}
console.log(`\nAudit completed! Found ${results.length} hardcoded utilities. Full CSV saved to audit-results.csv`);
