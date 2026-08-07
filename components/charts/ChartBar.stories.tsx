import type { Meta, StoryObj } from "@storybook/react";
import { ChartBar } from "./ChartBar";

const meta: Meta<typeof ChartBar> = {
  title: "UI/ChartBar",
  component: ChartBar,
};

export default meta;
type Story = StoryObj<typeof ChartBar>;

const data = [
  { name: "Mon", appointments: 12, walkIns: 4 },
  { name: "Tue", appointments: 15, walkIns: 7 },
  { name: "Wed", appointments: 11, walkIns: 3 },
  { name: "Thu", appointments: 18, walkIns: 8 },
  { name: "Fri", appointments: 20, walkIns: 5 },
];

export const Default: Story = {
  args: {
    data,
    bars: [
      { key: "appointments", color: "var(--brand-solid)", name: "Appointments" },
      { key: "walkIns", color: "var(--brand-3)", name: "Walk-ins" },
    ],
  },
};
