import type { Meta, StoryObj } from "@storybook/react";
import { SignatureCapture } from "./SignatureCapture";

const meta: Meta<typeof SignatureCapture> = {
  title: "Healthcare/Digital Signature Capture",
  component: SignatureCapture,
};

export default meta;

export const Default: StoryObj<typeof SignatureCapture> = {
  args: {
    signatoryName: "Dr. Vikram Malhotra",
    signatoryRole: "Attending Physician (Reg #MC-99821)",
  },
};
