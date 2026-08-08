# Component Catalog

# Component Catalog

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://theatlyx.github.io/urvos-design-system/)

This catalog is now fully integrated with Storybook! You can view the interactive catalog and test all components at the link above.

The inventory below is kept as a quick reference.

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

Storybook is now configured in this repository! You can run it locally with:

```bash
npm run storybook
```

It is also automatically deployed to GitHub Pages via CI/CD on every push to the `main` branch.
