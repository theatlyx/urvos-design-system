"use client";

import React from "react";
import { clsx } from "clsx";
import { Stethoscope, Users, Bell, UserCheck, Search, Menu } from "lucide-react";
import { Avatar } from "../../ui/Feedback";

export interface MobileProviderShellProps {
  providerName: string;
  facilityName: string;
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

export function MobileProviderShell({
  providerName = "Dr. Anita Desai",
  facilityName = "Max Super Specialty Hospital",
  children,
  activeTab = "rounds",
  onTabChange,
  className,
}: MobileProviderShellProps) {
  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col font-sans text-urvos-text max-w-md mx-auto border-x border-urvos-border shadow-lg", className)}>
      {/* MOBILE TOPBAR */}
      <header className="h-14 bg-urvos-surface border-b border-urvos-border px-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <Avatar name={providerName} size="sm" status="online" />
          <div>
            <div className="font-bold text-xs text-urvos-text">{providerName}</div>
            <div className="text-[10px] text-urvos-text-subtle truncate max-w-[150px]">{facilityName}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-urvos-background rounded-full text-urvos-text-subtle">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MOBILE BODY */}
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="h-14 bg-urvos-surface border-t border-urvos-border grid grid-cols-4 sticky bottom-0 z-20">
        {[
          { id: "rounds", label: "Rounds", icon: Stethoscope },
          { id: "patients", label: "Patients", icon: Users },
          { id: "search", label: "Search", icon: Search },
          { id: "profile", label: "Profile", icon: UserCheck },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange?.(t.id)}
              className={clsx(
                "flex flex-col items-center justify-center space-y-0.5 text-[10px] font-semibold transition-colors",
                isActive ? "text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-text"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
