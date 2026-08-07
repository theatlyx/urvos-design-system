import type { Meta, StoryObj } from "@storybook/react";
import { UserManagement } from "./UserManagement";

const meta: Meta<typeof UserManagement> = {
  title: "Templates/Administrative & Settings/User Management",
  component: UserManagement,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof UserManagement> = {};
