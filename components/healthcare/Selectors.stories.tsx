import type { Meta, StoryObj } from '@storybook/react';
import { BaseSelector, PatientSelector, ProviderSelector, type SelectorOption } from './Selectors';
import { useState } from 'react';

const meta: Meta<typeof BaseSelector> = {
  title: 'Healthcare/Selectors',
  component: BaseSelector,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-4 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const mockPatients: SelectorOption[] = [
  { id: '1', label: 'Priya Sharma', subLabel: 'DOB: 1985-04-12 · MRN-0042' },
  { id: '2', label: 'James Smith', subLabel: 'DOB: 1972-11-30 · MRN-0099' },
  { id: '3', label: 'Meera Nair', subLabel: 'DOB: 1990-07-22 · MRN-0123' },
  { id: '4', label: 'Arjun Patel', subLabel: 'DOB: 2001-01-08 · MRN-0201' },
];

const mockProviders: SelectorOption[] = [
  { id: 'p1', label: 'Dr. Arun Kumar', subLabel: 'Endocrinology', avatarUrl: 'https://i.pravatar.cc/80?img=11' },
  { id: 'p2', label: 'Dr. Sunita Menon', subLabel: 'Cardiology', avatarUrl: 'https://i.pravatar.cc/80?img=49' },
  { id: 'p3', label: 'Dr. Rajesh Patel', subLabel: 'Internal Medicine', avatarUrl: 'https://i.pravatar.cc/80?img=7' },
];

export const GenericSelector: StoryObj<typeof BaseSelector> = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectorOption | undefined>();
    return <BaseSelector {...args} value={selected} onChange={setSelected} />;
  },
  args: {
    placeholder: 'Select an option...',
    options: mockPatients,
  },
};

export const PatientSelectorDemo: StoryObj<typeof PatientSelector> = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectorOption | undefined>();
    return <PatientSelector {...args} value={selected} onChange={setSelected} />;
  },
  args: {
    options: mockPatients,
    placeholder: 'Search and select patient...',
  },
};

export const ProviderSelectorDemo: StoryObj<typeof ProviderSelector> = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectorOption | undefined>();
    return <ProviderSelector {...args} value={selected} onChange={setSelected} />;
  },
  args: {
    options: mockProviders,
    placeholder: 'Search and select provider...',
  },
};
