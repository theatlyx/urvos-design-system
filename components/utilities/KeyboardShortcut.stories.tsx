import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcut } from "../utilities/KeyboardShortcut";

const meta: Meta<typeof KeyboardShortcut> = {
  title: "Utilities/KeyboardShortcut",
  component: KeyboardShortcut,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-urvos-text">Quick Search Patient:</span>
      <KeyboardShortcut keys={["⌘", "K"]} />
    </div>
  ),
};
