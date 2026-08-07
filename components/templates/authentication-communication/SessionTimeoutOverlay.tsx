"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { Lock, LogOut } from "lucide-react";
import { Button } from "../../ui/Button";

export interface SessionTimeoutOverlayProps {
  className?: string;
  isOpen?: boolean;
  userFullName?: string;
  userRole?: string;
  onUnlock?: (password: string) => void;
  onLogout?: () => void;
}

export function SessionTimeoutOverlay({ 
  className, 
  isOpen = true,
  userFullName = "Dr. Rajesh Kumar",
  userRole = "Cardiologist",
  onUnlock,
  onLogout
}: SessionTimeoutOverlayProps) {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className={clsx("fixed inset-0 z-[100] flex items-center justify-center bg-urvos-background/80 backdrop-blur-sm", className)}>
      <div className="w-full max-w-sm p-8 bg-urvos-surface border border-urvos-border shadow-lg rounded-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-urvos-surface-hover flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-urvos-text-subtle" />
        </div>
        
        <h2 className="text-xl font-semibold text-urvos-text mb-1">Session Locked</h2>
        <p className="text-sm text-center text-urvos-text-subtle mb-6">
          For your security, your session has been locked due to inactivity.
        </p>
        
        <div className="w-full bg-urvos-surface-hover rounded-xl p-4 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary font-bold">
            {userFullName.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-urvos-text text-sm">{userFullName}</p>
            <p className="text-xs text-urvos-text-subtle">{userRole}</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-urvos-text-subtle">Enter Password to Resume</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') onUnlock?.(password);
              }}
              autoFocus
              className="w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" 
              placeholder="••••••••"
            />
          </div>
          
          <Button size="md" className="w-full justify-center" onClick={() => onUnlock?.(password)}>
            Unlock Session
          </Button>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-urvos-danger hover:text-urvos-danger hover:bg-urvos-danger-bg p-2 rounded-lg transition-colors mt-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out completely
          </button>
        </div>
      </div>
    </div>
  );
}
