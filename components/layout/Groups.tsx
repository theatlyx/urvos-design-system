import React from 'react';
import { clsx } from 'clsx';

// ----------------------------------------------------------------------
// BadgeGroup
// ----------------------------------------------------------------------

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  gap?: 'sm' | 'md';
}

export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, max, gap = 'sm', children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const hasMore = max !== undefined && childrenArray.length > max;
    const visibleChildren = hasMore ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - (max || 0);

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-wrap items-center',
          {
            'gap-1.5': gap === 'sm',
            'gap-2': gap === 'md',
          },
          className
        )}
        {...props}
      >
        {visibleChildren}
        {hasMore && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-urvos-surface border border-urvos-border text-urvos-text-muted">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);
BadgeGroup.displayName = 'BadgeGroup';

// ----------------------------------------------------------------------
// ButtonGroup
// ----------------------------------------------------------------------

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', attached = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'inline-flex',
          {
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
            // If attached, children (buttons) should remove rounded corners on inner edges.
            // This is a simplified approach assuming children accept className or we use CSS selectors.
            'gap-0 shadow-sm rounded-md': attached,
            'gap-2': !attached && orientation === 'horizontal',
            'gap-2 ': !attached && orientation === 'vertical',
          },
          // CSS trick to handle border radius of children if attached
          attached && orientation === 'horizontal' && '[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:not(:last-child)]:border-r-0',
          attached && orientation === 'vertical' && '[&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:not(:last-child)]:border-b-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

// ----------------------------------------------------------------------
// InputGroup
// ----------------------------------------------------------------------

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'relative flex items-stretch w-full',
          '[&>input]:rounded-none [&>input:first-child]:rounded-l-md [&>input:last-child]:rounded-r-md',
          '[&>div:first-child]:rounded-l-md [&>div:last-child]:rounded-r-md',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroup.displayName = 'InputGroup';

export const InputGroupAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center px-3 py-2 border border-urvos-border bg-urvos-surface-soft text-urvos-text-muted text-sm whitespace-nowrap',
          'first:border-r-0 last:border-l-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroupAddon.displayName = 'InputGroupAddon';

// ----------------------------------------------------------------------
// CheckboxGroup
// ----------------------------------------------------------------------

export interface CheckboxGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  error?: string;
  helper?: string;
}

export const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ className, label, orientation = 'vertical', error, helper, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} className={clsx('border-0 p-0 m-0', className)} {...props}>
        {label && (
          <legend className="text-sm font-semibold text-urvos-text mb-2">
            {label}
          </legend>
        )}
        <div
          className={clsx('flex', {
            'flex-col gap-2': orientation === 'vertical',
            'flex-row gap-4 flex-wrap': orientation === 'horizontal',
          })}
        >
          {children}
        </div>
        {error && <p className="mt-1 text-xs text-urvos-danger">{error}</p>}
        {helper && !error && <p className="mt-1 text-xs text-urvos-text-muted">{helper}</p>}
      </fieldset>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

