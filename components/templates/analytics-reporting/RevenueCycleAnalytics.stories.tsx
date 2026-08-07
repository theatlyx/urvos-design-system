import type { Meta, StoryObj } from "@storybook/react";
import { RevenueCycleAnalytics } from "./RevenueCycleAnalytics";

const meta: Meta<typeof RevenueCycleAnalytics> = {
  title: "Templates/Analytics & Reporting/Revenue Cycle Analytics",
  component: RevenueCycleAnalytics,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof RevenueCycleAnalytics> = {};
