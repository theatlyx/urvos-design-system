import type { Meta, StoryObj } from "@storybook/react";
import { ReferralManagement } from "./ReferralManagement";

const meta: Meta<typeof ReferralManagement> = {
  title: "Templates/Clinical Workflows/Referral Management",
  component: ReferralManagement,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ReferralManagement> = {};
