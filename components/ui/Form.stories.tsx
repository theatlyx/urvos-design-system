import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Form";

const meta: Meta<typeof Field> = {
  title: "UI/Form Field Primitive",
  component: Field,
};

export default meta;

export const Default: StoryObj<typeof Field> = {
  args: {
    label: "Patient ABHA Number",
    help: "Enter 14-digit National Health ID",
    children: (
      <input
        type="text"
        placeholder="91-1234-5678-9012"
        className="px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-surface w-full"
      />
    ),
  },
};

export const WithError: StoryObj<typeof Field> = {
  args: {
    label: "Patient Weight (kg)",
    error: "Weight is required to calculate dosage",
    children: (
      <input
        type="number"
        placeholder="e.g. 70"
        className="px-3 py-1.5 text-xs border border-urvos-destructive rounded bg-urvos-surface w-full"
      />
    ),
  },
};
