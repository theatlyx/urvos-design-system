# Urvos Design System — Storybook Story Writing Guide

> Before writing any story, **READ THE COMPONENT SOURCE FILE first.**  
> Every bug we fixed came from guessing props instead of reading interfaces.

---

## Rule 1 — Always Read the Interface First

Before writing a single story line, run:

```bash
grep -n "interface.*Props\|export function\|export interface" components/ui/YourComponent.tsx
```

Then read the exact field names, types, and enum values. **Never guess.**

---

## Rule 2 — Props Must Match Exactly

### Common Mistakes

| Mistake | Fix |
|--------|-----|
| Passing flat props when component expects a nested data object | Wrap in the data object: `measure={{ id, title, ... }}` |
| Wrong field names | `contact` → `phone`, `pcp` → `primaryProvider`, `value` → `score` |
| Wrong prop names for controlled inputs | `date`/`onSelect` → `value`/`onChange` |
| `useState<string>` when component expects a full object | Match the `onChange` signature exactly |
| Guessing enum values | `'danger'` vs `'destructive'`, `'caution'` vs `'warning'` |

### The Correct Pattern

```tsx
// 1. Read the interface
export interface PatientSummaryData {
  id: string;               // required
  name: string;             // required
  phone?: string;           // not "contact"
  primaryProvider?: string; // not "pcp"
}

// 2. Write the story matching it exactly
export const Default: StoryObj<typeof PatientSummary> = {
  args: {
    patient: {
      id: 'p-001',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
    },
  },
};
```

---

## Rule 3 — Enum Values Must Exist in the Component

Always verify with:

```bash
grep -n "type.*Variant\|type.*Status\|'met'\|'active'" components/ui/Badge.tsx
```

### Urvos Enum Reference

| Component | Valid Values |
|-----------|-------------|
| `Badge` variant | `'critical' \| 'caution' \| 'success' \| 'info' \| 'ai' \| 'neutral'` |
| `Toast` variant | `'default' \| 'success' \| 'warning' \| 'danger'` |
| `Tag` variant | `'default' \| 'primary' \| 'success' \| 'warning' \| 'destructive'` |
| `TimelineVariant` | `'info' \| 'success' \| 'warning' \| 'error'` |
| `Medication` status | `'active' \| 'completed' \| 'stopped' \| 'on-hold' \| 'intended' \| 'entered-in-error'` |
| `Immunization` status | `'completed' \| 'entered-in-error' \| 'not-done'` |
| `Procedure` status | `'preparation' \| 'in-progress' \| 'not-done' \| 'on-hold' \| 'stopped' \| 'completed' \| 'entered-in-error' \| 'unknown'` |
| `EducationMaterial` type | `'article' \| 'video' \| 'pdf'` |
| `EducationMaterial` status | `'assigned' \| 'viewed' \| 'completed'` |
| `CDSRecord` severity | `'info' \| 'warning' \| 'critical'` |
| `QualityMeasure` status | `'met' \| 'not-met' \| 'pending'` |

---

## Rule 4 — Controlled State Must Match onChange Signature

```tsx
// Wrong — component expects SelectorOption not string
const [selected, setSelected] = useState<string | undefined>();
<Selector value={selected} onChange={setSelected} />

// Correct
import type { SelectorOption } from './Selectors';
const [selected, setSelected] = useState<SelectorOption | undefined>();
<Selector value={selected} onChange={setSelected} />
```

---

## Rule 5 — Decorator Pattern (Required on Every Story File)

```tsx
const meta: Meta<typeof YourComponent> = {
  title: 'UI/YourComponent',
  component: YourComponent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};
```

### Title Namespacing

| Namespace | Use for |
|-----------|---------|
| `UI/` | Primitive components (Button, Badge, Input, DatePicker, etc.) |
| `Healthcare/` | Healthcare organisms (PatientSummary, ClinicalRecords, etc.) |
| `Patterns/` | Complex layout patterns (Table, Sheet, Combobox) |

---

## Rule 6 — args vs render

Use `args` for simple static data. Use `render` when you need `useState` or computed values.

```tsx
// Static — use args
export const Success: StoryObj<typeof Badge> = {
  args: { variant: 'success', children: 'Active' },
};

// Interactive — use render
export const DateDemo: StoryObj<typeof DatePicker> = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} />;
  },
};
```

---

## Rule 7 — Only Import What Exists

```tsx
// Wrong — importing a file that does not exist
import { useToast } from './use-toast';

// Correct — check what the actual file exports first
grep -n "^export" components/ui/Toast.tsx
import { Toast, ToastProvider, ToastViewport } from './Toast';
```

---

## Rule 8 — Healthcare Component Field Reference

### PatientSummaryData
- `id`, `name`, `dob`, `mrn`, `gender` (required)
- `phone` — not `contact`
- `primaryProvider` — not `pcp`
- `bloodType`, `allergies[]`, `avatarUrl`
- No `vitals`, `tags`, `contact`, `pcp`

### TimelineEvent (PatientTimeline.tsx)
- `performer` — not `provider`
- `type: 'encounter' | 'lab' | 'medication' | 'immunization' | 'note'`

### Immunization (ClinicalRecords.tsx)
- `vaccineCode` — not `vaccineName`
- `occurrenceDate` — not `dateGiven`
- `performer` — not `provider`

### Procedure (ClinicalRecords.tsx)
- `performedDate` — not `date`
- `bodySite` — not `location`
- `outcome` — not `notes`

### QualityMeasureData
- `score` — not `value`
- `lastUpdated` — not `date`
- No `unit`

### Medication (ClinicalRecords.tsx)
- `medicationName` — not `medication` or `name`
- `dosage`, `route`, `dateStarted`

---

## Rule 9 — Urvos Color Tokens Only

```tsx
// Wrong
<div className="bg-blue-500 text-white border-gray-200">

// Correct
<div className="bg-urvos-primary text-white border-urvos-border">
```

| Token | Purpose |
|-------|---------|
| `bg-urvos-background` | Page/story background |
| `bg-urvos-surface` | Card/panel |
| `bg-urvos-surface-hover` | Hover state |
| `text-urvos-text` | Primary text |
| `text-urvos-text-muted` | Muted/secondary text |
| `border-urvos-border` | Standard border |
| `text-urvos-primary` | Brand accent |
| `text-urvos-success` | Green/success |
| `text-urvos-warning` | Amber/warning |
| `text-urvos-destructive` | Red/danger |

---

## Rule 10 — Pre-Save Checklist

- [ ] Read the component interface — all field names are exact
- [ ] All enum values exist in the component's type definition
- [ ] All imports resolve to existing files/exports
- [ ] `useState` type matches `onChange` parameter type
- [ ] Decorator wraps story in `bg-urvos-background`
- [ ] Title uses correct namespace (`UI/`, `Healthcare/`, `Patterns/`)
- [ ] No raw Tailwind color classes — Urvos tokens only
- [ ] All required fields are included in `args`/`render`
- [ ] TypeScript check passes

---

## Quick Verification

After writing any story, run this in the `urvos-design-system` directory:

```bash
npx tsc --noEmit 2>&1 | grep "\.stories\.tsx"
```

Zero output means all stories are type-safe and ready for Storybook.
