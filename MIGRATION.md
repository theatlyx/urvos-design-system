# Design Tokens System & Migration Guide

Centralized single source of truth for all Urvos & Nord design decisions. Consumable across **CSS**, **SCSS**, **TypeScript / React**, **JSON**, **Android XML**, and **iOS Swift**.

---

## 🚀 Installation

Install the design tokens package via npm:

```bash
npm install urvos-design-system
# or
npm install @our-tokens
```

---

## 📦 Consumption Methods

### 1. CSS Custom Properties

Import `tokens.css` or `@import 'urvos-design-system/tokens.css'` in your stylesheet or Next.js App Router root layout:

```css
@import "urvos-design-system/tokens.css";

.my-card {
  background-color: var(--n-color-surface);
  color: var(--n-color-text);
  border: 1px solid var(--n-color-border);
  border-radius: var(--n-border-radius-md);
  padding: var(--n-space-space-4);
  box-shadow: var(--n-shadow-card);
}
```

Both `--n-*` (Nordhealth standard format) and `--urvos-*` token aliases are fully supported.

---

### 2. TypeScript / JavaScript

Import strongly typed token constants or raw token maps directly:

```typescript
import { nColorAccent, nSpaceSpace4, nTokens } from "urvos-design-system/tokens";

const headerStyle = {
  color: nColorAccent, // '#0B5B8E'
  padding: nSpaceSpace4, // '16px'
};

console.log(nTokens.color.general.accent.value);
```

---

### 3. SCSS / Sass

Import `tokens.scss` in your Sass pipeline:

```scss
@use "urvos-design-system/tokens" as *;

.my-button {
  background-color: $n-color-accent;
  padding: $n-space-space-4;
}
```

---

### 4. Native Applications (Android & iOS)

- **Android XML**: Available at `urvos-design-system/tokens-android.xml` (`@color/n_color_accent`, `@dimen/n_space_space_4`).
- **iOS JSON / Swift**: Available at `urvos-design-system/tokens-ios.json`.

---

## 🎨 Theme & Dark Mode Switching

Tokens dynamically adapt to light/dark mode and tenant brand themes without changing variable names:

```html
<!-- Light Mode (Default) -->
<html data-theme="light">

<!-- Dark Mode -->
<html data-theme="dark">

<!-- Tenant Brand Themes -->
<body class="theme-therapy"> <!-- Accent automatically switches to Violet -->
<body class="theme-dental">  <!-- Accent automatically switches to Mint -->
<body class="theme-nord">    <!-- Accent automatically switches to Nord Blue -->
```

---

## 🔄 Migration Guide: Hardcoded Values → Tokens

Replace legacy hardcoded CSS hex codes, pixel dimensions, and inline values with their corresponding design token variables:

| Legacy Hardcoded Value | Category | Canonical Token Variable | SCSS Variable | TS Constant |
|---|---|---|---|---|
| `#0B5B8E` | General Color | `var(--n-color-accent)` | `$n-color-accent` | `nColorAccent` |
| `#111322` | Text Color | `var(--n-color-text)` | `$n-color-text` | `nColorTextPrimary` |
| `#5A5E72` | Text Subtle | `var(--n-color-text-subtle)` | `$n-color-text-subtle` | `nColorTextSecondary` |
| `#6B7089` | Text Muted | `var(--n-color-text-muted)` | `$n-color-text-muted` | `nColorTextTertiary` |
| `#E7E9F2` | Border | `var(--n-color-border)` | `$n-color-border` | `nColorBorderDefault` |
| `#F4F5FA` | Background | `var(--n-color-canvas)` | `$n-color-canvas` | `nColorBackgroundCanvas` |
| `#DE3F68` | Danger Signal | `var(--n-color-danger)` | `$n-color-danger` | `nColorStatusDanger` |
| `14px` | Radius | `var(--n-border-radius-md)` | `$n-border-radius-md` | `nBorderRadiusMd` |
| `16px` | Spacing | `var(--n-space-space-4)` | `$n-space-space-4` | `nSpaceSpace4` |
| `20px` | Icon Size | `var(--n-space-iconSize-md)` | `$n-space-iconSize-md` | `nSpaceIconSizeMd` |

---

## 🧪 Testing Integration

Verify WCAG AA/AAA compliance programmatically in Vitest or Jest:

```typescript
import { nColorTextPrimary, nColorBackgroundSurface } from "urvos-design-system/tokens";
import { getContrastRatio } from "../lib/contrast";

test("Primary text passes WCAG AAA contrast ratio on surface background", () => {
  const ratio = getContrastRatio(nColorTextPrimary, nColorBackgroundSurface);
  expect(ratio).toBeGreaterThanOrEqual(7.0); // Pass AAA
});
```
