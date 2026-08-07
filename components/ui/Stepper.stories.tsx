import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "UI/Stepper",
  component: Stepper,
  tags: ["autodocs"],
};

export default meta;

export const Horizontal = {
  render: () => (
    <Stepper
      currentStep={1}
      steps={[
        { id: "1", title: "Step 1", description: "First Step" },
        { id: "2", title: "Step 2", description: "Second Step" },
        { id: "3", title: "Step 3", description: "Third Step" },
      ]}
    />
  ),
};

export const Vertical = {
  render: () => (
    <Stepper
      currentStep={2}
      orientation="vertical"
      steps={[
        { id: "1", title: "Personal Details" },
        { id: "2", title: "Medical History" },
        { id: "3", title: "Insurance Info" },
        { id: "4", title: "Review" },
      ]}
    />
  ),
};
