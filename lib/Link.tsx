"use client";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Wraps next/link so the sidebar/tab active-state logic (data-active, used
 * throughout globals.css) is computed once, correctly, instead of every
 * screen re-implementing `pathname === href` by hand.
 */
export interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  /** Match sub-routes too, e.g. /patients/123 counts as active for href="/patients" */
  matchPrefix?: boolean;
}

export function Link({ href, matchPrefix, className = "", children, ...rest }: LinkProps) {
  const pathname = usePathname();
  const hrefStr = typeof href === "string" ? href : href.pathname ?? "";
  const active = matchPrefix ? pathname?.startsWith(hrefStr) : pathname === hrefStr;

  return (
    <NextLink href={href} className={className} data-active={active || undefined} {...rest}>
      {children}
    </NextLink>
  );
}

/**
 * Drop-in for the NavItem organism — use this instead of NavItem + manual
 * active-state prop when the item is a real route (most sidebar items are).
 */
export function NavLink({
  href,
  icon,
  children,
  matchPrefix = true,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  matchPrefix?: boolean;
}) {
  return (
    <Link href={href} matchPrefix={matchPrefix} className="nav-item">
      {icon}
      {children}
    </Link>
  );
}
