"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { clsx } from "clsx";

export type Option = {
  label: string;
  value: string;
};

interface AutocompleteProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className,
  error,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={clsx(
            "combobox",
            error && "combobox--error",
            className
          )}
        >
          <span className={clsx("combobox__label", !selectedOption && "text-opacity-50")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="combobox__icon select-icon" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="select-content"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <CommandPrimitive className="combobox-dropdown">
            <div className="combobox-dropdown__search-wrapper">
              <CommandPrimitive.Input
                placeholder="Search..."
                className="combobox-dropdown__search-input"
              />
            </div>
            <CommandPrimitive.List className="combobox-dropdown__list">
              <CommandPrimitive.Empty className="combobox-dropdown__empty">
                No results found.
              </CommandPrimitive.Empty>
              <CommandPrimitive.Group>
                {options.map((option) => {
                  const isSelected = value === option.value;
                  return (
                    <CommandPrimitive.Item
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}
                      className={clsx(
                        "combobox-dropdown__item",
                        isSelected && "combobox-dropdown__item--selected"
                      )}
                    >
                      {option.label}
                      {isSelected && <Check className="combobox-dropdown__item-check select-icon" />}
                    </CommandPrimitive.Item>
                  );
                })}
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
