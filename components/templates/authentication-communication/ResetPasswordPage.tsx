"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { ShieldCheck, KeyRound, AlertCircle } from "lucide-react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

export interface ResetPasswordPageProps {
  className?: string;
  onReset?: (password: string) => void;
  onCancel?: () => void;
}

export function ResetPasswordPage({ className, onReset, onCancel }: ResetPasswordPageProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);

  // Simple password strength criteria
  const isLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  const score = (isLength ? 1 : 0) + (hasUpper ? 1 : 0) + (hasSpecial ? 1 : 0);

  const getScoreColor = () => {
    if (score === 0 && password.length > 0) return "bg-urvos-danger-bg";
    if (score === 1) return "bg-urvos-danger-bg";
    if (score === 2) return "bg-urvos-warning-bg";
    if (score === 3) return "bg-urvos-success-bg";
    return "bg-urvos-border";
  };

  const handleReset = () => {
    if (password !== confirmPassword || score < 2) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onReset?.(password);
  };

  return (
    <div className={clsx("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className)}>
      <Card className="w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Create New Password</h1>
          <p className="text-sm text-urvos-text-subtle">Your new password must be different from previous used passwords.</p>
        </div>

        {showError && (
          <div className="p-3 bg-urvos-danger-bg border border-urvos-danger rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-urvos-danger mt-0.5 flex-shrink-0" />
            <p className="text-xs text-urvos-danger">Passwords do not match or are not strong enough. Please check requirements.</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-urvos-text-subtle">New Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" 
                placeholder="Enter new password"
              />
            </div>
            
            <div className="flex gap-1 mt-2">
              <div className={clsx("h-1 flex-1 rounded-full", password.length > 0 ? getScoreColor() : "bg-urvos-border")} />
              <div className={clsx("h-1 flex-1 rounded-full", score >= 2 ? getScoreColor() : "bg-urvos-border")} />
              <div className={clsx("h-1 flex-1 rounded-full", score >= 3 ? getScoreColor() : "bg-urvos-border")} />
            </div>
            
            <div className="text-[10px] space-y-1 mt-2 text-urvos-text-subtle">
              <p className={isLength ? "text-urvos-success" : ""}>✓ At least 8 characters</p>
              <p className={hasUpper ? "text-urvos-success" : ""}>✓ At least 1 uppercase letter</p>
              <p className={hasSpecial ? "text-urvos-success" : ""}>✓ At least 1 special character</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-urvos-text-subtle">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" 
              placeholder="Re-enter new password"
            />
          </div>
          
          <div className="pt-2 flex flex-col gap-2">
            <Button size="md" className="w-full justify-center" onClick={handleReset}>
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Reset Password
            </Button>
            <button 
              onClick={onCancel}
              className="text-sm font-medium text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
