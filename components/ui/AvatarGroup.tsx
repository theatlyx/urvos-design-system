"use client";

import React, { ReactNode } from "react";
import { Avatar } from "./Feedback";

export interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  className?: string;
}

export function AvatarGroup({ children, max, className = "" }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;

  if (max && total > max) {
    const visible = childrenArray.slice(0, max);
    const overflow = total - max;
    return (
      <div className={`avatar-group ${className}`}>
        {visible}
        <span className="avatar-group__overflow">+{overflow}</span>
      </div>
    );
  }

  return <div className={`avatar-group ${className}`}>{children}</div>;
}
