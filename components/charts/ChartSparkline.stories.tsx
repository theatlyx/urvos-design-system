import type { Meta, StoryObj } from "@storybook/react";
import { ChartSparkline } from "./ChartSparkline";

const meta: Meta<typeof ChartSparkline> = {
  title: "Charts/ChartSparkline",
  component: ChartSparkline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="flex items-center gap-4 border p-4 rounded-xl">
      <div>
        <span className="text-xs text-urvos-text-subtle block">Heart Rate</span>
        <span className="text-lg font-bold text-urvos-text">78 bpm</span>
      </div>
      <ChartSparkline data={[72, 75, 71, 78, 82, 79, 78]} color="#0EA968" />
    </div>
  ),
};
