import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useDebounce } from "../utilities/Debounce";
import { Input } from "../ui/Form";

function DebounceDemo() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  return (
    <div className="p-4 space-y-3 max-w-sm border rounded-xl">
      <Input placeholder="Type to search patients..." value={text} onChange={(e) => setText(e.target.value)} />
      <div className="text-xs text-urvos-text-subtle">
        <span>Immediate value: <strong>{text}</strong></span>
        <br />
        <span>Debounced query (500ms): <strong>{debouncedText}</strong></span>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Utilities/Debounce",
  component: DebounceDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <DebounceDemo />,
};
