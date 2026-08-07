import type { Meta, StoryObj } from "@storybook/react";
import { Lightbox } from "./Lightbox";
import { useState } from "react";
import { Button } from "../ui/Button";

const meta: Meta<typeof Lightbox> = {
  title: "Overlays/Lightbox",
  component: Lightbox,
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
        <Button onClick={() => setOpen(true)}>View Radiographic Scan</Button>
        <Lightbox
          isOpen={open}
          onClose={() => setOpen(false)}
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
          title="Chest X-Ray AP View (MRN #88392)"
        />
      </div>
    );
  },
};
