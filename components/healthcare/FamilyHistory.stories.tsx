import type { Meta, StoryObj } from "@storybook/react";
import { FamilyHistory } from "./FamilyHistory";

const meta: Meta<typeof FamilyHistory> = {
  title: "Healthcare Organisms/FamilyHistory",
  component: FamilyHistory,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <FamilyHistory
      className="max-w-xl"
      history={[
        { relation: "Father", condition: "Type 2 Diabetes Mellitus", onsetAge: "52", note: "Managed with Metformin" },
        { relation: "Mother", condition: "Essential Hypertension", onsetAge: "48" },
        { relation: "Maternal Grandmother", condition: "Breast Carcinoma", onsetAge: "64", note: "BRCA1 negative" },
      ]}
    />
  ),
};
