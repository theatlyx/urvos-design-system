import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, Check, User, Stethoscope } from 'lucide-react';

export interface SelectorOption {
  id: string;
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  resourceType?: string;
}

export interface SelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectorOption[];
  value?: SelectorOption;
  onChange: (value: SelectorOption) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export function BaseSelector({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  icon,
  className,
  ...props
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('relative w-full', className)} {...props}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 bg-urvos-surface border border-urvos-border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-urvos-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3 truncate">
          {value ? (
            <>
              {value.avatarUrl ? (
                <img src={value.avatarUrl} alt={value.label} className="w-6 h-6 rounded-full" />
              ) : icon ? (
                <div className="text-urvos-primary">{icon}</div>
              ) : null}
              <span className="text-urvos-text font-medium truncate">{value.label}</span>
            </>
          ) : (
            <span className="text-urvos-text-muted">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-urvos-text-muted flex-shrink-0 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          <ul className="divide-y divide-urvos-border">
            {options.map((option) => (
              <li
                key={option.id}
                className="p-3 hover:bg-urvos-surface-hover cursor-pointer flex items-center justify-between transition-colors"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  {option.avatarUrl ? (
                    <img src={option.avatarUrl} alt={option.label} className="w-8 h-8 rounded-full" />
                  ) : icon ? (
                    <div className="w-8 h-8 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary">
                      {icon}
                    </div>
                  ) : null}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-urvos-text">{option.label}</span>
                    {option.subLabel && (
                      <span className="text-xs text-urvos-text-muted">{option.subLabel}</span>
                    )}
                  </div>
                </div>
                {value?.id === option.id && <Check className="w-4 h-4 text-urvos-primary" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PatientSelector(props: Omit<SelectorProps, 'icon'>) {
  return <BaseSelector {...props} icon={<User className="w-4 h-4" />} />;
}

export function ProviderSelector(props: Omit<SelectorProps, 'icon'>) {
  return <BaseSelector {...props} icon={<Stethoscope className="w-4 h-4" />} />;
}
