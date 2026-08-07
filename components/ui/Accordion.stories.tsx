import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const clinicalFAQ = [
  {
    id: "vitals",
    title: "Vitals & Monitoring",
    content: "Continuous monitoring of BP, HR, SpO2, and temperature is recorded every 4 hours. Any deviation from the normal range triggers an automated alert to the attending clinician.",
  },
  {
    id: "medications",
    title: "Current Medications",
    content: "Amoxicillin 500mg TID, Metformin 500mg BD, Aspirin 75mg OD. All medications were last reviewed on 23 Jul 2026 by Dr. Priya Sharma.",
  },
  {
    id: "labs",
    title: "Recent Lab Results",
    content: "CBC: WBC 8.2 K/µL (normal), Hgb 13.4 g/dL (normal). Metabolic panel: Sodium 138 mEq/L, Potassium 6.1 mEq/L ⚠ (flagged).",
  },
  {
    id: "history",
    title: "Medical History",
    content: "Type 2 Diabetes (2018), Hypertension (2019), Appendectomy (2014). No known allergies. Family history of coronary artery disease.",
  },
];

export const Default: Story = {
  args: {
    items: clinicalFAQ,
    defaultOpen: "vitals",
  },
};

export const Multiple: Story = {
  args: {
    items: clinicalFAQ,
    type: "multiple",
    defaultOpen: ["vitals", "medications"],
  },
};
