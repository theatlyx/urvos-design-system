"use client";
import { ReactNode } from "react";

/* ============================================================
   TABS — three visual variants sharing one API
   ============================================================ */
export interface TabItem {
  id: string;
  label: string;
}
export function Tabs({
  items,
  activeId,
  onChange,
  variant = "pill",
}: {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "pill" | "underline" | "segmented";
}) {
  return (
    <div className={`tabs--${variant}`} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={item.id === activeId}
          className="tab"
          data-active={item.id === activeId || undefined}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   BREADCRUMB
   ============================================================ */
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span className="breadcrumb__sep">/</span>}
          {item.href && i < items.length - 1 ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span className={i === items.length - 1 ? "breadcrumb__current" : undefined}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ============================================================
   NAV ITEM — sidebar link with active/hover/disabled states
   ============================================================ */
export function NavItem({
  icon,
  active,
  disabled,
  children,
  onClick,
}: {
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      className="nav-item"
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
      {children}
    </a>
  );
}
