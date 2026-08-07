import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup, Skeleton, SkeletonCard, SkeletonTableRows, EmptyState } from "./Feedback";
import { Button } from "./Button";
import { FileX } from "lucide-react";

// ─── AVATAR ─────────────────────────────────────────────────────

const avatarMeta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default avatarMeta;
type AvatarStory = StoryObj<typeof Avatar>;

export const Default: AvatarStory = { args: { name: "Priya Sharma" } };
export const WithImage: AvatarStory = { args: { name: "Reza Parsa", src: "https://i.pravatar.cc/80?img=3" } };
export const WithStatus: AvatarStory = { args: { name: "Dr. Arun", status: "online" } };

export const AllSizes: AvatarStory = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
    </div>
  ),
};

export const AllStatuses: AvatarStory = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Avatar name="Online" status="online" />
      <Avatar name="Busy" status="busy" />
      <Avatar name="Away" status="away" />
    </div>
  ),
};

export const Group: AvatarStory = {
  render: () => (
    <AvatarGroup>
      <Avatar name="Priya S" />
      <Avatar name="Arun K" />
      <Avatar name="Reza P" src="https://i.pravatar.cc/80?img=5" />
      <Avatar name="Sneha M" />
    </AvatarGroup>
  ),
};
