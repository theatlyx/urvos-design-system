"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bell, Check, Trash2, Settings, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Switch } from "../ui/Switch";

// --- Types ---
export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
  link?: string;
}

// --- Context & Provider ---
interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  addNotification: (notif: NotificationItem) => void;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  return React.useContext(NotificationContext);
};

export interface NotificationProviderProps {
  children: React.ReactNode;
  initialNotifications?: NotificationItem[];
  wsEndpoint?: string; // For real WebSocket integration
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  initialNotifications = [], 
  wsEndpoint 
}) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications);

  // Mock WebSocket integration
  React.useEffect(() => {
    if (!wsEndpoint) return;
    
    // In a real app, you would connect to the websocket here
    console.log(`Connecting to WebSocket at ${wsEndpoint}...`);
  }, [wsEndpoint]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = React.useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = React.useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addNotification = React.useCallback((notif: NotificationItem) => {
    setNotifications(prev => [notif, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// --- Notification Popover ---
export interface NotificationPopoverProps {
  notifications?: NotificationItem[];
  unreadCount?: number;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

export const NotificationPopover = ({
  notifications: propNotifications,
  unreadCount: propUnreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPopoverProps = {}) => {
  const context = useNotifications();
  const notifications = propNotifications ?? context?.notifications ?? [];
  const unreadCount = propUnreadCount ?? context?.unreadCount ?? 0;
  const markAsRead = onMarkAsRead ?? context?.markAsRead ?? (() => {});
  const markAllAsRead = onMarkAllAsRead ?? context?.markAllAsRead ?? (() => {});

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open notifications">
          <Bell className="w-5 h-5 text-urvos-text" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-urvos-danger text-[9px] font-bold text-urvos-text-inverse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={8}
          className="z-50 w-80 rounded-lg border border-urvos-border bg-urvos-surface p-0 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <div className="flex items-center justify-between border-b border-urvos-border px-4 py-3">
            <h4 className="font-semibold text-urvos-text">Notifications</h4>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-0 text-xs text-urvos-primary">
                Mark all as read
              </Button>
            )}
          </div>
          <div className="flex max-h-[300px] flex-col overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-urvos-text-subtle">
                No new notifications
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={clsx(
                    "flex flex-col gap-1 border-b border-urvos-border p-4 transition-colors hover:bg-urvos-surface-muted cursor-pointer",
                    !notif.read && "bg-urvos-primary/5"
                  )}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-sm text-urvos-text">{notif.title}</span>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-urvos-primary flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-urvos-text-subtle line-clamp-2">{notif.message}</p>
                  <span className="text-[10px] text-urvos-text-muted mt-1">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-urvos-border p-2">
            <Button variant="ghost" className="w-full text-sm text-urvos-primary justify-center">
              View all notifications
            </Button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

// --- Notification Center ---
export const NotificationCenter = () => {
  const context = useNotifications();
  const { notifications = [], unreadCount = 0, markAsRead = () => {}, markAllAsRead = () => {}, removeNotification = () => {} } = (context as NotificationContextType | undefined) ?? {};

  return (
    <div className="notification-center bg-urvos-surface border border-urvos-border rounded-lg shadow-sm w-full max-w-3xl">
      <div className="flex items-center justify-between p-6 border-b border-urvos-border">
        <div>
          <h2 className="text-xl font-bold text-urvos-text">Notification Center</h2>
          <p className="text-sm text-urvos-text-subtle mt-1">You have {unreadCount} unread messages.</p>
        </div>
        <Button variant="secondary" onClick={markAllAsRead} disabled={unreadCount === 0}>
          <Check className="w-4 h-4 mr-2" /> Mark all read
        </Button>
      </div>
      <div className="divide-y divide-urvos-border">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-urvos-text-subtle">
            You're all caught up!
          </div>
        ) : (
          notifications.map((notif: NotificationItem) => (
            <div key={notif.id} className={clsx("p-6 flex items-start gap-4 transition-colors hover:bg-urvos-surface-muted", !notif.read && "bg-urvos-primary/5")}>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-urvos-text text-base">{notif.title}</h4>
                  {!notif.read && <span className="px-2 py-0.5 rounded-full bg-urvos-primary text-urvos-text-inverse text-[10px] font-bold uppercase">New</span>}
                </div>
                <p className="text-sm text-urvos-text-subtle">{notif.message}</p>
                <div className="text-xs text-urvos-text-muted mt-2">
                  {new Date(notif.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!notif.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notif.id)}>
                    Mark Read
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-urvos-text-subtle hover:text-urvos-danger" onClick={() => removeNotification(notif.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Notification Settings ---
export const NotificationSettings = () => {
  return (
    <div className="notification-settings bg-urvos-surface border border-urvos-border rounded-lg shadow-sm p-6 w-full max-w-2xl">
      <div className="flex items-center gap-3 mb-6 border-b border-urvos-border pb-4">
        <Settings className="w-6 h-6 text-urvos-text" />
        <h2 className="text-xl font-bold text-urvos-text">Notification Preferences</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-urvos-text">Push Notifications</h4>
            <p className="text-sm text-urvos-text-subtle">Receive push notifications in your browser.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-urvos-text">Email Alerts</h4>
            <p className="text-sm text-urvos-text-subtle">Receive a daily digest of clinical updates.</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-urvos-text">SMS Messages</h4>
            <p className="text-sm text-urvos-text-subtle">Receive text messages for critical lab results.</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
};
