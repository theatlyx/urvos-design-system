import type { Meta, StoryObj } from "@storybook/react";
import { ChartHeatmap } from "./ChartHeatmap";

const meta: Meta<typeof ChartHeatmap> = {
  title: "Charts/Chart Heatmap",
  component: ChartHeatmap,
};

export default meta;

export const Default: StoryObj<typeof ChartHeatmap> = {
  args: {
    title: "OPD Patient Check-in Volume Density",
    data: [
      { day: "Mon", hour: "08:00", intensity: 1 },
      { day: "Mon", hour: "10:00", intensity: 4 },
      { day: "Mon", hour: "12:00", intensity: 3 },
      { day: "Tue", hour: "08:00", intensity: 2 },
      { day: "Tue", hour: "10:00", intensity: 4 },
      { day: "Tue", hour: "12:00", intensity: 2 },
      { day: "Wed", hour: "08:00", intensity: 1 },
      { day: "Wed", hour: "10:00", intensity: 3 },
      { day: "Wed", hour: "12:00", intensity: 1 },
    ],
  },
};
