import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="blood-type" label="Blood Type">
      <Radio name="blood-type" value="A+"  label="A+" defaultChecked />
      <Radio name="blood-type" value="B+"  label="B+" />
      <Radio name="blood-type" value="O+"  label="O+" />
      <Radio name="blood-type" value="AB+" label="AB+" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup name="sex" label="Biological Sex" orientation="horizontal">
      <Radio name="sex" value="male"   label="Male" />
      <Radio name="sex" value="female" label="Female" />
      <Radio name="sex" value="other"  label="Other" />
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup name="consent" label="Patient Consent" required error="Please select a consent option before proceeding.">
      <Radio name="consent" value="yes"   label="Yes, I consent" />
      <Radio name="consent" value="no"    label="No, I do not consent" />
      <Radio name="consent" value="proxy" label="Proxy consent (guardian present)" />
    </RadioGroup>
  ),
};

export const ClinicalSeverity: Story = {
  render: () => (
    <RadioGroup name="severity" label="Alert Severity">
      <Radio name="severity" value="critical" label="Critical — immediate action required" clinicalSignificance="critical" />
      <Radio name="severity" value="warning"  label="Warning — monitor closely"           clinicalSignificance="warning" />
      <Radio name="severity" value="info"     label="Informational — no action needed"    clinicalSignificance="info" />
      <Radio name="severity" value="normal"   label="Normal"                              clinicalSignificance="normal" />
    </RadioGroup>
  ),
};
