import type { Meta, StoryObj } from "@storybook/react";
import { NursingHandoffReport } from "./HandoffReport";

const meta: Meta<typeof NursingHandoffReport> = {
  title: "Healthcare/Nursing Handoff Report",
  component: NursingHandoffReport,
};

export default meta;

export const Default: StoryObj<typeof NursingHandoffReport> = {
  args: {
    report: {
      patientName: "Vikram Malhotra",
      roomBed: "ICU-Bed-04",
      mrn: "MRN-884102",
      outgoingNurse: "Nurse Sarah (RN)",
      incomingNurse: "Nurse David (RN)",
      shiftType: "Day Shift",
      highRiskAlerts: [
        "Fall Risk Protocol active (Score: 6)",
        "NPO after midnight for scheduled Laparoscopic Cholecystectomy",
        "IV Potassium Chloride running via infusion pump at 10 mEq/hr",
      ],
      situation: "62-year-old male admitted post-op day 1 following bowel resection. SpO2 stable at 98% on 2L NC.",
      background: "History of Type 2 Diabetes, Hypertension, and CKD Stage III. Penicillin allergy.",
      assessment: "Abdominal dressing clean and dry. Pain score 3/10 post IV Morphine administration. Foley catheter output 45mL/hr clear amber.",
      recommendation: "Reassess pain score at 14:00. Draw stat Serum Creatinine & Electrolytes panel at 16:00.",
    },
  },
};
