"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Menu, X, Bell, Search, Home, Users, Calendar, Activity, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { NavItem } from "../navigation/Navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Form";
import { Portal } from "../utilities/Portal";

export interface ShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  navigation?: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string | number;
    isActive?: boolean;
  }>;
}

export function Shell({ children, user, navigation }: ShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const defaultNav = [
    { label: "Dashboard", href: "#", icon: <Home className="w-5 h-5" />, isActive: true },
    { label: "Patients", href: "#", icon: <Users className="w-5 h-5" />, badge: "24" },
    { label: "Schedule", href: "#", icon: <Calendar className="w-5 h-5" /> },
    { label: "Vitals & Labs", href: "#", icon: <Activity className="w-5 h-5" /> },
    { label: "Settings", href: "#", icon: <Settings className="w-5 h-5" /> },
  ];

  const navItems = navigation || defaultNav;

  return (
    <div className="min-h-screen bg-urvos-background text-urvos-text flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-urvos-border bg-urvos-surface px-4 shadow-sm md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            aria-label="Toggle navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-urvos-primary font-bold text-white shadow-xs">
              U
            </span>
            <span className="text-base sm:text-lg font-bold text-urvos-text tracking-tight">Urvos Health OS</span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden max-w-sm flex-1 mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-urvos-text-subtle" />
            <Input placeholder="Search patient ID, name, or MRN..." className="pl-9" />
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle search overlay"
          >
            <Search className="h-5 w-5 text-urvos-text-subtle" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5 text-urvos-text-subtle" />
          </Button>

          <div className="flex items-center gap-2 border-l border-urvos-border pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-urvos-primary/10 font-bold text-urvos-primary text-xs">
              {user?.name ? user.name[0] : "D"}
            </div>
            <div className="hidden flex-col text-left text-xs lg:flex">
              <span className="font-semibold text-urvos-text leading-tight">{user?.name || "Dr. Sarah Jenkins"}</span>
              <span className="text-[10px] text-urvos-text-subtle">{user?.role || "Attending Physician"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden p-3 bg-urvos-surface border-b border-urvos-border animate-in slide-in-from-top-2">
          <div className="relative flex items-center gap-2">
            <Search className="absolute left-3 h-4 w-4 text-urvos-text-subtle" />
            <Input placeholder="Search patient MRN or condition..." className="pl-9 pr-8" autoFocus />
            <button onClick={() => setMobileSearchOpen(false)} className="p-1 text-urvos-text-subtle">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Slide-in Drawer Backdrop */}
        {mobileDrawerOpen && (
          <Portal>
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in-0"
              onClick={() => setMobileDrawerOpen(false)}
            />
          </Portal>
        )}

        {/* Mobile Sidebar Drawer */}
        <aside
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-72 bg-urvos-surface p-4 border-r border-urvos-border shadow-2xl transition-transform duration-200 ease-in-out md:hidden flex flex-col justify-between",
            mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-urvos-border pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-urvos-primary font-bold text-white text-xs">U</span>
                <span className="font-bold text-sm text-urvos-text">Navigation</span>
              </div>
              <button onClick={() => setMobileDrawerOpen(false)} className="p-1 text-urvos-text-subtle hover:text-urvos-text">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <NavItem key={idx} label={item.label} href={item.href} icon={item.icon} badge={item.badge} isActive={item.isActive} />
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-urvos-border text-xs text-urvos-text-subtle">
            Urvos Healthcare OS v2.4.0
          </div>
        </aside>

        {/* Desktop Sidebar (Persistent & Collapsible) */}
        <aside
          className={clsx(
            "hidden md:flex flex-col justify-between border-r border-urvos-border bg-urvos-surface p-3 transition-all duration-200 shrink-0",
            desktopCollapsed ? "w-16" : "w-64"
          )}
        >
          <div className="space-y-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <NavItem
                  key={idx}
                  label={desktopCollapsed ? "" : item.label}
                  href={item.href}
                  icon={item.icon}
                  badge={desktopCollapsed ? undefined : item.badge}
                  isActive={item.isActive}
                />
              ))}
            </nav>
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setDesktopCollapsed(!desktopCollapsed)}
            className="flex items-center justify-center p-2 rounded-lg text-urvos-text-subtle hover:bg-urvos-surface-muted hover:text-urvos-text transition-colors mt-auto border-t border-urvos-border"
            title={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {desktopCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-urvos-background w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export interface SidebarProps {
  brandName?: string;
  items: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
    active?: boolean;
    badge?: string | number;
  }>;
  className?: string;
}

export function Sidebar({ brandName = "Urvos Health", items, className }: SidebarProps) {
  return (
    <aside className={clsx("w-64 h-full border-r border-urvos-border bg-urvos-surface p-4 flex flex-col justify-between", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-urvos-border pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-urvos-primary font-bold text-white text-xs">U</span>
          <span className="font-bold text-sm text-urvos-text">{brandName}</span>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((item, idx) => (
            <NavItem key={idx} label={item.label} href={item.href} icon={item.icon} badge={item.badge} isActive={item.active} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export interface TopNavProps {
  userName?: string;
  userRole?: string;
  className?: string;
}

export function TopNav({ userName = "Dr. Sarah Jenkins", userRole = "Attending Physician", className }: TopNavProps) {
  return (
    <header className={clsx("h-16 w-full border-b border-urvos-border bg-urvos-surface px-6 flex items-center justify-between shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-urvos-primary font-bold text-white">U</span>
        <span className="font-bold text-base text-urvos-text">Urvos TopNav</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right text-xs">
          <span className="font-bold text-urvos-text">{userName}</span>
          <span className="text-urvos-text-subtle">{userRole}</span>
        </div>
      </div>
    </header>
  );
}
