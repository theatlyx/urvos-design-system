import type { Meta, StoryObj } from "@storybook/react";
import { ABDMConsentManager } from "./ABDMConsentManager";

const meta: Meta<typeof ABDMConsentManager> = {
  title: "Healthcare/ABDM Consent Manager",
  component: ABDMConsentManager,
};

export default meta;

export const Default: StoryObj<typeof ABDMConsentManager> = {
  args: {
    consents: [
      {
        id: "CONS-001",
        purpose: "Care Management",
        status: "GRANTED",
        patientAbhaId: "priya.sharma@abdm",
        createdAt: "2026-07-20",
        expiresAt: "2026-08-20",
        hiTypes: ["OPConsultation", "Prescription", "DischargeSummary"],
        careContexts: [
          { id: "CC-1", patientReference: "PAT-101", careContextReference: "ENC-991", display: "General OPD Visit" },
        ],
      },
      {
        id: "CONS-002",
        purpose: "Diagnostic Result Review",
        status: "REQUESTED",
        patientAbhaId: "91-8822-1100-4411",
        createdAt: "2026-07-24",
        expiresAt: "2026-07-27",
        hiTypes: ["DiagnosticReport", "LabReport"],
        careContexts: [],
      },
      {
        id: "CONS-003",
        purpose: "Emergency Consultation",
        status: "EXPIRED",
        patientAbhaId: "rahul.verma@abdm",
        createdAt: "2026-06-01",
        expiresAt: "2026-07-01",
        hiTypes: ["Prescription"],
        careContexts: [],
      },
    ],
  },
};
