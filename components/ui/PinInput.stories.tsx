import type { Meta, StoryObj } from "@storybook/react";
import { PinInput } from "./PinInput";

const meta: Meta<typeof PinInput> = {
  title: "UI/PinInput",
  component: PinInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const FourDigitPIN = {
  render: () => (
    <div className="space-y-2 text-center">
      <p className="text-xs font-semibold text-urvos-text-subtle">Enter Practitioner Security Passcode</p>
      <PinInput length={4} onComplete={(pin) => alert(`PIN entered: ${pin}`)} />
    </div>
  ),
};
