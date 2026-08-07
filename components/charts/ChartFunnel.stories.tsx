import type { Meta, StoryObj } from "@storybook/react";
import { ChartFunnel } from "./ChartFunnel";

const meta: Meta<typeof ChartFunnel> = {
  title: "Charts/ChartFunnel",
  component: ChartFunnel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ChartFunnel
      className="max-w-xl"
      stages={[
        { label: "ED Admissions", count: 1240, color: "#0284C7" },
        { label: "Triage Evaluation", count: 980, color: "#0EA968" },
        { label: "Inpatient Bed Assign", count: 420, color: "#DE8A16" },
        { label: "Discharged Home", count: 180, color: "#64748B" },
      ]}
    />
  ),
};
