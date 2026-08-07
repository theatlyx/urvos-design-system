const fs = require("fs");
const path = require("path");

const tokensFilePath = path.join(__dirname, "../tokens/tokens.json");
const rootDir = path.join(__dirname, "..");

if (!fs.existsSync(tokensFilePath)) {
  console.error("tokens.json not found at " + tokensFilePath);
  process.exit(1);
}

const rawData = fs.readFileSync(tokensFilePath, "utf8");
const data = JSON.parse(rawData);
const tokens = data.tokens;

// Helper to convert camelCase/Kebab to camelCase JS identifier
function toCamelCase(str) {
  return str.replace(/[-_]([a-z0-9])/g, (_, g) => g.toUpperCase());
}

// Collect all CSS Custom Properties & SCSS & TS & Native items
let cssVariables = [];
let cssDarkVariables = [];
let scssVariables = [];
let tsConstants = [];
let androidXmlItems = [];
let iosDict = {};

// 1. COLORS
cssVariables.push("  /* ===== COLOR SYSTEM ===== */");
scssVariables.push("// ===== COLOR SYSTEM =====");

Object.entries(tokens.color).forEach(([subGroup, items]) => {
  cssVariables.push(`  /* --- Color: ${subGroup} --- */`);
  Object.entries(items).forEach(([name, def]) => {
    const val = def.value;
    const darkVal = def.darkValue;
    const nAlias = def.nAlias || `--n-color-${subGroup}-${name}`;
    const urvosVar = `--urvos-color-${subGroup}-${name}`;

    cssVariables.push(`  ${nAlias}: ${val};`);
    cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

    if (darkVal) {
      cssDarkVariables.push(`  ${nAlias}: ${darkVal};`);
      cssDarkVariables.push(`  ${urvosVar}: ${darkVal};`);
    }

    const scssName = `$n-color-${subGroup}-${name}`;
    scssVariables.push(`${scssName}: ${val};`);
    scssVariables.push(`$urvos-color-${subGroup}-${name}: ${val};`);

    const tsName = toCamelCase(`n-color-${subGroup}-${name}`);
    tsConstants.push(`export const ${tsName} = "${val}";`);

    androidXmlItems.push(`    <color name="n_color_${subGroup}_${name.replace(/-/g, "_")}">${val}</color>`);
    iosDict[`n_color_${subGroup}_${name}`] = { type: "color", value: val };
  });
});

// 2. TYPOGRAPHY
cssVariables.push("\n  /* ===== TYPOGRAPHY ===== */");
scssVariables.push("\n// ===== TYPOGRAPHY =====");

Object.entries(tokens.typography).forEach(([type, items]) => {
  Object.entries(items).forEach(([name, val]) => {
    const nAlias = `--n-${type}-${name}`;
    const urvosVar = `--urvos-${type}-${name}`;
    cssVariables.push(`  ${nAlias}: ${val};`);
    cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

    const scssName = `$n-${type}-${name}`;
    scssVariables.push(`${scssName}: ${val};`);

    const tsName = toCamelCase(`n-${type}-${name}`);
    tsConstants.push(`export const ${tsName} = "${val}";`);

    iosDict[`n_${type}_${name}`] = { type: "font", value: val };
  });
});

// 3. SPACING & SIZING
cssVariables.push("\n  /* ===== SPACING & SIZING ===== */");
scssVariables.push("\n// ===== SPACING & SIZING =====");

Object.entries(tokens.spacing).forEach(([type, items]) => {
  Object.entries(items).forEach(([name, val]) => {
    const nAlias = `--n-${type}-${name}`;
    const urvosVar = `--urvos-${type}-${name}`;
    cssVariables.push(`  ${nAlias}: ${val};`);
    cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

    const scssName = `$n-${type}-${name}`;
    scssVariables.push(`${scssName}: ${val};`);

    const tsName = toCamelCase(`n-${type}-${name}`);
    tsConstants.push(`export const ${tsName} = "${val}";`);

    if (val.endsWith("px")) {
      androidXmlItems.push(`    <dimen name="n_${type}_${name.replace(/-/g, "_")}">${val}</dimen>`);
    }

    iosDict[`n_${type}_${name}`] = { type: "dimension", value: val };
  });
});

// 4. BORDER & RADIUS
cssVariables.push("\n  /* ===== BORDER & RADIUS ===== */");
scssVariables.push("\n// ===== BORDER & RADIUS =====");

Object.entries(tokens.border).forEach(([type, items]) => {
  Object.entries(items).forEach(([name, val]) => {
    const nAlias = `--n-border-${type}-${name}`;
    const urvosVar = `--urvos-border-${type}-${name}`;
    cssVariables.push(`  ${nAlias}: ${val};`);
    cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

    const scssName = `$n-border-${type}-${name}`;
    scssVariables.push(`${scssName}: ${val};`);

    const tsName = toCamelCase(`n-border-${type}-${name}`);
    tsConstants.push(`export const ${tsName} = "${val}";`);

    iosDict[`n_border_${type}_${name}`] = { type: "border", value: val };
  });
});

// 5. SHADOWS
cssVariables.push("\n  /* ===== SHADOWS ===== */");
scssVariables.push("\n// ===== SHADOWS =====");

Object.entries(tokens.shadow.boxShadow).forEach(([name, val]) => {
  const nAlias = `--n-shadow-${name}`;
  const urvosVar = `--urvos-shadow-${name}`;
  cssVariables.push(`  ${nAlias}: ${val};`);
  cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

  const scssName = `$n-shadow-${name}`;
  scssVariables.push(`${scssName}: ${val};`);

  const tsName = toCamelCase(`n-shadow-${name}`);
  tsConstants.push(`export const ${tsName} = "${val}";`);

  iosDict[`n_shadow_${name}`] = { type: "shadow", value: val };
});

// 6. TRANSITIONS
cssVariables.push("\n  /* ===== TRANSITIONS ===== */");
scssVariables.push("\n// ===== TRANSITIONS =====");

Object.entries(tokens.transition.timing).forEach(([name, val]) => {
  const nAlias = `--n-transition-${name}`;
  const urvosVar = `--urvos-transition-${name}`;
  cssVariables.push(`  ${nAlias}: ${val};`);
  cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

  const scssName = `$n-transition-${name}`;
  scssVariables.push(`${scssName}: ${val};`);

  const tsName = toCamelCase(`n-transition-${name}`);
  tsConstants.push(`export const ${tsName} = "${val}";`);

  iosDict[`n_transition_${name}`] = { type: "transition", value: val };
});

// 7. Z-INDEX
cssVariables.push("\n  /* ===== Z-INDEX SCALE ===== */");
scssVariables.push("\n// ===== Z-INDEX SCALE =====");

Object.entries(tokens.zIndex.scale).forEach(([name, val]) => {
  const nAlias = `--n-z-index-${name}`;
  const urvosVar = `--urvos-z-index-${name}`;
  cssVariables.push(`  ${nAlias}: ${val};`);
  cssVariables.push(`  ${urvosVar}: var(${nAlias});`);

  const scssName = `$n-z-index-${name}`;
  scssVariables.push(`${scssName}: ${val};`);

  const tsName = toCamelCase(`n-z-index-${name}`);
  tsConstants.push(`export const ${tsName} = "${val}";`);

  iosDict[`n_z_index_${name}`] = { type: "zIndex", value: val };
});

// 8. CANONICAL SYSTEM ALIASES REQUIRED BY GLOBALS.CSS & ALL COMPONENTS
cssVariables.push(`
  /* ===== CANONICAL COMPONENT STYLING ALIASES ===== */
  --bg: var(--n-color-canvas);
  --surface: var(--n-color-surface);
  --surface-soft: var(--n-color-surface-soft);
  --border: var(--n-color-border);
  --border-strong: var(--n-color-border-strong);
  --text-1: var(--n-color-text);
  --text-2: var(--n-color-text-subtle);
  --text-3: var(--n-color-text-muted);
  --ink: var(--n-color-ink);

  --brand-1: var(--n-color-accent);
  --brand-2: #1573A3;
  --grad-brand: linear-gradient(120deg, var(--brand-1), var(--brand-2));
  --brand-solid: var(--n-color-accent);
  --brand-tint: #E6F0F6;

  --pulse: var(--n-color-active);
  --pulse-tint: #E4FBF1;

  --urgent: #FF6A2B;
  --urgent-tint: #FFEDE3;

  --tile-violet-bg: var(--n-color-tile-violet-bg);
  --tile-violet-fg: var(--n-color-tile-violet-fg);
  --tile-blue-bg: var(--n-color-tile-blue-bg);
  --tile-blue-fg: var(--n-color-tile-blue-fg);
  --tile-amber-bg: var(--n-color-tile-amber-bg);
  --tile-amber-fg: var(--n-color-tile-amber-fg);
  --tile-rose-bg: var(--n-color-tile-rose-bg);
  --tile-rose-fg: var(--n-color-tile-rose-fg);
  --tile-mint-bg: var(--n-color-tile-mint-bg);
  --tile-mint-fg: var(--n-color-tile-mint-fg);

  --sig-critical: var(--n-color-danger);
  --sig-critical-tint: var(--n-color-danger-weak);
  --sig-critical-dark: var(--n-color-danger-dark);
  --sig-caution: var(--n-color-warning);
  --sig-caution-tint: var(--n-color-warning-weak);
  --sig-caution-dark: var(--n-color-warning-dark);
  --sig-success: var(--n-color-success);
  --sig-success-tint: var(--n-color-success-weak);
  --sig-success-dark: var(--n-color-success-dark);
  --sig-info: var(--n-color-info);
  --sig-info-tint: var(--n-color-info-weak);
  --sig-info-dark: var(--n-color-info-dark);

  --font-ui: var(--n-fontFamily-primary);
  --font-serif: var(--n-fontFamily-serif);
  --font-data: var(--n-fontFamily-mono);

  --r-sm: var(--n-border-radius-sm);
  --r-md: var(--n-border-radius-md);
  --r-lg: var(--n-border-radius-lg);
  --r-xl: var(--n-border-radius-xl);

  --shadow-card: var(--n-shadow-card);
  --shadow-glow: var(--n-shadow-glow);
  --shadow-pop: var(--n-shadow-popout);

  --container-sm: 520px;
  --container-md: 760px;
  --container-lg: 1180px;
  --container-xl: 1360px;
  --content-narrow: var(--container-sm);
  --content-default: var(--container-lg);
  --content-wide: var(--container-xl);

  --space-0: var(--n-space-0);
  --space-1: var(--n-space-1);
  --space-2: var(--n-space-2);
  --space-3: var(--n-space-3);
  --space-4: var(--n-space-4);
  --space-5: var(--n-space-5);
  --space-6: var(--n-space-6);
  --space-8: var(--n-space-8);
  --space-10: var(--n-space-10);
  --space-12: var(--n-space-12);
  --space-16: var(--n-space-16);
  --space-20: var(--n-space-20);

  --z-base: 0;
  --z-dropdown: 20;
  --z-sticky: 40;
  --z-overlay: 60;
  --z-modal: 80;
  --z-toast: 100;

  --focus-ring: 0 0 0 3px var(--n-color-focus-ring);
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
`);

cssDarkVariables.push(`
  --bg: #0D0B1F;
  --surface: #16142A;
  --surface-soft: #1F1D38;
  --border: #2A2D3D;
  --border-strong: #3D4155;
  --text-1: #F4F5FA;
  --text-2: #A3A7BA;
  --text-3: #7E839C;
  --ink: #FFFFFF;
`);

// GENERATE CSS CONTENT
const cssContent = `/* ==========================================================================
   URVOS & NORD DESIGN TOKENS
   Generated automatically from tokens/tokens.json. Do not edit directly.
   ========================================================================== */

:root {
${cssVariables.join("\n")}
}

[data-theme="dark"], .theme-dark {
${cssDarkVariables.join("\n")}
}

/* Tenant & Brand Theme Overrides */
.theme-therapy {
  --n-color-accent: #7C5CFC;
  --n-color-accent-hover: #6941C6;
  --urvos-color-accent: #7C5CFC;
  --brand-solid: #7C5CFC;
  --brand-1: #7C5CFC;
}

.theme-dental {
  --n-color-accent: #0EA968;
  --n-color-accent-hover: #0A7C4C;
  --urvos-color-accent: #0EA968;
  --brand-solid: #0EA968;
  --brand-1: #0EA968;
}

.theme-nord {
  --n-color-accent: #2F6FED;
  --n-color-accent-hover: #1E4FB0;
  --urvos-color-accent: #2F6FED;
  --brand-solid: #2F6FED;
  --brand-1: #2F6FED;
}
`;

// GENERATE SCSS CONTENT
const scssContent = `// ==========================================================================
// URVOS & NORD DESIGN TOKENS (SCSS)
// Generated automatically from tokens/tokens.json. Do not edit directly.
// ==========================================================================

${scssVariables.join("\n")}
`;

// GENERATE TS CONTENT
const tsContent = `// ==========================================================================
// URVOS & NORD DESIGN TOKENS (TypeScript)
// Generated automatically from tokens/tokens.json. Do not edit directly.
// ==========================================================================

${tsConstants.join("\n")}

export const nTokens = ${JSON.stringify(tokens, null, 2)} as const;
export default nTokens;
`;

// GENERATE ANDROID XML
const androidXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generated automatically from tokens/tokens.json. Do not edit directly. -->
<resources>
${androidXmlItems.join("\n")}
</resources>
`;

// GENERATE IOS JSON
const iosJsonContent = JSON.stringify({ name: "UrvosTokens", version: "1.0.0", tokens: iosDict }, null, 2);

// WRITE FILES
fs.writeFileSync(path.join(rootDir, "tokens.css"), cssContent, "utf8");
console.log("✔ Generated tokens.css with canonical component aliases");

fs.writeFileSync(path.join(rootDir, "tokens.scss"), scssContent, "utf8");
console.log("✔ Generated tokens.scss");

fs.writeFileSync(path.join(rootDir, "tokens/index.ts"), tsContent, "utf8");
console.log("✔ Generated tokens/index.ts");

fs.writeFileSync(path.join(rootDir, "tokens.json"), JSON.stringify(tokens, null, 2), "utf8");
console.log("✔ Generated tokens.json");

fs.writeFileSync(path.join(rootDir, "tokens-android.xml"), androidXmlContent, "utf8");
console.log("✔ Generated tokens-android.xml");

fs.writeFileSync(path.join(rootDir, "tokens-ios.json"), iosJsonContent, "utf8");
console.log("✔ Generated tokens-ios.json");
