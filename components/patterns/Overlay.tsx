"use client";
import { ReactNode, useId, useState } from "react";

/* ============================================================
   TOOLTIP
   ============================================================ */
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <span style={{ position: "relative", display: "inline-block" }} className="tip-wrap">
      <span aria-describedby={id} tabIndex={0}>
        {children}
      </span>
      <span role="tooltip" id={id} className="tip">
        {label}
      </span>
    </span>
  );
}

/* ============================================================
   DROPDOWN — simple menu, closes on outside click / Escape
   ============================================================ */
export interface DropdownItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
}
export function Dropdown({ trigger, items }: { trigger: ReactNode; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      >
        {trigger}
      </span>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            insetInlineEnd: 0,
            top: "100%",
            marginTop: 4,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            boxShadow: "var(--shadow-pop)",
            width: 170,
            padding: 5,
            zIndex: "var(--z-dropdown)" as any,
          }}
          onMouseLeave={() => setOpen(false)}
        >
          {items.map((item, i) => (
            <div
              key={i}
              role="menuitem"
              tabIndex={0}
              style={{
                padding: "8px 10px",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 7,
                color: item.danger ? "var(--sig-critical)" : "var(--text-2)",
                cursor: "pointer",
              }}
              onClick={() => {
                item.onSelect();
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

/* ============================================================
   ACCORDION
   ============================================================ */
export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "var(--r-sm)", marginBottom: 8, overflow: "hidden" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 12px",
              fontSize: 12.5,
              fontWeight: 700,
              background: "var(--surface-soft)",
              border: "none",
              cursor: "pointer",
            }}
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.title}
            <span aria-hidden="true">{openIndex === i ? "▲" : "▼"}</span>
          </button>
          {openIndex === i && <div style={{ padding: "10px 12px", fontSize: 12, color: "var(--text-2)" }}>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}
