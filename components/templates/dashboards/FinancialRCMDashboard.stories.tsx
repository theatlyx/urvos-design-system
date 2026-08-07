import type { Meta, StoryObj } from "@storybook/react";
import { FinancialRCMDashboard } from "./FinancialRCMDashboard";

const meta: Meta<typeof FinancialRCMDashboard> = {
  title: "Templates/Dashboards/Financial RCM Dashboard",
  component: FinancialRCMDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof FinancialRCMDashboard> = {};
