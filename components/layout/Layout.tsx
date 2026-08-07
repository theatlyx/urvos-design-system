import React from 'react';
import { clsx } from 'clsx';

// ----------------------------------------------------------------------
// Container
// ----------------------------------------------------------------------

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', centered = true, fluid, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'w-full px-4 sm:px-6 lg:px-8',
          centered && !fluid && 'mx-auto',
          fluid && 'max-w-none',
          {
            'max-w-3xl': size === 'sm',
            'max-w-5xl': size === 'md',
            'max-w-7xl': size === 'lg',
            'max-w-screen-2xl': size === 'xl',
            'max-w-none': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';

// ----------------------------------------------------------------------
// Section
// ----------------------------------------------------------------------

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, title, description, headerAction, spacing = 'md', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={clsx(
          'w-full',
          {
            'py-4': spacing === 'sm',
            'py-8': spacing === 'md',
            'py-12': spacing === 'lg',
            'py-0': spacing === 'none',
          },
          className
        )}
        {...props}
      >
        {(title || description || headerAction) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              {title && (
                <h2 className="text-xl font-semibold text-urvos-ink">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-urvos-text-muted">{description}</p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        )}
        <div>{children}</div>
      </section>
    );
  }
);
Section.displayName = 'Section';
