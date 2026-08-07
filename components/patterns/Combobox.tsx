"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

export interface ComboboxOption {
  value: string;
  label: string;
}

const comboboxVariants = cva("combobox", {
  variants: {
    size: {
      sm: "combobox--sm",
      md: "combobox--md",
      lg: "combobox--lg",
    },
    error: {
      true: "combobox--error",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ComboboxProps extends VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  allowCustomValue?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  size,
  error,
  disabled = false,
  allowCustomValue = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, width: 0 });

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOpen = () => {
    if (disabled) return;
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
      setSearch("");
    }
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".combobox-dropdown")
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="combobox-wrapper" ref={containerRef}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        className={comboboxVariants({ size, error })}
        onClick={toggleOpen}
        disabled={disabled}
      >
        <span className="combobox__label">
          {selectedOption ? selectedOption.label : (allowCustomValue && value ? value : placeholder)}
        </span>
        <ChevronDown className="combobox__icon" size={16} />
      </button>

      {open &&
        createPortal(
          <div
            className="combobox-dropdown bg-urvos-surface border border-urvos-border shadow-xl rounded-xl p-1 font-sans z-50 text-urvos-text"
            style={{
              position: "absolute",
              top: dropdownCoords.top + 4,
              left: dropdownCoords.left,
              width: dropdownCoords.width,
              zIndex: 9999,
              backgroundColor: "var(--surface)",
            }}
          >
            <div className="combobox-dropdown__search-wrapper">
              <Search className="combobox-dropdown__search-icon" size={14} />
              <input
                className="combobox-dropdown__search-input"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && allowCustomValue && search.trim()) {
                    onChange(search.trim());
                    setOpen(false);
                  }
                }}
                autoFocus
              />
            </div>
            <ul className="combobox-dropdown__list" role="listbox">
              {filteredOptions.length === 0 ? (
                <li className="combobox-dropdown__empty">{emptyText}</li>
              ) : (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={value === option.value}
                    className={`combobox-dropdown__item ${
                      value === option.value ? "combobox-dropdown__item--selected" : ""
                    }`}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <span className="combobox-dropdown__item-label">{option.label}</span>
                    {value === option.value && <Check size={16} className="combobox-dropdown__item-check" />}
                  </li>
                ))
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
