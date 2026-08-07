import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalGuidelines } from "./ClinicalGuidelines";

const meta: Meta<typeof ClinicalGuidelines> = {
  title: "Healthcare Organisms/ClinicalGuidelines",
  component: ClinicalGuidelines,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ClinicalGuidelines
      className="max-w-xl"
      guidelines={[
        {
          title: "ACC/AHA Hypertension Management Guideline",
          recommendation: "Initiate dual anti-hypertensive therapy for Stage 2 Hypertension (BP > 140/90 mmHg).",
          evidenceGrade: "Grade A",
          source: "2023 ACC/AHA Clinical Practice Guidelines",
        },
      ]}
    />
  ),
};
