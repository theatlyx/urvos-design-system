import type { Meta, StoryObj } from "@storybook/react";
import { ComplianceDashboard } from "./ComplianceDashboard";

const meta: Meta<typeof ComplianceDashboard> = {
  title: "Templates/Administrative & Settings/Compliance Dashboard",
  component: ComplianceDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ComplianceDashboard> = {};
