import type { Meta, StoryObj } from "@storybook/react";
import { PatientBanner } from "./PatientBanner";
import type { Patient, AllergyIntolerance } from "@medplum/fhirtypes";

const meta: Meta<typeof PatientBanner> = {
  title: "Healthcare/PatientBanner",
  component: PatientBanner,
  tags: ["autodocs"],
};

export default meta;

const mockPatient: Patient = {
  resourceType: "Patient",
  id: "123",
  name: [{ given: ["Jane"], family: "Doe" }],
  birthDate: "1980-05-15",
  gender: "female",
  identifier: [{ system: "urn:oid:1.2.36.146.595.217.0.1", value: "MRN-987654" }],
};

const mockAllergies: AllergyIntolerance[] = [
  {
    resourceType: "AllergyIntolerance",
    patient: { reference: "Patient/123" },
    clinicalStatus: { coding: [{ code: "active" }] },
    criticality: "high",
    code: { text: "Penicillin" }
  }
];

export const Default = {
  args: {
    patient: mockPatient,
  },
};

export const WithCriticalAllergies = {
  args: {
    patient: mockPatient,
    allergies: mockAllergies,
  },
};
