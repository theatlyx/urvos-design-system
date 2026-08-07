"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsVerticalProps {
  items: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export function TabsVertical({ items, defaultTabId, className }: TabsVerticalProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || items[0]?.id);

  const activeItem = items.find((i) => i.id === activeTab) || items[0];

  return (
    <div className={clsx("flex w-full gap-6 bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm", className)}>
      <div className="w-56 flex flex-col space-y-1 border-r border-urvos-border pr-4">
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors",
                isActive
                  ? "bg-urvos-primary text-white shadow-xs"
                  : "text-urvos-text-subtle hover:text-urvos-text hover:bg-urvos-surface-muted"
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 py-1">{activeItem?.content}</div>
    </div>
  );
}
