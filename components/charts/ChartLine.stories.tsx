import type { Meta, StoryObj } from "@storybook/react";
import { ChartLine } from "./ChartLine";

const meta: Meta<typeof ChartLine> = {
  title: "UI/ChartLine",
  component: ChartLine,
};

export default meta;
type Story = StoryObj<typeof ChartLine>;

const data = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
];

export const Default: Story = {
  args: {
    data,
    lines: [
      { key: "revenue", color: "var(--brand-solid)", name: "Revenue" },
      { key: "expenses", color: "var(--sig-critical)", name: "Expenses" },
    ],
  },
};
