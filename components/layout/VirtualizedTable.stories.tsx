import type { Meta, StoryObj } from "@storybook/react";
import { VirtualizedTable, type VirtualColumn } from "./VirtualizedTable";
import { Badge } from "../ui/Badge";

interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
}

const mockLogs: AuditLog[] = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
  user: `user_${(i % 15) + 1}@urvos.health`,
  action: i % 3 === 0 ? "READ_EHR" : i % 3 === 1 ? "UPDATE_VITAL" : "PRESCRIBE_MED",
  resource: `FHIR/Patient/PT-${1000 + (i % 50)}`,
  ip: `192.168.1.${(i % 254) + 1}`,
}));

const columns: VirtualColumn<AuditLog>[] = [
  { key: "id", header: "#", width: 60 },
  { key: "timestamp", header: "Timestamp", width: 180 },
  { key: "user", header: "Practitioner", width: 200 },
  {
    key: "action",
    header: "Action",
    width: 150,
    accessor: (row) => (
      <Badge variant={row.action.startsWith("PRESCRIBE") ? "caution" : "neutral"}>
        {row.action}
      </Badge>
    ),
  },
  { key: "resource", header: "Target Resource", width: 220 },
  { key: "ip", header: "Client IP", width: 120 },
];

const meta: Meta<typeof VirtualizedTable> = {
  title: "Data Display/VirtualizedTable",
  component: VirtualizedTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const MillionRecordSimulation = {
  render: () => (
    <div className="space-y-2 max-w-4xl">
      <h3 className="font-bold text-sm text-urvos-text">Clinical Audit Trail (1,000 Virtualized Rows)</h3>
      <VirtualizedTable data={mockLogs} columns={columns} containerHeight={400} />
    </div>
  ),
};
