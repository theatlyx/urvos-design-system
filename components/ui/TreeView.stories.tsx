import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "./TreeView";
import { Stethoscope, FlaskConical, Heart, Pill, FileText } from "lucide-react";

const meta: Meta<typeof TreeView> = {
  title: "UI/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TreeView>;

const patientChart = [
  {
    id: "vitals",
    label: "Vitals",
    icon: <Heart style={{ width: 16, height: 16, color: "var(--sig-critical)" }} />,
    children: [
      { id: "bp",   label: "Blood Pressure" },
      { id: "hr",   label: "Heart Rate" },
      { id: "spo2", label: "SpO₂" },
    ],
  },
  {
    id: "labs",
    label: "Lab Results",
    icon: <FlaskConical style={{ width: 16, height: 16, color: "var(--sig-info)" }} />,
    children: [
      { id: "cbc",   label: "CBC" },
      { id: "cmp",   label: "Metabolic Panel" },
      { id: "thyroid", label: "Thyroid Function" },
    ],
  },
  {
    id: "meds",
    label: "Medications",
    icon: <Pill style={{ width: 16, height: 16, color: "var(--sig-success)" }} />,
    children: [
      { id: "amox",     label: "Amoxicillin 500mg" },
      { id: "metformin",label: "Metformin 500mg" },
    ],
  },
  {
    id: "notes",
    label: "Clinical Notes",
    icon: <FileText style={{ width: 16, height: 16, color: "var(--text-3)" }} />,
    children: [
      { id: "note-1", label: "Admission Note — 23 Jul" },
      { id: "note-2", label: "Progress Note — 22 Jul" },
    ],
  },
];

export const Default: Story = {
  args: { nodes: patientChart, defaultExpanded: ["vitals", "labs"] },
};
