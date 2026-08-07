import type { Meta, StoryObj } from "@storybook/react";
import { TriageDashboard } from "./TriageDashboard";

const meta: Meta<typeof TriageDashboard> = {
  title: "Templates/Emergency & Inpatient/Triage Dashboard",
  component: TriageDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof TriageDashboard> = {};
