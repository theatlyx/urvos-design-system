import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "UI/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["filled", "outline", "ghost", "text", "tonal", "elevated", "fab", "icon", "link", "split", "toggle"] },
    intent: { control: "select", options: ["brand", "neutral", "success", "warning", "danger", "info"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "icon"] },
    shape: { control: "select", options: ["default", "square", "pill", "circle"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "filled", intent: "brand", children: "Sign encounter" } };
export const Secondary: Story = { args: { variant: "outline", intent: "neutral", children: "Cancel" } };
export const Danger: Story = { args: { variant: "filled", intent: "danger", children: "Discontinue" } };
export const DangerOutline: Story = { args: { variant: "outline", intent: "danger", children: "Discontinue" } };
export const Loading: Story = { args: { variant: "filled", intent: "brand", loading: true, children: "Saving" } };
export const Disabled: Story = { args: { variant: "filled", intent: "brand", disabled: true, children: "Sign encounter" } };

/**
 * This story exists specifically to catch a real regression class: icon-only
 * buttons need an aria-label since their visible text is intentionally
 * hidden. The a11y addon will flag this story red if that label is removed.
 */
export const IconOnly: Story = {
  args: { variant: "icon", intent: "neutral", size: "icon", "aria-label": "Close", children: "✕" },
};
