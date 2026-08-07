import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";
import { Badge } from "./Badge";

const meta: Meta<typeof Timeline> = {
  title: "UI/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

const clinicalEvents = [
  {
    id: "1",
    variant: "success" as const,
    date: "Today, 10:42 AM",
    title: "Patient admitted to Ward B",
    description: "Dr. Arun Kumar initiated the admission. Vitals stable.",
  },
  {
    id: "2",
    variant: "warning" as const,
    date: "Today, 09:15 AM",
    title: "Lab results flagged",
    description: "Potassium level at 6.1 mEq/L — above normal range.",
    badge: <Badge variant="caution">Review required</Badge>,
  },
  {
    id: "3",
    variant: "info" as const,
    date: "Yesterday, 06:30 PM",
    title: "Medication prescribed",
    description: "Amoxicillin 500mg TID for 7 days.",
  },
  {
    id: "4",
    variant: "error" as const,
    date: "Yesterday, 05:00 PM",
    title: "Critical alert — BP spike",
    description: "Blood pressure recorded at 180/110. Attending notified.",
    badge: <Badge variant="critical">Critical</Badge>,
  },
  {
    id: "5",
    variant: "success" as const,
    date: "2 days ago",
    title: "Discharge planning initiated",
    description: "Patient education completed. Follow-up scheduled for 7 days.",
  },
];

export const Default: Story = { args: { events: clinicalEvents } };

export const Short: Story = {
  args: {
    events: clinicalEvents.slice(0, 3),
  },
};
