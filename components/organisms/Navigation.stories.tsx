import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Breadcrumb, NavItem } from "./Navigation";
import {
  LayoutDashboard, Users, Stethoscope, FlaskConical,
  Calendar, FileText, Activity, Bell, Settings,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'UI/Navigation',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const TabsPill: StoryObj = {
  name: 'Tabs/Pill',
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div className="space-y-4">
        <Tabs
          variant="pill"
          activeId={active}
          onChange={setActive}
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'vitals', label: 'Vitals' },
            { id: 'labs', label: 'Lab Results' },
            { id: 'medications', label: 'Medications' },
            { id: 'notes', label: 'Clinical Notes' },
          ]}
        />
        <div className="bg-urvos-surface border border-urvos-border rounded-lg p-4 text-sm text-urvos-text-muted">
          Content for: <strong className="text-urvos-text">{active}</strong>
        </div>
      </div>
    );
  },
};

export const TabsUnderline: StoryObj = {
  name: 'Tabs/Underline',
  render: () => {
    const [active, setActive] = useState('summary');
    return (
      <Tabs
        variant="underline"
        activeId={active}
        onChange={setActive}
        items={[
          { id: 'summary', label: 'Summary' },
          { id: 'history', label: 'History' },
          { id: 'documents', label: 'Documents' },
        ]}
      />
    );
  },
};

export const TabsSegmented: StoryObj = {
  name: 'Tabs/Segmented',
  render: () => {
    const [active, setActive] = useState('daily');
    return (
      <Tabs
        variant="segmented"
        activeId={active}
        onChange={setActive}
        items={[
          { id: 'daily', label: 'Daily' },
          { id: 'weekly', label: 'Weekly' },
          { id: 'monthly', label: 'Monthly' },
        ]}
      />
    );
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────

export const BreadcrumbDefault: StoryObj = {
  name: 'Breadcrumb/Default',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '#' },
        { label: 'Clinical', href: '#' },
        { label: 'Patients', href: '#' },
        { label: 'Priya Sharma' },
      ]}
    />
  ),
};

export const BreadcrumbShort: StoryObj = {
  name: 'Breadcrumb/Short',
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Settings', href: '#' },
        { label: 'Account' },
      ]}
    />
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// NavItem
// ─────────────────────────────────────────────────────────────────────────────

export const NavItemSidebar: StoryObj = {
  name: 'NavItem/Sidebar',
  render: () => {
    const [active, setActive] = useState('dashboard');
    const items = [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'patients', label: 'Patients', icon: <Users className="w-5 h-5" /> },
      { id: 'clinical', label: 'Clinical', icon: <Stethoscope className="w-5 h-5" /> },
      { id: 'labs', label: 'Lab Results', icon: <FlaskConical className="w-5 h-5" /> },
      { id: 'scheduling', label: 'Scheduling', icon: <Calendar className="w-5 h-5" /> },
      { id: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" /> },
      { id: 'analytics', label: 'Analytics', icon: <Activity className="w-5 h-5" /> },
      { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
      { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
      <div className="w-56 bg-urvos-surface border border-urvos-border rounded-xl p-2 space-y-0.5">
        {items.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            active={active === item.id}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </NavItem>
        ))}
      </div>
    );
  },
};

export const NavItemDisabled: StoryObj = {
  name: 'NavItem/WithDisabled',
  render: () => (
    <div className="w-56 bg-urvos-surface border border-urvos-border rounded-xl p-2 space-y-0.5">
      <NavItem icon={<LayoutDashboard className="w-5 h-5" />} active>
        Dashboard (Active)
      </NavItem>
      <NavItem icon={<Users className="w-5 h-5" />}>
        Patients
      </NavItem>
      <NavItem icon={<Activity className="w-5 h-5" />} disabled>
        Analytics (Disabled)
      </NavItem>
    </div>
  ),
};
