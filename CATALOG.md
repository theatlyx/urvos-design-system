# Component Catalog

## What this is, honestly

This is **not** Storybook. A real Storybook setup needs to run inside your actual Next.js repo (`npx storybook@latest init`, story files colocated with components, its own dev server) — I can't stand that up without your codebase attached. What's here instead is a plain inventory so you can see everything that exists in one place, and a recommended path to real Storybook when you're ready.

## Inventory — `/components`

| File | Exports | Variants covered |
|---|---|---|
| `Button.tsx` | `Button` | primary / secondary / ghost / danger / danger-outline · sm / md / lg / icon · loading · disabled |
| `Form.tsx` | `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch` | error state, help text, disabled, controlled switch |
| `Badge.tsx` | `Badge` | critical / caution / success / info / ai / neutral · removable · icon slot |
| `Card.tsx` | `Card` | default / clickable / elevated / inset · header / footer regions |
| `Modal.tsx` | `Modal` | sm / md / lg · focus trap · Escape-to-close · `requireExplicitDismiss` for destructive confirms |
| `Toast.tsx` | `ToastProvider`, `useToast` | default / critical / success · action button · critical defaults to sticky (no auto-dismiss) |
| `Feedback.tsx` | `Avatar`, `AvatarGroup`, `EmptyState`, `Skeleton`, `SkeletonCard`, `SkeletonTableRows` | avatar sizes xs–lg, status dot, group overlap · empty state with icon/CTA · shimmer skeletons |
| `Table.tsx` | `Table`, `Pagination` | sortable headers, row selection, row variants (critical), empty state, pagination with ellipsis |
| `Navigation.tsx` | `Tabs`, `Breadcrumb`, `NavItem` | pill / underline / segmented tabs · sidebar active/disabled states |
| `TenantThemeProvider.tsx` | `TenantThemeProvider`, `useTenantTheme` | runtime brand-accent swap, signal colors locked |

## Path to real Storybook

1. `npx storybook@latest init` inside your Next.js repo (it auto-detects Next 14 App Router).
2. Point Storybook's `preview.ts` at `tokens.css` and `globals.css` so components render with real tokens, not defaults.
3. One `.stories.tsx` file per component in this folder — for example:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = { component: Button, title: "Primitives/Button" };
export default meta;

export const Primary: StoryObj<typeof Button> = { args: { variant: "primary", children: "Sign encounter" } };
export const Loading: StoryObj<typeof Button> = { args: { variant: "primary", loading: true, children: "Saving" } };
export const Danger: StoryObj<typeof Button> = { args: { variant: "danger", children: "Discontinue" } };
```

4. Add the `a11y` addon (`@storybook/addon-a11y`) and run it against every story — that's what actually catches the class of bug flagged in `ACCESSIBILITY.md`, automatically, on every future component.

Once that's wired up, this markdown file becomes redundant and can be deleted — Storybook itself becomes the catalog.
