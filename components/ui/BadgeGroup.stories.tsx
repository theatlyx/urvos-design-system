import type { Meta, StoryObj } from "@storybook/react";
import { BadgeGroup } from "./BadgeGroup";
import { Badge } from "./Badge";

const meta: Meta<typeof BadgeGroup> = {
  title: "UI/BadgeGroup",
  component: BadgeGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <BadgeGroup max={3}>
      <Badge variant="info">Cardiology</Badge>
      <Badge variant="success">Active Patient</Badge>
      <Badge variant="caution">ICU Bed 4B</Badge>
      <Badge variant="critical">Penicillin Allergy</Badge>
      <Badge variant="neutral">DNR Order</Badge>
    </BadgeGroup>
  ),
};
