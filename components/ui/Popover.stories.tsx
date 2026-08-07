import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "./Button";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h4 className="font-semibold text-text-1 mb-2">Dimensions</h4>
        <p className="text-sm text-text-2 mb-4">Set the dimensions for the layer.</p>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="width" className="text-sm text-text-1">Width</label>
            <input id="width" defaultValue="100%" className="input col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="maxWidth" className="text-sm text-text-1">Max. width</label>
            <input id="maxWidth" defaultValue="300px" className="input col-span-2 h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
