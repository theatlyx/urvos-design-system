import type { Meta, StoryObj } from "@storybook/react";
import { ClickOutside } from "../utilities/ClickOutside";
import { useState } from "react";
import { Button } from "../ui/Button";

const meta: Meta<typeof ClickOutside> = {
  title: "Utilities/ClickOutside",
  component: ClickOutside,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <ClickOutside onClickOutside={() => setOpen(false)}>
        <div className="relative">
          <Button onClick={() => setOpen(!open)}>Toggle Dropdown</Button>
          {open && (
            <div className="absolute top-full mt-2 w-48 p-3 border rounded-xl bg-urvos-surface shadow-xl text-xs">
              Click anywhere outside this box to dismiss it.
            </div>
          )}
        </div>
      </ClickOutside>
    );
  },
};
