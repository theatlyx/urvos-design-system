import type { Meta, StoryObj } from '@storybook/react';
import { PatientEducation } from './PatientEducation';

const meta: Meta<typeof PatientEducation> = {
  title: 'Healthcare/PatientEducation',
  component: PatientEducation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof PatientEducation> = {
  args: {
    materials: [
      {
        id: '1',
        title: 'Managing Type 2 Diabetes — A Patient Guide',
        type: 'article',
        description: 'An overview of lifestyle changes, medication management, and monitoring blood glucose levels.',
        url: 'https://example.com/diabetes-guide',
        status: 'completed',
        dateAssigned: '2024-01-10',
      },
      {
        id: '2',
        title: 'Insulin Injection Technique (Video)',
        type: 'video',
        description: 'Step-by-step demonstration of how to self-administer insulin safely.',
        url: 'https://example.com/insulin-video',
        status: 'viewed',
        dateAssigned: '2024-01-12',
      },
      {
        id: '3',
        title: 'Dietary Guidelines for Hypertension',
        type: 'pdf',
        description: 'DASH diet recommendations and sodium intake guidelines from the AHA.',
        url: 'https://example.com/hypertension-diet.pdf',
        status: 'assigned',
        dateAssigned: '2024-01-15',
      },
    ],
  },
};

export const Empty: StoryObj<typeof PatientEducation> = {
  args: {
    materials: [],
  },
};

export const AllCompleted: StoryObj<typeof PatientEducation> = {
  args: {
    materials: [
      {
        id: '1',
        title: 'Understanding Blood Pressure',
        type: 'article',
        description: 'What your blood pressure numbers mean and when to seek care.',
        url: 'https://example.com/bp-guide',
        status: 'completed',
        dateAssigned: '2024-01-01',
      },
      {
        id: '2',
        title: 'Medication Adherence',
        type: 'pdf',
        description: 'Why taking your medications as prescribed is critical to your health.',
        url: 'https://example.com/adherence.pdf',
        status: 'completed',
        dateAssigned: '2024-01-03',
      },
    ],
  },
};
