import React from 'react';
import { clsx } from 'clsx';
import { GripVertical, Maximize2 } from 'lucide-react';

// --- ColorPicker ---
export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border border-urvos-border p-0 bg-transparent"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 text-sm font-mono uppercase bg-urvos-surface border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary w-24"
      />
    </div>
  );
}

// --- ResizeHandle ---
export interface ResizeHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function ResizeHandle({ orientation = 'vertical', className, ...props }: ResizeHandleProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-urvos-surface-hover hover:bg-urvos-border transition-colors cursor-col-resize',
        orientation === 'vertical' ? 'w-2 h-full' : 'h-2 w-full cursor-row-resize',
        className
      )}
      {...props}
    >
      {orientation === 'vertical' ? (
        <GripVertical className="w-4 h-4 text-urvos-text-muted" />
      ) : (
        <GripVertical className="w-4 h-4 text-urvos-text-muted transform rotate-90" />
      )}
    </div>
  );
}

// --- QRCode (Placeholder) ---
export interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 128, className, ...props }: QRCodeProps) {
  return (
    <div 
      className={clsx('bg-white p-2 border border-urvos-border rounded inline-block', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <div className="w-full h-full bg-urvos-text flex items-center justify-center">
        <Maximize2 className="w-1/2 h-1/2 text-white" />
      </div>
    </div>
  );
}

// --- Markdown (Placeholder) ---
export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

export function Markdown({ content, className, ...props }: MarkdownProps) {
  // In a real implementation, you would use a library like react-markdown
  return (
    <div className={clsx('prose prose-sm dark:prose-invert max-w-none', className)} {...props}>
      <div className="whitespace-pre-wrap font-sans text-urvos-text">
        {content}
      </div>
    </div>
  );
}

// --- ScrollArea ---
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
}

export function ScrollArea({ maxHeight = 400, className, children, ...props }: ScrollAreaProps) {
  return (
    <div 
      className={clsx('overflow-auto custom-scrollbar', className)}
      style={{ maxHeight }}
      {...props}
    >
      {children}
    </div>
  );
}
