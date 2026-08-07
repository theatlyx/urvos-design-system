"use client";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";

type Variant = "default" | "critical" | "success";
interface ToastItem {
  id: string;
  message: string;
  variant: Variant;
  actionLabel?: string;
  onAction?: () => void;
  /** Critical toasts default to sticky (no auto-dismiss) — matches the
   *  system rule that critical alerts can't be silently missed. */
  durationMs?: number | null;
}

const ToastContext = createContext<{
  push: (t: Omit<ToastItem, "id">) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({
  children,
  position = "bottom-right",
}: {
  children: ReactNode;
  position?: "top-right" | "bottom-right";
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback((t: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID();
    const duration = t.durationMs === undefined ? (t.variant === "critical" ? null : 5000) : t.durationMs;
    setToasts((prev) => [...prev, { ...t, id }]);
    if (duration !== null) {
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), duration);
    }
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className={`toast-region toast-region--${position}`} aria-live="polite">
            {toasts.map((t) => (
              <div key={t.id} className="toast" data-variant={t.variant}>
                <span className="toast__dot" aria-hidden="true" />
                <span>{t.message}</span>
                {t.actionLabel && (
                  <span className="toast__action" onClick={t.onAction}>
                    {t.actionLabel}
                  </span>
                )}
                <span
                  role="button"
                  aria-label="Dismiss"
                  style={{ marginInlineStart: t.actionLabel ? 4 : "auto", opacity: 0.6, cursor: "pointer" }}
                  onClick={() => dismiss(t.id)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
