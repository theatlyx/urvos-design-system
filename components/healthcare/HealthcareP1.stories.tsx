import type { Meta, StoryObj } from "@storybook/react";
import { MedicationAdministration } from "./MedicationAdministration";
import { ImmunizationRecord } from "./ImmunizationRecord";
import { ProcedureHistory } from "./ProcedureHistory";
import { CarePlanViewer } from "../organisms/CarePlanViewer";

const meta: Meta = {
  title: "Healthcare/FHIR Suite P1",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

export const MARLog = {
  render: () => (
    <MedicationAdministration
      items={[
        {
          id: "1",
          medicationName: "LasiX (Furosemide)",
          dosage: "40 mg",
          route: "IV Push",
          status: "completed",
          administeredAt: "Today at 09:30 AM",
          practitionerName: "RN Mark Vance",
          notes: "Patient tolerated well. Urine output monitored.",
        },
        {
          id: "2",
          medicationName: "Heparin Sodium",
          dosage: "5000 Units",
          route: "Subcutaneous",
          status: "in-progress",
          administeredAt: "Scheduled for 02:00 PM",
          practitionerName: "RN Sarah Jenkins",
        },
      ]}
      className="max-w-2xl"
    />
  ),
};

export const VaccineRegistry = {
  render: () => (
    <ImmunizationRecord
      records={[
        {
          id: "v1",
          vaccineName: "COVID-19 mRNA (Spikevax)",
          targetDisease: "SARS-CoV-2",
          doseNumber: "Dose 2 of 2",
          dateGiven: "Oct 12, 2023",
          status: "completed",
        },
        {
          id: "v2",
          vaccineName: "Influenza Quadrivalent",
          targetDisease: "Seasonal Influenza",
          doseNumber: "Annual Dose",
          dateGiven: "Nov 01, 2023",
          status: "completed",
        },
        {
          id: "v3",
          vaccineName: "Tdap (Adacel)",
          targetDisease: "Tetanus, Diphtheria, Pertussis",
          doseNumber: "Booster",
          dateGiven: "Due Next Month",
          status: "scheduled",
        },
      ]}
      className="max-w-2xl"
    />
  ),
};

export const SurgicalProcedures = {
  render: () => (
    <ProcedureHistory
      procedures={[
        {
          id: "p1",
          procedureName: "Laparoscopic Appendectomy",
          code: "CPT-44970",
          performedDate: "Aug 14, 2022",
          performerName: "Dr. Robert Vance, FACS",
          status: "completed",
          outcome: "Successful removal without complications.",
        },
        {
          id: "p2",
          procedureName: "Diagnostic Coronary Angiography",
          code: "CPT-93458",
          performedDate: "Jan 10, 2023",
          performerName: "Dr. Elena Rostova, MD",
          status: "completed",
          outcome: "Minimal stenosis observed (<20%).",
        },
      ]}
      className="max-w-2xl"
    />
  ),
};

export const InterdisciplinaryCarePlan = {
  render: () => (
    <CarePlanViewer
      goals={[
        { id: "g1", description: "Maintain Systolic BP < 130 mmHg", targetDate: "Dec 31, 2023", status: "in-progress" },
        { id: "g2", description: "Walk 30 mins daily without angina", targetDate: "Nov 15, 2023", status: "achieved" },
      ]}
      activities={[
        { id: "a1", title: "Daily Weight & BP Log", frequency: "Every morning before breakfast" },
        { id: "a2", title: "Cardiac Rehab Physical Therapy", frequency: "3x weekly (Mon/Wed/Fri)" },
      ]}
      className="max-w-2xl"
    />
  ),
};
