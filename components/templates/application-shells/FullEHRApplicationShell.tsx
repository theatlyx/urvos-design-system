"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import {
  Activity,
  User,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  ShieldCheck,
  LogOut,
  Stethoscope,
  Command,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Avatar } from "../../ui/Feedback";

export interface FullEHRApplicationShellProps {
  currentPatient?: {
    name: string;
    mrn: string;
    age: number;
    gender: string;
    abhaId: string;
  };
  children: React.ReactNode;
  activeNav?: string;
  onNavSelect?: (navId: string) => void;
  className?: string;
}

export function FullEHRApplicationShell({
  currentPatient = {
    name: "Rajesh Kumar",
    mrn: "MRN-2026-8819",
    age: 45,
    gender: "Male",
    abhaId: "91-8829-1029-4410",
  },
  children,
  activeNav = "clinical",
  onNavSelect,
  className,
}: FullEHRApplicationShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clinical", label: "Clinical EHR", icon: Stethoscope, badge: "Active" },
    { id: "patients", label: "Patient Directory", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "abdm", label: "ABDM Health Stack", icon: ShieldCheck },
    { id: "reports", label: "Analytics & Reports", icon: FileText },
    { id: "settings", label: "System Settings", icon: Settings },
  ];

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col text-urvos-text font-sans", className)}>
      {/* TOPBAR */}
      <header className="h-14 border-b border-urvos-border bg-urvos-surface px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-urvos-primary flex items-center justify-center text-white font-bold text-base shadow-xs">
              U
            </div>
            <span className="font-bold text-base tracking-tight text-urvos-text hidden sm:inline">
              Urvos <span className="text-urvos-primary font-normal text-xs uppercase tracking-wider">Healthcare OS</span>
            </span>
          </div>

          {/* PATIENT CONTEXT BANNER */}
          {currentPatient && (
            <div className="hidden lg:flex items-center space-x-3 px-3 py-1 bg-urvos-background border border-urvos-border rounded-lg text-xs">
              <Avatar name={currentPatient.name} size="sm" status="online" />
              <div>
                <div className="font-bold text-urvos-text flex items-center space-x-2">
                  <span>{currentPatient.name}</span>
                  <span className="text-urvos-text-subtle font-normal">({currentPatient.age}y/{currentPatient.gender})</span>
                </div>
                <div className="text-[10px] text-urvos-text-subtle font-mono">
                  {currentPatient.mrn} • ABHA: {currentPatient.abhaId}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GLOBAL SEARCH CMD+K */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle" />
            <input
              type="text"
              placeholder="Search patients, ICD-10, orders... (Cmd+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-urvos-background border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-urvos-surface border border-urvos-border px-1 rounded text-urvos-text-subtle">
              ⌘K
            </kbd>
          </div>

          {/* NOTIFICATION TRIGGER */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-urvos-background rounded-lg text-urvos-text-subtle hover:text-urvos-text relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5" />
          </button>

          <Avatar name="Dr. A. Sharma" size="sm" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={clsx(
            "border-r border-urvos-border bg-urvos-surface transition-all duration-200 flex flex-col justify-between shrink-0",
            sidebarCollapsed ? "w-16" : "w-60"
          )}
        >
          <div className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavSelect?.(item.id)}
                  className={clsx(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-urvos-primary text-white shadow-xs"
                      : "text-urvos-text-subtle hover:bg-urvos-background hover:text-urvos-text"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                  {!sidebarCollapsed && item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-urvos-border space-y-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 hover:bg-urvos-background rounded-lg text-urvos-text-subtle"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-6 bg-urvos-background/50">{children}</main>
      </div>
    </div>
  );
}
