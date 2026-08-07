# Urvos Clinical OS — Design System

A continuous ECG pulse line as the visual throughline, color reserved strictly for clinical meaning, violet→blue brand identity. This version closes the gap between "design reference" and "production-ready Next.js package."

## What's in this zip

### Design reference (HTML — open directly in a browser)
`01` through `09` — dashboard, full component taxonomy, layout/notifications/email, tables/filters/search, lab/triage/pharmacy/provider/RCM/insurance, CRUD/typography/color, auth/admin/scheduling, documents/messaging/portal/errors/print, and nursing/prescriptions/patients/reports (MAR, SBAR handoff, vitals flowsheet, ePrescription, physical Rx, patient registration/profile, formatted lab report). Start at `index.html`.

### Production layer
```
tokens.css              single source of truth — every color/space/shadow/z-index/font token
globals.css              component-level CSS classes built on tokens.css
tailwind.config.ts       maps tokens to Tailwind utilities, full sm→2xl breakpoint scale
tsconfig.json            path aliases (@/components, @/lib, etc.)
package.json             every dependency this package actually needs, incl. cva, clsx, Storybook + a11y addon

lib/
  fonts.ts               next/font self-hosted Inter/Fraunces/IBM Plex Mono — replaces <link> tags
  Image.tsx              next/image wrapper — makes `sizes` opinionated by variant (avatar/thumbnail/content)
  Link.tsx               next/link wrapper — computes active nav state from usePathname() automatically

components/
  ui/                     atoms — Button (CVA reference implementation), Badge, Form controls, Card, Avatar, EmptyState, Skeleton
  patterns/               molecules — Modal (real focus trap), Toast (queue + aria-live), Table+Pagination, Tooltip, Dropdown, Accordion
  organisms/              Sidebar, Navbar, Footer, Tabs/Breadcrumb/NavItem, TenantThemeProvider
  index.ts                single barrel export for all of the above

.storybook/
  main.ts, preview.ts     real Storybook config, loads actual tokens.css/globals.css, a11y addon wired in
components/ui/Button.stories.tsx   example story set, including an icon-only a11y regression test

app/patients/
  page.tsx                Server Component example — async fetch, no "use client"
  loading.tsx              matching skeleton UI for Next.js streaming
  PatientRosterActions.tsx the isolated Client Component boundary for the interactive slice
```

### Governance
`ACCESSIBILITY.md`, `CATALOG.md`, `/archive` (superseded early drafts — don't pull tokens from these).

## What changed in this pass — fixing what was actually broken or missing

1. **Real bug fixed**: `Button`, `Form`, `Badge`, `Card`, `Table`, `Navigation` all attach event handlers or use hooks but had no `"use client"` directive — would error in a real RSC tree. Patched.
2. **Restructured** flat `/components` into `ui/` (atoms) → `patterns/` (molecules) → `organisms/`, matching standard design-system hierarchy.
3. **Added what didn't exist at all**: Tooltip, Dropdown, Accordion as real components (were HTML-only before); Sidebar/Navbar/Footer organisms (only `NavItem` existed before); `next/font` config; `next/image` and `next/link` wrappers; `tsconfig.json`; real `.storybook/` config with the a11y addon actually wired in, not just described; a working `loading.tsx` + Server/Client Component split example.
4. **CVA introduced** — `Button.tsx` is the reference implementation (`cva()` + `clsx()`). `Badge`, `Form`, `Feedback` still use manual className concatenation and should be migrated to match — flagged directly in the code comments, not hidden.
5. **shadcn/Radix-compatible token aliases** added to `tokens.css` (`--background`, `--foreground`, `--primary`, `--destructive`, etc.) — pure aliases pointing at the real tokens, so adopting shadcn/ui components later doesn't require a parallel token system.

## Still open — not solved by this pass, said plainly

- Only `Button` uses the CVA pattern; `Badge`/`Form`/`Feedback` need migrating to match.
- `Storybook` config is real but unverified — it hasn't been run (`npm run storybook`) since I don't have your repo to run it in. Treat it as a strong starting point, not a tested pipeline.
- Dark-mode text contrast (`--text-3` on dark `--surface`) is still unverified — see `ACCESSIBILITY.md`.
- RTL: the 8 HTML volumes remain LTR-only. The new React components use logical properties, which is the correct foundation, but that's a start, not a finished RTL pass.
- Only one example route (`app/patients`) demonstrates the Server/Client Component split — the pattern needs repeating per screen, not just documented once.

## The one hard rule, unchanged

Signal colors and the pulse mint are not tenant-overridable. `TenantThemeProvider` only exposes the brand accent, on purpose.
