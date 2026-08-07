import type { Meta, StoryObj } from "@storybook/react";
import { ChartBubble } from "./ChartBubble";

const meta: Meta<typeof ChartBubble> = {
  title: "Charts/ChartBubble",
  component: ChartBubble,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ChartBubble
      className="max-w-xl"
      data={[
        { x: 45, y: 130, z: 40, name: "Patient A" },
        { x: 62, y: 155, z: 85, name: "Patient B" },
        { x: 70, y: 140, z: 65, name: "Patient C" },
        { x: 38, y: 118, z: 20, name: "Patient D" },
      ]}
    />
  ),
};
