import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof CheckboxGroup> = {
  title: "UI/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <CheckboxGroup label="Observe Symptoms" helper="Check all active patient symptoms.">
      <Checkbox label="Chest Pain" defaultChecked />
      <Checkbox label="Shortness of Breath" />
      <Checkbox label="Dizziness" defaultChecked />
    </CheckboxGroup>
  ),
};
