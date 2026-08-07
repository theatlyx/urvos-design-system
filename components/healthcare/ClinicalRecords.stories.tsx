import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MedicationAdministration, ImmunizationRecord, ProcedureHistory } from './ClinicalRecords';

const meta: Meta = {
  title: 'Healthcare/ClinicalRecords',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-6 bg-urvos-background min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ─── MedicationAdministration ────────────────────────────────────────────────

export const MedicationAdministrationExample: StoryObj<typeof MedicationAdministration> = {
  render: () => (
    <MedicationAdministration
      medications={[
        {
          id: 'med-1',
          medicationName: 'Lisinopril',
          dosage: '10 mg',
          route: 'Oral',
          frequency: 'Once daily',
          status: 'active',
          prescriber: 'Dr. Arun Kumar',
          dateStarted: '2024-01-01',
        },
        {
          id: 'med-2',
          medicationName: 'Metformin',
          dosage: '500 mg',
          route: 'Oral',
          frequency: 'Twice daily with meals',
          status: 'active',
          prescriber: 'Dr. Arun Kumar',
          dateStarted: '2023-11-15',
        },
        {
          id: 'med-3',
          medicationName: 'Atorvastatin',
          dosage: '20 mg',
          route: 'Oral',
          frequency: 'At bedtime',
          status: 'completed',
          prescriber: 'Dr. Sunita Menon',
          dateStarted: '2023-06-01',
        },
        {
          id: 'med-4',
          medicationName: 'Aspirin',
          dosage: '81 mg',
          route: 'Oral',
          frequency: 'Once daily',
          status: 'on-hold',
          prescriber: 'Dr. Arun Kumar',
          dateStarted: '2022-03-10',
        },
      ]}
    />
  ),
};

// ─── ImmunizationRecord ───────────────────────────────────────────────────────

export const ImmunizationRecordExample: StoryObj<typeof ImmunizationRecord> = {
  render: () => (
    <ImmunizationRecord
      immunizations={[
        {
          id: 'imm-1',
          vaccineCode: 'Influenza (Flu) Trivalent',
          occurrenceDate: '2023-10-15',
          lotNumber: 'LOT-2023-F01',
          site: 'Left deltoid',
          status: 'completed',
          performer: 'Nurse Anjali Singh',
        },
        {
          id: 'imm-2',
          vaccineCode: 'COVID-19 Booster (mRNA-BNT162b2)',
          occurrenceDate: '2023-09-01',
          lotNumber: 'LOT-CV-9001',
          site: 'Right deltoid',
          status: 'completed',
          performer: 'Dr. Arun Kumar',
        },
        {
          id: 'imm-3',
          vaccineCode: 'Pneumococcal (PPSV23)',
          occurrenceDate: '2024-02-01',
          status: 'not-done',
        },
      ]}
    />
  ),
};

// ─── ProcedureHistory ────────────────────────────────────────────────────────

export const ProcedureHistoryExample: StoryObj<typeof ProcedureHistory> = {
  render: () => (
    <ProcedureHistory
      procedures={[
        {
          id: 'proc-1',
          procedureName: 'Coronary Artery Bypass Grafting (CABG)',
          performedDate: '2020-04-12',
          performer: 'Dr. Rajesh Patel',
          bodySite: 'Thorax',
          status: 'completed',
          outcome: 'Triple bypass performed successfully without complications.',
        },
        {
          id: 'proc-2',
          procedureName: 'Upper GI Endoscopy',
          performedDate: '2023-06-20',
          performer: 'Dr. Priya Nair',
          status: 'completed',
        },
        {
          id: 'proc-3',
          procedureName: 'Knee Arthroscopy (Right)',
          performedDate: '2024-03-01',
          performer: 'Dr. Vinod Sharma',
          bodySite: 'Right knee',
          status: 'in-progress',
        },
      ]}
    />
  ),
};
