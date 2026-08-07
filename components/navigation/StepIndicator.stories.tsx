import type { Meta, StoryObj } from "@storybook/react";
import { StepIndicator } from "../navigation/StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Navigation/StepIndicator",
  component: StepIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="w-[500px]">
      <StepIndicator
        steps={["Registration", "Triage Vitals", "Physician Review", "Discharge"]}
        currentStep={2}
      />
    </div>
  ),
};
