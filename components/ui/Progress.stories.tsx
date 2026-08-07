import type { Meta, StoryObj } from "@storybook/react";
import { Progress, LabelledProgress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size:  { control: "select", options: ["xs", "sm", "md", "lg"] },
    color: { control: "select", options: ["default", "success", "warning", "danger", "gradient"] },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { value: 65 } };

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 400 }}>
      <Progress value={60} color="default" />
      <Progress value={60} color="success" />
      <Progress value={60} color="warning" />
      <Progress value={60} color="danger" />
      <Progress value={60} color="gradient" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 400 }}>
      <Progress value={70} size="xs" />
      <Progress value={70} size="sm" />
      <Progress value={70} size="md" />
      <Progress value={70} size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 16 }}>
      <LabelledProgress label="Patient intake completion" value={82} color="success" />
      <LabelledProgress label="Lab results processed" value={45} color="warning" />
      <LabelledProgress label="Medication adherence" value={91} color="default" />
    </div>
  ),
};
