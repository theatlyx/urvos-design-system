import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalHandoffView } from "./ClinicalHandoffView";

const meta: Meta<typeof ClinicalHandoffView> = {
  title: "Templates/Communication & Collaboration/Clinical Handoff View",
  component: ClinicalHandoffView,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ClinicalHandoffView> = {};
