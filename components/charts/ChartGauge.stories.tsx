import type { Meta, StoryObj } from "@storybook/react";
import { ChartGauge } from "./ChartGauge";

const meta: Meta<typeof ChartGauge> = {
  title: "Charts/Chart Gauge",
  component: ChartGauge,
};

export default meta;

export const Default: StoryObj<typeof ChartGauge> = {
  args: {
    value: 68,
    title: "SLA Clinical Target Compliance",
    label: "68% Target Met",
  },
};
