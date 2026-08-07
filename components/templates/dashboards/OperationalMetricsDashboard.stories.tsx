import type { Meta, StoryObj } from "@storybook/react";
import { OperationalMetricsDashboard } from "./OperationalMetricsDashboard";

const meta: Meta<typeof OperationalMetricsDashboard> = {
  title: "Templates/Dashboards/Operational Metrics Dashboard",
  component: OperationalMetricsDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof OperationalMetricsDashboard> = {};
