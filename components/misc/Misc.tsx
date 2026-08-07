import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Copy, Check, MoreVertical, ChevronDown } from 'lucide-react';

// --- Tag ---
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
  onRemove?: () => void;
}

export function Tag({ variant = 'default', onRemove, className, children, ...props }: TagProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary': return 'bg-urvos-primary/10 text-urvos-primary border-urvos-primary/20';
      case 'success': return 'bg-urvos-success/10 text-urvos-success border-urvos-success/20';
      case 'warning': return 'bg-urvos-warning/10 text-urvos-warning border-urvos-warning/20';
      case 'destructive': return 'bg-urvos-destructive/10 text-urvos-destructive border-urvos-destructive/20';
      default: return 'bg-urvos-surface text-urvos-text border-urvos-border';
    }
  };

  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border', getVariantClasses(), className)} {...props}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-1 hover:text-opacity-80 focus:outline-none">
          &times;
        </button>
      )}
    </span>
  );
}

// --- CopyToClipboard ---
export interface CopyToClipboardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function CopyToClipboard({ text, className, children, ...props }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx('inline-flex items-center justify-center p-2 rounded hover:bg-urvos-surface-hover transition-colors text-urvos-text-muted hover:text-urvos-text', className)}
      title="Copy to clipboard"
      {...props}
    >
      {copied ? <Check className="w-4 h-4 text-urvos-success" /> : <Copy className="w-4 h-4" />}
      {children && <span className="ml-2 text-sm">{children}</span>}
    </button>
  );
}

// --- KebabMenu ---
export interface KebabMenuProps {
  options: { label: string; onClick: () => void; danger?: boolean }[];
  className?: string;
}

export function KebabMenu({ options, className }: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative inline-block', className)} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-urvos-surface-hover text-urvos-text-muted hover:text-urvos-text focus:outline-none focus:ring-2 focus:ring-urvos-primary"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => { opt.onClick(); setIsOpen(false); }}
              className={clsx(
                'w-full text-left px-4 py-2 text-sm hover:bg-urvos-surface-hover transition-colors',
                opt.danger ? 'text-urvos-destructive' : 'text-urvos-text'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- SplitButton ---
export interface SplitButtonProps {
  label: string;
  onClick: () => void;
  options: { label: string; onClick: () => void }[];
  className?: string;
}

export function SplitButton({ label, onClick, options, className }: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative inline-flex shadow-sm rounded-md', className)} ref={menuRef}>
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-urvos-primary bg-urvos-primary text-sm font-medium text-white hover:bg-opacity-90 focus:z-10 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-1 focus:ring-offset-urvos-background"
      >
        {label}
      </button>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-l-0 border-urvos-primary bg-urvos-primary text-white hover:bg-opacity-90 focus:z-10 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-1 focus:ring-offset-urvos-background"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg z-50 overflow-hidden py-1">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => { opt.onClick(); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-urvos-text hover:bg-urvos-surface-hover transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- SegmentedControl ---
export interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={clsx('inline-flex p-1 bg-urvos-surface-hover rounded-lg border border-urvos-border', className)}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={clsx(
            'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
            value === opt
              ? 'bg-urvos-surface shadow-sm text-urvos-text border border-urvos-border'
              : 'text-urvos-text-muted hover:text-urvos-text border border-transparent'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// --- OTPInput ---
export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function OTPInput({ length = 6, value, onChange, className }: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newValue = value.split('');
    newValue[index] = val;
    onChange(newValue.join(''));
    
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={clsx('flex space-x-2', className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-12 text-center text-lg font-semibold bg-urvos-surface border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:border-urvos-primary"
        />
      ))}
    </div>
  );
}
