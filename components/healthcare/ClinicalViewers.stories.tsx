import type { Meta, StoryObj } from '@storybook/react';
import { LabResultViewer, CarePlanViewer } from './ClinicalViewers';

// ─── LabResultViewer ──────────────────────────────────────────────────────────

const labMeta: Meta<typeof LabResultViewer> = {
  title: 'Healthcare/ClinicalViewers/LabResultViewer',
  component: LabResultViewer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-6 bg-urvos-background min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};
export default labMeta;

export const Default: StoryObj<typeof LabResultViewer> = {
  args: {
    patientName: 'Sarah Johnson',
    results: [
      { id: '1', testName: 'Sodium', value: 140, unit: 'mEq/L', referenceRange: '135–145', status: 'normal', date: '2024-01-15', category: 'Electrolytes' },
      { id: '2', testName: 'Potassium', value: 3.2, unit: 'mEq/L', referenceRange: '3.5–5.2', status: 'abnormal', date: '2024-01-15', category: 'Electrolytes' },
      { id: '3', testName: 'Glucose', value: 342, unit: 'mg/dL', referenceRange: '70–99', status: 'critical', date: '2024-01-15', category: 'Chemistry' },
      { id: '4', testName: 'Creatinine', value: 0.9, unit: 'mg/dL', referenceRange: '0.6–1.2', status: 'normal', date: '2024-01-15', category: 'Renal' },
      { id: '5', testName: 'Hemoglobin', value: 11.2, unit: 'g/dL', referenceRange: '12.0–16.0', status: 'abnormal', date: '2024-01-15', category: 'CBC' },
    ],
  },
};

export const AllNormal: StoryObj<typeof LabResultViewer> = {
  args: {
    patientName: 'James Smith',
    results: [
      { id: '1', testName: 'Sodium', value: 139, unit: 'mEq/L', referenceRange: '135–145', status: 'normal', date: '2024-01-10' },
      { id: '2', testName: 'Potassium', value: 4.1, unit: 'mEq/L', referenceRange: '3.5–5.2', status: 'normal', date: '2024-01-10' },
      { id: '3', testName: 'Glucose', value: 92, unit: 'mg/dL', referenceRange: '70–99', status: 'normal', date: '2024-01-10' },
    ],
  },
};

export const Empty: StoryObj<typeof LabResultViewer> = {
  args: { results: [] },
};

// ─── CarePlanViewer ──────────────────────────────────────────────────────────

export const CarePlan: StoryObj<typeof CarePlanViewer> = {
  render: () => (
    <CarePlanViewer
      plan={{
        id: 'cp1',
        title: 'Diabetes Management Plan',
        period: { start: '2024-01-01', end: '2024-12-31' },
        intent: 'plan',
        goals: [
          { id: 'g1', description: 'Maintain HbA1c below 7.0%', status: 'in-progress', targetDate: '2024-06-30' },
          { id: 'g2', description: 'Lose 10 lbs in 3 months', status: 'achieved', targetDate: '2024-04-01' },
          { id: 'g3', description: 'Daily blood glucose monitoring', status: 'in-progress' },
        ],
        activities: [
          { id: 'a1', title: 'Check blood glucose daily', description: 'Use glucometer before meals', status: 'in-progress', performer: 'Patient' },
          { id: 'a2', title: 'Nutrition counseling', description: 'Monthly sessions with dietician', status: 'completed', performer: 'Dr. Emily Chen' },
          { id: 'a3', title: 'Metformin 1000mg BID', description: 'Take with food', status: 'scheduled', performer: 'Pharmacy' },
        ],
      }}
    />
  ),
};
