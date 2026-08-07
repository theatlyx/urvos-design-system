import type { Meta, StoryObj } from '@storybook/react';
import { QualityMeasure } from './QualityMeasure';

const meta: Meta<typeof QualityMeasure> = {
  title: 'Healthcare/QualityMeasure',
  component: QualityMeasure,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const MetGoal: StoryObj<typeof QualityMeasure> = {
  args: {
    measure: {
      id: 'qm-001',
      title: 'HbA1c Control (< 8%)',
      description: 'Percentage of patients 18–75 with diabetes who had HbA1c < 8.0%.',
      score: 85,
      target: 80,
      status: 'met',
      lastUpdated: '2024-01-10',
    },
  },
};

export const NotMetGoal: StoryObj<typeof QualityMeasure> = {
  args: {
    measure: {
      id: 'qm-002',
      title: 'Breast Cancer Screening',
      description: 'Percentage of women 50–74 who had a mammogram to screen for breast cancer.',
      score: 65,
      target: 75,
      status: 'not-met',
      lastUpdated: '2024-01-08',
    },
  },
};

export const PendingGoal: StoryObj<typeof QualityMeasure> = {
  args: {
    measure: {
      id: 'qm-003',
      title: 'Hypertension Control',
      description: 'Percentage of patients 18–85 who have a diagnosis of hypertension with BP < 140/90 mmHg.',
      score: 72,
      target: 80,
      status: 'pending',
      lastUpdated: '2024-01-15',
    },
  },
};
