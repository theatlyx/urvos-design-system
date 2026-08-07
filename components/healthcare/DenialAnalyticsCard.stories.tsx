import type { Meta, StoryObj } from "@storybook/react";
import { DenialAnalyticsCard } from "./DenialAnalyticsCard";

const meta: Meta<typeof DenialAnalyticsCard> = {
  title: "Healthcare/Denial Analytics Card",
  component: DenialAnalyticsCard,
};

export default meta;

export const Default: StoryObj<typeof DenialAnalyticsCard> = {
  args: {
    denials: [
      {
        id: "DEN-101",
        claimId: "CLM-9012",
        patientName: "Rohan Kapoor",
        denialCode: "CARC 96 / RARC N382",
        denialReason: "Non-covered service: Missing pre-authorization for MRI Brain",
        amount: "₹24,500",
        suggestedAction: "Attach Retroactive Auth Letter from Radiologist",
        deadlineDate: "2026-08-15",
      },
      {
        id: "DEN-102",
        claimId: "CLM-9088",
        patientName: "Meera Nair",
        denialCode: "CARC 16",
        denialReason: "Claim lacks mandatory ICD-10 primary diagnosis specificity",
        amount: "₹8,200",
        suggestedAction: "Update ICD-10 to E11.9 (Type 2 DM) & resubmit 837P",
        deadlineDate: "2026-08-10",
      },
    ],
  },
};
