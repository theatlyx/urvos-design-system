import type { Meta, StoryObj } from "@storybook/react";
import { TypographySpecimen, Heading, BodyText, Caption, Label, Code, CodeBlock } from "./Typography";

const meta: Meta<typeof TypographySpecimen> = {
  title: "UI/Typography",
  component: TypographySpecimen,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TypographySpecimen>;

export const Specimen: Story = {};

export const Headings: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Heading level={1}>Patient Summary Dashboard</Heading>
      <Heading level={2}>Vitals & Monitoring</Heading>
      <Heading level={3}>Lab Results — July 2026</Heading>
      <Heading level={4}>Potassium Levels</Heading>
    </div>
  ),
};

export const BodyVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
      <BodyText size="lg">Large (17px) — Patient was admitted with chest pain and shortness of breath.</BodyText>
      <BodyText size="md">Medium (15px) — Vitals were within normal limits on admission. Blood pressure 118/76 mmHg.</BodyText>
      <BodyText size="sm">Small (14px) — Refer to attending physician if readings persist beyond 48 hours.</BodyText>
      <BodyText size="xs">XS (13px) — Last updated 23 Jul 2026, 10:42 AM IST</BodyText>
      <BodyText size="md" color="muted">Muted — Supporting information or helper text.</BodyText>
      <BodyText size="md" color="subtle">Subtle — Timestamps and metadata.</BodyText>
    </div>
  ),
};

export const Utilities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Caption>Caption — image captions, footnotes, table headers</Caption>
      <Label htmlFor="demo">Form label</Label>
      <div>Inline <Code>potassium = 6.1</Code> code</div>
      <CodeBlock language="json">{`{\n  "patientId": "P-1029",\n  "status": "admitted",\n  "bp": "118/76"\n}`}</CodeBlock>
    </div>
  ),
};
