import type { Meta, StoryObj } from "@storybook/react";
import { PopulationHealthDashboard } from "./PopulationHealthDashboard";

const meta: Meta<typeof PopulationHealthDashboard> = {
  title: "Templates/Dashboards/Population Health Dashboard",
  component: PopulationHealthDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof PopulationHealthDashboard> = {};
