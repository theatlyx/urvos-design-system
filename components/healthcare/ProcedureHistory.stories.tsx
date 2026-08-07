import type { Meta, StoryObj } from "@storybook/react";
import { ProcedureHistory } from "./ProcedureHistory";

const meta: Meta<typeof ProcedureHistory> = {
  title: "Healthcare/Procedure History",
  component: ProcedureHistory,
};

export default meta;

export const Default: StoryObj<typeof ProcedureHistory> = {
  args: {
    title: "Patient Surgical & Clinical Procedure History",
    procedures: [
      { id: "PROC-1", procedureName: "Laparoscopic Cholecystectomy", code: "SNOMED: 45596001", performedDate: "2025-11-14", performerName: "Dr. Vikram Malhotra (General Surgery)", status: "completed", outcome: "Successful resection with no intra-operative complications." },
      { id: "PROC-2", procedureName: "Diagnostic Colonoscopy with Biopsy", code: "SNOMED: 73761001", performedDate: "2024-04-20", performerName: "Dr. Rajesh Gupta (Gastroenterology)", status: "completed", outcome: "Benign hyperplastic polyps removed." },
    ],
  },
};
