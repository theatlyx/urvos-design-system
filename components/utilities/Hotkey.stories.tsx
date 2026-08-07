import type { Meta, StoryObj } from "@storybook/react";
import { Hotkey } from "../utilities/Hotkey";

const meta: Meta<typeof Hotkey> = {
  title: "Utilities/Hotkey",
  component: Hotkey,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="p-4 border rounded-xl text-center text-xs text-urvos-text-subtle">
      Press <kbd className="px-1.5 py-0.5 border rounded bg-slate-100 font-mono">⌘+K</kbd> to trigger alert
      <Hotkey keyCombo="Meta+k" onTrigger={() => alert("Hotkey ⌘+K pressed!")} />
    </div>
  ),
};
