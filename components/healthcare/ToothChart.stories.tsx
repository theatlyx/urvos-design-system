import type { Meta, StoryObj } from '@storybook/react';
import { ToothChart, ToothChartState } from './ToothChart';
import { useState } from 'react';

const meta = {
  title: 'Healthcare/ToothChart',
  component: ToothChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToothChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for the controlled component
const ToothChartWrapper = (args: any) => {
  const [state, setState] = useState<ToothChartState>({ teeth: {} });
  const { ...rest } = args;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ToothChart {...rest} value={state} onChange={setState} onSave={(s) => console.log('Saved:', s)} />
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <ToothChartWrapper {...args} />,
};

// Wrapper for predefined state
const PredefinedWrapper = (args: any) => {
  const [state, setState] = useState<ToothChartState>({
    teeth: {
      "18": { id: "18", selected: false, findings: [], treatments: [{ id: '1', type: 'extraction_planned', status: 'planned', createdAt: new Date().toISOString() }], history: [], attachments: [], notes: [] },
      "26": { id: "26", selected: false, findings: [], treatments: [{ id: '2', type: 'full_crown', status: 'existing', createdAt: new Date().toISOString() }], history: [], attachments: [], notes: [] },
      "36": { id: "36", selected: false, findings: [{ id: '3', type: 'caries', status: 'watch', createdAt: new Date().toISOString() }], treatments: [{ id: '4', type: 'composite', status: 'existing', surfaces: ['O'], createdAt: new Date().toISOString() }], history: [], attachments: [], notes: [] },
      "44": { id: "44", selected: true, findings: [{ id: '5', type: 'fracture', status: 'watch', createdAt: new Date().toISOString() }], treatments: [], history: [], attachments: [], notes: [] },
      "11": { id: "11", selected: false, findings: [{ id: '6', type: 'missing', status: 'watch', createdAt: new Date().toISOString() }], treatments: [], history: [], attachments: [], notes: [] },
    }
  });

  const { ...rest } = args;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <ToothChart {...rest} value={state} onChange={setState} />
    </div>
  );
};

export const WithPredefinedData: Story = {
  render: (args) => <PredefinedWrapper {...args} />,
};

export const ReadOnly: Story = {
  render: (args) => <PredefinedWrapper {...args} readOnly={true} />,
};

