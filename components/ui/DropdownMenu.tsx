"use client";
import { type ReactNode } from "react";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";

/* ── Types ───────────────────────────────────────────────────── */
export type MenuItemType = "item" | "separator" | "label";

export interface MenuItem {
  type?: MenuItemType;
  label?: string;
  /** Left-side icon */
  icon?: ReactNode;
  /** Keyboard shortcut displayed on the right */
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuGroup {
  label?: string;
  items: MenuItem[];
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  /** Either a flat list of items, or grouped */
  items?: MenuItem[];
  groups?: MenuGroup[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/* ── Component ───────────────────────────────────────────────── */
export function DropdownMenu({
  trigger,
  items,
  groups,
  align = "end",
  side = "bottom",
  className,
}: DropdownMenuProps) {
  const resolvedGroups: MenuGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger as React.ReactElement}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          side={side}
          sideOffset={6}
          className={clsx("dropdown-content", className)}
          collisionPadding={12}
        >
          {resolvedGroups.map((group, gi) => (
            <DropdownMenuPrimitive.Group key={gi}>
              {group.label && (
                <DropdownMenuPrimitive.Label className="dropdown-label">
                  {group.label}
                </DropdownMenuPrimitive.Label>
              )}

              {group.items.map((item, ii) => {
                if (item.type === "separator") {
                  return (
                    <DropdownMenuPrimitive.Separator
                      key={ii}
                      className="dropdown-separator"
                    />
                  );
                }

                return (
                  <DropdownMenuPrimitive.Item
                    key={ii}
                    disabled={item.disabled}
                    onSelect={item.onSelect}
                    className={clsx(
                      "dropdown-item",
                      item.danger && "dropdown-item--danger"
                    )}
                  >
                    {item.icon && (
                      <span className="dropdown-item__icon">{item.icon}</span>
                    )}
                    {item.label}
                    {item.shortcut && (
                      <span className="dropdown-item__shortcut">{item.shortcut}</span>
                    )}
                  </DropdownMenuPrimitive.Item>
                );
              })}

              {/* Separator between groups (not after the last) */}
              {gi < resolvedGroups.length - 1 && (
                <DropdownMenuPrimitive.Separator className="dropdown-separator" />
              )}
            </DropdownMenuPrimitive.Group>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

// Re-export primitives for advanced usage
export const DropdownMenuRoot      = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger   = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent   = DropdownMenuPrimitive.Content;
export const DropdownMenuItem      = DropdownMenuPrimitive.Item;
export const DropdownMenuGroup     = DropdownMenuPrimitive.Group;
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
export const DropdownMenuLabel     = DropdownMenuPrimitive.Label;
