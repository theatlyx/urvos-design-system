import type { Meta, StoryObj } from "@storybook/react";
import { PatientPortal } from "./PatientPortal";

const meta: Meta<typeof PatientPortal> = {
  title: "Healthcare Organisms/PatientPortal",
  component: PatientPortal,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <PatientPortal className="max-w-3xl" />,
};
