"use client";
import { type ReactNode, useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { clsx } from "clsx";

/* ── Types ───────────────────────────────────────────────────── */
export interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Override the keyboard shortcut (default: Cmd/Ctrl + K) */
  hotkey?: string;
  className?: string;
}

/* ── Component ───────────────────────────────────────────────── */
export function CommandPalette({
  items,
  placeholder = "Search commands…",
  open: controlledOpen,
  onOpenChange,
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback(
    (val: boolean) => {
      setInternalOpen(val);
      onOpenChange?.(val);
      if (!val) setQuery("");
    },
    [onOpenChange]
  );

  /* Keyboard shortcut to open */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);

  /* Filter */
  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.group?.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  });

  /* Group */
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const g = item.group ?? "Actions";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const item = filtered[selectedIndex];
      if (item) {
        item.onSelect();
        setOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  let flatIndex = 0;

  return (
    <div
      className="command-palette__overlay"
      role="dialog"
      aria-modal
      aria-label="Command palette"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className={clsx("command-palette", className)} onKeyDown={handleKeyDown}>
        {/* Search bar */}
        <div className="command-palette__search">
          <Search className="command-palette__search-icon" />
          <input
            autoFocus
            className="command-palette__input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="command-palette__kbd">ESC</kbd>
        </div>

        {/* Results */}
        <div className="command-palette__list" role="listbox">
          {filtered.length === 0 ? (
            <div className="command-palette__empty">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group}>
                <div className="command-palette__group-label">{group}</div>
                {groupItems.map((item) => {
                  const itemIdx = flatIndex++;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={itemIdx === selectedIndex}
                      className={clsx(
                        "command-palette__item",
                        itemIdx === selectedIndex && "command-palette__item--selected"
                      )}
                      onMouseEnter={() => setSelectedIndex(itemIdx)}
                      onClick={() => {
                        item.onSelect();
                        setOpen(false);
                      }}
                    >
                      {item.icon && (
                        <span className="command-palette__item-icon">{item.icon}</span>
                      )}
                      {item.label}
                      {item.shortcut && (
                        <kbd className="command-palette__item-shortcut">{item.shortcut}</kbd>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="command-palette__footer">
          <span className="command-palette__footer-hint">
            <kbd className="command-palette__kbd">↑↓</kbd> Navigate
          </span>
          <span className="command-palette__footer-hint">
            <kbd className="command-palette__kbd">↵</kbd> Select
          </span>
          <span className="command-palette__footer-hint">
            <kbd className="command-palette__kbd">ESC</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
