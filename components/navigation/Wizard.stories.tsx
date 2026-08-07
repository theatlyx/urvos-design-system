import type { Meta, StoryObj } from "@storybook/react";
import { Wizard } from "../navigation/Wizard";
import { Field, Input } from "../ui/Form";

const meta: Meta<typeof Wizard> = {
  title: "Navigation/Wizard",
  component: Wizard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const ClinicalIntakeWorkflow = {
  render: () => (
    <Wizard
      className="max-w-xl"
      steps={[
        {
          title: "Demographics",
          component: (
            <div className="space-y-3">
              <Field label="Patient Legal Name"><Input placeholder="John Doe" /></Field>
              <Field label="Medical Record Number (MRN)"><Input placeholder="MRN-88492" /></Field>
            </div>
          ),
        },
        {
          title: "Triage Vitals",
          component: (
            <div className="space-y-3">
              <Field label="Blood Pressure (mmHg)"><Input placeholder="120/80" /></Field>
              <Field label="Pulse Rate (bpm)"><Input placeholder="72" /></Field>
            </div>
          ),
        },
        {
          title: "Attending Provider",
          component: (
            <div className="space-y-3">
              <Field label="Assigned Physician"><Input placeholder="Dr. Sarah Jenkins" /></Field>
            </div>
          ),
        },
      ]}
      onFinish={() => alert("Workflow complete!")}
    />
  ),
};
