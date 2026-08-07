import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/ui/Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "UI/Checkbox",
  tags: ["autodocs"],
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: "label",
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
      description: "State of the checkbox",
    },
    clinicalSignificance: {
      control: "select",
      options: ["critical", "warning", "info", "normal", undefined],
      description: "Clinical significance for healthcare context",
    },
    label: {
      control: "text",
      description: "Label text",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    helper: {
      control: "text",
      description: "Helper text",
    },
    indeterminate: {
      control: "boolean",
      description: "Sets indeterminate state",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    required: {
      control: "boolean",
      description: "Marks as required",
    },
    checked: {
      control: "boolean",
      description: "Checked state (controlled)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Examples
export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Indeterminate state",
    indeterminate: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: "Small checkbox",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    label: "Large checkbox",
    size: "lg",
  },
};

// States
export const Error: Story = {
  args: {
    label: "Error state",
    state: "error",
    error: "This field is required",
    required: true,
  },
};

export const Success: Story = {
  args: {
    label: "Success state",
    state: "success",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked",
    disabled: true,
    checked: true,
  },
};

// Clinical Significance
export const Critical: Story = {
  args: {
    label: "Critical allergy",
    clinicalSignificance: "critical",
    helper: "Mark if patient has anaphylactic reaction",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning - Drug interaction",
    clinicalSignificance: "warning",
    helper: "Mark if patient is taking interacting medications",
  },
};

export const Info: Story = {
  args: {
    label: "Information - Clinical note",
    clinicalSignificance: "info",
    helper: "Mark for clinical documentation",
  },
};

export const Normal: Story = {
  args: {
    label: "Normal - Routine finding",
    clinicalSignificance: "normal",
  },
};

// Healthcare Examples
export const AllergyCheckbox: Story = {
  args: {
    label: "Penicillin Allergy",
    clinicalSignificance: "critical",
    helper: "Documented allergy: Anaphylaxis",
    fhirObservationCode: "AllergyIntolerance",
  },
  parameters: {
    docs: {
      description: {
        story: "Healthcare-specific checkbox for allergy documentation",
      },
    },
  },
};

export const SymptomCheckbox: Story = {
  args: {
    label: "Chest Pain",
    clinicalSignificance: "warning",
    helper: "Patient reports chest pain on exertion",
    fhirObservationCode: "Observation.symptom",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox for symptom documentation in clinical workflows",
      },
    },
  },
};

// Groups (Example of multiple checkboxes)
export const GroupExample: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Headache" helper="Duration: 2 hours" />
      <Checkbox label="Nausea" clinicalSignificance="warning" />
      <Checkbox label="Dizziness" />
      <Checkbox label="Fatigue" checked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of checkbox group for symptom selection",
      },
    },
  },
};
