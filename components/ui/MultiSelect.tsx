"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { clsx } from "clsx";

export type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={clsx(
            "flex min-h-[40px] w-full items-center justify-between rounded-md border border-urvos-border bg-urvos-surface px-3 py-1.5 text-sm ring-offset-urvos-background placeholder:text-urvos-text-subtle focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-urvos-danger focus:ring-urvos-danger",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && <span className="text-urvos-text-subtle py-0.5">{placeholder}</span>}
            {selected.map((item) => {
              const option = options.find((o) => o.value === item);
              return (
                <span key={item} className="inline-flex items-center gap-1 rounded-md bg-urvos-surface-muted px-2 py-0.5 text-xs font-medium text-urvos-text">
                  {option?.label}
                  <div
                    className="cursor-pointer rounded-full p-0.5 hover:bg-urvos-border hover:text-urvos-danger"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUnselect(item);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3" />
                  </div>
                </span>
              );
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="relative z-50 w-full min-w-[200px] overflow-hidden rounded-md border border-urvos-border bg-urvos-surface text-urvos-text shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden bg-urvos-surface text-urvos-text">
            <div className="flex items-center border-b border-urvos-border px-3">
              <CommandPrimitive.Input
                placeholder="Search..."
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-urvos-text-subtle disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <CommandPrimitive.List className="max-h-60 overflow-y-auto overflow-x-hidden p-1">
              <CommandPrimitive.Empty className="py-6 text-center text-sm text-urvos-text-subtle">
                No results found.
              </CommandPrimitive.Empty>
              <CommandPrimitive.Group>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandPrimitive.Item
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onChange(
                          isSelected
                            ? selected.filter((item) => item !== option.value)
                            : [...selected, option.value]
                        );
                        setOpen(true);
                      }}
                      className={clsx(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-urvos-surface-muted aria-selected:text-urvos-text data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                      )}
                    >
                      <div className={clsx(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-urvos-border",
                        isSelected ? "bg-urvos-primary text-urvos-primary-foreground border-urvos-primary" : "bg-transparent"
                      )}>
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      {option.label}
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
