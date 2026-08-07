"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const sheetVariants = cva(
  "sheet",
  {
    variants: {
      side: {
        top: "sheet--top",
        bottom: "sheet--bottom",
        left: "sheet--left",
        right: "sheet--right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export interface SheetProps extends VariantProps<typeof sheetVariants> {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /** Set true for destructive confirmations — disables click-outside-to-close */
  requireExplicitDismiss?: boolean;
}

/**
 * Slide-over panel. Traps focus, closes on Escape, portals to document.body.
 */
export function Sheet({
  open,
  onClose,
  side,
  title,
  description,
  footer,
  children,
  requireExplicitDismiss = false,
}: SheetProps) {
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
      className="sheet-overlay"
      onClick={() => !requireExplicitDismiss && onClose()}
    >
      <div
        ref={dialogRef}
        className={sheetVariants({ side })}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "sheet-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet__header">
          <div>
            {title && <h4 id="sheet-title" className="sheet__title">{title}</h4>}
            {description && <p className="sheet__description">{description}</p>}
          </div>
          {!requireExplicitDismiss && (
            <button className="btn btn--ghost btn--icon sheet__close" aria-label="Close" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>
        <div className="sheet__body">{children}</div>
        {footer && <div className="sheet__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
