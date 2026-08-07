import type { Meta, StoryObj } from "@storybook/react";
import { RemoteMonitoringDashboard } from "./RemoteMonitoringDashboard";

const meta: Meta<typeof RemoteMonitoringDashboard> = {
  title: "Templates/Home Health/Remote Monitoring Dashboard",
  component: RemoteMonitoringDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof RemoteMonitoringDashboard> = {};
