import type { Meta, StoryObj } from "@storybook/react";
import { RemoteMonitoring } from "./RemoteMonitoring";

const meta: Meta<typeof RemoteMonitoring> = {
  title: "Healthcare Organisms/RemoteMonitoring",
  component: RemoteMonitoring,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <RemoteMonitoring
      className="max-w-2xl"
      feeds={[
        { device: "Cellular Pulse Oximeter", metric: "SpO2", value: "98", unit: "%", status: "normal", timestamp: "2 mins ago" },
        { device: "Continuous Glucose Monitor", metric: "Glucose", value: "142", unit: "mg/dL", status: "normal", timestamp: "Just now" },
        { device: "Smart BP Cuff", metric: "Systolic", value: "158", unit: "mmHg", status: "alert", timestamp: "10 mins ago" },
      ]}
    />
  ),
};
