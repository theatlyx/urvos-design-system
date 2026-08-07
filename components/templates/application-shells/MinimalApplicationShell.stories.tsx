import type { Meta, StoryObj } from "@storybook/react";
import { MinimalApplicationShell } from "./MinimalApplicationShell";

const meta: Meta<typeof MinimalApplicationShell> = {
  title: "Templates/Application Shells/Minimal Application Shell",
  component: MinimalApplicationShell,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof MinimalApplicationShell> = {
  args: {
    title: "eRx Prescription Generator",
    subtitle: "Encounter #ENC-9921 • Patient: Ananya Roy",
    children: (
      <div className="p-6 bg-urvos-surface border border-urvos-border rounded-xl space-y-4">
        <h3 className="font-bold text-base text-urvos-text">Electronic Prescription Form</h3>
        <p className="text-xs text-urvos-text-subtle">
          Add medications, dosage, route, frequency, and duration for pharmacy delivery.
        </p>
      </div>
    ),
  },
};
