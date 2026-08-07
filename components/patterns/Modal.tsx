"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Size = "sm" | "md" | "lg";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: Size;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
  /** Set true for destructive confirmations — disables click-outside-to-close */
  requireExplicitDismiss?: boolean;
}

/**
 * Baseline accessible modal: traps focus, closes on Escape (unless
 * requireExplicitDismiss), restores focus to the trigger on close, and
 * portals to document.body so it always sits above app chrome regardless
 * of where it's rendered in the tree.
 */
export function Modal({
  open,
  onClose,
  size = "md",
  title,
  footer,
  children,
  requireExplicitDismiss = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !requireExplicitDismiss) onClose();
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose, requireExplicitDismiss]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => !requireExplicitDismiss && onClose()}
    >
      <div
        ref={dialogRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="modal__header">
            <h4 id="modal-title">{title}</h4>
            {!requireExplicitDismiss && (
              <button className="btn btn--ghost btn--icon" aria-label="Close" onClick={onClose}>
                ✕
              </button>
            )}
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
