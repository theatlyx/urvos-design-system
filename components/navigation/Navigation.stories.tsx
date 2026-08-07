import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, Pagination, NavItem } from "../navigation/Navigation";
import {
  LayoutDashboard, Users, FileText, Activity, Calendar,
  Settings, Bell, CreditCard, Stethoscope, FlaskConical,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────

const breadcrumbMeta: Meta<typeof Breadcrumb> = {
  title: 'UI/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default breadcrumbMeta;

export const Default: StoryObj<typeof Breadcrumb> = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Clinical', href: '#' },
      { label: 'Patients', href: '#' },
      { label: 'Priya Sharma' },
    ],
  },
};

export const Short: StoryObj<typeof Breadcrumb> = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Settings' },
    ],
  },
};

export const WithMaxItems: StoryObj<typeof Breadcrumb> = {
  args: {
    maxItems: 3,
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Clinical', href: '#' },
      { label: 'Patients', href: '#' },
      { label: 'Priya Sharma', href: '#' },
      { label: 'Encounters', href: '#' },
      { label: 'Visit #2024-0042' },
    ],
  },
};

export const WithIcons: StoryObj<typeof Breadcrumb> = {
  args: {
    items: [
      { label: 'Home', href: '#', icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: 'Patients', href: '#', icon: <Users className="w-4 h-4" /> },
      { label: 'Priya Sharma' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

function PaginationDemo(props: Partial<React.ComponentProps<typeof Pagination>>) {
  const [page, setPage] = useState(props.currentPage ?? 1);
  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination
        {...props}
        currentPage={page}
        totalPages={props.totalPages ?? 20}
        onPageChange={setPage}
      />
      <p className="text-sm text-urvos-text-muted">
        Page {page} of {props.totalPages ?? 20}
      </p>
    </div>
  );
}

export const PaginationDefault: StoryObj = {
  name: 'Pagination/Default',
  render: () => <PaginationDemo currentPage={5} totalPages={20} />,
};

export const PaginationSmall: StoryObj = {
  name: 'Pagination/Small',
  render: () => <PaginationDemo currentPage={3} totalPages={10} size="sm" />,
};

export const PaginationLarge: StoryObj = {
  name: 'Pagination/Large',
  render: () => <PaginationDemo currentPage={2} totalPages={8} size="lg" />,
};

export const PaginationFewPages: StoryObj = {
  name: 'Pagination/FewPages',
  render: () => <PaginationDemo currentPage={1} totalPages={3} />,
};

// ─────────────────────────────────────────────────────────────────────────────
// NavItem
// ─────────────────────────────────────────────────────────────────────────────

export const NavItemDefault: StoryObj = {
  name: 'NavItem/Default',
  render: () => (
    <div className="w-60 bg-urvos-surface border border-urvos-border rounded-xl p-2 space-y-0.5">
      <NavItem href="#" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isActive />
      <NavItem href="#" icon={<Users className="w-5 h-5" />} label="Patients" badge={12} />
      <NavItem href="#" icon={<Stethoscope className="w-5 h-5" />} label="Clinical" />
      <NavItem href="#" icon={<FlaskConical className="w-5 h-5" />} label="Lab Results" badge={3} />
      <NavItem href="#" icon={<Calendar className="w-5 h-5" />} label="Scheduling" />
      <NavItem href="#" icon={<FileText className="w-5 h-5" />} label="Documents" />
      <NavItem href="#" icon={<Activity className="w-5 h-5" />} label="Analytics" />
      <NavItem href="#" icon={<Bell className="w-5 h-5" />} label="Notifications" badge={5} />
      <NavItem href="#" icon={<CreditCard className="w-5 h-5" />} label="Billing" />
      <NavItem href="#" icon={<Settings className="w-5 h-5" />} label="Settings" />
    </div>
  ),
};

export const NavItemCollapsed: StoryObj = {
  name: 'NavItem/Collapsed',
  render: () => (
    <div className="w-14 bg-urvos-surface border border-urvos-border rounded-xl p-2 space-y-0.5">
      <NavItem href="#" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" isActive isCollapsed />
      <NavItem href="#" icon={<Users className="w-5 h-5" />} label="Patients" isCollapsed />
      <NavItem href="#" icon={<Stethoscope className="w-5 h-5" />} label="Clinical" isCollapsed />
      <NavItem href="#" icon={<FlaskConical className="w-5 h-5" />} label="Lab Results" isCollapsed />
      <NavItem href="#" icon={<Calendar className="w-5 h-5" />} label="Scheduling" isCollapsed />
      <NavItem href="#" icon={<Settings className="w-5 h-5" />} label="Settings" isCollapsed />
    </div>
  ),
};
