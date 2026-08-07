import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card Primitive",
  component: Card,
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    variant: "default",
    header: <h3 className="font-semibold text-base text-urvos-text">Patient Summary</h3>,
    children: <p className="text-xs text-urvos-text-subtle">Primary Care Follow-Up • Scheduled 10:30 AM</p>,
    footer: <div className="text-xs text-urvos-text-muted">Last updated 5 mins ago</div>,
  },
};

export const Elevated: StoryObj<typeof Card> = {
  args: {
    variant: "elevated",
    header: <h3 className="font-semibold text-base text-urvos-text">Emergency Triage Alert</h3>,
    children: <p className="text-xs text-urvos-text-subtle">Patient in Room 4A requires immediate ECG assessment.</p>,
  },
};
