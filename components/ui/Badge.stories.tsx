import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge Primitive",
  component: Badge,
};

export default meta;

export const Critical: StoryObj<typeof Badge> = {
  args: {
    variant: "critical",
    children: "STAT Emergency",
  },
};

export const Caution: StoryObj<typeof Badge> = {
  args: {
    variant: "caution",
    children: "Abnormal Lab Value",
  },
};

export const Success: StoryObj<typeof Badge> = {
  args: {
    variant: "success",
    children: "Medication Administered",
  },
};

export const Info: StoryObj<typeof Badge> = {
  args: {
    variant: "info",
    children: "Telehealth Room Active",
  },
};

export const AI: StoryObj<typeof Badge> = {
  args: {
    variant: "ai",
    children: "AI Scribe Summary",
  },
};

export const Neutral: StoryObj<typeof Badge> = {
  args: {
    variant: "neutral",
    children: "General Outpatient",
  },
};
