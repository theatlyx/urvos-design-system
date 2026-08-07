"use client";

import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { Portal } from "../utilities/Portal";
import { Button } from "../ui/Button";

export interface IdleTimerProps {
  timeoutMs?: number; // Defaults to 15 mins (900000ms) or 10s for demo
  onTimeout?: () => void;
}

export function IdleTimer({ timeoutMs = 900000, onTimeout }: IdleTimerProps) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsIdle(true);
        onTimeout?.();
      }, timeoutMs);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, [timeoutMs, onTimeout]);

  if (!isIdle) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-urvos-surface border border-urvos-border rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
          <div className="h-12 w-12 rounded-full bg-urvos-warning/10 text-urvos-warning flex items-center justify-center mx-auto">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-urvos-text">HIPAA Session Timeout</h3>
            <p className="text-xs text-urvos-text-subtle mt-1">
              Your clinical session has been locked due to inactivity.
            </p>
          </div>
          <Button variant="primary" className="w-full" onClick={() => setIsIdle(false)}>
            Unlock Session
          </Button>
        </div>
      </div>
    </Portal>
  );
}
