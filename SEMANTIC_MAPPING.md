# Semantic Mapping Reference

This document serves as the single source of truth for the token migration in the Urvos Design System. Do not use hardcoded colors, borders, shadows, or typography sizes. Always map them to the `urvos-*` equivalents defined below.

## 🎨 Colors & Backgrounds

| Hardcoded Utility | Urvos Semantic Equivalent | Rationale / Usage |
| :--- | :--- | :--- |
| `bg-white`, `bg-gray-50` | `bg-urvos-surface` | Default background for cards, panels, and most containers. |
| `bg-slate-50`, `bg-gray-100` | `bg-urvos-surface-alt` / `bg-urvos-surface-muted` | Slightly darker background for nested areas, distinct from the main surface. |
| `bg-blue-600`, `bg-[#0B5B8E]` | `bg-urvos-primary` | The primary brand action color (buttons, active tabs, main accents). |
| `bg-emerald-500/10` | `bg-urvos-success-bg` | A tinted background for success states, alerts, or positive indicators. |
| `bg-red-500/10` | `bg-urvos-danger-bg` | A tinted background for errors, destructive actions, or warnings. |

*What not to do:* Do not use `bg-urvos-primary` for the background of a whole page just because it's a light theme. Primary means "brand accent".

## 🚦 Status & Semantic Mappings

When dealing with specific clinical signals, colors mean everything. Always use the semantic status tokens rather than hardcoded RGB/HEX.

| Hardcoded Utility (e.g., text, border, bg) | Urvos Semantic Equivalent | Rationale / Usage |
| :--- | :--- | :--- |
| `green-600`, `emerald-500` | `urvos-success` | Success alerts, completed items, normal lab values. |
| `green-100`, `emerald-50` | `urvos-success-bg` | Backgrounds for success banners and badges. |
| `red-600`, `rose-500` | `urvos-danger` | Critical alerts, destructive actions, high-risk flags. |
| `red-100`, `rose-50` | `urvos-danger-bg` | Backgrounds for critical banners and error states. |
| `yellow-600`, `amber-500` | `urvos-warning` | Cautionary warnings, pending items, moderate risk. |
| `yellow-100`, `amber-50` | `urvos-warning-bg` | Backgrounds for warning banners and badges. |
| `blue-600`, `sky-500` | `urvos-info` | Informational messages, standard highlights. |
| `blue-100`, `sky-50` | `urvos-info-bg` | Backgrounds for standard info banners and badges. |

## 🖋️ Typography

| Hardcoded Utility | Urvos Semantic Equivalent | Rationale / Usage |
| :--- | :--- | :--- |
| `text-slate-900`, `text-black` | `text-urvos-ink` | Highest contrast text. Use for primary headings and critical data. |
| `text-slate-700`, `text-gray-800` | `text-urvos-text` | Standard body text. High contrast but softer than pure ink. |
| `text-slate-500`, `text-gray-500` | `text-urvos-text-subtle` | Secondary text, metadata, timestamps, helper text. |
| `text-slate-400` | `text-urvos-text-muted` | Disabled text, placeholders, very low emphasis details. |
| `text-blue-600`, `text-[#0B5B8E]` | `text-urvos-primary` | Links, active tab text, or primary brand highlights. |

## 📐 Borders & Dividers

| Hardcoded Utility | Urvos Semantic Equivalent | Rationale / Usage |
| :--- | :--- | :--- |
| `border-slate-200`, `border-gray-200` | `border-urvos-border` | Default structural borders, dividers between list items. |
| `border-slate-300`, `border-gray-300` | `border-urvos-border-strong` | Higher contrast borders, often for inputs or active elements. |
| `rounded-xl`, `rounded-lg` | `rounded-urvos-lg` / `rounded-urvos-md` | Use the semantic radius tokens to ensure consistency. |

## ☁️ Shadows & Elevation

| Hardcoded Utility | Urvos Semantic Equivalent | Rationale / Usage |
| :--- | :--- | :--- |
| `shadow-sm`, `shadow` | `shadow-urvos-soft` | Default resting shadow for cards and standard elements. |
| `shadow-md`, `shadow-lg` | `shadow-urvos-hover` | Hover states, or elements that sit higher (like dropdowns/popovers). |

---

### Special Handling for External Libraries

- **Recharts**: Pass CSS variables directly (e.g., `stroke="var(--brand-solid)"`).
- **Radix UI Portals**: The `ThemeProvider` injects `data-theme="dark"` onto `document.documentElement`, ensuring portals automatically inherit the correct CSS variables.
