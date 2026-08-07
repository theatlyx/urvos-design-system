import type { Meta, StoryObj } from '@storybook/react';
import { PatientSearch, PatientSearchResult } from './PatientSearch';

const meta: Meta<typeof PatientSearch> = {
  title: 'Healthcare/PatientSearch',
  component: PatientSearch,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-xl mx-auto p-4 bg-urvos-background min-h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PatientSearch>;

const mockPatients: PatientSearchResult[] = [
  { id: '1', name: 'John Doe', dob: '1980-01-01', mrn: 'MRN-12345', gender: 'Male' },
  { id: '2', name: 'Jane Smith', dob: '1992-05-15', mrn: 'MRN-67890', gender: 'Female' },
  { id: '3', name: 'Alice Johnson', dob: '2005-11-20', mrn: 'MRN-11223', gender: 'Female' },
  { id: '4', name: 'Bob Williams', dob: '1975-03-10', mrn: 'MRN-44556', gender: 'Male' },
];

export const Default: Story = {
  args: {
    placeholder: 'Search patients by name, DOB, or MRN...',
    onSearch: async (query) => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 500));
      const lowerQuery = query.toLowerCase();
      return mockPatients.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.mrn?.toLowerCase().includes(lowerQuery) ||
          p.dob?.includes(lowerQuery)
      );
    },
    onSelect: (patient) => alert(`Selected ${patient.name}`),
  },
};

export const SlowNetwork: Story = {
  args: {
    placeholder: 'Search patients (Simulated Slow Network)...',
    onSearch: async (query) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const lowerQuery = query.toLowerCase();
      return mockPatients.filter(p => p.name.toLowerCase().includes(lowerQuery));
    },
    onSelect: (patient) => alert(`Selected ${patient.name}`),
  },
};
