import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], showValue: true, label: "Dosage (mg)" },
};

export const Range: Story = {
  args: { defaultValue: [20, 80], min: 0, max: 100, showValue: true, label: "Normal range" },
};

export const Disabled: Story = {
  args: { defaultValue: [65], disabled: true, label: "Disabled slider" },
};

export const DosageSliders: Story = {
  render: () => (
    <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 24 }}>
      <Slider defaultValue={[250]} min={0} max={1000} step={50} showValue label="Amoxicillin (mg)" />
      <Slider defaultValue={[500]} min={0} max={2000} step={100} showValue label="Metformin (mg)" />
      <Slider defaultValue={[75]} min={0} max={300} step={25} showValue label="Aspirin (mg)" disabled />
    </div>
  ),
};
