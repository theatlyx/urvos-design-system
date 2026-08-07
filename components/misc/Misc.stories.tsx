import type { Meta, StoryObj } from '@storybook/react';
import { Tag, CopyToClipboard, KebabMenu, SplitButton, SegmentedControl, OTPInput } from './Misc';
import { useState } from 'react';

const meta: Meta = {
  title: 'UI/Misc',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-urvos-background min-h-[300px] flex gap-4 flex-wrap">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ─── Tag ──────────────────────────────────────────────────────────────────────

export const TagsDemo: StoryObj<typeof Tag> = {
  name: 'Tags',
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="destructive">Destructive</Tag>
      <Tag variant="primary" onRemove={() => alert('Removed!')}>Removable</Tag>
    </div>
  ),
};

// ─── CopyToClipboard ─────────────────────────────────────────────────────────

export const CopyToClipboardDemo: StoryObj<typeof CopyToClipboard> = {
  name: 'CopyToClipboard',
  render: () => (
    <div className="flex items-center gap-4">
      <code className="text-sm bg-urvos-surface border border-urvos-border px-3 py-1.5 rounded font-mono">
        MRN-0042-2024
      </code>
      <CopyToClipboard text="MRN-0042-2024">Copy MRN</CopyToClipboard>
    </div>
  ),
};

// ─── KebabMenu ───────────────────────────────────────────────────────────────

export const KebabMenuDemo: StoryObj<typeof KebabMenu> = {
  name: 'KebabMenu',
  render: () => (
    <div className="flex items-center justify-center w-full h-32">
      <KebabMenu
        options={[
          { label: 'View Details', onClick: () => alert('View') },
          { label: 'Edit', onClick: () => alert('Edit') },
          { label: 'Print', onClick: () => alert('Print') },
          { label: 'Archive', onClick: () => alert('Archive'), danger: true },
        ]}
      />
    </div>
  ),
};

// ─── SplitButton ─────────────────────────────────────────────────────────────

export const SplitButtonDemo: StoryObj<typeof SplitButton> = {
  name: 'SplitButton',
  render: () => (
    <SplitButton
      label="Save Draft"
      onClick={() => alert('Draft Saved')}
      options={[
        { label: 'Save and Sign', onClick: () => alert('Signed') },
        { label: 'Save and Close', onClick: () => alert('Saved & Closed') },
        { label: 'Discard', onClick: () => alert('Discarded') },
      ]}
    />
  ),
};

// ─── SegmentedControl ────────────────────────────────────────────────────────

export const SegmentedControlDemo: StoryObj<typeof SegmentedControl> = {
  name: 'SegmentedControl',
  render: () => {
    const [value, setValue] = useState('list');
    return (
      <div className="flex flex-col gap-4 w-full">
        <SegmentedControl
          options={['List', 'Grid', 'Timeline']}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-urvos-text-muted">Active: {value}</p>
      </div>
    );
  },
};

// ─── OTPInput ────────────────────────────────────────────────────────────────

export const OTPInputDemo: StoryObj<typeof OTPInput> = {
  name: 'OTPInput',
  render: () => {
    const [otp, setOtp] = useState('');
    return (
      <div className="flex flex-col gap-3 w-full">
        <label className="text-sm font-medium text-urvos-text">
          Enter 6-digit verification code
        </label>
        <OTPInput length={6} value={otp} onChange={setOtp} />
        {otp.length === 6 && (
          <p className="text-sm text-urvos-success font-medium">✓ Code complete: {otp}</p>
        )}
      </div>
    );
  },
};
