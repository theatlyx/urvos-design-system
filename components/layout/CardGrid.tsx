import React from 'react';
import { clsx } from 'clsx';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 'auto';
  gap?: 'sm' | 'md' | 'lg';
}

export const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({ className, columns = 'auto', gap = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'grid w-full',
          {
            // Auto-fit responsive columns (min width 300px)
            'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]': columns === 'auto',
            // Fixed columns on lg screens, stacking on smaller screens
            'grid-cols-1': columns === 1,
            'grid-cols-1 sm:grid-cols-2': columns === 2,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': columns === 4,
            
            // Gaps
            'gap-4': gap === 'sm',
            'gap-6': gap === 'md',
            'gap-8': gap === 'lg',
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
CardGrid.displayName = 'CardGrid';
