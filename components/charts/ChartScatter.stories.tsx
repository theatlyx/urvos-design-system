import type { Meta, StoryObj } from "@storybook/react";
import { ChartScatter } from "./ChartScatter";

const meta: Meta<typeof ChartScatter> = {
  title: "Charts/Chart Scatter",
  component: ChartScatter,
};

export default meta;

export const Default: StoryObj<typeof ChartScatter> = {
  args: {
    xAxisLabel: "Systolic Blood Pressure (mmHg)",
    yAxisLabel: "Heart Rate (bpm)",
    data: [
      { x: 120, y: 72, label: "Patient A" },
      { x: 135, y: 88, label: "Patient B" },
      { x: 142, y: 94, label: "Patient C" },
      { x: 118, y: 68, label: "Patient D" },
      { x: 150, y: 102, label: "Patient E" },
    ],
  },
};
