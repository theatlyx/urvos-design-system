"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/dashboard') return null;

  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <nav className="flex items-center text-sm font-medium text-ink-muted mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        <li>
          <Link href="/dashboard" className="text-ink-subtle hover:text-primary transition-colors flex items-center p-1 rounded-sm">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {segments.map((segment, index) => {
          if (segment === 'dashboard') return null;
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          return (
            <li key={href} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-0.5 text-ink-subtle" />
              {isLast ? (
                <span className="text-ink font-semibold px-1" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="text-ink-subtle hover:text-primary transition-colors px-1 rounded-sm">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}