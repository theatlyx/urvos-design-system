import type { Meta, StoryObj } from "@storybook/react";
import { RealTimeMonitoringDashboard } from "./RealTimeMonitoringDashboard";

const meta: Meta<typeof RealTimeMonitoringDashboard> = {
  title: "Templates/Dashboards/Real Time Monitoring Dashboard",
  component: RealTimeMonitoringDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof RealTimeMonitoringDashboard> = {};
