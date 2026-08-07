import type { Meta, StoryObj } from "@storybook/react";
import { WidgetBasedCustomDashboard } from "./WidgetBasedCustomDashboard";

const meta: Meta<typeof WidgetBasedCustomDashboard> = {
  title: "Templates/Dashboards/Widget Based Custom Dashboard",
  component: WidgetBasedCustomDashboard,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof WidgetBasedCustomDashboard> = {};
