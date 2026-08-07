import type { Meta, StoryObj } from '@storybook/react';
import { ClinicalDecisionSupport } from './ClinicalDecisionSupport';

const meta: Meta<typeof ClinicalDecisionSupport> = {
  title: 'Healthcare/ClinicalDecisionSupport',
  component: ClinicalDecisionSupport,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-6 space-y-4 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const CriticalAlert: StoryObj<typeof ClinicalDecisionSupport> = {
  args: {
    recommendations: [
      {
        id: 'cds-1',
        severity: 'critical',
        title: 'Severe Drug Interaction',
        description: 'Concomitant use of Warfarin and Amiodarone may significantly increase INR and bleeding risk.',
        source: 'Lexicomp',
        actionable: true,
        actionLabel: 'Review Medication',
      },
    ],
  },
};

export const MultipleRecommendations: StoryObj<typeof ClinicalDecisionSupport> = {
  args: {
    recommendations: [
      {
        id: 'cds-1',
        severity: 'critical',
        title: 'Drug Allergy Alert',
        description: 'Patient has documented allergy to Penicillin. Prescribed Amoxicillin is contraindicated.',
        source: 'EHR Allergy Registry',
        actionable: true,
        actionLabel: 'Change Medication',
      },
      {
        id: 'cds-2',
        severity: 'warning',
        title: 'Missing Lab Result',
        description: 'Recent Potassium level not found for patient on ACE Inhibitor therapy.',
        source: 'Internal Rules Engine',
        actionable: true,
        actionLabel: 'Order Lab',
      },
      {
        id: 'cds-3',
        severity: 'info',
        title: 'Preventive Care Due',
        description: 'Patient is overdue for annual influenza vaccination per CDC guidelines.',
        source: 'CDC Recommendations',
        actionable: false,
      },
    ],
  },
};

export const InfoOnly: StoryObj<typeof ClinicalDecisionSupport> = {
  args: {
    recommendations: [
      {
        id: 'cds-1',
        severity: 'info',
        title: 'Care Guideline Update',
        description: 'Updated ADA standards of care for diabetes management are now available.',
        source: 'ADA 2024',
        actionable: false,
      },
    ],
  },
};

export const Empty: StoryObj<typeof ClinicalDecisionSupport> = {
  args: {
    recommendations: [],
  },
};
