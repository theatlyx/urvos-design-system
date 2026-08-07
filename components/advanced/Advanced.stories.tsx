import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, ResizeHandle, QRCode, Markdown, ScrollArea } from './Advanced';
import { useState } from 'react';

const meta: Meta = {
  title: 'UI/Advanced',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-urvos-background min-h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ─── ColorPicker ─────────────────────────────────────────────────────────────

export const ColorPickerDemo: StoryObj<typeof ColorPicker> = {
  name: 'ColorPicker',
  render: () => {
    const [color, setColor] = useState('#3b82f6');
    return (
      <div className="flex flex-col gap-3 max-w-xs">
        <label className="text-sm font-medium text-urvos-text">Brand Color</label>
        <ColorPicker color={color} onChange={setColor} />
        <div
          className="h-10 rounded border border-urvos-border w-full"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  },
};

// ─── ResizeHandle ────────────────────────────────────────────────────────────

export const ResizeHandleDemo: StoryObj<typeof ResizeHandle> = {
  name: 'ResizeHandle',
  render: () => (
    <div className="flex gap-2 h-40 border border-urvos-border rounded overflow-hidden">
      <div className="flex-1 bg-urvos-surface flex items-center justify-center text-sm text-urvos-text-muted">
        Panel A
      </div>
      <ResizeHandle orientation="vertical" />
      <div className="flex-1 bg-urvos-surface-hover flex items-center justify-center text-sm text-urvos-text-muted">
        Panel B
      </div>
    </div>
  ),
};

// ─── QRCode ──────────────────────────────────────────────────────────────────

export const QRCodeDemo: StoryObj<typeof QRCode> = {
  name: 'QRCode',
  render: () => (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col items-center gap-2">
        <QRCode value="https://urvos.health/patient/12345" size={128} />
        <p className="text-xs text-urvos-text-muted">Small (128px)</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCode value="MRN-0042-2024" size={192} />
        <p className="text-xs text-urvos-text-muted">Large (192px)</p>
      </div>
    </div>
  ),
};

// ─── Markdown ────────────────────────────────────────────────────────────────

export const MarkdownDemo: StoryObj<typeof Markdown> = {
  name: 'Markdown',
  render: () => (
    <Markdown
      content={`# Patient Discharge Summary

## Diagnosis
- Primary: Type 2 Diabetes Mellitus (E11.9)
- Secondary: Hypertension (I10)

## Medications on Discharge
1. Metformin 1000mg twice daily with meals
2. Lisinopril 10mg once daily
3. Atorvastatin 20mg at bedtime

## Follow-up
Patient should follow up with primary care in **2 weeks**.
Refer to endocrinology if HbA1c remains above 8% at next visit.
`}
    />
  ),
};

// ─── ScrollArea ──────────────────────────────────────────────────────────────

export const ScrollAreaDemo: StoryObj<typeof ScrollArea> = {
  name: 'ScrollArea',
  render: () => (
    <ScrollArea maxHeight={200} className="border border-urvos-border rounded-lg bg-urvos-surface">
      <div className="p-4 space-y-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 border-b border-urvos-border/50 last:border-0"
          >
            <div className="w-8 h-8 rounded-full bg-urvos-primary/20 flex items-center justify-center text-xs font-bold text-urvos-primary">
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-medium text-urvos-text">Patient Record #{2024000 + i}</p>
              <p className="text-xs text-urvos-text-muted">Last updated 2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
