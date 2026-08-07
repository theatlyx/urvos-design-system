import type { Meta, StoryObj } from '@storybook/react';
import { EnterpriseTopBar } from './EnterpriseTopBar';
import { Avatar } from '../ui/Feedback';
import { DropdownMenu } from '../ui/DropdownMenu';
import React from 'react';

const meta: Meta<typeof EnterpriseTopBar> = {
  title: 'Layout/EnterpriseTopBar',
  component: EnterpriseTopBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EnterpriseTopBar>;

const createMockIdentity = (
  name: string,
  credentials: string,
  role: string,
  npi: string | null,
  roleColor: string = "text-emerald-600",
  menuItems: { label: string; danger?: boolean; type?: string }[]
) => (
  <div className="flex items-center gap-4 py-1 -mr-2 pr-2">
    <div className="text-right leading-tight hidden sm:flex sm:flex-col sm:items-end">
      <div className="flex items-center gap-2">
        <p className="m-0 text-[14px] font-bold text-slate-800 tracking-tight">
          {name}{credentials ? `, ${credentials}` : ''}
        </p>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200/60">
          12:35 PM
        </span>
      </div>
      <p className={`m-0 text-[12px] font-medium ${roleColor} mt-0.5 tracking-tight`}>
        {role}
      </p>
      {npi && (
        <p className="m-0 text-[10px] font-mono text-slate-400 mt-0.5 tracking-tight">
          NPI: {npi}
        </p>
      )}
    </div>
    <DropdownMenu
      className="w-56 mt-2 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)]"
      trigger={
        <div className="cursor-pointer hover:ring-4 hover:ring-slate-100 rounded-full transition-all duration-200 active:scale-95">
          <Avatar name={name} status="online" size="md" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} />
        </div>
      }
      items={menuItems as any}
    />
  </div>
);

const ProviderMock = createMockIdentity(
  "Dr. Alexander Vance", "MD", 
  "Attending Surgeon — Interventional Cardiology", "1043582910", "text-emerald-600",
  [{ label: 'System Settings' }, { label: 'My Profile' }, { type: 'separator' }, { label: 'Sign out', danger: true }]
);

const NurseMock = createMockIdentity(
  "Sarah Jenkins", "RN, BSN", 
  "Charge Nurse — Emergency Room", null, "text-blue-600",
  [{ label: 'Shift Handover' }, { label: 'Unit Preferences' }, { type: 'separator' }, { label: 'Sign out', danger: true }]
);

const LabMock = createMockIdentity(
  "Michael Chang", "CPT", 
  "Lead Phlebotomist — Outpatient Lab", null, "text-purple-600",
  [{ label: 'Lab Equipment Status' }, { label: 'My Profile' }, { type: 'separator' }, { label: 'Sign out', danger: true }]
);

const AdminMock = createMockIdentity(
  "Elena Rodriguez", "", 
  "Platform Administrator — IT Services", null, "text-rose-600",
  [{ label: 'System Dashboard' }, { label: 'User Management' }, { label: 'Global Audit Logs' }, { type: 'separator' }, { label: 'Sign out', danger: true }]
);

export const Default: Story = {
  args: {
    tenantName: 'General Practice',
    rbacColorTheme: 'var(--brand-solid, #3b82f6)',
    onSearchTrigger: () => alert('Search Triggered'),
    isDictating: false,
    onDictationToggle: () => alert('Dictation Toggled'),
    showBTG: false,
    taskCount: 5,
    chatUnreadCount: 2,
    notificationBadge: false,
    notificationCount: 3,
    idleTimeRemaining: null,
    userDropdownElement: ProviderMock,
    tasks: [
      { id: 't1', title: 'Review pending orders', patientName: 'John Doe', dueTime: 'In 15 mins', urgency: 'high' },
      { id: 't2', title: 'Sign clinical notes', patientName: 'Sarah Smith', dueTime: 'Today', urgency: 'medium' },
      { id: 't3', title: 'Discharge summary', patientName: 'Mike Johnson', dueTime: 'Tomorrow', urgency: 'low' },
    ],
    messages: [
      { id: 'm1', senderName: 'Dr. Smith', preview: 'Patient 4 is ready', time: '10:45 AM', unread: true },
      { id: 'm2', senderName: 'Pharmacy', preview: 'Clarify dosing for bed 2', time: '09:30 AM', unread: true },
      { id: 'm3', senderName: 'Nurse Jane', preview: 'Vitals updated', time: 'Yesterday', unread: false },
    ],
    notifications: [
      { id: 'n1', title: 'Lab results available', description: 'CBC and Metabolic panel for John Doe', time: '10 min ago', read: false, category: 'clinical' },
      { id: 'n2', title: 'New admission to ICU', description: 'Bed 4 is now occupied', time: '1 hour ago', read: false, category: 'system' },
      { id: 'n3', title: 'Failed login attempt', description: 'Unrecognized device detected', time: '2 hours ago', read: true, category: 'security' },
    ],
  },
};

export const EmergencyRoom: Story = {
  args: {
    tenantName: 'Emergency Medicine Trauma Center Department',
    rbacColorTheme: '#ef4444', // Red for ER context
    onSearchTrigger: () => alert('Search Triggered'),
    isDictating: false,
    onDictationToggle: () => alert('Dictation Toggled'),
    showBTG: true,
    taskCount: 12,
    chatUnreadCount: 8,
    notificationBadge: true,
    notificationCount: 15,
    idleTimeRemaining: null,
    userDropdownElement: NurseMock,
  },
};

export const ActiveDictation: Story = {
  args: {
    tenantName: 'Cardiology & Vascular',
    rbacColorTheme: '#10b981', // Green context
    onSearchTrigger: () => alert('Search Triggered'),
    isDictating: true,
    onDictationToggle: () => alert('Dictation Toggled'),
    showBTG: false,
    taskCount: 0,
    chatUnreadCount: 0,
    notificationBadge: false,
    notificationCount: 0,
    idleTimeRemaining: null,
    userDropdownElement: LabMock,
  },
};

export const IdleWarning: Story = {
  args: {
    tenantName: 'Neurology Clinic',
    rbacColorTheme: '#8b5cf6', // Purple context
    onSearchTrigger: () => alert('Search Triggered'),
    isDictating: false,
    onDictationToggle: () => alert('Dictation Toggled'),
    showBTG: false,
    taskCount: 3,
    chatUnreadCount: 1,
    notificationBadge: false,
    notificationCount: 1,
    idleTimeRemaining: 25, // Showing SVG countdown
    userDropdownElement: AdminMock,
  },
};
