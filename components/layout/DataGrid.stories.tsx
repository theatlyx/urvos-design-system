import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid, type Column } from "./DataGrid";
import { Badge } from "../ui/Badge";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: "critical" | "warning" | "stable";
}

const mockPatients: Patient[] = [
  { id: "PT-101", name: "Eleanor Vance", age: 45, gender: "Female", condition: "Hypertension", status: "stable" },
  { id: "PT-102", name: "Marcus Thorne", age: 62, gender: "Male", condition: "Type 2 Diabetes", status: "warning" },
  { id: "PT-103", name: "Sophia Chen", age: 29, gender: "Female", condition: "Asthma Exacerbation", status: "critical" },
  { id: "PT-104", name: "David Miller", age: 71, gender: "Male", condition: "Atrial Fibrillation", status: "warning" },
  { id: "PT-105", name: "Aria Montgomery", age: 34, gender: "Female", condition: "Pregnancy Routine", status: "stable" },
  { id: "PT-106", name: "James Wilson", age: 58, gender: "Male", condition: "Post-Op Recovery", status: "stable" },
];

const columns: Column<Patient>[] = [
  { key: "id", header: "MRN / ID", sortable: true },
  { key: "name", header: "Patient Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "gender", header: "Gender" },
  { key: "condition", header: "Primary Condition", sortable: true },
  {
    key: "status",
    header: "Clinical Status",
    sortable: true,
    accessor: (row) => (
      <Badge
        variant={
          row.status === "critical"
            ? "danger"
            : row.status === "warning"
            ? "warning"
            : "success"
        }
      >
        {row.status.toUpperCase()}
      </Badge>
    ),
  },
];

const meta: Meta<typeof DataGrid> = {
  title: "Data Display/DataGrid",
  component: DataGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => <DataGrid data={mockPatients} columns={columns} pageSize={5} selectable />,
};
