import React, { useRef, useEffect, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

// ----------------------------------------------------------------------
// List
// ----------------------------------------------------------------------

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  as?: 'ul' | 'ol';
  ordered?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, as, ordered = false, spacing = 'sm', children, ...props }, ref) => {
    const Component = as || (ordered ? 'ol' : 'ul');
    
    return (
      <Component
        ref={ref as any}
        className={clsx(
          ordered ? 'list-decimal list-inside' : 'list-none',
          {
            'space-y-2': spacing === 'sm',
            'space-y-4': spacing === 'md',
            'space-y-6': spacing === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
List.displayName = 'List';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(
          'text-sm text-urvos-text-muted flex items-start',
          className
        )}
        {...props}
      >
        {icon && (
          <span className="mr-3 flex-shrink-0 text-urvos-text-muted mt-0.5">
            {icon}
          </span>
        )}
        <div className="flex-1">
          {children}
        </div>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

// ----------------------------------------------------------------------
// InfiniteScroll
// ----------------------------------------------------------------------

export interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  loadingText?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  isLoading,
  loadingText = 'Loading more...',
  children,
  className,
  ...props
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div className={clsx('flex flex-col w-full', className)} {...props}>
      {children}
      {hasMore && (
        <div ref={observerTarget} className="py-4 flex justify-center text-sm text-urvos-text-muted">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> {loadingText}
            </span>
          ) : (
            <span className="opacity-0">Trigger</span>
          )}
        </div>
      )}
    </div>
  );
};
InfiniteScroll.displayName = 'InfiniteScroll';

// ----------------------------------------------------------------------
// VirtualizedList
// ----------------------------------------------------------------------

export interface VirtualizedListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  height?: string | number;
}

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight = 50,
  height = '400px',
  className,
  ...props
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = typeof height === 'number' ? height : 400; // Simplified
  const totalHeight = items.length * itemHeight;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + 2);
  
  const visibleItems = items.slice(startIndex, endIndex);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className={clsx('overflow-auto border border-urvos-border rounded-md relative', className)}
      style={{ height, width: '100%' }}
      {...props}
    >
      <div style={{ height: totalHeight, width: '100%' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                left: 0,
                width: '100%',
                height: itemHeight,
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
