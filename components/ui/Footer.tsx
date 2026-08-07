"use client";

import React from "react";
import { clsx } from "clsx";

export interface FooterProps {
  appName?: string;
  version?: string;
  links?: Array<{ label: string; href: string }>;
  className?: string;
}

export function Footer({
  appName = "Urvos Healthcare OS",
  version = "v2.4.0-prod",
  links = [
    { label: "Privacy Policy", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Clinical Support", href: "#" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={clsx("w-full border-t border-urvos-border bg-urvos-surface px-6 py-4 text-xs text-urvos-text-subtle flex flex-col sm:flex-row items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-urvos-text">{appName}</span>
        <span>•</span>
        <span>{version}</span>
      </div>

      <div className="flex items-center gap-4">
        {links.map((l, i) => (
          <a key={i} href={l.href} className="hover:text-urvos-primary transition-colors">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
