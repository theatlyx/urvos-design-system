import type { Meta, StoryObj } from "@storybook/react";
import { PatientPortalMessaging } from "./PatientPortalMessaging";

const meta = {
  title: "Templates/Authentication & Communication/PatientPortalMessaging",
  component: PatientPortalMessaging,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PatientPortalMessaging>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
