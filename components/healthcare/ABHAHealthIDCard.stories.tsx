import type { Meta, StoryObj } from "@storybook/react";
import { ABHAHealthIDCard } from "./ABHAHealthIDCard";

const meta: Meta<typeof ABHAHealthIDCard> = {
  title: "Healthcare/ABHA Health ID Card",
  component: ABHAHealthIDCard,
};

export default meta;

export const Default: StoryObj<typeof ABHAHealthIDCard> = {
  args: {
    name: "Dr. Ananya Roy",
    abhaAddress: "ananya.roy@abdm",
    abhaNumber: "91-8812-4409-1234",
    gender: "Female",
    dateOfBirth: "14-08-1992",
    mobile: "9876543210",
    district: "Bengaluru Urban",
    state: "Karnataka",
    isVerified: true,
  },
};
