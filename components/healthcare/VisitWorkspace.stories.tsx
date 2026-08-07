import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VisitWorkspace, Encounter } from './VisitWorkspace';
import { ToothChart, ToothChartState } from './ToothChart';

const meta = {
  title: 'Healthcare/VisitWorkspace',
  component: VisitWorkspace,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VisitWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockEncounter: Encounter = {
  id: 'enc_123',
  patientId: 'PT-9876',
  patientName: 'Jane Doe',
  date: new Date().toISOString(),
  provider: 'Dr. Sarah Smith',
  chair: 'Operatory 1',
  chiefComplaint: 'Patient reports sensitivity on lower right side when drinking cold liquids.',
  status: 'draft'
};

const initialChartState: ToothChartState = {
  teeth: {
    '46': {
      id: '46',
      selected: false,
      findings: [
        { id: 'f1', type: 'caries', surfaces: ['O'], status: 'watch', createdAt: new Date().toISOString(), createdBy: 'System' }
      ],
      treatments: [],
      notes: [],
      attachments: [],
      history: []
    }
  }
};

export const Default: Story = {
  render: () => {
    const [encounter, setEncounter] = useState<Encounter>(mockEncounter);
    const [chartState, setChartState] = useState<ToothChartState>(initialChartState);

    return (
      <div className="h-screen w-full flex bg-gray-100">
        <VisitWorkspace 
          encounter={encounter} 
          onStatusChange={(status) => setEncounter({ ...encounter, status })}
        >
          <ToothChart value={chartState} onChange={setChartState} />
        </VisitWorkspace>
      </div>
    );
  }
};
