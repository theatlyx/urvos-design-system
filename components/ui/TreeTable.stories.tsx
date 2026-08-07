import type { Meta, StoryObj } from "@storybook/react";
import { TreeTable } from "./TreeTable";

const meta: Meta<typeof TreeTable> = {
  title: "Data Display/TreeTable",
  component: TreeTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const ClinicalRecordHierarchy = {
  render: () => (
    <TreeTable
      className="max-w-3xl"
      data={[
        {
          id: "1",
          name: "Patient Chart #94021",
          type: "Folder",
          updatedAt: "Today 10:15 AM",
          children: [
            {
              id: "1-1",
              name: "Laboratory Studies",
              type: "Folder",
              children: [
                { id: "1-1-1", name: "CBC_With_Differential.pdf", type: "PDF Document", size: "1.2 MB", updatedAt: "Oct 24, 2023" },
                { id: "1-1-2", name: "Metabolic_Panel.pdf", type: "PDF Document", size: "840 KB", updatedAt: "Oct 24, 2023" },
              ],
            },
            {
              id: "1-2",
              name: "Radiology DICOMs",
              type: "Folder",
              children: [
                { id: "1-2-1", name: "Chest_XRay_PA.dcm", type: "DICOM Image", size: "24.5 MB", updatedAt: "Oct 22, 2023" },
              ],
            },
          ],
        },
      ]}
    />
  ),
};
