import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BadgeGroup, ButtonGroup, InputGroup, InputGroupAddon, CheckboxGroup } from './Groups';
import { Checkbox } from "../ui/Checkbox";
import { Button } from "../ui/Button";

const meta: Meta = {
  title: 'Layout/Groups',
  tags: ['autodocs'],
};

export default meta;

export const CheckboxGroupExample: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <div className="space-y-6">
      <CheckboxGroup label="Patient Symptoms (Vertical)" helper="Select all symptoms observed during intake.">
        <Checkbox label="Fever / Chills" defaultChecked />
        <Checkbox label="Shortness of Breath" />
        <Checkbox label="Persistent Cough" defaultChecked />
      </CheckboxGroup>

      <CheckboxGroup label="Vitals Tracked (Horizontal)" orientation="horizontal">
        <Checkbox label="Heart Rate" defaultChecked />
        <Checkbox label="Blood Pressure" defaultChecked />
        <Checkbox label="SpO2" defaultChecked />
      </CheckboxGroup>
    </div>
  ),
};

export const BadgeGroupExample: StoryObj<typeof BadgeGroup> = {
  render: () => (
    <div className="space-y-4">
      <BadgeGroup>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Cardiology</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Pediatrics</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Neurology</span>
      </BadgeGroup>

      <BadgeGroup max={2}>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Allergy</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Penicillin</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Latex</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Peanuts</span>
      </BadgeGroup>
    </div>
  ),
};

export const ButtonGroupExample: StoryObj<typeof ButtonGroup> = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Horizontal Attached</p>
        <ButtonGroup>
          <Button variant="secondary">Day</Button>
          <Button variant="secondary">Week</Button>
          <Button variant="secondary">Month</Button>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Horizontal Detached</p>
        <ButtonGroup attached={false}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">Vertical Attached</p>
        <ButtonGroup orientation="vertical">
          <Button variant="secondary" className="justify-start">Profile</Button>
          <Button variant="secondary" className="justify-start">Settings</Button>
          <Button variant="secondary" className="justify-start text-red-600">Logout</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const InputGroupExample: StoryObj<typeof InputGroup> = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <input 
          type="text" 
          className="flex-1 w-full rounded-md border border-urvos-border bg-transparent px-3 py-2 text-sm placeholder:text-urvos-text-muted focus:outline-none focus:ring-2 focus:ring-urvos-brand focus:border-transparent" 
          placeholder="example.com" 
        />
      </InputGroup>

      <InputGroup>
        <input 
          type="text" 
          className="flex-1 w-full rounded-md border border-urvos-border bg-transparent px-3 py-2 text-sm placeholder:text-urvos-text-muted focus:outline-none focus:ring-2 focus:ring-urvos-brand focus:border-transparent" 
          placeholder="0.00" 
        />
        <InputGroupAddon>USD</InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
