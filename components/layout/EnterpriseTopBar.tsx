import React from 'react';
import { Search, Mic, ShieldAlert, CheckSquare, MessageSquare, Bell, Lock, Activity, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { DropdownMenu } from '../ui/DropdownMenu';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/Popover';

export interface TaskItem {
  id: string;
  title: string;
  patientName?: string;
  dueTime?: string;
  urgency?: 'high' | 'medium' | 'low';
}

export interface MessageItem {
  id: string;
  senderName: string;
  senderAvatar?: string;
  preview: string;
  time: string;
  unread: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  read: boolean;
  category: 'clinical' | 'system' | 'security';
}

export interface EnterpriseTopBarProps {
  // Left Area
  logo?: React.ReactNode;
  tenantName: string;
  rbacColorTheme?: string;
  
  // Center Area
  onSearchTrigger: () => void;
  isDictating?: boolean;
  onDictationToggle?: () => void;
  showBTG?: boolean;
  onBTGClick?: () => void;
  
  // Right Area
  taskCount?: number;
  chatUnreadCount?: number;
  notificationBadge?: boolean;
  notificationCount?: number;
  idleTimeRemaining?: number | null;
  onLockNow?: () => void;
  userDropdownElement?: React.ReactNode;
  userSettingsElement?: React.ReactNode;
  tasks?: TaskItem[];
  messages?: MessageItem[];
  notifications?: NotificationItem[];
}

export function EnterpriseTopBar({
  logo,
  tenantName,
  rbacColorTheme = '#3b82f6', // Brand blue as fallback
  onSearchTrigger,
  isDictating = false,
  onDictationToggle,
  showBTG = false,
  onBTGClick,
  taskCount = 0,
  chatUnreadCount = 0,
  notificationBadge = false,
  notificationCount = 0,
  idleTimeRemaining = null,
  onLockNow,
  userDropdownElement,
  userSettingsElement,
  tasks = [],
  messages = [],
  notifications = [],
}: EnterpriseTopBarProps) {
  
  // A premium default Urvos Logo SVG if none provided
  const DefaultLogo = (
    <div className="flex items-center gap-2 select-none cursor-pointer group">
      <div className="relative flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
        <Activity className="size-5 text-white" />
        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
        Urvos
      </span>
    </div>
  );

  return (
    <header
      className="sticky top-0 z-50 flex h-[64px] shrink-0 items-center justify-between px-6 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300"
    >
      {/* 1. Left Area: Identity & Core Context */}
      <div className="flex items-center gap-5 min-w-[250px] shrink-0">
        {logo || DefaultLogo}
        
        <div 
          className="flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 max-w-[150px] sm:max-w-[220px]"
          style={{ 
            background: `linear-gradient(135deg, ${rbacColorTheme}, ${rbacColorTheme}dd)`,
            boxShadow: `0 4px 14px 0 ${rbacColorTheme}40`
          }}
          title={tenantName}
        >
          <span className="truncate block w-full">{tenantName}</span>
        </div>
      </div>

      {/* 2. Center Area: Global Action & Voice Intelligence Hub */}
      <div className="flex flex-1 items-center justify-center gap-3 max-w-[600px] px-4">
        {/* Omni-Search */}
        <button
          onClick={onSearchTrigger}
          className="group relative flex h-10 flex-1 items-center rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 text-[13.5px] text-slate-500 transition-all duration-300 hover:bg-slate-100/50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        >
          <Search className="mr-2.5 size-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="font-medium text-slate-400 group-hover:text-slate-600 transition-colors">Search patient, orders, protocols...</span>
          <div className="absolute right-2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </button>

        {/* Ambient Dictation Engine */}
        {onDictationToggle && (
          <Button
            variant="ghost"
            size="icon"
            className={`relative size-12 rounded-xl transition-all duration-300 ${
              isDictating 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-700'
            }`}
            onClick={onDictationToggle}
            aria-label="Toggle Dictation"
          >
            <Mic className={`size-10 stroke-[1.5] ${isDictating ? 'animate-pulse' : ''}`} />
            {isDictating && (
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-3 bg-red-500 border-2 border-white"></span>
              </span>
            )}
          </Button>
        )}

        {/* BTG Override */}
        {showBTG && (
          <Button
            intent="danger"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold h-10 px-4 rounded-xl shadow-[0_4px_12px_rgba(225,29,72,0.25)] hover:shadow-[0_6px_16px_rgba(225,29,72,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            onClick={onBTGClick}
          >
            <ShieldAlert className="size-4.5" />
            <span className="tracking-wide">Break-The-Glass</span>
          </Button>
        )}
      </div>

      {/* 3. Right Area: Clinical Utilities & Security */}
      <div className="flex items-center gap-2 min-w-[250px] justify-end">
        {/* Task & Order Queue */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-blue-600 transition-all duration-200">
              <CheckSquare className="size-6 stroke-[1.5]" />
              {taskCount !== undefined && taskCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-blue-600 text-white border-2 border-white rounded-full shadow-sm">
                  {taskCount > 99 ? '99+' : taskCount}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden" align="end">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-semibold text-slate-800 text-sm">Tasks</h3>
              <span className="text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800">Filter</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <div key={task.id} className="px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors group">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors">{task.title}</p>
                        {task.patientName && (
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{task.patientName}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {task.dueTime && (
                          <span className="text-[10px] text-slate-400 font-medium">{task.dueTime}</span>
                        )}
                        {task.urgency === 'high' && <div className="size-2 rounded-full bg-rose-500" />}
                        {task.urgency === 'medium' && <div className="size-2 rounded-full bg-amber-500" />}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-500">No pending tasks</div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm">
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">View all tasks</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* HIPAA Secure Messenger */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-emerald-600 transition-all duration-200">
              <MessageSquare className="size-6 stroke-[1.5]" />
              {chatUnreadCount !== undefined && chatUnreadCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-emerald-500 text-white border-2 border-white rounded-full shadow-sm">
                  {chatUnreadCount > 99 ? '99+' : chatUnreadCount}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden" align="end">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-semibold text-slate-800 text-sm">Messages</h3>
              <span className="text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800">Filter</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {messages.length > 0 ? (
                messages.map(msg => (
                  <div key={msg.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors flex gap-3 ${msg.unread ? 'bg-emerald-50/30' : ''}`}>
                    <div className="relative size-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold overflow-hidden border border-slate-200">
                      {msg.senderAvatar ? (
                        <img src={msg.senderAvatar} alt={msg.senderName} className="w-full h-full object-cover" />
                      ) : (
                        msg.senderName.charAt(0)
                      )}
                      {msg.unread && (
                        <div className="absolute top-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className={`text-sm truncate ${msg.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>{msg.senderName}</p>
                        <span className="text-[10px] text-slate-400 font-medium flex-shrink-0 ml-2">{msg.time}</span>
                      </div>
                      <p className={`text-xs truncate ${msg.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{msg.preview}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-500">No new messages</div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm">
              <span className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline">View all messages</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* Global Notification Engine */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 transition-all duration-200">
              <Bell className="size-6 stroke-[1.5]" />
              {(notificationCount ?? 0) > 0 ? (
                <span className="absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white border-2 border-white rounded-full shadow-sm">
                  {(notificationCount ?? 0) > 99 ? '99+' : notificationCount}
                </span>
              ) : notificationBadge ? (
                <span className="absolute top-2 right-2 size-2.5 rounded-full bg-rose-500 ring-2 ring-white shadow-sm"></span>
              ) : null}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden" align="end">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10">
              <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
              <span className="text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800">Filter</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notif => (
                  <div key={notif.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors flex gap-3 ${!notif.read ? 'bg-rose-50/30' : ''}`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {notif.category === 'clinical' && <Activity className={`size-4 ${!notif.read ? 'text-rose-500' : 'text-slate-400'}`} />}
                      {notif.category === 'system' && <Bell className={`size-4 ${!notif.read ? 'text-blue-500' : 'text-slate-400'}`} />}
                      {notif.category === 'security' && <ShieldAlert className={`size-4 ${!notif.read ? 'text-amber-500' : 'text-slate-400'}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notif.read ? 'font-medium text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                      {notif.description && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.description}</p>
                      )}
                      <p className="text-[10px] text-slate-400 font-medium mt-1.5">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="flex-shrink-0 flex items-center">
                        <div className="size-2 rounded-full bg-rose-500" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-500">No notifications</div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm">
              <span className="text-sm text-rose-600 font-medium cursor-pointer hover:underline">View all notifications</span>
            </div>
          </PopoverContent>
        </Popover>

        {/* Settings / Profile Actions */}
        {userSettingsElement}

        {/* Workstation Interlock */}
        <div className="h-6 w-px bg-slate-200 mx-1" />
        
        <div 
          className="relative flex items-center justify-center size-10 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-all duration-200 group"
          onClick={onLockNow}
          title="Lock Workstation"
        >
          {idleTimeRemaining !== null && idleTimeRemaining <= 60 && (
            <svg className="absolute inset-0 size-full -rotate-90 text-orange-500 opacity-80" viewBox="0 0 36 36">
              <circle
                className="stroke-current transition-all duration-1000 ease-linear"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                strokeWidth="2.5"
                strokeDasharray="100"
                strokeDashoffset={100 - ((idleTimeRemaining / 60) * 100)}
                strokeLinecap="round"
              />
            </svg>
          )}
          <Lock className={`size-5.5 stroke-[1.5] transition-colors ${idleTimeRemaining !== null && idleTimeRemaining <= 60 ? 'text-orange-600 animate-pulse' : 'text-slate-400 group-hover:text-slate-600'}`} />
        </div>

        {/* User Identity Matrix Dropdown */}
        <div className="ml-2 pl-2 border-l border-slate-200">
          {userDropdownElement || (
            <div className="size-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-sm" />
          )}
        </div>
      </div>
    </header>
  );
}
