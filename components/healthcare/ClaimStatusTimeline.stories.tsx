import type { Meta, StoryObj } from "@storybook/react";
import { ClaimStatusTimeline } from "./ClaimStatusTimeline";

const meta: Meta<typeof ClaimStatusTimeline> = {
  title: "Healthcare/Claim Status Timeline",
  component: ClaimStatusTimeline,
};

export default meta;

export const InProgress: StoryObj<typeof ClaimStatusTimeline> = {
  args: {
    claimId: "CLM-2026-9041",
    payerName: "Star Health & Allied Insurance",
    totalClaimAmount: "₹1,45,000",
    approvedAmount: "₹1,32,000",
    steps: [
      { id: "1", title: "Claim Filed & Submitted (EDI 837)", timestamp: "2026-07-20 09:30 AM", status: "completed", description: "Batch submitted with ICD-10 & CPT codes." },
      { id: "2", title: "Pre-Authorization Clearance", timestamp: "2026-07-21 02:15 PM", status: "completed", description: "Pre-auth approval code #AUTH-9921 received." },
      { id: "3", title: "Adjudication & Line Audit", timestamp: "2026-07-23 11:00 AM", status: "current", description: "Payer clearinghouse evaluating room rent & lab charges." },
      { id: "4", title: "Remittance Advice (ERA 835)", timestamp: "Pending", status: "pending" },
      { id: "5", title: "EFT Bank Settlement", timestamp: "Pending", status: "pending" },
    ],
  },
};
