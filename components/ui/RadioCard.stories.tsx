import type { Meta, StoryObj } from "@storybook/react";
import { RadioCard } from "./RadioCard";

const meta: Meta<typeof RadioCard> = {
  title: "UI/RadioCard",
  component: RadioCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="w-[340px] space-y-3">
      <RadioCard
        label="Emergency Triage (Level 1)"
        description="Immediate life-saving intervention required."
        name="triage"
        checked
      />
      <RadioCard
        label="Urgent Evaluation (Level 2)"
        description="High risk situation or severe pain."
        name="triage"
      />
    </div>
  ),
};
