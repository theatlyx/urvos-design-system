import type { Meta, StoryObj } from "@storybook/react";
import { ChartSankey } from "./ChartSankey";

const meta: Meta<typeof ChartSankey> = {
  title: "Charts/ChartSankey",
  component: ChartSankey,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ChartSankey
      className="max-w-xl"
      flows={[
        { from: "Primary Care Referral", to: "Cardiology Outpatient", value: 340 },
        { from: "Emergency Department", to: "ICU Admission", value: 120 },
        { from: "Inpatient Ward", to: "Rehabilitation Facility", value: 85 },
      ]}
    />
  ),
};
