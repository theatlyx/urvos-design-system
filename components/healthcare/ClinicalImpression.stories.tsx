import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalImpression } from "./ClinicalImpression";

const meta: Meta<typeof ClinicalImpression> = {
  title: "Healthcare Organisms/ClinicalImpression",
  component: ClinicalImpression,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ClinicalImpression
      className="max-w-xl"
      impressions={[
        {
          id: "imp-1",
          summary: "Patient presents with acute exacerbation of systolic heart failure secondary to fluid overload.",
          assessor: "Dr. Sarah Jenkins, MD (Cardiology)",
          date: "Oct 24, 2023",
          status: "completed",
          prognosis: "Favorable with IV diuretic response and sodium intake restriction.",
        },
      ]}
    />
  ),
};
