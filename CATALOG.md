# Component Catalog

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://theatlyx.github.io/urvos-design-system/)

This catalog is now fully integrated with Storybook! You can view the interactive catalog and test all components at the link above.

## Full Inventory Overview

The design system has grown significantly since its inception. It now includes over 100 components across multiple distinct categories:

### 1. UI Primitives (`/ui`, `/patterns`)
The foundation of the design system.
- **Inputs & Forms:** `Button`, `Combobox`, `Select`, `Textarea`, `Switch`, `Checkbox`, `Radio`, `MultiSelect`, `Autocomplete`, `FileUpload`, `DatePicker`, `DateRangePicker`, `TimePicker`, `Slider`, `ToggleGroup`
- **Feedback:** `Toast`, `Alert`, `Spinner`, `Progress`, `EmptyState`, `Skeleton`, `Badge`, `StatCard`
- **Overlays:** `Modal`, `Drawer`, `Tooltip`, `Popover`, `DropdownMenu`, `CommandPalette`
- **Data Display:** `Table`, `Card`, `Accordion`, `TreeView`, `Timeline`, `Typography`, `Avatar`

### 2. Layout & Navigation (`/layout`, `/navigation`, `/organisms`)
Structural components for complex layouts.
- **Layouts:** `Container`, `Section`, `Sheet`, `ScrollArea`, `CardGrid`, `DataGrid`, `VirtualizedTable`, `Carousel`, `Masonry`, `Groups`
- **Navigation:** `Sidebar`, `TopNav`, `MegaMenu`, `Breadcrumbs`, `Pagination`, `Wizard`, `Tabs`
- **Shell:** `Shell`, `GlobalSearchBox`, `TenantThemeProvider`

### 3. Specialized Charts (`/charts`)
Data visualization tailored for healthcare metrics.
- `ChartArea`, `ChartBar`, `ChartLine`, `ChartPie`, `ChartScatter`, `ChartRadar`, `ChartGauge`, `ChartHeatmap`, `ChartSparkline`, `ChartFunnel`, `ChartSankey`, `ChartBubble`

### 4. FHIR Healthcare Organisms (`/healthcare`)
Complex, domain-specific clinical components.
- **Clinical Records:** `PatientBanner`, `PatientSearch`, `PatientTimeline`, `ClinicalDecisionSupport`, `ClinicalFlowsheet`, `ClinicalCopilot`
- **Workflows:** `AllergyManager`, `MedicationList`, `GoalTracker`, `EncounterForm`, `RiskAssessment`, `HandoffReport`
- **Compliance & RCM:** `ABDMConsentManager`, `ABHAHealthIDCard`, `ClaimStatusTimeline`, `DenialAnalyticsCard`
- **Specialty:** `ToothChart`, `ToothInspector`

## Path to real Storybook

Storybook is now configured in this repository! You can run it locally with:

```bash
npm run storybook
```

It is also automatically deployed to GitHub Pages via CI/CD on every push to the `main` branch.
