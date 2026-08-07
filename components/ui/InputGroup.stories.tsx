import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup, InputGroupAddon } from "./InputGroup";
import { Input } from "./Form";

const meta: Meta<typeof InputGroup> = {
  title: "UI/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <div className="w-[320px] space-y-3">
      <InputGroup>
        <InputGroupAddon>MRN</InputGroupAddon>
        <Input placeholder="Enter patient MRN..." />
      </InputGroup>

      <InputGroup>
        <Input placeholder="120/80" />
        <InputGroupAddon>mmHg</InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
