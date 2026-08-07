import type { Meta, StoryObj } from '@storybook/react';
import { PatientTimeline } from './PatientTimeline';

const meta: Meta<typeof PatientTimeline> = {
  title: 'Healthcare/PatientTimeline',
  component: PatientTimeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-urvos-background min-h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof PatientTimeline> = {
  args: {
    events: [
      {
        id: '1',
        date: '2024-01-15T10:30:00Z',
        title: 'Primary Care Visit',
        description: 'Annual physical examination. Patient reported mild fatigue and occasional headaches.',
        type: 'encounter',
        performer: 'Dr. Gregory House',
      },
      {
        id: '2',
        date: '2024-01-15T11:15:00Z',
        title: 'Comprehensive Metabolic Panel',
        description: 'Ordered to investigate fatigue. Results pending.',
        type: 'lab',
      },
      {
        id: '3',
        date: '2024-01-16T09:00:00Z',
        title: 'Prescribed Vitamin D',
        description: '50,000 IU weekly for 8 weeks due to deficiency.',
        type: 'medication',
        performer: 'Dr. Gregory House',
      },
      {
        id: '4',
        date: '2024-01-10T08:00:00Z',
        title: 'Influenza Vaccine',
        description: 'Annual flu vaccination administered.',
        type: 'immunization',
        performer: 'Nurse Anjali',
      },
      {
        id: '5',
        date: '2024-01-05T14:30:00Z',
        title: 'Cardiology Consult Note',
        description: 'Follow-up for hypertension management. Continue current medications.',
        type: 'note',
        performer: 'Dr. Priya Nair',
      },
    ],
  },
};

export const Empty: StoryObj<typeof PatientTimeline> = {
  args: {
    events: [],
  },
};

export const SingleEvent: StoryObj<typeof PatientTimeline> = {
  args: {
    events: [
      {
        id: '1',
        date: '2024-01-15T10:30:00Z',
        title: 'Emergency Room Visit',
        description: 'Patient presented with chest pain. ECG normal. Discharged with follow-up.',
        type: 'encounter',
        performer: 'Dr. Sarah Connor',
      },
    ],
  },
};
