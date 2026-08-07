import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardGrid } from './CardGrid';

const meta: Meta<typeof CardGrid> = {
  title: 'Layout/CardGrid',
  component: CardGrid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: ['auto', 1, 2, 3, 4],
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardGrid>;

const DummyCard = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="font-semibold text-urvos-ink mb-2">{title}</h3>
    <p className="text-sm text-urvos-text-muted">{content}</p>
  </div>
);

export const AutoColumns: Story = {
  args: {
    columns: 'auto',
    gap: 'md',
    children: (
      <>
        <DummyCard title="Patient Profile" content="View demographic details and history." />
        <DummyCard title="Recent Encounters" content="See all clinical notes from past visits." />
        <DummyCard title="Lab Results" content="Review recent pathology and radiology results." />
        <DummyCard title="Active Medications" content="Manage current prescriptions and refills." />
        <DummyCard title="Care Plan" content="Track long-term goals and interventions." />
      </>
    ),
  },
};

export const FixedColumns: Story = {
  args: {
    columns: 3,
    gap: 'lg',
    children: (
      <>
        <DummyCard title="Card 1" content="Fixed 3 columns on large screens." />
        <DummyCard title="Card 2" content="Fixed 3 columns on large screens." />
        <DummyCard title="Card 3" content="Fixed 3 columns on large screens." />
        <DummyCard title="Card 4" content="Wraps to next row." />
        <DummyCard title="Card 5" content="Wraps to next row." />
      </>
    ),
  },
};
