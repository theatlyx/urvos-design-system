import React from 'react';
import { clsx } from 'clsx';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** Maximum items to show. Extras are collapsed into "..." */
  maxItems?: number;
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  maxItems,
  separator = <ChevronRight className="w-4 h-4" />,
  className,
  ...props
}: BreadcrumbProps) {
  let visibleItems = items;
  let hasCollapsed = false;

  if (maxItems && items.length > maxItems) {
    // Show first + ellipsis + last (maxItems - 2)
    const last = items.slice(items.length - (maxItems - 1));
    visibleItems = [items[0]];
    hasCollapsed = true;
    visibleItems = [...visibleItems, ...last];
  }

  return (
    <nav aria-label="Breadcrumb" className={clsx('flex', className)} {...props}>
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          // Collapse middle items
          if (hasCollapsed && maxItems && index > 0 && index < items.length - (maxItems - 1)) {
            if (index === 1) {
              return (
                <li key="ellipsis" className="flex items-center gap-1">
                  <span className="text-urvos-text-muted">{separator}</span>
                  <span className="px-2 py-0.5 text-sm text-urvos-text-muted rounded hover:bg-urvos-surface-hover transition-colors cursor-default">
                    <MoreHorizontal className="w-4 h-4" />
                  </span>
                </li>
              );
            }
            return null;
          }

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-urvos-text-muted/60 select-none">{separator}</span>
              )}
              {isLast ? (
                <span
                  className="text-sm font-medium text-urvos-text"
                  aria-current="page"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="flex items-center text-sm text-urvos-text-muted hover:text-urvos-text transition-colors hover:underline"
                >
                  {index === 0 && !item.icon ? (
                    <Home className="w-4 h-4 mr-1 flex-shrink-0" />
                  ) : item.icon ? (
                    <span className="mr-1">{item.icon}</span>
                  ) : null}
                  {item.label}
                </a>
              ) : (
                <span className="text-sm text-urvos-text-muted">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many page buttons to show around the current page */
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function generatePageRange(current: number, total: number, siblings: number): (number | '...')[] {
  const delta = siblings + 2;
  const range: (number | '...')[] = [];

  if (total <= delta * 2 + 1) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  range.push(1);

  if (showLeftDots) range.push('...');
  for (let i = leftSibling; i <= rightSibling; i++) range.push(i);
  if (showRightDots) range.push('...');

  range.push(total);

  return range;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  size = 'md',
  className,
  ...props
}: PaginationProps) {
  const pages = generatePageRange(currentPage, totalPages, siblingCount);

  const btnBase = clsx(
    'inline-flex items-center justify-center font-medium border transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-urvos-primary',
    {
      'h-7 w-7 text-xs': size === 'sm',
      'h-8 w-8 text-sm': size === 'md',
      'h-10 w-10 text-base': size === 'lg',
    }
  );

  const pageBtn = (page: number) =>
    clsx(btnBase, {
      'bg-urvos-primary text-white border-urvos-primary shadow-sm': page === currentPage,
      'bg-urvos-surface border-urvos-border text-urvos-text hover:bg-urvos-surface-hover':
        page !== currentPage,
    });

  const navBtn = (disabled: boolean) =>
    clsx(
      btnBase,
      'bg-urvos-surface border-urvos-border px-2',
      disabled
        ? 'opacity-40 cursor-not-allowed text-urvos-text-muted'
        : 'text-urvos-text hover:bg-urvos-surface-hover cursor-pointer'
    );

  return (
    <nav
      aria-label="Pagination"
      className={clsx('flex items-center gap-1', className)}
      {...props}
    >
      {/* Previous */}
      <button
        className={navBtn(currentPage <= 1)}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        {size !== 'sm' && <span className="ml-1">Prev</span>}
      </button>

      {/* Pages */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`dots-${i}`}
            className={clsx(btnBase, 'text-urvos-text-muted border-transparent cursor-default select-none')}
          >
            …
          </span>
        ) : (
          <button
            key={page}
            className={pageBtn(page)}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        className={navBtn(currentPage >= totalPages)}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        {size !== 'sm' && <span className="mr-1">Next</span>}
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NavItem — sidebar navigation item
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  icon?: React.ReactNode;
  label: string;
  badge?: string | number;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export function NavItem({
  href = '#',
  icon,
  label,
  badge,
  isActive = false,
  isCollapsed = false,
  className,
  ...props
}: NavItemProps) {
  return (
    <a
      href={href}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
      className={clsx(
        'group flex items-center rounded-lg text-sm font-medium transition-all duration-150 select-none',
        isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5 gap-3',
        isActive
          ? 'bg-urvos-primary/10 text-urvos-primary'
          : 'text-urvos-text-muted hover:bg-urvos-surface-hover hover:text-urvos-text',
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={clsx(
            'flex-shrink-0 w-5 h-5',
            isActive ? 'text-urvos-primary' : 'text-urvos-text-muted group-hover:text-urvos-text'
          )}
        >
          {icon}
        </span>
      )}
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined && (
            <span
              className={clsx(
                'ml-auto inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold',
                isActive
                  ? 'bg-urvos-primary text-white'
                  : 'bg-urvos-surface-hover text-urvos-text-muted'
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </a>
  );
}
