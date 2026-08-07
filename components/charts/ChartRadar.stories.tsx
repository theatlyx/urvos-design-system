import type { Meta, StoryObj } from "@storybook/react";
import { ChartRadar } from "./ChartRadar";

const meta: Meta<typeof ChartRadar> = {
  title: "Charts/Chart Radar",
  component: ChartRadar,
};

export default meta;

export const Default: StoryObj<typeof ChartRadar> = {
  args: {
    title: "Patient Wellness & Quality Assessment Dimensions",
    seriesALabel: "Current Patient Score",
    seriesBLabel: "Peer Benchmark",
    data: [
      { subject: "Mobility", A: 85, B: 75, fullMark: 100 },
      { subject: "Nutrition", A: 90, B: 80, fullMark: 100 },
      { subject: "Sleep Quality", A: 65, B: 85, fullMark: 100 },
      { subject: "Pain Control", A: 95, B: 70, fullMark: 100 },
      { subject: "Mental Wellness", A: 80, B: 75, fullMark: 100 },
    ],
  },
};
