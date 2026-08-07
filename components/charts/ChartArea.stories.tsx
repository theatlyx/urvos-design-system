import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChartArea } from './ChartArea';

const meta: Meta<typeof ChartArea> = {
  title: 'Data Display/ChartArea',
  component: ChartArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartArea>;

const data = [
  { month: 'Jan', 'Inpatient': 4000, 'Outpatient': 2400 },
  { month: 'Feb', 'Inpatient': 3000, 'Outpatient': 1398 },
  { month: 'Mar', 'Inpatient': 2000, 'Outpatient': 9800 },
  { month: 'Apr', 'Inpatient': 2780, 'Outpatient': 3908 },
  { month: 'May', 'Inpatient': 1890, 'Outpatient': 4800 },
  { month: 'Jun', 'Inpatient': 2390, 'Outpatient': 3800 },
  { month: 'Jul', 'Inpatient': 3490, 'Outpatient': 4300 },
];

export const Default: Story = {
  args: {
    data,
    index: 'month',
    categories: ['Inpatient', 'Outpatient'],
    valueFormatter: (value: number) => `${value} visits`,
  },
};

export const SingleCategory: Story = {
  args: {
    data,
    index: 'month',
    categories: ['Outpatient'],
    colors: ['#10b981'],
    valueFormatter: (value: number) => `${value}`,
  },
};
