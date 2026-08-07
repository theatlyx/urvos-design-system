import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container, Section } from './Layout';
import { Button } from "../ui/Button";

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-urvos-surface-soft p-8 rounded-lg border border-urvos-border border-dashed text-center">
        Container Content
      </div>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 bg-urvos-canvas py-8">
      <Container size="sm">
        <div className="bg-urvos-surface p-4 rounded border border-urvos-border shadow-sm text-center text-sm">
          Small Container (max-w-3xl)
        </div>
      </Container>
      <Container size="md">
        <div className="bg-urvos-surface p-4 rounded border border-urvos-border shadow-sm text-center text-sm">
          Medium Container (max-w-5xl)
        </div>
      </Container>
      <Container size="lg">
        <div className="bg-urvos-surface p-4 rounded border border-urvos-border shadow-sm text-center text-sm">
          Large Container (max-w-7xl)
        </div>
      </Container>
      <Container size="xl">
        <div className="bg-urvos-surface p-4 rounded border border-urvos-border shadow-sm text-center text-sm">
          XL Container (max-w-screen-2xl)
        </div>
      </Container>
    </div>
  ),
};

export const SectionExample: StoryObj<typeof Section> = {
  render: () => (
    <Container>
      <Section
        title="Patient Details"
        description="View and manage patient demographic information and clinical history."
        headerAction={
          <Button variant="primary" size="sm">
            Edit Patient
          </Button>
        }
      >
        <div className="bg-urvos-surface-soft h-64 rounded-lg border border-urvos-border border-dashed flex items-center justify-center text-urvos-text-muted">
          Section Content Area
        </div>
      </Section>
      
      <Section
        title="Recent Encounters"
        spacing="lg"
      >
        <div className="bg-urvos-surface-soft h-32 rounded-lg border border-urvos-border border-dashed flex items-center justify-center text-urvos-text-muted">
          Another Section Content
        </div>
      </Section>
    </Container>
  ),
};
