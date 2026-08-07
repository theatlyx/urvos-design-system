import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalDecisionSupportTemplate } from "./ClinicalDecisionSupport";

const meta: Meta<typeof ClinicalDecisionSupportTemplate> = {
  title: "Templates/Clinical Workflows/Clinical Decision Support",
  component: ClinicalDecisionSupportTemplate,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ClinicalDecisionSupportTemplate> = {};
