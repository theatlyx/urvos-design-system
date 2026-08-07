"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MegaMenuCategory {
  category: string;
  items: MegaMenuItem[];
}

export interface MegaMenuProps {
  label?: string;
  categories: MegaMenuCategory[];
  className?: string;
}

export function MegaMenu({ label = "Clinical Modules", categories, className }: MegaMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx("relative inline-block text-left", className)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm font-medium text-urvos-text hover:text-urvos-primary transition-colors py-2 px-3 rounded-md hover:bg-urvos-surface-muted"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[550px] rounded-xl border border-urvos-border bg-urvos-surface p-6 shadow-xl grid grid-cols-2 gap-6 animate-in fade-in-0 zoom-in-95">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-xs font-bold text-urvos-text-subtle uppercase tracking-wider">
                {cat.category}
              </h4>
              <div className="space-y-2">
                {cat.items.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-urvos-surface-muted transition-colors group"
                  >
                    {item.icon && <span className="text-urvos-primary mt-0.5">{item.icon}</span>}
                    <div>
                      <span className="block text-sm font-semibold text-urvos-text group-hover:text-urvos-primary">
                        {item.title}
                      </span>
                      <span className="block text-xs text-urvos-text-subtle line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
