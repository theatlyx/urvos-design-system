import type { Meta, StoryObj } from "@storybook/react";
import { ChartPie } from "./ChartPie";

const meta: Meta<typeof ChartPie> = {
  title: "UI/ChartPie",
  component: ChartPie,
};

export default meta;
type Story = StoryObj<typeof ChartPie>;

const data = [
  { name: "Commercial", value: 400, color: "var(--brand-solid)" },
  { name: "Medicare", value: 300, color: "var(--brand-3)" },
  { name: "Medicaid", value: 300, color: "var(--brand-2)" },
  { name: "Self-Pay", value: 200, color: "var(--brand-4)" },
];

export const Default: Story = {
  args: {
    data,
  },
};
