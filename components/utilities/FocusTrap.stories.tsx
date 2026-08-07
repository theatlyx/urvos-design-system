import type { Meta, StoryObj } from "@storybook/react";
import { FocusTrap } from "../utilities/FocusTrap";
import { Button } from "../ui/Button";
import { Input } from "../ui/Form";

const meta: Meta<typeof FocusTrap> = {
  title: "Utilities/FocusTrap",
  component: FocusTrap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <FocusTrap active={true}>
      <div className="p-6 border border-urvos-border rounded-xl space-y-3 bg-urvos-surface">
        <h4 className="text-sm font-bold">Accessibility Focus Loop</h4>
        <Input placeholder="Tab stays inside this box..." />
        <Button variant="primary">Action 1</Button>
        <Button variant="secondary">Action 2</Button>
      </div>
    </FocusTrap>
  ),
};
