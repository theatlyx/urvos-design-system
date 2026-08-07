import type { Meta, StoryObj } from "@storybook/react";
import { TelehealthViewer } from "./TelehealthViewer";

const meta: Meta<typeof TelehealthViewer> = {
  title: "Healthcare Organisms/TelehealthViewer",
  component: TelehealthViewer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <TelehealthViewer className="max-w-2xl" />,
};
