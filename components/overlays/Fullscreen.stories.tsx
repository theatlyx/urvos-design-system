import type { Meta, StoryObj } from "@storybook/react";
import { Fullscreen } from "./Fullscreen";
import { useState } from "react";
import { Button } from "../ui/Button";

const meta: Meta<typeof Fullscreen> = {
  title: "Overlays/Fullscreen",
  component: Fullscreen,
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
      <div>
        <Button onClick={() => setOpen(true)}>Open Fullscreen Operating Room Feed</Button>
        <Fullscreen isOpen={open} onClose={() => setOpen(false)} title="OR Suite #4 Live Feed">
          <div className="h-full border border-urvos-border rounded-xl bg-urvos-surface-muted flex items-center justify-center p-12 text-center text-sm font-semibold text-urvos-text-subtle">
            Full screen telemetry & surgical camera stream view
          </div>
        </Fullscreen>
      </div>
    );
  },
};
