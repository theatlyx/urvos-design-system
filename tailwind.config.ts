import type { Config } from "tailwindcss";

/**
 * Urvos Clinical OS — Tailwind mapping.
 * Every value here should trace back to tokens.css. If a designer changes a
 * token, this file (or better, a CSS-var passthrough as done below) should
 * not need a second edit — that's why most entries reference var(--x)
 * rather than hardcoding hex values a second time.
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Real design system tokens (from tokens.css) ──────────────────
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        text: {
          1: "var(--text-1)",
          2: "var(--text-2)",
          3: "var(--text-3)",
        },
        ink: "var(--ink)",
        brand: {
          1: "var(--brand-1)",
          2: "var(--brand-2)",
          DEFAULT: "var(--brand-solid)",
          tint: "var(--brand-tint)",
        },
        pulse: {
          DEFAULT: "var(--pulse)",
          tint: "var(--pulse-tint)",
        },
        urgent: {
          DEFAULT: "var(--urgent)",
          tint: "var(--urgent-tint)",
        },
        signal: {
          critical: { DEFAULT: "var(--sig-critical)", tint: "var(--sig-critical-tint)", dark: "var(--sig-critical-dark)" },
          caution: { DEFAULT: "var(--sig-caution)", tint: "var(--sig-caution-tint)", dark: "var(--sig-caution-dark)" },
          success: { DEFAULT: "var(--sig-success)", tint: "var(--sig-success-tint)", dark: "var(--sig-success-dark)" },
          info: { DEFAULT: "var(--sig-info)", tint: "var(--sig-info-tint)", dark: "var(--sig-info-dark)" },
        },
        tile: {
          violet: { bg: "var(--tile-violet-bg)", fg: "var(--tile-violet-fg)" },
          blue: { bg: "var(--tile-blue-bg)", fg: "var(--tile-blue-fg)" },
          amber: { bg: "var(--tile-amber-bg)", fg: "var(--tile-amber-fg)" },
          rose: { bg: "var(--tile-rose-bg)", fg: "var(--tile-rose-fg)" },
          mint: { bg: "var(--tile-mint-bg)", fg: "var(--tile-mint-fg)" },
        },
        // ── urvos-* aliases (used by globals.css @apply directives) ───────
        // These map directly to the same tokens.css variables above so the
        // two naming conventions produce identical output.
        "urvos-primary":       "var(--brand-solid)",
        "urvos-primary-hover": "var(--brand-1)",
        "urvos-surface":       "var(--surface)",
        "urvos-surface-alt":   "var(--surface-soft)",
        "urvos-surface-muted": "var(--surface-soft)",
        "urvos-ink":           "var(--text-1)",
        "urvos-ink-light":     "var(--text-2)",
        "urvos-text":          "var(--text-1)",
        "urvos-text-subtle":   "var(--text-2)",
        "urvos-text-muted":    "var(--text-3)",
        "urvos-text-inverse":  "#ffffff",
        "urvos-success":       "var(--sig-success)",
        "urvos-success-bg":    "var(--sig-success-tint)",
        "urvos-warning":       "var(--sig-caution)",
        "urvos-warning-bg":    "var(--sig-caution-tint)",
        "urvos-danger":        "var(--sig-critical)",
        "urvos-danger-bg":     "var(--sig-critical-tint)",
        "urvos-border":        "var(--border)",
        "urvos-glass":         "var(--brand-tint)",
        // ── Clinical semantic tokens ─────────────────────────────────────
        "clinical-planned": "var(--urvos-color-clinical-planned)",
        "clinical-completed": "var(--urvos-color-clinical-completed)",
        "clinical-existing": "var(--urvos-color-clinical-existing)",
        "clinical-in-progress": "var(--urvos-color-clinical-in-progress)",
        "clinical-watch": "var(--urvos-color-clinical-watch)",
        "clinical-caries": "var(--urvos-color-clinical-caries)",
        "clinical-missing": "var(--urvos-color-clinical-missing)",
        "clinical-fracture": "var(--urvos-color-clinical-fracture)",
        "clinical-impacted": "var(--urvos-color-clinical-impacted)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(120deg, var(--brand-1), var(--brand-2))",
      },
      fontFamily: {
        ui: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        serif: ["Fraunces", "serif"],
        data: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        // urvos-* aliases used by globals.css @apply
        "urvos-sm":   "var(--r-sm)",
        "urvos-md":   "var(--r-md)",
        "urvos-lg":   "var(--r-lg)",
        "urvos-full": "9999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        pop: "var(--shadow-pop)",
        focus: "var(--focus-ring)",
        // urvos-* aliases used by globals.css @apply
        "urvos-soft":  "var(--shadow-card)",
        "urvos-hover": "var(--shadow-pop)",
        "urvos-inner": "inset 0 2px 4px 0 rgba(0,0,0,0.03)",
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
        tooltip: "var(--z-tooltip)",
      },
      transitionDuration: {
        fast: "120ms",
        normal: "200ms",
        slow: "320ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      maxWidth: {
        "content-narrow": "var(--content-narrow)",
        "content-default": "var(--content-default)",
        "content-wide": "var(--content-wide)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        // Urvos-specific aliases matching the breakpoint table in Volume 6
        tablet: "768px",
        desktop: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
