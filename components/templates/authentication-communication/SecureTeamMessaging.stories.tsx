import type { Meta, StoryObj } from "@storybook/react";
import { SecureTeamMessaging } from "./SecureTeamMessaging";

const meta: Meta<typeof SecureTeamMessaging> = {
  title: "Templates/Communication & Collaboration/Secure Team Messaging",
  component: SecureTeamMessaging,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const Default: StoryObj<typeof SecureTeamMessaging> = {};
