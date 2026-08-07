"use client";
import { type ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** "single" collapses one at a time; "multiple" allows many open */
  type?: "single" | "multiple";
  /** Default open item id(s) */
  defaultOpen?: string | string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultOpen,
  className,
}: AccordionProps) {
  const sharedProps = {
    className: clsx("w-full", className),
    collapsible: true as const,
  };

  if (type === "multiple") {
    return (
      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : undefined}
        {...sharedProps}
      >
        {items.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={Array.isArray(defaultOpen) ? defaultOpen[0] : defaultOpen}
      collapsible
      className={clsx("w-full", className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({ item }: { item: AccordionItem }) {
  return (
    <AccordionPrimitive.Item
      value={item.id}
      className="border-b border-urvos-border"
      disabled={item.disabled}
    >
      <AccordionPrimitive.Header className="flex" asChild>
        <AccordionPrimitive.Trigger className="flex w-full flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
          {item.title}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pb-4 pt-0">
          {item.content}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
