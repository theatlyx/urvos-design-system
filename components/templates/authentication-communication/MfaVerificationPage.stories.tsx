import type { Meta, StoryObj } from "@storybook/react";
import { MfaVerificationPage } from "./MfaVerificationPage";

const meta = {
  title: "Templates/Authentication & Communication/MfaVerificationPage",
  component: MfaVerificationPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MfaVerificationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSms: Story = {
  args: {
    defaultMethod: "sms",
    phoneNumber: "***-***-4321",
  },
};

export const DefaultEmail: Story = {
  args: {
    defaultMethod: "email",
    email: "doctor@hospital.com",
  },
};

export const DefaultAuthenticator: Story = {
  args: {
    defaultMethod: "authenticator",
  },
};
