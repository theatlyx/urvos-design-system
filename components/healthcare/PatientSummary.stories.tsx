import type { Meta, StoryObj } from '@storybook/react';
import { PatientSummary } from './PatientSummary';

const meta: Meta<typeof PatientSummary> = {
  title: 'Healthcare/PatientSummary',
  component: PatientSummary,
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

export const Default: StoryObj<typeof PatientSummary> = {
  args: {
    patient: {
      id: 'p-001',
      name: 'Priya Sharma',
      dob: '1985-04-12',
      mrn: 'MRN-2024-0042',
      gender: 'Female',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      address: '14 MG Road, Bengaluru, KA 560001',
      bloodType: 'B+',
      allergies: ['Penicillin', 'Sulfa Drugs', 'Latex'],
      primaryProvider: 'Dr. Arun Kumar',
    },
  },
};

export const MinimalData: StoryObj<typeof PatientSummary> = {
  args: {
    patient: {
      id: 'p-002',
      name: 'James Smith',
      dob: '1972-11-30',
      mrn: 'MRN-2024-0099',
      gender: 'Male',
    },
  },
};

export const WithAvatar: StoryObj<typeof PatientSummary> = {
  args: {
    patient: {
      id: 'p-003',
      name: 'Meera Nair',
      dob: '1990-07-22',
      mrn: 'MRN-2024-0123',
      gender: 'Female',
      phone: '+91 77889 90001',
      bloodType: 'O-',
      allergies: ['Aspirin'],
      primaryProvider: 'Dr. Sunita Menon',
      avatarUrl: 'https://i.pravatar.cc/80?img=47',
    },
  },
};
