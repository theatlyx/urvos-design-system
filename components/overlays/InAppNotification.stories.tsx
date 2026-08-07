import type { Meta, StoryObj } from "@storybook/react";
import { InAppNotification } from "./InAppNotification";
import { useState } from "react";
import { Button } from "../ui/Button";

const meta: Meta<typeof InAppNotification> = {
  title: "Overlays/InAppNotification",
  component: InAppNotification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Trigger Notification</Button>
        <InAppNotification
          isOpen={open}
          onClose={() => setOpen(false)}
          title="New Stat STAT Lab Alert"
          message="Critical K+ level (6.2 mEq/L) reported for Bed 4B."
          type="warning"
        />
      </div>
    );
  },
};
