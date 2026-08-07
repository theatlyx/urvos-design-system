import type { Meta, StoryObj } from "@storybook/react";
import { ClinicalOverviewDashboard } from "./ClinicalOverviewDashboard";

const meta: Meta<typeof ClinicalOverviewDashboard> = {
  title: "Templates/Dashboards/Clinical Overview Dashboard",
  component: ClinicalOverviewDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof ClinicalOverviewDashboard> = {
  args: {
    providerName: "Dr. Anita Sharma (Cardiology)",
  },
};
