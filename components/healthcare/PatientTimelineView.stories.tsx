import type { Meta, StoryObj } from '@storybook/react';
import { PatientTimelineView } from './PatientTimelineView';

const meta = {
  title: 'Healthcare/PatientTimelineView',
  component: PatientTimelineView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PatientTimelineView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: [
      {
        id: '1',
        type: 'visit',
        date: '2026-07-25',
        title: 'Annual Physical',
        provider: 'Dr. Sarah Jenkins',
        status: 'completed',
        description: 'Patient presented for annual physical. Vitals normal. Labs ordered.'
      },
      {
        id: '2',
        type: 'lab',
        date: '2026-07-26',
        title: 'Comprehensive Metabolic Panel',
        provider: 'Quest Diagnostics',
        status: 'pending',
      },
      {
        id: '3',
        type: 'prescription',
        date: '2026-07-25',
        title: 'Lisinopril 10mg',
        provider: 'Dr. Sarah Jenkins',
        description: 'Take 1 tablet by mouth daily for hypertension.'
      },
      {
        id: '4',
        type: 'note',
        date: '2026-07-20',
        title: 'Triage Note',
        provider: 'Nurse Nancy',
        description: 'Patient called reporting mild headaches. Advised to take Tylenol and mention at upcoming physical.'
      }
    ],
    className: 'max-w-3xl mx-auto',
  },
};
