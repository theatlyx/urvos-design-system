import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "./Button";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Daily</Button>
      <Button variant="secondary">Weekly</Button>
      <Button variant="secondary">Monthly</Button>
    </ButtonGroup>
  ),
};
