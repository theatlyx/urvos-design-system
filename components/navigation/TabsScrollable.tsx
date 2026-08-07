"use client";

import React, { useState } from "react";
import { clsx } from "clsx";

export interface ScrollableTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsScrollableProps {
  items: ScrollableTabItem[];
  defaultTabId?: string;
  className?: string;
}

export function TabsScrollable({ items, defaultTabId, className }: TabsScrollableProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || items[0]?.id);

  const activeItem = items.find((i) => i.id === activeTab) || items[0];

  return (
    <div className={clsx("w-full space-y-4", className)}>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-urvos-border pb-1">
        {items.map((t) => {
          const isActive = t.id === activeTab;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={clsx(
                "whitespace-nowrap px-4 py-2 text-xs font-bold transition-all border-b-2",
                isActive
                  ? "border-urvos-primary text-urvos-primary"
                  : "border-transparent text-urvos-text-subtle hover:text-urvos-text"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="py-2">{activeItem?.content}</div>
    </div>
  );
}
