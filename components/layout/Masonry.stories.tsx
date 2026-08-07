import type { Meta, StoryObj } from "@storybook/react";
import { Masonry } from "./Masonry";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const meta: Meta<typeof Masonry> = {
  title: "Layout/Masonry",
  component: Masonry,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <Masonry columns={3}>
      <Card className="p-4"><CardTitle>Vitals Summary</CardTitle><CardContent className="p-0 text-xs">BP 120/80, HR 72, Temp 98.6F</CardContent></Card>
      <Card className="p-4"><CardTitle>Active Medications</CardTitle><CardContent className="p-0 text-xs">Lisinopril 10mg, Metformin 500mg, Atorvastatin 20mg</CardContent></Card>
      <Card className="p-4"><CardTitle>Allergies</CardTitle><CardContent className="p-0 text-xs">Penicillin</CardContent></Card>
      <Card className="p-4"><CardTitle>Recent Care Plan</CardTitle><CardContent className="p-0 text-xs">Post-op physical therapy twice weekly.</CardContent></Card>
    </Masonry>
  ),
};
