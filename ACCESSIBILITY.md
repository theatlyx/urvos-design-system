# Accessibility — Urvos Clinical OS

Honest status as of this pass, not a checklist pretending everything's solved.

## Color contrast — audited, one real bug fixed

| Token | Old | New | Ratio (on white) | Status |
|---|---|---|---|---|
| `--text-3` | `#9598A9` | `#6B7089` | 2.86:1 → **4.88:1** | Was failing AA even for large text (needs 3:1). Now passes AA for normal text down to 11px. |
| `--text-2` | `#5A5E72` | unchanged | 6.4:1 | Already passing, no change needed. |
| `--sig-critical` on `--sig-critical-tint` | — | uses `--sig-critical-dark` for text | verify per-pairing | The tint/base/dark three-step system exists specifically so badge text on a tinted background always clears AA — never hand-pair a `base` tone as text color on its own `tint` background, it will usually fail. |

**Every other color pairing in the system should be spot-checked the same way before shipping** — this pass fixed the one bug that was reported, it isn't a guarantee every combination across all 8 volumes has been individually verified. Treat `npx @axe-core/cli` or a Stark/Polypane pass over the real rendered app as a required step before pilot, not optional.

## Focus indicators

- `:focus-visible` is set globally in `tokens.css` using `--focus-ring` (`0 0 0 3px rgba(79,63,224,0.35)`), replacing every hardcoded `3px` ring that existed ad hoc across volumes.
- The React `<Modal>` component implements a real focus trap (Tab/Shift+Tab cycles within the dialog, Escape closes unless `requireExplicitDismiss`, focus restores to the trigger element on close).
- `<Switch>` requires an explicit `aria-label` prop — it will not compile without one, on purpose.

## Dark mode

- `tokens.css` now has a `[data-theme="dark"]` block with dedicated dark values (not an inverted light theme) for `--bg`, `--surface`, `--text-*`, and tinted signal backgrounds.
- `--text-3` in dark mode (`#8A85B8` on `--surface: #171432`) has **not been formally contrast-checked** in this pass — do that before relying on it for body text in dark mode.
- Only Volume 1 (dashboard) and the "AI SaaS dark mode canvas" component in Volume 6 demonstrate dark surfaces today. None of the 8 HTML volumes are fully dark-mode-toggleable — that's still a real build task, not just a token exercise.

## Reduced motion

- A global `@media (prefers-reduced-motion: reduce)` block in `tokens.css` collapses all animation/transition durations to near-zero. This covers the pulse-line marquee, shimmer skeletons, toast/modal enter animations, and the live-ping dot.

## RTL

- **Not done.** The 8 HTML volumes are LTR-authored with physical properties (`left`, `margin-left`, etc.) throughout — flipping `direction: rtl` on those files today will visually break.
- The React component library in `/components` was written using logical properties (`inset-inline-start`, `margin-inline-start`) specifically so it doesn't have this problem going forward.
- If Urvos needs Arabic/Hebrew/Urdu support: treat this as a scoped follow-up pass over the HTML volumes, not a token change — logical properties need to replace physical ones line by line.

## What "AA" means here

WCAg AA requires 4.5:1 for normal text, 3:1 for large text (≥18px, or ≥14px bold) and UI components/graphical objects. This document checks text-on-background contrast only — it does not check color-blindness-safe differentiation between the four signal hues, which is a separate audit worth running (e.g. simulate deuteranopia/protanopia over the badge/table-row-variant system) before treating the signal-color vocabulary as universally legible.
