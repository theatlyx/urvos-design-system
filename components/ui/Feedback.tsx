"use client";
import React, { ReactNode } from "react";

/* ============================================================
   AVATAR
   ============================================================ */
type AvatarSize = "xs" | "sm" | "md" | "lg";
type Status = "online" | "busy" | "away";

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  circle?: boolean;
  status?: Status;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name = "", src, size = "md", circle = true, status }: AvatarProps) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };
  const px = sizeMap[size] || 40;

  return (
    <span 
      className={`avatar avatar--${size} ${circle ? "avatar--circle" : ""} shrink-0`}
      style={{ width: px, height: px, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: circle ? "50%" : "inherit", position: "relative", overflow: "hidden" }}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} /> : initials(name)}
      {status && <span className={`avatar__status avatar__status--${status}`} aria-label={status} />}
    </span>
  );
}

export function AvatarGroup({ children, max }: { children: ReactNode; max?: number }) {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;
  
  if (max && total > max) {
    const visible = childrenArray.slice(0, max);
    const overflow = total - max;
    return (
      <div className="avatar-group">
        {visible}
        <span className="avatar-group__overflow">+{overflow}</span>
      </div>
    );
  }

  return <div className="avatar-group">{children}</div>;
}

/* ============================================================
   EMPTY STATE
   ============================================================ */
export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  variant?: "dark" | "light";
  className?: string;
}

export function EmptyState({ icon, title, description, action, compact, variant = "light", className = "" }: EmptyStateProps) {
  return (
    <div className={`empty-state ${variant === "dark" ? "empty-state--dark" : ""} ${compact ? "empty-state--compact" : ""} ${className}`}>
      {icon && !compact && <div className="empty-state__icon">{icon}</div>}
      <div className="empty-state__title" style={{ fontFamily: compact ? "inherit" : undefined, fontSize: compact ? 12.5 : undefined, fontWeight: compact ? 700 : undefined }}>
        {title}
      </div>
      {description && <p className="empty-state__desc">{description}</p>}
      {action}
    </div>
  );
}

/* ============================================================
   SKELETON
   ============================================================ */
export function Skeleton({ className = "", size, style }: { className?: string; size?: "sm" | "md" | "lg"; style?: React.CSSProperties }) {
  const h = size === "sm" ? "h-3" : size === "lg" ? "h-5" : "h-4";
  return <div className={`skeleton ${h} w-full ${className}`} style={style} aria-hidden="true" />;
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton className="w-1/3" />
      <div style={{ height: 8 }} />
      <Skeleton className="w-3/4" />
      <div style={{ height: 6 }} />
      <Skeleton className="w-1/2" />
    </div>
  );
}

export function SkeletonTableRows({ rows = 3, cols = 3 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c}>
              <Skeleton className="w-full" style={{ width: `${60 - c * 10}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/** Circle skeleton (avatar, icon) — matches clone API */
export function SkeletonCircle({ size = 32 }: { size?: number }) {
  return <div className="skeleton rounded-full shrink-0" style={{ width: size, height: size }} />;
}

/** Table skeleton — tenant data-table structure */
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex gap-6 px-5 py-3.5 border-b border-gray-100 bg-gray-50/80">
          {[180, 80, 60, 120, 80, 100, 60].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 px-5 py-3.5 border-b border-gray-50">
          <div className="flex items-center gap-3 flex-[180px]">
            <SkeletonCircle size={32} />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="w-3/5 h-3.5" />
              <Skeleton className="w-2/5 h-2.5" />
            </div>
          </div>
          <Skeleton className="w-16 h-5 flex-[80px]" />
          <Skeleton className="w-8 h-4 flex-[60px]" />
          <Skeleton className="w-24 h-7 flex-[120px]" />
          <Skeleton className="w-14 h-5 flex-[80px]" />
          <Skeleton className="w-16 h-4 flex-[100px]" />
          <Skeleton className="w-10 h-8 flex-[60px]" />
        </div>
      ))}
    </div>
  );
}
