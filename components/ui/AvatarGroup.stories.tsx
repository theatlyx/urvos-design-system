import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./AvatarGroup";
import { Avatar } from "./Feedback";

const meta: Meta<typeof AvatarGroup> = {
  title: "UI/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Dr. Sarah Jenkins" size="md" status="online" />
      <Avatar name="Dr. Mark Vance" size="md" status="busy" />
      <Avatar name="RN Emily Davis" size="md" status="online" />
      <Avatar name="Dr. Robert Johnson" size="md" status="away" />
      <Avatar name="RN Lisa Ray" size="md" />
    </AvatarGroup>
  ),
};
