"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// components/patterns/Combobox.tsx
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, Check } from "lucide-react";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
var comboboxVariants = cva("combobox", {
  variants: {
    size: {
      sm: "combobox--sm",
      md: "combobox--md",
      lg: "combobox--lg"
    },
    error: {
      true: "combobox--error"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  size,
  error,
  disabled = false,
  allowCustomValue = false
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0, width: 0 });
  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter(
    (opt) => opt.label.toLowerCase().includes(search.toLowerCase())
  );
  const toggleOpen = () => {
    if (disabled) return;
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
      setSearch("");
    }
    setOpen(!open);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target) && !event.target.closest(".combobox-dropdown")) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "combobox-wrapper", ref: containerRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        role: "combobox",
        "aria-expanded": open,
        className: comboboxVariants({ size, error }),
        onClick: toggleOpen,
        disabled,
        children: [
          /* @__PURE__ */ jsx("span", { className: "combobox__label", children: selectedOption ? selectedOption.label : allowCustomValue && value ? value : placeholder }),
          /* @__PURE__ */ jsx(ChevronDown, { className: "combobox__icon", size: 16 })
        ]
      }
    ),
    open && createPortal(
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "combobox-dropdown bg-urvos-surface border border-urvos-border shadow-xl rounded-xl p-1 font-sans z-50 text-urvos-text",
          style: {
            position: "absolute",
            top: dropdownCoords.top + 4,
            left: dropdownCoords.left,
            width: dropdownCoords.width,
            zIndex: 9999,
            backgroundColor: "var(--surface)"
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "combobox-dropdown__search-wrapper", children: [
              /* @__PURE__ */ jsx(Search, { className: "combobox-dropdown__search-icon", size: 14 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "combobox-dropdown__search-input",
                  placeholder: searchPlaceholder,
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && allowCustomValue && search.trim()) {
                      onChange(search.trim());
                      setOpen(false);
                    }
                  },
                  autoFocus: true
                }
              )
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "combobox-dropdown__list", role: "listbox", children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("li", { className: "combobox-dropdown__empty", children: emptyText }) : filteredOptions.map((option) => /* @__PURE__ */ jsxs(
              "li",
              {
                role: "option",
                "aria-selected": value === option.value,
                className: `combobox-dropdown__item ${value === option.value ? "combobox-dropdown__item--selected" : ""}`,
                onClick: () => {
                  onChange(option.value);
                  setOpen(false);
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "combobox-dropdown__item-label", children: option.label }),
                  value === option.value && /* @__PURE__ */ jsx(Check, { size: 16, className: "combobox-dropdown__item-check" })
                ]
              },
              option.value
            )) })
          ]
        }
      ),
      document.body
    )
  ] });
}

// components/patterns/bento/BentoCard.tsx
import Link from "next/link";
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PADDING = {
  sm: "var(--compact-padding)",
  md: "var(--card-padding)",
  lg: "var(--card-padding)"
};
function BentoCard({
  children,
  variant = "surface",
  size = "lg",
  span,
  rowSpan,
  href,
  external = false,
  onClick,
  hover = false,
  className = "",
  noPadding = false,
  style
}) {
  const classes = ["bento"];
  if (variant !== "surface") classes.push(`bento-${variant}`);
  if (onClick || href) classes.push("bento-clickable");
  if (hover && !onClick && !href) classes.push("bento-clickable");
  if (className) classes.push(className);
  const computedStyle = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, noPadding ? {} : { padding: PADDING[size] }), span ? { gridColumn: `span ${span}` } : {}), rowSpan === 2 ? { gridRow: "span 2" } : {}), onClick || href ? { cursor: "pointer" } : {}), style);
  const inner = /* @__PURE__ */ jsxs2(Fragment, { children: [
    variant === "brand" && /* @__PURE__ */ jsx2("div", { className: "bento-glow" }),
    /* @__PURE__ */ jsx2("div", { className: "bento-content", children })
  ] });
  if (href) {
    if (external) {
      return /* @__PURE__ */ jsx2("a", { href, target: "_blank", rel: "noopener noreferrer", className: classes.join(" "), style: __spreadProps(__spreadValues({}, computedStyle), { textDecoration: "none" }), children: inner });
    }
    return /* @__PURE__ */ jsx2(Link, { href, className: classes.join(" "), style: __spreadProps(__spreadValues({}, computedStyle), { textDecoration: "none" }), children: inner });
  }
  if (onClick) {
    return /* @__PURE__ */ jsx2(
      "div",
      {
        role: "button",
        tabIndex: 0,
        className: classes.join(" "),
        style: computedStyle,
        onClick,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
        children: inner
      }
    );
  }
  return /* @__PURE__ */ jsx2("div", { className: classes.join(" "), style: computedStyle, children: inner });
}

// components/patterns/bento/BentoGrid.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var GAP = {
  tight: "var(--form-gap)",
  default: "var(--card-gap)",
  loose: "var(--section-gap)"
};
function BentoGrid({
  children,
  cols = "auto",
  gap = "default",
  className = "",
  style
}) {
  const classes = ["bento-grid"];
  if (cols !== "auto") classes.push(`bento-grid-${cols}`);
  if (gap === "tight") classes.push("bento-grid-tight");
  if (gap === "loose") classes.push("bento-grid-loose");
  if (className) classes.push(className);
  const computedStyle = __spreadValues(__spreadValues({}, cols === "auto" ? { gap: GAP[gap] } : {}), style);
  return /* @__PURE__ */ jsx3("div", { className: classes.join(" "), style: computedStyle, children });
}

// components/patterns/Table.tsx
import * as React from "react";

// lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// components/patterns/Table.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var Table = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("div", { className: "w-full overflow-auto", children: /* @__PURE__ */ jsx4("table", __spreadValues({ ref, className: cn("w-full caption-bottom text-sm", className) }, props)) });
});
Table.displayName = "Table";
var TableHeader = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("thead", __spreadValues({ ref, className: cn("[&_tr]:border-b", className) }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("tbody", __spreadValues({ ref, className: cn("[&_tr:last-child]:border-0", className) }, props));
});
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("tfoot", __spreadValues({ ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className) }, props));
});
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("tr", __spreadValues({ ref, className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className) }, props));
});
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("th", __spreadValues({ ref, className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground", className) }, props));
});
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("td", __spreadValues({ ref, className: cn("p-2 align-middle", className) }, props));
});
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx4("caption", __spreadValues({ ref, className: cn("mt-4 text-sm text-muted-foreground", className) }, props));
});
TableCaption.displayName = "TableCaption";

// components/ui/Button.tsx
import * as React2 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urvos-primary focus-visible:ring-offset-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[loading=true]:pointer-events-none relative border border-solid",
  {
    variants: {
      variant: {
        filled: "border-transparent",
        outline: "bg-transparent",
        ghost: "border-transparent bg-transparent",
        text: "border-transparent bg-transparent underline-offset-4 hover:underline",
        tonal: "border-transparent",
        elevated: "border-transparent shadow-md hover:shadow-lg active:shadow-sm active:translate-y-px",
        icon: "border-transparent aspect-square",
        fab: "border-transparent shadow-lg hover:shadow-xl active:shadow-md active:translate-y-px",
        link: "border-transparent bg-transparent underline-offset-4 hover:underline",
        split: "border-transparent",
        toggle: "border-transparent"
      },
      intent: {
        brand: "",
        neutral: "",
        success: "",
        warning: "",
        danger: "",
        info: ""
      },
      size: {
        xs: "h-6 px-2 text-xs gap-1 rounded-sm [&_svg]:size-3",
        sm: "h-8 px-3 text-sm gap-1.5 rounded-md [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm gap-2 rounded-lg [&_svg]:size-4",
        lg: "h-12 px-5 text-base gap-2 rounded-lg [&_svg]:size-[18px]",
        xl: "h-14 px-6 text-lg gap-2.5 rounded-xl [&_svg]:size-5",
        icon: "h-10 w-10 p-0 rounded-lg [&_svg]:size-4",
        "icon-sm": "h-8 w-8 p-0 rounded-md [&_svg]:size-3.5"
      },
      shape: {
        default: "",
        square: "!rounded-none",
        pill: "!rounded-full",
        circle: "!rounded-full aspect-square p-0"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    compoundVariants: [
      { variant: "filled", intent: "brand", className: "bg-urvos-primary text-urvos-text-inverse hover:bg-urvos-primary-hover hover:opacity-90 active:bg-urvos-primary/90" },
      { variant: "outline", intent: "brand", className: "border-urvos-primary text-urvos-primary hover:bg-urvos-primary/10 hover:text-urvos-primary-hover active:bg-urvos-primary/20" },
      { variant: "ghost", intent: "brand", className: "text-urvos-primary hover:bg-urvos-primary/10 active:bg-urvos-primary/20" },
      { variant: "text", intent: "brand", className: "text-urvos-primary hover:text-urvos-primary-hover hover:bg-urvos-primary/5 active:bg-urvos-primary/10" },
      { variant: "tonal", intent: "brand", className: "bg-urvos-primary/10 text-urvos-primary hover:bg-urvos-primary/20 active:bg-urvos-primary/30" },
      { variant: "elevated", intent: "brand", className: "bg-urvos-primary text-urvos-text-inverse shadow-sm hover:shadow-md hover:bg-urvos-primary-hover active:bg-urvos-primary/90" },
      { variant: "fab", intent: "brand", className: "bg-urvos-primary text-urvos-text-inverse hover:bg-urvos-primary-hover active:bg-urvos-primary/90" },
      { variant: "icon", intent: "brand", className: "text-urvos-primary hover:bg-urvos-primary/10 active:bg-urvos-primary/20" },
      { variant: "link", intent: "brand", className: "text-urvos-primary hover:text-urvos-primary-hover active:text-urvos-primary/80" },
      { variant: "filled", intent: "neutral", className: "bg-urvos-ink text-urvos-text-inverse hover:bg-urvos-ink/90 active:bg-urvos-ink/80" },
      { variant: "outline", intent: "neutral", className: "border-urvos-border text-urvos-ink hover:bg-urvos-surface-alt hover:text-urvos-ink-light active:bg-urvos-surface-muted" },
      { variant: "ghost", intent: "neutral", className: "text-urvos-ink hover:bg-urvos-surface-alt active:bg-urvos-surface-muted" },
      { variant: "text", intent: "neutral", className: "text-urvos-ink hover:text-urvos-ink-light hover:bg-urvos-surface-alt/50 active:bg-urvos-surface-muted/50" },
      { variant: "tonal", intent: "neutral", className: "bg-urvos-surface text-urvos-ink hover:bg-urvos-surface-alt active:bg-urvos-surface-muted" },
      { variant: "icon", intent: "neutral", className: "text-urvos-ink hover:bg-urvos-surface-alt active:bg-urvos-surface-muted" },
      { variant: "link", intent: "neutral", className: "text-urvos-ink hover:text-urvos-ink-light active:text-urvos-ink/80" },
      { variant: "filled", intent: "danger", className: "bg-urvos-danger text-urvos-text-inverse hover:bg-urvos-danger/90 hover:opacity-90 active:bg-urvos-danger/80 focus-visible:ring-urvos-danger" },
      { variant: "outline", intent: "danger", className: "border-urvos-danger text-urvos-danger hover:bg-urvos-danger/10 hover:text-urvos-danger active:bg-urvos-danger/20 focus-visible:ring-urvos-danger" },
      { variant: "ghost", intent: "danger", className: "text-urvos-danger hover:bg-urvos-danger/10 active:bg-urvos-danger/20 focus-visible:ring-urvos-danger" },
      { variant: "text", intent: "danger", className: "text-urvos-danger hover:text-urvos-danger/80 hover:bg-urvos-danger/5 active:bg-urvos-danger/10 focus-visible:ring-urvos-danger" },
      { variant: "tonal", intent: "danger", className: "bg-urvos-danger/10 text-urvos-danger hover:bg-urvos-danger/20 active:bg-urvos-danger/30 focus-visible:ring-urvos-danger" },
      { variant: "filled", intent: "success", className: "bg-urvos-success text-urvos-text-inverse hover:bg-urvos-success/90 hover:opacity-90 active:bg-urvos-success/80 focus-visible:ring-urvos-success" },
      { variant: "outline", intent: "success", className: "border-urvos-success text-urvos-success hover:bg-urvos-success/10 hover:text-urvos-success active:bg-urvos-success/20 focus-visible:ring-urvos-success" },
      { variant: "ghost", intent: "success", className: "text-urvos-success hover:bg-urvos-success/10 active:bg-urvos-success/20 focus-visible:ring-urvos-success" },
      { variant: "text", intent: "success", className: "text-urvos-success hover:text-urvos-success/80 hover:bg-urvos-success/5 active:bg-urvos-success/10 focus-visible:ring-urvos-success" },
      { variant: "tonal", intent: "success", className: "bg-urvos-success/10 text-urvos-success hover:bg-urvos-success/20 active:bg-urvos-success/30 focus-visible:ring-urvos-success" },
      { variant: "filled", intent: "warning", className: "bg-urvos-warning text-urvos-text-inverse hover:bg-urvos-warning/90 hover:opacity-90 active:bg-urvos-warning/80 focus-visible:ring-urvos-warning" },
      { variant: "filled", intent: "info", className: "bg-urvos-info text-urvos-text-inverse hover:bg-urvos-info/90 hover:opacity-90 active:bg-urvos-info/80 focus-visible:ring-urvos-info" }
    ],
    defaultVariants: {
      variant: "filled",
      intent: "brand",
      size: "md",
      shape: "default",
      fullWidth: false
    }
  }
);
var Button = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, intent, size, shape, fullWidth, loading, icon, iconLeft, iconRight, asChild = false, children, analyticsId, disabled } = _b, props = __objRest(_b, ["className", "variant", "intent", "size", "shape", "fullWidth", "loading", "icon", "iconLeft", "iconRight", "asChild", "children", "analyticsId", "disabled"]);
    const Comp = asChild ? Slot : "button";
    const leftIcon = iconLeft != null ? iconLeft : icon;
    const normalizedVariant = variant === "primary" ? "filled" : variant === "secondary" ? "outline" : variant;
    const normalizedIntent = variant === "primary" ? "brand" : variant === "secondary" ? "neutral" : intent;
    const ariaProps = {
      "aria-busy": loading ? true : void 0,
      "aria-disabled": disabled || loading ? true : void 0,
      "data-disabled": disabled ? true : void 0,
      "data-loading": loading ? true : void 0
    };
    const handleClick = (e) => {
      var _a2;
      if (disabled || loading) {
        e.preventDefault();
        return;
      }
      (_a2 = props.onClick) == null ? void 0 : _a2.call(props, e);
    };
    if (asChild) {
      return /* @__PURE__ */ jsx5(
        Slot,
        __spreadProps(__spreadValues(__spreadValues({
          className: cn(buttonVariants({ variant: normalizedVariant, intent: normalizedIntent, size, shape, fullWidth, className })),
          ref
        }, ariaProps), props), {
          children
        })
      );
    }
    return /* @__PURE__ */ jsxs3(
      Comp,
      __spreadProps(__spreadValues(__spreadValues({
        className: cn(buttonVariants({ variant: normalizedVariant, intent: normalizedIntent, size, shape, fullWidth, className })),
        ref,
        disabled,
        "data-analytics-id": analyticsId
      }, ariaProps), props), {
        onClick: handleClick,
        children: [
          loading && /* @__PURE__ */ jsx5("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx5(Loader2, { className: "animate-spin", style: { width: "1em", height: "1em" } }) }),
          /* @__PURE__ */ jsxs3("div", { className: cn("inline-flex items-center justify-center gap-inherit", loading && "text-transparent [&_svg]:opacity-0"), children: [
            !loading && leftIcon && /* @__PURE__ */ jsx5("span", { className: "inline-flex shrink-0", children: leftIcon }),
            /* @__PURE__ */ jsx5("span", { className: "truncate", children }),
            !loading && iconRight && /* @__PURE__ */ jsx5("span", { className: "inline-flex shrink-0", children: iconRight })
          ] })
        ]
      })
    );
  }
);
Button.displayName = "Button";

// components/ui/Form.tsx
import { clsx as clsx2 } from "clsx";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function Field({
  label,
  help,
  error,
  children,
  htmlFor
}) {
  return /* @__PURE__ */ jsxs4("div", { className: "field", children: [
    label && /* @__PURE__ */ jsx6("label", { className: "field__label", htmlFor, children: label }),
    children,
    error ? /* @__PURE__ */ jsxs4("div", { className: "field__error", role: "alert", children: [
      "\u26A0 ",
      error
    ] }) : help ? /* @__PURE__ */ jsx6("div", { className: "field__help", children: help }) : null
  ] });
}
function Input(_a) {
  var _b = _a, { error, className = "" } = _b, rest = __objRest(_b, ["error", "className"]);
  return /* @__PURE__ */ jsx6("input", __spreadValues({ className: clsx2("input", className), "data-state": error ? "error" : void 0 }, rest));
}

// components/ui/Select.tsx
import { forwardRef as forwardRef3 } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check2, ChevronDown as ChevronDown2, ChevronUp } from "lucide-react";
import { cva as cva3 } from "class-variance-authority";
import { clsx as clsx3 } from "clsx";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var selectTriggerVariants = cva3(
  "flex h-10 w-full items-center justify-between rounded-md border border-urvos-border bg-urvos-surface px-3 py-2 text-sm ring-offset-urvos-background placeholder:text-urvos-text-subtle focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      state: {
        default: "",
        error: "border-urvos-danger focus:ring-urvos-danger"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = forwardRef3((_a, ref) => {
  var _b = _a, { className, children, state, error } = _b, props = __objRest(_b, ["className", "children", "state", "error"]);
  const currentState = error ? "error" : state;
  return /* @__PURE__ */ jsxs5(
    SelectPrimitive.Trigger,
    __spreadProps(__spreadValues({
      ref,
      className: clsx3(selectTriggerVariants({ state: currentState }), className)
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsx7(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx7(ChevronDown2, { className: "h-4 w-4 opacity-50" }) })
      ]
    })
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = forwardRef3((_a, ref) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ jsx7(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs5(
    SelectPrimitive.Content,
    __spreadProps(__spreadValues({
      ref,
      className: clsx3(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-urvos-border bg-urvos-surface text-urvos-text shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position
    }, props), {
      children: [
        /* @__PURE__ */ jsx7(SelectPrimitive.ScrollUpButton, { className: "flex cursor-default items-center justify-center py-1", children: /* @__PURE__ */ jsx7(ChevronUp, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx7(
          SelectPrimitive.Viewport,
          {
            className: clsx3(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx7(SelectPrimitive.ScrollDownButton, { className: "flex cursor-default items-center justify-center py-1", children: /* @__PURE__ */ jsx7(ChevronDown2, { className: "h-4 w-4" }) })
      ]
    })
  ) });
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = forwardRef3((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx7(
    SelectPrimitive.Label,
    __spreadValues({
      ref,
      className: clsx3("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
    }, props)
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = forwardRef3((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs5(
    SelectPrimitive.Item,
    __spreadProps(__spreadValues({
      ref,
      className: clsx3(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-urvos-surface-muted focus:text-urvos-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsx7("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx7(Check2, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx7(SelectPrimitive.ItemText, { children })
      ]
    })
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = forwardRef3((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx7(
    SelectPrimitive.Separator,
    __spreadValues({
      ref,
      className: clsx3("-mx-1 my-1 h-px bg-urvos-border", className)
    }, props)
  );
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// components/ui/Textarea.tsx
import { forwardRef as forwardRef4 } from "react";
import { cva as cva4 } from "class-variance-authority";
import { clsx as clsx4 } from "clsx";
import { jsx as jsx8 } from "react/jsx-runtime";
var textareaVariants = cva4("textarea", {
  variants: {
    state: {
      default: "",
      error: "textarea--error"
    }
  },
  defaultVariants: {
    state: "default"
  }
});
var Textarea = forwardRef4(
  (_a, ref) => {
    var _b = _a, { className, state, error } = _b, props = __objRest(_b, ["className", "state", "error"]);
    const currentState = error ? "error" : state;
    return /* @__PURE__ */ jsx8(
      "textarea",
      __spreadValues({
        className: clsx4(textareaVariants({ state: currentState }), className),
        ref
      }, props)
    );
  }
);
Textarea.displayName = "Textarea";

// components/ui/Switch.tsx
import { forwardRef as forwardRef5 } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva as cva5 } from "class-variance-authority";
import { clsx as clsx5 } from "clsx";
import { jsx as jsx9 } from "react/jsx-runtime";
var switchVariants = cva5("switch", {
  variants: {
    size: {
      sm: "switch--sm",
      md: "switch--md",
      lg: "switch--lg"
    },
    state: {
      default: "",
      error: "switch--error"
    }
  },
  defaultVariants: {
    size: "md",
    state: "default"
  }
});
var Switch = forwardRef5(
  (_a, ref) => {
    var _b = _a, { className, size, state, error } = _b, props = __objRest(_b, ["className", "size", "state", "error"]);
    const currentState = error ? "error" : state;
    return /* @__PURE__ */ jsx9(
      SwitchPrimitive.Root,
      __spreadProps(__spreadValues({
        className: clsx5(switchVariants({ size, state: currentState }), className)
      }, props), {
        ref,
        children: /* @__PURE__ */ jsx9(SwitchPrimitive.Thumb, { className: "switch-thumb" })
      })
    );
  }
);
Switch.displayName = SwitchPrimitive.Root.displayName;

// components/ui/Checkbox.tsx
import { forwardRef as forwardRef6, useId, useEffect as useEffect2, useRef as useRef2 } from "react";
import { cva as cva6 } from "class-variance-authority";
import { clsx as clsx6 } from "clsx";
import { Check as Check3, Minus } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var checkboxVariants = cva6("checkbox", {
  variants: {
    size: {
      sm: "checkbox--sm",
      md: "checkbox--md",
      lg: "checkbox--lg"
    },
    state: {
      default: "",
      error: "checkbox--error",
      success: "checkbox--success"
    }
  },
  defaultVariants: {
    size: "md",
    state: "default"
  }
});
var Checkbox = forwardRef6(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      state = "default",
      label,
      error,
      helper,
      indeterminate = false,
      required = false,
      disabled = false,
      checked,
      defaultChecked,
      clinicalSignificance,
      fhirObservationCode,
      id,
      onChange
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "state",
      "label",
      "error",
      "helper",
      "indeterminate",
      "required",
      "disabled",
      "checked",
      "defaultChecked",
      "clinicalSignificance",
      "fhirObservationCode",
      "id",
      "onChange"
    ]);
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;
    const inputRef = useRef2(null);
    useEffect2(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    const setRefs = (element) => {
      if (typeof ref === "function") ref(element);
      else if (ref) {
        ref.current = element;
      }
      inputRef.current = element;
    };
    const handleChange = (e) => {
      if (indeterminate) {
        if (inputRef.current) {
          inputRef.current.indeterminate = false;
        }
        const syntheticEvent = __spreadProps(__spreadValues({}, e), {
          target: __spreadProps(__spreadValues({}, e.target), {
            checked: true
          })
        });
        onChange == null ? void 0 : onChange(syntheticEvent);
        return;
      }
      onChange == null ? void 0 : onChange(e);
    };
    return /* @__PURE__ */ jsxs6("div", { className: clsx6("checkbox-wrapper", className), children: [
      /* @__PURE__ */ jsxs6("div", { className: clsx6("checkbox-container", `checkbox-container--${size}`), children: [
        /* @__PURE__ */ jsxs6("div", { className: "checkbox-input-wrapper", children: [
          /* @__PURE__ */ jsx10(
            "input",
            __spreadValues({
              ref: setRefs,
              id: checkboxId,
              type: "checkbox",
              className: clsx6(
                checkboxVariants({ size, state: currentState }),
                "checkbox-input",
                disabled && "checkbox--disabled",
                clinicalSignificance && `checkbox--${clinicalSignificance}`
              ),
              disabled,
              required,
              checked,
              defaultChecked,
              "aria-invalid": hasError,
              "aria-describedby": error ? `${checkboxId}-error` : helper ? `${checkboxId}-helper` : void 0,
              "aria-label": !label ? props["aria-label"] || "Checkbox" : void 0,
              onChange: handleChange
            }, props)
          ),
          indeterminate ? /* @__PURE__ */ jsx10(
            Minus,
            {
              className: clsx6(
                "checkbox-indicator",
                "checkbox-indicator--minus",
                checked && "checkbox-indicator--checked"
              ),
              "aria-hidden": "true"
            }
          ) : /* @__PURE__ */ jsx10(
            Check3,
            {
              className: clsx6(
                "checkbox-indicator",
                "checkbox-indicator--check",
                checked && "checkbox-indicator--checked"
              ),
              "aria-hidden": "true"
            }
          )
        ] }),
        label && /* @__PURE__ */ jsxs6(
          "label",
          {
            htmlFor: checkboxId,
            className: clsx6(
              "checkbox-label",
              disabled && "checkbox-label--disabled",
              clinicalSignificance && `checkbox-label--${clinicalSignificance}`
            ),
            children: [
              label,
              required && /* @__PURE__ */ jsx10("span", { className: "checkbox-required", "aria-hidden": "true", children: "*" })
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx10("div", { id: `${checkboxId}-error`, className: "checkbox-error", role: "alert", children: error }),
      helper && !error && /* @__PURE__ */ jsx10("div", { id: `${checkboxId}-helper`, className: "checkbox-helper", children: helper }),
      fhirObservationCode && /* @__PURE__ */ jsx10("input", { type: "hidden", "data-fhir-code": fhirObservationCode })
    ] });
  }
);
Checkbox.displayName = "Checkbox";

// components/ui/RadioGroup.tsx
import { forwardRef as forwardRef7, useId as useId2 } from "react";
import { cva as cva7 } from "class-variance-authority";
import { clsx as clsx7 } from "clsx";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var radioVariants = cva7("radio", {
  variants: {
    size: {
      sm: "radio--sm",
      md: "radio--md",
      lg: "radio--lg"
    },
    state: {
      default: "",
      error: "radio--error",
      success: "radio--success"
    }
  },
  defaultVariants: {
    size: "md",
    state: "default"
  }
});
var Radio = forwardRef7(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      state = "default",
      label,
      disabled = false,
      required = false,
      clinicalSignificance,
      fhirObservationCode,
      id
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "state",
      "label",
      "disabled",
      "required",
      "clinicalSignificance",
      "fhirObservationCode",
      "id"
    ]);
    const generatedId = useId2();
    const radioId = id || generatedId;
    const currentState = state;
    return /* @__PURE__ */ jsxs7("div", { className: clsx7("radio-container", `radio-container--${size}`, className), children: [
      /* @__PURE__ */ jsxs7("div", { className: "radio-input-wrapper", children: [
        /* @__PURE__ */ jsx11(
          "input",
          __spreadValues({
            ref,
            id: radioId,
            type: "radio",
            className: clsx7(
              radioVariants({ size, state: currentState }),
              "radio-input",
              disabled && "radio--disabled",
              clinicalSignificance && `radio--${clinicalSignificance}`
            ),
            disabled,
            required,
            "aria-label": !label ? props["aria-label"] || "Radio" : void 0
          }, props)
        ),
        /* @__PURE__ */ jsx11("div", { className: "radio-indicator", "aria-hidden": "true" })
      ] }),
      label && /* @__PURE__ */ jsx11(
        "label",
        {
          htmlFor: radioId,
          className: clsx7(
            "radio-label",
            disabled && "radio-label--disabled",
            clinicalSignificance && `radio-label--${clinicalSignificance}`
          ),
          children: label
        }
      ),
      fhirObservationCode && /* @__PURE__ */ jsx11("input", { type: "hidden", "data-fhir-code": fhirObservationCode })
    ] });
  }
);
Radio.displayName = "Radio";
var RadioGroup = forwardRef7(
  (_a, ref) => {
    var _b = _a, {
      className,
      label,
      error,
      helper,
      orientation = "vertical",
      required = false,
      children
    } = _b, props = __objRest(_b, [
      "className",
      "label",
      "error",
      "helper",
      "orientation",
      "required",
      "children"
    ]);
    const hasError = !!error;
    return /* @__PURE__ */ jsxs7(
      "fieldset",
      __spreadProps(__spreadValues({
        ref,
        className: clsx7("radio-group", className),
        "aria-invalid": hasError
      }, props), {
        children: [
          label && /* @__PURE__ */ jsxs7("legend", { className: "radio-group-label", children: [
            label,
            required && /* @__PURE__ */ jsx11("span", { className: "radio-group-required", "aria-hidden": "true", children: "*" })
          ] }),
          /* @__PURE__ */ jsx11("div", { className: clsx7("radio-group-items", `radio-group-items--${orientation}`), children }),
          error && /* @__PURE__ */ jsx11("div", { className: "radio-group-error", role: "alert", children: error }),
          helper && !error && /* @__PURE__ */ jsx11("div", { className: "radio-group-helper", children: helper })
        ]
      })
    );
  }
);
var RadioCard = forwardRef7(
  (_a, ref) => {
    var _b = _a, { className, label, description, id, checked } = _b, props = __objRest(_b, ["className", "label", "description", "id", "checked"]);
    const generatedId = useId2();
    const radioId = id || generatedId;
    return /* @__PURE__ */ jsxs7(
      "label",
      {
        htmlFor: radioId,
        className: clsx7(
          "flex cursor-pointer items-start gap-3 rounded-lg border border-urvos-border p-4 transition-all hover:bg-urvos-surface-muted data-[checked=true]:border-urvos-primary data-[checked=true]:bg-urvos-primary/5",
          className
        ),
        "data-checked": checked,
        children: [
          /* @__PURE__ */ jsx11(Radio, __spreadValues({ ref, id: radioId, checked }, props)),
          /* @__PURE__ */ jsxs7("div", { className: "flex flex-col", children: [
            label && /* @__PURE__ */ jsx11("span", { className: "font-semibold text-sm text-urvos-text", children: label }),
            description && /* @__PURE__ */ jsx11("span", { className: "text-xs text-urvos-text-subtle mt-0.5", children: description })
          ] })
        ]
      }
    );
  }
);
RadioCard.displayName = "RadioCard";

// components/ui/MultiSelect.tsx
import * as React8 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check as Check4, ChevronsUpDown, X } from "lucide-react";
import { clsx as clsx8 } from "clsx";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  error
}) {
  const [open, setOpen] = React8.useState(false);
  const handleUnselect = (item) => {
    onChange(selected.filter((i) => i !== item));
  };
  return /* @__PURE__ */ jsxs8(PopoverPrimitive.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx12(PopoverPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs8(
      "button",
      {
        role: "combobox",
        "aria-expanded": open,
        className: clsx8(
          "flex min-h-[40px] w-full items-center justify-between rounded-md border border-urvos-border bg-urvos-surface px-3 py-1.5 text-sm ring-offset-urvos-background placeholder:text-urvos-text-subtle focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-urvos-danger focus:ring-urvos-danger",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex flex-wrap gap-1", children: [
            selected.length === 0 && /* @__PURE__ */ jsx12("span", { className: "text-urvos-text-subtle py-0.5", children: placeholder }),
            selected.map((item) => {
              const option = options.find((o) => o.value === item);
              return /* @__PURE__ */ jsxs8("span", { className: "inline-flex items-center gap-1 rounded-md bg-urvos-surface-muted px-2 py-0.5 text-xs font-medium text-urvos-text", children: [
                option == null ? void 0 : option.label,
                /* @__PURE__ */ jsx12(
                  "div",
                  {
                    className: "cursor-pointer rounded-full p-0.5 hover:bg-urvos-border hover:text-urvos-danger",
                    onKeyDown: (e) => {
                      if (e.key === "Enter") handleUnselect(item);
                    },
                    onMouseDown: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    },
                    onClick: () => handleUnselect(item),
                    children: /* @__PURE__ */ jsx12(X, { className: "h-3 w-3" })
                  }
                )
              ] }, item);
            })
          ] }),
          /* @__PURE__ */ jsx12(ChevronsUpDown, { className: "h-4 w-4 opacity-50 shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx12(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx12(
      PopoverPrimitive.Content,
      {
        align: "start",
        sideOffset: 4,
        className: "relative z-50 w-full min-w-[200px] overflow-hidden rounded-md border border-urvos-border bg-urvos-surface text-urvos-text shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        children: /* @__PURE__ */ jsxs8(CommandPrimitive, { className: "flex h-full w-full flex-col overflow-hidden bg-urvos-surface text-urvos-text", children: [
          /* @__PURE__ */ jsx12("div", { className: "flex items-center border-b border-urvos-border px-3", children: /* @__PURE__ */ jsx12(
            CommandPrimitive.Input,
            {
              placeholder: "Search...",
              className: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-urvos-text-subtle disabled:cursor-not-allowed disabled:opacity-50"
            }
          ) }),
          /* @__PURE__ */ jsxs8(CommandPrimitive.List, { className: "max-h-60 overflow-y-auto overflow-x-hidden p-1", children: [
            /* @__PURE__ */ jsx12(CommandPrimitive.Empty, { className: "py-6 text-center text-sm text-urvos-text-subtle", children: "No results found." }),
            /* @__PURE__ */ jsx12(CommandPrimitive.Group, { children: options.map((option) => {
              const isSelected = selected.includes(option.value);
              return /* @__PURE__ */ jsxs8(
                CommandPrimitive.Item,
                {
                  value: option.value,
                  onSelect: () => {
                    onChange(
                      isSelected ? selected.filter((item) => item !== option.value) : [...selected, option.value]
                    );
                    setOpen(true);
                  },
                  className: clsx8(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-urvos-surface-muted aria-selected:text-urvos-text data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                  ),
                  children: [
                    /* @__PURE__ */ jsx12("div", { className: clsx8(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-urvos-border",
                      isSelected ? "bg-urvos-primary text-urvos-primary-foreground border-urvos-primary" : "bg-transparent"
                    ), children: isSelected && /* @__PURE__ */ jsx12(Check4, { className: "h-3 w-3" }) }),
                    option.label
                  ]
                },
                option.value
              );
            }) })
          ] })
        ] })
      }
    ) })
  ] });
}

// components/ui/Autocomplete.tsx
import * as React9 from "react";
import * as PopoverPrimitive2 from "@radix-ui/react-popover";
import { Command as CommandPrimitive2 } from "cmdk";
import { Check as Check5, ChevronsUpDown as ChevronsUpDown2 } from "lucide-react";
import { clsx as clsx9 } from "clsx";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  className,
  error
}) {
  const [open, setOpen] = React9.useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  return /* @__PURE__ */ jsxs9(PopoverPrimitive2.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx13(PopoverPrimitive2.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs9(
      "button",
      {
        role: "combobox",
        "aria-expanded": open,
        className: clsx9(
          "combobox",
          error && "combobox--error",
          className
        ),
        children: [
          /* @__PURE__ */ jsx13("span", { className: clsx9("combobox__label", !selectedOption && "text-opacity-50"), children: selectedOption ? selectedOption.label : placeholder }),
          /* @__PURE__ */ jsx13(ChevronsUpDown2, { className: "combobox__icon select-icon" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx13(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx13(
      PopoverPrimitive2.Content,
      {
        align: "start",
        sideOffset: 4,
        className: "select-content",
        style: { width: "var(--radix-popover-trigger-width)" },
        children: /* @__PURE__ */ jsxs9(CommandPrimitive2, { className: "combobox-dropdown", children: [
          /* @__PURE__ */ jsx13("div", { className: "combobox-dropdown__search-wrapper", children: /* @__PURE__ */ jsx13(
            CommandPrimitive2.Input,
            {
              placeholder: "Search...",
              className: "combobox-dropdown__search-input"
            }
          ) }),
          /* @__PURE__ */ jsxs9(CommandPrimitive2.List, { className: "combobox-dropdown__list", children: [
            /* @__PURE__ */ jsx13(CommandPrimitive2.Empty, { className: "combobox-dropdown__empty", children: "No results found." }),
            /* @__PURE__ */ jsx13(CommandPrimitive2.Group, { children: options.map((option) => {
              const isSelected = value === option.value;
              return /* @__PURE__ */ jsxs9(
                CommandPrimitive2.Item,
                {
                  value: option.value,
                  onSelect: () => {
                    onChange(option.value);
                    setOpen(false);
                  },
                  className: clsx9(
                    "combobox-dropdown__item",
                    isSelected && "combobox-dropdown__item--selected"
                  ),
                  children: [
                    option.label,
                    isSelected && /* @__PURE__ */ jsx13(Check5, { className: "combobox-dropdown__item-check select-icon" })
                  ]
                },
                option.value
              );
            }) })
          ] })
        ] })
      }
    ) })
  ] });
}

// components/ui/FileUpload.tsx
import { forwardRef as forwardRef8, useRef as useRef3, useState as useState4 } from "react";
import { UploadCloud, X as X2, File as FileIcon } from "lucide-react";
import { clsx as clsx10 } from "clsx";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var FileUpload = forwardRef8(
  (_a, ref) => {
    var _b = _a, {
      label,
      error,
      onFilesChange,
      maxFiles = 1,
      maxSizeMB = 5,
      className,
      onChange
    } = _b, props = __objRest(_b, [
      "label",
      "error",
      "onFilesChange",
      "maxFiles",
      "maxSizeMB",
      "className",
      "onChange"
    ]);
    const [dragActive, setDragActive] = useState4(false);
    const [selectedFiles, setSelectedFiles] = useState4([]);
    const inputRef = useRef3(null);
    const handleFiles = (files) => {
      let newFiles = Array.from(files);
      if (maxFiles === 1) {
        newFiles = [newFiles[0]];
      } else {
        newFiles = [...selectedFiles, ...newFiles].slice(0, maxFiles);
      }
      const validFiles = newFiles.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
      setSelectedFiles(validFiles);
      if (onFilesChange) onFilesChange(validFiles);
    };
    const handleChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
      if (onChange) onChange(e);
    };
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };
    const removeFile = (index) => {
      const updated = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updated);
      if (onFilesChange) onFilesChange(updated);
    };
    return /* @__PURE__ */ jsxs10("div", { className: clsx10("field", className), children: [
      label && /* @__PURE__ */ jsx14("label", { className: "field__label", children: label }),
      /* @__PURE__ */ jsxs10(
        "div",
        {
          className: clsx10(
            "file-upload",
            dragActive && "file-upload--active",
            error && "file-upload--error"
          ),
          onDragEnter: handleDrag,
          onDragLeave: handleDrag,
          onDragOver: handleDrag,
          onDrop: handleDrop,
          onClick: () => {
            var _a2;
            return (_a2 = inputRef.current) == null ? void 0 : _a2.click();
          },
          children: [
            /* @__PURE__ */ jsx14(
              "input",
              __spreadValues({
                ref: (e) => {
                  inputRef.current = e;
                  if (typeof ref === "function") ref(e);
                  else if (ref) ref.current = e;
                },
                type: "file",
                className: "hidden",
                onChange: handleChange,
                multiple: maxFiles > 1
              }, props)
            ),
            /* @__PURE__ */ jsx14(UploadCloud, { className: "file-upload__icon" }),
            /* @__PURE__ */ jsxs10("p", { className: "file-upload__text", children: [
              "Drag & drop files or ",
              /* @__PURE__ */ jsx14("span", { className: "file-upload__browse", children: "browse" })
            ] }),
            /* @__PURE__ */ jsxs10("p", { className: "file-upload__hint", children: [
              "Max ",
              maxSizeMB,
              "MB ",
              maxFiles > 1 ? `(up to ${maxFiles} files)` : ""
            ] })
          ]
        }
      ),
      selectedFiles.length > 0 && /* @__PURE__ */ jsx14("div", { className: "file-upload__list", children: selectedFiles.map((file, i) => /* @__PURE__ */ jsxs10("div", { className: "file-upload__item", children: [
        /* @__PURE__ */ jsx14(FileIcon, { className: "w-4 h-4 text-urvos-ink/60" }),
        /* @__PURE__ */ jsx14("span", { className: "file-upload__filename", children: file.name }),
        /* @__PURE__ */ jsx14(
          "button",
          {
            type: "button",
            className: "file-upload__remove",
            onClick: (e) => {
              e.stopPropagation();
              removeFile(i);
            },
            children: /* @__PURE__ */ jsx14(X2, { className: "w-3 h-3" })
          }
        )
      ] }, `${file.name}-${i}`)) }),
      error && /* @__PURE__ */ jsxs10("div", { className: "field__error", children: [
        "\u26A0 ",
        error
      ] })
    ] });
  }
);
FileUpload.displayName = "FileUpload";

// components/ui/Badge.tsx
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
function Badge({ variant = "neutral", icon, onRemove, children }) {
  const variantClass = variant === "danger" ? "badge--critical" : variant === "warning" ? "badge--caution" : `badge--${variant}`;
  return /* @__PURE__ */ jsxs11("span", { className: `badge ${variantClass}`, children: [
    icon != null ? icon : /* @__PURE__ */ jsx15("span", { className: "badge__dot", "aria-hidden": "true" }),
    children,
    onRemove && /* @__PURE__ */ jsx15(
      "span",
      {
        className: "badge__remove",
        role: "button",
        tabIndex: 0,
        "aria-label": "Remove",
        onClick: onRemove,
        onKeyDown: (e) => e.key === "Enter" && onRemove(),
        children: "\u2715"
      }
    )
  ] });
}

// components/ui/Card.tsx
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
function Card(_a) {
  var _b = _a, { variant = "default", header, footer, children, className = "" } = _b, rest = __objRest(_b, ["variant", "header", "footer", "children", "className"]);
  const variantClass = variant === "default" ? "" : `card--${variant}`;
  return /* @__PURE__ */ jsxs12(
    "div",
    __spreadProps(__spreadValues({
      className: `card ${variantClass} ${className}`,
      role: variant === "clickable" ? "button" : void 0,
      tabIndex: variant === "clickable" ? 0 : void 0
    }, rest), {
      children: [
        header && /* @__PURE__ */ jsx16("div", { className: "card__header", children: header }),
        children,
        footer && /* @__PURE__ */ jsx16("div", { className: "card__footer", children: footer })
      ]
    })
  );
}
function CardHeader(_a) {
  var _b = _a, { className = "", children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx16("div", __spreadProps(__spreadValues({ className: `card__header ${className}` }, props), { children }));
}
function CardTitle(_a) {
  var _b = _a, { className = "", children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx16("h3", __spreadProps(__spreadValues({ className: `card__title ${className}` }, props), { children }));
}
function CardDescription(_a) {
  var _b = _a, { className = "", children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx16("p", __spreadProps(__spreadValues({ className: `card__description ${className}` }, props), { children }));
}
function CardContent(_a) {
  var _b = _a, { className = "", children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx16("div", __spreadProps(__spreadValues({ className: `card__content ${className}` }, props), { children }));
}
function CardFooter(_a) {
  var _b = _a, { className = "", children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsx16("div", __spreadProps(__spreadValues({ className: `card__footer ${className}` }, props), { children }));
}

// components/ui/Modal.tsx
import * as React34 from "react";

// node_modules/@radix-ui/react-dialog/dist/index.mjs
import * as React33 from "react";

// node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return /* @__PURE__ */ __name(function handleEvent(event) {
    originalEventHandler == null ? void 0 : originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
      return ourEventHandler == null ? void 0 : ourEventHandler(event);
    }
  }, "handleEvent");
}
__name(composeEventHandlers, "composeEventHandlers");
function getOwnerWindow(element) {
  var _a, _b;
  if (!canUseDOM) {
    throw new Error("Cannot access window outside of the DOM");
  }
  return (_b = (_a = element == null ? void 0 : element.ownerDocument) == null ? void 0 : _a.defaultView) != null ? _b : window;
}
__name(getOwnerWindow, "getOwnerWindow");
function getOwnerDocument(element) {
  var _a;
  if (!canUseDOM) {
    throw new Error("Cannot access document outside of the DOM");
  }
  return (_a = element == null ? void 0 : element.ownerDocument) != null ? _a : document;
}
__name(getOwnerDocument, "getOwnerDocument");
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getOwnerDocument(node);
  if (!(activeElement == null ? void 0 : activeElement.nodeName)) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getOwnerDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
__name(getActiveElement, "getActiveElement");
function isFrame(element) {
  return element.tagName === "IFRAME";
}
__name(isFrame, "isFrame");

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React11 from "react";
var __defProp3 = Object.defineProperty;
var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name2(setRef, "setRef");
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
__name2(composeRefs, "composeRefs");
function useComposedRefs(...refs) {
  return React11.useCallback(composeRefs(...refs), refs);
}
__name2(useComposedRefs, "useComposedRefs");

// node_modules/@radix-ui/react-context/dist/index.mjs
import * as React12 from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var __defProp4 = Object.defineProperty;
var __name3 = (target, value) => __defProp4(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createContext2(rootComponentName, defaultContext) {
  const Context = React12.createContext(defaultContext);
  Context.displayName = rootComponentName + "Context";
  const Provider3 = /* @__PURE__ */ __name3((props) => {
    const _a = props, { children } = _a, context = __objRest(_a, ["children"]);
    const value = React12.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsx17(Context.Provider, { value, children });
  }, "Provider");
  Provider3.displayName = rootComponentName + "Provider";
  function useContext22(consumerName, options = {}) {
    const { optional = false } = options;
    const context = React12.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    if (optional) return void 0;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  __name3(useContext22, "useContext");
  return [Provider3, useContext22];
}
__name3(createContext2, "createContext");
// @__NO_SIDE_EFFECTS__
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = React12.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider3 = /* @__PURE__ */ __name3((props) => {
      var _b;
      const _a = props, { scope, children } = _a, context = __objRest(_a, ["scope", "children"]);
      const Context = ((_b = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _b[index]) || BaseContext;
      const value = React12.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx17(Context.Provider, { value, children });
    }, "Provider");
    Provider3.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope, options = {}) {
      var _a;
      const { optional = false } = options;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = React12.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      if (optional) return void 0;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    __name3(useContext22, "useContext");
    return [Provider3, useContext22];
  }
  __name3(createContext32, "createContext");
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React12.createContext(defaultContext);
    });
    return /* @__PURE__ */ __name3(function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return React12.useMemo(
        () => ({ [`__scope${scopeName}`]: __spreadProps(__spreadValues({}, scope), { [scopeName]: contexts }) }),
        [scope, contexts]
      );
    }, "useScope");
  }, "createScope");
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
__name3(createContextScope, "createContextScope");
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return /* @__PURE__ */ __name3(function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return __spreadValues(__spreadValues({}, nextScopes2), currentScope);
      }, {});
      return React12.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    }, "useComposedScopes");
  }, "createScope");
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
__name3(composeContextScopes, "composeContextScopes");

// node_modules/@radix-ui/react-id/dist/index.mjs
import * as React14 from "react";

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as React13 from "react";
var useLayoutEffect2 = (globalThis == null ? void 0 : globalThis.document) ? React13.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-id/dist/index.mjs
var __defProp5 = Object.defineProperty;
var __name4 = (target, value) => __defProp5(target, "name", { value, configurable: true });
var useReactId = React14[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId3(deterministicId) {
  const [id, setId] = React14.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId != null ? reactId : String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
__name4(useId3, "useId");

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React16 from "react";

// node_modules/@radix-ui/primitive/dist/internal/is-development.false.mjs
var IS_DEVELOPMENT = false;

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React22 from "react";

// node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
import * as React15 from "react";
var __defProp6 = Object.defineProperty;
var __name5 = (target, value) => __defProp6(target, "name", { value, configurable: true });
var useReactEffectEvent = React15[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = React15[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = React15.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      ref.current = callback;
    });
  }
  return React15.useMemo(() => ((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }), []);
}
__name5(useEffectEvent, "useEffectEvent");

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var __defProp7 = Object.defineProperty;
var __name6 = (target, value) => __defProp7(target, "name", { value, configurable: true });
var useInsertionEffect = React16[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = /* @__PURE__ */ __name6(() => {
  }, "onChange"),
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  if (IS_DEVELOPMENT) {
    const isControlledRef = React16.useRef(prop !== void 0);
    React16.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = React16.useCallback(
    (nextValue) => {
      var _a;
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
__name6(useControllableState, "useControllableState");
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = React16.useState(defaultProp);
  const prevValueRef = React16.useRef(value);
  const onChangeRef = React16.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React16.useEffect(() => {
    var _a;
    if (prevValueRef.current !== value) {
      (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
__name6(useUncontrolledState, "useUncontrolledState");
function isFunction(value) {
  return typeof value === "function";
}
__name6(isFunction, "isFunction");
var SYNC_STATE = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
  const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
  const isControlled = controlledState !== void 0;
  const onChange = useEffectEvent(onChangeProp);
  if (IS_DEVELOPMENT) {
    const isControlledRef = React22.useRef(controlledState !== void 0);
    React22.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const args = [__spreadProps(__spreadValues({}, initialArg), { state: defaultProp })];
  if (init) {
    args.push(init);
  }
  const [internalState, dispatch] = React22.useReducer(
    (state2, action) => {
      if (action.type === SYNC_STATE) {
        return __spreadProps(__spreadValues({}, state2), { state: action.state });
      }
      const next = reducer(state2, action);
      if (isControlled && !Object.is(next.state, state2.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );
  const uncontrolledState = internalState.state;
  const prevValueRef = React22.useRef(uncontrolledState);
  React22.useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [uncontrolledState, prevValueRef, isControlled]);
  const state = React22.useMemo(() => {
    const isControlled2 = controlledState !== void 0;
    if (isControlled2) {
      return __spreadProps(__spreadValues({}, internalState), { state: controlledState });
    }
    return internalState;
  }, [internalState, controlledState]);
  React22.useEffect(() => {
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ type: SYNC_STATE, state: controlledState });
    }
  }, [controlledState, internalState.state, isControlled]);
  return [state, dispatch];
}
__name6(useControllableStateReducer, "useControllableStateReducer");

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import * as React19 from "react";

// node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as React17 from "react";
import * as ReactDOM from "react-dom";
import { createSlot } from "@radix-ui/react-slot";
import { jsx as jsx18 } from "react/jsx-runtime";
var __defProp8 = Object.defineProperty;
var __name7 = (target, value) => __defProp8(target, "name", { value, configurable: true });
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot3 = createSlot(`Primitive.${node}`);
  const Node2 = React17.forwardRef((props, forwardedRef) => {
    const _a = props, { asChild } = _a, primitiveProps = __objRest(_a, ["asChild"]);
    const Comp = asChild ? Slot3 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx18(Comp, __spreadProps(__spreadValues({}, primitiveProps), { ref: forwardedRef }));
  });
  Node2.displayName = `Primitive.${node}`;
  return __spreadProps(__spreadValues({}, primitive), { [node]: Node2 });
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}
__name7(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as React18 from "react";
var __defProp9 = Object.defineProperty;
var __name8 = (target, value) => __defProp9(target, "name", { value, configurable: true });
function useCallbackRef(callback) {
  const callbackRef = React18.useRef(callback);
  React18.useEffect(() => {
    callbackRef.current = callback;
  });
  return React18.useMemo(() => ((...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }), []);
}
__name8(useCallbackRef, "useCallbackRef");

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import { jsx as jsx19 } from "react/jsx-runtime";
var __defProp10 = Object.defineProperty;
var __name9 = (target, value) => __defProp10(target, "name", { value, configurable: true });
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React19.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
});
var DismissableLayer = /* @__PURE__ */ React19.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name9(function DismissableLayer2(props, forwardedRef) {
    var _b;
    const _a = props, {
      disableOutsidePointerEvents = false,
      deferPointerDownOutside = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss
    } = _a, layerProps = __objRest(_a, [
      "disableOutsidePointerEvents",
      "deferPointerDownOutside",
      "onEscapeKeyDown",
      "onPointerDownOutside",
      "onFocusOutside",
      "onInteractOutside",
      "onDismiss"
    ]);
    const context = React19.useContext(DismissableLayerContext);
    const [node, setNode] = React19.useState(null);
    const ownerDocument = (_b = node == null ? void 0 : node.ownerDocument) != null ? _b : globalThis == null ? void 0 : globalThis.document;
    const [, force] = React19.useState({});
    const composedRefs = useComposedRefs(forwardedRef, setNode);
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
      ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const isDeferredPointerDownOutsideRef = React19.useRef(false);
    const pointerDownOutside = usePointerDownOutside(
      (event) => {
        onPointerDownOutside == null ? void 0 : onPointerDownOutside(event);
        onInteractOutside == null ? void 0 : onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
      },
      {
        ownerDocument,
        deferPointerDownOutside,
        isDeferredPointerDownOutsideRef,
        dismissableSurfaces: context.dismissableSurfaces,
        shouldHandlePointerDownOutside: React19.useCallback(
          (target) => {
            if (!(target instanceof Node)) {
              return false;
            }
            const isPointerDownOnBranch = [...context.branches].some(
              (branch) => branch.contains(target)
            );
            return isPointerEventsEnabled && !isPointerDownOnBranch;
          },
          [context.branches, isPointerEventsEnabled]
        )
      }
    );
    const focusOutside = useFocusOutside((event) => {
      if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside == null ? void 0 : onFocusOutside(event);
      onInteractOutside == null ? void 0 : onInteractOutside(event);
      if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
    }, ownerDocument);
    const isHighestLayer = node ? index === layers.length - 1 : false;
    const handleKeyDown = useCallbackRef((event) => {
      if (event.key !== "Escape") {
        return;
      }
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    });
    React19.useEffect(() => {
      if (!isHighestLayer) {
        return;
      }
      ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
    }, [ownerDocument, isHighestLayer, handleKeyDown]);
    React19.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents) {
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
          }
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React19.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    React19.useEffect(() => {
      const handleUpdate = /* @__PURE__ */ __name9(() => force({}), "handleUpdate");
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsx19(
      Primitive.div,
      __spreadProps(__spreadValues({}, layerProps), {
        ref: composedRefs,
        style: __spreadValues({
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0
        }, props.style),
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      })
    );
  }, "DismissableLayer")
);
function useDismissableLayerSurface() {
  const context = React19.useContext(DismissableLayerContext);
  const [node, setNode] = React19.useState(null);
  React19.useEffect(() => {
    if (!node) {
      return;
    }
    context.dismissableSurfaces.add(node);
    return () => {
      context.dismissableSurfaces.delete(node);
    };
  }, [node, context.dismissableSurfaces]);
  return setNode;
}
__name9(useDismissableLayerSurface, "useDismissableLayerSurface");
var IS_TRUE = /* @__PURE__ */ __name9(() => true, "IS_TRUE");
function usePointerDownOutside(onPointerDownOutside, args) {
  const {
    ownerDocument = globalThis == null ? void 0 : globalThis.document,
    deferPointerDownOutside = false,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces,
    shouldHandlePointerDownOutside = IS_TRUE
  } = args;
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React19.useRef(false);
  const isPointerDownOutsideRef = React19.useRef(false);
  const interceptedOutsideInteractionEventsRef = React19.useRef(/* @__PURE__ */ new Map());
  const handleClickRef = React19.useRef(() => {
  });
  React19.useEffect(() => {
    function resetOutsideInteraction() {
      isPointerDownOutsideRef.current = false;
      isDeferredPointerDownOutsideRef.current = false;
      interceptedOutsideInteractionEventsRef.current.clear();
    }
    __name9(resetOutsideInteraction, "resetOutsideInteraction");
    function isOutsideInteractionIntercepted() {
      return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
    }
    __name9(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
    function handleInteractionCapture(event) {
      if (!isPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isDismissableSurface = target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target));
      if (!isDismissableSurface) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, true);
      }
      if (event.type === "click") {
        window.setTimeout(() => {
          if (isPointerDownOutsideRef.current) {
            handleClickRef.current();
          }
        }, 0);
      }
    }
    __name9(handleInteractionCapture, "handleInteractionCapture");
    function handleInteractionBubble(event) {
      if (isPointerDownOutsideRef.current) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, false);
      }
    }
    __name9(handleInteractionBubble, "handleInteractionBubble");
    const handlePointerDown = /* @__PURE__ */ __name9((event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
          resetOutsideInteraction();
          if (!wasOutsideInteractionIntercepted) {
            handleAndDispatchCustomEvent(
              POINTER_DOWN_OUTSIDE,
              handlePointerDownOutside,
              eventDetail,
              { discrete: true }
            );
          }
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        __name9(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
        if (!shouldHandlePointerDownOutside(event.target)) {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          resetOutsideInteraction();
          isPointerInsideReactTreeRef.current = false;
          return;
        }
        const eventDetail = { originalEvent: event };
        isPointerDownOutsideRef.current = true;
        isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
        interceptedOutsideInteractionEventsRef.current.clear();
        if (!deferPointerDownOutside || event.button !== 0) {
          handleAndDispatchPointerDownOutsideEvent2();
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
        resetOutsideInteraction();
      }
      isPointerInsideReactTreeRef.current = false;
    }, "handlePointerDown");
    const outsideInteractionEvents = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const eventName of outsideInteractionEvents) {
      ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
      ownerDocument.addEventListener(eventName, handleInteractionBubble);
    }
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
      for (const eventName of outsideInteractionEvents) {
        ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
        ownerDocument.removeEventListener(eventName, handleInteractionBubble);
      }
    };
  }, [
    ownerDocument,
    handlePointerDownOutside,
    deferPointerDownOutside,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces,
    shouldHandlePointerDownOutside
  ]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ __name9(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture")
  };
}
__name9(usePointerDownOutside, "usePointerDownOutside");
function useFocusOutside(onFocusOutside, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React19.useRef(false);
  React19.useEffect(() => {
    const handleFocus = /* @__PURE__ */ __name9((event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    }, "handleFocus");
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: /* @__PURE__ */ __name9(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ __name9(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
  };
}
__name9(useFocusOutside, "useFocusOutside");
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
__name9(dispatchUpdate, "dispatchUpdate");
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
__name9(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");

// node_modules/@radix-ui/react-focus-scope/dist/index.mjs
import * as React20 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var __defProp11 = Object.defineProperty;
var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FocusScope = /* @__PURE__ */ React20.forwardRef(
  /* @__PURE__ */ __name10(function FocusScope2(props, forwardedRef) {
    const _a = props, {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp
    } = _a, scopeProps = __objRest(_a, [
      "loop",
      "trapped",
      "onMountAutoFocus",
      "onUnmountAutoFocus"
    ]);
    const [container, setContainer] = React20.useState(null);
    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp);
    const lastFocusedElementRef = React20.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, setContainer);
    const focusScope = React20.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    React20.useEffect(() => {
      if (trapped) {
        let handleFocusIn2 = function(event) {
          if (focusScope.paused || !container) return;
          const target = event.target;
          if (container.contains(target)) {
            lastFocusedElementRef.current = target;
          } else {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleFocusOut2 = function(event) {
          if (focusScope.paused || !container) return;
          const relatedTarget = event.relatedTarget;
          if (relatedTarget === null) return;
          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleMutations2 = function(mutations) {
          const focusedElement = document.activeElement;
          if (focusedElement !== document.body) return;
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };
        var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
        __name10(handleFocusIn2, "handleFocusIn");
        __name10(handleFocusOut2, "handleFocusOut");
        __name10(handleMutations2, "handleMutations");
        document.addEventListener("focusin", handleFocusIn2);
        document.addEventListener("focusout", handleFocusOut2);
        const mutationObserver = new MutationObserver(handleMutations2);
        if (container) mutationObserver.observe(container, { childList: true, subtree: true });
        return () => {
          document.removeEventListener("focusin", handleFocusIn2);
          document.removeEventListener("focusout", handleFocusOut2);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container, focusScope.paused]);
    React20.useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container.contains(previouslyFocusedElement);
        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }
        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          setTimeout(() => {
            const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
            container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            container.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented) {
              focus(previouslyFocusedElement != null ? previouslyFocusedElement : document.body, { select: true });
            }
            container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
    const handleKeyDown = React20.useCallback(
      (event) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
          const container2 = event.currentTarget;
          const [first, last] = getTabbableEdges(container2);
          const hasTabbableElementsInside = first && last;
          if (!hasTabbableElementsInside) {
            if (focusedElement === container2) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop) focus(first, { select: true });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop) focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused]
    );
    return /* @__PURE__ */ jsx20(Primitive.div, __spreadProps(__spreadValues({ tabIndex: -1 }, scopeProps), { ref: composedRefs, onKeyDown: handleKeyDown }));
  }, "FocusScope")
);
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
__name10(focusFirst, "focusFirst");
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
__name10(getTabbableEdges, "getTabbableEdges");
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ __name10((node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
__name10(getTabbableCandidates, "getTabbableCandidates");
function findVisible(elements, container) {
  const canUseCheckVisibility = typeof container.checkVisibility === "function" && container.checkVisibility({ checkVisibilityCSS: true });
  for (const element of elements) {
    const hidden = canUseCheckVisibility ? !element.checkVisibility({ checkVisibilityCSS: true }) : isHidden(element, { upTo: container });
    if (!hidden) {
      return element;
    }
  }
}
__name10(findVisible, "findVisible");
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
__name10(isHidden, "isHidden");
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
__name10(isSelectableInput, "isSelectableInput");
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
__name10(focus, "focus");
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope == null ? void 0 : activeFocusScope.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      var _a;
      stack = arrayRemove(stack, focusScope);
      (_a = stack[0]) == null ? void 0 : _a.resume();
    }
  };
}
__name10(createFocusScopesStack, "createFocusScopesStack");
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
__name10(arrayRemove, "arrayRemove");
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
__name10(removeLinks, "removeLinks");

// node_modules/@radix-ui/react-portal/dist/index.mjs
import * as React21 from "react";
import * as ReactDOM2 from "react-dom";
import { jsx as jsx21 } from "react/jsx-runtime";
var __defProp12 = Object.defineProperty;
var __name11 = (target, value) => __defProp12(target, "name", { value, configurable: true });
var Portal4 = /* @__PURE__ */ React21.forwardRef(
  /* @__PURE__ */ __name11(function Portal22(props, forwardedRef) {
    var _b;
    const _a = props, { container: containerProp } = _a, portalProps = __objRest(_a, ["container"]);
    const [mounted, setMounted] = React21.useState(false);
    useLayoutEffect2(() => setMounted(true), []);
    const container = containerProp || mounted && ((_b = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _b.body);
    return container ? ReactDOM2.createPortal(/* @__PURE__ */ jsx21(Primitive.div, __spreadProps(__spreadValues({}, portalProps), { ref: forwardedRef })), container) : null;
  }, "Portal")
);

// node_modules/@radix-ui/react-presence/dist/index.mjs
import * as React23 from "react";
import * as React24 from "react";
var __defProp13 = Object.defineProperty;
var __name12 = (target, value) => __defProp13(target, "name", { value, configurable: true });
function useStateMachine(initialState, machine) {
  return React24.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState != null ? nextState : state;
  }, initialState);
}
__name12(useStateMachine, "useStateMachine");
var Presence = /* @__PURE__ */ __name12((props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React23.Children.only(children);
  const ref = useStableComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React23.cloneElement(child, { ref }) : null;
}, "Presence");
function usePresence(present) {
  const [node, setNode] = React23.useState();
  const stylesRef = React23.useRef(null);
  const prevPresentRef = React23.useRef(present);
  const prevAnimationNameRef = React23.useRef("none");
  const mountAnimationNameRef = React23.useRef(void 0);
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React23.useEffect(() => {
    var _a;
    if (state === "mounted") {
      prevAnimationNameRef.current = (_a = mountAnimationNameRef.current) != null ? _a : getAnimationName(stylesRef.current);
      mountAnimationNameRef.current = void 0;
    } else {
      prevAnimationNameRef.current = "none";
    }
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        mountAnimationNameRef.current = currentAnimationName;
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    var _a;
    if (node) {
      let timeoutId;
      const ownerWindow = (_a = node.ownerDocument.defaultView) != null ? _a : window;
      const handleAnimationEnd = /* @__PURE__ */ __name12((event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      }, "handleAnimationEnd");
      const handleAnimationStart = /* @__PURE__ */ __name12((event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      }, "handleAnimationStart");
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React23.useCallback((node2) => {
      if (node2) {
        const styles = getComputedStyle(node2);
        stylesRef.current = styles;
        mountAnimationNameRef.current = getAnimationName(styles);
      } else {
        stylesRef.current = null;
      }
      setNode(node2);
    }, [])
  };
}
__name12(usePresence, "usePresence");
function setRef2(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name12(setRef2, "setRef");
function useStableComposedRefs(...refs) {
  const refsRef = React23.useRef(refs);
  refsRef.current = refs;
  return React23.useCallback((node) => {
    const currentRefs = refsRef.current;
    let hasCleanup = false;
    const cleanups = currentRefs.map((ref) => {
      const cleanup = setRef2(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef2(currentRefs[i], null);
          }
        }
      };
    }
  }, []);
}
__name12(useStableComposedRefs, "useStableComposedRefs");
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
__name12(getAnimationName, "getAnimationName");
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
__name12(getElementRef, "getElementRef");

// node_modules/@radix-ui/react-focus-guards/dist/index.mjs
import * as React25 from "react";
var __defProp14 = Object.defineProperty;
var __name13 = (target, value) => __defProp14(target, "name", { value, configurable: true });
var count2 = 0;
var guards = null;
function FocusGuards(props) {
  useFocusGuards();
  return props.children;
}
__name13(FocusGuards, "FocusGuards");
function useFocusGuards() {
  React25.useEffect(() => {
    if (!guards) {
      guards = { start: createFocusGuard(), end: createFocusGuard() };
    }
    const { start, end } = guards;
    if (document.body.firstElementChild !== start) {
      document.body.insertAdjacentElement("afterbegin", start);
    }
    if (document.body.lastElementChild !== end) {
      document.body.insertAdjacentElement("beforeend", end);
    }
    count2++;
    return () => {
      if (count2 === 1) {
        guards == null ? void 0 : guards.start.remove();
        guards == null ? void 0 : guards.end.remove();
        guards = null;
      }
      count2 = Math.max(0, count2 - 1);
    };
  }, []);
}
__name13(useFocusGuards, "useFocusGuards");
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
__name13(createFocusGuard, "createFocusGuard");

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/react-remove-scroll/dist/es2015/Combination.js
import * as React32 from "react";

// node_modules/react-remove-scroll/dist/es2015/UI.js
import * as React28 from "react";

// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// node_modules/use-callback-ref/dist/es2015/useRef.js
import { useState as useState11 } from "react";
function useCallbackRef2(initialValue, callback) {
  var ref = useState11(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
import * as React26 from "react";
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React26.useLayoutEffect : React26.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef2(defaultValue || null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}

// node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}

// node_modules/use-sidecar/dist/es2015/exports.js
import * as React27 from "react";
var SideCar = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target4 = sideCar.read();
  if (!Target4) {
    throw new Error("Sidecar medium not found");
  }
  return React27.createElement(Target4, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {
  return;
};
var RemoveScroll = React28.forwardRef(function(props, parentRef) {
  var ref = React28.useRef(null);
  var _a = React28.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container2 = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React28.createElement(
    React28.Fragment,
    null,
    enabled && React28.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? React28.cloneElement(React28.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React28.createElement(Container2, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
import * as React31 from "react";

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
import * as React30 from "react";

// node_modules/react-style-singleton/dist/es2015/hook.js
import * as React29 from "react";

// node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};

// node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};

// node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    React29.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};

// node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet2 = function(_a) {
    var styles = _a.styles, dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet2;
};

// node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  React30.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = React30.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React30.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};

// node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React31.useRef([]);
  var touchStartRef = React31.useRef([0, 0]);
  var activeAxis = React31.useRef();
  var id = React31.useState(idCounter++)[0];
  var Style2 = React31.useState(styleSingleton)[0];
  var lastProps = React31.useRef(props);
  React31.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React31.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React31.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var selection = window.getSelection();
    var anchorNode = selection && selection.anchorNode;
    var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
    if (isTouchingSelection) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React31.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React31.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React31.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React31.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React31.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React31.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React31.createElement(
    React31.Fragment,
    null,
    inert ? React31.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React31.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React32.forwardRef(function(props, ref) {
  return React32.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = parentNode || getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};

// node_modules/@radix-ui/react-dialog/dist/index.mjs
import { createSlot as createSlot2 } from "@radix-ui/react-slot";
import { Fragment as Fragment4, jsx as jsx22 } from "react/jsx-runtime";
var __defProp15 = Object.defineProperty;
var __name14 = (target, value) => __defProp15(target, "name", { value, configurable: true });
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = /* @__PURE__ */ __name14((props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = React33.useRef(null);
  const contentRef = React33.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen != null ? defaultOpen : false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  const [titleCount, setTitleCount] = React33.useState(0);
  const [descriptionCount, setDescriptionCount] = React33.useState(0);
  return /* @__PURE__ */ jsx22(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId3(),
      titleId: useId3(),
      descriptionId: useId3(),
      titlePresent: titleCount > 0,
      descriptionPresent: descriptionCount > 0,
      setTitleCount,
      setDescriptionCount,
      open,
      onOpenChange: setOpen,
      onOpenToggle: React33.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
}, "Dialog");
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = /* @__PURE__ */ React33.forwardRef(
  /* @__PURE__ */ __name14(function DialogTrigger2(props, forwardedRef) {
    const _a = props, { __scopeDialog } = _a, triggerProps = __objRest(_a, ["__scopeDialog"]);
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsx22(
      Primitive.button,
      __spreadProps(__spreadValues({
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": getState(context.open)
      }, triggerProps), {
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      })
    );
  }, "DialogTrigger")
);
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal = /* @__PURE__ */ __name14((props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx22(PortalProvider, { scope: __scopeDialog, forceMount, children: React33.Children.map(children, (child) => /* @__PURE__ */ jsx22(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx22(Portal4, { asChild: true, container, children: child }) })) });
}, "DialogPortal");
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = /* @__PURE__ */ React33.forwardRef(
  /* @__PURE__ */ __name14(function DialogOverlay2(props, forwardedRef) {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const _a = props, { forceMount = portalContext.forceMount } = _a, overlayProps = __objRest(_a, ["forceMount"]);
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsx22(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx22(DialogOverlayImpl, __spreadProps(__spreadValues({}, overlayProps), { ref: forwardedRef })) }) : null;
  }, "DialogOverlay")
);
var Slot2 = createSlot2("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = /* @__PURE__ */ React33.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name14(function DialogOverlayImpl2(props, forwardedRef) {
    const _a = props, { __scopeDialog } = _a, overlayProps = __objRest(_a, ["__scopeDialog"]);
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    const registerDismissableSurface = useDismissableLayerSurface();
    const composedRefs = useComposedRefs(forwardedRef, registerDismissableSurface);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsx22(Combination_default, { as: Slot2, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsx22(
        Primitive.div,
        __spreadProps(__spreadValues({
          "data-state": getState(context.open)
        }, overlayProps), {
          ref: composedRefs,
          style: __spreadValues({ pointerEvents: "auto" }, overlayProps.style)
        })
      ) })
    );
  }, "DialogOverlayImpl")
);
var CONTENT_NAME = "DialogContent";
var DialogContent = /* @__PURE__ */ React33.forwardRef(
  /* @__PURE__ */ __name14(function DialogContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const _a = props, { forceMount = portalContext.forceMount } = _a, contentProps = __objRest(_a, ["forceMount"]);
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsx22(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx22(DialogContentModal, __spreadProps(__spreadValues({}, contentProps), { ref: forwardedRef })) : /* @__PURE__ */ jsx22(DialogContentNonModal, __spreadProps(__spreadValues({}, contentProps), { ref: forwardedRef })) });
  }, "DialogContent")
);
var DialogContentModal = /* @__PURE__ */ React33.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name14(function DialogContentModal2(props, forwardedRef) {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = React33.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    React33.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsx22(
      DialogContentImpl,
      __spreadProps(__spreadValues({}, props), {
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: context.open,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      })
    );
  }, "DialogContentModal")
);
var DialogContentNonModal = /* @__PURE__ */ React33.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name14(function DialogContentNonModal2(props, forwardedRef) {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = React33.useRef(false);
    const hasPointerDownOutsideRef = React33.useRef(false);
    return /* @__PURE__ */ jsx22(
      DialogContentImpl,
      __spreadProps(__spreadValues({}, props), {
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      })
    );
  }, "DialogContentNonModal")
);
var DialogContentImpl = /* @__PURE__ */ React33.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name14(function DialogContentImpl2(props, forwardedRef) {
    const _a = props, {
      __scopeDialog,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      "aria-describedby": ariaDescribedby
    } = _a, contentProps = __objRest(_a, [
      "__scopeDialog",
      "trapFocus",
      "onOpenAutoFocus",
      "onCloseAutoFocus",
      "aria-describedby"
    ]);
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    useFocusGuards();
    return /* @__PURE__ */ jsx22(Fragment4, { children: /* @__PURE__ */ jsx22(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsx22(
          DismissableLayer,
          __spreadProps(__spreadValues({
            role: "dialog",
            id: context.contentId,
            "aria-labelledby": context.titlePresent ? context.titleId : void 0,
            "aria-describedby": context.descriptionPresent ? concatAriaDescribedby(ariaDescribedby, context.descriptionId) : ariaDescribedby,
            "data-state": getState(context.open)
          }, contentProps), {
            ref: forwardedRef,
            deferPointerDownOutside: true,
            onDismiss: () => context.onOpenChange(false)
          })
        )
      }
    ) });
  }, "DialogContentImpl")
);
var DialogTitle = /* @__PURE__ */ React33.forwardRef(
  /* @__PURE__ */ __name14(function DialogTitle2(props, forwardedRef) {
    const _a = props, { __scopeDialog } = _a, titleProps = __objRest(_a, ["__scopeDialog"]);
    const context = useDialogContext("DialogTitle", __scopeDialog);
    const { setTitleCount } = context;
    useLayoutEffect2(() => {
      setTitleCount((count3) => count3 + 1);
      return () => setTitleCount((count3) => count3 - 1);
    }, [setTitleCount]);
    return /* @__PURE__ */ jsx22(Primitive.h2, __spreadProps(__spreadValues({ id: context.titleId }, titleProps), { ref: forwardedRef }));
  }, "DialogTitle")
);
var DialogDescription = /* @__PURE__ */ React33.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name14(function DialogDescription2(props, forwardedRef) {
    const _a = props, { __scopeDialog } = _a, descriptionProps = __objRest(_a, ["__scopeDialog"]);
    const context = useDialogContext("DialogDescription", __scopeDialog);
    const { setDescriptionCount } = context;
    useLayoutEffect2(() => {
      setDescriptionCount((count3) => count3 + 1);
      return () => setDescriptionCount((count3) => count3 - 1);
    }, [setDescriptionCount]);
    return /* @__PURE__ */ jsx22(Primitive.p, __spreadProps(__spreadValues({ id: context.descriptionId }, descriptionProps), { ref: forwardedRef }));
  }, "DialogDescription")
);
var CLOSE_NAME = "DialogClose";
var DialogClose = /* @__PURE__ */ React33.forwardRef(
  /* @__PURE__ */ __name14(function DialogClose2(props, forwardedRef) {
    const _a = props, { __scopeDialog } = _a, closeProps = __objRest(_a, ["__scopeDialog"]);
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsx22(
      Primitive.button,
      __spreadProps(__spreadValues({
        type: "button"
      }, closeProps), {
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      })
    );
  }, "DialogClose")
);
function concatAriaDescribedby(...values) {
  const ids = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value !== "string") continue;
    for (const id of String(value).trim().split(/\s+/)) {
      if (id) ids.add(id);
    }
  }
  return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name14(concatAriaDescribedby, "concatAriaDescribedby");
function getState(open) {
  return open ? "open" : "closed";
}
__name14(getState, "getState");

// components/ui/Modal.tsx
import { X as X3 } from "lucide-react";
import { clsx as clsx11 } from "clsx";
import { jsx as jsx23, jsxs as jsxs13 } from "react/jsx-runtime";
var Modal = Dialog;
var ModalTrigger = DialogTrigger;
var ModalPortal = DialogPortal;
var ModalClose = DialogClose;
var ModalOverlay = React34.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx23(
    DialogOverlay,
    __spreadValues({
      ref,
      className: clsx11(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props)
  );
});
ModalOverlay.displayName = DialogOverlay.displayName;
var ModalContent = React34.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxs13(ModalPortal, { children: [
    /* @__PURE__ */ jsx23(ModalOverlay, {}),
    /* @__PURE__ */ jsxs13(
      DialogContent,
      __spreadProps(__spreadValues({
        ref,
        className: clsx11(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-urvos-border bg-urvos-surface p-6 shadow-urvos-hover duration-200 sm:rounded-urvos-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className
        )
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxs13(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-urvos-surface-alt data-[state=open]:text-urvos-ink-light", children: [
            /* @__PURE__ */ jsx23(X3, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx23("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
ModalContent.displayName = DialogContent.displayName;
var ModalHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx23(
    "div",
    __spreadValues({
      className: clsx11("flex flex-col space-y-1.5 text-center sm:text-left", className)
    }, props)
  );
};
ModalHeader.displayName = "ModalHeader";
var ModalFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx23(
    "div",
    __spreadValues({
      className: clsx11("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
    }, props)
  );
};
ModalFooter.displayName = "ModalFooter";
var ModalTitle = React34.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx23(
    DialogTitle,
    __spreadValues({
      ref,
      className: clsx11("text-lg font-semibold leading-none tracking-tight", className)
    }, props)
  );
});
ModalTitle.displayName = DialogTitle.displayName;
var ModalDescription = React34.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx23(
    DialogDescription,
    __spreadValues({
      ref,
      className: clsx11("text-sm text-urvos-ink-light", className)
    }, props)
  );
});
ModalDescription.displayName = DialogDescription.displayName;

// components/ui/Drawer.tsx
import * as React35 from "react";
import { cva as cva8 } from "class-variance-authority";
import { X as X4 } from "lucide-react";
import { clsx as clsx12 } from "clsx";
import { jsx as jsx24, jsxs as jsxs14 } from "react/jsx-runtime";
var Drawer = Dialog;
var DrawerTrigger = DialogTrigger;
var DrawerClose = DialogClose;
var DrawerPortal = DialogPortal;
var DrawerOverlay = React35.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx24(
    DialogOverlay,
    __spreadProps(__spreadValues({
      className: clsx12(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )
    }, props), {
      ref
    })
  );
});
DrawerOverlay.displayName = DialogOverlay.displayName;
var drawerVariants = cva8(
  "fixed z-50 gap-4 bg-urvos-surface p-6 shadow-urvos-hover transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-urvos-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t border-urvos-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r border-urvos-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l border-urvos-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var DrawerContent = React35.forwardRef((_a, ref) => {
  var _b = _a, { side = "right", className, children } = _b, props = __objRest(_b, ["side", "className", "children"]);
  return /* @__PURE__ */ jsxs14(DrawerPortal, { children: [
    /* @__PURE__ */ jsx24(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs14(
      DialogContent,
      __spreadProps(__spreadValues({
        ref,
        className: clsx12(drawerVariants({ side }), className)
      }, props), {
        children: [
          children,
          /* @__PURE__ */ jsxs14(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-urvos-surface-alt", children: [
            /* @__PURE__ */ jsx24(X4, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx24("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      })
    )
  ] });
});
DrawerContent.displayName = DialogContent.displayName;
var DrawerHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx24(
    "div",
    __spreadValues({
      className: clsx12(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )
    }, props)
  );
};
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsx24(
    "div",
    __spreadValues({
      className: clsx12(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React35.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx24(
    DialogTitle,
    __spreadValues({
      ref,
      className: clsx12("text-lg font-semibold text-urvos-ink", className)
    }, props)
  );
});
DrawerTitle.displayName = DialogTitle.displayName;
var DrawerDescription = React35.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx24(
    DialogDescription,
    __spreadValues({
      ref,
      className: clsx12("text-sm text-urvos-ink-light", className)
    }, props)
  );
});
DrawerDescription.displayName = DialogDescription.displayName;

// components/ui/Tooltip.tsx
import * as React36 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx as clsx13 } from "clsx";
import { jsx as jsx25 } from "react/jsx-runtime";
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = React36.forwardRef((_a, ref) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ jsx25(
    TooltipPrimitive.Content,
    __spreadValues({
      ref,
      sideOffset,
      className: clsx13(
        "z-50 overflow-hidden rounded-urvos-md border border-urvos-border bg-urvos-surface px-3 py-1.5 text-xs text-urvos-ink shadow-urvos-hover animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )
    }, props)
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// components/ui/Toast.tsx
import * as React37 from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva as cva9 } from "class-variance-authority";
import { X as X5 } from "lucide-react";
import { clsx as clsx14 } from "clsx";
import { jsx as jsx26 } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React37.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Viewport,
    __spreadValues({
      ref,
      className: clsx14(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )
    }, props)
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva9(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-urvos-hover transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-urvos-border bg-urvos-surface text-urvos-ink",
        danger: "danger group border-urvos-danger bg-urvos-danger text-white",
        success: "success group border-urvos-success bg-urvos-success text-white",
        warning: "warning group border-urvos-warning bg-urvos-warning text-white"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React37.forwardRef((_a, ref) => {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Root,
    __spreadValues({
      ref,
      className: clsx14(toastVariants({ variant }), className)
    }, props)
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React37.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Action,
    __spreadValues({
      ref,
      className: clsx14(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.danger]:border-white/40 group-[.danger]:hover:border-white/30 group-[.danger]:hover:bg-urvos-surface/20 group-[.danger]:hover:text-white group-[.danger]:focus:ring-white",
        className
      )
    }, props)
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React37.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Close,
    __spreadProps(__spreadValues({
      ref,
      className: clsx14(
        "absolute right-2 top-2 rounded-md p-1 text-urvos-ink-light opacity-0 transition-opacity hover:text-urvos-ink focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.danger]:text-white/70 group-[.danger]:hover:text-white focus:ring-urvos-primary group-[.danger]:focus:ring-white",
        className
      ),
      "toast-close": ""
    }, props), {
      children: /* @__PURE__ */ jsx26(X5, { className: "h-4 w-4" })
    })
  );
});
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React37.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Title,
    __spreadValues({
      ref,
      className: clsx14("text-sm font-semibold", className)
    }, props)
  );
});
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React37.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx26(
    ToastPrimitives.Description,
    __spreadValues({
      ref,
      className: clsx14("text-sm opacity-90", className)
    }, props)
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// components/ui/DatePicker.tsx
import * as React38 from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx as clsx15 } from "clsx";
import * as PopoverPrimitive3 from "@radix-ui/react-popover";
import { jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function buildMonthGrid(month) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 });
  const days = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}
function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  error,
  fromDate
}) {
  const [open, setOpen] = React38.useState(false);
  const [month, setMonth] = React38.useState(value != null ? value : /* @__PURE__ */ new Date());
  const days = buildMonthGrid(month);
  const dayDisabled = (day) => {
    if (fromDate && isBefore(day, fromDate)) return true;
    return false;
  };
  return /* @__PURE__ */ jsxs15(PopoverPrimitive3.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx27(PopoverPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs15(
      "button",
      {
        className: clsx15(
          "combobox justify-start text-left font-normal",
          !value && "text-urvos-ink-light",
          error && "combobox--error",
          className
        ),
        children: [
          /* @__PURE__ */ jsx27(CalendarIcon, { className: "mr-2 h-4 w-4" }),
          value ? format(value, "PPP") : /* @__PURE__ */ jsx27("span", { children: placeholder })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx27(PopoverPrimitive3.Portal, { children: /* @__PURE__ */ jsx27(
      PopoverPrimitive3.Content,
      {
        align: "start",
        sideOffset: 4,
        className: "z-50 rounded-urvos-md border border-urvos-border bg-urvos-surface p-3 shadow-urvos-hover animate-in fade-in-0 zoom-in-95",
        children: /* @__PURE__ */ jsxs15("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs15("div", { className: "flex justify-center pt-1 relative items-center", children: [
            /* @__PURE__ */ jsx27(
              "button",
              {
                type: "button",
                onClick: () => setMonth((m) => addMonths(m, -1)),
                className: "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt",
                children: /* @__PURE__ */ jsx27(ChevronLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx27("div", { className: "text-sm font-medium", children: format(month, "MMMM yyyy") }),
            /* @__PURE__ */ jsx27(
              "button",
              {
                type: "button",
                onClick: () => setMonth((m) => addMonths(m, 1)),
                className: "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt",
                children: /* @__PURE__ */ jsx27(ChevronRight, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs15("table", { className: "w-full border-collapse space-y-1", children: [
            /* @__PURE__ */ jsx27("thead", { children: /* @__PURE__ */ jsx27("tr", { className: "flex w-full mt-2", children: dayNames.map((n) => /* @__PURE__ */ jsx27(
              "th",
              {
                className: "text-urvos-ink-light rounded-md w-9 font-normal text-[0.8rem]",
                children: n
              },
              n
            )) }) }),
            /* @__PURE__ */ jsx27("tbody", { children: Array.from({ length: days.length / 7 }, (_, week) => /* @__PURE__ */ jsx27("tr", { className: "flex w-full mt-2", children: days.slice(week * 7, week * 7 + 7).map((day) => {
              const disabled = dayDisabled(day);
              const selected = !!value && isSameDay(day, value);
              const outside = !isSameMonth(day, month);
              return /* @__PURE__ */ jsx27("td", { className: "h-9 w-9 text-center text-sm p-0 relative", children: /* @__PURE__ */ jsx27(
                "button",
                {
                  type: "button",
                  disabled,
                  onClick: () => {
                    onChange == null ? void 0 : onChange(day);
                    setOpen(false);
                  },
                  className: clsx15(
                    "h-9 w-9 p-0 font-normal rounded-urvos-sm",
                    !disabled && "hover:bg-urvos-surface-alt",
                    selected && "bg-urvos-primary text-white hover:bg-urvos-primary hover:text-white",
                    isToday(day) && !selected && "bg-urvos-surface-alt text-urvos-ink",
                    outside && "text-urvos-ink-light opacity-50",
                    disabled && "text-urvos-ink-light opacity-50"
                  ),
                  children: format(day, "d")
                }
              ) }, day.toISOString());
            }) }, week)) })
          ] })
        ] })
      }
    ) })
  ] });
}

// components/ui/DateRangePicker.tsx
import * as React39 from "react";
import {
  format as format2,
  startOfMonth as startOfMonth2,
  endOfMonth as endOfMonth2,
  startOfWeek as startOfWeek2,
  endOfWeek as endOfWeek2,
  addDays as addDays2,
  addMonths as addMonths2,
  isSameMonth as isSameMonth2,
  isSameDay as isSameDay2,
  isBefore as isBefore2
} from "date-fns";
import { Calendar as CalendarIcon2, ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight2 } from "lucide-react";
import { clsx as clsx16 } from "clsx";
import * as PopoverPrimitive4 from "@radix-ui/react-popover";
import { Fragment as Fragment5, jsx as jsx28, jsxs as jsxs16 } from "react/jsx-runtime";
var dayNames2 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function buildMonthGrid2(month) {
  const start = startOfWeek2(startOfMonth2(month), { weekStartsOn: 0 });
  const end = endOfWeek2(endOfMonth2(month), { weekStartsOn: 0 });
  const days = [];
  let cursor = start;
  while (cursor <= end) {
    days.push(cursor);
    cursor = addDays2(cursor, 1);
  }
  return days;
}
function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  className,
  error
}) {
  var _a;
  const [open, setOpen] = React39.useState(false);
  const [month, setMonth] = React39.useState((_a = value == null ? void 0 : value.from) != null ? _a : /* @__PURE__ */ new Date());
  const days = buildMonthGrid2(month);
  const handleSelect = (day) => {
    if (!(value == null ? void 0 : value.from) || value.from && value.to) {
      onChange == null ? void 0 : onChange({ from: day, to: void 0 });
      return;
    }
    if (isBefore2(day, value.from)) {
      onChange == null ? void 0 : onChange({ from: day, to: value.from });
    } else {
      onChange == null ? void 0 : onChange({ from: value.from, to: day });
    }
    setOpen(false);
  };
  const rangeClass = (day) => {
    if (!(value == null ? void 0 : value.from)) return null;
    const inRange = !!value.to && !isBefore2(day, value.from) && !isBefore2(value.to, day);
    return inRange ? "bg-urvos-primary/10 text-urvos-ink" : null;
  };
  return /* @__PURE__ */ jsxs16(PopoverPrimitive4.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx28(PopoverPrimitive4.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs16(
      "button",
      {
        className: clsx16(
          "combobox justify-start text-left font-normal",
          !value && "text-urvos-ink-light",
          error && "combobox--error",
          className
        ),
        children: [
          /* @__PURE__ */ jsx28(CalendarIcon2, { className: "mr-2 h-4 w-4" }),
          (value == null ? void 0 : value.from) ? value.to ? /* @__PURE__ */ jsxs16(Fragment5, { children: [
            format2(value.from, "LLL dd, y"),
            " - ",
            format2(value.to, "LLL dd, y")
          ] }) : format2(value.from, "LLL dd, y") : /* @__PURE__ */ jsx28("span", { children: placeholder })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx28(PopoverPrimitive4.Portal, { children: /* @__PURE__ */ jsx28(
      PopoverPrimitive4.Content,
      {
        align: "start",
        sideOffset: 4,
        className: "z-50 rounded-urvos-md border border-urvos-border bg-urvos-surface p-3 shadow-urvos-hover animate-in fade-in-0 zoom-in-95",
        children: /* @__PURE__ */ jsxs16("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs16("div", { className: "flex justify-center pt-1 relative items-center", children: [
            /* @__PURE__ */ jsx28(
              "button",
              {
                type: "button",
                onClick: () => setMonth((m) => addMonths2(m, -1)),
                className: "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt",
                children: /* @__PURE__ */ jsx28(ChevronLeft2, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx28("div", { className: "text-sm font-medium", children: format2(month, "MMMM yyyy") }),
            /* @__PURE__ */ jsx28(
              "button",
              {
                type: "button",
                onClick: () => setMonth((m) => addMonths2(m, 1)),
                className: "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex justify-center items-center rounded-urvos-sm hover:bg-urvos-surface-alt",
                children: /* @__PURE__ */ jsx28(ChevronRight2, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs16("table", { className: "w-full border-collapse space-y-1", children: [
            /* @__PURE__ */ jsx28("thead", { children: /* @__PURE__ */ jsx28("tr", { className: "flex w-full mt-2", children: dayNames2.map((n) => /* @__PURE__ */ jsx28(
              "th",
              {
                className: "text-urvos-ink-light rounded-md w-9 font-normal text-[0.8rem]",
                children: n
              },
              n
            )) }) }),
            /* @__PURE__ */ jsx28("tbody", { children: Array.from({ length: days.length / 7 }, (_, week) => /* @__PURE__ */ jsx28("tr", { className: "flex w-full mt-2", children: days.slice(week * 7, week * 7 + 7).map((day) => {
              const outside = !isSameMonth2(day, month);
              const selected = !!(value == null ? void 0 : value.from) && !!value.to && !isBefore2(day, value.from) && !isBefore2(value.to, day);
              const isFrom = !!(value == null ? void 0 : value.from) && isSameDay2(day, value.from);
              const isTo = !!(value == null ? void 0 : value.to) && isSameDay2(day, value.to);
              return /* @__PURE__ */ jsx28("td", { className: "h-9 w-9 text-center text-sm p-0 relative", children: /* @__PURE__ */ jsx28(
                "button",
                {
                  type: "button",
                  onClick: () => handleSelect(day),
                  className: clsx16(
                    "h-9 w-9 p-0 font-normal rounded-urvos-sm",
                    rangeClass(day),
                    (isFrom || isTo) && "bg-urvos-primary text-white hover:bg-urvos-primary hover:text-white",
                    !outside && !selected && !isFrom && !isTo && "hover:bg-urvos-surface-alt",
                    outside && "text-urvos-ink-light opacity-50"
                  ),
                  children: format2(day, "d")
                }
              ) }, day.toISOString());
            }) }, week)) })
          ] })
        ] })
      }
    ) })
  ] });
}

// components/ui/TimePicker.tsx
import * as React40 from "react";
import { Clock } from "lucide-react";
import { clsx as clsx17 } from "clsx";
import { jsx as jsx29, jsxs as jsxs17 } from "react/jsx-runtime";
var TimePicker = React40.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, value, onChange, error } = _b, props = __objRest(_b, ["className", "value", "onChange", "error"]);
    return /* @__PURE__ */ jsxs17("div", { className: "relative inline-flex items-center w-full max-w-[150px]", children: [
      /* @__PURE__ */ jsx29(Clock, { className: "absolute left-3 w-4 h-4 text-urvos-ink-light pointer-events-none" }),
      /* @__PURE__ */ jsx29(
        "input",
        __spreadValues({
          type: "time",
          ref,
          value,
          onChange: (e) => onChange == null ? void 0 : onChange(e.target.value),
          className: clsx17(
            "input pl-9",
            error && "input[data-state=error]",
            // simulate error state
            className
          )
        }, props)
      )
    ] });
  }
);
TimePicker.displayName = "TimePicker";

// components/ui/Feedback.tsx
import React41 from "react";
import { Fragment as Fragment6, jsx as jsx30, jsxs as jsxs18 } from "react/jsx-runtime";
function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
function Avatar({ name = "", src, size = "md", circle = true, status }) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };
  const px = sizeMap[size] || 40;
  return /* @__PURE__ */ jsxs18(
    "span",
    {
      className: `avatar avatar--${size} ${circle ? "avatar--circle" : ""} shrink-0`,
      style: { width: px, height: px, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: circle ? "50%" : "inherit", position: "relative", overflow: "hidden" },
      children: [
        src ? /* @__PURE__ */ jsx30("img", { src, alt: name, style: { width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" } }) : initials(name),
        status && /* @__PURE__ */ jsx30("span", { className: `avatar__status avatar__status--${status}`, "aria-label": status })
      ]
    }
  );
}
function AvatarGroup({ children, max }) {
  const childrenArray = React41.Children.toArray(children);
  const total = childrenArray.length;
  if (max && total > max) {
    const visible = childrenArray.slice(0, max);
    const overflow = total - max;
    return /* @__PURE__ */ jsxs18("div", { className: "avatar-group", children: [
      visible,
      /* @__PURE__ */ jsxs18("span", { className: "avatar-group__overflow", children: [
        "+",
        overflow
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx30("div", { className: "avatar-group", children });
}
function EmptyState({ icon, title, description, action, compact, variant = "light", className = "" }) {
  return /* @__PURE__ */ jsxs18("div", { className: `empty-state ${variant === "dark" ? "empty-state--dark" : ""} ${compact ? "empty-state--compact" : ""} ${className}`, children: [
    icon && !compact && /* @__PURE__ */ jsx30("div", { className: "empty-state__icon", children: icon }),
    /* @__PURE__ */ jsx30("div", { className: "empty-state__title", style: { fontFamily: compact ? "inherit" : void 0, fontSize: compact ? 12.5 : void 0, fontWeight: compact ? 700 : void 0 }, children: title }),
    description && /* @__PURE__ */ jsx30("p", { className: "empty-state__desc", children: description }),
    action
  ] });
}
function Skeleton({ className = "", size, style }) {
  const h = size === "sm" ? "h-3" : size === "lg" ? "h-5" : "h-4";
  return /* @__PURE__ */ jsx30("div", { className: `skeleton ${h} w-full ${className}`, style, "aria-hidden": "true" });
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxs18("div", { className: "skeleton-card", children: [
    /* @__PURE__ */ jsx30(Skeleton, { className: "w-1/3" }),
    /* @__PURE__ */ jsx30("div", { style: { height: 8 } }),
    /* @__PURE__ */ jsx30(Skeleton, { className: "w-3/4" }),
    /* @__PURE__ */ jsx30("div", { style: { height: 6 } }),
    /* @__PURE__ */ jsx30(Skeleton, { className: "w-1/2" })
  ] });
}
function SkeletonTableRows({ rows = 3, cols = 3 }) {
  return /* @__PURE__ */ jsx30(Fragment6, { children: Array.from({ length: rows }).map((_, r) => /* @__PURE__ */ jsx30("tr", { children: Array.from({ length: cols }).map((_2, c) => /* @__PURE__ */ jsx30("td", { children: /* @__PURE__ */ jsx30(Skeleton, { className: "w-full", style: { width: `${60 - c * 10}%` } }) }, c)) }, r)) });
}
function SkeletonCircle({ size = 32 }) {
  return /* @__PURE__ */ jsx30("div", { className: "skeleton rounded-full shrink-0", style: { width: size, height: size } });
}
function SkeletonTable({ rows = 5 }) {
  return /* @__PURE__ */ jsxs18("div", { className: "card overflow-hidden", children: [
    /* @__PURE__ */ jsx30("div", { className: "flex gap-6 px-5 py-3.5 border-b border-gray-100 bg-gray-50/80", children: [180, 80, 60, 120, 80, 100, 60].map((w, i) => /* @__PURE__ */ jsx30(Skeleton, { className: "h-3", style: { width: w } }, i)) }),
    Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-6 px-5 py-3.5 border-b border-gray-50", children: [
      /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-3 flex-[180px]", children: [
        /* @__PURE__ */ jsx30(SkeletonCircle, { size: 32 }),
        /* @__PURE__ */ jsxs18("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsx30(Skeleton, { className: "w-3/5 h-3.5" }),
          /* @__PURE__ */ jsx30(Skeleton, { className: "w-2/5 h-2.5" })
        ] })
      ] }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-16 h-5 flex-[80px]" }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-8 h-4 flex-[60px]" }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-24 h-7 flex-[120px]" }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-14 h-5 flex-[80px]" }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-16 h-4 flex-[100px]" }),
      /* @__PURE__ */ jsx30(Skeleton, { className: "w-10 h-8 flex-[60px]" })
    ] }, i))
  ] });
}

// components/ui/Alert.tsx
import { useState as useState17 } from "react";
import { cva as cva10 } from "class-variance-authority";
import { clsx as clsx18 } from "clsx";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X as X6 } from "lucide-react";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var alertVariants = cva10("alert", {
  variants: {
    variant: {
      info: "alert--info",
      success: "alert--success",
      warning: "alert--warning",
      error: "alert--error"
    }
  },
  defaultVariants: { variant: "info" }
});
var ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle
};
function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  icon,
  action,
  className,
  onDismiss
}) {
  const [dismissed, setDismissed] = useState17(false);
  if (dismissed) return null;
  const IconComponent = ICONS[variant != null ? variant : "info"];
  const handleDismiss = () => {
    setDismissed(true);
    onDismiss == null ? void 0 : onDismiss();
  };
  return /* @__PURE__ */ jsxs19("div", { role: "alert", className: clsx18(alertVariants({ variant }), className), children: [
    /* @__PURE__ */ jsx31("span", { className: "alert__icon", children: icon != null ? icon : /* @__PURE__ */ jsx31(IconComponent, { style: { width: 20, height: 20 } }) }),
    /* @__PURE__ */ jsxs19("div", { className: "alert__body", children: [
      title && /* @__PURE__ */ jsx31("div", { className: "alert__title", children: title }),
      children && /* @__PURE__ */ jsx31("div", { className: "alert__desc", children }),
      action && /* @__PURE__ */ jsx31("div", { className: "alert__action", children: action })
    ] }),
    dismissible && /* @__PURE__ */ jsx31(
      "button",
      {
        className: "alert__close",
        "aria-label": "Dismiss alert",
        onClick: handleDismiss,
        children: /* @__PURE__ */ jsx31(X6, { style: { width: 16, height: 16 } })
      }
    )
  ] });
}
var AlertInfo = (p) => /* @__PURE__ */ jsx31(Alert, __spreadProps(__spreadValues({}, p), { variant: "info" }));
var AlertSuccess = (p) => /* @__PURE__ */ jsx31(Alert, __spreadProps(__spreadValues({}, p), { variant: "success" }));
var AlertWarning = (p) => /* @__PURE__ */ jsx31(Alert, __spreadProps(__spreadValues({}, p), { variant: "warning" }));
var AlertError = (p) => /* @__PURE__ */ jsx31(Alert, __spreadProps(__spreadValues({}, p), { variant: "error" }));

// components/ui/Spinner.tsx
import { cva as cva11 } from "class-variance-authority";
import { clsx as clsx19 } from "clsx";
import { jsx as jsx32 } from "react/jsx-runtime";
var spinnerVariants = cva11("spinner", {
  variants: {
    size: {
      xs: "spinner--xs",
      sm: "spinner--sm",
      md: "spinner--md",
      lg: "spinner--lg",
      xl: "spinner--xl"
    },
    color: {
      primary: "",
      // default — uses var(--brand-solid)
      white: "spinner--white",
      muted: "spinner--muted"
    }
  },
  defaultVariants: { size: "md", color: "primary" }
});
function Spinner({ size, color, label = "Loading\u2026", className }) {
  return /* @__PURE__ */ jsx32(
    "span",
    {
      role: "status",
      "aria-label": label,
      className: clsx19(spinnerVariants({ size, color }), className)
    }
  );
}

// components/ui/Progress.tsx
import { clsx as clsx20 } from "clsx";
import { jsx as jsx33, jsxs as jsxs20 } from "react/jsx-runtime";
var colorMap = {
  default: "",
  success: "progress__bar--success",
  warning: "progress__bar--warning",
  danger: "progress__bar--danger",
  gradient: "progress__bar--gradient"
};
function Progress({
  value,
  size = "md",
  color = "default",
  label,
  showValue = false,
  className
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsx33("div", { className: clsx20("progress", `progress--${size}`, className), children: /* @__PURE__ */ jsx33(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clampedValue,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": label != null ? label : `${clampedValue}%`,
      className: clsx20("progress__bar", colorMap[color]),
      style: { width: `${clampedValue}%` }
    }
  ) });
}
function LabelledProgress(_a) {
  var _b = _a, { label, showValue = true } = _b, rest = __objRest(_b, ["label", "showValue"]);
  const clampedValue = Math.min(100, Math.max(0, rest.value));
  return /* @__PURE__ */ jsxs20("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    /* @__PURE__ */ jsxs20("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx33("span", { className: "label", children: label }),
      showValue && /* @__PURE__ */ jsxs20("span", { className: "caption", children: [
        clampedValue,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx33(Progress, __spreadProps(__spreadValues({}, rest), { label }))
  ] });
}

// components/ui/StatCard.tsx
import { clsx as clsx21 } from "clsx";
import { TrendingUp, TrendingDown, Minus as Minus2 } from "lucide-react";
import { jsx as jsx34, jsxs as jsxs21 } from "react/jsx-runtime";
var DELTA_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus2
};
function StatCard({
  title,
  value,
  delta,
  deltaDir = "up",
  deltaLabel,
  icon,
  iconBg,
  footer,
  sparkline,
  className
}) {
  const DeltaIcon = DELTA_ICONS[deltaDir];
  return /* @__PURE__ */ jsxs21("div", { className: clsx21("stat-card", className), children: [
    /* @__PURE__ */ jsxs21("div", { className: "stat-card__header", children: [
      /* @__PURE__ */ jsx34("span", { className: "stat-card__title", children: title }),
      icon && /* @__PURE__ */ jsx34("span", { className: "stat-card__icon", style: { backgroundColor: iconBg }, children: icon })
    ] }),
    /* @__PURE__ */ jsx34("div", { className: "stat-card__value", children: value }),
    (delta !== void 0 || deltaLabel) && /* @__PURE__ */ jsxs21("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
      /* @__PURE__ */ jsxs21("span", { className: clsx21("stat-card__delta", `stat-card__delta--${deltaDir}`), children: [
        /* @__PURE__ */ jsx34(DeltaIcon, { style: { width: 13, height: 13 } }),
        delta
      ] }),
      deltaLabel && /* @__PURE__ */ jsx34("span", { className: "stat-card__footer", children: deltaLabel })
    ] }),
    footer && !deltaLabel && /* @__PURE__ */ jsx34("div", { className: "stat-card__footer", children: footer }),
    sparkline && /* @__PURE__ */ jsx34("div", { className: "stat-card__sparkline", children: sparkline })
  ] });
}

// components/ui/Timeline.tsx
import { clsx as clsx22 } from "clsx";
import { CheckCircle as CheckCircle2, AlertCircle as AlertCircle2, AlertTriangle as AlertTriangle2, Info as Info2 } from "lucide-react";
import { jsx as jsx35, jsxs as jsxs22 } from "react/jsx-runtime";
var DEFAULT_ICONS = {
  info: Info2,
  success: CheckCircle2,
  warning: AlertTriangle2,
  error: AlertCircle2
};
var ICON_COLORS = {
  info: "var(--sig-info)",
  success: "var(--sig-success)",
  warning: "var(--sig-caution)",
  error: "var(--sig-critical)"
};
function Timeline({ events, className }) {
  return /* @__PURE__ */ jsx35("div", { className: clsx22("timeline", className), children: events.map((event) => {
    var _a, _b;
    const variant = (_a = event.variant) != null ? _a : "info";
    const IconComponent = DEFAULT_ICONS[variant];
    const iconColor = ICON_COLORS[variant];
    return /* @__PURE__ */ jsxs22("div", { className: "timeline__item", children: [
      /* @__PURE__ */ jsxs22("div", { className: "timeline__aside", children: [
        /* @__PURE__ */ jsx35("div", { className: clsx22("timeline__dot", `timeline__dot--${variant}`), children: (_b = event.icon) != null ? _b : /* @__PURE__ */ jsx35(
          IconComponent,
          {
            style: { width: 16, height: 16, color: iconColor }
          }
        ) }),
        /* @__PURE__ */ jsx35("div", { className: "timeline__connector" })
      ] }),
      /* @__PURE__ */ jsxs22("div", { className: "timeline__content", children: [
        /* @__PURE__ */ jsx35("div", { className: "timeline__date", children: event.date }),
        /* @__PURE__ */ jsx35("div", { className: "timeline__title", children: event.title }),
        event.description && /* @__PURE__ */ jsx35("div", { className: "timeline__desc", children: event.description }),
        event.badge && /* @__PURE__ */ jsx35("div", { className: "timeline__badge", children: event.badge })
      ] })
    ] }, event.id);
  }) });
}

// components/ui/Accordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown as ChevronDown3 } from "lucide-react";
import { clsx as clsx23 } from "clsx";
import { jsx as jsx36, jsxs as jsxs23 } from "react/jsx-runtime";
function Accordion({
  items,
  type = "single",
  defaultOpen,
  className
}) {
  const sharedProps = {
    className: clsx23("w-full", className),
    collapsible: true
  };
  if (type === "multiple") {
    return /* @__PURE__ */ jsx36(
      AccordionPrimitive.Root,
      __spreadProps(__spreadValues({
        type: "multiple",
        defaultValue: Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : void 0
      }, sharedProps), {
        children: items.map((item) => /* @__PURE__ */ jsx36(AccordionItem, { item }, item.id))
      })
    );
  }
  return /* @__PURE__ */ jsx36(
    AccordionPrimitive.Root,
    {
      type: "single",
      defaultValue: Array.isArray(defaultOpen) ? defaultOpen[0] : defaultOpen,
      collapsible: true,
      className: clsx23("w-full", className),
      children: items.map((item) => /* @__PURE__ */ jsx36(AccordionItem, { item }, item.id))
    }
  );
}
function AccordionItem({ item }) {
  return /* @__PURE__ */ jsxs23(
    AccordionPrimitive.Item,
    {
      value: item.id,
      className: "border-b border-urvos-border",
      disabled: item.disabled,
      children: [
        /* @__PURE__ */ jsx36(AccordionPrimitive.Header, { className: "flex", asChild: true, children: /* @__PURE__ */ jsxs23(AccordionPrimitive.Trigger, { className: "flex w-full flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", children: [
          item.title,
          /* @__PURE__ */ jsx36(ChevronDown3, { className: "h-4 w-4 shrink-0 transition-transform duration-200", "aria-hidden": true })
        ] }) }),
        /* @__PURE__ */ jsx36(AccordionPrimitive.Content, { className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: /* @__PURE__ */ jsx36("div", { className: "pb-4 pt-0", children: item.content }) })
      ]
    }
  );
}

// components/ui/Slider.tsx
import * as SliderPrimitive from "@radix-ui/react-slider";
import { clsx as clsx24 } from "clsx";
import { jsx as jsx37, jsxs as jsxs24 } from "react/jsx-runtime";
function Slider({
  value,
  defaultValue = [50],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  onValueCommit,
  showValue = false,
  label,
  className
}) {
  const current = value != null ? value : defaultValue;
  return /* @__PURE__ */ jsxs24("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, className, children: [
    label && /* @__PURE__ */ jsxs24("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsx37("span", { className: "label", children: label }),
      showValue && /* @__PURE__ */ jsx37("span", { className: "caption", children: current.join(" \u2013 ") })
    ] }),
    /* @__PURE__ */ jsxs24(
      SliderPrimitive.Root,
      {
        className: clsx24("slider", disabled && "slider--disabled"),
        value,
        defaultValue,
        min,
        max,
        step,
        disabled,
        onValueChange,
        onValueCommit,
        "aria-label": label,
        children: [
          /* @__PURE__ */ jsx37(SliderPrimitive.Track, { className: "slider__track", children: /* @__PURE__ */ jsx37(SliderPrimitive.Range, { className: "slider__range" }) }),
          current.map((_, i) => /* @__PURE__ */ jsx37(SliderPrimitive.Thumb, { className: "slider__thumb" }, i))
        ]
      }
    ),
    !label && showValue && /* @__PURE__ */ jsx37("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx37("span", { className: "caption", children: current.join(" \u2013 ") }) })
  ] });
}

// components/ui/DropdownMenu.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx as clsx25 } from "clsx";
import { jsx as jsx38, jsxs as jsxs25 } from "react/jsx-runtime";
function DropdownMenu({
  trigger,
  items,
  groups,
  align = "end",
  side = "bottom",
  className
}) {
  const resolvedGroups = groups != null ? groups : items ? [{ items }] : [];
  return /* @__PURE__ */ jsxs25(DropdownMenuPrimitive.Root, { children: [
    /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx38(
      DropdownMenuPrimitive.Content,
      {
        align,
        side,
        sideOffset: 6,
        className: clsx25("dropdown-content", className),
        collisionPadding: 12,
        children: resolvedGroups.map((group, gi) => /* @__PURE__ */ jsxs25(DropdownMenuPrimitive.Group, { children: [
          group.label && /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Label, { className: "dropdown-label", children: group.label }),
          group.items.map((item, ii) => {
            if (item.type === "separator") {
              return /* @__PURE__ */ jsx38(
                DropdownMenuPrimitive.Separator,
                {
                  className: "dropdown-separator"
                },
                ii
              );
            }
            return /* @__PURE__ */ jsxs25(
              DropdownMenuPrimitive.Item,
              {
                disabled: item.disabled,
                onSelect: item.onSelect,
                className: clsx25(
                  "dropdown-item",
                  item.danger && "dropdown-item--danger"
                ),
                children: [
                  item.icon && /* @__PURE__ */ jsx38("span", { className: "dropdown-item__icon", children: item.icon }),
                  item.label,
                  item.shortcut && /* @__PURE__ */ jsx38("span", { className: "dropdown-item__shortcut", children: item.shortcut })
                ]
              },
              ii
            );
          }),
          gi < resolvedGroups.length - 1 && /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Separator, { className: "dropdown-separator" })
        ] }, gi))
      }
    ) })
  ] });
}
var DropdownMenuRoot = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuContent = DropdownMenuPrimitive.Content;
var DropdownMenuItem = DropdownMenuPrimitive.Item;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
var DropdownMenuLabel = DropdownMenuPrimitive.Label;

// components/ui/CommandPalette.tsx
import { useState as useState18, useEffect as useEffect15, useCallback as useCallback8 } from "react";
import { Search as Search2 } from "lucide-react";
import { clsx as clsx26 } from "clsx";
import { jsx as jsx39, jsxs as jsxs26 } from "react/jsx-runtime";
function CommandPalette({
  items,
  placeholder = "Search commands\u2026",
  open: controlledOpen,
  onOpenChange,
  className
}) {
  const [internalOpen, setInternalOpen] = useState18(false);
  const [query, setQuery] = useState18("");
  const [selectedIndex, setSelectedIndex] = useState18(0);
  const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const setOpen = useCallback8(
    (val) => {
      setInternalOpen(val);
      onOpenChange == null ? void 0 : onOpenChange(val);
      if (!val) setQuery("");
    },
    [onOpenChange]
  );
  useEffect15(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setOpen]);
  const filtered = items.filter((item) => {
    var _a, _b;
    if (!query) return true;
    const q = query.toLowerCase();
    return item.label.toLowerCase().includes(q) || ((_a = item.group) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = item.keywords) == null ? void 0 : _b.some((k) => k.toLowerCase().includes(q)));
  });
  const grouped = filtered.reduce((acc, item) => {
    var _a;
    const g = (_a = item.group) != null ? _a : "Actions";
    if (!acc[g]) acc[g] = [];
    acc[g].push(item);
    return acc;
  }, {});
  const handleKeyDown = (e) => {
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
  return /* @__PURE__ */ jsx39(
    "div",
    {
      className: "command-palette__overlay",
      role: "dialog",
      "aria-modal": true,
      "aria-label": "Command palette",
      onClick: (e) => e.target === e.currentTarget && setOpen(false),
      children: /* @__PURE__ */ jsxs26("div", { className: clsx26("command-palette", className), onKeyDown: handleKeyDown, children: [
        /* @__PURE__ */ jsxs26("div", { className: "command-palette__search", children: [
          /* @__PURE__ */ jsx39(Search2, { className: "command-palette__search-icon" }),
          /* @__PURE__ */ jsx39(
            "input",
            {
              autoFocus: true,
              className: "command-palette__input",
              placeholder,
              value: query,
              onChange: (e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }
            }
          ),
          /* @__PURE__ */ jsx39("kbd", { className: "command-palette__kbd", children: "ESC" })
        ] }),
        /* @__PURE__ */ jsx39("div", { className: "command-palette__list", role: "listbox", children: filtered.length === 0 ? /* @__PURE__ */ jsxs26("div", { className: "command-palette__empty", children: [
          "No results for \u201C",
          query,
          "\u201D"
        ] }) : Object.entries(grouped).map(([group, groupItems]) => /* @__PURE__ */ jsxs26("div", { children: [
          /* @__PURE__ */ jsx39("div", { className: "command-palette__group-label", children: group }),
          groupItems.map((item) => {
            const itemIdx = flatIndex++;
            return /* @__PURE__ */ jsxs26(
              "div",
              {
                role: "option",
                "aria-selected": itemIdx === selectedIndex,
                className: clsx26(
                  "command-palette__item",
                  itemIdx === selectedIndex && "command-palette__item--selected"
                ),
                onMouseEnter: () => setSelectedIndex(itemIdx),
                onClick: () => {
                  item.onSelect();
                  setOpen(false);
                },
                children: [
                  item.icon && /* @__PURE__ */ jsx39("span", { className: "command-palette__item-icon", children: item.icon }),
                  item.label,
                  item.shortcut && /* @__PURE__ */ jsx39("kbd", { className: "command-palette__item-shortcut", children: item.shortcut })
                ]
              },
              item.id
            );
          })
        ] }, group)) }),
        /* @__PURE__ */ jsxs26("div", { className: "command-palette__footer", children: [
          /* @__PURE__ */ jsxs26("span", { className: "command-palette__footer-hint", children: [
            /* @__PURE__ */ jsx39("kbd", { className: "command-palette__kbd", children: "\u2191\u2193" }),
            " Navigate"
          ] }),
          /* @__PURE__ */ jsxs26("span", { className: "command-palette__footer-hint", children: [
            /* @__PURE__ */ jsx39("kbd", { className: "command-palette__kbd", children: "\u21B5" }),
            " Select"
          ] }),
          /* @__PURE__ */ jsxs26("span", { className: "command-palette__footer-hint", children: [
            /* @__PURE__ */ jsx39("kbd", { className: "command-palette__kbd", children: "ESC" }),
            " Close"
          ] })
        ] })
      ] })
    }
  );
}

// components/ui/TreeView.tsx
import { useState as useState19 } from "react";
import { ChevronRight as ChevronRight3, Folder, FolderOpen, FileText } from "lucide-react";
import { clsx as clsx27 } from "clsx";
import { jsx as jsx40, jsxs as jsxs27 } from "react/jsx-runtime";
function TreeNodeRow({
  node,
  selectedId,
  onSelect,
  expanded,
  onToggle,
  depth = 0
}) {
  var _a;
  const isLeaf = !node.children || node.children.length === 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;
  const DefaultIcon = isLeaf ? FileText : isExpanded ? FolderOpen : Folder;
  return /* @__PURE__ */ jsxs27("div", { children: [
    /* @__PURE__ */ jsxs27(
      "div",
      {
        role: "treeitem",
        "aria-selected": isSelected,
        "aria-expanded": !isLeaf ? isExpanded : void 0,
        className: clsx27("tree__node", isSelected && "tree__node--selected"),
        style: { paddingLeft: `${8 + depth * 16}px` },
        onClick: () => {
          onSelect == null ? void 0 : onSelect(node.id);
          if (!isLeaf) onToggle(node.id);
        },
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect == null ? void 0 : onSelect(node.id);
            if (!isLeaf) onToggle(node.id);
          }
        },
        tabIndex: 0,
        children: [
          /* @__PURE__ */ jsx40(
            ChevronRight3,
            {
              className: clsx27(
                "tree__expand-icon",
                isLeaf && "tree__expand-icon--leaf",
                isExpanded && "tree__expand-icon--open"
              )
            }
          ),
          /* @__PURE__ */ jsx40("span", { className: "tree__node-icon", style: { color: isSelected ? "var(--brand-solid)" : "var(--text-3)" }, children: (_a = node.icon) != null ? _a : /* @__PURE__ */ jsx40(DefaultIcon, { style: { width: 16, height: 16 } }) }),
          node.label
        ]
      }
    ),
    !isLeaf && isExpanded && /* @__PURE__ */ jsx40("div", { className: "tree__children", role: "group", children: node.children.map((child) => /* @__PURE__ */ jsx40(
      TreeNodeRow,
      {
        node: child,
        selectedId,
        onSelect,
        expanded,
        onToggle,
        depth: depth + 1
      },
      child.id
    )) })
  ] });
}
function TreeView({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded = [],
  className
}) {
  const [expanded, setExpanded] = useState19(
    new Set(defaultExpanded)
  );
  const toggle = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return /* @__PURE__ */ jsx40("div", { role: "tree", className: clsx27("tree", className), children: nodes.map((node) => /* @__PURE__ */ jsx40(
    TreeNodeRow,
    {
      node,
      selectedId,
      onSelect,
      expanded,
      onToggle: toggle
    },
    node.id
  )) });
}

// components/ui/Typography.tsx
import { clsx as clsx28 } from "clsx";
import { jsx as jsx41, jsxs as jsxs28 } from "react/jsx-runtime";
function Heading({ level = 2, children, className }) {
  const Tag2 = `h${level}`;
  return /* @__PURE__ */ jsx41(Tag2, { className: clsx28("heading", `heading--${level}`, className), children });
}
function BodyText({
  size = "md",
  color = "default",
  as: Tag2 = "p",
  children,
  className
}) {
  return /* @__PURE__ */ jsx41(
    Tag2,
    {
      className: clsx28(
        "body-text",
        `body-text--${size}`,
        color !== "default" && `body-text--${color}`,
        className
      ),
      children
    }
  );
}
function Caption({ children, className }) {
  return /* @__PURE__ */ jsx41("span", { className: clsx28("caption", className), children });
}
function Label3({ children, htmlFor, className }) {
  return /* @__PURE__ */ jsx41("label", { htmlFor, className: clsx28("label", className), children });
}
function Code({ children, className }) {
  return /* @__PURE__ */ jsx41("code", { className: clsx28("code", className), children });
}
function CodeBlock({ children, language, className }) {
  return /* @__PURE__ */ jsx41("pre", { className: clsx28("code-block", className), "data-language": language, children: /* @__PURE__ */ jsx41("code", { children }) });
}
function TypographySpecimen() {
  return /* @__PURE__ */ jsxs28("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx41(Heading, { level: 1, children: "Display Heading (H1)" }),
    /* @__PURE__ */ jsx41(Heading, { level: 2, children: "Section Heading (H2)" }),
    /* @__PURE__ */ jsx41(Heading, { level: 3, children: "Subsection Heading (H3)" }),
    /* @__PURE__ */ jsx41(Heading, { level: 4, children: "Card Title (H4)" }),
    /* @__PURE__ */ jsx41("hr", { style: { border: "none", borderTop: "1px solid var(--border)", margin: "4px 0" } }),
    /* @__PURE__ */ jsx41(BodyText, { size: "lg", children: "Large body \u2014 17px. Optimised for reading comfort." }),
    /* @__PURE__ */ jsx41(BodyText, { size: "md", children: "Medium body \u2014 15px. Default size for paragraphs." }),
    /* @__PURE__ */ jsx41(BodyText, { size: "sm", children: "Small body \u2014 14px. Form helper text, descriptions." }),
    /* @__PURE__ */ jsx41(BodyText, { size: "xs", children: "XS body \u2014 13px. Table cells, dense data." }),
    /* @__PURE__ */ jsx41(BodyText, { size: "md", color: "muted", children: "Muted text \u2014 reduced emphasis." }),
    /* @__PURE__ */ jsx41(BodyText, { size: "md", color: "subtle", children: "Subtle text \u2014 timestamps, meta." }),
    /* @__PURE__ */ jsx41("hr", { style: { border: "none", borderTop: "1px solid var(--border)", margin: "4px 0" } }),
    /* @__PURE__ */ jsx41(Caption, { children: "Caption \u2014 12px. Image captions, footnotes." }),
    /* @__PURE__ */ jsx41(Label3, { children: "Form Label \u2014 13px bold" }),
    /* @__PURE__ */ jsxs28("div", { children: [
      /* @__PURE__ */ jsx41(Code, { children: "inline code" }),
      " ",
      /* @__PURE__ */ jsx41("span", { className: "body-text body-text--sm", children: " \u2190 inline code component" })
    ] }),
    /* @__PURE__ */ jsx41(CodeBlock, { language: "tsx", children: `function hello() {
  return "World";
}` })
  ] });
}

// components/ui/Popover.tsx
import * as React42 from "react";
import * as PopoverPrimitive5 from "@radix-ui/react-popover";
import { clsx as clsx29 } from "clsx";
import { jsx as jsx42 } from "react/jsx-runtime";
var Popover = PopoverPrimitive5.Root;
var PopoverTrigger = PopoverPrimitive5.Trigger;
var PopoverContent = React42.forwardRef((_a, ref) => {
  var _b = _a, { className, align = "center", sideOffset = 4 } = _b, props = __objRest(_b, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ jsx42(PopoverPrimitive5.Portal, { children: /* @__PURE__ */ jsx42(
    PopoverPrimitive5.Content,
    __spreadValues({
      ref,
      align,
      sideOffset,
      className: clsx29("popover-content", className)
    }, props)
  ) });
});
PopoverContent.displayName = PopoverPrimitive5.Content.displayName;

// components/ui/ToggleGroup.tsx
import { createContext as createContext4, useContext as useContext3 } from "react";
import { clsx as clsx30 } from "clsx";
import { jsx as jsx43 } from "react/jsx-runtime";
var ToggleGroupContext = createContext4({});
function ToggleGroup({
  type = "single",
  value,
  onValueChange,
  size = "default",
  variant = "default",
  children,
  className
}) {
  return /* @__PURE__ */ jsx43(ToggleGroupContext.Provider, { value: { type, value, onValueChange, size, variant }, children: /* @__PURE__ */ jsx43("div", { className: clsx30("inline-flex items-center justify-center gap-1 rounded-md p-1 bg-urvos-surface-muted border border-urvos-border", className), children }) });
}
function ToggleGroupItem(_a) {
  var _b = _a, { value: itemValue, children, className } = _b, props = __objRest(_b, ["value", "children", "className"]);
  const { type, value, onValueChange, size, variant } = useContext3(ToggleGroupContext);
  const isSelected = type === "single" ? value === itemValue : Array.isArray(value) && value.includes(itemValue);
  const handleClick = (e) => {
    var _a2;
    (_a2 = props.onClick) == null ? void 0 : _a2.call(props, e);
    if (!onValueChange) return;
    if (type === "single") {
      onValueChange(itemValue);
    } else if (Array.isArray(value)) {
      if (value.includes(itemValue)) {
        onValueChange(value.filter((v) => v !== itemValue));
      } else {
        onValueChange([...value, itemValue]);
      }
    } else {
      onValueChange([itemValue]);
    }
  };
  const sizeClasses = size === "sm" ? "h-7 px-2 text-xs" : size === "lg" ? "h-10 px-4 text-base" : "h-8 px-3 text-sm";
  return /* @__PURE__ */ jsx43(
    "button",
    __spreadProps(__spreadValues({
      type: "button",
      onClick: handleClick,
      "aria-pressed": isSelected,
      className: clsx30(
        "inline-flex items-center justify-center rounded transition-all font-medium focus:outline-none focus:ring-2 focus:ring-urvos-primary disabled:opacity-50",
        sizeClasses,
        isSelected ? "bg-urvos-primary text-white shadow-sm" : "text-urvos-text hover:bg-urvos-surface hover:text-urvos-primary",
        variant === "outline" && !isSelected && "border border-urvos-border",
        className
      )
    }, props), {
      children
    })
  );
}

// components/layout/Layout.tsx
import React44 from "react";
import { clsx as clsx31 } from "clsx";
import { jsx as jsx44, jsxs as jsxs29 } from "react/jsx-runtime";
var Container = React44.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, size = "lg", centered = true, fluid, children } = _b, props = __objRest(_b, ["className", "size", "centered", "fluid", "children"]);
    return /* @__PURE__ */ jsx44(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx31(
          "w-full px-4 sm:px-6 lg:px-8",
          centered && !fluid && "mx-auto",
          fluid && "max-w-none",
          {
            "max-w-3xl": size === "sm",
            "max-w-5xl": size === "md",
            "max-w-7xl": size === "lg",
            "max-w-screen-2xl": size === "xl",
            "max-w-none": size === "full"
          },
          className
        )
      }, props), {
        children
      })
    );
  }
);
Container.displayName = "Container";
var Section = React44.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, title, description, headerAction, spacing = "md", children } = _b, props = __objRest(_b, ["className", "title", "description", "headerAction", "spacing", "children"]);
    return /* @__PURE__ */ jsxs29(
      "section",
      __spreadProps(__spreadValues({
        ref,
        className: clsx31(
          "w-full",
          {
            "py-4": spacing === "sm",
            "py-8": spacing === "md",
            "py-12": spacing === "lg",
            "py-0": spacing === "none"
          },
          className
        )
      }, props), {
        children: [
          (title || description || headerAction) && /* @__PURE__ */ jsxs29("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
            /* @__PURE__ */ jsxs29("div", { className: "space-y-1", children: [
              title && /* @__PURE__ */ jsx44("h2", { className: "text-xl font-semibold text-urvos-ink", children: title }),
              description && /* @__PURE__ */ jsx44("p", { className: "text-sm text-urvos-text-muted", children: description })
            ] }),
            headerAction && /* @__PURE__ */ jsx44("div", { className: "flex-shrink-0", children: headerAction })
          ] }),
          /* @__PURE__ */ jsx44("div", { children })
        ]
      })
    );
  }
);
Section.displayName = "Section";

// components/layout/EnterpriseTopBar.tsx
import { Search as Search3, Mic, ShieldAlert, CheckSquare, MessageSquare, Bell, Lock, Activity } from "lucide-react";
import { jsx as jsx45, jsxs as jsxs30 } from "react/jsx-runtime";
function EnterpriseTopBar({
  logo,
  tenantName,
  rbacColorTheme = "#3b82f6",
  // Brand blue as fallback
  onSearchTrigger,
  isDictating = false,
  onDictationToggle,
  showBTG = false,
  onBTGClick,
  taskCount = 0,
  chatUnreadCount = 0,
  notificationBadge = false,
  notificationCount = 0,
  idleTimeRemaining = null,
  onLockNow,
  userDropdownElement,
  userSettingsElement,
  tasks = [],
  messages: messages2 = [],
  notifications = []
}) {
  const DefaultLogo = /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-2 select-none cursor-pointer group", children: [
    /* @__PURE__ */ jsxs30("div", { className: "relative flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300", children: [
      /* @__PURE__ */ jsx45(Activity, { className: "size-5 text-white" }),
      /* @__PURE__ */ jsx45("div", { className: "absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
    ] }),
    /* @__PURE__ */ jsx45("span", { className: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight", children: "Urvos" })
  ] });
  return /* @__PURE__ */ jsxs30(
    "header",
    {
      className: "sticky top-0 z-50 flex h-[64px] shrink-0 items-center justify-between px-6 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all duration-300",
      children: [
        /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-5 min-w-[250px] shrink-0", children: [
          logo || DefaultLogo,
          /* @__PURE__ */ jsx45(
            "div",
            {
              className: "flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 max-w-[150px] sm:max-w-[220px]",
              style: {
                background: `linear-gradient(135deg, ${rbacColorTheme}, ${rbacColorTheme}dd)`,
                boxShadow: `0 4px 14px 0 ${rbacColorTheme}40`
              },
              title: tenantName,
              children: /* @__PURE__ */ jsx45("span", { className: "truncate block w-full", children: tenantName })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs30("div", { className: "flex flex-1 items-center justify-center gap-3 max-w-[600px] px-4", children: [
          /* @__PURE__ */ jsxs30(
            "button",
            {
              onClick: onSearchTrigger,
              className: "group relative flex h-10 flex-1 items-center rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 text-[13.5px] text-slate-500 transition-all duration-300 hover:bg-slate-100/50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500",
              children: [
                /* @__PURE__ */ jsx45(Search3, { className: "mr-2.5 size-4 text-slate-400 group-hover:text-blue-500 transition-colors" }),
                /* @__PURE__ */ jsx45("span", { className: "font-medium text-slate-400 group-hover:text-slate-600 transition-colors", children: "Search patient, orders, protocols..." }),
                /* @__PURE__ */ jsx45("div", { className: "absolute right-2 flex items-center gap-1", children: /* @__PURE__ */ jsxs30("kbd", { className: "hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400", children: [
                  /* @__PURE__ */ jsx45("span", { className: "text-xs", children: "\u2318" }),
                  "K"
                ] }) })
              ]
            }
          ),
          onDictationToggle && /* @__PURE__ */ jsxs30(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: `relative size-12 rounded-xl transition-all duration-300 ${isDictating ? "bg-red-50 text-red-600 hover:bg-red-100 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-700"}`,
              onClick: onDictationToggle,
              "aria-label": "Toggle Dictation",
              children: [
                /* @__PURE__ */ jsx45(Mic, { className: `size-10 stroke-[1.5] ${isDictating ? "animate-pulse" : ""}` }),
                isDictating && /* @__PURE__ */ jsxs30("span", { className: "absolute -top-1 -right-1 flex size-3", children: [
                  /* @__PURE__ */ jsx45("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                  /* @__PURE__ */ jsx45("span", { className: "relative inline-flex rounded-full size-3 bg-red-500 border-2 border-white" })
                ] })
              ]
            }
          ),
          showBTG && /* @__PURE__ */ jsxs30(
            Button,
            {
              intent: "danger",
              className: "flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold h-10 px-4 rounded-xl shadow-[0_4px_12px_rgba(225,29,72,0.25)] hover:shadow-[0_6px_16px_rgba(225,29,72,0.4)] transition-all duration-300 hover:-translate-y-0.5",
              onClick: onBTGClick,
              children: [
                /* @__PURE__ */ jsx45(ShieldAlert, { className: "size-4.5" }),
                /* @__PURE__ */ jsx45("span", { className: "tracking-wide", children: "Break-The-Glass" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-2 min-w-[250px] justify-end", children: [
          /* @__PURE__ */ jsxs30(Popover, { children: [
            /* @__PURE__ */ jsx45(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs30("div", { className: "relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-blue-600 transition-all duration-200", children: [
              /* @__PURE__ */ jsx45(CheckSquare, { className: "size-6 stroke-[1.5]" }),
              taskCount !== void 0 && taskCount > 0 && /* @__PURE__ */ jsx45("span", { className: "absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-blue-600 text-white border-2 border-white rounded-full shadow-sm", children: taskCount > 99 ? "99+" : taskCount })
            ] }) }),
            /* @__PURE__ */ jsxs30(PopoverContent, { className: "w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden", align: "end", children: [
              /* @__PURE__ */ jsxs30("div", { className: "px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10", children: [
                /* @__PURE__ */ jsx45("h3", { className: "font-semibold text-slate-800 text-sm", children: "Tasks" }),
                /* @__PURE__ */ jsx45("span", { className: "text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800", children: "Filter" })
              ] }),
              /* @__PURE__ */ jsx45("div", { className: "max-h-[60vh] overflow-y-auto", children: tasks.length > 0 ? tasks.map((task) => /* @__PURE__ */ jsx45("div", { className: "px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors group", children: /* @__PURE__ */ jsxs30("div", { className: "flex justify-between items-start gap-2", children: [
                /* @__PURE__ */ jsxs30("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx45("p", { className: "text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors", children: task.title }),
                  task.patientName && /* @__PURE__ */ jsx45("p", { className: "text-xs text-slate-500 mt-0.5 truncate", children: task.patientName })
                ] }),
                /* @__PURE__ */ jsxs30("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                  task.dueTime && /* @__PURE__ */ jsx45("span", { className: "text-[10px] text-slate-400 font-medium", children: task.dueTime }),
                  task.urgency === "high" && /* @__PURE__ */ jsx45("div", { className: "size-2 rounded-full bg-rose-500" }),
                  task.urgency === "medium" && /* @__PURE__ */ jsx45("div", { className: "size-2 rounded-full bg-amber-500" })
                ] })
              ] }) }, task.id)) : /* @__PURE__ */ jsx45("div", { className: "px-4 py-8 text-center text-sm text-slate-500", children: "No pending tasks" }) }),
              /* @__PURE__ */ jsx45("div", { className: "px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsx45("span", { className: "text-sm text-blue-600 font-medium cursor-pointer hover:underline", children: "View all tasks" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs30(Popover, { children: [
            /* @__PURE__ */ jsx45(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs30("div", { className: "relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-emerald-600 transition-all duration-200", children: [
              /* @__PURE__ */ jsx45(MessageSquare, { className: "size-6 stroke-[1.5]" }),
              chatUnreadCount !== void 0 && chatUnreadCount > 0 && /* @__PURE__ */ jsx45("span", { className: "absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-emerald-500 text-white border-2 border-white rounded-full shadow-sm", children: chatUnreadCount > 99 ? "99+" : chatUnreadCount })
            ] }) }),
            /* @__PURE__ */ jsxs30(PopoverContent, { className: "w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden", align: "end", children: [
              /* @__PURE__ */ jsxs30("div", { className: "px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10", children: [
                /* @__PURE__ */ jsx45("h3", { className: "font-semibold text-slate-800 text-sm", children: "Messages" }),
                /* @__PURE__ */ jsx45("span", { className: "text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800", children: "Filter" })
              ] }),
              /* @__PURE__ */ jsx45("div", { className: "max-h-[60vh] overflow-y-auto", children: messages2.length > 0 ? messages2.map((msg) => /* @__PURE__ */ jsxs30("div", { className: `px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors flex gap-3 ${msg.unread ? "bg-emerald-50/30" : ""}`, children: [
                /* @__PURE__ */ jsxs30("div", { className: "relative size-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold overflow-hidden border border-slate-200", children: [
                  msg.senderAvatar ? /* @__PURE__ */ jsx45("img", { src: msg.senderAvatar, alt: msg.senderName, className: "w-full h-full object-cover" }) : msg.senderName.charAt(0),
                  msg.unread && /* @__PURE__ */ jsx45("div", { className: "absolute top-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-white" })
                ] }),
                /* @__PURE__ */ jsxs30("div", { className: "flex-1 min-w-0 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxs30("div", { className: "flex justify-between items-center mb-0.5", children: [
                    /* @__PURE__ */ jsx45("p", { className: `text-sm truncate ${msg.unread ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`, children: msg.senderName }),
                    /* @__PURE__ */ jsx45("span", { className: "text-[10px] text-slate-400 font-medium flex-shrink-0 ml-2", children: msg.time })
                  ] }),
                  /* @__PURE__ */ jsx45("p", { className: `text-xs truncate ${msg.unread ? "text-slate-700 font-medium" : "text-slate-500"}`, children: msg.preview })
                ] })
              ] }, msg.id)) : /* @__PURE__ */ jsx45("div", { className: "px-4 py-8 text-center text-sm text-slate-500", children: "No new messages" }) }),
              /* @__PURE__ */ jsx45("div", { className: "px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsx45("span", { className: "text-sm text-emerald-600 font-medium cursor-pointer hover:underline", children: "View all messages" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs30(Popover, { children: [
            /* @__PURE__ */ jsx45(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs30("div", { className: "relative flex items-center justify-center size-10 rounded-xl cursor-pointer text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 transition-all duration-200", children: [
              /* @__PURE__ */ jsx45(Bell, { className: "size-6 stroke-[1.5]" }),
              (notificationCount != null ? notificationCount : 0) > 0 ? /* @__PURE__ */ jsx45("span", { className: "absolute -top-1 -right-1 px-1.5 py-0 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white border-2 border-white rounded-full shadow-sm", children: (notificationCount != null ? notificationCount : 0) > 99 ? "99+" : notificationCount }) : notificationBadge ? /* @__PURE__ */ jsx45("span", { className: "absolute top-2 right-2 size-2.5 rounded-full bg-rose-500 ring-2 ring-white shadow-sm" }) : null
            ] }) }),
            /* @__PURE__ */ jsxs30(PopoverContent, { className: "w-80 p-0 rounded-2xl border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden", align: "end", children: [
              /* @__PURE__ */ jsxs30("div", { className: "px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10", children: [
                /* @__PURE__ */ jsx45("h3", { className: "font-semibold text-slate-800 text-sm", children: "Notifications" }),
                /* @__PURE__ */ jsx45("span", { className: "text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800", children: "Filter" })
              ] }),
              /* @__PURE__ */ jsx45("div", { className: "max-h-[60vh] overflow-y-auto", children: notifications.length > 0 ? notifications.map((notif) => /* @__PURE__ */ jsxs30("div", { className: `px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 cursor-pointer transition-colors flex gap-3 ${!notif.read ? "bg-rose-50/30" : ""}`, children: [
                /* @__PURE__ */ jsxs30("div", { className: "flex-shrink-0 mt-0.5", children: [
                  notif.category === "clinical" && /* @__PURE__ */ jsx45(Activity, { className: `size-4 ${!notif.read ? "text-rose-500" : "text-slate-400"}` }),
                  notif.category === "system" && /* @__PURE__ */ jsx45(Bell, { className: `size-4 ${!notif.read ? "text-blue-500" : "text-slate-400"}` }),
                  notif.category === "security" && /* @__PURE__ */ jsx45(ShieldAlert, { className: `size-4 ${!notif.read ? "text-amber-500" : "text-slate-400"}` })
                ] }),
                /* @__PURE__ */ jsxs30("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx45("p", { className: `text-sm ${!notif.read ? "font-medium text-slate-900" : "text-slate-700"}`, children: notif.title }),
                  notif.description && /* @__PURE__ */ jsx45("p", { className: "text-xs text-slate-500 mt-0.5 line-clamp-2", children: notif.description }),
                  /* @__PURE__ */ jsx45("p", { className: "text-[10px] text-slate-400 font-medium mt-1.5", children: notif.time })
                ] }),
                !notif.read && /* @__PURE__ */ jsx45("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsx45("div", { className: "size-2 rounded-full bg-rose-500" }) })
              ] }, notif.id)) : /* @__PURE__ */ jsx45("div", { className: "px-4 py-8 text-center text-sm text-slate-500", children: "No notifications" }) }),
              /* @__PURE__ */ jsx45("div", { className: "px-4 py-3 border-t border-slate-100 bg-slate-50/90 flex justify-center items-center sticky bottom-0 z-10 backdrop-blur-sm", children: /* @__PURE__ */ jsx45("span", { className: "text-sm text-rose-600 font-medium cursor-pointer hover:underline", children: "View all notifications" }) })
            ] })
          ] }),
          userSettingsElement,
          /* @__PURE__ */ jsx45("div", { className: "h-6 w-px bg-slate-200 mx-1" }),
          /* @__PURE__ */ jsxs30(
            "div",
            {
              className: "relative flex items-center justify-center size-10 rounded-xl cursor-pointer hover:bg-slate-100/80 transition-all duration-200 group",
              onClick: onLockNow,
              title: "Lock Workstation",
              children: [
                idleTimeRemaining !== null && idleTimeRemaining <= 60 && /* @__PURE__ */ jsx45("svg", { className: "absolute inset-0 size-full -rotate-90 text-orange-500 opacity-80", viewBox: "0 0 36 36", children: /* @__PURE__ */ jsx45(
                  "circle",
                  {
                    className: "stroke-current transition-all duration-1000 ease-linear",
                    cx: "18",
                    cy: "18",
                    r: "16",
                    fill: "none",
                    strokeWidth: "2.5",
                    strokeDasharray: "100",
                    strokeDashoffset: 100 - idleTimeRemaining / 60 * 100,
                    strokeLinecap: "round"
                  }
                ) }),
                /* @__PURE__ */ jsx45(Lock, { className: `size-5.5 stroke-[1.5] transition-colors ${idleTimeRemaining !== null && idleTimeRemaining <= 60 ? "text-orange-600 animate-pulse" : "text-slate-400 group-hover:text-slate-600"}` })
              ]
            }
          ),
          /* @__PURE__ */ jsx45("div", { className: "ml-2 pl-2 border-l border-slate-200", children: userDropdownElement || /* @__PURE__ */ jsx45("div", { className: "size-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-sm" }) })
        ] })
      ]
    }
  );
}

// components/ui/Footer.tsx
import { clsx as clsx32 } from "clsx";
import { jsx as jsx46, jsxs as jsxs31 } from "react/jsx-runtime";
function Footer({
  appName = "Urvos Healthcare OS",
  version = "v2.4.0-prod",
  links = [
    { label: "Privacy Policy", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Clinical Support", href: "#" }
  ],
  className
}) {
  return /* @__PURE__ */ jsxs31("footer", { className: clsx32("w-full border-t border-urvos-border bg-urvos-surface px-6 py-4 text-xs text-urvos-text-subtle flex flex-col sm:flex-row items-center justify-between gap-3", className), children: [
    /* @__PURE__ */ jsxs31("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx46("span", { className: "font-semibold text-urvos-text", children: appName }),
      /* @__PURE__ */ jsx46("span", { children: "\u2022" }),
      /* @__PURE__ */ jsx46("span", { children: version })
    ] }),
    /* @__PURE__ */ jsx46("div", { className: "flex items-center gap-4", children: links.map((l, i) => /* @__PURE__ */ jsx46("a", { href: l.href, className: "hover:text-urvos-primary transition-colors", children: l.label }, i)) })
  ] });
}

// components/patterns/Sheet.tsx
import { useEffect as useEffect16, useRef as useRef14 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { X as X7 } from "lucide-react";
import { cva as cva12 } from "class-variance-authority";
import { jsx as jsx47, jsxs as jsxs32 } from "react/jsx-runtime";
var sheetVariants = cva12(
  "sheet",
  {
    variants: {
      side: {
        top: "sheet--top",
        bottom: "sheet--bottom",
        left: "sheet--left",
        right: "sheet--right"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
function Sheet({
  open,
  onClose,
  side,
  title,
  description,
  footer,
  children,
  requireExplicitDismiss = false
}) {
  const dialogRef = useRef14(null);
  const previouslyFocused = useRef14(null);
  useEffect16(() => {
    var _a;
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    (_a = dialogRef.current) == null ? void 0 : _a.focus();
    function onKeyDown(e) {
      var _a2;
      if (e.key === "Escape" && !requireExplicitDismiss) onClose();
      if (e.key === "Tab") {
        const focusables = (_a2 = dialogRef.current) == null ? void 0 : _a2.querySelectorAll(
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
      var _a2;
      document.removeEventListener("keydown", onKeyDown);
      (_a2 = previouslyFocused.current) == null ? void 0 : _a2.focus();
    };
  }, [open, onClose, requireExplicitDismiss]);
  if (!open) return null;
  return createPortal3(
    /* @__PURE__ */ jsx47(
      "div",
      {
        className: "sheet-overlay",
        onClick: () => !requireExplicitDismiss && onClose(),
        children: /* @__PURE__ */ jsxs32(
          "div",
          {
            ref: dialogRef,
            className: sheetVariants({ side }),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? "sheet-title" : void 0,
            tabIndex: -1,
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs32("div", { className: "sheet__header", children: [
                /* @__PURE__ */ jsxs32("div", { children: [
                  title && /* @__PURE__ */ jsx47("h4", { id: "sheet-title", className: "sheet__title", children: title }),
                  description && /* @__PURE__ */ jsx47("p", { className: "sheet__description", children: description })
                ] }),
                !requireExplicitDismiss && /* @__PURE__ */ jsx47("button", { className: "btn btn--ghost btn--icon sheet__close", "aria-label": "Close", onClick: onClose, children: /* @__PURE__ */ jsx47(X7, { size: 20 }) })
              ] }),
              /* @__PURE__ */ jsx47("div", { className: "sheet__body", children }),
              footer && /* @__PURE__ */ jsx47("div", { className: "sheet__footer", children: footer })
            ]
          }
        )
      }
    ),
    document.body
  );
}

// components/ui/ScrollArea.tsx
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { jsx as jsx48, jsxs as jsxs33 } from "react/jsx-runtime";
function ScrollArea(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxs33(
    ScrollAreaPrimitive.Root,
    __spreadProps(__spreadValues({
      "data-slot": "scroll-area",
      className: cn("relative", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx48(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx48(ScrollBar, {}),
        /* @__PURE__ */ jsx48(ScrollAreaPrimitive.Corner, {})
      ]
    })
  );
}
function ScrollBar(_a) {
  var _b = _a, {
    className,
    orientation = "vertical"
  } = _b, props = __objRest(_b, [
    "className",
    "orientation"
  ]);
  return /* @__PURE__ */ jsx48(
    ScrollAreaPrimitive.Scrollbar,
    __spreadProps(__spreadValues({
      "data-slot": "scroll-area-scrollbar",
      "data-orientation": orientation,
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsx48(
        ScrollAreaPrimitive.Thumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    })
  );
}

// components/ui/Separator.tsx
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { jsx as jsx49 } from "react/jsx-runtime";
function Separator3(_a) {
  var _b = _a, {
    className,
    orientation = "horizontal"
  } = _b, props = __objRest(_b, [
    "className",
    "orientation"
  ]);
  return /* @__PURE__ */ jsx49(
    SeparatorPrimitive,
    __spreadValues({
      "data-slot": "separator",
      orientation,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )
    }, props)
  );
}

// components/ui/Tabs.tsx
import * as React45 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva as cva13 } from "class-variance-authority";
import { clsx as clsx33 } from "clsx";
import { jsx as jsx50 } from "react/jsx-runtime";
var Tabs = TabsPrimitive.Root;
var tabsListVariants = cva13("tabs", {
  variants: {
    variant: {
      default: "tabs--pill",
      pill: "tabs--pill",
      underline: "tabs--underline",
      segmented: "tabs--segmented"
    }
  },
  defaultVariants: {
    variant: "pill"
  }
});
var TabsList = React45.forwardRef((_a, ref) => {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ jsx50(
    TabsPrimitive.List,
    __spreadValues({
      ref,
      className: clsx33(tabsListVariants({ variant }), className)
    }, props)
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React45.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx50(
    TabsPrimitive.Trigger,
    __spreadValues({
      ref,
      className: clsx33("tab", className)
    }, props)
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React45.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx50(
    TabsPrimitive.Content,
    __spreadValues({
      ref,
      className: clsx33(
        "mt-2 ring-offset-urvos-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urvos-primary focus-visible:ring-offset-2",
        className
      )
    }, props)
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

// components/layout/CardGrid.tsx
import React46 from "react";
import { clsx as clsx34 } from "clsx";
import { jsx as jsx51 } from "react/jsx-runtime";
var CardGrid = React46.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, columns = "auto", gap = "md", children } = _b, props = __objRest(_b, ["className", "columns", "gap", "children"]);
    return /* @__PURE__ */ jsx51(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx34(
          "grid w-full",
          {
            // Auto-fit responsive columns (min width 300px)
            "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]": columns === "auto",
            // Fixed columns on lg screens, stacking on smaller screens
            "grid-cols-1": columns === 1,
            "grid-cols-1 sm:grid-cols-2": columns === 2,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3": columns === 3,
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4": columns === 4,
            // Gaps
            "gap-4": gap === "sm",
            "gap-6": gap === "md",
            "gap-8": gap === "lg"
          },
          className
        )
      }, props), {
        children
      })
    );
  }
);
CardGrid.displayName = "CardGrid";

// components/layout/Groups.tsx
import React47 from "react";
import { clsx as clsx35 } from "clsx";
import { jsx as jsx52, jsxs as jsxs34 } from "react/jsx-runtime";
var BadgeGroup = React47.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, max, gap = "sm", children } = _b, props = __objRest(_b, ["className", "max", "gap", "children"]);
    const childrenArray = React47.Children.toArray(children);
    const hasMore = max !== void 0 && childrenArray.length > max;
    const visibleChildren = hasMore ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - (max || 0);
    return /* @__PURE__ */ jsxs34(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx35(
          "flex flex-wrap items-center",
          {
            "gap-1.5": gap === "sm",
            "gap-2": gap === "md"
          },
          className
        )
      }, props), {
        children: [
          visibleChildren,
          hasMore && /* @__PURE__ */ jsxs34("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-urvos-surface border border-urvos-border text-urvos-text-muted", children: [
            "+",
            remainingCount
          ] })
        ]
      })
    );
  }
);
BadgeGroup.displayName = "BadgeGroup";
var ButtonGroup = React47.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, orientation = "horizontal", attached = true, children } = _b, props = __objRest(_b, ["className", "orientation", "attached", "children"]);
    return /* @__PURE__ */ jsx52(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx35(
          "inline-flex",
          {
            "flex-row": orientation === "horizontal",
            "flex-col": orientation === "vertical",
            // If attached, children (buttons) should remove rounded corners on inner edges.
            // This is a simplified approach assuming children accept className or we use CSS selectors.
            "gap-0 shadow-sm rounded-md": attached,
            "gap-2": !attached && orientation === "horizontal",
            "gap-2 ": !attached && orientation === "vertical"
          },
          // CSS trick to handle border radius of children if attached
          attached && orientation === "horizontal" && "[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:not(:last-child)]:border-r-0",
          attached && orientation === "vertical" && "[&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:not(:last-child)]:border-b-0",
          className
        )
      }, props), {
        children
      })
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";
var InputGroup = React47.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
    return /* @__PURE__ */ jsx52(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx35(
          "relative flex items-stretch w-full",
          "[&>input]:rounded-none [&>input:first-child]:rounded-l-md [&>input:last-child]:rounded-r-md",
          "[&>div:first-child]:rounded-l-md [&>div:last-child]:rounded-r-md",
          className
        )
      }, props), {
        children
      })
    );
  }
);
InputGroup.displayName = "InputGroup";
var InputGroupAddon = React47.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
    return /* @__PURE__ */ jsx52(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx35(
          "flex items-center px-3 py-2 border border-urvos-border bg-urvos-surface-soft text-urvos-text-muted text-sm whitespace-nowrap",
          "first:border-r-0 last:border-l-0",
          className
        )
      }, props), {
        children
      })
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";
var CheckboxGroup = React47.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, label, orientation = "vertical", error, helper, children } = _b, props = __objRest(_b, ["className", "label", "orientation", "error", "helper", "children"]);
    return /* @__PURE__ */ jsxs34("fieldset", __spreadProps(__spreadValues({ ref, className: clsx35("border-0 p-0 m-0", className) }, props), { children: [
      label && /* @__PURE__ */ jsx52("legend", { className: "text-sm font-semibold text-urvos-text mb-2", children: label }),
      /* @__PURE__ */ jsx52(
        "div",
        {
          className: clsx35("flex", {
            "flex-col gap-2": orientation === "vertical",
            "flex-row gap-4 flex-wrap": orientation === "horizontal"
          }),
          children
        }
      ),
      error && /* @__PURE__ */ jsx52("p", { className: "mt-1 text-xs text-urvos-danger", children: error }),
      helper && !error && /* @__PURE__ */ jsx52("p", { className: "mt-1 text-xs text-urvos-text-muted", children: helper })
    ] }));
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

// components/layout/Lists.tsx
import React48, { useRef as useRef15, useEffect as useEffect17, useState as useState20 } from "react";
import { clsx as clsx36 } from "clsx";
import { Loader2 as Loader22 } from "lucide-react";
import { jsx as jsx53, jsxs as jsxs35 } from "react/jsx-runtime";
var List2 = React48.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, as, ordered = false, spacing = "sm", children } = _b, props = __objRest(_b, ["className", "as", "ordered", "spacing", "children"]);
    const Component2 = as || (ordered ? "ol" : "ul");
    return /* @__PURE__ */ jsx53(
      Component2,
      __spreadProps(__spreadValues({
        ref,
        className: clsx36(
          ordered ? "list-decimal list-inside" : "list-none",
          {
            "space-y-2": spacing === "sm",
            "space-y-4": spacing === "md",
            "space-y-6": spacing === "lg"
          },
          className
        )
      }, props), {
        children
      })
    );
  }
);
List2.displayName = "List";
var ListItem = React48.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, icon, children } = _b, props = __objRest(_b, ["className", "icon", "children"]);
    return /* @__PURE__ */ jsxs35(
      "li",
      __spreadProps(__spreadValues({
        ref,
        className: clsx36(
          "text-sm text-urvos-text-muted flex items-start",
          className
        )
      }, props), {
        children: [
          icon && /* @__PURE__ */ jsx53("span", { className: "mr-3 flex-shrink-0 text-urvos-text-muted mt-0.5", children: icon }),
          /* @__PURE__ */ jsx53("div", { className: "flex-1", children })
        ]
      })
    );
  }
);
ListItem.displayName = "ListItem";
var InfiniteScroll = (_a) => {
  var _b = _a, {
    onLoadMore,
    hasMore,
    isLoading,
    loadingText = "Loading more...",
    children,
    className
  } = _b, props = __objRest(_b, [
    "onLoadMore",
    "hasMore",
    "isLoading",
    "loadingText",
    "children",
    "className"
  ]);
  const observerTarget = useRef15(null);
  useEffect17(() => {
    const target = observerTarget.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasMore, isLoading, onLoadMore]);
  return /* @__PURE__ */ jsxs35("div", __spreadProps(__spreadValues({ className: clsx36("flex flex-col w-full", className) }, props), { children: [
    children,
    hasMore && /* @__PURE__ */ jsx53("div", { ref: observerTarget, className: "py-4 flex justify-center text-sm text-urvos-text-muted", children: isLoading ? /* @__PURE__ */ jsxs35("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx53(Loader22, { className: "w-4 h-4 animate-spin" }),
      " ",
      loadingText
    ] }) : /* @__PURE__ */ jsx53("span", { className: "opacity-0", children: "Trigger" }) })
  ] }));
};
InfiniteScroll.displayName = "InfiniteScroll";

// components/layout/DataGrid.tsx
import { useState as useState21 } from "react";
import { clsx as clsx39 } from "clsx";
import { ChevronUp as ChevronUp2, ChevronDown as ChevronDown4, ChevronsUpDown as ChevronsUpDown3 } from "lucide-react";

// components/ui/Table.tsx
import * as React49 from "react";
import { clsx as clsx37 } from "clsx";
import { jsx as jsx54 } from "react/jsx-runtime";
var Table2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54("div", { className: "table__wrapper", children: /* @__PURE__ */ jsx54(
    "table",
    __spreadValues({
      ref,
      className: clsx37("table", className)
    }, props)
  ) });
});
Table2.displayName = "Table";
var TableHeader2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54("thead", __spreadValues({ ref, className: clsx37("table__header", className) }, props));
});
TableHeader2.displayName = "TableHeader";
var TableBody2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "tbody",
    __spreadValues({
      ref,
      className: clsx37("table__body", className)
    }, props)
  );
});
TableBody2.displayName = "TableBody";
var TableFooter2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "tfoot",
    __spreadValues({
      ref,
      className: clsx37("table__footer", className)
    }, props)
  );
});
TableFooter2.displayName = "TableFooter";
var TableRow2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "tr",
    __spreadValues({
      ref,
      className: clsx37("table__row", className)
    }, props)
  );
});
TableRow2.displayName = "TableRow";
var TableHead2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "th",
    __spreadValues({
      ref,
      className: clsx37("table__head", className)
    }, props)
  );
});
TableHead2.displayName = "TableHead";
var TableCell2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "td",
    __spreadValues({
      ref,
      className: clsx37("table__cell", className)
    }, props)
  );
});
TableCell2.displayName = "TableCell";
var TableCaption2 = React49.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx54(
    "caption",
    __spreadValues({
      ref,
      className: clsx37("table__caption", className)
    }, props)
  );
});
TableCaption2.displayName = "TableCaption";

// components/navigation/Pagination.tsx
import * as React50 from "react";
import { ChevronLeft as ChevronLeft3, ChevronRight as ChevronRight4, MoreHorizontal } from "lucide-react";
import { clsx as clsx38 } from "clsx";
import { jsx as jsx55, jsxs as jsxs36 } from "react/jsx-runtime";
var Pagination = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx55(
    "nav",
    __spreadValues({
      role: "navigation",
      "aria-label": "pagination",
      className: clsx38("pagination", className)
    }, props)
  );
};
Pagination.displayName = "Pagination";
var PaginationContent = React50.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx55(
    "ul",
    __spreadValues({
      ref,
      className: clsx38("flex flex-row items-center gap-1", className)
    }, props)
  );
});
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React50.forwardRef((_a, ref) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsx55("li", __spreadValues({ ref, className: clsx38("", className) }, props));
});
PaginationItem.displayName = "PaginationItem";
var PaginationLink = (_a) => {
  var _b = _a, {
    className,
    isActive
  } = _b, props = __objRest(_b, [
    "className",
    "isActive"
  ]);
  return /* @__PURE__ */ jsx55(
    "a",
    __spreadValues({
      "aria-current": isActive ? "page" : void 0,
      "data-active": isActive ? true : void 0,
      className: clsx38("pagination__btn", className)
    }, props)
  );
};
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs36(
    PaginationLink,
    __spreadProps(__spreadValues({
      "aria-label": "Go to previous page",
      className: clsx38("gap-1 pl-2.5", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx55(ChevronLeft3, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx55("span", { children: "Previous" })
      ]
    })
  );
};
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs36(
    PaginationLink,
    __spreadProps(__spreadValues({
      "aria-label": "Go to next page",
      className: clsx38("gap-1 pr-2.5", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx55("span", { children: "Next" }),
        /* @__PURE__ */ jsx55(ChevronRight4, { className: "h-4 w-4" })
      ]
    })
  );
};
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxs36(
    "span",
    __spreadProps(__spreadValues({
      "aria-hidden": true,
      className: clsx38("flex h-9 w-9 items-center justify-center", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsx55(MoreHorizontal, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx55("span", { className: "sr-only", children: "More pages" })
      ]
    })
  );
};
PaginationEllipsis.displayName = "PaginationEllipsis";

// components/layout/DataGrid.tsx
import { jsx as jsx56, jsxs as jsxs37 } from "react/jsx-runtime";
function DataGrid({
  data,
  columns,
  pageSize = 10,
  selectable = false,
  onRowClick,
  onSelectionChange,
  className
}) {
  const [currentPage, setCurrentPage] = useState21(1);
  const [itemsPerPage, setItemsPerPage] = useState21(pageSize);
  const [sortKey, setSortKey] = useState21(null);
  const [sortDir, setSortDir] = useState21("asc");
  const [selectedIds, setSelectedIds] = useState21(/* @__PURE__ */ new Set());
  const [filterQuery, setFilterQuery] = useState21("");
  const handleSort = (key) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      const next = new Set(selectedIds);
      paginatedData.forEach((row) => next.delete(row.id));
      setSelectedIds(next);
      onSelectionChange == null ? void 0 : onSelectionChange(Array.from(next));
    } else {
      const next = new Set(selectedIds);
      paginatedData.forEach((row) => next.add(row.id));
      setSelectedIds(next);
      onSelectionChange == null ? void 0 : onSelectionChange(Array.from(next));
    }
  };
  const toggleSelectRow = (id, e) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
    onSelectionChange == null ? void 0 : onSelectionChange(Array.from(next));
  };
  const filteredData = data.filter(
    (row) => columns.some((col) => {
      const val = row[col.key];
      return val ? String(val).toLowerCase().includes(filterQuery.toLowerCase()) : false;
    })
  );
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === bVal) return 0;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return sortDir === "asc" ? -1 : 1;
  });
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  return /* @__PURE__ */ jsxs37("div", { className: clsx39("space-y-4 w-full", className), children: [
    /* @__PURE__ */ jsxs37("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx56(
        Input,
        {
          placeholder: "Filter data...",
          value: filterQuery,
          onChange: (e) => {
            setFilterQuery(e.target.value);
            setCurrentPage(1);
          },
          className: "max-w-xs"
        }
      ),
      /* @__PURE__ */ jsx56("div", { className: "text-xs text-urvos-text-subtle", children: selectedIds.size > 0 && /* @__PURE__ */ jsxs37("span", { children: [
        selectedIds.size,
        " row(s) selected"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx56("div", { className: "rounded-md border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs37(Table2, { children: [
      /* @__PURE__ */ jsx56(TableHeader2, { children: /* @__PURE__ */ jsxs37(TableRow2, { children: [
        selectable && /* @__PURE__ */ jsx56(TableHead2, { className: "w-[40px] px-2 text-center", children: /* @__PURE__ */ jsx56(
          "input",
          {
            type: "checkbox",
            checked: paginatedData.length > 0 && selectedIds.size === paginatedData.length,
            onChange: toggleSelectAll,
            className: "checkbox"
          }
        ) }),
        columns.map((col) => /* @__PURE__ */ jsx56(
          TableHead2,
          {
            style: { width: col.width },
            className: clsx39(col.sortable && "cursor-pointer select-none"),
            onClick: () => col.sortable && handleSort(col.key),
            children: /* @__PURE__ */ jsxs37("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx56("span", { children: col.header }),
              col.sortable && /* @__PURE__ */ jsx56("span", { className: "text-urvos-text-subtle", children: sortKey === col.key ? sortDir === "asc" ? /* @__PURE__ */ jsx56(ChevronUp2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx56(ChevronDown4, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx56(ChevronsUpDown3, { className: "h-3.5 w-3.5 opacity-40" }) })
            ] })
          },
          col.key
        ))
      ] }) }),
      /* @__PURE__ */ jsx56(TableBody2, { children: paginatedData.length === 0 ? /* @__PURE__ */ jsx56(TableRow2, { children: /* @__PURE__ */ jsx56(TableCell2, { colSpan: columns.length + (selectable ? 1 : 0), className: "h-24 text-center text-urvos-text-subtle", children: "No results found." }) }) : paginatedData.map((row) => {
        const isSelected = selectedIds.has(row.id);
        return /* @__PURE__ */ jsxs37(
          TableRow2,
          {
            onClick: () => onRowClick == null ? void 0 : onRowClick(row),
            className: clsx39(
              onRowClick && "cursor-pointer",
              isSelected && "bg-urvos-primary/5"
            ),
            children: [
              selectable && /* @__PURE__ */ jsx56(TableCell2, { className: "px-2 text-center", onClick: (e) => toggleSelectRow(row.id, e), children: /* @__PURE__ */ jsx56(
                "input",
                {
                  type: "checkbox",
                  checked: isSelected,
                  onChange: () => {
                  },
                  className: "checkbox"
                }
              ) }),
              columns.map((col) => /* @__PURE__ */ jsx56(TableCell2, { children: col.accessor ? col.accessor(row) : row[col.key] }, col.key))
            ]
          },
          row.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs37("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxs37("div", { className: "flex items-center gap-2 text-sm text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsx56("span", { children: "Rows per page:" }),
        /* @__PURE__ */ jsxs37(
          Select,
          {
            value: String(itemsPerPage),
            onValueChange: (val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            },
            children: [
              /* @__PURE__ */ jsx56(SelectTrigger, { className: "w-[70px]", children: /* @__PURE__ */ jsx56(SelectValue, {}) }),
              /* @__PURE__ */ jsx56(SelectContent, { children: [5, 10, 20, 50].map((size) => /* @__PURE__ */ jsx56(SelectItem, { value: String(size), children: size }, size)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs37("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs37("span", { className: "text-xs text-urvos-text-subtle", children: [
          "Page ",
          currentPage,
          " of ",
          totalPages,
          " (",
          sortedData.length,
          " items)"
        ] }),
        /* @__PURE__ */ jsx56(Pagination, { children: /* @__PURE__ */ jsxs37(PaginationContent, { children: [
          /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
            PaginationPrevious,
            {
              onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
              className: clsx39(currentPage === 1 && "pointer-events-none opacity-50")
            }
          ) }),
          /* @__PURE__ */ jsx56(PaginationItem, { children: /* @__PURE__ */ jsx56(
            PaginationNext,
            {
              onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
              className: clsx39(currentPage === totalPages && "pointer-events-none opacity-50")
            }
          ) })
        ] }) })
      ] })
    ] })
  ] });
}

// components/layout/VirtualizedTable.tsx
import { useRef as useRef16, useState as useState22, useMemo as useMemo6 } from "react";
import { clsx as clsx40 } from "clsx";
import { jsx as jsx57, jsxs as jsxs38 } from "react/jsx-runtime";
function VirtualizedTable({
  data,
  columns,
  rowHeight = 44,
  containerHeight = 400,
  className
}) {
  const [scrollTop, setScrollTop] = useState22(0);
  const containerRef = useRef16(null);
  const totalHeight = data.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const endIndex = Math.min(
    data.length - 1,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + 2
  );
  const visibleRows = useMemo6(() => {
    return data.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      top: (startIndex + index) * rowHeight
    }));
  }, [data, startIndex, endIndex, rowHeight]);
  const handleScroll2 = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  return /* @__PURE__ */ jsxs38("div", { className: clsx40("w-full border border-urvos-border rounded-lg overflow-hidden shadow-sm bg-urvos-surface", className), children: [
    /* @__PURE__ */ jsx57("div", { className: "flex bg-urvos-surface-muted border-b border-urvos-border font-semibold text-xs text-urvos-text-subtle uppercase px-4 py-3", children: columns.map((col) => /* @__PURE__ */ jsx57("div", { style: { width: col.width }, className: "flex-shrink-0", children: col.header }, col.key)) }),
    /* @__PURE__ */ jsx57(
      "div",
      {
        ref: containerRef,
        onScroll: handleScroll2,
        style: { height: containerHeight },
        className: "relative overflow-y-auto",
        children: /* @__PURE__ */ jsx57("div", { style: { height: totalHeight, width: "100%", position: "relative" }, children: visibleRows.map(({ item, top }) => /* @__PURE__ */ jsx57(
          "div",
          {
            style: {
              position: "absolute",
              top,
              left: 0,
              right: 0,
              height: rowHeight
            },
            className: "flex items-center px-4 border-b border-urvos-border text-sm text-urvos-text hover:bg-urvos-surface-muted/50 transition-colors",
            children: columns.map((col) => /* @__PURE__ */ jsx57("div", { style: { width: col.width }, className: "flex-shrink-0 truncate pr-2", children: col.accessor ? col.accessor(item) : item[col.key] }, col.key))
          },
          item.id
        )) })
      }
    )
  ] });
}

// components/layout/Carousel.tsx
import React53, { useState as useState23 } from "react";
import { clsx as clsx41 } from "clsx";
import { ChevronLeft as ChevronLeft4, ChevronRight as ChevronRight5 } from "lucide-react";
import { Fragment as Fragment7, jsx as jsx58, jsxs as jsxs39 } from "react/jsx-runtime";
function Carousel({ children, autoPlay = false, interval = 3e3, className }) {
  const [currentIndex, setCurrentIndex] = useState23(0);
  const total = children.length;
  const prev = () => setCurrentIndex((i) => i === 0 ? total - 1 : i - 1);
  const next = () => setCurrentIndex((i) => i === total - 1 ? 0 : i + 1);
  React53.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, total]);
  if (total === 0) return null;
  return /* @__PURE__ */ jsxs39("div", { className: clsx41("relative overflow-hidden rounded-xl border border-urvos-border bg-urvos-surface shadow-sm", className), children: [
    /* @__PURE__ */ jsx58(
      "div",
      {
        className: "flex transition-transform duration-300 ease-out",
        style: { transform: `translateX(-${currentIndex * 100}%)` },
        children: children.map((child, idx) => /* @__PURE__ */ jsx58("div", { className: "w-full flex-shrink-0", children: child }, idx))
      }
    ),
    total > 1 && /* @__PURE__ */ jsxs39(Fragment7, { children: [
      /* @__PURE__ */ jsx58(
        Button,
        {
          variant: "secondary",
          size: "icon",
          onClick: prev,
          className: "absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100",
          "aria-label": "Previous slide",
          children: /* @__PURE__ */ jsx58(ChevronLeft4, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx58(
        Button,
        {
          variant: "secondary",
          size: "icon",
          onClick: next,
          className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-md opacity-80 hover:opacity-100",
          "aria-label": "Next slide",
          children: /* @__PURE__ */ jsx58(ChevronRight5, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx58("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5", children: children.map((_, idx) => /* @__PURE__ */ jsx58(
        "button",
        {
          onClick: () => setCurrentIndex(idx),
          className: clsx41(
            "h-2 rounded-full transition-all",
            idx === currentIndex ? "w-6 bg-urvos-primary" : "w-2 bg-urvos-border"
          ),
          "aria-label": `Go to slide ${idx + 1}`
        },
        idx
      )) })
    ] })
  ] });
}

// components/layout/Masonry.tsx
import React54 from "react";
import { clsx as clsx42 } from "clsx";
import { jsx as jsx59 } from "react/jsx-runtime";
function Masonry({ columns = 3, gap = 16, children, className }) {
  const columnCols = Array.from({ length: columns }, () => []);
  children.forEach((child, index) => {
    columnCols[index % columns].push(child);
  });
  return /* @__PURE__ */ jsx59("div", { className: clsx42("flex w-full", className), style: { gap: `${gap}px` }, children: columnCols.map((colItems, colIdx) => /* @__PURE__ */ jsx59("div", { className: "flex flex-col flex-1", style: { gap: `${gap}px` }, children: colItems.map((item, itemIdx) => /* @__PURE__ */ jsx59(React54.Fragment, { children: item }, itemIdx)) }, colIdx)) });
}

// components/navigation/Navigation.tsx
import { clsx as clsx43 } from "clsx";
import { ChevronRight as ChevronRight6, Home, MoreHorizontal as MoreHorizontal2 } from "lucide-react";
import { Fragment as Fragment8, jsx as jsx60, jsxs as jsxs40 } from "react/jsx-runtime";
function Breadcrumb(_a) {
  var _b = _a, {
    items,
    maxItems,
    separator = /* @__PURE__ */ jsx60(ChevronRight6, { className: "w-4 h-4" }),
    className
  } = _b, props = __objRest(_b, [
    "items",
    "maxItems",
    "separator",
    "className"
  ]);
  let visibleItems = items;
  let hasCollapsed = false;
  if (maxItems && items.length > maxItems) {
    const last = items.slice(items.length - (maxItems - 1));
    visibleItems = [items[0]];
    hasCollapsed = true;
    visibleItems = [...visibleItems, ...last];
  }
  return /* @__PURE__ */ jsx60("nav", __spreadProps(__spreadValues({ "aria-label": "Breadcrumb", className: clsx43("flex", className) }, props), { children: /* @__PURE__ */ jsx60("ol", { className: "flex items-center flex-wrap gap-1", children: items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (hasCollapsed && maxItems && index > 0 && index < items.length - (maxItems - 1)) {
      if (index === 1) {
        return /* @__PURE__ */ jsxs40("li", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx60("span", { className: "text-urvos-text-muted", children: separator }),
          /* @__PURE__ */ jsx60("span", { className: "px-2 py-0.5 text-sm text-urvos-text-muted rounded hover:bg-urvos-surface-hover transition-colors cursor-default", children: /* @__PURE__ */ jsx60(MoreHorizontal2, { className: "w-4 h-4" }) })
        ] }, "ellipsis");
      }
      return null;
    }
    return /* @__PURE__ */ jsxs40("li", { className: "flex items-center gap-1", children: [
      index > 0 && /* @__PURE__ */ jsx60("span", { className: "text-urvos-text-muted/60 select-none", children: separator }),
      isLast ? /* @__PURE__ */ jsxs40(
        "span",
        {
          className: "text-sm font-medium text-urvos-text",
          "aria-current": "page",
          children: [
            item.icon && /* @__PURE__ */ jsx60("span", { className: "mr-1", children: item.icon }),
            item.label
          ]
        }
      ) : item.href ? /* @__PURE__ */ jsxs40(
        "a",
        {
          href: item.href,
          className: "flex items-center text-sm text-urvos-text-muted hover:text-urvos-text transition-colors hover:underline",
          children: [
            index === 0 && !item.icon ? /* @__PURE__ */ jsx60(Home, { className: "w-4 h-4 mr-1 flex-shrink-0" }) : item.icon ? /* @__PURE__ */ jsx60("span", { className: "mr-1", children: item.icon }) : null,
            item.label
          ]
        }
      ) : /* @__PURE__ */ jsxs40("span", { className: "text-sm text-urvos-text-muted", children: [
        item.icon && /* @__PURE__ */ jsx60("span", { className: "mr-1", children: item.icon }),
        item.label
      ] })
    ] }, index);
  }) }) }));
}
function NavItem(_a) {
  var _b = _a, {
    href = "#",
    icon,
    label,
    badge,
    isActive = false,
    isCollapsed = false,
    className
  } = _b, props = __objRest(_b, [
    "href",
    "icon",
    "label",
    "badge",
    "isActive",
    "isCollapsed",
    "className"
  ]);
  return /* @__PURE__ */ jsxs40(
    "a",
    __spreadProps(__spreadValues({
      href,
      "aria-current": isActive ? "page" : void 0,
      title: isCollapsed ? label : void 0,
      className: clsx43(
        "group flex items-center rounded-lg text-sm font-medium transition-all duration-150 select-none",
        isCollapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5 gap-3",
        isActive ? "bg-urvos-primary/10 text-urvos-primary" : "text-urvos-text-muted hover:bg-urvos-surface-hover hover:text-urvos-text",
        className
      )
    }, props), {
      children: [
        icon && /* @__PURE__ */ jsx60(
          "span",
          {
            className: clsx43(
              "flex-shrink-0 w-5 h-5",
              isActive ? "text-urvos-primary" : "text-urvos-text-muted group-hover:text-urvos-text"
            ),
            children: icon
          }
        ),
        !isCollapsed && /* @__PURE__ */ jsxs40(Fragment8, { children: [
          /* @__PURE__ */ jsx60("span", { className: "flex-1 truncate", children: label }),
          badge !== void 0 && /* @__PURE__ */ jsx60(
            "span",
            {
              className: clsx43(
                "ml-auto inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold",
                isActive ? "bg-urvos-primary text-white" : "bg-urvos-surface-hover text-urvos-text-muted"
              ),
              children: badge
            }
          )
        ] })
      ]
    })
  );
}

// components/navigation/Breadcrumbs.tsx
import Link2 from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight as ChevronRight7, Home as Home2 } from "lucide-react";
import { jsx as jsx61, jsxs as jsxs41 } from "react/jsx-runtime";
function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;
  const segments = pathname.split("/").filter(Boolean);
  return /* @__PURE__ */ jsx61("nav", { className: "flex items-center text-sm font-medium text-ink-muted mb-4", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs41("ol", { className: "flex items-center space-x-1", children: [
    /* @__PURE__ */ jsx61("li", { children: /* @__PURE__ */ jsx61(Link2, { href: "/dashboard", className: "text-ink-subtle hover:text-primary transition-colors flex items-center p-1 rounded-sm", children: /* @__PURE__ */ jsx61(Home2, { className: "w-4 h-4" }) }) }),
    segments.map((segment, index) => {
      if (segment === "dashboard") return null;
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      return /* @__PURE__ */ jsxs41("li", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx61(ChevronRight7, { className: "w-3.5 h-3.5 mx-0.5 text-ink-subtle" }),
        isLast ? /* @__PURE__ */ jsx61("span", { className: "text-ink font-semibold px-1", "aria-current": "page", children: label }) : /* @__PURE__ */ jsx61(Link2, { href, className: "text-ink-subtle hover:text-primary transition-colors px-1 rounded-sm", children: label })
      ] }, href);
    })
  ] }) });
}

// components/navigation/SkipLink.tsx
import { jsx as jsx62 } from "react/jsx-runtime";
function SkipLink() {
  return /* @__PURE__ */ jsx62(
    "a",
    {
      href: "#main-content",
      className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium",
      children: "Skip to main content"
    }
  );
}

// components/navigation/MegaMenu.tsx
import { useState as useState24 } from "react";
import { clsx as clsx44 } from "clsx";
import { ChevronDown as ChevronDown5 } from "lucide-react";
import { jsx as jsx63, jsxs as jsxs42 } from "react/jsx-runtime";
function MegaMenu({ label = "Clinical Modules", categories, className }) {
  const [open, setOpen] = useState24(false);
  return /* @__PURE__ */ jsxs42("div", { className: clsx44("relative inline-block text-left", className), onMouseLeave: () => setOpen(false), children: [
    /* @__PURE__ */ jsxs42(
      "button",
      {
        onClick: () => setOpen(!open),
        onMouseEnter: () => setOpen(true),
        className: "flex items-center gap-1 text-sm font-medium text-urvos-text hover:text-urvos-primary transition-colors py-2 px-3 rounded-md hover:bg-urvos-surface-muted",
        children: [
          /* @__PURE__ */ jsx63("span", { children: label }),
          /* @__PURE__ */ jsx63(ChevronDown5, { className: "h-4 w-4 opacity-50" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx63("div", { className: "absolute left-0 top-full z-50 mt-1 w-[550px] rounded-xl border border-urvos-border bg-urvos-surface p-6 shadow-xl grid grid-cols-2 gap-6 animate-in fade-in-0 zoom-in-95", children: categories.map((cat, idx) => /* @__PURE__ */ jsxs42("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx63("h4", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider", children: cat.category }),
      /* @__PURE__ */ jsx63("div", { className: "space-y-2", children: cat.items.map((item, i) => /* @__PURE__ */ jsxs42(
        "a",
        {
          href: item.href,
          className: "flex items-start gap-3 p-2 rounded-lg hover:bg-urvos-surface-muted transition-colors group",
          children: [
            item.icon && /* @__PURE__ */ jsx63("span", { className: "text-urvos-primary mt-0.5", children: item.icon }),
            /* @__PURE__ */ jsxs42("div", { children: [
              /* @__PURE__ */ jsx63("span", { className: "block text-sm font-semibold text-urvos-text group-hover:text-urvos-primary", children: item.title }),
              /* @__PURE__ */ jsx63("span", { className: "block text-xs text-urvos-text-subtle line-clamp-1", children: item.description })
            ] })
          ]
        },
        i
      )) })
    ] }, idx)) })
  ] });
}

// components/organisms/Shell.tsx
import { useState as useState26 } from "react";
import { clsx as clsx45 } from "clsx";
import { Menu, X as X8, Bell as Bell2, Search as Search4, Home as Home3, Users, Calendar, Activity as Activity2, Settings as Settings2, ChevronLeft as ChevronLeft5, ChevronRight as ChevronRight8 } from "lucide-react";

// components/utilities/Portal.tsx
import { useEffect as useEffect18, useState as useState25 } from "react";
import { createPortal as createPortal4 } from "react-dom";
function Portal9({ children, containerId }) {
  const [mounted, setMounted] = useState25(false);
  useEffect18(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (!mounted) return null;
  const target = containerId ? document.getElementById(containerId) || document.body : document.body;
  return createPortal4(children, target);
}

// components/organisms/Shell.tsx
import { jsx as jsx64, jsxs as jsxs43 } from "react/jsx-runtime";
function Shell({ children, user, navigation }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState26(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState26(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState26(false);
  const defaultNav = [
    { label: "Dashboard", href: "#", icon: /* @__PURE__ */ jsx64(Home3, { className: "w-5 h-5" }), isActive: true },
    { label: "Patients", href: "#", icon: /* @__PURE__ */ jsx64(Users, { className: "w-5 h-5" }), badge: "24" },
    { label: "Schedule", href: "#", icon: /* @__PURE__ */ jsx64(Calendar, { className: "w-5 h-5" }) },
    { label: "Vitals & Labs", href: "#", icon: /* @__PURE__ */ jsx64(Activity2, { className: "w-5 h-5" }) },
    { label: "Settings", href: "#", icon: /* @__PURE__ */ jsx64(Settings2, { className: "w-5 h-5" }) }
  ];
  const navItems = navigation || defaultNav;
  return /* @__PURE__ */ jsxs43("div", { className: "min-h-screen bg-urvos-background text-urvos-text flex flex-col", children: [
    /* @__PURE__ */ jsxs43("header", { className: "sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-urvos-border bg-urvos-surface px-4 shadow-sm md:px-6", children: [
      /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx64(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            onClick: () => setMobileDrawerOpen(!mobileDrawerOpen),
            "aria-label": "Toggle navigation drawer",
            children: /* @__PURE__ */ jsx64(Menu, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx64("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-urvos-primary font-bold text-white shadow-xs", children: "U" }),
          /* @__PURE__ */ jsx64("span", { className: "text-base sm:text-lg font-bold text-urvos-text tracking-tight", children: "Urvos Health OS" })
        ] })
      ] }),
      /* @__PURE__ */ jsx64("div", { className: "hidden max-w-sm flex-1 mx-8 md:block", children: /* @__PURE__ */ jsxs43("div", { className: "relative", children: [
        /* @__PURE__ */ jsx64(Search4, { className: "absolute left-3 top-2.5 h-4 w-4 text-urvos-text-subtle" }),
        /* @__PURE__ */ jsx64(Input, { placeholder: "Search patient ID, name, or MRN...", className: "pl-9" })
      ] }) }),
      /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsx64(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "md:hidden",
            onClick: () => setMobileSearchOpen(!mobileSearchOpen),
            "aria-label": "Toggle search overlay",
            children: /* @__PURE__ */ jsx64(Search4, { className: "h-5 w-5 text-urvos-text-subtle" })
          }
        ),
        /* @__PURE__ */ jsx64(Button, { variant: "ghost", size: "icon", "aria-label": "Notifications", children: /* @__PURE__ */ jsx64(Bell2, { className: "h-5 w-5 text-urvos-text-subtle" }) }),
        /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2 border-l border-urvos-border pl-3", children: [
          /* @__PURE__ */ jsx64("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-urvos-primary/10 font-bold text-urvos-primary text-xs", children: (user == null ? void 0 : user.name) ? user.name[0] : "D" }),
          /* @__PURE__ */ jsxs43("div", { className: "hidden flex-col text-left text-xs lg:flex", children: [
            /* @__PURE__ */ jsx64("span", { className: "font-semibold text-urvos-text leading-tight", children: (user == null ? void 0 : user.name) || "Dr. Sarah Jenkins" }),
            /* @__PURE__ */ jsx64("span", { className: "text-[10px] text-urvos-text-subtle", children: (user == null ? void 0 : user.role) || "Attending Physician" })
          ] })
        ] })
      ] })
    ] }),
    mobileSearchOpen && /* @__PURE__ */ jsx64("div", { className: "md:hidden p-3 bg-urvos-surface border-b border-urvos-border animate-in slide-in-from-top-2", children: /* @__PURE__ */ jsxs43("div", { className: "relative flex items-center gap-2", children: [
      /* @__PURE__ */ jsx64(Search4, { className: "absolute left-3 h-4 w-4 text-urvos-text-subtle" }),
      /* @__PURE__ */ jsx64(Input, { placeholder: "Search patient MRN or condition...", className: "pl-9 pr-8", autoFocus: true }),
      /* @__PURE__ */ jsx64("button", { onClick: () => setMobileSearchOpen(false), className: "p-1 text-urvos-text-subtle", children: /* @__PURE__ */ jsx64(X8, { className: "h-5 w-5" }) })
    ] }) }),
    /* @__PURE__ */ jsxs43("div", { className: "flex flex-1 overflow-hidden relative", children: [
      mobileDrawerOpen && /* @__PURE__ */ jsx64(Portal9, { children: /* @__PURE__ */ jsx64(
        "div",
        {
          className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in-0",
          onClick: () => setMobileDrawerOpen(false)
        }
      ) }),
      /* @__PURE__ */ jsxs43(
        "aside",
        {
          className: clsx45(
            "fixed inset-y-0 left-0 z-50 w-72 bg-urvos-surface p-4 border-r border-urvos-border shadow-2xl transition-transform duration-200 ease-in-out md:hidden flex flex-col justify-between",
            mobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
          ),
          children: [
            /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs43("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
                /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx64("span", { className: "flex h-7 w-7 items-center justify-center rounded-md bg-urvos-primary font-bold text-white text-xs", children: "U" }),
                  /* @__PURE__ */ jsx64("span", { className: "font-bold text-sm text-urvos-text", children: "Navigation" })
                ] }),
                /* @__PURE__ */ jsx64("button", { onClick: () => setMobileDrawerOpen(false), className: "p-1 text-urvos-text-subtle hover:text-urvos-text", children: /* @__PURE__ */ jsx64(X8, { className: "h-5 w-5" }) })
              ] }),
              /* @__PURE__ */ jsx64("nav", { className: "flex flex-col gap-1", children: navItems.map((item, idx) => /* @__PURE__ */ jsx64(NavItem, { label: item.label, href: item.href, icon: item.icon, badge: item.badge, isActive: item.isActive }, idx)) })
            ] }),
            /* @__PURE__ */ jsx64("div", { className: "pt-4 border-t border-urvos-border text-xs text-urvos-text-subtle", children: "Urvos Healthcare OS v2.4.0" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs43(
        "aside",
        {
          className: clsx45(
            "hidden md:flex flex-col justify-between border-r border-urvos-border bg-urvos-surface p-3 transition-all duration-200 shrink-0",
            desktopCollapsed ? "w-16" : "w-64"
          ),
          children: [
            /* @__PURE__ */ jsx64("div", { className: "space-y-4", children: /* @__PURE__ */ jsx64("nav", { className: "flex flex-col gap-1", children: navItems.map((item, idx) => /* @__PURE__ */ jsx64(
              NavItem,
              {
                label: desktopCollapsed ? "" : item.label,
                href: item.href,
                icon: item.icon,
                badge: desktopCollapsed ? void 0 : item.badge,
                isActive: item.isActive
              },
              idx
            )) }) }),
            /* @__PURE__ */ jsx64(
              "button",
              {
                onClick: () => setDesktopCollapsed(!desktopCollapsed),
                className: "flex items-center justify-center p-2 rounded-lg text-urvos-text-subtle hover:bg-urvos-surface-muted hover:text-urvos-text transition-colors mt-auto border-t border-urvos-border",
                title: desktopCollapsed ? "Expand sidebar" : "Collapse sidebar",
                children: desktopCollapsed ? /* @__PURE__ */ jsx64(ChevronRight8, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx64(ChevronLeft5, { className: "h-5 w-5" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx64("main", { className: "flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-urvos-background w-full max-w-7xl mx-auto", children })
    ] })
  ] });
}
function Sidebar({ brandName = "Urvos Health", items, className }) {
  return /* @__PURE__ */ jsx64("aside", { className: clsx45("w-64 h-full border-r border-urvos-border bg-urvos-surface p-4 flex flex-col justify-between", className), children: /* @__PURE__ */ jsxs43("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx64("span", { className: "flex h-7 w-7 items-center justify-center rounded bg-urvos-primary font-bold text-white text-xs", children: "U" }),
      /* @__PURE__ */ jsx64("span", { className: "font-bold text-sm text-urvos-text", children: brandName })
    ] }),
    /* @__PURE__ */ jsx64("nav", { className: "flex flex-col gap-1", children: items.map((item, idx) => /* @__PURE__ */ jsx64(NavItem, { label: item.label, href: item.href, icon: item.icon, badge: item.badge, isActive: item.active }, idx)) })
  ] }) });
}
function TopNav({ userName = "Dr. Sarah Jenkins", userRole = "Attending Physician", className }) {
  return /* @__PURE__ */ jsxs43("header", { className: clsx45("h-16 w-full border-b border-urvos-border bg-urvos-surface px-6 flex items-center justify-between shadow-sm", className), children: [
    /* @__PURE__ */ jsxs43("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx64("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-urvos-primary font-bold text-white", children: "U" }),
      /* @__PURE__ */ jsx64("span", { className: "font-bold text-base text-urvos-text", children: "Urvos TopNav" })
    ] }),
    /* @__PURE__ */ jsx64("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs43("div", { className: "flex flex-col text-right text-xs", children: [
      /* @__PURE__ */ jsx64("span", { className: "font-bold text-urvos-text", children: userName }),
      /* @__PURE__ */ jsx64("span", { className: "text-urvos-text-subtle", children: userRole })
    ] }) })
  ] });
}

// components/navigation/StepIndicator.tsx
import React58 from "react";
import { clsx as clsx46 } from "clsx";
import { Check as Check7 } from "lucide-react";
import { jsx as jsx65, jsxs as jsxs44 } from "react/jsx-runtime";
function StepIndicator({ steps, currentStep, className }) {
  return /* @__PURE__ */ jsx65("div", { className: clsx46("flex items-center justify-between w-full", className), children: steps.map((step, idx) => {
    const isCompleted = idx < currentStep;
    const isCurrent = idx === currentStep;
    return /* @__PURE__ */ jsxs44(React58.Fragment, { children: [
      /* @__PURE__ */ jsxs44("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx65(
          "div",
          {
            className: clsx46(
              "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all",
              isCompleted ? "bg-urvos-success text-white" : isCurrent ? "bg-urvos-primary text-white ring-4 ring-urvos-primary/20" : "bg-urvos-surface-muted text-urvos-text-subtle border border-urvos-border"
            ),
            children: isCompleted ? /* @__PURE__ */ jsx65(Check7, { className: "h-4 w-4" }) : idx + 1
          }
        ),
        /* @__PURE__ */ jsx65(
          "span",
          {
            className: clsx46(
              "text-xs font-semibold hidden sm:inline-block",
              isCurrent ? "text-urvos-text" : "text-urvos-text-subtle"
            ),
            children: step
          }
        )
      ] }),
      idx < steps.length - 1 && /* @__PURE__ */ jsx65(
        "div",
        {
          className: clsx46(
            "flex-1 h-0.5 mx-3 transition-colors",
            idx < currentStep ? "bg-urvos-success" : "bg-urvos-border"
          )
        }
      )
    ] }, idx);
  }) });
}

// components/navigation/TabsScrollable.tsx
import { useState as useState27 } from "react";
import { clsx as clsx47 } from "clsx";
import { jsx as jsx66, jsxs as jsxs45 } from "react/jsx-runtime";
function TabsScrollable({ items, defaultTabId, className }) {
  var _a;
  const [activeTab, setActiveTab] = useState27(defaultTabId || ((_a = items[0]) == null ? void 0 : _a.id));
  const activeItem = items.find((i) => i.id === activeTab) || items[0];
  return /* @__PURE__ */ jsxs45("div", { className: clsx47("w-full space-y-4", className), children: [
    /* @__PURE__ */ jsx66("div", { className: "flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-urvos-border pb-1", children: items.map((t) => {
      const isActive = t.id === activeTab;
      return /* @__PURE__ */ jsx66(
        "button",
        {
          onClick: () => setActiveTab(t.id),
          className: clsx47(
            "whitespace-nowrap px-4 py-2 text-xs font-bold transition-all border-b-2",
            isActive ? "border-urvos-primary text-urvos-primary" : "border-transparent text-urvos-text-subtle hover:text-urvos-text"
          ),
          children: t.label
        },
        t.id
      );
    }) }),
    /* @__PURE__ */ jsx66("div", { className: "py-2", children: activeItem == null ? void 0 : activeItem.content })
  ] });
}

// components/navigation/TabsVertical.tsx
import { useState as useState28 } from "react";
import { clsx as clsx48 } from "clsx";
import { jsx as jsx67, jsxs as jsxs46 } from "react/jsx-runtime";
function TabsVertical({ items, defaultTabId, className }) {
  var _a;
  const [activeTab, setActiveTab] = useState28(defaultTabId || ((_a = items[0]) == null ? void 0 : _a.id));
  const activeItem = items.find((i) => i.id === activeTab) || items[0];
  return /* @__PURE__ */ jsxs46("div", { className: clsx48("flex w-full gap-6 bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm", className), children: [
    /* @__PURE__ */ jsx67("div", { className: "w-56 flex flex-col space-y-1 border-r border-urvos-border pr-4", children: items.map((tab) => {
      const isActive = tab.id === activeTab;
      return /* @__PURE__ */ jsxs46(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: clsx48(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors",
            isActive ? "bg-urvos-primary text-white shadow-xs" : "text-urvos-text-subtle hover:text-urvos-text hover:bg-urvos-surface-muted"
          ),
          children: [
            tab.icon && /* @__PURE__ */ jsx67("span", { children: tab.icon }),
            /* @__PURE__ */ jsx67("span", { children: tab.label })
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsx67("div", { className: "flex-1 py-1", children: activeItem == null ? void 0 : activeItem.content })
  ] });
}

// components/navigation/Wizard.tsx
import { useState as useState29 } from "react";
import { clsx as clsx49 } from "clsx";
import { jsx as jsx68, jsxs as jsxs47 } from "react/jsx-runtime";
function Wizard({ steps, onFinish, className }) {
  var _a;
  const [currentStep, setCurrentStep] = useState29(0);
  const total = steps.length;
  const next = () => {
    if (currentStep < total - 1) setCurrentStep((s) => s + 1);
    else onFinish == null ? void 0 : onFinish();
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };
  return /* @__PURE__ */ jsxs47("div", { className: clsx49("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-6", className), children: [
    /* @__PURE__ */ jsx68(StepIndicator, { steps: steps.map((s) => s.title), currentStep }),
    /* @__PURE__ */ jsx68("div", { className: "py-4 border-y border-urvos-border", children: (_a = steps[currentStep]) == null ? void 0 : _a.component }),
    /* @__PURE__ */ jsxs47("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx68(Button, { variant: "secondary", onClick: prev, disabled: currentStep === 0, children: "Previous" }),
      /* @__PURE__ */ jsx68(Button, { variant: "primary", onClick: next, children: currentStep === total - 1 ? "Finish Workflow" : "Next Step" })
    ] })
  ] });
}

// components/overlays/Fullscreen.tsx
import { clsx as clsx50 } from "clsx";
import { Minimize2 } from "lucide-react";
import { jsx as jsx69, jsxs as jsxs48 } from "react/jsx-runtime";
function Fullscreen({ isOpen, onClose, title = "Full Screen Clinical View", children, className }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx69(Portal9, { children: /* @__PURE__ */ jsxs48("div", { className: clsx50("fixed inset-0 z-50 bg-urvos-surface flex flex-col animate-in fade-in-0", className), children: [
    /* @__PURE__ */ jsxs48("header", { className: "px-6 py-4 border-b border-urvos-border flex items-center justify-between bg-urvos-surface-muted", children: [
      /* @__PURE__ */ jsx69("h2", { className: "text-base font-bold text-urvos-text", children: title }),
      /* @__PURE__ */ jsxs48(
        "button",
        {
          onClick: onClose,
          className: "flex items-center gap-2 text-xs font-semibold text-urvos-text-subtle hover:text-urvos-text p-2 rounded-lg hover:bg-urvos-border transition-colors",
          children: [
            /* @__PURE__ */ jsx69(Minimize2, { className: "h-4 w-4" }),
            " Exit Fullscreen"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx69("main", { className: "flex-1 overflow-auto p-6", children })
  ] }) });
}

// components/overlays/Lightbox.tsx
import { X as X9 } from "lucide-react";
import { jsx as jsx70, jsxs as jsxs49 } from "react/jsx-runtime";
function Lightbox({ isOpen, onClose, src, alt = "", title }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx70(Portal9, { children: /* @__PURE__ */ jsxs49("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-0", children: [
    /* @__PURE__ */ jsx70(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-4 p-2 text-white hover:text-gray-300 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
        "aria-label": "Close image lightbox",
        children: /* @__PURE__ */ jsx70(X9, { className: "h-6 w-6" })
      }
    ),
    /* @__PURE__ */ jsxs49("div", { className: "max-w-4xl max-h-[85vh] flex flex-col items-center space-y-2", children: [
      title && /* @__PURE__ */ jsx70("h3", { className: "text-white text-base font-semibold", children: title }),
      /* @__PURE__ */ jsx70("img", { src, alt, className: "max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" })
    ] })
  ] }) });
}

// components/overlays/InAppNotification.tsx
import { clsx as clsx51 } from "clsx";
import { Bell as Bell3, X as X10 } from "lucide-react";
import { jsx as jsx71, jsxs as jsxs50 } from "react/jsx-runtime";
function InAppNotification({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  className
}) {
  if (!isOpen) return null;
  const getTypeStyle = () => {
    switch (type) {
      case "success":
        return "border-urvos-success/40 bg-urvos-success/10 text-urvos-success";
      case "warning":
        return "border-urvos-warning/40 bg-urvos-warning/10 text-urvos-warning";
      case "error":
        return "border-urvos-danger/40 bg-urvos-danger/10 text-urvos-danger";
      default:
        return "border-urvos-primary/40 bg-urvos-primary/10 text-urvos-primary";
    }
  };
  return /* @__PURE__ */ jsx71(Portal9, { children: /* @__PURE__ */ jsxs50("div", { className: clsx51("fixed top-4 right-4 z-50 max-w-sm w-full bg-urvos-surface border rounded-xl p-4 shadow-xl flex items-start gap-3 animate-in slide-in-from-top-4", getTypeStyle(), className), children: [
    /* @__PURE__ */ jsx71(Bell3, { className: "h-5 w-5 mt-0.5 shrink-0" }),
    /* @__PURE__ */ jsxs50("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx71("h4", { className: "text-xs font-bold text-urvos-text leading-none", children: title }),
      /* @__PURE__ */ jsx71("p", { className: "text-xs text-urvos-text-subtle mt-1", children: message })
    ] }),
    /* @__PURE__ */ jsx71("button", { onClick: onClose, className: "text-urvos-text-subtle hover:text-urvos-text p-0.5", children: /* @__PURE__ */ jsx71(X10, { className: "h-4 w-4" }) })
  ] }) });
}

// components/utilities/ClickOutside.tsx
import { useEffect as useEffect19, useRef as useRef17 } from "react";
import { jsx as jsx72 } from "react/jsx-runtime";
function ClickOutside({ onClickOutside, children, className }) {
  const wrapperRef = useRef17(null);
  useEffect19(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClickOutside]);
  return /* @__PURE__ */ jsx72("div", { ref: wrapperRef, className, children });
}

// components/utilities/Debounce.ts
import { useEffect as useEffect20, useState as useState30 } from "react";
function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState30(value);
  useEffect20(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(handler);
  }, [value, delayMs]);
  return debouncedValue;
}

// components/utilities/FocusTrap.tsx
import { useEffect as useEffect21, useRef as useRef18 } from "react";
import { jsx as jsx73 } from "react/jsx-runtime";
function FocusTrap({ children, active = true }) {
  const containerRef = useRef18(null);
  useEffect21(() => {
    if (!active) return;
    const handleKeyDown = (e) => {
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusables = containerRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [active]);
  return /* @__PURE__ */ jsx73("div", { ref: containerRef, children });
}

// components/utilities/Hotkey.tsx
import { useEffect as useEffect22 } from "react";
function Hotkey({ keyCombo, onTrigger }) {
  useEffect22(() => {
    const handleKeyDown = (e) => {
      const parts = keyCombo.toLowerCase().split("+");
      const key = parts[parts.length - 1];
      const matchCtrl = parts.includes("control") || parts.includes("ctrl") ? e.ctrlKey : true;
      const matchMeta = parts.includes("meta") || parts.includes("cmd") || parts.includes("\u2318") ? e.metaKey : true;
      const matchAlt = parts.includes("alt") ? e.altKey : true;
      const matchShift = parts.includes("shift") ? e.shiftKey : true;
      if (e.key.toLowerCase() === key && matchCtrl && matchMeta && matchAlt && matchShift) {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyCombo, onTrigger]);
  return null;
}

// components/utilities/IdleTimer.tsx
import { useEffect as useEffect23, useState as useState31 } from "react";
import { Lock as Lock2 } from "lucide-react";
import { jsx as jsx74, jsxs as jsxs51 } from "react/jsx-runtime";
function IdleTimer({ timeoutMs = 9e5, onTimeout }) {
  const [isIdle, setIsIdle] = useState31(false);
  useEffect23(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsIdle(true);
        onTimeout == null ? void 0 : onTimeout();
      }, timeoutMs);
    };
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));
    resetTimer();
    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, [timeoutMs, onTimeout]);
  if (!isIdle) return null;
  return /* @__PURE__ */ jsx74(Portal9, { children: /* @__PURE__ */ jsx74("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs51("div", { className: "bg-urvos-surface border border-urvos-border rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl", children: [
    /* @__PURE__ */ jsx74("div", { className: "h-12 w-12 rounded-full bg-urvos-warning/10 text-urvos-warning flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsx74(Lock2, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxs51("div", { children: [
      /* @__PURE__ */ jsx74("h3", { className: "text-base font-bold text-urvos-text", children: "HIPAA Session Timeout" }),
      /* @__PURE__ */ jsx74("p", { className: "text-xs text-urvos-text-subtle mt-1", children: "Your clinical session has been locked due to inactivity." })
    ] }),
    /* @__PURE__ */ jsx74(Button, { variant: "primary", className: "w-full", onClick: () => setIsIdle(false), children: "Unlock Session" })
  ] }) }) });
}

// components/utilities/KeyboardShortcut.tsx
import { clsx as clsx52 } from "clsx";
import { jsx as jsx75 } from "react/jsx-runtime";
function KeyboardShortcut({ keys, className }) {
  return /* @__PURE__ */ jsx75("div", { className: clsx52("inline-flex items-center gap-1", className), children: keys.map((k, i) => /* @__PURE__ */ jsx75(
    "kbd",
    {
      className: "px-2 py-0.5 text-[10px] font-mono font-bold text-urvos-text bg-urvos-surface-muted border border-urvos-border rounded shadow-xs",
      children: k
    },
    i
  )) });
}

// components/utilities/ErrorBoundary.tsx
import { Component } from "react";
import { AlertTriangle as AlertTriangle4, RefreshCw } from "lucide-react";
import { jsx as jsx76, jsxs as jsxs52 } from "react/jsx-runtime";
var ErrorBoundary = class extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      hasError: false
    };
    this.resetError = () => {
      this.setState({ hasError: false, error: void 0 });
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    var _a;
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return /* @__PURE__ */ jsxs52("div", { className: "w-full p-6 border border-urvos-danger/30 bg-urvos-danger/5 rounded-xl flex flex-col items-center text-center space-y-3", children: [
        /* @__PURE__ */ jsx76("div", { className: "p-3 bg-urvos-danger/10 text-urvos-danger rounded-full", children: /* @__PURE__ */ jsx76(AlertTriangle4, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs52("div", { children: [
          /* @__PURE__ */ jsx76("h4", { className: "font-bold text-base text-urvos-text", children: "Component Error Encountered" }),
          /* @__PURE__ */ jsx76("p", { className: "text-xs text-urvos-text-subtle mt-1 max-w-md", children: ((_a = this.state.error) == null ? void 0 : _a.message) || "An unexpected rendering error occurred inside this clinical view." })
        ] }),
        /* @__PURE__ */ jsxs52(Button, { variant: "secondary", size: "sm", onClick: this.resetError, className: "gap-2 mt-2", children: [
          /* @__PURE__ */ jsx76(RefreshCw, { className: "h-3.5 w-3.5" }),
          " Retry Component"
        ] })
      ] });
    }
    return this.props.children;
  }
};

// components/utilities/CountUp.tsx
import { useEffect as useEffect24, useRef as useRef19, useState as useState32 } from "react";
import { Fragment as Fragment9, jsxs as jsxs53 } from "react/jsx-runtime";
function CountUp({
  target,
  duration = 400,
  prefix = "",
  suffix = ""
}) {
  const [display, setDisplay] = useState32(
    typeof target === "number" ? 0 : target
  );
  const ref = useRef19(null);
  useEffect24(() => {
    if (typeof target !== "number" || target === 0) {
      setDisplay(target);
      return;
    }
    const numTarget = target;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numTarget * eased);
      setDisplay(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }
    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current !== null) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);
  if (typeof display === "string") return /* @__PURE__ */ jsxs53(Fragment9, { children: [
    prefix,
    display,
    suffix
  ] });
  return /* @__PURE__ */ jsxs53(Fragment9, { children: [
    prefix,
    display.toLocaleString("en-IN"),
    suffix
  ] });
}

// components/utilities/SuspenseWrapper.tsx
import { Suspense } from "react";
import { jsx as jsx77, jsxs as jsxs54 } from "react/jsx-runtime";
function SuspenseWrapper({
  children,
  fallback = /* @__PURE__ */ jsxs54("div", { className: "w-full p-4 space-y-3", children: [
    /* @__PURE__ */ jsx77(Skeleton, { className: "h-6 w-1/3" }),
    /* @__PURE__ */ jsx77(Skeleton, { className: "h-20 w-full" })
  ] })
}) {
  return /* @__PURE__ */ jsx77(Suspense, { fallback, children });
}

// components/utilities/Throttle.ts
import { useEffect as useEffect25, useRef as useRef20, useState as useState33 } from "react";
function useThrottle(value, limitMs = 300) {
  const [throttledValue, setThrottledValue] = useState33(value);
  const lastRan = useRef20(Date.now());
  useEffect25(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limitMs) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limitMs - (Date.now() - lastRan.current));
    return () => clearTimeout(handler);
  }, [value, limitMs]);
  return throttledValue;
}

// components/utilities/ThemeProvider.tsx
import { createContext as createContext5, useContext as useContext4, useEffect as useEffect26, useState as useState34 } from "react";
import { jsx as jsx78 } from "react/jsx-runtime";
var ThemeContext = createContext5(void 0);
function ThemeProvider({ children }) {
  const [colorMode, setColorMode] = useState34("light");
  const [colorTheme, setColorTheme] = useState34("default");
  useEffect26(() => {
    const savedMode = localStorage.getItem("urvos-color-mode");
    const savedTheme = localStorage.getItem("urvos-color-theme");
    if (savedMode) setColorMode(savedMode);
    if (savedTheme) setColorTheme(savedTheme);
  }, []);
  useEffect26(() => {
    const root = document.documentElement;
    let isDark = colorMode === "dark";
    if (colorMode === "system") {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.removeAttribute("data-theme");
    }
    const themes = ["theme-nord", "theme-dental", "theme-therapy", "theme-cardiology", "theme-pediatrics", "theme-oncology", "theme-neurology"];
    root.classList.remove(...themes);
    if (colorTheme !== "default") {
      root.classList.add(`theme-${colorTheme}`);
    }
    localStorage.setItem("urvos-color-mode", colorMode);
    localStorage.setItem("urvos-color-theme", colorTheme);
  }, [colorMode, colorTheme]);
  return /* @__PURE__ */ jsx78(ThemeContext.Provider, { value: { colorMode, colorTheme, setColorMode, setColorTheme }, children });
}
function useTheme() {
  const context = useContext4(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// components/advanced/Advanced.tsx
import { clsx as clsx53 } from "clsx";
import { GripVertical, Maximize2 as Maximize22 } from "lucide-react";
import { jsx as jsx79, jsxs as jsxs55 } from "react/jsx-runtime";
function ColorPicker({ color, onChange, className }) {
  return /* @__PURE__ */ jsxs55("div", { className: clsx53("flex items-center space-x-2", className), children: [
    /* @__PURE__ */ jsx79(
      "input",
      {
        type: "color",
        value: color,
        onChange: (e) => onChange(e.target.value),
        className: "w-8 h-8 rounded cursor-pointer border border-urvos-border p-0 bg-transparent"
      }
    ),
    /* @__PURE__ */ jsx79(
      "input",
      {
        type: "text",
        value: color,
        onChange: (e) => onChange(e.target.value),
        className: "px-2 py-1 text-sm font-mono uppercase bg-urvos-surface border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary w-24"
      }
    )
  ] });
}
function ResizeHandle(_a) {
  var _b = _a, { orientation = "vertical", className } = _b, props = __objRest(_b, ["orientation", "className"]);
  return /* @__PURE__ */ jsx79(
    "div",
    __spreadProps(__spreadValues({
      className: clsx53(
        "flex items-center justify-center bg-urvos-surface-hover hover:bg-urvos-border transition-colors cursor-col-resize",
        orientation === "vertical" ? "w-2 h-full" : "h-2 w-full cursor-row-resize",
        className
      )
    }, props), {
      children: orientation === "vertical" ? /* @__PURE__ */ jsx79(GripVertical, { className: "w-4 h-4 text-urvos-text-muted" }) : /* @__PURE__ */ jsx79(GripVertical, { className: "w-4 h-4 text-urvos-text-muted transform rotate-90" })
    })
  );
}
function QRCode(_a) {
  var _b = _a, { value, size = 128, className } = _b, props = __objRest(_b, ["value", "size", "className"]);
  return /* @__PURE__ */ jsx79(
    "div",
    __spreadProps(__spreadValues({
      className: clsx53("bg-white p-2 border border-urvos-border rounded inline-block", className),
      style: { width: size, height: size }
    }, props), {
      children: /* @__PURE__ */ jsx79("div", { className: "w-full h-full bg-urvos-text flex items-center justify-center", children: /* @__PURE__ */ jsx79(Maximize22, { className: "w-1/2 h-1/2 text-white" }) })
    })
  );
}
function Markdown(_a) {
  var _b = _a, { content, className } = _b, props = __objRest(_b, ["content", "className"]);
  return /* @__PURE__ */ jsx79("div", __spreadProps(__spreadValues({ className: clsx53("prose prose-sm dark:prose-invert max-w-none", className) }, props), { children: /* @__PURE__ */ jsx79("div", { className: "whitespace-pre-wrap font-sans text-urvos-text", children: content }) }));
}

// components/misc/Misc.tsx
import { useState as useState35, useRef as useRef21, useEffect as useEffect27 } from "react";
import { clsx as clsx54 } from "clsx";
import { Copy, Check as Check8, MoreVertical, ChevronDown as ChevronDown6 } from "lucide-react";
import { jsx as jsx80, jsxs as jsxs56 } from "react/jsx-runtime";
function Tag(_a) {
  var _b = _a, { variant = "default", onRemove, className, children } = _b, props = __objRest(_b, ["variant", "onRemove", "className", "children"]);
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-urvos-primary/10 text-urvos-primary border-urvos-primary/20";
      case "success":
        return "bg-urvos-success/10 text-urvos-success border-urvos-success/20";
      case "warning":
        return "bg-urvos-warning/10 text-urvos-warning border-urvos-warning/20";
      case "destructive":
        return "bg-urvos-destructive/10 text-urvos-destructive border-urvos-destructive/20";
      default:
        return "bg-urvos-surface text-urvos-text border-urvos-border";
    }
  };
  return /* @__PURE__ */ jsxs56("span", __spreadProps(__spreadValues({ className: clsx54("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border", getVariantClasses(), className) }, props), { children: [
    children,
    onRemove && /* @__PURE__ */ jsx80("button", { type: "button", onClick: onRemove, className: "ml-1 hover:text-opacity-80 focus:outline-none", children: "\xD7" })
  ] }));
}
function CopyToClipboard(_a) {
  var _b = _a, { text, className, children } = _b, props = __objRest(_b, ["text", "className", "children"]);
  const [copied, setCopied] = useState35(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };
  return /* @__PURE__ */ jsxs56(
    "button",
    __spreadProps(__spreadValues({
      type: "button",
      onClick: handleCopy,
      className: clsx54("inline-flex items-center justify-center p-2 rounded hover:bg-urvos-surface-hover transition-colors text-urvos-text-muted hover:text-urvos-text", className),
      title: "Copy to clipboard"
    }, props), {
      children: [
        copied ? /* @__PURE__ */ jsx80(Check8, { className: "w-4 h-4 text-urvos-success" }) : /* @__PURE__ */ jsx80(Copy, { className: "w-4 h-4" }),
        children && /* @__PURE__ */ jsx80("span", { className: "ml-2 text-sm", children })
      ]
    })
  );
}
function KebabMenu({ options, className }) {
  const [isOpen, setIsOpen] = useState35(false);
  const menuRef = useRef21(null);
  useEffect27(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs56("div", { className: clsx54("relative inline-block", className), ref: menuRef, children: [
    /* @__PURE__ */ jsx80(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        className: "p-1 rounded-full hover:bg-urvos-surface-hover text-urvos-text-muted hover:text-urvos-text focus:outline-none focus:ring-2 focus:ring-urvos-primary",
        children: /* @__PURE__ */ jsx80(MoreVertical, { className: "w-5 h-5" })
      }
    ),
    isOpen && /* @__PURE__ */ jsx80("div", { className: "absolute right-0 mt-1 w-48 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg z-50 overflow-hidden py-1", children: options.map((opt, i) => /* @__PURE__ */ jsx80(
      "button",
      {
        onClick: () => {
          opt.onClick();
          setIsOpen(false);
        },
        className: clsx54(
          "w-full text-left px-4 py-2 text-sm hover:bg-urvos-surface-hover transition-colors",
          opt.danger ? "text-urvos-destructive" : "text-urvos-text"
        ),
        children: opt.label
      },
      i
    )) })
  ] });
}
function SplitButton({ label, onClick, options, className }) {
  const [isOpen, setIsOpen] = useState35(false);
  const menuRef = useRef21(null);
  useEffect27(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs56("div", { className: clsx54("relative inline-flex shadow-sm rounded-md", className), ref: menuRef, children: [
    /* @__PURE__ */ jsx80(
      "button",
      {
        type: "button",
        onClick,
        className: "relative inline-flex items-center px-4 py-2 rounded-l-md border border-urvos-primary bg-urvos-primary text-sm font-medium text-white hover:bg-opacity-90 focus:z-10 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-1 focus:ring-offset-urvos-background",
        children: label
      }
    ),
    /* @__PURE__ */ jsx80(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        className: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-l-0 border-urvos-primary bg-urvos-primary text-white hover:bg-opacity-90 focus:z-10 focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:ring-offset-1 focus:ring-offset-urvos-background",
        children: /* @__PURE__ */ jsx80(ChevronDown6, { className: "w-4 h-4" })
      }
    ),
    isOpen && /* @__PURE__ */ jsx80("div", { className: "absolute right-0 top-full mt-1 w-48 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg z-50 overflow-hidden py-1", children: options.map((opt, i) => /* @__PURE__ */ jsx80(
      "button",
      {
        onClick: () => {
          opt.onClick();
          setIsOpen(false);
        },
        className: "w-full text-left px-4 py-2 text-sm text-urvos-text hover:bg-urvos-surface-hover transition-colors",
        children: opt.label
      },
      i
    )) })
  ] });
}
function SegmentedControl({ options, value, onChange, className }) {
  return /* @__PURE__ */ jsx80("div", { className: clsx54("inline-flex p-1 bg-urvos-surface-hover rounded-lg border border-urvos-border", className), children: options.map((opt) => /* @__PURE__ */ jsx80(
    "button",
    {
      onClick: () => onChange(opt),
      className: clsx54(
        "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
        value === opt ? "bg-urvos-surface shadow-sm text-urvos-text border border-urvos-border" : "text-urvos-text-muted hover:text-urvos-text border border-transparent"
      ),
      children: opt
    },
    opt
  )) });
}
function OTPInput({ length = 6, value, onChange, className }) {
  const inputsRef = useRef21([]);
  const handleChange = (e, index) => {
    var _a;
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newValue = value.split("");
    newValue[index] = val;
    onChange(newValue.join(""));
    if (val && index < length - 1) {
      (_a = inputsRef.current[index + 1]) == null ? void 0 : _a.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    var _a;
    if (e.key === "Backspace" && !value[index] && index > 0) {
      (_a = inputsRef.current[index - 1]) == null ? void 0 : _a.focus();
    }
  };
  return /* @__PURE__ */ jsx80("div", { className: clsx54("flex space-x-2", className), children: Array.from({ length }).map((_, i) => /* @__PURE__ */ jsx80(
    "input",
    {
      ref: (el) => {
        inputsRef.current[i] = el;
      },
      type: "text",
      inputMode: "numeric",
      maxLength: 1,
      value: value[i] || "",
      onChange: (e) => handleChange(e, i),
      onKeyDown: (e) => handleKeyDown(e, i),
      className: "w-10 h-12 text-center text-lg font-semibold bg-urvos-surface border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary focus:border-urvos-primary"
    },
    i
  )) });
}

// components/charts/ChartArea.tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as Tooltip2,
  ResponsiveContainer,
  Legend
} from "recharts";
import { jsx as jsx81, jsxs as jsxs57 } from "react/jsx-runtime";
var DEFAULT_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
var ChartArea = ({
  data,
  categories,
  index,
  colors = DEFAULT_COLORS,
  valueFormatter = (value) => value.toString(),
  height = 300,
  showLegend = true,
  showGridLines = true
}) => {
  return /* @__PURE__ */ jsx81("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsx81(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs57(AreaChart, { data, margin: { top: 10, right: 10, left: 0, bottom: 0 }, children: [
    showGridLines && /* @__PURE__ */ jsx81(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }),
    /* @__PURE__ */ jsx81(
      XAxis,
      {
        dataKey: index,
        axisLine: false,
        tickLine: false,
        tick: { fontSize: 12, fill: "var(--text-3)" },
        dy: 10
      }
    ),
    /* @__PURE__ */ jsx81(
      YAxis,
      {
        axisLine: false,
        tickLine: false,
        tick: { fontSize: 12, fill: "var(--text-3)" },
        tickFormatter: valueFormatter,
        width: 50
      }
    ),
    /* @__PURE__ */ jsx81(
      Tooltip2,
      {
        contentStyle: {
          backgroundColor: "var(--surface)",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        },
        itemStyle: { color: "var(--text-1)", fontSize: "14px" },
        labelStyle: { color: "var(--text-2)", marginBottom: "4px", fontSize: "12px" },
        formatter: (value) => [valueFormatter(Number(value)), void 0]
      }
    ),
    showLegend && /* @__PURE__ */ jsx81(
      Legend,
      {
        verticalAlign: "top",
        height: 36,
        iconType: "circle",
        wrapperStyle: { fontSize: "12px", color: "var(--text-2)" }
      }
    ),
    categories.map((category, idx) => /* @__PURE__ */ jsx81(
      Area,
      {
        type: "monotone",
        dataKey: category,
        stroke: colors[idx % colors.length],
        fill: colors[idx % colors.length],
        fillOpacity: 0.2,
        strokeWidth: 2,
        activeDot: { r: 6, strokeWidth: 0 }
      },
      category
    ))
  ] }) }) });
};

// components/charts/ChartBar.tsx
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis as XAxis2,
  YAxis as YAxis2,
  CartesianGrid as CartesianGrid2,
  Tooltip as Tooltip3,
  ResponsiveContainer as ResponsiveContainer2,
  Legend as Legend2
} from "recharts";
import { clsx as clsx55 } from "clsx";
import { jsx as jsx82, jsxs as jsxs58 } from "react/jsx-runtime";
function ChartBar({
  data,
  bars,
  xAxisKey = "name",
  height = 300,
  className
}) {
  return /* @__PURE__ */ jsx82("div", { className: clsx55("chart-container", className), style: { width: "100%", height }, children: /* @__PURE__ */ jsx82(ResponsiveContainer2, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs58(
    RechartsBarChart,
    {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
      children: [
        /* @__PURE__ */ jsx82(CartesianGrid2, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }),
        /* @__PURE__ */ jsx82(
          XAxis2,
          {
            dataKey: xAxisKey,
            stroke: "var(--text-3)",
            fontSize: 12,
            tickLine: false,
            axisLine: false,
            dy: 10
          }
        ),
        /* @__PURE__ */ jsx82(
          YAxis2,
          {
            stroke: "var(--text-3)",
            fontSize: 12,
            tickLine: false,
            axisLine: false,
            dx: -10
          }
        ),
        /* @__PURE__ */ jsx82(
          Tooltip3,
          {
            contentStyle: {
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-pop)",
              color: "var(--text-1)",
              padding: "8px 12px"
            },
            itemStyle: { color: "var(--text-1)" },
            cursor: { fill: "var(--surface-soft)" }
          }
        ),
        /* @__PURE__ */ jsx82(Legend2, { wrapperStyle: { paddingTop: "20px" } }),
        bars.map((bar, idx) => /* @__PURE__ */ jsx82(
          Bar,
          {
            dataKey: bar.key,
            name: bar.name || bar.key,
            fill: bar.color || `var(--brand-${idx % 4 + 1})`,
            radius: [4, 4, 0, 0]
          },
          bar.key
        ))
      ]
    }
  ) }) });
}

// components/charts/ChartLine.tsx
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis as XAxis3,
  YAxis as YAxis3,
  CartesianGrid as CartesianGrid3,
  Tooltip as Tooltip4,
  ResponsiveContainer as ResponsiveContainer3,
  Legend as Legend3
} from "recharts";
import { clsx as clsx56 } from "clsx";
import { jsx as jsx83, jsxs as jsxs59 } from "react/jsx-runtime";
function ChartLine({
  data,
  lines,
  xAxisKey = "name",
  height = 300,
  className
}) {
  return /* @__PURE__ */ jsx83("div", { className: clsx56("chart-container", className), style: { width: "100%", height }, children: /* @__PURE__ */ jsx83(ResponsiveContainer3, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs59(
    RechartsLineChart,
    {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
      children: [
        /* @__PURE__ */ jsx83(CartesianGrid3, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }),
        /* @__PURE__ */ jsx83(
          XAxis3,
          {
            dataKey: xAxisKey,
            stroke: "var(--text-3)",
            fontSize: 12,
            tickLine: false,
            axisLine: false,
            dy: 10
          }
        ),
        /* @__PURE__ */ jsx83(
          YAxis3,
          {
            stroke: "var(--text-3)",
            fontSize: 12,
            tickLine: false,
            axisLine: false,
            dx: -10
          }
        ),
        /* @__PURE__ */ jsx83(
          Tooltip4,
          {
            contentStyle: {
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-pop)",
              color: "var(--text-1)"
            },
            itemStyle: { color: "var(--text-1)" }
          }
        ),
        /* @__PURE__ */ jsx83(Legend3, { wrapperStyle: { paddingTop: "20px" } }),
        lines.map((line, idx) => /* @__PURE__ */ jsx83(
          Line,
          {
            type: "monotone",
            dataKey: line.key,
            name: line.name || line.key,
            stroke: line.color || `var(--brand-${idx % 4 + 1})`,
            strokeWidth: 2,
            dot: { r: 4, strokeWidth: 2 },
            activeDot: { r: 6 }
          },
          line.key
        ))
      ]
    }
  ) }) });
}

// components/charts/ChartPie.tsx
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as Tooltip5,
  ResponsiveContainer as ResponsiveContainer4,
  Legend as Legend4
} from "recharts";
import { clsx as clsx57 } from "clsx";
import { jsx as jsx84, jsxs as jsxs60 } from "react/jsx-runtime";
function ChartPie({
  data,
  height = 300,
  innerRadius = "50%",
  outerRadius = "80%",
  className
}) {
  return /* @__PURE__ */ jsx84("div", { className: clsx57("chart-container", className), style: { width: "100%", height }, children: /* @__PURE__ */ jsx84(ResponsiveContainer4, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs60(RechartsPieChart, { margin: { top: 10, right: 10, left: 10, bottom: 10 }, children: [
    /* @__PURE__ */ jsx84(
      Pie,
      {
        data,
        cx: "50%",
        cy: "50%",
        innerRadius,
        outerRadius,
        dataKey: "value",
        stroke: "var(--surface)",
        strokeWidth: 2,
        children: data.map((entry, index) => /* @__PURE__ */ jsx84(
          Cell,
          {
            fill: entry.color || `var(--brand-${index % 4 + 1})`
          },
          `cell-${index}`
        ))
      }
    ),
    /* @__PURE__ */ jsx84(
      Tooltip5,
      {
        contentStyle: {
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
          boxShadow: "var(--shadow-pop)",
          color: "var(--text-1)",
          padding: "8px 12px"
        },
        itemStyle: { color: "var(--text-1)" }
      }
    ),
    /* @__PURE__ */ jsx84(Legend4, { verticalAlign: "bottom", height: 36 })
  ] }) }) });
}

// components/charts/ChartScatter.tsx
import { ResponsiveContainer as ResponsiveContainer5, ScatterChart, Scatter, XAxis as XAxis4, YAxis as YAxis4, CartesianGrid as CartesianGrid4, Tooltip as Tooltip6 } from "recharts";
import { clsx as clsx58 } from "clsx";
import { jsx as jsx85, jsxs as jsxs61 } from "react/jsx-runtime";
function ChartScatter({
  data,
  xAxisLabel = "Systolic BP (mmHg)",
  yAxisLabel = "Heart Rate (bpm)",
  height = 300,
  className
}) {
  return /* @__PURE__ */ jsxs61("div", { className: clsx58("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className), children: [
    /* @__PURE__ */ jsx85("div", { className: "mb-2", children: /* @__PURE__ */ jsxs61("h4", { className: "text-sm font-semibold text-urvos-text", children: [
      xAxisLabel,
      " vs ",
      yAxisLabel
    ] }) }),
    /* @__PURE__ */ jsx85("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsx85(ResponsiveContainer5, { children: /* @__PURE__ */ jsxs61(ScatterChart, { margin: { top: 10, right: 20, bottom: 20, left: 10 }, children: [
      /* @__PURE__ */ jsx85(CartesianGrid4, { strokeDasharray: "3 3", stroke: "var(--urvos-border, #E2E8F0)" }),
      /* @__PURE__ */ jsx85(XAxis4, { dataKey: "x", name: xAxisLabel, unit: "", stroke: "var(--urvos-text-subtle, #64748B)", fontSize: 12 }),
      /* @__PURE__ */ jsx85(YAxis4, { dataKey: "y", name: yAxisLabel, unit: "", stroke: "var(--urvos-text-subtle, #64748B)", fontSize: 12 }),
      /* @__PURE__ */ jsx85(Tooltip6, { cursor: { strokeDasharray: "3 3" } }),
      /* @__PURE__ */ jsx85(Scatter, { name: "Observations", data, fill: "var(--brand-solid, #0B5B8E)" })
    ] }) }) })
  ] });
}

// components/charts/ChartRadar.tsx
import { ResponsiveContainer as ResponsiveContainer6, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend as Legend5, Tooltip as Tooltip7 } from "recharts";
import { clsx as clsx59 } from "clsx";
import { jsx as jsx86, jsxs as jsxs62 } from "react/jsx-runtime";
function ChartRadar({
  data,
  title = "Multi-Domain Clinical Assessment",
  seriesALabel = "Current Evaluation",
  seriesBLabel,
  height = 300,
  className
}) {
  return /* @__PURE__ */ jsxs62("div", { className: clsx59("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className), children: [
    title && /* @__PURE__ */ jsx86("h4", { className: "text-sm font-semibold text-urvos-text mb-2", children: title }),
    /* @__PURE__ */ jsx86("div", { style: { width: "100%", height }, children: /* @__PURE__ */ jsx86(ResponsiveContainer6, { children: /* @__PURE__ */ jsxs62(RadarChart, { cx: "50%", cy: "50%", outerRadius: "80%", data, children: [
      /* @__PURE__ */ jsx86(PolarGrid, { stroke: "var(--urvos-border, #E2E8F0)" }),
      /* @__PURE__ */ jsx86(PolarAngleAxis, { dataKey: "subject", stroke: "var(--urvos-text-subtle, #64748B)", fontSize: 12 }),
      /* @__PURE__ */ jsx86(PolarRadiusAxis, { angle: 30, domain: [0, 100], fontSize: 10 }),
      /* @__PURE__ */ jsx86(Radar, { name: seriesALabel, dataKey: "A", stroke: "var(--brand-solid, #0B5B8E)", fill: "var(--brand-solid, #0B5B8E)", fillOpacity: 0.5 }),
      seriesBLabel && /* @__PURE__ */ jsx86(Radar, { name: seriesBLabel, dataKey: "B", stroke: "var(--sig-caution, #DE8A16)", fill: "var(--sig-caution, #DE8A16)", fillOpacity: 0.4 }),
      /* @__PURE__ */ jsx86(Tooltip7, {}),
      /* @__PURE__ */ jsx86(Legend5, {})
    ] }) }) })
  ] });
}

// components/charts/ChartGauge.tsx
import { ResponsiveContainer as ResponsiveContainer7, PieChart, Pie as Pie2, Cell as Cell2 } from "recharts";
import { clsx as clsx60 } from "clsx";
import { jsx as jsx87, jsxs as jsxs63 } from "react/jsx-runtime";
function ChartGauge({ value, title = "Clinical Risk Index", label = "Moderate Risk", className }) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const data = [
    { name: "Score", value: normalizedValue },
    { name: "Remaining", value: 100 - normalizedValue }
  ];
  const getColor = (val) => {
    if (val < 35) return "#0EA968";
    if (val < 70) return "#DE8A16";
    return "#DE3F68";
  };
  const activeColor = getColor(normalizedValue);
  return /* @__PURE__ */ jsxs63("div", { className: clsx60("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center", className), children: [
    /* @__PURE__ */ jsx87("h4", { className: "text-sm font-semibold text-urvos-text mb-2", children: title }),
    /* @__PURE__ */ jsxs63("div", { className: "relative w-48 h-32 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx87(ResponsiveContainer7, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx87(PieChart, { children: /* @__PURE__ */ jsxs63(
        Pie2,
        {
          dataKey: "value",
          startAngle: 180,
          endAngle: 0,
          data,
          cx: "50%",
          cy: "80%",
          innerRadius: 55,
          outerRadius: 75,
          stroke: "none",
          children: [
            /* @__PURE__ */ jsx87(Cell2, { fill: activeColor }),
            /* @__PURE__ */ jsx87(Cell2, { fill: "var(--surface-soft, #F1F5F9)" })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx87("div", { className: "absolute bottom-4 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxs63("span", { className: "text-2xl font-bold text-urvos-text leading-none", children: [
        normalizedValue,
        "%"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx87("span", { className: "text-xs font-semibold -mt-2", style: { color: activeColor }, children: label })
  ] });
}

// components/charts/ChartHeatmap.tsx
import { clsx as clsx61 } from "clsx";
import { jsx as jsx88, jsxs as jsxs64 } from "react/jsx-runtime";
function ChartHeatmap({ data, title = "Hourly Vital Signs Intensity", className }) {
  const days = Array.from(new Set(data.map((d) => d.day)));
  const hours = Array.from(new Set(data.map((d) => d.hour)));
  const getBgColor = (intensity) => {
    switch (intensity) {
      case 0:
        return "bg-urvos-surface-soft";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-blue-300 text-blue-900";
      case 3:
        return "bg-blue-500 text-white";
      case 4:
        return "bg-urvos-primary text-white font-bold";
      default:
        return "bg-urvos-surface-soft";
    }
  };
  return /* @__PURE__ */ jsxs64("div", { className: clsx61("w-full bg-urvos-surface border border-urvos-border rounded-xl p-4 shadow-sm", className), children: [
    /* @__PURE__ */ jsx88("h4", { className: "text-sm font-semibold text-urvos-text mb-3", children: title }),
    /* @__PURE__ */ jsx88("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs64("table", { className: "w-full text-xs text-center border-collapse", children: [
      /* @__PURE__ */ jsx88("thead", { children: /* @__PURE__ */ jsxs64("tr", { children: [
        /* @__PURE__ */ jsx88("th", { className: "p-1 text-left font-medium text-urvos-text-subtle w-16", children: "Day" }),
        hours.map((h) => /* @__PURE__ */ jsx88("th", { className: "p-1 font-medium text-urvos-text-subtle", children: h }, h))
      ] }) }),
      /* @__PURE__ */ jsx88("tbody", { children: days.map((day) => /* @__PURE__ */ jsxs64("tr", { children: [
        /* @__PURE__ */ jsx88("td", { className: "p-1 text-left font-semibold text-urvos-text", children: day }),
        hours.map((hour) => {
          const cell = data.find((d) => d.day === day && d.hour === hour);
          const intensity = cell ? cell.intensity : 0;
          return /* @__PURE__ */ jsx88("td", { className: "p-1", children: /* @__PURE__ */ jsx88(
            "div",
            {
              className: clsx61(
                "w-7 h-7 rounded flex items-center justify-center transition-colors",
                getBgColor(intensity)
              ),
              title: `${day} ${hour}: Intensity ${intensity}`,
              children: intensity > 0 ? intensity : ""
            }
          ) }, hour);
        })
      ] }, day)) })
    ] }) })
  ] });
}

// components/charts/ChartSparkline.tsx
import { ResponsiveContainer as ResponsiveContainer8, LineChart, Line as Line2 } from "recharts";
import { clsx as clsx62 } from "clsx";
import { jsx as jsx89 } from "react/jsx-runtime";
function ChartSparkline({
  data,
  color = "#0284C7",
  height = 32,
  width = 96,
  className
}) {
  const chartData = data.map((val, idx) => ({ idx, val }));
  return /* @__PURE__ */ jsx89("div", { className: clsx62("inline-block", className), style: { height, width }, children: /* @__PURE__ */ jsx89(ResponsiveContainer8, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx89(LineChart, { data: chartData, children: /* @__PURE__ */ jsx89(
    Line2,
    {
      type: "monotone",
      dataKey: "val",
      stroke: color,
      strokeWidth: 2,
      dot: false,
      isAnimationActive: false
    }
  ) }) }) });
}

// components/charts/ChartFunnel.tsx
import { clsx as clsx63 } from "clsx";
import { jsx as jsx90, jsxs as jsxs65 } from "react/jsx-runtime";
function ChartFunnel({ stages, className }) {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);
  return /* @__PURE__ */ jsxs65("div", { className: clsx63("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-3", className), children: [
    /* @__PURE__ */ jsx90("h4", { className: "text-sm font-semibold text-urvos-text mb-2", children: "Triage & Referral Pipeline" }),
    /* @__PURE__ */ jsx90("div", { className: "space-y-2", children: stages.map((stage, idx) => {
      const widthPct = Math.max(15, Math.round(stage.count / maxCount * 100));
      return /* @__PURE__ */ jsxs65("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx90("span", { className: "w-32 text-xs font-semibold text-urvos-text truncate text-right", children: stage.label }),
        /* @__PURE__ */ jsx90("div", { className: "flex-1 bg-urvos-surface-muted rounded-lg overflow-hidden h-7 flex items-center p-1", children: /* @__PURE__ */ jsx90(
          "div",
          {
            className: "h-full rounded-md transition-all flex items-center justify-end px-2",
            style: {
              width: `${widthPct}%`,
              backgroundColor: stage.color || "#0284C7"
            },
            children: /* @__PURE__ */ jsx90("span", { className: "text-xs font-bold text-white leading-none", children: stage.count.toLocaleString() })
          }
        ) })
      ] }, idx);
    }) })
  ] });
}

// components/charts/ChartSankey.tsx
import { clsx as clsx64 } from "clsx";
import { ArrowRight } from "lucide-react";
import { jsx as jsx91, jsxs as jsxs66 } from "react/jsx-runtime";
function ChartSankey({ flows, title = "Patient Referral & Transition Flow", className }) {
  return /* @__PURE__ */ jsxs66("div", { className: clsx64("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsx91("h4", { className: "text-sm font-semibold text-urvos-text", children: title }),
    /* @__PURE__ */ jsx91("div", { className: "space-y-3", children: flows.map((flow, idx) => /* @__PURE__ */ jsxs66("div", { className: "flex items-center justify-between p-3 border border-urvos-border rounded-lg bg-urvos-surface-muted/50", children: [
      /* @__PURE__ */ jsx91("span", { className: "text-xs font-semibold text-urvos-text", children: flow.from }),
      /* @__PURE__ */ jsxs66("div", { className: "flex items-center gap-2 text-urvos-primary", children: [
        /* @__PURE__ */ jsxs66("span", { className: "text-xs font-bold bg-urvos-primary/10 px-2 py-0.5 rounded", children: [
          flow.value,
          " pts"
        ] }),
        /* @__PURE__ */ jsx91(ArrowRight, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsx91("span", { className: "text-xs font-semibold text-urvos-text", children: flow.to })
    ] }, idx)) })
  ] });
}

// components/charts/ChartBubble.tsx
import { ResponsiveContainer as ResponsiveContainer9, ScatterChart as ScatterChart2, Scatter as Scatter2, XAxis as XAxis5, YAxis as YAxis5, ZAxis, Tooltip as Tooltip8, Cell as Cell3 } from "recharts";
import { clsx as clsx65 } from "clsx";
import { jsx as jsx92, jsxs as jsxs67 } from "react/jsx-runtime";
function ChartBubble({ data, title = "Multi-Dimensional Risk Distribution", className }) {
  return /* @__PURE__ */ jsxs67("div", { className: clsx65("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsx92("h4", { className: "text-sm font-semibold text-urvos-text", children: title }),
    /* @__PURE__ */ jsx92("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsx92(ResponsiveContainer9, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs67(ScatterChart2, { margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [
      /* @__PURE__ */ jsx92(XAxis5, { type: "number", dataKey: "x", name: "Age", unit: " yrs", stroke: "#94A3B8", fontSize: 12 }),
      /* @__PURE__ */ jsx92(YAxis5, { type: "number", dataKey: "y", name: "Systolic BP", unit: " mmHg", stroke: "#94A3B8", fontSize: 12 }),
      /* @__PURE__ */ jsx92(ZAxis, { type: "number", dataKey: "z", range: [60, 400], name: "Risk Index" }),
      /* @__PURE__ */ jsx92(Tooltip8, { cursor: { strokeDasharray: "3 3" } }),
      /* @__PURE__ */ jsx92(Scatter2, { data, fill: "#0284C7", children: data.map((entry, index) => /* @__PURE__ */ jsx92(Cell3, { fill: entry.z > 70 ? "#DE3F68" : "#0284C7" }, `cell-${index}`)) })
    ] }) }) })
  ] });
}

// components/healthcare/AllergyManager.tsx
import * as React70 from "react";
import { cva as cva14 } from "class-variance-authority";
import { clsx as clsx66 } from "clsx";
import { Plus, Trash2, AlertCircle as AlertCircle3 } from "lucide-react";
import { jsx as jsx93, jsxs as jsxs68 } from "react/jsx-runtime";
var allergyManagerVariants = cva14("allergy-manager", {
  variants: {
    variant: {
      default: "allergy-manager--default",
      compact: "allergy-manager--compact"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var AllergyManager = React70.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, allergies, onAddAllergy, onRemoveAllergy } = _b, props = __objRest(_b, ["className", "variant", "allergies", "onAddAllergy", "onRemoveAllergy"]);
    return /* @__PURE__ */ jsxs68(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx66(allergyManagerVariants({ variant }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs68("div", { className: "allergy-manager__header", children: [
            /* @__PURE__ */ jsxs68("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx93(AlertCircle3, { className: "w-5 h-5 text-urvos-warning" }),
              "Allergies & Intolerances"
            ] }),
            /* @__PURE__ */ jsxs68(Button, { variant: "secondary", size: "sm", onClick: onAddAllergy, className: "gap-2", children: [
              /* @__PURE__ */ jsx93(Plus, { className: "w-4 h-4" }),
              "Add"
            ] })
          ] }),
          allergies.length === 0 ? /* @__PURE__ */ jsx93("div", { className: "allergy-manager__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border", children: "No known allergies recorded." }) : /* @__PURE__ */ jsx93("ul", { className: "allergy-manager__list", children: allergies.map((allergy, idx) => {
            var _a2, _b2, _c, _d;
            return /* @__PURE__ */ jsxs68("li", { className: "allergy-manager__item", children: [
              /* @__PURE__ */ jsxs68("div", { className: "allergy-manager__item-content", children: [
                /* @__PURE__ */ jsx93("div", { className: "font-medium text-urvos-text", children: ((_a2 = allergy.code) == null ? void 0 : _a2.text) || ((_d = (_c = (_b2 = allergy.code) == null ? void 0 : _b2.coding) == null ? void 0 : _c[0]) == null ? void 0 : _d.display) || "Unknown Substance" }),
                /* @__PURE__ */ jsxs68("div", { className: "text-sm text-urvos-text-subtle flex gap-2", children: [
                  allergy.criticality && /* @__PURE__ */ jsxs68("span", { className: clsx66("capitalize", allergy.criticality === "high" ? "text-urvos-danger font-semibold" : ""), children: [
                    allergy.criticality,
                    " risk"
                  ] }),
                  allergy.reaction && /* @__PURE__ */ jsxs68("span", { children: [
                    "\u2022 ",
                    allergy.reaction.map((r) => {
                      var _a3, _b3;
                      return (_b3 = (_a3 = r.manifestation) == null ? void 0 : _a3[0]) == null ? void 0 : _b3.text;
                    }).filter(Boolean).join(", ")
                  ] })
                ] })
              ] }),
              onRemoveAllergy && allergy.id && /* @__PURE__ */ jsx93(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => onRemoveAllergy(allergy.id),
                  "aria-label": "Remove allergy",
                  className: "text-urvos-text-subtle hover:text-urvos-danger",
                  children: /* @__PURE__ */ jsx93(Trash2, { className: "w-4 h-4" })
                }
              )
            ] }, allergy.id || idx);
          }) })
        ]
      })
    );
  }
);
AllergyManager.displayName = "AllergyManager";

// components/healthcare/ClinicalDecisionSupport.tsx
import { clsx as clsx67 } from "clsx";
import { Lightbulb, Info as Info3, AlertTriangle as AlertTriangle5, ShieldAlert as ShieldAlert2, X as X11 } from "lucide-react";
import { jsx as jsx94, jsxs as jsxs69 } from "react/jsx-runtime";
function ClinicalDecisionSupport(_a) {
  var _b = _a, { recommendations, onAction, onDismiss, className } = _b, props = __objRest(_b, ["recommendations", "onAction", "onDismiss", "className"]);
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "info":
        return /* @__PURE__ */ jsx94(Info3, { className: "w-5 h-5 text-urvos-primary" });
      case "warning":
        return /* @__PURE__ */ jsx94(AlertTriangle5, { className: "w-5 h-5 text-urvos-warning" });
      case "critical":
        return /* @__PURE__ */ jsx94(ShieldAlert2, { className: "w-5 h-5 text-urvos-danger" });
    }
  };
  const getSeverityClasses = (severity) => {
    switch (severity) {
      case "info":
        return "bg-urvos-glass border-urvos-primary/20";
      case "warning":
        return "bg-urvos-warning-bg border-urvos-warning/20";
      case "critical":
        return "bg-urvos-danger-bg border-urvos-danger/20";
    }
  };
  if (recommendations.length === 0) return null;
  return /* @__PURE__ */ jsxs69("div", __spreadProps(__spreadValues({ className: clsx67("space-y-3", className) }, props), { children: [
    /* @__PURE__ */ jsxs69("div", { className: "flex items-center text-urvos-text font-semibold mb-4", children: [
      /* @__PURE__ */ jsx94(Lightbulb, { className: "w-5 h-5 mr-2 text-urvos-warning" }),
      "Clinical Decision Support"
    ] }),
    recommendations.map((rec) => /* @__PURE__ */ jsxs69(
      "div",
      {
        className: clsx67("relative p-4 rounded-urvos-md border flex flex-col sm:flex-row sm:items-start gap-4", getSeverityClasses(rec.severity)),
        children: [
          onDismiss && /* @__PURE__ */ jsx94(
            "button",
            {
              onClick: () => onDismiss(rec.id),
              className: "absolute top-2 right-2 text-urvos-text-muted hover:text-urvos-text p-1 rounded-full hover:bg-urvos-surface/50 transition-colors",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsx94(X11, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx94("div", { className: "flex-shrink-0 mt-0.5", children: getSeverityIcon(rec.severity) }),
          /* @__PURE__ */ jsxs69("div", { className: "flex-1 pr-6", children: [
            /* @__PURE__ */ jsx94("h4", { className: "font-semibold text-urvos-text", children: rec.title }),
            /* @__PURE__ */ jsx94("p", { className: "text-sm text-urvos-text-muted mt-1", children: rec.description }),
            rec.source && /* @__PURE__ */ jsxs69("p", { className: "text-xs text-urvos-text-muted mt-2 font-medium", children: [
              "Source: ",
              rec.source
            ] })
          ] }),
          rec.actionable && onAction && /* @__PURE__ */ jsx94("div", { className: "mt-3 sm:mt-0 flex-shrink-0", children: /* @__PURE__ */ jsx94(
            "button",
            {
              onClick: () => onAction(rec.id),
              className: "px-4 py-2 text-sm font-medium bg-urvos-surface border border-urvos-border rounded-urvos-md hover:bg-urvos-surface-alt text-urvos-text transition-colors shadow-urvos-soft",
              children: rec.actionLabel || "Take Action"
            }
          ) })
        ]
      },
      rec.id
    ))
  ] }));
}

// components/healthcare/ClinicalFlowsheet.tsx
import * as React71 from "react";
import { cva as cva15 } from "class-variance-authority";
import { clsx as clsx68 } from "clsx";
import { jsx as jsx95, jsxs as jsxs70 } from "react/jsx-runtime";
var flowsheetVariants = cva15("clinical-flowsheet", {
  variants: {
    density: {
      default: "clinical-flowsheet--default",
      compact: "clinical-flowsheet--compact"
    }
  },
  defaultVariants: {
    density: "default"
  }
});
var ClinicalFlowsheet = React71.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, density, observations, timepoints, codes: codes2 } = _b, props = __objRest(_b, ["className", "density", "observations", "timepoints", "codes"]);
    const sortedTimepoints = [...timepoints].sort((a, b) => a.getTime() - b.getTime());
    const getObservationValue = (code, timepoint) => {
      const obs = observations.find((o) => {
        var _a2, _b2;
        if (!o.effectiveDateTime) return false;
        const obsTime = new Date(o.effectiveDateTime).getTime();
        const tpTime = timepoint.getTime();
        const isMatch = Math.abs(obsTime - tpTime) < 36e5;
        const isCodeMatch = (_b2 = (_a2 = o.code) == null ? void 0 : _a2.coding) == null ? void 0 : _b2.some((c) => c.code === code);
        return isMatch && isCodeMatch;
      });
      if (!obs) return "-";
      if (obs.valueQuantity) {
        return `${obs.valueQuantity.value} ${obs.valueQuantity.unit || ""}`;
      }
      if (obs.valueString) {
        return obs.valueString;
      }
      return "Recorded";
    };
    return /* @__PURE__ */ jsx95(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx68(flowsheetVariants({ density }), className)
      }, props), {
        children: /* @__PURE__ */ jsx95("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs70("table", { className: "clinical-flowsheet__table", children: [
          /* @__PURE__ */ jsx95("thead", { children: /* @__PURE__ */ jsxs70("tr", { children: [
            /* @__PURE__ */ jsx95("th", { className: "clinical-flowsheet__th clinical-flowsheet__th--sticky", children: "Vitals / Measurements" }),
            sortedTimepoints.map((tp, idx) => /* @__PURE__ */ jsxs70("th", { className: "clinical-flowsheet__th", children: [
              /* @__PURE__ */ jsx95("div", { className: "text-sm font-medium", children: tp.toLocaleDateString() }),
              /* @__PURE__ */ jsx95("div", { className: "text-xs text-urvos-text-subtle", children: tp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
            ] }, idx))
          ] }) }),
          /* @__PURE__ */ jsx95("tbody", { children: codes2.map((codeDef) => /* @__PURE__ */ jsxs70("tr", { className: "clinical-flowsheet__tr", children: [
            /* @__PURE__ */ jsx95("td", { className: "clinical-flowsheet__td clinical-flowsheet__td--sticky font-medium text-urvos-text", children: codeDef.display }),
            sortedTimepoints.map((tp, idx) => {
              const val = getObservationValue(codeDef.code, tp);
              return /* @__PURE__ */ jsx95("td", { className: "clinical-flowsheet__td text-center text-urvos-text-subtle", children: val }, idx);
            })
          ] }, codeDef.code)) })
        ] }) })
      })
    );
  }
);
ClinicalFlowsheet.displayName = "ClinicalFlowsheet";

// components/healthcare/ClinicalImpression.tsx
import { clsx as clsx69 } from "clsx";
import { FileSearch, UserCheck, Calendar as Calendar2 } from "lucide-react";
import { jsx as jsx96, jsxs as jsxs71 } from "react/jsx-runtime";
function ClinicalImpression({ impressions, className }) {
  return /* @__PURE__ */ jsxs71("div", { className: clsx69("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs71("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx96(FileSearch, { className: "h-5 w-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx96("h3", { className: "text-base font-bold text-urvos-text", children: "Clinical Assessment & Impression" })
    ] }),
    /* @__PURE__ */ jsx96("div", { className: "space-y-3", children: impressions.map((imp) => /* @__PURE__ */ jsxs71("div", { className: "p-4 border border-urvos-border rounded-xl bg-urvos-surface-muted/30 space-y-2", children: [
      /* @__PURE__ */ jsxs71("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx96("span", { className: "text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-urvos-primary/10 text-urvos-primary", children: imp.status }),
        /* @__PURE__ */ jsxs71("div", { className: "flex items-center gap-1 text-xs text-urvos-text-subtle", children: [
          /* @__PURE__ */ jsx96(Calendar2, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsx96("span", { children: imp.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx96("p", { className: "text-sm font-semibold text-urvos-text leading-snug", children: imp.summary }),
      imp.prognosis && /* @__PURE__ */ jsxs71("p", { className: "text-xs text-urvos-text-subtle bg-urvos-surface p-2 rounded border border-urvos-border/50", children: [
        /* @__PURE__ */ jsx96("span", { className: "font-bold text-urvos-text", children: "Prognosis:" }),
        " ",
        imp.prognosis
      ] }),
      /* @__PURE__ */ jsxs71("div", { className: "flex items-center gap-1.5 text-xs text-urvos-text-subtle pt-1", children: [
        /* @__PURE__ */ jsx96(UserCheck, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxs71("span", { children: [
          "Assessed by ",
          imp.assessor
        ] })
      ] })
    ] }, imp.id)) })
  ] });
}

// components/healthcare/MedicationAdministration.tsx
import { clsx as clsx70 } from "clsx";
import { Pill, Clock as Clock2, UserCheck as UserCheck2 } from "lucide-react";
import { jsx as jsx97, jsxs as jsxs72 } from "react/jsx-runtime";
function MedicationAdministration({
  items,
  title = "Medication Administration Log (MAR)",
  className
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsx97(Badge, { variant: "success", children: "Completed" });
      case "in-progress":
        return /* @__PURE__ */ jsx97(Badge, { variant: "caution", children: "In Progress" });
      case "on-hold":
        return /* @__PURE__ */ jsx97(Badge, { variant: "neutral", children: "On Hold" });
      case "not-done":
        return /* @__PURE__ */ jsx97(Badge, { variant: "critical", children: "Not Done" });
      default:
        return /* @__PURE__ */ jsx97(Badge, { variant: "neutral", children: status });
    }
  };
  return /* @__PURE__ */ jsxs72("div", { className: clsx70("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs72("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsxs72("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx97(Pill, { className: "h-5 w-5 text-urvos-primary" }),
        /* @__PURE__ */ jsx97("h3", { className: "font-bold text-base text-urvos-text", children: title })
      ] }),
      /* @__PURE__ */ jsxs72("span", { className: "text-xs text-urvos-text-subtle", children: [
        items.length,
        " dose record(s)"
      ] })
    ] }),
    /* @__PURE__ */ jsx97("div", { className: "divide-y divide-urvos-border", children: items.map((item) => /* @__PURE__ */ jsx97("div", { className: "py-3 flex items-start justify-between gap-4 first:pt-0 last:pb-0", children: /* @__PURE__ */ jsxs72("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxs72("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx97("span", { className: "font-semibold text-sm text-urvos-text", children: item.medicationName }),
        /* @__PURE__ */ jsxs72("span", { className: "text-xs text-urvos-text-subtle font-mono", children: [
          "(",
          item.dosage,
          " \u2022 ",
          item.route,
          ")"
        ] }),
        getStatusBadge(item.status)
      ] }),
      item.notes && /* @__PURE__ */ jsx97("p", { className: "text-xs text-urvos-text-subtle", children: item.notes }),
      /* @__PURE__ */ jsxs72("div", { className: "flex items-center gap-3 text-[11px] text-urvos-text-muted", children: [
        /* @__PURE__ */ jsxs72("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx97(Clock2, { className: "h-3 w-3" }),
          " ",
          item.administeredAt
        ] }),
        /* @__PURE__ */ jsxs72("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx97(UserCheck2, { className: "h-3 w-3" }),
          " ",
          item.practitionerName
        ] })
      ] })
    ] }) }, item.id)) })
  ] });
}

// components/healthcare/ImmunizationRecord.tsx
import { clsx as clsx71 } from "clsx";
import { Syringe } from "lucide-react";
import { jsx as jsx98, jsxs as jsxs73 } from "react/jsx-runtime";
function ImmunizationRecord({
  records,
  title = "Immunization & Vaccine Registry",
  className
}) {
  return /* @__PURE__ */ jsxs73("div", { className: clsx71("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs73("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsxs73("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx98(Syringe, { className: "h-5 w-5 text-urvos-primary" }),
        /* @__PURE__ */ jsx98("h3", { className: "font-bold text-base text-urvos-text", children: title })
      ] }),
      /* @__PURE__ */ jsxs73("span", { className: "text-xs text-urvos-text-subtle", children: [
        records.length,
        " record(s)"
      ] })
    ] }),
    /* @__PURE__ */ jsx98("div", { className: "grid gap-3 md:grid-cols-2", children: records.map((item) => /* @__PURE__ */ jsxs73(
      "div",
      {
        className: "p-3.5 border border-urvos-border rounded-lg bg-urvos-surface-muted/40 space-y-2 flex flex-col justify-between",
        children: [
          /* @__PURE__ */ jsxs73("div", { children: [
            /* @__PURE__ */ jsxs73("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsx98("span", { className: "font-semibold text-sm text-urvos-text", children: item.vaccineName }),
              /* @__PURE__ */ jsx98(
                Badge,
                {
                  variant: item.status === "completed" ? "success" : item.status === "overdue" ? "critical" : "caution",
                  children: item.status.toUpperCase()
                }
              )
            ] }),
            /* @__PURE__ */ jsx98("p", { className: "text-xs text-urvos-text-subtle mt-0.5", children: item.targetDisease })
          ] }),
          /* @__PURE__ */ jsxs73("div", { className: "pt-2 border-t border-urvos-border/50 flex items-center justify-between text-[11px] text-urvos-text-muted", children: [
            /* @__PURE__ */ jsx98("span", { children: item.doseNumber }),
            /* @__PURE__ */ jsxs73("span", { children: [
              "Given: ",
              item.dateGiven
            ] })
          ] })
        ]
      },
      item.id
    )) })
  ] });
}

// components/healthcare/ProcedureHistory.tsx
import { clsx as clsx72 } from "clsx";
import { Stethoscope, Calendar as Calendar3, UserCheck as UserCheck3 } from "lucide-react";
import { jsx as jsx99, jsxs as jsxs74 } from "react/jsx-runtime";
function ProcedureHistory({
  procedures,
  title = "Surgical & Clinical Procedure History",
  className
}) {
  return /* @__PURE__ */ jsxs74("div", { className: clsx72("w-full bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsx99("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: /* @__PURE__ */ jsxs74("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx99(Stethoscope, { className: "h-5 w-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx99("h3", { className: "font-bold text-base text-urvos-text", children: title })
    ] }) }),
    /* @__PURE__ */ jsx99("div", { className: "space-y-3", children: procedures.map((proc) => /* @__PURE__ */ jsxs74("div", { className: "p-4 border border-urvos-border rounded-lg bg-urvos-surface space-y-2", children: [
      /* @__PURE__ */ jsxs74("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs74("div", { children: [
          /* @__PURE__ */ jsx99("h4", { className: "font-semibold text-sm text-urvos-text", children: proc.procedureName }),
          proc.code && /* @__PURE__ */ jsxs74("span", { className: "text-xs text-urvos-text-subtle font-mono", children: [
            "Code: ",
            proc.code
          ] })
        ] }),
        /* @__PURE__ */ jsx99(Badge, { variant: proc.status === "completed" ? "success" : "caution", children: proc.status })
      ] }),
      proc.outcome && /* @__PURE__ */ jsxs74("p", { className: "text-xs text-urvos-text-subtle", children: [
        "Outcome: ",
        proc.outcome
      ] }),
      /* @__PURE__ */ jsxs74("div", { className: "flex items-center gap-4 text-[11px] text-urvos-text-muted pt-1", children: [
        /* @__PURE__ */ jsxs74("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx99(Calendar3, { className: "h-3 w-3" }),
          " Performed: ",
          proc.performedDate
        ] }),
        /* @__PURE__ */ jsxs74("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx99(UserCheck3, { className: "h-3 w-3" }),
          " By: ",
          proc.performerName
        ] })
      ] })
    ] }, proc.id)) })
  ] });
}

// components/healthcare/ClinicalViewers.tsx
import { clsx as clsx73 } from "clsx";
import { Activity as Activity3, AlertTriangle as AlertTriangle7, CheckCircle as CheckCircle4, FileText as FileText2, Calendar as CalendarIcon3, User } from "lucide-react";
import { jsx as jsx100, jsxs as jsxs75 } from "react/jsx-runtime";
function LabResultViewer(_a) {
  var _b = _a, { results, patientName, className } = _b, props = __objRest(_b, ["results", "patientName", "className"]);
  const getStatusIcon = (status) => {
    switch (status) {
      case "normal":
        return /* @__PURE__ */ jsx100(CheckCircle4, { className: "w-5 h-5 text-urvos-success" });
      case "abnormal":
        return /* @__PURE__ */ jsx100(AlertTriangle7, { className: "w-5 h-5 text-urvos-warning" });
      case "critical":
        return /* @__PURE__ */ jsx100(AlertTriangle7, { className: "w-5 h-5 text-urvos-destructive animate-pulse" });
      default:
        return /* @__PURE__ */ jsx100(Activity3, { className: "w-5 h-5 text-urvos-text-muted" });
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "normal":
        return "bg-urvos-success/10 text-urvos-success border-urvos-success/20";
      case "abnormal":
        return "bg-urvos-warning/10 text-urvos-warning border-urvos-warning/20";
      case "critical":
        return "bg-urvos-destructive/10 text-urvos-destructive border-urvos-destructive/20 font-bold";
      default:
        return "bg-urvos-surface text-urvos-text border-urvos-border";
    }
  };
  return /* @__PURE__ */ jsxs75("div", __spreadProps(__spreadValues({ className: clsx73("bg-urvos-surface border border-urvos-border rounded-xl shadow-sm overflow-hidden", className) }, props), { children: [
    /* @__PURE__ */ jsxs75("div", { className: "p-4 border-b border-urvos-border bg-urvos-surface/50 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs75("div", { children: [
        /* @__PURE__ */ jsxs75("h3", { className: "text-lg font-semibold text-urvos-text flex items-center", children: [
          /* @__PURE__ */ jsx100(Activity3, { className: "w-5 h-5 mr-2 text-urvos-primary" }),
          "Lab Results"
        ] }),
        patientName && /* @__PURE__ */ jsxs75("p", { className: "text-sm text-urvos-text-muted mt-1", children: [
          "Patient: ",
          patientName
        ] })
      ] }),
      /* @__PURE__ */ jsxs75("div", { className: "flex space-x-2 text-sm", children: [
        /* @__PURE__ */ jsxs75("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx100("span", { className: "w-3 h-3 rounded-full bg-urvos-success mr-1" }),
          " Normal"
        ] }),
        /* @__PURE__ */ jsxs75("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx100("span", { className: "w-3 h-3 rounded-full bg-urvos-warning mr-1" }),
          " Abnormal"
        ] }),
        /* @__PURE__ */ jsxs75("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx100("span", { className: "w-3 h-3 rounded-full bg-urvos-destructive mr-1" }),
          " Critical"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx100("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs75("table", { className: "w-full text-left text-sm text-urvos-text", children: [
      /* @__PURE__ */ jsx100("thead", { className: "bg-urvos-background uppercase text-xs font-semibold text-urvos-text-muted border-b border-urvos-border", children: /* @__PURE__ */ jsxs75("tr", { children: [
        /* @__PURE__ */ jsx100("th", { className: "px-4 py-3", children: "Test" }),
        /* @__PURE__ */ jsx100("th", { className: "px-4 py-3", children: "Value" }),
        /* @__PURE__ */ jsx100("th", { className: "px-4 py-3", children: "Reference Range" }),
        /* @__PURE__ */ jsx100("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsx100("th", { className: "px-4 py-3 text-center", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx100("tbody", { className: "divide-y divide-urvos-border", children: results.length === 0 ? /* @__PURE__ */ jsx100("tr", { children: /* @__PURE__ */ jsx100("td", { colSpan: 5, className: "px-4 py-8 text-center text-urvos-text-muted", children: "No lab results available." }) }) : results.map((result) => /* @__PURE__ */ jsxs75("tr", { className: "hover:bg-urvos-surface-hover transition-colors", children: [
        /* @__PURE__ */ jsx100("td", { className: "px-4 py-3 font-medium", children: result.testName }),
        /* @__PURE__ */ jsx100("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs75("span", { className: clsx73("px-2 py-1 rounded border", getStatusClass(result.status)), children: [
          result.value,
          " ",
          result.unit
        ] }) }),
        /* @__PURE__ */ jsx100("td", { className: "px-4 py-3 text-urvos-text-muted", children: result.referenceRange }),
        /* @__PURE__ */ jsx100("td", { className: "px-4 py-3 text-urvos-text-muted", children: new Date(result.date).toLocaleDateString() }),
        /* @__PURE__ */ jsx100("td", { className: "px-4 py-3 flex justify-center", children: getStatusIcon(result.status) })
      ] }, result.id)) })
    ] }) })
  ] }));
}
function CarePlanViewer(_a) {
  var _b = _a, { plan, className } = _b, props = __objRest(_b, ["plan", "className"]);
  return /* @__PURE__ */ jsxs75("div", __spreadProps(__spreadValues({ className: clsx73("bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm space-y-6", className) }, props), { children: [
    /* @__PURE__ */ jsxs75("div", { className: "flex justify-between items-start border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs75("div", { children: [
        /* @__PURE__ */ jsxs75("h2", { className: "text-xl font-bold text-urvos-text flex items-center", children: [
          /* @__PURE__ */ jsx100(FileText2, { className: "w-6 h-6 mr-2 text-urvos-primary" }),
          plan.title
        ] }),
        /* @__PURE__ */ jsxs75("p", { className: "text-sm text-urvos-text-muted mt-1 capitalize", children: [
          "Intent: ",
          plan.intent
        ] })
      ] }),
      /* @__PURE__ */ jsxs75("div", { className: "text-sm text-urvos-text-muted bg-urvos-background px-3 py-1 rounded-full border border-urvos-border flex items-center", children: [
        /* @__PURE__ */ jsx100(CalendarIcon3, { className: "w-4 h-4 mr-1" }),
        new Date(plan.period.start).toLocaleDateString(),
        " ",
        plan.period.end ? `- ${new Date(plan.period.end).toLocaleDateString()}` : "(Ongoing)"
      ] })
    ] }),
    /* @__PURE__ */ jsxs75("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs75("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx100("h3", { className: "font-semibold text-urvos-text border-b border-urvos-border pb-2", children: "Goals" }),
        /* @__PURE__ */ jsx100("ul", { className: "space-y-3", children: plan.goals.length === 0 ? /* @__PURE__ */ jsx100("p", { className: "text-sm text-urvos-text-muted", children: "No goals specified." }) : plan.goals.map((goal) => /* @__PURE__ */ jsxs75("li", { className: "flex items-start bg-urvos-background p-3 rounded-lg border border-urvos-border", children: [
          goal.status === "achieved" ? /* @__PURE__ */ jsx100(CheckCircle4, { className: "w-5 h-5 text-urvos-success flex-shrink-0 mt-0.5" }) : goal.status === "in-progress" ? /* @__PURE__ */ jsx100(Activity3, { className: "w-5 h-5 text-urvos-primary flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsx100(AlertTriangle7, { className: "w-5 h-5 text-urvos-warning flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs75("div", { className: "ml-3", children: [
            /* @__PURE__ */ jsx100("p", { className: "text-sm text-urvos-text font-medium", children: goal.description }),
            /* @__PURE__ */ jsxs75("div", { className: "flex space-x-3 mt-1 text-xs text-urvos-text-muted", children: [
              /* @__PURE__ */ jsxs75("span", { className: "capitalize", children: [
                "Status: ",
                goal.status.replace("-", " ")
              ] }),
              goal.targetDate && /* @__PURE__ */ jsxs75("span", { children: [
                "Target: ",
                new Date(goal.targetDate).toLocaleDateString()
              ] })
            ] })
          ] })
        ] }, goal.id)) })
      ] }),
      /* @__PURE__ */ jsxs75("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx100("h3", { className: "font-semibold text-urvos-text border-b border-urvos-border pb-2", children: "Activities & Interventions" }),
        /* @__PURE__ */ jsx100("ul", { className: "space-y-3", children: plan.activities.length === 0 ? /* @__PURE__ */ jsx100("p", { className: "text-sm text-urvos-text-muted", children: "No activities specified." }) : plan.activities.map((activity) => /* @__PURE__ */ jsxs75(
          "li",
          {
            className: "bg-urvos-background p-3 rounded-lg border border-urvos-border border-l-4",
            style: { borderLeftColor: activity.status === "completed" ? "#10b981" : activity.status === "in-progress" ? "#3b82f6" : "#9ca3af" },
            children: [
              /* @__PURE__ */ jsx100("p", { className: "text-sm font-semibold text-urvos-text", children: activity.title }),
              activity.description && /* @__PURE__ */ jsx100("p", { className: "text-xs text-urvos-text-muted mt-1", children: activity.description }),
              /* @__PURE__ */ jsxs75("div", { className: "flex items-center justify-between mt-2 pt-2 border-t border-urvos-border/50 text-xs text-urvos-text-muted", children: [
                /* @__PURE__ */ jsxs75("span", { className: "capitalize font-medium", children: [
                  "Status: ",
                  activity.status.replace("-", " ")
                ] }),
                activity.performer && /* @__PURE__ */ jsxs75("span", { className: "flex items-center bg-urvos-surface px-2 py-0.5 rounded border border-urvos-border", children: [
                  /* @__PURE__ */ jsx100(User, { className: "w-3 h-3 mr-1" }),
                  " ",
                  activity.performer
                ] })
              ] })
            ]
          },
          activity.id
        )) })
      ] })
    ] })
  ] }));
}

// components/healthcare/DateRangeFilter.tsx
import { useState as useState36 } from "react";
import { clsx as clsx74 } from "clsx";
import { Calendar as Calendar4 } from "lucide-react";
import { jsx as jsx101, jsxs as jsxs76 } from "react/jsx-runtime";
function DateRangeFilter(_a) {
  var _b = _a, {
    value,
    onChange,
    presets = [
      { label: "Today", range: () => ({ startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], endDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] }) },
      { label: "Last 7 Days", range: () => {
        const end = /* @__PURE__ */ new Date();
        const start = /* @__PURE__ */ new Date();
        start.setDate(end.getDate() - 7);
        return { startDate: start.toISOString().split("T")[0], endDate: end.toISOString().split("T")[0] };
      } },
      { label: "Last 30 Days", range: () => {
        const end = /* @__PURE__ */ new Date();
        const start = /* @__PURE__ */ new Date();
        start.setDate(end.getDate() - 30);
        return { startDate: start.toISOString().split("T")[0], endDate: end.toISOString().split("T")[0] };
      } }
    ],
    className
  } = _b, props = __objRest(_b, [
    "value",
    "onChange",
    "presets",
    "className"
  ]);
  const [isOpen, setIsOpen] = useState36(false);
  return /* @__PURE__ */ jsxs76("div", __spreadProps(__spreadValues({ className: clsx74("relative", className) }, props), { children: [
    /* @__PURE__ */ jsxs76(
      "button",
      {
        type: "button",
        className: "flex items-center px-4 py-2 bg-urvos-surface border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary transition-colors hover:bg-urvos-surface-hover",
        onClick: () => setIsOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsx101(Calendar4, { className: "w-4 h-4 text-urvos-text-muted mr-2" }),
          /* @__PURE__ */ jsx101("span", { className: "text-sm text-urvos-text font-medium", children: value.startDate === value.endDate ? value.startDate : `${value.startDate} - ${value.endDate}` })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx101("div", { className: "absolute z-50 mt-2 p-4 bg-urvos-surface border border-urvos-border rounded-lg shadow-xl w-72", children: /* @__PURE__ */ jsxs76("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs76("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx101("label", { className: "text-xs font-semibold text-urvos-text-muted uppercase", children: "Presets" }),
        /* @__PURE__ */ jsx101("div", { className: "flex flex-wrap gap-2", children: presets.map((preset) => /* @__PURE__ */ jsx101(
          "button",
          {
            type: "button",
            className: "px-2 py-1 text-xs bg-urvos-surface-hover border border-urvos-border rounded text-urvos-text hover:bg-urvos-primary hover:text-urvos-text-inverse transition-colors",
            onClick: () => {
              onChange(preset.range());
              setIsOpen(false);
            },
            children: preset.label
          },
          preset.label
        )) })
      ] }),
      /* @__PURE__ */ jsxs76("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx101("label", { className: "text-xs font-semibold text-urvos-text-muted uppercase", children: "Custom Range" }),
        /* @__PURE__ */ jsxs76("div", { className: "flex space-x-2 items-center", children: [
          /* @__PURE__ */ jsx101(
            "input",
            {
              type: "date",
              className: "w-full px-2 py-1 text-sm bg-urvos-background border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary",
              value: value.startDate,
              onChange: (e) => onChange(__spreadProps(__spreadValues({}, value), { startDate: e.target.value }))
            }
          ),
          /* @__PURE__ */ jsx101("span", { className: "text-urvos-text-muted", children: "-" }),
          /* @__PURE__ */ jsx101(
            "input",
            {
              type: "date",
              className: "w-full px-2 py-1 text-sm bg-urvos-background border border-urvos-border rounded focus:outline-none focus:ring-1 focus:ring-urvos-primary",
              value: value.endDate,
              onChange: (e) => onChange(__spreadProps(__spreadValues({}, value), { endDate: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx101("div", { className: "flex justify-end pt-2 border-t border-urvos-border", children: /* @__PURE__ */ jsx101(
        "button",
        {
          type: "button",
          className: "px-4 py-2 text-sm font-medium text-urvos-text-inverse bg-urvos-primary rounded hover:bg-opacity-90 transition-colors",
          onClick: () => setIsOpen(false),
          children: "Apply"
        }
      ) })
    ] }) })
  ] }));
}

// components/healthcare/EncounterForm.tsx
import * as React73 from "react";
import { cva as cva16 } from "class-variance-authority";
import { clsx as clsx75 } from "clsx";
import { jsx as jsx102, jsxs as jsxs77 } from "react/jsx-runtime";
var encounterFormVariants = cva16("encounter-form", {
  variants: {
    layout: {
      default: "encounter-form--default",
      sidebar: "encounter-form--sidebar"
    }
  },
  defaultVariants: {
    layout: "default"
  }
});
var EncounterForm = React73.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, layout, patient, encounter, conditions, onSubmitEncounter } = _b, props = __objRest(_b, ["className", "layout", "patient", "encounter", "conditions", "onSubmitEncounter"]);
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      onSubmitEncounter == null ? void 0 : onSubmitEncounter(data);
    };
    return /* @__PURE__ */ jsxs77(
      "form",
      __spreadProps(__spreadValues({
        ref,
        className: clsx75(encounterFormVariants({ layout }), className),
        onSubmit: handleSubmit
      }, props), {
        children: [
          /* @__PURE__ */ jsxs77("div", { className: "encounter-form__section", children: [
            /* @__PURE__ */ jsx102("h3", { className: "encounter-form__heading", children: "Subjective" }),
            /* @__PURE__ */ jsxs77("div", { className: "encounter-form__grid", children: [
              /* @__PURE__ */ jsx102(Field, { label: "Chief Complaint", children: /* @__PURE__ */ jsx102(Input, { name: "chiefComplaint", placeholder: "E.g., patient complains of headache for 3 days" }) }),
              /* @__PURE__ */ jsx102(Field, { label: "History of Present Illness (HPI)", children: /* @__PURE__ */ jsx102(Textarea, { name: "hpi", rows: 3, placeholder: "Provide detailed history..." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs77("div", { className: "encounter-form__section", children: [
            /* @__PURE__ */ jsx102("h3", { className: "encounter-form__heading", children: "Objective" }),
            /* @__PURE__ */ jsx102("div", { className: "encounter-form__grid", children: /* @__PURE__ */ jsx102(Field, { label: "Physical Exam", children: /* @__PURE__ */ jsx102(Textarea, { name: "physicalExam", rows: 3, placeholder: "Findings from physical exam..." }) }) })
          ] }),
          /* @__PURE__ */ jsxs77("div", { className: "encounter-form__section", children: [
            /* @__PURE__ */ jsx102("h3", { className: "encounter-form__heading", children: "Assessment & Plan" }),
            /* @__PURE__ */ jsxs77("div", { className: "encounter-form__grid", children: [
              /* @__PURE__ */ jsx102(Field, { label: "Diagnoses", children: /* @__PURE__ */ jsx102(Input, { name: "diagnoses", placeholder: "Enter primary diagnosis or ICD-10" }) }),
              /* @__PURE__ */ jsx102(Field, { label: "Plan", children: /* @__PURE__ */ jsx102(Textarea, { name: "plan", rows: 4, placeholder: "Treatment plan, medications, follow-up..." }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs77("div", { className: "encounter-form__footer", children: [
            /* @__PURE__ */ jsx102(Button, { type: "button", variant: "secondary", children: "Cancel" }),
            /* @__PURE__ */ jsx102(Button, { type: "submit", children: "Sign & Save Encounter" })
          ] })
        ]
      })
    );
  }
);
EncounterForm.displayName = "EncounterForm";

// components/healthcare/FamilyHistory.tsx
import { clsx as clsx76 } from "clsx";
import { Users2 } from "lucide-react";
import { jsx as jsx103, jsxs as jsxs78 } from "react/jsx-runtime";
function FamilyHistory({ history, className }) {
  return /* @__PURE__ */ jsxs78("div", { className: clsx76("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs78("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx103(Users2, { className: "h-5 w-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx103("h3", { className: "text-base font-bold text-urvos-text", children: "Family Medical History (FHIR)" })
    ] }),
    /* @__PURE__ */ jsx103("div", { className: "divide-y divide-urvos-border", children: history.map((fh, idx) => /* @__PURE__ */ jsxs78("div", { className: "py-3 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs78("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsx103("span", { className: "text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded", children: fh.relation }),
        /* @__PURE__ */ jsx103("p", { className: "text-sm font-bold text-urvos-text mt-1", children: fh.condition }),
        fh.note && /* @__PURE__ */ jsx103("p", { className: "text-xs text-urvos-text-subtle", children: fh.note })
      ] }),
      fh.onsetAge && /* @__PURE__ */ jsxs78("span", { className: "text-xs text-urvos-text-subtle bg-urvos-surface-muted px-2 py-1 rounded border border-urvos-border", children: [
        "Onset: Age ",
        fh.onsetAge
      ] })
    ] }, idx)) })
  ] });
}

// components/healthcare/GoalTracker.tsx
import { clsx as clsx77 } from "clsx";
import { Target, Clock as Clock3 } from "lucide-react";
import { jsx as jsx104, jsxs as jsxs79 } from "react/jsx-runtime";
function GoalTracker({ goals: goals2, className }) {
  return /* @__PURE__ */ jsxs79("div", { className: clsx77("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs79("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsxs79("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx104(Target, { className: "h-5 w-5 text-urvos-primary" }),
        /* @__PURE__ */ jsx104("h3", { className: "text-base font-bold text-urvos-text", children: "FHIR Patient Health Goals" })
      ] }),
      /* @__PURE__ */ jsxs79("span", { className: "text-xs font-semibold text-urvos-text-subtle", children: [
        goals2.length,
        " active goals"
      ] })
    ] }),
    /* @__PURE__ */ jsx104("div", { className: "space-y-4", children: goals2.map((g) => /* @__PURE__ */ jsxs79("div", { className: "p-4 border border-urvos-border rounded-xl bg-urvos-surface space-y-2", children: [
      /* @__PURE__ */ jsxs79("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx104("span", { className: "text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded", children: g.category }),
        /* @__PURE__ */ jsxs79("div", { className: "flex items-center gap-1 text-xs text-urvos-text-subtle", children: [
          /* @__PURE__ */ jsx104(Clock3, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxs79("span", { children: [
            "Target: ",
            g.targetDate
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs79("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx104("span", { className: "text-sm font-bold text-urvos-text", children: g.title }),
        /* @__PURE__ */ jsxs79("span", { className: "text-xs font-bold text-urvos-text", children: [
          g.progressPct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx104(Progress, { value: g.progressPct, size: "sm" })
    ] }, g.id)) })
  ] });
}

// components/healthcare/MedicationList.tsx
import * as React74 from "react";
import { cva as cva17 } from "class-variance-authority";
import { clsx as clsx78 } from "clsx";
import { Pill as Pill2, AlertCircle as AlertCircle5 } from "lucide-react";
import { jsx as jsx105, jsxs as jsxs80 } from "react/jsx-runtime";
var medicationListVariants = cva17("medication-list", {
  variants: {
    variant: {
      default: "medication-list--default",
      compact: "medication-list--compact"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var MedicationList = React74.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, medications, onAddMedication, onRemoveMedication } = _b, props = __objRest(_b, ["className", "variant", "medications", "onAddMedication", "onRemoveMedication"]);
    return /* @__PURE__ */ jsxs80(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx78(medicationListVariants({ variant }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs80("div", { className: "medication-list__header", children: [
            /* @__PURE__ */ jsxs80("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx105(Pill2, { className: "w-5 h-5 text-urvos-primary" }),
              "Medications"
            ] }),
            onAddMedication && /* @__PURE__ */ jsx105(
              "button",
              {
                type: "button",
                onClick: onAddMedication,
                className: "ml-auto text-sm font-medium text-urvos-primary hover:underline",
                children: "Add"
              }
            )
          ] }),
          medications.length === 0 ? /* @__PURE__ */ jsxs80("div", { className: "medication-list__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsx105(AlertCircle5, { className: "w-6 h-6 text-urvos-text-muted" }),
            /* @__PURE__ */ jsx105("p", { children: "No active medications found." })
          ] }) : /* @__PURE__ */ jsx105("ul", { className: "medication-list__items", children: medications.map((med, idx) => {
            var _a2, _b2, _c, _d, _e, _f;
            return /* @__PURE__ */ jsxs80("li", { className: "medication-list__item", children: [
              /* @__PURE__ */ jsx105("div", { className: "medication-list__item-icon", children: /* @__PURE__ */ jsx105(Pill2, { className: "w-5 h-5 text-urvos-text-subtle" }) }),
              /* @__PURE__ */ jsxs80("div", { className: "medication-list__item-content", children: [
                /* @__PURE__ */ jsx105("div", { className: "font-medium text-urvos-text", children: ((_a2 = med.medicationCodeableConcept) == null ? void 0 : _a2.text) || ((_d = (_c = (_b2 = med.medicationCodeableConcept) == null ? void 0 : _b2.coding) == null ? void 0 : _c[0]) == null ? void 0 : _d.display) || "Unknown Medication" }),
                /* @__PURE__ */ jsx105("div", { className: "text-sm text-urvos-text-subtle", children: ((_f = (_e = med.dosageInstruction) == null ? void 0 : _e[0]) == null ? void 0 : _f.text) || "No dosage instruction provided" }),
                med.status && /* @__PURE__ */ jsx105("div", { className: "mt-1 text-xs px-2 py-0.5 rounded-full bg-urvos-surface-muted border border-urvos-border w-fit capitalize", children: med.status }),
                onRemoveMedication && /* @__PURE__ */ jsx105(
                  "button",
                  {
                    type: "button",
                    onClick: () => onRemoveMedication(med.id || ""),
                    className: "mt-1 text-xs font-medium text-urvos-text-danger hover:underline",
                    children: "Remove"
                  }
                )
              ] })
            ] }, med.id || idx);
          }) })
        ]
      })
    );
  }
);
MedicationList.displayName = "MedicationList";

// components/healthcare/NotificationSystem.tsx
import * as React75 from "react";
import { clsx as clsx79 } from "clsx";
import * as PopoverPrimitive6 from "@radix-ui/react-popover";
import { Bell as Bell4, Check as Check9, Trash2 as Trash22, Settings as Settings3 } from "lucide-react";
import { jsx as jsx106, jsxs as jsxs81 } from "react/jsx-runtime";
var NotificationContext = React75.createContext(void 0);
var useNotifications = () => {
  return React75.useContext(NotificationContext);
};
var NotificationProvider = ({
  children,
  initialNotifications = [],
  wsEndpoint
}) => {
  const [notifications, setNotifications] = React75.useState(initialNotifications);
  React75.useEffect(() => {
    if (!wsEndpoint) return;
    console.log(`Connecting to WebSocket at ${wsEndpoint}...`);
  }, [wsEndpoint]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAsRead = React75.useCallback((id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? __spreadProps(__spreadValues({}, n), { read: true }) : n));
  }, []);
  const markAllAsRead = React75.useCallback(() => {
    setNotifications((prev) => prev.map((n) => __spreadProps(__spreadValues({}, n), { read: true })));
  }, []);
  const removeNotification = React75.useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const addNotification = React75.useCallback((notif) => {
    setNotifications((prev) => [notif, ...prev]);
  }, []);
  return /* @__PURE__ */ jsx106(NotificationContext.Provider, { value: { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, addNotification }, children });
};
var NotificationPopover = ({
  notifications: propNotifications,
  unreadCount: propUnreadCount,
  onMarkAsRead,
  onMarkAllAsRead
} = {}) => {
  var _a, _b, _c, _d;
  const context = useNotifications();
  const notifications = (_a = propNotifications != null ? propNotifications : context == null ? void 0 : context.notifications) != null ? _a : [];
  const unreadCount = (_b = propUnreadCount != null ? propUnreadCount : context == null ? void 0 : context.unreadCount) != null ? _b : 0;
  const markAsRead = (_c = onMarkAsRead != null ? onMarkAsRead : context == null ? void 0 : context.markAsRead) != null ? _c : (() => {
  });
  const markAllAsRead = (_d = onMarkAllAsRead != null ? onMarkAllAsRead : context == null ? void 0 : context.markAllAsRead) != null ? _d : (() => {
  });
  return /* @__PURE__ */ jsxs81(PopoverPrimitive6.Root, { children: [
    /* @__PURE__ */ jsx106(PopoverPrimitive6.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs81(Button, { variant: "ghost", size: "icon", className: "relative", "aria-label": "Open notifications", children: [
      /* @__PURE__ */ jsx106(Bell4, { className: "w-5 h-5 text-urvos-text" }),
      unreadCount > 0 && /* @__PURE__ */ jsx106("span", { className: "absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-urvos-danger text-[9px] font-bold text-urvos-text-inverse", children: unreadCount > 9 ? "9+" : unreadCount })
    ] }) }),
    /* @__PURE__ */ jsx106(PopoverPrimitive6.Portal, { children: /* @__PURE__ */ jsxs81(
      PopoverPrimitive6.Content,
      {
        align: "end",
        sideOffset: 8,
        className: "z-50 w-80 rounded-lg border border-urvos-border bg-urvos-surface p-0 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
        children: [
          /* @__PURE__ */ jsxs81("div", { className: "flex items-center justify-between border-b border-urvos-border px-4 py-3", children: [
            /* @__PURE__ */ jsx106("h4", { className: "font-semibold text-urvos-text", children: "Notifications" }),
            unreadCount > 0 && /* @__PURE__ */ jsx106(Button, { variant: "ghost", size: "sm", onClick: markAllAsRead, className: "h-auto p-0 text-xs text-urvos-primary", children: "Mark all as read" })
          ] }),
          /* @__PURE__ */ jsx106("div", { className: "flex max-h-[300px] flex-col overflow-y-auto", children: notifications.length === 0 ? /* @__PURE__ */ jsx106("div", { className: "p-4 text-center text-sm text-urvos-text-subtle", children: "No new notifications" }) : notifications.map((notif) => /* @__PURE__ */ jsxs81(
            "div",
            {
              className: clsx79(
                "flex flex-col gap-1 border-b border-urvos-border p-4 transition-colors hover:bg-urvos-surface-muted cursor-pointer",
                !notif.read && "bg-urvos-primary/5"
              ),
              onClick: () => markAsRead(notif.id),
              children: [
                /* @__PURE__ */ jsxs81("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsx106("span", { className: "font-medium text-sm text-urvos-text", children: notif.title }),
                  !notif.read && /* @__PURE__ */ jsx106("span", { className: "h-2 w-2 rounded-full bg-urvos-primary flex-shrink-0 mt-1.5" })
                ] }),
                /* @__PURE__ */ jsx106("p", { className: "text-xs text-urvos-text-subtle line-clamp-2", children: notif.message }),
                /* @__PURE__ */ jsx106("span", { className: "text-[10px] text-urvos-text-muted mt-1", children: new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
              ]
            },
            notif.id
          )) }),
          /* @__PURE__ */ jsx106("div", { className: "border-t border-urvos-border p-2", children: /* @__PURE__ */ jsx106(Button, { variant: "ghost", className: "w-full text-sm text-urvos-primary justify-center", children: "View all notifications" }) })
        ]
      }
    ) })
  ] });
};
var NotificationCenter = () => {
  const context = useNotifications();
  const { notifications = [], unreadCount = 0, markAsRead = () => {
  }, markAllAsRead = () => {
  }, removeNotification = () => {
  } } = context != null ? context : {};
  return /* @__PURE__ */ jsxs81("div", { className: "notification-center bg-urvos-surface border border-urvos-border rounded-lg shadow-sm w-full max-w-3xl", children: [
    /* @__PURE__ */ jsxs81("div", { className: "flex items-center justify-between p-6 border-b border-urvos-border", children: [
      /* @__PURE__ */ jsxs81("div", { children: [
        /* @__PURE__ */ jsx106("h2", { className: "text-xl font-bold text-urvos-text", children: "Notification Center" }),
        /* @__PURE__ */ jsxs81("p", { className: "text-sm text-urvos-text-subtle mt-1", children: [
          "You have ",
          unreadCount,
          " unread messages."
        ] })
      ] }),
      /* @__PURE__ */ jsxs81(Button, { variant: "secondary", onClick: markAllAsRead, disabled: unreadCount === 0, children: [
        /* @__PURE__ */ jsx106(Check9, { className: "w-4 h-4 mr-2" }),
        " Mark all read"
      ] })
    ] }),
    /* @__PURE__ */ jsx106("div", { className: "divide-y divide-urvos-border", children: notifications.length === 0 ? /* @__PURE__ */ jsx106("div", { className: "p-12 text-center text-urvos-text-subtle", children: "You're all caught up!" }) : notifications.map((notif) => /* @__PURE__ */ jsxs81("div", { className: clsx79("p-6 flex items-start gap-4 transition-colors hover:bg-urvos-surface-muted", !notif.read && "bg-urvos-primary/5"), children: [
      /* @__PURE__ */ jsxs81("div", { className: "flex-grow", children: [
        /* @__PURE__ */ jsxs81("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsx106("h4", { className: "font-semibold text-urvos-text text-base", children: notif.title }),
          !notif.read && /* @__PURE__ */ jsx106("span", { className: "px-2 py-0.5 rounded-full bg-urvos-primary text-urvos-text-inverse text-[10px] font-bold uppercase", children: "New" })
        ] }),
        /* @__PURE__ */ jsx106("p", { className: "text-sm text-urvos-text-subtle", children: notif.message }),
        /* @__PURE__ */ jsx106("div", { className: "text-xs text-urvos-text-muted mt-2", children: new Date(notif.createdAt).toLocaleString() })
      ] }),
      /* @__PURE__ */ jsxs81("div", { className: "flex items-center gap-2", children: [
        !notif.read && /* @__PURE__ */ jsx106(Button, { variant: "ghost", size: "sm", onClick: () => markAsRead(notif.id), children: "Mark Read" }),
        /* @__PURE__ */ jsx106(Button, { variant: "ghost", size: "icon", className: "text-urvos-text-subtle hover:text-urvos-danger", onClick: () => removeNotification(notif.id), children: /* @__PURE__ */ jsx106(Trash22, { className: "w-4 h-4" }) })
      ] })
    ] }, notif.id)) })
  ] });
};
var NotificationSettings = () => {
  return /* @__PURE__ */ jsxs81("div", { className: "notification-settings bg-urvos-surface border border-urvos-border rounded-lg shadow-sm p-6 w-full max-w-2xl", children: [
    /* @__PURE__ */ jsxs81("div", { className: "flex items-center gap-3 mb-6 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsx106(Settings3, { className: "w-6 h-6 text-urvos-text" }),
      /* @__PURE__ */ jsx106("h2", { className: "text-xl font-bold text-urvos-text", children: "Notification Preferences" })
    ] }),
    /* @__PURE__ */ jsxs81("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs81("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs81("div", { children: [
          /* @__PURE__ */ jsx106("h4", { className: "font-medium text-urvos-text", children: "Push Notifications" }),
          /* @__PURE__ */ jsx106("p", { className: "text-sm text-urvos-text-subtle", children: "Receive push notifications in your browser." })
        ] }),
        /* @__PURE__ */ jsx106(Switch, { defaultChecked: true })
      ] }),
      /* @__PURE__ */ jsxs81("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs81("div", { children: [
          /* @__PURE__ */ jsx106("h4", { className: "font-medium text-urvos-text", children: "Email Alerts" }),
          /* @__PURE__ */ jsx106("p", { className: "text-sm text-urvos-text-subtle", children: "Receive a daily digest of clinical updates." })
        ] }),
        /* @__PURE__ */ jsx106(Switch, { defaultChecked: true })
      ] }),
      /* @__PURE__ */ jsxs81("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs81("div", { children: [
          /* @__PURE__ */ jsx106("h4", { className: "font-medium text-urvos-text", children: "SMS Messages" }),
          /* @__PURE__ */ jsx106("p", { className: "text-sm text-urvos-text-subtle", children: "Receive text messages for critical lab results." })
        ] }),
        /* @__PURE__ */ jsx106(Switch, {})
      ] })
    ] })
  ] });
};

// components/healthcare/ObservationTrend.tsx
import * as React76 from "react";
import { cva as cva18 } from "class-variance-authority";
import { clsx as clsx80 } from "clsx";
import {
  LineChart as LineChart2,
  Line as Line3,
  XAxis as XAxis6,
  YAxis as YAxis6,
  CartesianGrid as CartesianGrid5,
  Tooltip as Tooltip9,
  ResponsiveContainer as ResponsiveContainer10,
  ReferenceLine
} from "recharts";
import { jsx as jsx107, jsxs as jsxs82 } from "react/jsx-runtime";
var observationTrendVariants = cva18(
  "w-full rounded-md border border-urvos-border bg-urvos-surface shadow-sm",
  {
    variants: {
      variant: {
        default: "p-4",
        card: "p-6"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var ObservationTrend = React76.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, title, observations, yAxisDomain = ["auto", "auto"], referenceRange } = _b, props = __objRest(_b, ["className", "variant", "title", "observations", "yAxisDomain", "referenceRange"]);
    const data = React76.useMemo(() => {
      const validObs = observations.filter((o) => {
        var _a2;
        return o.effectiveDateTime && ((_a2 = o.valueQuantity) == null ? void 0 : _a2.value) !== void 0;
      });
      const sorted = [...validObs].sort(
        (a, b) => new Date(a.effectiveDateTime).getTime() - new Date(b.effectiveDateTime).getTime()
      );
      return sorted.map((o) => {
        var _a2, _b2;
        const date = new Date(o.effectiveDateTime);
        return {
          date: date.toLocaleDateString(),
          timestamp: date.getTime(),
          value: (_a2 = o.valueQuantity) == null ? void 0 : _a2.value,
          unit: (_b2 = o.valueQuantity) == null ? void 0 : _b2.unit
        };
      });
    }, [observations]);
    const unit = data.length > 0 ? data[0].unit : "";
    return /* @__PURE__ */ jsxs82(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx80(observationTrendVariants({ variant }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs82("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
            /* @__PURE__ */ jsx107("h3", { className: "text-lg font-semibold text-urvos-text", children: title }),
            /* @__PURE__ */ jsxs82("span", { className: "text-sm text-urvos-text-subtle", children: [
              data.length,
              " records ",
              unit ? `(${unit})` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsx107("div", { className: "mt-4 h-64 w-full", children: data.length === 0 ? /* @__PURE__ */ jsx107("div", { className: "flex h-full w-full items-center justify-center rounded-md border border-dashed border-urvos-border text-urvos-text-subtle", children: "No data available for trend" }) : /* @__PURE__ */ jsx107(ResponsiveContainer10, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs82(LineChart2, { data, margin: { top: 5, right: 20, bottom: 5, left: 0 }, children: [
            /* @__PURE__ */ jsx107(CartesianGrid5, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }),
            /* @__PURE__ */ jsx107(
              XAxis6,
              {
                dataKey: "date",
                tickLine: false,
                axisLine: false,
                tick: { fill: "var(--text-2)", fontSize: 12 },
                dy: 10
              }
            ),
            /* @__PURE__ */ jsx107(
              YAxis6,
              {
                domain: yAxisDomain,
                tickLine: false,
                axisLine: false,
                tick: { fill: "var(--text-2)", fontSize: 12 },
                dx: -10
              }
            ),
            /* @__PURE__ */ jsx107(
              Tooltip9,
              {
                contentStyle: {
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  borderRadius: "0.375rem",
                  boxShadow: "var(--shadow-pop)"
                },
                itemStyle: { color: "var(--brand-solid)" }
              }
            ),
            (referenceRange == null ? void 0 : referenceRange.low) !== void 0 && /* @__PURE__ */ jsx107(ReferenceLine, { y: referenceRange.low, stroke: "var(--sig-caution)", strokeDasharray: "3 3" }),
            (referenceRange == null ? void 0 : referenceRange.high) !== void 0 && /* @__PURE__ */ jsx107(ReferenceLine, { y: referenceRange.high, stroke: "var(--sig-critical)", strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx107(
              Line3,
              {
                type: "monotone",
                dataKey: "value",
                stroke: "var(--brand-solid)",
                strokeWidth: 2,
                dot: { r: 4, fill: "var(--brand-solid)", strokeWidth: 0 },
                activeDot: { r: 6 }
              }
            )
          ] }) }) })
        ]
      })
    );
  }
);
ObservationTrend.displayName = "ObservationTrend";

// components/healthcare/PatientBanner.tsx
import * as React77 from "react";
import { cva as cva19 } from "class-variance-authority";
import { clsx as clsx81 } from "clsx";
import { User as User2, AlertTriangle as AlertTriangle8 } from "lucide-react";
import { jsx as jsx108, jsxs as jsxs83 } from "react/jsx-runtime";
var patientBannerVariants = cva19(
  "flex items-center justify-between p-4 bg-urvos-surface border border-urvos-border rounded-urvos-md shadow-urvos-soft w-full",
  {
    variants: {
      status: {
        default: "",
        critical: "border-urvos-danger bg-urvos-danger-bg",
        warning: "border-urvos-warning bg-urvos-warning-bg"
      }
    },
    defaultVariants: {
      status: "default"
    }
  }
);
var PatientBanner = React77.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, status, patient, allergies = [] } = _b, props = __objRest(_b, ["className", "status", "patient", "allergies"]);
    var _a2, _b2, _c, _d;
    const name = (_a2 = patient.name) == null ? void 0 : _a2[0];
    const givenName = (_b2 = name == null ? void 0 : name.given) == null ? void 0 : _b2.join(" ");
    const familyName = name == null ? void 0 : name.family;
    const fullName = [givenName, familyName].filter(Boolean).join(" ") || "Unknown Patient";
    const dob = patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : "Unknown DOB";
    const gender = patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : "Unknown";
    let age = "Unknown Age";
    if (patient.birthDate) {
      const birth = new Date(patient.birthDate);
      const today = /* @__PURE__ */ new Date();
      let ageNum = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || m === 0 && today.getDate() < birth.getDate()) {
        ageNum--;
      }
      age = `${ageNum}y`;
    }
    let bannerStatus = status || "default";
    const criticalAllergies = allergies.filter((a) => a.criticality === "high");
    if (criticalAllergies.length > 0) {
      bannerStatus = "critical";
    }
    return /* @__PURE__ */ jsxs83(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx81(patientBannerVariants({ status: bannerStatus }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsx108("div", { className: "shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-urvos-surface-alt mr-4", children: /* @__PURE__ */ jsx108(User2, { className: "w-8 h-8 text-urvos-text-subtle" }) }),
          /* @__PURE__ */ jsxs83("div", { className: "grow flex flex-col justify-center", children: [
            /* @__PURE__ */ jsx108("div", { className: "text-lg font-semibold text-urvos-ink", children: fullName }),
            /* @__PURE__ */ jsxs83("div", { className: "flex items-center text-sm text-urvos-ink-light gap-2 mt-1", children: [
              /* @__PURE__ */ jsxs83("span", { children: [
                "DOB: ",
                dob,
                " (",
                age,
                ")"
              ] }),
              /* @__PURE__ */ jsx108("span", { className: "text-urvos-border", children: "\u2022" }),
              /* @__PURE__ */ jsx108("span", { children: gender }),
              /* @__PURE__ */ jsx108("span", { className: "text-urvos-border", children: "\u2022" }),
              /* @__PURE__ */ jsxs83("span", { children: [
                "MRN: ",
                ((_d = (_c = patient.identifier) == null ? void 0 : _c[0]) == null ? void 0 : _d.value) || "N/A"
              ] })
            ] })
          ] }),
          allergies.length > 0 && /* @__PURE__ */ jsxs83("div", { className: "flex items-center gap-2 bg-urvos-surface px-3 py-1.5 rounded-urvos-sm border border-urvos-border shadow-urvos-soft ml-4", children: [
            /* @__PURE__ */ jsx108(AlertTriangle8, { className: clsx81("w-5 h-5", criticalAllergies.length > 0 ? "text-urvos-danger" : "text-urvos-warning") }),
            /* @__PURE__ */ jsxs83("span", { className: "text-sm font-medium text-urvos-ink", children: [
              allergies.length,
              " ",
              allergies.length === 1 ? "Allergy" : "Allergies",
              criticalAllergies.length > 0 && ` (${criticalAllergies.length} Critical)`
            ] })
          ] })
        ]
      })
    );
  }
);
PatientBanner.displayName = "PatientBanner";

// components/healthcare/PatientEducation.tsx
import { clsx as clsx82 } from "clsx";
import { BookOpen, ExternalLink, FileText as FileText3, PlayCircle, Download } from "lucide-react";
import { jsx as jsx109, jsxs as jsxs84 } from "react/jsx-runtime";
function PatientEducation(_a) {
  var _b = _a, { materials, onAction, className } = _b, props = __objRest(_b, ["materials", "onAction", "className"]);
  const getTypeIcon = (type) => {
    switch (type) {
      case "article":
        return /* @__PURE__ */ jsx109(FileText3, { className: "w-5 h-5" });
      case "video":
        return /* @__PURE__ */ jsx109(PlayCircle, { className: "w-5 h-5" });
      case "pdf":
        return /* @__PURE__ */ jsx109(Download, { className: "w-5 h-5" });
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "assigned":
        return /* @__PURE__ */ jsx109("span", { className: "px-2 py-0.5 text-xs rounded bg-urvos-warning-bg text-urvos-warning border border-urvos-warning/20 font-medium", children: "Assigned" });
      case "viewed":
        return /* @__PURE__ */ jsx109("span", { className: "px-2 py-0.5 text-xs rounded bg-urvos-glass text-urvos-primary border border-urvos-primary/20 font-medium", children: "Viewed" });
      case "completed":
        return /* @__PURE__ */ jsx109("span", { className: "px-2 py-0.5 text-xs rounded bg-urvos-success-bg text-urvos-success border border-urvos-success/20 font-medium", children: "Completed" });
    }
  };
  return /* @__PURE__ */ jsxs84("div", __spreadProps(__spreadValues({ className: clsx82("bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft", className) }, props), { children: [
    /* @__PURE__ */ jsxs84("div", { className: "p-4 border-b border-urvos-border bg-urvos-surface/50 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs84("h3", { className: "text-lg font-semibold text-urvos-text flex items-center", children: [
        /* @__PURE__ */ jsx109(BookOpen, { className: "w-5 h-5 mr-2 text-urvos-primary" }),
        "Patient Education Materials"
      ] }),
      /* @__PURE__ */ jsxs84("span", { className: "text-sm text-urvos-text-muted bg-urvos-background px-2 py-1 rounded border border-urvos-border", children: [
        materials.length,
        " Items"
      ] })
    ] }),
    /* @__PURE__ */ jsx109("div", { className: "divide-y divide-urvos-border", children: materials.length === 0 ? /* @__PURE__ */ jsx109("div", { className: "p-6 text-center text-urvos-text-muted", children: /* @__PURE__ */ jsx109("p", { children: "No education materials assigned." }) }) : materials.map((item) => /* @__PURE__ */ jsxs84("div", { className: "p-4 hover:bg-urvos-surface-alt transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs84("div", { className: "flex items-start flex-1", children: [
        /* @__PURE__ */ jsx109("div", { className: "w-10 h-10 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary flex-shrink-0 mt-1", children: getTypeIcon(item.type) }),
        /* @__PURE__ */ jsxs84("div", { className: "ml-4", children: [
          /* @__PURE__ */ jsx109("h4", { className: "font-semibold text-urvos-text", children: item.title }),
          /* @__PURE__ */ jsx109("p", { className: "text-sm text-urvos-text-muted mt-1", children: item.description }),
          /* @__PURE__ */ jsxs84("div", { className: "flex items-center space-x-3 mt-2", children: [
            getStatusBadge(item.status),
            /* @__PURE__ */ jsxs84("span", { className: "text-xs text-urvos-text-muted", children: [
              "Assigned: ",
              new Date(item.dateAssigned).toLocaleDateString()
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx109("div", { className: "flex-shrink-0 sm:self-center", children: /* @__PURE__ */ jsxs84(
        "button",
        {
          onClick: () => onAction && onAction(item),
          className: "w-full sm:w-auto px-4 py-2 flex items-center justify-center text-sm font-medium text-urvos-primary bg-urvos-surface border border-urvos-border rounded hover:bg-urvos-surface-alt transition-colors shadow-urvos-soft",
          children: [
            item.type === "video" ? "Watch" : item.type === "pdf" ? "Download" : "Read",
            /* @__PURE__ */ jsx109(ExternalLink, { className: "w-4 h-4 ml-2" })
          ]
        }
      ) })
    ] }, item.id)) })
  ] }));
}

// components/healthcare/PatientSearch.tsx
import { useState as useState38 } from "react";
import { clsx as clsx83 } from "clsx";
import { Search as Search5, Loader2 as Loader23, User as User3 } from "lucide-react";
import { jsx as jsx110, jsxs as jsxs85 } from "react/jsx-runtime";
function PatientSearch(_a) {
  var _b = _a, {
    onSearch,
    onSelect,
    placeholder = "Search patients by name, DOB, or MRN...",
    debounceMs = 300,
    className
  } = _b, props = __objRest(_b, [
    "onSearch",
    "onSelect",
    "placeholder",
    "debounceMs",
    "className"
  ]);
  const [query, setQuery] = useState38("");
  const [results, setResults] = useState38([]);
  const [isLoading, setIsLoading] = useState38(false);
  const [isOpen, setIsOpen] = useState38(false);
  const handleSearch = async (val) => {
    setQuery(val);
    if (val.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    setIsOpen(true);
    try {
      const res = await onSearch(val);
      setResults(res);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs85("div", __spreadProps(__spreadValues({ className: clsx83("relative w-full", className) }, props), { children: [
    /* @__PURE__ */ jsxs85("div", { className: "relative flex items-center w-full", children: [
      /* @__PURE__ */ jsx110(Search5, { className: "absolute left-3 w-5 h-5 text-urvos-text-muted" }),
      /* @__PURE__ */ jsx110(
        "input",
        {
          type: "text",
          className: "w-full pl-10 pr-4 py-2 bg-urvos-surface border border-urvos-border rounded-urvos-md text-urvos-text placeholder-urvos-text-muted focus:outline-none focus:ring-2 focus:ring-urvos-primary",
          placeholder,
          value: query,
          onChange: (e) => handleSearch(e.target.value)
        }
      ),
      isLoading && /* @__PURE__ */ jsx110(Loader23, { className: "absolute right-3 w-5 h-5 text-urvos-primary animate-spin" })
    ] }),
    isOpen && query.trim().length > 0 && /* @__PURE__ */ jsx110("div", { className: "absolute z-50 w-full mt-2 bg-urvos-surface border border-urvos-border rounded-urvos-md shadow-urvos-hover overflow-hidden max-h-80 overflow-y-auto", children: results.length === 0 && !isLoading ? /* @__PURE__ */ jsxs85("div", { className: "p-4 text-sm text-urvos-text-muted text-center", children: [
      'No patients found for "',
      query,
      '"'
    ] }) : /* @__PURE__ */ jsx110("ul", { className: "divide-y divide-urvos-border", children: results.map((patient) => /* @__PURE__ */ jsxs85(
      "li",
      {
        className: "p-3 hover:bg-urvos-surface-alt cursor-pointer flex items-center space-x-3 transition-colors",
        onClick: () => {
          onSelect(patient);
          setIsOpen(false);
          setQuery("");
        },
        children: [
          patient.avatarUrl ? /* @__PURE__ */ jsx110("img", { src: patient.avatarUrl, alt: patient.name, className: "w-10 h-10 rounded-full" }) : /* @__PURE__ */ jsx110("div", { className: "w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary", children: /* @__PURE__ */ jsx110(User3, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs85("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx110("p", { className: "text-sm font-medium text-urvos-text truncate", children: patient.name }),
            /* @__PURE__ */ jsxs85("div", { className: "flex space-x-2 text-xs text-urvos-text-muted mt-1", children: [
              patient.dob && /* @__PURE__ */ jsxs85("span", { children: [
                "DOB: ",
                patient.dob
              ] }),
              patient.mrn && /* @__PURE__ */ jsxs85("span", { children: [
                "MRN: ",
                patient.mrn
              ] })
            ] })
          ] })
        ]
      },
      patient.id
    )) }) })
  ] }));
}

// components/healthcare/PatientSummary.tsx
import { clsx as clsx84 } from "clsx";
import { User as User4, Phone, Mail, MapPin, Hash, Calendar as Calendar5, Heart, ShieldAlert as ShieldAlert3 } from "lucide-react";
import { jsx as jsx111, jsxs as jsxs86 } from "react/jsx-runtime";
function PatientSummary(_a) {
  var _b = _a, { patient, className } = _b, props = __objRest(_b, ["patient", "className"]);
  const age = Math.floor(((/* @__PURE__ */ new Date()).getTime() - new Date(patient.dob).getTime()) / 315576e5);
  return /* @__PURE__ */ jsxs86("div", __spreadProps(__spreadValues({ className: clsx84("bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft overflow-hidden", className) }, props), { children: [
    /* @__PURE__ */ jsxs86("div", { className: "bg-gradient-to-r from-urvos-primary/10 to-urvos-background p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-urvos-border", children: [
      patient.avatarUrl ? /* @__PURE__ */ jsx111("img", { src: patient.avatarUrl, alt: patient.name, className: "w-24 h-24 rounded-full border-4 border-urvos-surface shadow-sm object-cover" }) : /* @__PURE__ */ jsx111("div", { className: "w-24 h-24 rounded-full bg-urvos-primary/20 flex items-center justify-center border-4 border-urvos-surface shadow-sm text-urvos-primary", children: /* @__PURE__ */ jsx111(User4, { className: "w-12 h-12" }) }),
      /* @__PURE__ */ jsxs86("div", { className: "flex-1 text-center md:text-left space-y-2", children: [
        /* @__PURE__ */ jsx111("h2", { className: "text-2xl font-bold text-urvos-text", children: patient.name }),
        /* @__PURE__ */ jsxs86("div", { className: "flex flex-wrap justify-center md:justify-start gap-3 text-sm text-urvos-text-muted", children: [
          /* @__PURE__ */ jsxs86("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx111(Calendar5, { className: "w-4 h-4 mr-1" }),
            " ",
            patient.dob,
            " (",
            age,
            " yrs)"
          ] }),
          /* @__PURE__ */ jsxs86("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx111(User4, { className: "w-4 h-4 mr-1" }),
            " ",
            patient.gender
          ] }),
          /* @__PURE__ */ jsxs86("span", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx111(Hash, { className: "w-4 h-4 mr-1" }),
            " MRN: ",
            patient.mrn
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs86("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-urvos-border", children: [
      /* @__PURE__ */ jsxs86("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsx111("h3", { className: "text-sm font-semibold text-urvos-text-muted uppercase tracking-wider mb-2", children: "Contact" }),
        patient.phone && /* @__PURE__ */ jsxs86("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx111(Phone, { className: "w-4 h-4 text-urvos-primary mt-0.5 mr-3" }),
          /* @__PURE__ */ jsx111("span", { className: "text-sm text-urvos-text", children: patient.phone })
        ] }),
        patient.email && /* @__PURE__ */ jsxs86("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx111(Mail, { className: "w-4 h-4 text-urvos-primary mt-0.5 mr-3" }),
          /* @__PURE__ */ jsx111("span", { className: "text-sm text-urvos-text", children: patient.email })
        ] }),
        patient.address && /* @__PURE__ */ jsxs86("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx111(MapPin, { className: "w-4 h-4 text-urvos-primary mt-0.5 mr-3" }),
          /* @__PURE__ */ jsx111("span", { className: "text-sm text-urvos-text", children: patient.address })
        ] })
      ] }),
      /* @__PURE__ */ jsxs86("div", { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsx111("h3", { className: "text-sm font-semibold text-urvos-text-muted uppercase tracking-wider mb-2", children: "Clinical Details" }),
        patient.bloodType && /* @__PURE__ */ jsxs86("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx111(Heart, { className: "w-4 h-4 text-urvos-danger mt-0.5 mr-3" }),
          /* @__PURE__ */ jsxs86("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx111("span", { className: "text-urvos-text-muted mr-1", children: "Blood Type:" }),
            /* @__PURE__ */ jsx111("span", { className: "text-urvos-text font-medium", children: patient.bloodType })
          ] })
        ] }),
        patient.primaryProvider && /* @__PURE__ */ jsxs86("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx111(User4, { className: "w-4 h-4 text-urvos-primary mt-0.5 mr-3" }),
          /* @__PURE__ */ jsxs86("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsx111("span", { className: "text-urvos-text-muted mr-1", children: "PCP:" }),
            /* @__PURE__ */ jsx111("span", { className: "text-urvos-text font-medium", children: patient.primaryProvider })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs86("div", { className: "p-5 space-y-4 bg-urvos-danger-bg", children: [
        /* @__PURE__ */ jsxs86("h3", { className: "text-sm font-semibold text-urvos-danger uppercase tracking-wider mb-2 flex items-center", children: [
          /* @__PURE__ */ jsx111(ShieldAlert3, { className: "w-4 h-4 mr-2" }),
          "Allergies"
        ] }),
        patient.allergies && patient.allergies.length > 0 ? /* @__PURE__ */ jsx111("div", { className: "flex flex-wrap gap-2", children: patient.allergies.map((allergy) => /* @__PURE__ */ jsx111("span", { className: "px-2 py-1 bg-urvos-danger-bg text-urvos-danger border border-urvos-danger/20 rounded-urvos-sm text-xs font-medium", children: allergy }, allergy)) }) : /* @__PURE__ */ jsx111("p", { className: "text-sm text-urvos-text-muted italic", children: "No known allergies" })
      ] })
    ] })
  ] }));
}

// components/healthcare/PatientTimeline.tsx
import { clsx as clsx85 } from "clsx";
import { Clock as Clock4, Activity as Activity4, FileText as FileText4, Pill as Pill3, Syringe as Syringe2, Calendar as Calendar6 } from "lucide-react";
import { jsx as jsx112, jsxs as jsxs87 } from "react/jsx-runtime";
function PatientTimeline(_a) {
  var _b = _a, { events, className } = _b, props = __objRest(_b, ["events", "className"]);
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const getEventIcon2 = (type) => {
    switch (type) {
      case "encounter":
        return /* @__PURE__ */ jsx112(Calendar6, { className: "w-4 h-4" });
      case "lab":
        return /* @__PURE__ */ jsx112(Activity4, { className: "w-4 h-4" });
      case "medication":
        return /* @__PURE__ */ jsx112(Pill3, { className: "w-4 h-4" });
      case "immunization":
        return /* @__PURE__ */ jsx112(Syringe2, { className: "w-4 h-4" });
      case "note":
        return /* @__PURE__ */ jsx112(FileText4, { className: "w-4 h-4" });
    }
  };
  const getEventColor2 = (type) => {
    switch (type) {
      case "encounter":
        return "bg-urvos-primary text-urvos-text-inverse border-urvos-primary";
      case "lab":
        return "bg-urvos-info text-urvos-text-inverse border-urvos-info";
      case "medication":
        return "bg-urvos-success text-urvos-text-inverse border-urvos-success";
      case "immunization":
        return "bg-urvos-caution text-urvos-text-inverse border-urvos-caution";
      case "note":
        return "bg-urvos-neutral text-urvos-text-inverse border-urvos-neutral";
    }
  };
  return /* @__PURE__ */ jsxs87("div", __spreadProps(__spreadValues({ className: clsx85("bg-urvos-surface border border-urvos-border rounded-urvos-lg p-5 shadow-urvos-soft", className) }, props), { children: [
    /* @__PURE__ */ jsxs87("h3", { className: "text-lg font-semibold text-urvos-text flex items-center mb-6", children: [
      /* @__PURE__ */ jsx112(Clock4, { className: "w-5 h-5 mr-2 text-urvos-primary" }),
      "Clinical Timeline"
    ] }),
    /* @__PURE__ */ jsx112("div", { className: "relative border-l-2 border-urvos-border ml-3 space-y-8", children: sortedEvents.length === 0 ? /* @__PURE__ */ jsx112("p", { className: "text-sm text-urvos-text-muted pl-4", children: "No timeline events found." }) : sortedEvents.map((event) => /* @__PURE__ */ jsxs87("div", { className: "relative pl-8", children: [
      /* @__PURE__ */ jsx112(
        "div",
        {
          className: clsx85(
            "absolute -left-[17px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm",
            getEventColor2(event.type)
          ),
          children: getEventIcon2(event.type)
        }
      ),
      /* @__PURE__ */ jsxs87("div", { className: "bg-urvos-background border border-urvos-border rounded-urvos-md p-4 shadow-urvos-soft hover:shadow-urvos-hover transition-shadow", children: [
        /* @__PURE__ */ jsxs87("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2", children: [
          /* @__PURE__ */ jsx112("h4", { className: "font-semibold text-urvos-text", children: event.title }),
          /* @__PURE__ */ jsxs87("span", { className: "text-xs font-medium text-urvos-text-muted bg-urvos-surface px-2 py-1 rounded mt-1 sm:mt-0 border border-urvos-border", children: [
            new Date(event.date).toLocaleDateString(),
            " ",
            new Date(event.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ] })
        ] }),
        event.description && /* @__PURE__ */ jsx112("p", { className: "text-sm text-urvos-text-muted mt-1", children: event.description }),
        /* @__PURE__ */ jsxs87("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-urvos-border/50 text-xs text-urvos-text-muted", children: [
          /* @__PURE__ */ jsx112("span", { className: "capitalize px-2 py-0.5 rounded bg-urvos-surface-hover border border-urvos-border", children: event.type }),
          event.performer && /* @__PURE__ */ jsxs87("span", { className: "font-medium", children: [
            "By: ",
            event.performer
          ] })
        ] })
      ] })
    ] }, event.id)) })
  ] }));
}

// components/healthcare/QualityMeasure.tsx
import { clsx as clsx86 } from "clsx";
import { Award, Target as Target2, TrendingUp as TrendingUp2, AlertCircle as AlertCircle6, CheckCircle as CheckCircle5 } from "lucide-react";
import { jsx as jsx113, jsxs as jsxs88 } from "react/jsx-runtime";
function QualityMeasure(_a) {
  var _b = _a, { measure, className } = _b, props = __objRest(_b, ["measure", "className"]);
  const percentage = Math.min(100, Math.max(0, measure.score / measure.target * 100));
  const getStatusColor = (status) => {
    switch (status) {
      case "met":
        return "text-urvos-success";
      case "not-met":
        return "text-urvos-destructive";
      case "pending":
        return "text-urvos-warning";
    }
  };
  const getStatusBg = (status) => {
    switch (status) {
      case "met":
        return "bg-urvos-success";
      case "not-met":
        return "bg-urvos-destructive";
      case "pending":
        return "bg-urvos-warning";
    }
  };
  return /* @__PURE__ */ jsxs88("div", __spreadProps(__spreadValues({ className: clsx86("bg-urvos-surface border border-urvos-border rounded-xl p-5 shadow-sm", className) }, props), { children: [
    /* @__PURE__ */ jsxs88("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxs88("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx113("div", { className: "w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center mr-3", children: /* @__PURE__ */ jsx113(Award, { className: "w-5 h-5 text-urvos-primary" }) }),
        /* @__PURE__ */ jsxs88("div", { children: [
          /* @__PURE__ */ jsx113("h3", { className: "font-semibold text-urvos-text", children: measure.title }),
          /* @__PURE__ */ jsx113("p", { className: "text-xs text-urvos-text-muted mt-0.5", children: measure.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxs88("div", { className: clsx86("flex items-center text-sm font-medium", getStatusColor(measure.status)), children: [
        measure.status === "met" && /* @__PURE__ */ jsx113(CheckCircle5, { className: "w-4 h-4 mr-1" }),
        measure.status === "not-met" && /* @__PURE__ */ jsx113(AlertCircle6, { className: "w-4 h-4 mr-1" }),
        measure.status === "pending" && /* @__PURE__ */ jsx113(TrendingUp2, { className: "w-4 h-4 mr-1" }),
        /* @__PURE__ */ jsx113("span", { className: "capitalize", children: measure.status.replace("-", " ") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs88("div", { className: "space-y-2 mt-6", children: [
      /* @__PURE__ */ jsxs88("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxs88("span", { className: "text-urvos-text font-medium", children: [
          "Score: ",
          measure.score
        ] }),
        /* @__PURE__ */ jsxs88("span", { className: "text-urvos-text-muted flex items-center", children: [
          /* @__PURE__ */ jsx113(Target2, { className: "w-3 h-3 mr-1" }),
          " Target: ",
          measure.target
        ] })
      ] }),
      /* @__PURE__ */ jsx113("div", { className: "w-full bg-urvos-background rounded-full h-2.5 border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsx113(
        "div",
        {
          className: clsx86("h-2.5 rounded-full transition-all duration-500 ease-out", getStatusBg(measure.status)),
          style: { width: `${percentage}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs88("div", { className: "text-right text-xs text-urvos-text-muted pt-1", children: [
        "Last updated: ",
        new Date(measure.lastUpdated).toLocaleDateString()
      ] })
    ] })
  ] }));
}

// components/healthcare/RiskAssessment.tsx
import { clsx as clsx87 } from "clsx";
import { ShieldAlert as ShieldAlert4 } from "lucide-react";
import { jsx as jsx114, jsxs as jsxs89 } from "react/jsx-runtime";
function RiskAssessment({ scores, className }) {
  const getLevelBadge = (lvl) => {
    switch (lvl) {
      case "low":
        return "bg-urvos-success/10 text-urvos-success border-urvos-success/30";
      case "moderate":
        return "bg-urvos-warning/10 text-urvos-warning border-urvos-warning/30";
      case "high":
      case "critical":
        return "bg-urvos-danger/10 text-urvos-danger border-urvos-danger/30";
    }
  };
  return /* @__PURE__ */ jsxs89("div", { className: clsx87("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs89("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx114(ShieldAlert4, { className: "h-5 w-5 text-urvos-danger" }),
      /* @__PURE__ */ jsx114("h3", { className: "text-base font-bold text-urvos-text", children: "Clinical Risk Assessment Scores" })
    ] }),
    /* @__PURE__ */ jsx114("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: scores.map((sc, idx) => /* @__PURE__ */ jsxs89("div", { className: "p-4 border border-urvos-border rounded-xl bg-urvos-surface flex flex-col justify-between space-y-2", children: [
      /* @__PURE__ */ jsxs89("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx114("span", { className: "text-xs font-bold text-urvos-text-subtle uppercase", children: sc.name }),
        /* @__PURE__ */ jsxs89("span", { className: clsx87("text-xs font-bold px-2 py-0.5 rounded border capitalize", getLevelBadge(sc.level)), children: [
          sc.level,
          " Risk"
        ] })
      ] }),
      /* @__PURE__ */ jsx114("div", { className: "text-2xl font-black text-urvos-text", children: sc.score }),
      /* @__PURE__ */ jsx114("p", { className: "text-xs text-urvos-text-subtle", children: sc.description })
    ] }, idx)) })
  ] });
}

// components/healthcare/Selectors.tsx
import { useState as useState39 } from "react";
import { clsx as clsx88 } from "clsx";
import { ChevronDown as ChevronDown7, Check as Check10, User as User5, Stethoscope as Stethoscope2 } from "lucide-react";
import { Fragment as Fragment10, jsx as jsx115, jsxs as jsxs90 } from "react/jsx-runtime";
function BaseSelector(_a) {
  var _b = _a, {
    options,
    value,
    onChange,
    placeholder = "Select...",
    icon,
    className
  } = _b, props = __objRest(_b, [
    "options",
    "value",
    "onChange",
    "placeholder",
    "icon",
    "className"
  ]);
  const [isOpen, setIsOpen] = useState39(false);
  return /* @__PURE__ */ jsxs90("div", __spreadProps(__spreadValues({ className: clsx88("relative w-full", className) }, props), { children: [
    /* @__PURE__ */ jsxs90(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between px-4 py-2 bg-urvos-surface border border-urvos-border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-urvos-primary",
        onClick: () => setIsOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsx115("div", { className: "flex items-center space-x-3 truncate", children: value ? /* @__PURE__ */ jsxs90(Fragment10, { children: [
            value.avatarUrl ? /* @__PURE__ */ jsx115("img", { src: value.avatarUrl, alt: value.label, className: "w-6 h-6 rounded-full" }) : icon ? /* @__PURE__ */ jsx115("div", { className: "text-urvos-primary", children: icon }) : null,
            /* @__PURE__ */ jsx115("span", { className: "text-urvos-text font-medium truncate", children: value.label })
          ] }) : /* @__PURE__ */ jsx115("span", { className: "text-urvos-text-muted", children: placeholder }) }),
          /* @__PURE__ */ jsx115(ChevronDown7, { className: "w-4 h-4 text-urvos-text-muted flex-shrink-0 ml-2" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx115("div", { className: "absolute z-50 w-full mt-1 bg-urvos-surface border border-urvos-border rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsx115("ul", { className: "divide-y divide-urvos-border", children: options.map((option) => /* @__PURE__ */ jsxs90(
      "li",
      {
        className: "p-3 hover:bg-urvos-surface-hover cursor-pointer flex items-center justify-between transition-colors",
        onClick: () => {
          onChange(option);
          setIsOpen(false);
        },
        children: [
          /* @__PURE__ */ jsxs90("div", { className: "flex items-center space-x-3", children: [
            option.avatarUrl ? /* @__PURE__ */ jsx115("img", { src: option.avatarUrl, alt: option.label, className: "w-8 h-8 rounded-full" }) : icon ? /* @__PURE__ */ jsx115("div", { className: "w-8 h-8 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary", children: icon }) : null,
            /* @__PURE__ */ jsxs90("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx115("span", { className: "text-sm font-medium text-urvos-text", children: option.label }),
              option.subLabel && /* @__PURE__ */ jsx115("span", { className: "text-xs text-urvos-text-muted", children: option.subLabel })
            ] })
          ] }),
          (value == null ? void 0 : value.id) === option.id && /* @__PURE__ */ jsx115(Check10, { className: "w-4 h-4 text-urvos-primary" })
        ]
      },
      option.id
    )) }) })
  ] }));
}
function PatientSelector(props) {
  return /* @__PURE__ */ jsx115(BaseSelector, __spreadProps(__spreadValues({}, props), { icon: /* @__PURE__ */ jsx115(User5, { className: "w-4 h-4" }) }));
}
function ProviderSelector(props) {
  return /* @__PURE__ */ jsx115(BaseSelector, __spreadProps(__spreadValues({}, props), { icon: /* @__PURE__ */ jsx115(Stethoscope2, { className: "w-4 h-4" }) }));
}

// components/healthcare/SocialHistory.tsx
import { clsx as clsx89 } from "clsx";
import { HeartHandshake, Cigarette, Wine, Home as Home4, Activity as Activity5 } from "lucide-react";
import { jsx as jsx116, jsxs as jsxs91 } from "react/jsx-runtime";
function SocialHistory({ factors, className }) {
  const getIcon = (cat) => {
    switch (cat) {
      case "Tobacco":
        return /* @__PURE__ */ jsx116(Cigarette, { className: "h-4 w-4 text-urvos-warning" });
      case "Alcohol":
        return /* @__PURE__ */ jsx116(Wine, { className: "h-4 w-4 text-urvos-primary" });
      case "Housing":
        return /* @__PURE__ */ jsx116(Home4, { className: "h-4 w-4 text-urvos-success" });
      default:
        return /* @__PURE__ */ jsx116(Activity5, { className: "h-4 w-4 text-urvos-primary" });
    }
  };
  return /* @__PURE__ */ jsxs91("div", { className: clsx89("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs91("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx116(HeartHandshake, { className: "h-5 w-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx116("h3", { className: "text-base font-bold text-urvos-text", children: "Social History & SDOH Determinants" })
    ] }),
    /* @__PURE__ */ jsx116("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: factors.map((f, idx) => /* @__PURE__ */ jsxs91("div", { className: "p-3 border border-urvos-border rounded-lg bg-urvos-surface-muted/30 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx116("div", { className: "p-2 rounded-md bg-urvos-surface border border-urvos-border mt-0.5", children: getIcon(f.category) }),
      /* @__PURE__ */ jsxs91("div", { children: [
        /* @__PURE__ */ jsx116("span", { className: "text-xs font-bold text-urvos-text-subtle uppercase", children: f.category }),
        /* @__PURE__ */ jsx116("h5", { className: "text-sm font-bold text-urvos-text", children: f.status }),
        /* @__PURE__ */ jsx116("p", { className: "text-xs text-urvos-text-subtle", children: f.detail })
      ] })
    ] }, idx)) })
  ] });
}

// components/healthcare/ABDMConsentManager.tsx
import { useState as useState40 } from "react";
import { clsx as clsx90 } from "clsx";
import { ShieldCheck as ShieldCheck2, ShieldAlert as ShieldAlert5, ShieldX, Clock as Clock5, AlertCircle as AlertCircle7 } from "lucide-react";
import { jsx as jsx117, jsxs as jsxs92 } from "react/jsx-runtime";
function ABDMConsentManager({
  consents,
  onRequestConsent,
  onRevokeConsent,
  className
}) {
  const [activeTab, setActiveTab] = useState40("all");
  const [showNewModal, setShowNewModal] = useState40(false);
  const [abhaId, setAbhaId] = useState40("");
  const [purpose, setPurpose] = useState40("Care Management");
  const getStatusBadge = (status) => {
    switch (status) {
      case "GRANTED":
        return /* @__PURE__ */ jsx117(Badge, { variant: "success", icon: /* @__PURE__ */ jsx117(ShieldCheck2, { className: "w-3 h-3" }), children: "Granted" });
      case "REQUESTED":
        return /* @__PURE__ */ jsx117(Badge, { variant: "caution", icon: /* @__PURE__ */ jsx117(Clock5, { className: "w-3 h-3" }), children: "Pending" });
      case "DENIED":
        return /* @__PURE__ */ jsx117(Badge, { variant: "critical", icon: /* @__PURE__ */ jsx117(ShieldX, { className: "w-3 h-3" }), children: "Denied" });
      case "EXPIRED":
        return /* @__PURE__ */ jsx117(Badge, { variant: "neutral", icon: /* @__PURE__ */ jsx117(AlertCircle7, { className: "w-3 h-3" }), children: "Expired" });
      case "REVOKED":
        return /* @__PURE__ */ jsx117(Badge, { variant: "critical", icon: /* @__PURE__ */ jsx117(ShieldAlert5, { className: "w-3 h-3" }), children: "Revoked" });
      default:
        return /* @__PURE__ */ jsx117(Badge, { variant: "neutral", children: status });
    }
  };
  const filteredConsents = consents.filter((c) => {
    if (activeTab === "active") return c.status === "GRANTED";
    if (activeTab === "pending") return c.status === "REQUESTED";
    return true;
  });
  return /* @__PURE__ */ jsxs92("div", { className: clsx90("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-5", className), children: [
    /* @__PURE__ */ jsxs92("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs92("div", { children: [
        /* @__PURE__ */ jsxs92("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx117(ShieldCheck2, { className: "w-5 h-5 text-urvos-primary" }),
          /* @__PURE__ */ jsx117("h3", { className: "text-base font-semibold text-urvos-text", children: "ABDM Health Data Consent Manager" })
        ] }),
        /* @__PURE__ */ jsx117("p", { className: "text-xs text-urvos-text-subtle mt-0.5", children: "Manage National Health Stack (ABDM) patient artifact consent requests and care context links." })
      ] }),
      /* @__PURE__ */ jsx117(Button, { size: "sm", onClick: () => setShowNewModal(true), children: "+ Request New Consent" })
    ] }),
    /* @__PURE__ */ jsx117("div", { className: "flex items-center space-x-2 border-b border-urvos-border pb-2", children: ["all", "active", "pending"].map((tab) => /* @__PURE__ */ jsxs92(
      "button",
      {
        onClick: () => setActiveTab(tab),
        className: clsx90(
          "px-3 py-1.2 text-xs font-semibold rounded-md capitalize transition-colors",
          activeTab === tab ? "bg-urvos-primary/10 text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-text"
        ),
        children: [
          tab,
          " Consents (",
          tab === "all" ? consents.length : consents.filter((c) => tab === "active" ? c.status === "GRANTED" : c.status === "REQUESTED").length,
          ")"
        ]
      },
      tab
    )) }),
    /* @__PURE__ */ jsx117("div", { className: "space-y-3", children: filteredConsents.length === 0 ? /* @__PURE__ */ jsx117("div", { className: "text-center py-8 text-xs text-urvos-text-subtle", children: "No consent records found for this filter." }) : filteredConsents.map((consent) => /* @__PURE__ */ jsxs92(
      "div",
      {
        className: "p-4 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-border-strong transition-colors space-y-3",
        children: [
          /* @__PURE__ */ jsxs92("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs92("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs92("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx117("span", { className: "font-mono text-xs font-bold text-urvos-text", children: consent.patientAbhaId }),
                getStatusBadge(consent.status)
              ] }),
              /* @__PURE__ */ jsxs92("div", { className: "text-xs text-urvos-text-subtle flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxs92("span", { children: [
                  "Purpose: ",
                  /* @__PURE__ */ jsx117("strong", { children: consent.purpose })
                ] }),
                /* @__PURE__ */ jsx117("span", { children: "\u2022" }),
                /* @__PURE__ */ jsxs92("span", { children: [
                  "Created: ",
                  consent.createdAt
                ] }),
                /* @__PURE__ */ jsx117("span", { children: "\u2022" }),
                /* @__PURE__ */ jsxs92("span", { children: [
                  "Expires: ",
                  consent.expiresAt
                ] })
              ] })
            ] }),
            consent.status === "GRANTED" && onRevokeConsent && /* @__PURE__ */ jsx117(
              Button,
              {
                variant: "secondary",
                size: "sm",
                className: "text-xs text-urvos-destructive border-urvos-destructive/30 hover:bg-urvos-destructive/10",
                onClick: () => onRevokeConsent(consent.id),
                children: "Revoke Consent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs92("div", { className: "pt-2 border-t border-urvos-border/60 text-xs flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs92("div", { className: "flex items-center space-x-1 flex-wrap gap-1", children: [
              /* @__PURE__ */ jsx117("span", { className: "text-urvos-text-subtle font-medium", children: "HI Types:" }),
              consent.hiTypes.map((t) => /* @__PURE__ */ jsx117("span", { className: "px-1.5 py-0.5 bg-urvos-surface border border-urvos-border rounded text-[10px] font-mono", children: t }, t))
            ] }),
            /* @__PURE__ */ jsxs92("div", { className: "text-urvos-text-subtle", children: [
              "Care Contexts: ",
              /* @__PURE__ */ jsxs92("span", { className: "font-semibold text-urvos-text", children: [
                consent.careContexts.length,
                " linked"
              ] })
            ] })
          ] })
        ]
      },
      consent.id
    )) }),
    showNewModal && /* @__PURE__ */ jsxs92("div", { className: "p-4 border border-urvos-primary/30 bg-urvos-primary/5 rounded-lg space-y-3", children: [
      /* @__PURE__ */ jsxs92("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx117("h4", { className: "text-xs font-bold uppercase tracking-wider text-urvos-primary", children: "Request ABDM Artifact Consent" }),
        /* @__PURE__ */ jsx117("button", { onClick: () => setShowNewModal(false), className: "text-xs text-urvos-text-subtle", children: "Close" })
      ] }),
      /* @__PURE__ */ jsxs92("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx117(
          "input",
          {
            type: "text",
            placeholder: "Patient ABHA ID (e.g. 91-1234-5678-9012)",
            value: abhaId,
            onChange: (e) => setAbhaId(e.target.value),
            className: "px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-surface"
          }
        ),
        /* @__PURE__ */ jsxs92(
          "select",
          {
            value: purpose,
            onChange: (e) => setPurpose(e.target.value),
            className: "px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-surface",
            children: [
              /* @__PURE__ */ jsx117("option", { value: "Care Management", children: "Care Management" }),
              /* @__PURE__ */ jsx117("option", { value: "Diagnostic Result Review", children: "Diagnostic Result Review" }),
              /* @__PURE__ */ jsx117("option", { value: "Emergency Consultation", children: "Emergency Consultation" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx117("div", { className: "flex justify-end space-x-2", children: /* @__PURE__ */ jsx117(
        Button,
        {
          size: "sm",
          onClick: () => {
            onRequestConsent == null ? void 0 : onRequestConsent(abhaId, purpose, ["OPConsultation", "Prescription", "DiagnosticReport"]);
            setShowNewModal(false);
          },
          children: "Send OTP Consent Request"
        }
      ) })
    ] })
  ] });
}

// components/healthcare/ABHAHealthIDCard.tsx
import { clsx as clsx91 } from "clsx";
import { QrCode, CheckCircle2 as CheckCircle25, Shield } from "lucide-react";
import { jsx as jsx118, jsxs as jsxs93 } from "react/jsx-runtime";
function ABHAHealthIDCard({
  abhaNumber,
  abhaAddress,
  name,
  gender,
  dateOfBirth,
  mobile,
  state,
  district,
  isVerified = true,
  className
}) {
  return /* @__PURE__ */ jsxs93(
    "div",
    {
      className: clsx91(
        "w-full max-w-md bg-urvos-primary text-urvos-surface rounded-2xl p-5 shadow-xl border border-urvos-border/20 relative overflow-hidden space-y-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsx118(Shield, { className: "w-48 h-48 absolute -right-10 -bottom-10 opacity-10 pointer-events-none" }),
        /* @__PURE__ */ jsxs93("div", { className: "flex items-center justify-between border-b border-urvos-surface/20 pb-3", children: [
          /* @__PURE__ */ jsxs93("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx118("div", { className: "w-8 h-8 rounded-full bg-urvos-surface/20 flex items-center justify-center font-bold text-xs", children: "\u{1F1EE}\u{1F1F3}" }),
            /* @__PURE__ */ jsxs93("div", { children: [
              /* @__PURE__ */ jsx118("h4", { className: "text-xs font-bold uppercase tracking-wider text-urvos-surface/90", children: "Ayushman Bharat Digital Mission" }),
              /* @__PURE__ */ jsx118("div", { className: "text-[10px] text-urvos-surface/70", children: "National Health Authority \u2022 Govt. of India" })
            ] })
          ] }),
          isVerified && /* @__PURE__ */ jsxs93("span", { className: "flex items-center space-x-1 px-2 py-0.5 bg-urvos-success-bg border border-urvos-success/40 rounded-full text-[10px] font-semibold text-urvos-success", children: [
            /* @__PURE__ */ jsx118(CheckCircle25, { className: "w-3 h-3 text-urvos-success" }),
            /* @__PURE__ */ jsx118("span", { children: "ABHA Verified" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs93("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs93("div", { className: "space-y-2 min-w-0", children: [
            /* @__PURE__ */ jsxs93("div", { children: [
              /* @__PURE__ */ jsx118("div", { className: "text-[10px] uppercase text-urvos-surface/70 tracking-wider", children: "Patient Name" }),
              /* @__PURE__ */ jsx118("div", { className: "font-bold text-lg truncate", children: name })
            ] }),
            /* @__PURE__ */ jsxs93("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs", children: [
              /* @__PURE__ */ jsxs93("div", { children: [
                /* @__PURE__ */ jsx118("span", { className: "text-urvos-surface/70", children: "ABHA Address:" }),
                /* @__PURE__ */ jsx118("div", { className: "font-mono font-semibold text-urvos-surface/90 truncate", children: abhaAddress })
              ] }),
              /* @__PURE__ */ jsxs93("div", { children: [
                /* @__PURE__ */ jsx118("span", { className: "text-urvos-surface/70", children: "ABHA Number:" }),
                /* @__PURE__ */ jsx118("div", { className: "font-mono font-semibold text-urvos-surface/90 truncate", children: abhaNumber })
              ] }),
              /* @__PURE__ */ jsxs93("div", { children: [
                /* @__PURE__ */ jsx118("span", { className: "text-urvos-surface/70", children: "DOB / Gender:" }),
                /* @__PURE__ */ jsxs93("div", { className: "font-medium text-urvos-surface", children: [
                  dateOfBirth,
                  " (",
                  gender[0],
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxs93("div", { children: [
                /* @__PURE__ */ jsx118("span", { className: "text-urvos-surface/70", children: "Location:" }),
                /* @__PURE__ */ jsxs93("div", { className: "font-medium text-urvos-surface truncate", children: [
                  district,
                  ", ",
                  state
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs93("div", { className: "w-20 h-20 bg-urvos-surface p-1.5 rounded-xl flex flex-col items-center justify-center shadow-inner text-urvos-ink shrink-0", children: [
            /* @__PURE__ */ jsx118(QrCode, { className: "w-14 h-14 text-urvos-text" }),
            /* @__PURE__ */ jsx118("span", { className: "text-[8px] font-mono text-urvos-text-subtle uppercase font-bold", children: "ABDM Scan" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs93("div", { className: "pt-2 border-t border-urvos-surface/10 text-[10px] text-urvos-surface/60 flex items-center justify-between font-mono", children: [
          /* @__PURE__ */ jsxs93("span", { children: [
            "Linked Mobile: +91 ",
            mobile
          ] }),
          /* @__PURE__ */ jsxs93("span", { children: [
            "NHA Ref: ",
            abhaNumber.replace(/-/g, "").slice(0, 8)
          ] })
        ] })
      ]
    }
  );
}

// components/healthcare/ClaimStatusTimeline.tsx
import { clsx as clsx92 } from "clsx";
import { CheckCircle2 as CheckCircle26, FileCheck, ShieldAlert as ShieldAlert6 } from "lucide-react";
import { jsx as jsx119, jsxs as jsxs94 } from "react/jsx-runtime";
function ClaimStatusTimeline({
  claimId,
  payerName,
  totalClaimAmount,
  approvedAmount,
  steps,
  className
}) {
  return /* @__PURE__ */ jsxs94("div", { className: clsx92("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs94("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2", children: [
      /* @__PURE__ */ jsxs94("div", { children: [
        /* @__PURE__ */ jsxs94("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx119(FileCheck, { className: "w-5 h-5 text-urvos-primary" }),
          /* @__PURE__ */ jsxs94("h4", { className: "font-semibold text-base text-urvos-text", children: [
            "Insurance Claim Lifecycle: ",
            claimId
          ] })
        ] }),
        /* @__PURE__ */ jsxs94("p", { className: "text-xs text-urvos-text-subtle mt-0.5", children: [
          "Payer: ",
          /* @__PURE__ */ jsx119("strong", { children: payerName })
        ] })
      ] }),
      /* @__PURE__ */ jsxs94("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx119("div", { className: "text-xs text-urvos-text-subtle", children: "Total Claim Value" }),
        /* @__PURE__ */ jsx119("div", { className: "text-base font-bold text-urvos-text", children: totalClaimAmount }),
        approvedAmount && /* @__PURE__ */ jsxs94("div", { className: "text-xs text-urvos-success font-semibold", children: [
          "Approved: ",
          approvedAmount
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx119("div", { className: "relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-urvos-border", children: steps.map((step) => {
      const isCompleted = step.status === "completed";
      const isCurrent = step.status === "current";
      const isDenied = step.status === "denied";
      return /* @__PURE__ */ jsxs94("div", { className: "relative flex items-start space-x-3", children: [
        /* @__PURE__ */ jsx119(
          "div",
          {
            className: clsx92(
              "absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border text-[10px] font-bold z-10 transition-colors",
              isCompleted && "bg-urvos-success text-urvos-text-inverse border-urvos-success",
              isCurrent && "bg-urvos-primary text-urvos-text-inverse border-urvos-primary animate-pulse",
              isDenied && "bg-urvos-destructive text-urvos-text-inverse border-urvos-destructive",
              step.status === "pending" && "bg-urvos-surface text-urvos-text-subtle border-urvos-border"
            ),
            children: isCompleted ? /* @__PURE__ */ jsx119(CheckCircle26, { className: "w-3 h-3" }) : isDenied ? /* @__PURE__ */ jsx119(ShieldAlert6, { className: "w-3 h-3" }) : null
          }
        ),
        /* @__PURE__ */ jsxs94("div", { className: "flex-1 bg-urvos-background p-3 rounded-lg border border-urvos-border", children: [
          /* @__PURE__ */ jsxs94("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx119("span", { className: clsx92("text-xs font-semibold", isDenied ? "text-urvos-destructive" : "text-urvos-text"), children: step.title }),
            /* @__PURE__ */ jsx119("span", { className: "text-[10px] font-mono text-urvos-text-subtle", children: step.timestamp })
          ] }),
          step.description && /* @__PURE__ */ jsx119("p", { className: "text-xs text-urvos-text-subtle mt-1", children: step.description })
        ] })
      ] }, step.id);
    }) })
  ] });
}

// components/healthcare/EligibilityChecker.tsx
import { useState as useState41 } from "react";
import { clsx as clsx93 } from "clsx";
import { ShieldCheck as ShieldCheck3, AlertCircle as AlertCircle8, CreditCard } from "lucide-react";
import { jsx as jsx120, jsxs as jsxs95 } from "react/jsx-runtime";
function EligibilityChecker({
  onCheckEligibility,
  initialData,
  className
}) {
  const [memberId, setMemberId] = useState41("");
  const [payerId, setPayerId] = useState41("STAR");
  const [loading, setLoading] = useState41(false);
  const [result, setResult] = useState41(initialData || null);
  const handleRunCheck = async () => {
    if (!onCheckEligibility) return;
    setLoading(true);
    try {
      const res = await onCheckEligibility(memberId, payerId);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs95("div", { className: clsx93("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs95("div", { className: "flex items-center space-x-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx120(CreditCard, { className: "w-5 h-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx120("h4", { className: "font-semibold text-base text-urvos-text", children: "Insurance Eligibility Verification" })
    ] }),
    /* @__PURE__ */ jsxs95("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsx120(
        "input",
        {
          type: "text",
          placeholder: "Member / Policy ID (e.g. POL-9921)",
          value: memberId,
          onChange: (e) => setMemberId(e.target.value),
          className: "px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-background"
        }
      ),
      /* @__PURE__ */ jsxs95(
        "select",
        {
          value: payerId,
          onChange: (e) => setPayerId(e.target.value),
          className: "px-3 py-1.5 text-xs border border-urvos-border rounded bg-urvos-background",
          children: [
            /* @__PURE__ */ jsx120("option", { value: "STAR", children: "Star Health Insurance" }),
            /* @__PURE__ */ jsx120("option", { value: "HDFC", children: "HDFC ERGO Health" }),
            /* @__PURE__ */ jsx120("option", { value: "ICICI", children: "ICICI Lombard" }),
            /* @__PURE__ */ jsx120("option", { value: "NIVA", children: "Niva Bupa Health" })
          ]
        }
      ),
      /* @__PURE__ */ jsx120(Button, { size: "sm", onClick: handleRunCheck, disabled: loading, children: loading ? "Verifying EDI 270..." : "Check Real-Time Eligibility" })
    ] }),
    result && /* @__PURE__ */ jsxs95("div", { className: "pt-3 border-t border-urvos-border space-y-3", children: [
      /* @__PURE__ */ jsxs95("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs95("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx120("span", { className: "font-bold text-sm text-urvos-text", children: result.subscriberName }),
          /* @__PURE__ */ jsxs95("span", { className: "text-xs text-urvos-text-subtle font-mono", children: [
            "(",
            result.policyNumber,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxs95(
          "span",
          {
            className: clsx93(
              "px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1",
              result.status === "ACTIVE" ? "bg-urvos-success-bg text-urvos-success border border-urvos-success/20" : "bg-urvos-error-bg text-urvos-error border border-urvos-error/20"
            ),
            children: [
              result.status === "ACTIVE" ? /* @__PURE__ */ jsx120(ShieldCheck3, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ jsx120(AlertCircle8, { className: "w-3 h-3 mr-1" }),
              /* @__PURE__ */ jsx120("span", { children: result.status })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs95("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-urvos-background p-3 rounded-lg border border-urvos-border", children: [
        /* @__PURE__ */ jsxs95("div", { children: [
          /* @__PURE__ */ jsx120("div", { className: "text-urvos-text-subtle", children: "Co-Pay / Visit" }),
          /* @__PURE__ */ jsx120("div", { className: "font-bold text-urvos-text", children: result.copayAmount })
        ] }),
        /* @__PURE__ */ jsxs95("div", { children: [
          /* @__PURE__ */ jsx120("div", { className: "text-urvos-text-subtle", children: "Deductible Remaining" }),
          /* @__PURE__ */ jsx120("div", { className: "font-bold text-urvos-text", children: result.deductibleRemaining })
        ] }),
        /* @__PURE__ */ jsxs95("div", { children: [
          /* @__PURE__ */ jsx120("div", { className: "text-urvos-text-subtle", children: "Annual Coverage Cap" }),
          /* @__PURE__ */ jsx120("div", { className: "font-bold text-urvos-text", children: result.annualMaxLimit })
        ] }),
        /* @__PURE__ */ jsxs95("div", { children: [
          /* @__PURE__ */ jsx120("div", { className: "text-urvos-text-subtle", children: "Pre-Auth Needed?" }),
          /* @__PURE__ */ jsx120("div", { className: clsx93("font-bold", result.requiresPreAuth ? "text-urvos-warning" : "text-urvos-success"), children: result.requiresPreAuth ? "Yes (Required)" : "No (Auto-Approved)" })
        ] })
      ] })
    ] })
  ] });
}

// components/healthcare/DenialAnalyticsCard.tsx
import { clsx as clsx94 } from "clsx";
import { AlertOctagon, RefreshCcw } from "lucide-react";
import { jsx as jsx121, jsxs as jsxs96 } from "react/jsx-runtime";
function DenialAnalyticsCard({
  denials,
  onTriggerAppeal,
  className
}) {
  return /* @__PURE__ */ jsxs96("div", { className: clsx94("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs96("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsxs96("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx121(AlertOctagon, { className: "w-5 h-5 text-urvos-destructive" }),
        /* @__PURE__ */ jsxs96("div", { children: [
          /* @__PURE__ */ jsx121("h4", { className: "font-semibold text-base text-urvos-text", children: "RCM Claim Denial Advice (835 ERA)" }),
          /* @__PURE__ */ jsx121("p", { className: "text-xs text-urvos-text-subtle", children: "Uncollected revenue requiring documentation or code appeal" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs96(Badge, { variant: "critical", children: [
        denials.length,
        " Active Denials"
      ] })
    ] }),
    /* @__PURE__ */ jsx121("div", { className: "space-y-3", children: denials.map((denial) => /* @__PURE__ */ jsxs96("div", { className: "p-4 border border-urvos-destructive/20 bg-urvos-destructive/5 rounded-lg space-y-3", children: [
      /* @__PURE__ */ jsxs96("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxs96("div", { children: [
          /* @__PURE__ */ jsxs96("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx121("span", { className: "font-bold text-sm text-urvos-text", children: denial.patientName }),
            /* @__PURE__ */ jsxs96("span", { className: "font-mono text-xs text-urvos-text-subtle", children: [
              "Claim #",
              denial.claimId
            ] })
          ] }),
          /* @__PURE__ */ jsxs96("div", { className: "text-xs font-mono font-semibold text-urvos-destructive mt-0.5", children: [
            "Code ",
            denial.denialCode,
            ": ",
            denial.denialReason
          ] })
        ] }),
        /* @__PURE__ */ jsxs96("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx121("div", { className: "text-xs text-urvos-text-subtle", children: "Denied Amount" }),
          /* @__PURE__ */ jsx121("div", { className: "text-base font-bold text-urvos-destructive", children: denial.amount })
        ] })
      ] }),
      /* @__PURE__ */ jsxs96("div", { className: "pt-2 border-t border-urvos-destructive/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs", children: [
        /* @__PURE__ */ jsxs96("div", { className: "text-urvos-text-subtle", children: [
          "Action: ",
          /* @__PURE__ */ jsx121("strong", { className: "text-urvos-text", children: denial.suggestedAction }),
          " (Appeal Deadline: ",
          denial.deadlineDate,
          ")"
        ] }),
        onTriggerAppeal && /* @__PURE__ */ jsxs96(Button, { size: "sm", variant: "secondary", className: "text-xs border-urvos-destructive/30 text-urvos-destructive hover:bg-urvos-destructive/10", onClick: () => onTriggerAppeal(denial.id), children: [
          /* @__PURE__ */ jsx121(RefreshCcw, { className: "w-3 h-3 mr-1" }),
          " Re-submit Appeal"
        ] })
      ] })
    ] }, denial.id)) })
  ] });
}

// components/healthcare/HandoffReport.tsx
import { clsx as clsx95 } from "clsx";
import { Stethoscope as Stethoscope3, AlertTriangle as AlertTriangle11 } from "lucide-react";
import { jsx as jsx122, jsxs as jsxs97 } from "react/jsx-runtime";
function NursingHandoffReport({
  report,
  onAcknowledgeHandoff,
  className
}) {
  return /* @__PURE__ */ jsxs97("div", { className: clsx95("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs97("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2", children: [
      /* @__PURE__ */ jsxs97("div", { children: [
        /* @__PURE__ */ jsxs97("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx122(Stethoscope3, { className: "w-5 h-5 text-urvos-primary" }),
          /* @__PURE__ */ jsx122("h4", { className: "font-semibold text-base text-urvos-text", children: "Nursing Shift Handoff (SBAR Protocol)" })
        ] }),
        /* @__PURE__ */ jsxs97("div", { className: "text-xs text-urvos-text-subtle mt-0.5", children: [
          "Patient: ",
          /* @__PURE__ */ jsx122("strong", { className: "text-urvos-text", children: report.patientName }),
          " (Bed ",
          report.roomBed,
          " \u2022 MRN: ",
          report.mrn,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs97("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx122(Badge, { variant: "caution", children: report.shiftType }),
        /* @__PURE__ */ jsxs97("span", { className: "text-xs text-urvos-text-subtle", children: [
          report.outgoingNurse,
          " \u2192 ",
          report.incomingNurse
        ] })
      ] })
    ] }),
    report.highRiskAlerts.length > 0 && /* @__PURE__ */ jsxs97("div", { className: "p-3 bg-urvos-error-bg border border-urvos-error/20 rounded-lg text-xs space-y-1 text-urvos-error", children: [
      /* @__PURE__ */ jsxs97("div", { className: "font-bold flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx122(AlertTriangle11, { className: "w-4 h-4 text-urvos-error" }),
        /* @__PURE__ */ jsxs97("span", { children: [
          "High Risk Shift Warnings (",
          report.highRiskAlerts.length,
          "):"
        ] })
      ] }),
      /* @__PURE__ */ jsx122("ul", { className: "list-disc list-inside space-y-0.5 font-medium pl-1", children: report.highRiskAlerts.map((alert, i) => /* @__PURE__ */ jsx122("li", { children: alert }, i)) })
    ] }),
    /* @__PURE__ */ jsxs97("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs", children: [
      /* @__PURE__ */ jsxs97("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
        /* @__PURE__ */ jsx122("div", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "S - Situation" }),
        /* @__PURE__ */ jsx122("p", { className: "text-urvos-text leading-relaxed", children: report.situation })
      ] }),
      /* @__PURE__ */ jsxs97("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
        /* @__PURE__ */ jsx122("div", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "B - Background" }),
        /* @__PURE__ */ jsx122("p", { className: "text-urvos-text leading-relaxed", children: report.background })
      ] }),
      /* @__PURE__ */ jsxs97("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
        /* @__PURE__ */ jsx122("div", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "A - Assessment" }),
        /* @__PURE__ */ jsx122("p", { className: "text-urvos-text leading-relaxed", children: report.assessment })
      ] }),
      /* @__PURE__ */ jsxs97("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
        /* @__PURE__ */ jsx122("div", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "R - Recommendation" }),
        /* @__PURE__ */ jsx122("p", { className: "text-urvos-text leading-relaxed", children: report.recommendation })
      ] })
    ] })
  ] });
}

// components/healthcare/PreChartPanel.tsx
import { clsx as clsx96 } from "clsx";
import { Activity as Activity6, Heart as Heart2, Thermometer, TrendingUp as TrendingUp3 } from "lucide-react";
import { jsx as jsx123, jsxs as jsxs98 } from "react/jsx-runtime";
function PreChartPanel({ data, onOpenFullChart, className }) {
  return /* @__PURE__ */ jsxs98("div", { className: clsx96("bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs98("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between border-b border-urvos-border pb-3 gap-2", children: [
      /* @__PURE__ */ jsxs98("div", { children: [
        /* @__PURE__ */ jsxs98("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx123(Activity6, { className: "w-5 h-5 text-urvos-primary" }),
          /* @__PURE__ */ jsx123("h4", { className: "font-semibold text-base text-urvos-text", children: "60-Second Pre-Chart Overview" })
        ] }),
        /* @__PURE__ */ jsxs98("div", { className: "text-xs text-urvos-text-subtle mt-0.5", children: [
          data.patientName,
          " (",
          data.age,
          "y / ",
          data.gender,
          ") \u2022 Complaint: ",
          /* @__PURE__ */ jsx123("strong", { className: "text-urvos-text", children: data.chiefComplaint })
        ] })
      ] }),
      /* @__PURE__ */ jsxs98(
        Badge,
        {
          variant: data.riskScore === "HIGH" ? "critical" : data.riskScore === "MODERATE" ? "caution" : "success",
          children: [
            data.riskScore,
            " Clinical Risk"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs98("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 bg-urvos-background p-3 rounded-urvos-md border border-urvos-border text-xs", children: [
      /* @__PURE__ */ jsxs98("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx123(Heart2, { className: "w-4 h-4 text-urvos-danger" }),
        /* @__PURE__ */ jsxs98("div", { children: [
          /* @__PURE__ */ jsx123("div", { className: "text-urvos-text-subtle text-[10px]", children: "Blood Pressure" }),
          /* @__PURE__ */ jsxs98("div", { className: "font-bold text-urvos-text", children: [
            data.lastVitals.bp,
            " mmHg"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs98("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx123(Activity6, { className: "w-4 h-4 text-urvos-success" }),
        /* @__PURE__ */ jsxs98("div", { children: [
          /* @__PURE__ */ jsx123("div", { className: "text-urvos-text-subtle text-[10px]", children: "Pulse / HR" }),
          /* @__PURE__ */ jsxs98("div", { className: "font-bold text-urvos-text", children: [
            data.lastVitals.hr,
            " bpm"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs98("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx123(Thermometer, { className: "w-4 h-4 text-urvos-warning" }),
        /* @__PURE__ */ jsxs98("div", { children: [
          /* @__PURE__ */ jsx123("div", { className: "text-urvos-text-subtle text-[10px]", children: "Temperature" }),
          /* @__PURE__ */ jsx123("div", { className: "font-bold text-urvos-text", children: data.lastVitals.temp })
        ] })
      ] }),
      /* @__PURE__ */ jsxs98("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx123(TrendingUp3, { className: "w-4 h-4 text-urvos-info" }),
        /* @__PURE__ */ jsxs98("div", { children: [
          /* @__PURE__ */ jsx123("div", { className: "text-urvos-text-subtle text-[10px]", children: "SpO2" }),
          /* @__PURE__ */ jsxs98("div", { className: "font-bold text-urvos-text", children: [
            data.lastVitals.spo2,
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs98("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [
      /* @__PURE__ */ jsxs98("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx123("div", { className: "font-semibold text-urvos-text", children: "Active Diagnoses" }),
        /* @__PURE__ */ jsx123("div", { className: "flex flex-wrap gap-1", children: data.activeDiagnoses.map((d) => /* @__PURE__ */ jsx123("span", { className: "px-2 py-0.5 bg-urvos-background border border-urvos-border rounded text-urvos-text font-medium", children: d }, d)) })
      ] }),
      /* @__PURE__ */ jsxs98("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx123("div", { className: "font-semibold text-urvos-text", children: "Pending Orders & Labs" }),
        /* @__PURE__ */ jsx123("div", { className: "flex flex-wrap gap-1", children: data.pendingOrders.map((o) => /* @__PURE__ */ jsx123("span", { className: "px-2 py-0.5 bg-urvos-warning-bg border border-urvos-warning/20 text-urvos-warning rounded font-medium", children: o }, o)) })
      ] })
    ] })
  ] });
}

// components/healthcare/UnsignedChartsCard.tsx
import { clsx as clsx97 } from "clsx";
import { FileSignature, Lock as Lock3 } from "lucide-react";
import { jsx as jsx124, jsxs as jsxs99 } from "react/jsx-runtime";
function UnsignedChartsCard({
  charts,
  onSignChart,
  onSignAll,
  className
}) {
  return /* @__PURE__ */ jsxs99("div", { className: clsx97("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4", className), children: [
    /* @__PURE__ */ jsxs99("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsxs99("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx124(FileSignature, { className: "w-5 h-5 text-urvos-primary" }),
        /* @__PURE__ */ jsxs99("div", { children: [
          /* @__PURE__ */ jsx124("h4", { className: "font-semibold text-base text-urvos-text", children: "Unsigned Chart Notes Inbox" }),
          /* @__PURE__ */ jsx124("p", { className: "text-xs text-urvos-text-subtle", children: "Completed encounters requiring provider signature lock" })
        ] })
      ] }),
      charts.length > 0 && onSignAll && /* @__PURE__ */ jsxs99(Button, { size: "sm", onClick: onSignAll, children: [
        "Sign All (",
        charts.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx124("div", { className: "space-y-3", children: charts.length === 0 ? /* @__PURE__ */ jsx124("div", { className: "text-center py-6 text-xs text-urvos-text-subtle", children: "\u{1F389} All clinical notes are electronically signed and locked." }) : charts.map((chart) => /* @__PURE__ */ jsxs99(
      "div",
      {
        className: clsx97(
          "p-3.5 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs",
          chart.isLockWarning ? "bg-urvos-error-bg border-urvos-error/30" : "bg-urvos-background border-urvos-border"
        ),
        children: [
          /* @__PURE__ */ jsxs99("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs99("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx124("span", { className: "font-bold text-sm text-urvos-text", children: chart.patientName }),
              /* @__PURE__ */ jsx124(Badge, { variant: "neutral", children: chart.encounterType }),
              chart.isLockWarning && /* @__PURE__ */ jsxs99("span", { className: "text-[10px] font-bold text-urvos-error flex items-center", children: [
                /* @__PURE__ */ jsx124(Lock3, { className: "w-3 h-3 mr-0.5" }),
                " Locks in 24h"
              ] })
            ] }),
            /* @__PURE__ */ jsxs99("div", { className: "text-urvos-text-subtle flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxs99("span", { children: [
                "Encounter Date: ",
                /* @__PURE__ */ jsx124("strong", { children: chart.encounterDate })
              ] }),
              /* @__PURE__ */ jsx124("span", { children: "\u2022" }),
              /* @__PURE__ */ jsxs99("span", { children: [
                "Provider: ",
                chart.providerName
              ] }),
              /* @__PURE__ */ jsx124("span", { children: "\u2022" }),
              /* @__PURE__ */ jsxs99("span", { className: clsx97("font-semibold", chart.daysPending >= 3 ? "text-urvos-error" : "text-urvos-warning"), children: [
                "Pending: ",
                chart.daysPending,
                "d"
              ] })
            ] })
          ] }),
          onSignChart && /* @__PURE__ */ jsx124(Button, { size: "sm", variant: "secondary", onClick: () => onSignChart(chart.id), children: "Sign & Lock Note" })
        ]
      },
      chart.id
    )) })
  ] });
}

// components/healthcare/SmartPhrasePanel.tsx
import { useState as useState42 } from "react";
import { clsx as clsx98 } from "clsx";
import { Sparkles, Search as Search7, Copy as Copy2, Check as Check11 } from "lucide-react";
import { jsx as jsx125, jsxs as jsxs100 } from "react/jsx-runtime";
function SmartPhrasePanel({ phrases, onInsertPhrase, className }) {
  const [search, setSearch] = useState42("");
  const [copiedShortcut, setCopiedShortcut] = useState42(null);
  const filteredPhrases = phrases.filter(
    (p) => p.shortcut.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase())
  );
  const handleCopy = (phrase) => {
    navigator.clipboard.writeText(phrase.content);
    setCopiedShortcut(phrase.shortcut);
    setTimeout(() => setCopiedShortcut(null), 2e3);
    onInsertPhrase == null ? void 0 : onInsertPhrase(phrase);
  };
  return /* @__PURE__ */ jsxs100("div", { className: clsx98("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-4 space-y-4 max-w-sm", className), children: [
    /* @__PURE__ */ jsxs100("div", { className: "flex items-center justify-between border-b border-urvos-border pb-2", children: [
      /* @__PURE__ */ jsxs100("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx125(Sparkles, { className: "w-4 h-4 text-urvos-primary" }),
        /* @__PURE__ */ jsx125("h4", { className: "font-semibold text-sm text-urvos-text", children: "Clinical Dot-Phrases (.macro)" })
      ] }),
      /* @__PURE__ */ jsxs100("span", { className: "text-[10px] text-urvos-text-subtle font-mono", children: [
        phrases.length,
        " available"
      ] })
    ] }),
    /* @__PURE__ */ jsxs100("div", { className: "relative", children: [
      /* @__PURE__ */ jsx125(Search7, { className: "w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-urvos-text-subtle" }),
      /* @__PURE__ */ jsx125(
        "input",
        {
          type: "text",
          placeholder: "Filter by .shortcut or keyword...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "w-full pl-8 pr-3 py-1.5 text-xs bg-urvos-background border border-urvos-border rounded focus:outline-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsx125("div", { className: "space-y-2 max-h-72 overflow-y-auto pr-1", children: filteredPhrases.map((phrase) => /* @__PURE__ */ jsxs100(
      "div",
      {
        className: "p-2.5 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-primary/40 transition-colors space-y-1 text-xs",
        children: [
          /* @__PURE__ */ jsxs100("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx125("span", { className: "font-mono font-bold text-urvos-primary", children: phrase.shortcut }),
            /* @__PURE__ */ jsx125("span", { className: "text-[10px] text-urvos-text-subtle bg-urvos-surface px-1.5 py-0.5 border border-urvos-border rounded", children: phrase.category })
          ] }),
          /* @__PURE__ */ jsx125("div", { className: "font-medium text-urvos-text truncate", children: phrase.title }),
          /* @__PURE__ */ jsxs100("div", { className: "text-[11px] text-urvos-text-subtle line-clamp-2 italic", children: [
            '"',
            phrase.content,
            '"'
          ] }),
          /* @__PURE__ */ jsx125("div", { className: "pt-1.5 flex justify-end", children: /* @__PURE__ */ jsxs100(Button, { size: "sm", variant: "secondary", className: "text-[10px] py-0.5 px-2", onClick: () => handleCopy(phrase), children: [
            copiedShortcut === phrase.shortcut ? /* @__PURE__ */ jsx125(Check11, { className: "w-3 h-3 text-urvos-success mr-1" }) : /* @__PURE__ */ jsx125(Copy2, { className: "w-3 h-3 mr-1" }),
            copiedShortcut === phrase.shortcut ? "Copied" : "Insert"
          ] }) })
        ]
      },
      phrase.shortcut
    )) })
  ] });
}

// components/healthcare/FavoriteOrdersPanel.tsx
import { clsx as clsx99 } from "clsx";
import { Star, Pill as Pill4, TestTube, Plus as Plus3 } from "lucide-react";
import { jsx as jsx126, jsxs as jsxs101 } from "react/jsx-runtime";
function FavoriteOrdersPanel({ orders, onAddOrder, className }) {
  return /* @__PURE__ */ jsxs101("div", { className: clsx99("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-4 space-y-3 max-w-sm", className), children: [
    /* @__PURE__ */ jsx126("div", { className: "flex items-center justify-between border-b border-urvos-border pb-2", children: /* @__PURE__ */ jsxs101("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx126(Star, { className: "w-4 h-4 text-urvos-warning fill-urvos-warning" }),
      /* @__PURE__ */ jsx126("h4", { className: "font-semibold text-sm text-urvos-text", children: "Favorite Clinical Order Sets" })
    ] }) }),
    /* @__PURE__ */ jsx126("div", { className: "space-y-2", children: orders.map((order) => /* @__PURE__ */ jsxs101(
      "div",
      {
        className: "p-3 border border-urvos-border rounded-lg bg-urvos-background hover:border-urvos-primary/30 transition-colors flex items-center justify-between gap-2 text-xs",
        children: [
          /* @__PURE__ */ jsxs101("div", { className: "space-y-0.5 min-w-0", children: [
            /* @__PURE__ */ jsxs101("div", { className: "flex items-center space-x-2", children: [
              order.type === "Medication" ? /* @__PURE__ */ jsx126(Pill4, { className: "w-3.5 h-3.5 text-urvos-primary" }) : /* @__PURE__ */ jsx126(TestTube, { className: "w-3.5 h-3.5 text-urvos-success" }),
              /* @__PURE__ */ jsx126("span", { className: "font-bold text-urvos-text truncate", children: order.name })
            ] }),
            /* @__PURE__ */ jsx126("div", { className: "text-[11px] text-urvos-text-subtle truncate", children: order.details })
          ] }),
          onAddOrder && /* @__PURE__ */ jsxs101(Button, { size: "sm", variant: "secondary", className: "text-[11px] py-1 px-2 shrink-0", onClick: () => onAddOrder(order), children: [
            /* @__PURE__ */ jsx126(Plus3, { className: "w-3 h-3 mr-0.5" }),
            " Order"
          ] })
        ]
      },
      order.id
    )) })
  ] });
}

// components/healthcare/SignatureCapture.tsx
import { useRef as useRef22, useState as useState43 } from "react";
import { clsx as clsx100 } from "clsx";
import { PenTool, RotateCcw, CheckCircle2 as CheckCircle28 } from "lucide-react";
import { jsx as jsx127, jsxs as jsxs102 } from "react/jsx-runtime";
function SignatureCapture({
  signatoryName,
  signatoryRole,
  onSaveSignature,
  className
}) {
  const canvasRef = useRef22(null);
  const [isDrawing, setIsDrawing] = useState43(false);
  const [hasSigned, setHasSigned] = useState43(false);
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasSigned(true);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0B5B8E";
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSigned) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSaveSignature == null ? void 0 : onSaveSignature(dataUrl);
  };
  return /* @__PURE__ */ jsxs102("div", { className: clsx100("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4 max-w-md", className), children: [
    /* @__PURE__ */ jsx127("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: /* @__PURE__ */ jsxs102("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx127(PenTool, { className: "w-5 h-5 text-urvos-primary" }),
      /* @__PURE__ */ jsxs102("div", { children: [
        /* @__PURE__ */ jsx127("h4", { className: "font-semibold text-base text-urvos-text", children: "Digital Signature Capture" }),
        /* @__PURE__ */ jsxs102("p", { className: "text-xs text-urvos-text-subtle", children: [
          "Signatory: ",
          /* @__PURE__ */ jsx127("strong", { children: signatoryName }),
          " (",
          signatoryRole,
          ")"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs102("div", { className: "relative border border-dashed border-urvos-border rounded-lg bg-urvos-background overflow-hidden flex flex-col items-center justify-center p-2", children: [
      /* @__PURE__ */ jsx127(
        "canvas",
        {
          ref: canvasRef,
          width: 380,
          height: 140,
          onMouseDown: startDrawing,
          onMouseMove: draw,
          onMouseUp: stopDrawing,
          onTouchStart: startDrawing,
          onTouchMove: draw,
          onTouchEnd: stopDrawing,
          className: "cursor-crosshair bg-urvos-surface rounded shadow-inner"
        }
      ),
      !hasSigned && /* @__PURE__ */ jsx127("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-urvos-text-subtle italic", children: "Draw electronic signature above using mouse or touch..." })
    ] }),
    /* @__PURE__ */ jsxs102("div", { className: "flex items-center justify-between pt-1 text-xs", children: [
      /* @__PURE__ */ jsxs102("button", { onClick: handleClear, className: "flex items-center space-x-1 text-urvos-text-subtle hover:text-urvos-text", children: [
        /* @__PURE__ */ jsx127(RotateCcw, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsx127("span", { children: "Clear Signature" })
      ] }),
      /* @__PURE__ */ jsxs102(Button, { size: "sm", onClick: handleSave, disabled: !hasSigned, children: [
        /* @__PURE__ */ jsx127(CheckCircle28, { className: "w-4 h-4 mr-1" }),
        " Apply Signature & Lock"
      ] })
    ] })
  ] });
}

// components/healthcare/CollectPaymentPanel.tsx
import { useState as useState44 } from "react";
import { clsx as clsx101 } from "clsx";
import { CreditCard as CreditCard2, QrCode as QrCode2, DollarSign as DollarSign3, CheckCircle2 as CheckCircle29, Receipt } from "lucide-react";
import { jsx as jsx128, jsxs as jsxs103 } from "react/jsx-runtime";
function CollectPaymentPanel({
  patientName,
  encounterId,
  dueAmount,
  onProcessPayment,
  className
}) {
  const [method, setMethod] = useState44("UPI");
  const [amount, setAmount] = useState44(dueAmount.replace(/[^0-9]/g, ""));
  const [isSuccess, setIsSuccess] = useState44(false);
  const handlePay = () => {
    onProcessPayment == null ? void 0 : onProcessPayment(method, amount);
    setIsSuccess(true);
  };
  return /* @__PURE__ */ jsxs103("div", { className: clsx101("bg-urvos-surface border border-urvos-border rounded-xl shadow-xs p-5 space-y-4 max-w-sm", className), children: [
    /* @__PURE__ */ jsx128("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: /* @__PURE__ */ jsxs103("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx128(Receipt, { className: "w-5 h-5 text-urvos-primary" }),
      /* @__PURE__ */ jsxs103("div", { children: [
        /* @__PURE__ */ jsx128("h4", { className: "font-semibold text-base text-urvos-text", children: "Point of Care Payment" }),
        /* @__PURE__ */ jsxs103("p", { className: "text-xs text-urvos-text-subtle", children: [
          "Patient: ",
          /* @__PURE__ */ jsx128("strong", { children: patientName }),
          " (",
          encounterId,
          ")"
        ] })
      ] })
    ] }) }),
    isSuccess ? /* @__PURE__ */ jsxs103("div", { className: "p-4 bg-urvos-success-bg border border-urvos-success/20 rounded-lg text-center space-y-2", children: [
      /* @__PURE__ */ jsx128(CheckCircle29, { className: "w-8 h-8 text-urvos-success mx-auto" }),
      /* @__PURE__ */ jsx128("div", { className: "font-bold text-sm text-urvos-success", children: "Payment Collected Successfully" }),
      /* @__PURE__ */ jsx128("div", { className: "text-xs text-urvos-text-subtle", children: "Receipt #RCT-99182 sent via SMS to patient." }),
      /* @__PURE__ */ jsx128(Button, { size: "sm", variant: "secondary", onClick: () => setIsSuccess(false), children: "Collect Another Payment" })
    ] }) : /* @__PURE__ */ jsxs103("div", { className: "space-y-3 text-xs", children: [
      /* @__PURE__ */ jsx128("div", { className: "grid grid-cols-3 gap-2", children: ["UPI", "Card", "Cash"].map((m) => /* @__PURE__ */ jsxs103(
        "button",
        {
          onClick: () => setMethod(m),
          className: clsx101(
            "p-2.5 rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all",
            method === m ? "border-urvos-primary bg-urvos-primary/10 text-urvos-primary font-bold shadow-xs" : "border-urvos-border bg-urvos-background text-urvos-text-subtle"
          ),
          children: [
            m === "UPI" ? /* @__PURE__ */ jsx128(QrCode2, { className: "w-4 h-4" }) : m === "Card" ? /* @__PURE__ */ jsx128(CreditCard2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx128(DollarSign3, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx128("span", { children: m })
          ]
        },
        m
      )) }),
      /* @__PURE__ */ jsxs103("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx128("label", { className: "font-semibold text-urvos-text", children: "Amount to Collect (\u20B9)" }),
        /* @__PURE__ */ jsx128(
          "input",
          {
            type: "number",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            className: "w-full px-3 py-2 text-sm font-bold border border-urvos-border rounded bg-urvos-background focus:ring-2 focus:ring-urvos-primary/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs103(Button, { size: "sm", className: "w-full", onClick: handlePay, children: [
        "Process \u20B9",
        amount,
        " (",
        method,
        ")"
      ] })
    ] })
  ] });
}

// components/healthcare/KioskCheckinAlert.tsx
import { clsx as clsx102 } from "clsx";
import { BellRing, ArrowRight as ArrowRight3, Clock as Clock9, MapPin as MapPin3 } from "lucide-react";
import { jsx as jsx129, jsxs as jsxs104 } from "react/jsx-runtime";
function KioskCheckinAlert({
  patientName,
  checkinTime,
  tokenNumber,
  assignedRoom,
  providerName,
  onCallPatient,
  className
}) {
  return /* @__PURE__ */ jsxs104("div", { className: clsx102("bg-urvos-success-bg border border-urvos-success/30 rounded-xl p-4 shadow-sm space-y-3 max-w-sm", className), children: [
    /* @__PURE__ */ jsxs104("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs104("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx129(BellRing, { className: "w-4 h-4 text-urvos-success animate-bounce" }),
        /* @__PURE__ */ jsx129("span", { className: "font-bold text-xs uppercase tracking-wider text-urvos-success", children: "Kiosk Patient Arrival Notification" })
      ] }),
      /* @__PURE__ */ jsxs104(Badge, { variant: "success", children: [
        "Token #",
        tokenNumber
      ] })
    ] }),
    /* @__PURE__ */ jsxs104("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx129("div", { className: "text-base font-bold text-urvos-text", children: patientName }),
      /* @__PURE__ */ jsxs104("div", { className: "text-xs text-urvos-text-subtle flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs104("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx129(Clock9, { className: "w-3 h-3 mr-1" }),
          " Arrived: ",
          checkinTime
        ] }),
        /* @__PURE__ */ jsxs104("span", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx129(MapPin3, { className: "w-3 h-3 mr-1" }),
          " ",
          assignedRoom
        ] })
      ] }),
      /* @__PURE__ */ jsxs104("div", { className: "text-xs text-urvos-text-subtle", children: [
        "Provider: ",
        /* @__PURE__ */ jsx129("strong", { children: providerName })
      ] })
    ] }),
    onCallPatient && /* @__PURE__ */ jsxs104(Button, { size: "sm", className: "w-full bg-urvos-success hover:bg-urvos-success/90 text-urvos-text-inverse", onClick: onCallPatient, children: [
      "Call Patient into ",
      assignedRoom,
      " ",
      /* @__PURE__ */ jsx129(ArrowRight3, { className: "w-3.5 h-3.5 ml-1" })
    ] })
  ] });
}

// components/healthcare/ClinicalGuidelines.tsx
import { clsx as clsx103 } from "clsx";
import { BookOpen as BookOpen2 } from "lucide-react";
import { jsx as jsx130, jsxs as jsxs105 } from "react/jsx-runtime";
function ClinicalGuidelines({ guidelines, className }) {
  return /* @__PURE__ */ jsxs105("div", { className: clsx103("w-full bg-urvos-surface border border-urvos-border rounded-xl p-6 shadow-sm space-y-4", className), children: [
    /* @__PURE__ */ jsxs105("div", { className: "flex items-center gap-2 border-b border-urvos-border pb-3", children: [
      /* @__PURE__ */ jsx130(BookOpen2, { className: "h-5 w-5 text-urvos-primary" }),
      /* @__PURE__ */ jsx130("h3", { className: "text-base font-bold text-urvos-text", children: "CDS Clinical Guidelines (PlanDefinition)" })
    ] }),
    /* @__PURE__ */ jsx130("div", { className: "space-y-3", children: guidelines.map((g, idx) => /* @__PURE__ */ jsxs105("div", { className: "p-4 border border-urvos-border rounded-xl bg-urvos-surface-muted/30 space-y-2", children: [
      /* @__PURE__ */ jsxs105("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx130("span", { className: "text-sm font-bold text-urvos-text", children: g.title }),
        /* @__PURE__ */ jsx130("span", { className: "text-xs font-bold text-urvos-primary bg-urvos-primary/10 px-2 py-0.5 rounded border border-urvos-primary/20", children: g.evidenceGrade })
      ] }),
      /* @__PURE__ */ jsx130("p", { className: "text-xs text-urvos-text leading-relaxed", children: g.recommendation }),
      /* @__PURE__ */ jsxs105("span", { className: "text-[10px] text-urvos-text-subtle block", children: [
        "Source: ",
        g.source
      ] })
    ] }, idx)) })
  ] });
}

// components/healthcare/AdvancedDirective.tsx
import { clsx as clsx104 } from "clsx";
import { AlertOctagon as AlertOctagon2 } from "lucide-react";
import { jsx as jsx131, jsxs as jsxs106 } from "react/jsx-runtime";
function AdvancedDirective({
  dnrStatus = true,
  dniStatus = true,
  proxyName = "Eleanor Vance (Spouse)",
  proxyPhone = "(555) 234-5678",
  verifiedDate = "Oct 12, 2023",
  className
}) {
  return /* @__PURE__ */ jsxs106("div", { className: clsx104("w-full border-2 border-urvos-danger/40 bg-urvos-danger/5 rounded-xl p-5 shadow-sm space-y-3", className), children: [
    /* @__PURE__ */ jsxs106("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs106("div", { className: "flex items-center gap-2 text-urvos-danger font-bold text-sm", children: [
        /* @__PURE__ */ jsx131(AlertOctagon2, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx131("span", { children: "Advanced Directives & Resuscitation Status" })
      ] }),
      /* @__PURE__ */ jsxs106("span", { className: "text-xs font-semibold text-urvos-text-subtle", children: [
        "Verified: ",
        verifiedDate
      ] })
    ] }),
    /* @__PURE__ */ jsxs106("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsx131("span", { className: clsx104("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border", dnrStatus ? "bg-urvos-danger text-urvos-text-inverse border-urvos-danger" : "bg-urvos-surface text-urvos-text border-urvos-border"), children: dnrStatus ? "DNR (Do Not Resuscitate)" : "Full Code" }),
      /* @__PURE__ */ jsx131("span", { className: clsx104("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border", dniStatus ? "bg-urvos-danger text-urvos-text-inverse border-urvos-danger" : "bg-urvos-surface text-urvos-text border-urvos-border"), children: dniStatus ? "DNI (Do Not Intubate)" : "Intubate Allowed" })
    ] }),
    proxyName && /* @__PURE__ */ jsxs106("div", { className: "pt-2 border-t border-urvos-danger/20 text-xs text-urvos-text flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs106("span", { children: [
        /* @__PURE__ */ jsx131("strong", { className: "text-urvos-text", children: "Healthcare Proxy:" }),
        " ",
        proxyName
      ] }),
      /* @__PURE__ */ jsx131("span", { className: "font-semibold text-urvos-primary", children: proxyPhone })
    ] })
  ] });
}

// components/healthcare/PatientTimelineView.tsx
import { clsx as clsx105 } from "clsx";
import { Activity as Activity7, Stethoscope as Stethoscope4, Pill as Pill5, FileText as FileText8, Calendar as Calendar9 } from "lucide-react";
import { jsx as jsx132, jsxs as jsxs107 } from "react/jsx-runtime";
var getEventIcon = (type) => {
  switch (type) {
    case "visit":
      return /* @__PURE__ */ jsx132(Calendar9, { className: "w-4 h-4" });
    case "prescription":
      return /* @__PURE__ */ jsx132(Pill5, { className: "w-4 h-4" });
    case "lab":
      return /* @__PURE__ */ jsx132(Activity7, { className: "w-4 h-4" });
    case "procedure":
      return /* @__PURE__ */ jsx132(Stethoscope4, { className: "w-4 h-4" });
    case "note":
      return /* @__PURE__ */ jsx132(FileText8, { className: "w-4 h-4" });
  }
};
var getEventColor = (type) => {
  switch (type) {
    case "visit":
      return "bg-urvos-glass text-urvos-primary border-urvos-primary/20";
    case "prescription":
      return "bg-urvos-warning-bg text-urvos-warning border-urvos-warning/20";
    case "lab":
      return "bg-urvos-success-bg text-urvos-success border-urvos-success/20";
    case "procedure":
      return "bg-urvos-danger-bg text-urvos-danger border-urvos-danger/20";
    case "note":
      return "bg-urvos-surface-alt text-urvos-text-subtle border-urvos-border";
  }
};
function PatientTimelineView({ events, className }) {
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return /* @__PURE__ */ jsx132("div", { className: clsx105("relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-urvos-border", className), children: sortedEvents.map((event, index) => /* @__PURE__ */ jsxs107("div", { className: "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active", children: [
    /* @__PURE__ */ jsx132("div", { className: clsx105(
      "flex items-center justify-center w-10 h-10 rounded-full border-2 bg-urvos-surface shadow-urvos-soft z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2",
      getEventColor(event.type)
    ), children: getEventIcon(event.type) }),
    /* @__PURE__ */ jsxs107("div", { className: "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-urvos-lg border border-urvos-border bg-urvos-surface shadow-urvos-soft hover:shadow-urvos-hover transition-all duration-200", children: [
      /* @__PURE__ */ jsxs107("div", { className: "flex items-center justify-between mb-1.5", children: [
        /* @__PURE__ */ jsx132("span", { className: "text-xs font-mono font-medium text-urvos-primary", children: event.date }),
        event.status && /* @__PURE__ */ jsx132("span", { className: clsx105(
          "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
          event.status === "completed" ? "bg-urvos-success-bg text-urvos-success" : event.status === "scheduled" ? "bg-urvos-info-bg text-urvos-info" : "bg-urvos-warning-bg text-urvos-warning"
        ), children: event.status })
      ] }),
      /* @__PURE__ */ jsx132("h3", { className: "font-semibold text-urvos-ink text-sm mb-1", children: event.title }),
      /* @__PURE__ */ jsx132("p", { className: "text-xs text-urvos-text-subtle font-medium mb-2", children: event.provider }),
      event.description && /* @__PURE__ */ jsx132("p", { className: "text-sm text-urvos-text-muted mt-2 line-clamp-2", children: event.description })
    ] })
  ] }, event.id)) });
}

// components/healthcare/ClinicalDataChart.tsx
import { clsx as clsx106 } from "clsx";
import { TrendingUp as TrendingUp4, TrendingDown as TrendingDown2, Minus as Minus3 } from "lucide-react";
import { jsx as jsx133, jsxs as jsxs108 } from "react/jsx-runtime";
function ClinicalDataChart({ title, data, unit, normalRange, className }) {
  const latestValue = data.length > 0 ? data[data.length - 1].value : 0;
  const previousValue = data.length > 1 ? data[data.length - 2].value : latestValue;
  const trend = latestValue > previousValue ? "up" : latestValue < previousValue ? "down" : "stable";
  const percentChange = previousValue === 0 ? 0 : Math.abs((latestValue - previousValue) / previousValue * 100).toFixed(1);
  let status = "normal";
  if (normalRange) {
    if (latestValue < normalRange[0] || latestValue > normalRange[1]) {
      status = "abnormal";
    }
  }
  return /* @__PURE__ */ jsxs108("div", { className: clsx106("p-5 rounded-urvos-xl bg-urvos-surface border border-urvos-border shadow-urvos-soft flex flex-col", className), children: [
    /* @__PURE__ */ jsxs108("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxs108("div", { children: [
        /* @__PURE__ */ jsx133("h3", { className: "text-sm font-semibold text-urvos-text-subtle mb-1", children: title }),
        /* @__PURE__ */ jsxs108("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx133("span", { className: clsx106(
            "text-3xl font-bold tracking-tight font-mono",
            status === "abnormal" ? "text-urvos-danger" : "text-urvos-ink"
          ), children: latestValue }),
          /* @__PURE__ */ jsx133("span", { className: "text-sm font-medium text-urvos-text-muted", children: unit })
        ] })
      ] }),
      /* @__PURE__ */ jsxs108("div", { className: clsx106(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        trend === "up" && status === "normal" ? "bg-urvos-success-bg text-urvos-success" : trend === "up" && status === "abnormal" ? "bg-urvos-danger-bg text-urvos-danger" : trend === "down" && status === "normal" ? "bg-urvos-success-bg text-urvos-success" : trend === "down" && status === "abnormal" ? "bg-urvos-warning-bg text-urvos-warning" : "bg-urvos-surface-alt text-urvos-text-subtle"
      ), children: [
        trend === "up" ? /* @__PURE__ */ jsx133(TrendingUp4, { className: "w-3.5 h-3.5" }) : trend === "down" ? /* @__PURE__ */ jsx133(TrendingDown2, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx133(Minus3, { className: "w-3.5 h-3.5" }),
        percentChange,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxs108("div", { className: "relative h-24 mt-auto w-full flex items-end justify-between gap-1 group", children: [
      data.map((point, i) => {
        const maxVal = Math.max(...data.map((d) => d.value), normalRange ? normalRange[1] : 0);
        const heightPercent = Math.max(10, point.value / (maxVal || 1) * 100);
        let isAbnormal = false;
        if (normalRange) {
          isAbnormal = point.value < normalRange[0] || point.value > normalRange[1];
        }
        return /* @__PURE__ */ jsxs108("div", { className: "relative flex-1 group/bar h-full flex flex-col justify-end", children: [
          /* @__PURE__ */ jsx133(
            "div",
            {
              className: clsx106(
                "w-full rounded-t-sm transition-all duration-300 group-hover:opacity-40 group-hover/bar:opacity-100",
                isAbnormal ? "bg-urvos-danger/60 group-hover/bar:bg-urvos-danger" : "bg-urvos-primary/40 group-hover/bar:bg-urvos-primary"
              ),
              style: { height: `${heightPercent}%` }
            }
          ),
          /* @__PURE__ */ jsx133("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-10", children: /* @__PURE__ */ jsxs108("div", { className: "bg-urvos-ink text-urvos-surface px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap shadow-xl", children: [
            point.date,
            ": ",
            point.value
          ] }) })
        ] }, i);
      }),
      normalRange && /* @__PURE__ */ jsx133(
        "div",
        {
          className: "absolute inset-0 pointer-events-none border-y border-dashed border-urvos-success/30 z-0",
          style: {
            top: "10%",
            // approximate
            bottom: "10%"
            // approximate
          }
        }
      )
    ] })
  ] });
}

// components/healthcare/ConditionManager.tsx
import * as React85 from "react";
import { cva as cva20 } from "class-variance-authority";
import { clsx as clsx107 } from "clsx";
import { Plus as Plus4, Trash2 as Trash23, Activity as Activity8 } from "lucide-react";
import { jsx as jsx134, jsxs as jsxs109 } from "react/jsx-runtime";
var conditionManagerVariants = cva20("condition-manager", {
  variants: {
    variant: {
      default: "condition-manager--default",
      compact: "condition-manager--compact"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var ConditionManager = React85.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, conditions, onAddCondition, onRemoveCondition } = _b, props = __objRest(_b, ["className", "variant", "conditions", "onAddCondition", "onRemoveCondition"]);
    return /* @__PURE__ */ jsxs109(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx107(conditionManagerVariants({ variant }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs109("div", { className: "condition-manager__header flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxs109("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx134(Activity8, { className: "w-5 h-5 text-urvos-danger" }),
              "Problems"
            ] }),
            /* @__PURE__ */ jsxs109(Button, { variant: "secondary", size: "sm", onClick: onAddCondition, className: "gap-2", children: [
              /* @__PURE__ */ jsx134(Plus4, { className: "w-4 h-4" }),
              "Add"
            ] })
          ] }),
          conditions.length === 0 ? /* @__PURE__ */ jsx134("div", { className: "condition-manager__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border", children: "No medical problems recorded." }) : /* @__PURE__ */ jsx134("ul", { className: "condition-manager__list space-y-2", children: conditions.map((condition, idx) => {
            var _a2, _b2, _c, _d, _e, _f, _g;
            return /* @__PURE__ */ jsxs109("li", { className: "condition-manager__item flex justify-between items-center p-3 rounded-lg border border-urvos-border hover:bg-urvos-surface-muted transition-colors", children: [
              /* @__PURE__ */ jsxs109("div", { className: "condition-manager__item-content", children: [
                /* @__PURE__ */ jsx134("div", { className: "font-medium text-urvos-text", children: ((_a2 = condition.code) == null ? void 0 : _a2.text) || ((_d = (_c = (_b2 = condition.code) == null ? void 0 : _b2.coding) == null ? void 0 : _c[0]) == null ? void 0 : _d.display) || "Unknown Condition" }),
                /* @__PURE__ */ jsxs109("div", { className: "text-sm text-urvos-text-subtle flex gap-2", children: [
                  ((_g = (_f = (_e = condition.clinicalStatus) == null ? void 0 : _e.coding) == null ? void 0 : _f[0]) == null ? void 0 : _g.code) && /* @__PURE__ */ jsx134("span", { className: "capitalize font-semibold text-urvos-primary", children: condition.clinicalStatus.coding[0].code }),
                  condition.recordedDate && /* @__PURE__ */ jsxs109("span", { children: [
                    "\u2022 Recorded ",
                    new Date(condition.recordedDate).toLocaleDateString()
                  ] })
                ] })
              ] }),
              onRemoveCondition && condition.id && /* @__PURE__ */ jsx134(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => onRemoveCondition(condition.id),
                  "aria-label": "Remove condition",
                  className: "text-urvos-text-subtle hover:text-urvos-danger",
                  children: /* @__PURE__ */ jsx134(Trash23, { className: "w-4 h-4" })
                }
              )
            ] }, condition.id || idx);
          }) })
        ]
      })
    );
  }
);
ConditionManager.displayName = "ConditionManager";

// components/healthcare/LabResultsList.tsx
import * as React86 from "react";
import { cva as cva21 } from "class-variance-authority";
import { clsx as clsx108 } from "clsx";
import { Plus as Plus5, Trash2 as Trash24, FlaskConical } from "lucide-react";
import { jsx as jsx135, jsxs as jsxs110 } from "react/jsx-runtime";
var labResultsListVariants = cva21("lab-results-list", {
  variants: {
    variant: {
      default: "lab-results-list--default",
      compact: "lab-results-list--compact"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var LabResultsList = React86.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, labs, onAddLab, onRemoveLab } = _b, props = __objRest(_b, ["className", "variant", "labs", "onAddLab", "onRemoveLab"]);
    return /* @__PURE__ */ jsxs110(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx108(labResultsListVariants({ variant }), className)
      }, props), {
        children: [
          /* @__PURE__ */ jsxs110("div", { className: "lab-results-list__header flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ jsxs110("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx135(FlaskConical, { className: "w-5 h-5 text-urvos-primary" }),
              "Labs"
            ] }),
            /* @__PURE__ */ jsxs110(Button, { variant: "secondary", size: "sm", onClick: onAddLab, className: "gap-2", children: [
              /* @__PURE__ */ jsx135(Plus5, { className: "w-4 h-4" }),
              "Order Lab"
            ] })
          ] }),
          labs.length === 0 ? /* @__PURE__ */ jsx135("div", { className: "lab-results-list__empty text-urvos-text-subtle p-6 text-center border-t border-urvos-border", children: "No lab results documented." }) : /* @__PURE__ */ jsx135("ul", { className: "lab-results-list__list space-y-2", children: labs.map((lab, idx) => {
            var _a2, _b2, _c, _d;
            const codeDisplay = ((_a2 = lab.code) == null ? void 0 : _a2.text) || ((_d = (_c = (_b2 = lab.code) == null ? void 0 : _b2.coding) == null ? void 0 : _c[0]) == null ? void 0 : _d.display) || "Unknown Lab Test";
            const status = lab.status;
            const date = lab.effectiveDateTime || lab.authoredOn;
            return /* @__PURE__ */ jsxs110("li", { className: "lab-results-list__item flex justify-between items-center p-3 rounded-lg border border-urvos-border hover:bg-urvos-surface-muted transition-colors", children: [
              /* @__PURE__ */ jsxs110("div", { className: "lab-results-list__item-content", children: [
                /* @__PURE__ */ jsx135("div", { className: "font-medium text-urvos-text", children: codeDisplay }),
                /* @__PURE__ */ jsxs110("div", { className: "text-sm text-urvos-text-subtle flex gap-2", children: [
                  status && /* @__PURE__ */ jsx135("span", { className: "capitalize font-semibold text-urvos-primary", children: status }),
                  date && /* @__PURE__ */ jsxs110("span", { children: [
                    "\u2022 ",
                    new Date(date).toLocaleDateString()
                  ] })
                ] })
              ] }),
              onRemoveLab && lab.id && /* @__PURE__ */ jsx135(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => onRemoveLab(lab.id),
                  "aria-label": "Remove lab",
                  className: "text-urvos-text-subtle hover:text-urvos-danger",
                  children: /* @__PURE__ */ jsx135(Trash24, { className: "w-4 h-4" })
                }
              )
            ] }, lab.id || idx);
          }) })
        ]
      })
    );
  }
);
LabResultsList.displayName = "LabResultsList";

// components/healthcare/ClinicalCopilot.tsx
import * as React87 from "react";
import { cva as cva22 } from "class-variance-authority";
import { clsx as clsx109 } from "clsx";
import { Bot, FileText as FileText9, Pill as Pill6, ListChecks, ClipboardList, PenTool as PenTool2 } from "lucide-react";
import { jsx as jsx136, jsxs as jsxs111 } from "react/jsx-runtime";
var clinicalCopilotVariants = cva22("clinical-copilot", {
  variants: {
    variant: {
      default: "clinical-copilot--default bg-urvos-surface border border-urvos-border rounded-xl"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var COPILOT_ACTIONS = [
  { id: "summarize_chart", label: "Summarize chart", icon: FileText9 },
  { id: "explain_medications", label: "Explain medications", icon: Pill6 },
  { id: "find_screenings", label: "Find missing screenings", icon: ListChecks },
  { id: "suggest_care_plan", label: "Suggest care plan", icon: ClipboardList },
  { id: "generate_soap", label: "Generate SOAP note", icon: PenTool2 }
];
var ClinicalCopilot = React87.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant, onAction } = _b, props = __objRest(_b, ["className", "variant", "onAction"]);
    return /* @__PURE__ */ jsx136(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: clsx109(clinicalCopilotVariants({ variant }), className)
      }, props), {
        children: /* @__PURE__ */ jsxs111("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxs111("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx136(Bot, { className: "w-5 h-5 text-urvos-text" }),
            /* @__PURE__ */ jsx136("h3", { className: "text-base font-semibold text-urvos-text", children: "Clinical Copilot" })
          ] }),
          /* @__PURE__ */ jsx136("div", { className: "space-y-2", children: COPILOT_ACTIONS.map((action) => {
            const Icon2 = action.icon;
            return /* @__PURE__ */ jsxs111(
              "button",
              {
                onClick: () => onAction == null ? void 0 : onAction(action.id, action.label),
                className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-urvos-surface-muted border border-transparent hover:border-urvos-border transition-all text-left group",
                children: [
                  /* @__PURE__ */ jsx136(Icon2, { className: "w-5 h-5 text-urvos-text-subtle group-hover:text-urvos-text transition-colors" }),
                  /* @__PURE__ */ jsx136("span", { className: "text-sm font-medium text-urvos-text-subtle group-hover:text-urvos-text transition-colors", children: action.label })
                ]
              },
              action.id
            );
          }) })
        ] })
      })
    );
  }
);
ClinicalCopilot.displayName = "ClinicalCopilot";

// components/healthcare/ToothChart.tsx
import { useState as useState48, useEffect as useEffect29, useMemo as useMemo10 } from "react";
import { clsx as clsx116 } from "clsx";

// components/healthcare/ToothChartEngine/CustomOdontogram.tsx
import { useCallback as useCallback11 } from "react";
import { clsx as clsx111 } from "clsx";

// components/healthcare/geometry/adult.ts
function generateSurfacePaths(x, y, size, isUpper, isAnterior) {
  const half = size / 2;
  const innerHalf = size / 4;
  const left = x - half;
  const right = x + half;
  const top = y - half;
  const bottom = y + half;
  const inLeft = x - innerHalf;
  const inRight = x + innerHalf;
  const inTop = y - innerHalf;
  const inBottom = y + innerHalf;
  const centerPath = `M ${inLeft} ${inTop} L ${inRight} ${inTop} L ${inRight} ${inBottom} L ${inLeft} ${inBottom} Z`;
  const topPath = `M ${left} ${top} L ${right} ${top} L ${inRight} ${inTop} L ${inLeft} ${inTop} Z`;
  const bottomPath = `M ${left} ${bottom} L ${right} ${bottom} L ${inRight} ${inBottom} L ${inLeft} ${inBottom} Z`;
  const leftPath = `M ${left} ${top} L ${inLeft} ${inTop} L ${inLeft} ${inBottom} L ${left} ${bottom} Z`;
  const rightPath = `M ${right} ${top} L ${inRight} ${inTop} L ${inRight} ${inBottom} L ${right} ${bottom} Z`;
  return {
    center: centerPath,
    top: topPath,
    bottom: bottomPath,
    left: leftPath,
    right: rightPath
  };
}
function generateAdultDentition() {
  const teeth = {};
  const TOOTH_SIZE = 36;
  const GAP2 = 8;
  const START_X = TOOTH_SIZE / 2;
  const UPPER_Y = 60;
  const LOWER_Y = 160;
  const quadrants = [
    { prefix: 1, y: UPPER_Y, isUpper: true, ids: [8, 7, 6, 5, 4, 3, 2, 1] },
    { prefix: 2, y: UPPER_Y, isUpper: true, ids: [1, 2, 3, 4, 5, 6, 7, 8] },
    { prefix: 4, y: LOWER_Y, isUpper: false, ids: [8, 7, 6, 5, 4, 3, 2, 1] },
    { prefix: 3, y: LOWER_Y, isUpper: false, ids: [1, 2, 3, 4, 5, 6, 7, 8] }
  ];
  let currentX = START_X;
  quadrants.forEach((q, qIndex) => {
    if (qIndex === 2) currentX = START_X;
    q.ids.forEach((id) => {
      const isAnterior = id <= 3;
      const isLeftQuadrant = q.prefix === 2 || q.prefix === 3;
      const fullId = `${q.prefix}${id}`;
      const paths = generateSurfacePaths(currentX, q.y, TOOTH_SIZE, q.isUpper, isAnterior);
      const buccalPath = q.isUpper ? paths.top : paths.bottom;
      const lingualPath = q.isUpper ? paths.bottom : paths.top;
      const mesialPath = isLeftQuadrant ? paths.left : paths.right;
      const distalPath = isLeftQuadrant ? paths.right : paths.left;
      const occlusalPath = paths.center;
      const surfaces = [
        { id: isAnterior ? "I" : "O", path: occlusalPath },
        { id: "M", path: mesialPath },
        { id: "D", path: distalPath },
        { id: isAnterior ? "F" : "B", path: buccalPath },
        { id: "L", path: lingualPath }
      ];
      const half = TOOTH_SIZE / 2;
      const outline = `M ${currentX - half} ${q.y - half} L ${currentX + half} ${q.y - half} L ${currentX + half} ${q.y + half} L ${currentX - half} ${q.y + half} Z`;
      teeth[fullId] = {
        id: fullId,
        center: { x: currentX, y: q.y },
        outline,
        surfaces,
        labelPosition: { x: currentX, y: q.isUpper ? q.y - TOOTH_SIZE + 4 : q.y + TOOTH_SIZE - 4 }
      };
      currentX += TOOTH_SIZE + GAP2;
      if (id === 1 && (q.prefix === 1 || q.prefix === 4)) {
        currentX += GAP2 * 2;
      }
    });
  });
  return teeth;
}
var adultGeometry = generateAdultDentition();

// components/healthcare/ToothChartEngine/Tooth.tsx
import React89 from "react";

// components/healthcare/ToothChartEngine/BaseRenderer.tsx
import { jsx as jsx137, jsxs as jsxs112 } from "react/jsx-runtime";
var BaseRenderer = ({ geometry }) => {
  return /* @__PURE__ */ jsxs112("g", { className: "base-renderer pointer-events-none", children: [
    /* @__PURE__ */ jsx137(
      "path",
      {
        d: geometry.outline,
        fill: "none",
        stroke: "var(--border)",
        strokeWidth: "1"
      }
    ),
    /* @__PURE__ */ jsx137(
      "text",
      {
        x: geometry.labelPosition.x,
        y: geometry.labelPosition.y,
        textAnchor: "middle",
        dominantBaseline: "middle",
        fill: "var(--text-2)",
        fontSize: "12",
        fontWeight: "500",
        children: geometry.id
      }
    )
  ] });
};

// components/healthcare/ToothChartEngine/SurfaceRenderer.tsx
import React88 from "react";
import { clsx as clsx110 } from "clsx";
import { jsx as jsx138 } from "react/jsx-runtime";
var SurfaceRenderer = ({ geometry, interactionMode = "tooth", onSurfaceClick, surfaceFills = {} }) => {
  const [hoveredSurface, setHoveredSurface] = React88.useState(null);
  return /* @__PURE__ */ jsx138("g", { className: "surface-renderer", children: geometry.surfaces.map((surface) => {
    const isHovered = interactionMode === "surface" && hoveredSurface === surface.id;
    const baseFill = surfaceFills[surface.id] || "var(--urvos-color-background-surface)";
    return /* @__PURE__ */ jsx138(
      "path",
      {
        d: surface.path,
        fill: baseFill,
        stroke: "var(--urvos-color-border-strong)",
        strokeWidth: "1",
        className: clsx110(
          "surface-path transition-colors duration-200",
          interactionMode === "surface" && "cursor-crosshair"
        ),
        style: isHovered ? { fill: "var(--active-hover-color)", opacity: 0.7 } : {},
        onMouseEnter: () => setHoveredSurface(surface.id),
        onMouseLeave: () => setHoveredSurface(null),
        onClick: (e) => {
          if (interactionMode === "surface") {
            e.stopPropagation();
            onSurfaceClick == null ? void 0 : onSurfaceClick(surface.id);
          }
        }
      },
      surface.id
    );
  }) });
};

// components/healthcare/ToothChartEngine/ClinicalRenderer.tsx
import { jsx as jsx139, jsxs as jsxs113 } from "react/jsx-runtime";
var ClinicalRenderer = ({ geometry, globalConditions }) => {
  const { isMissing, missingColor, isExtPlanned, extPlannedColor, crown, rootCanal, implant } = globalConditions;
  const cx = geometry.center.x;
  const cy = geometry.center.y;
  const size = 36;
  const half = size / 2;
  const rootY = cy + (geometry.id.startsWith("1") || geometry.id.startsWith("2") ? -size : size);
  return /* @__PURE__ */ jsxs113("g", { className: "clinical-renderer pointer-events-none", children: [
    crown && /* @__PURE__ */ jsx139(
      "rect",
      {
        x: cx - half - 2,
        y: cy - half - 2,
        width: size + 4,
        height: size + 4,
        fill: "none",
        stroke: crown.color,
        strokeWidth: "3",
        rx: "4"
      }
    ),
    rootCanal && /* @__PURE__ */ jsx139(
      "line",
      {
        x1: cx,
        y1: cy,
        x2: cx,
        y2: rootY,
        stroke: rootCanal.color,
        strokeWidth: "3"
      }
    ),
    implant && /* @__PURE__ */ jsx139(
      "path",
      {
        d: `M ${cx - 4} ${rootY} L ${cx + 4} ${rootY} L ${cx} ${cy} Z`,
        fill: implant.color
      }
    ),
    isMissing && /* @__PURE__ */ jsxs113("g", { stroke: missingColor || "var(--urvos-color-clinical-missing)", strokeWidth: "3", strokeLinecap: "round", children: [
      /* @__PURE__ */ jsx139("line", { x1: cx - half, y1: cy - half, x2: cx + half, y2: cy + half }),
      /* @__PURE__ */ jsx139("line", { x1: cx + half, y1: cy - half, x2: cx - half, y2: cy + half })
    ] }),
    isExtPlanned && !isMissing && /* @__PURE__ */ jsxs113("g", { stroke: extPlannedColor || "var(--urvos-color-clinical-planned)", strokeWidth: "3", strokeLinecap: "round", children: [
      /* @__PURE__ */ jsx139("line", { x1: cx - half, y1: cy - half, x2: cx + half, y2: cy + half }),
      /* @__PURE__ */ jsx139("line", { x1: cx + half, y1: cy - half, x2: cx - half, y2: cy + half })
    ] })
  ] });
};

// components/healthcare/ToothChartEngine/useToothDisplayModel.ts
import { useMemo as useMemo8 } from "react";
var getConditionColor = (type, status) => {
  if (status === "planned") return "var(--urvos-color-clinical-planned)";
  if (status === "completed") return "var(--urvos-color-clinical-completed)";
  if (status === "existing") return "var(--urvos-color-clinical-existing)";
  if (status === "in_progress") return "var(--urvos-color-clinical-in-progress)";
  if (status === "watch") return "var(--urvos-color-clinical-watch)";
  if (type === "caries") return "var(--urvos-color-clinical-caries)";
  if (type === "fracture") return "var(--urvos-color-clinical-fracture)";
  if (type === "impacted") return "var(--urvos-color-clinical-impacted)";
  if (type === "missing") return "var(--urvos-color-clinical-missing)";
  if (type === "extraction_planned") return "var(--urvos-color-clinical-planned)";
  return "var(--urvos-color-clinical-existing)";
};
var STATUS_PRIORITY = {
  "planned": 5,
  "in_progress": 4,
  "completed": 3,
  "existing": 2,
  "watch": 1
};
var useToothDisplayModel = (data) => {
  return useMemo8(() => {
    const model = {
      surfaceFills: {},
      globalConditions: {
        isMissing: false,
        isExtPlanned: false,
        crown: null,
        rootCanal: null,
        implant: null
      },
      badges: {
        findingsCount: 0,
        notesCount: 0
      }
    };
    if (!data) return model;
    model.badges.findingsCount = data.findings.length;
    model.badges.notesCount = data.notes.length;
    const allRecords = [...data.findings, ...data.treatments];
    const surfaceHighestPriority = {};
    allRecords.forEach((record) => {
      if (record.surfaces && record.surfaces.length > 0) {
        const color = getConditionColor(record.type, record.status);
        const priority = STATUS_PRIORITY[record.status || ""] || 0;
        record.surfaces.forEach((surface) => {
          const currentPriority = surfaceHighestPriority[surface] || -1;
          if (priority >= currentPriority) {
            model.surfaceFills[surface] = color;
            surfaceHighestPriority[surface] = priority;
          }
        });
      }
    });
    const wholeToothRecords = allRecords.filter((r) => !r.surfaces || r.surfaces.length === 0);
    wholeToothRecords.forEach((record) => {
      const color = getConditionColor(record.type, record.status);
      if (record.type === "missing") {
        model.globalConditions.isMissing = true;
        model.globalConditions.missingColor = color;
      }
      if (record.type === "extraction_planned") {
        model.globalConditions.isExtPlanned = true;
        model.globalConditions.extPlannedColor = color;
      }
      if (record.type === "crown_full") {
        model.globalConditions.crown = { color };
      }
      if (record.type === "endo_treatment") {
        model.globalConditions.rootCanal = { color };
      }
      if (record.type === "implant") {
        model.globalConditions.implant = { color };
      }
    });
    return model;
  }, [data]);
};

// components/healthcare/ToothChartEngine/Tooth.tsx
import { jsx as jsx140, jsxs as jsxs114 } from "react/jsx-runtime";
var Tooth = React89.memo(({ geometry, data, interactionMode = "tooth", onSurfaceClick }) => {
  const displayModel = useToothDisplayModel(data);
  return /* @__PURE__ */ jsxs114("g", { id: `tooth-${geometry.id}`, className: "tooth-group relative", children: [
    displayModel.badges.findingsCount > 0 && /* @__PURE__ */ jsxs114("g", { transform: `translate(${geometry.center.x - 12}, ${geometry.id.startsWith("1") || geometry.id.startsWith("2") ? geometry.center.y - 45 : geometry.center.y + 45})`, children: [
      /* @__PURE__ */ jsx140("circle", { cx: "0", cy: "0", r: "8", fill: "var(--urvos-color-status-danger)" }),
      /* @__PURE__ */ jsx140("text", { x: "0", y: "3", fontSize: "10", fill: "var(--urvos-color-background-surface)", textAnchor: "middle", fontWeight: "bold", children: displayModel.badges.findingsCount })
    ] }),
    displayModel.badges.notesCount > 0 && /* @__PURE__ */ jsxs114("g", { transform: `translate(${geometry.center.x + 12}, ${geometry.id.startsWith("1") || geometry.id.startsWith("2") ? geometry.center.y - 45 : geometry.center.y + 45})`, children: [
      /* @__PURE__ */ jsx140("circle", { cx: "0", cy: "0", r: "8", fill: "var(--urvos-color-status-info)" }),
      /* @__PURE__ */ jsx140("text", { x: "0", y: "3", fontSize: "10", fill: "var(--urvos-color-background-surface)", textAnchor: "middle", fontWeight: "bold", children: "N" })
    ] }),
    /* @__PURE__ */ jsx140(BaseRenderer, { geometry }),
    /* @__PURE__ */ jsx140(
      SurfaceRenderer,
      {
        geometry,
        interactionMode,
        onSurfaceClick,
        surfaceFills: displayModel.surfaceFills
      }
    ),
    /* @__PURE__ */ jsx140(ClinicalRenderer, { geometry, globalConditions: displayModel.globalConditions })
  ] });
});
Tooth.displayName = "Tooth";

// components/healthcare/ToothChartEngine/CustomOdontogram.tsx
import { jsx as jsx141, jsxs as jsxs115 } from "react/jsx-runtime";
var CustomOdontogram = ({
  className,
  onToothClick,
  onSurfaceClick,
  selectedTeeth = [],
  teethData = {},
  interactionMode = "tooth",
  readOnly = false
}) => {
  const handleToothClick = useCallback11((id) => {
    if (readOnly) return;
    onToothClick == null ? void 0 : onToothClick(id);
  }, [readOnly, onToothClick]);
  return /* @__PURE__ */ jsx141(
    "svg",
    {
      className: clsx111(
        className,
        interactionMode === "surface" ? "cursor-crosshair" : "cursor-pointer"
      ),
      viewBox: "0 0 800 240",
      preserveAspectRatio: "xMidYMid meet",
      style: { width: "100%", height: "100%", minHeight: 300 },
      children: /* @__PURE__ */ jsx141("g", { className: "dentition-layer", children: Object.values(adultGeometry).map((geom) => {
        const isSelected = selectedTeeth.includes(geom.id);
        const toothData = teethData[geom.id];
        return /* @__PURE__ */ jsxs115(
          "g",
          {
            onClick: (e) => {
              if (interactionMode === "surface" && e.target.closest(".surface-path")) {
                return;
              }
              handleToothClick(geom.id);
            },
            className: "group",
            children: [
              isSelected && /* @__PURE__ */ jsx141(
                "rect",
                {
                  x: geom.center.x - 22,
                  y: geom.center.y - 22,
                  width: 44,
                  height: 44,
                  rx: 8,
                  fill: "var(--urvos-surface-sunken)",
                  stroke: "var(--urvos-primary)",
                  strokeWidth: "2",
                  className: "pointer-events-none"
                }
              ),
              /* @__PURE__ */ jsx141(
                Tooth,
                {
                  geometry: geom,
                  data: toothData,
                  interactionMode,
                  onSurfaceClick: (surfaceId) => {
                    if (readOnly) return;
                    onSurfaceClick == null ? void 0 : onSurfaceClick(geom.id, surfaceId);
                  }
                }
              ),
              /* @__PURE__ */ jsx141(
                "rect",
                {
                  x: geom.center.x - 20,
                  y: geom.center.y - 20,
                  width: 40,
                  height: 40,
                  fill: "transparent",
                  className: interactionMode === "surface" ? "pointer-events-none" : ""
                }
              )
            ]
          },
          geom.id
        );
      }) })
    }
  );
};

// components/healthcare/ToothInspector/index.tsx
import React92, { useState as useState46 } from "react";
import { clsx as clsx114 } from "clsx";
import { ChevronDown as ChevronDown8, Clock as Clock10, FileText as FileText11, ImageIcon as ImageIcon2, ActivityIcon } from "lucide-react";

// components/healthcare/ToothSurfaceSelector.tsx
import { clsx as clsx112 } from "clsx";
import { jsx as jsx142, jsxs as jsxs116 } from "react/jsx-runtime";
var ToothSurfaceSelector = ({
  selectedSurfaces,
  onChange,
  className
}) => {
  const toggleSurface = (surface) => {
    if (selectedSurfaces.includes(surface)) {
      onChange(selectedSurfaces.filter((s) => s !== surface));
    } else {
      onChange([...selectedSurfaces, surface]);
    }
  };
  const isSelected = (surface) => selectedSurfaces.includes(surface);
  return /* @__PURE__ */ jsxs116("div", { className: clsx112("relative w-24 h-24 mx-auto", className), children: [
    /* @__PURE__ */ jsxs116("svg", { viewBox: "0 0 100 100", className: "w-full h-full drop-shadow-sm", children: [
      /* @__PURE__ */ jsx142(
        "path",
        {
          d: "M 20 20 L 80 20 L 65 35 L 35 35 Z",
          fill: isSelected("B") ? "#60a5fa" : "#ffffff",
          stroke: "#94a3b8",
          strokeWidth: "2",
          className: "cursor-pointer hover:fill-blue-100 transition-colors",
          onClick: () => toggleSurface("B")
        }
      ),
      /* @__PURE__ */ jsx142(
        "path",
        {
          d: "M 35 65 L 65 65 L 80 80 L 20 80 Z",
          fill: isSelected("L") ? "#60a5fa" : "#ffffff",
          stroke: "#94a3b8",
          strokeWidth: "2",
          className: "cursor-pointer hover:fill-blue-100 transition-colors",
          onClick: () => toggleSurface("L")
        }
      ),
      /* @__PURE__ */ jsx142(
        "path",
        {
          d: "M 20 20 L 35 35 L 35 65 L 20 80 Z",
          fill: isSelected("M") ? "#60a5fa" : "#ffffff",
          stroke: "#94a3b8",
          strokeWidth: "2",
          className: "cursor-pointer hover:fill-blue-100 transition-colors",
          onClick: () => toggleSurface("M")
        }
      ),
      /* @__PURE__ */ jsx142(
        "path",
        {
          d: "M 80 20 L 80 80 L 65 65 L 65 35 Z",
          fill: isSelected("D") ? "#60a5fa" : "#ffffff",
          stroke: "#94a3b8",
          strokeWidth: "2",
          className: "cursor-pointer hover:fill-blue-100 transition-colors",
          onClick: () => toggleSurface("D")
        }
      ),
      /* @__PURE__ */ jsx142(
        "rect",
        {
          x: "35",
          y: "35",
          width: "30",
          height: "30",
          fill: isSelected("O") ? "#60a5fa" : "#ffffff",
          stroke: "#94a3b8",
          strokeWidth: "2",
          className: "cursor-pointer hover:fill-blue-100 transition-colors",
          onClick: () => toggleSurface("O")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs116("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center", children: [
      /* @__PURE__ */ jsx142("span", { className: "text-[10px] font-bold text-slate-400 absolute top-2", children: "B" }),
      /* @__PURE__ */ jsx142("span", { className: "text-[10px] font-bold text-slate-400 absolute bottom-2", children: "L" }),
      /* @__PURE__ */ jsx142("span", { className: "text-[10px] font-bold text-slate-400 absolute left-2", children: "M" }),
      /* @__PURE__ */ jsx142("span", { className: "text-[10px] font-bold text-slate-400 absolute right-2", children: "D" }),
      /* @__PURE__ */ jsx142("span", { className: "text-[10px] font-bold text-slate-600", children: "O" })
    ] })
  ] });
};

// components/healthcare/ToothInspector/OverviewTab.tsx
import { X as X13 } from "lucide-react";
import { clsx as clsx113 } from "clsx";
import { Fragment as Fragment11, jsx as jsx143, jsxs as jsxs117 } from "react/jsx-runtime";
var OverviewTab = ({ activeTooth, onRemoveRecord, onToggleSurface }) => {
  return /* @__PURE__ */ jsxs117(Fragment11, { children: [
    /* @__PURE__ */ jsxs117("div", { children: [
      /* @__PURE__ */ jsx143("h3", { className: "text-sm font-semibold text-urvos-text mb-3", children: "Active Findings" }),
      activeTooth.findings && activeTooth.findings.length > 0 ? /* @__PURE__ */ jsx143("ul", { className: "space-y-2", children: activeTooth.findings.map((finding) => {
        const tool = CLINICAL_TOOLS.find((t) => t.id === finding.type);
        return /* @__PURE__ */ jsxs117("li", { className: "bg-white p-3 rounded-lg border border-urvos-border shadow-sm flex items-start justify-between group", children: [
          /* @__PURE__ */ jsxs117("div", { className: "flex items-center gap-3", children: [
            tool && /* @__PURE__ */ jsx143(tool.icon, { className: clsx113("w-5 h-5", tool.color) }),
            /* @__PURE__ */ jsxs117("div", { children: [
              /* @__PURE__ */ jsx143("p", { className: "text-sm font-medium text-urvos-text", children: (tool == null ? void 0 : tool.label) || finding.type }),
              /* @__PURE__ */ jsxs117("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsx143("span", { className: "text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600", children: finding.status || "Active" }),
                /* @__PURE__ */ jsx143("div", { className: "flex items-center gap-1 ml-2", children: ["M", "I", "L", "D", "F"].map((s) => {
                  var _a;
                  const isActive = (_a = finding.surfaces) == null ? void 0 : _a.includes(s);
                  return /* @__PURE__ */ jsx143(
                    "button",
                    {
                      onClick: () => onToggleSurface == null ? void 0 : onToggleSurface(activeTooth.id, finding.id, s),
                      className: clsx113(
                        "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors",
                        isActive ? "bg-gray-800 text-white hover:bg-red-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      ),
                      children: s
                    },
                    s
                  );
                }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx143(
            "button",
            {
              onClick: () => onRemoveRecord(activeTooth.id, finding.id),
              className: "p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100",
              children: /* @__PURE__ */ jsx143(X13, { className: "w-4 h-4" })
            }
          )
        ] }, finding.id);
      }) }) : /* @__PURE__ */ jsx143("p", { className: "text-sm text-urvos-text-muted italic bg-white p-3 rounded-lg border border-urvos-border border-dashed text-center", children: "No active findings." })
    ] }),
    /* @__PURE__ */ jsxs117("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsx143("h3", { className: "text-sm font-semibold text-urvos-text mb-3", children: "Treatments" }),
      activeTooth.treatments && activeTooth.treatments.length > 0 ? /* @__PURE__ */ jsx143("ul", { className: "space-y-2", children: activeTooth.treatments.map((treatment) => {
        const tool = CLINICAL_TOOLS.find((t) => t.id === treatment.type);
        return /* @__PURE__ */ jsxs117("li", { className: "bg-white p-3 rounded-lg border border-urvos-border shadow-sm flex items-start justify-between group", children: [
          /* @__PURE__ */ jsxs117("div", { className: "flex items-center gap-3", children: [
            tool && /* @__PURE__ */ jsx143(tool.icon, { className: clsx113("w-5 h-5", tool.color) }),
            /* @__PURE__ */ jsxs117("div", { children: [
              /* @__PURE__ */ jsx143("p", { className: "text-sm font-medium text-urvos-text", children: (tool == null ? void 0 : tool.label) || treatment.type }),
              /* @__PURE__ */ jsxs117("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsx143("span", { className: clsx113(
                  "text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full",
                  treatment.status === "existing" && "bg-blue-100 text-blue-700",
                  treatment.status === "planned" && "bg-orange-100 text-orange-700",
                  treatment.status === "completed" && "bg-green-100 text-green-700",
                  treatment.status === "in_progress" && "bg-purple-100 text-purple-700"
                ), children: treatment.status }),
                /* @__PURE__ */ jsx143("div", { className: "flex items-center gap-1 ml-2", children: ["M", "I", "L", "D", "F"].map((s) => {
                  var _a;
                  const isActive = (_a = treatment.surfaces) == null ? void 0 : _a.includes(s);
                  return /* @__PURE__ */ jsx143(
                    "button",
                    {
                      onClick: () => onToggleSurface == null ? void 0 : onToggleSurface(activeTooth.id, treatment.id, s),
                      className: clsx113(
                        "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold transition-colors",
                        isActive ? treatment.status === "planned" ? "bg-orange-500 text-white hover:bg-orange-600" : treatment.status === "completed" ? "bg-green-500 text-white hover:bg-green-600" : treatment.status === "existing" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-purple-500 text-white hover:bg-purple-600" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      ),
                      children: s
                    },
                    s
                  );
                }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx143(
            "button",
            {
              onClick: () => onRemoveRecord(activeTooth.id, treatment.id),
              className: "p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100",
              children: /* @__PURE__ */ jsx143(X13, { className: "w-4 h-4" })
            }
          )
        ] }, treatment.id);
      }) }) : /* @__PURE__ */ jsx143("p", { className: "text-sm text-urvos-text-muted italic bg-white p-3 rounded-lg border border-urvos-border border-dashed text-center", children: "No treatments planned or completed." })
    ] })
  ] });
};

// components/healthcare/ToothInspector/HistoryTab.tsx
import { jsx as jsx144, jsxs as jsxs118 } from "react/jsx-runtime";
var HistoryTab = ({ activeTooth }) => {
  return /* @__PURE__ */ jsxs118("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx144("h3", { className: "text-sm font-semibold text-urvos-text", children: "Clinical Timeline" }),
    activeTooth.history && activeTooth.history.length > 0 ? /* @__PURE__ */ jsx144("div", { className: "relative border-l border-gray-200 ml-3 space-y-6", children: [...activeTooth.history].reverse().map((event, idx) => /* @__PURE__ */ jsxs118("div", { className: "pl-6 relative", children: [
      /* @__PURE__ */ jsx144("div", { className: "absolute w-3 h-3 bg-blue-500 rounded-full -left-1.5 top-1.5 border-2 border-white" }),
      /* @__PURE__ */ jsx144("p", { className: "text-sm font-medium text-urvos-text", children: event.action }),
      /* @__PURE__ */ jsxs118("div", { className: "flex items-center gap-2 text-xs text-urvos-text-muted mt-1", children: [
        /* @__PURE__ */ jsx144("span", { children: new Date(event.timestamp).toLocaleDateString() }),
        /* @__PURE__ */ jsx144("span", { children: "\u2022" }),
        /* @__PURE__ */ jsx144("span", { children: event.user })
      ] })
    ] }, event.id || idx)) }) : /* @__PURE__ */ jsx144("p", { className: "text-sm text-urvos-text-muted italic", children: "No history available for this tooth." })
  ] });
};

// components/healthcare/ToothInspector/NotesTab.tsx
import { useState as useState45 } from "react";
import { FileText as FileText10 } from "lucide-react";
import { jsx as jsx145, jsxs as jsxs119 } from "react/jsx-runtime";
var NotesTab = ({ activeTooth, onAddNote }) => {
  const [noteType, setNoteType] = useState45("SOAP Note");
  const [noteText, setNoteText] = useState45("");
  const handleSave = () => {
    if (!noteText.trim()) return;
    onAddNote(activeTooth.id, noteType, noteText);
    setNoteText("");
  };
  return /* @__PURE__ */ jsxs119("div", { className: "space-y-4 flex flex-col", children: [
    /* @__PURE__ */ jsxs119("div", { className: "bg-white p-4 rounded-xl border border-urvos-border shadow-sm space-y-3", children: [
      /* @__PURE__ */ jsx145("h3", { className: "text-sm font-semibold text-urvos-text", children: "Add Clinical Note" }),
      /* @__PURE__ */ jsx145("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs119(
        "select",
        {
          value: noteType,
          onChange: (e) => setNoteType(e.target.value),
          className: "text-xs border border-urvos-border rounded-md px-2 py-1.5 bg-gray-50 text-urvos-text outline-none focus:ring-1 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx145("option", { value: "SOAP Note", children: "SOAP Note" }),
            /* @__PURE__ */ jsx145("option", { value: "Observation", children: "Observation" }),
            /* @__PURE__ */ jsx145("option", { value: "Recommendation", children: "Recommendation" }),
            /* @__PURE__ */ jsx145("option", { value: "Alert", children: "Alert" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx145(
        "textarea",
        {
          value: noteText,
          onChange: (e) => setNoteText(e.target.value),
          placeholder: "Enter clinical note details...",
          className: "w-full text-sm border border-urvos-border rounded-md p-3 min-h-[100px] outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        }
      ),
      /* @__PURE__ */ jsx145("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx145(
        "button",
        {
          onClick: handleSave,
          disabled: !noteText.trim(),
          className: "px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors",
          children: "Save Note"
        }
      ) })
    ] }),
    activeTooth.notes && activeTooth.notes.length > 0 ? /* @__PURE__ */ jsx145("div", { className: "space-y-3 mt-4", children: activeTooth.notes.map((note) => /* @__PURE__ */ jsxs119("div", { className: "bg-white p-3 rounded-lg border border-urvos-border shadow-sm", children: [
      /* @__PURE__ */ jsxs119("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx145("span", { className: "text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700", children: note.type }),
        /* @__PURE__ */ jsx145("span", { className: "text-xs text-gray-500", children: new Date(note.timestamp).toLocaleDateString() })
      ] }),
      /* @__PURE__ */ jsx145("p", { className: "text-sm text-urvos-text whitespace-pre-wrap", children: note.text })
    ] }, note.id)) }) : /* @__PURE__ */ jsxs119("div", { className: "py-8 flex flex-col items-center text-center opacity-50", children: [
      /* @__PURE__ */ jsx145(FileText10, { className: "w-8 h-8 mb-2 mx-auto text-gray-400" }),
      /* @__PURE__ */ jsx145("p", { className: "text-xs text-urvos-text-muted", children: "No notes available." })
    ] })
  ] });
};

// components/healthcare/ToothInspector/ImagesTab.tsx
import { ImageIcon, Plus as Plus6 } from "lucide-react";
import { jsx as jsx146, jsxs as jsxs120 } from "react/jsx-runtime";
var ImagesTab = () => {
  return /* @__PURE__ */ jsxs120("div", { className: "space-y-4 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs120("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx146("h3", { className: "text-sm font-semibold text-urvos-text", children: "Images & X-Rays" }),
      /* @__PURE__ */ jsxs120("button", { className: "text-xs font-medium text-blue-600 hover:underline flex items-center gap-1", children: [
        /* @__PURE__ */ jsx146(Plus6, { className: "w-3 h-3" }),
        " Upload"
      ] })
    ] }),
    /* @__PURE__ */ jsxs120("div", { className: "flex-1 flex flex-col justify-center items-center text-center opacity-50 py-12", children: [
      /* @__PURE__ */ jsx146(ImageIcon, { className: "w-12 h-12 mb-3 mx-auto text-gray-400" }),
      /* @__PURE__ */ jsx146("p", { className: "text-sm text-urvos-text-muted", children: "No images attached." })
    ] })
  ] });
};

// components/healthcare/ToothInspector/index.tsx
import { jsx as jsx147, jsxs as jsxs121 } from "react/jsx-runtime";
var ToothInspectorPanel = ({ teeth, onApplyTool, onRemoveRecord, onToggleSurface, onAddNote, className }) => {
  const [activeTab, setActiveTab] = useState46("overview");
  const [activeToothId, setActiveToothId] = useState46(null);
  const [activeSurfaces, setActiveSurfaces] = useState46([]);
  React92.useEffect(() => {
    if (teeth.length === 1) {
      setActiveToothId(teeth[0].id);
    } else if (teeth.length === 0) {
      setActiveToothId(null);
    } else if (activeToothId && !teeth.find((t) => t.id === activeToothId)) {
      setActiveToothId(null);
    }
  }, [teeth, activeToothId]);
  if (teeth.length === 0) {
    return /* @__PURE__ */ jsxs121("div", { className: clsx114("w-[420px] max-w-[520px] flex-none border-l border-urvos-border bg-urvos-surface flex flex-col items-center justify-center p-8 text-center", className), children: [
      /* @__PURE__ */ jsx147(ActivityIcon, { className: "w-12 h-12 text-gray-300 mb-4" }),
      /* @__PURE__ */ jsx147("h3", { className: "text-sm font-semibold text-urvos-text mb-2", children: "No Tooth Selected" }),
      /* @__PURE__ */ jsx147("p", { className: "text-xs text-urvos-text-muted", children: "Select one or more teeth on the chart to view details and apply treatments." })
    ] });
  }
  const isBatchMode = teeth.length > 1 && !activeToothId;
  const activeTooth = activeToothId ? teeth.find((t) => t.id === activeToothId) : null;
  const tabs2 = [
    { id: "overview", label: "Overview", icon: ActivityIcon },
    { id: "history", label: "History", icon: Clock10 },
    { id: "notes", label: "Notes", icon: FileText11 },
    { id: "images", label: "Images", icon: ImageIcon2 },
    { id: "perio", label: "Perio", icon: ActivityIcon }
  ];
  return /* @__PURE__ */ jsxs121("div", { className: clsx114("w-[420px] min-w-[420px] max-w-[520px] flex-none border-l border-urvos-border bg-white flex flex-col h-full", className), children: [
    /* @__PURE__ */ jsx147("div", { className: "flex-none p-4 border-b border-urvos-border bg-urvos-surface", children: isBatchMode ? /* @__PURE__ */ jsxs121("div", { children: [
      /* @__PURE__ */ jsxs121("h2", { className: "text-lg font-semibold text-urvos-text mb-2", children: [
        teeth.length,
        " Teeth Selected"
      ] }),
      teeth.length <= 8 ? /* @__PURE__ */ jsx147("div", { className: "flex flex-wrap gap-2", children: teeth.map((t) => /* @__PURE__ */ jsx147(
        "button",
        {
          onClick: () => setActiveToothId(t.id),
          className: "px-2 py-1 rounded bg-white border border-urvos-border hover:bg-gray-50 text-xs font-medium text-urvos-text shadow-sm",
          children: t.id
        },
        t.id
      )) }) : /* @__PURE__ */ jsxs121("button", { className: "flex items-center justify-between w-full px-3 py-2 bg-white border border-urvos-border rounded-lg text-sm text-urvos-text shadow-sm hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx147("span", { children: "Show List" }),
        /* @__PURE__ */ jsx147(ChevronDown8, { className: "w-4 h-4" })
      ] })
    ] }) : /* @__PURE__ */ jsxs121("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs121("div", { children: [
        /* @__PURE__ */ jsxs121("div", { className: "flex items-center gap-2", children: [
          teeth.length > 1 && /* @__PURE__ */ jsx147(
            "button",
            {
              onClick: () => setActiveToothId(null),
              className: "text-xs text-blue-600 hover:underline mr-2",
              children: "\u2190 Back to Batch"
            }
          ),
          /* @__PURE__ */ jsxs121("h2", { className: "text-lg font-semibold text-urvos-text", children: [
            "Tooth ",
            activeTooth == null ? void 0 : activeTooth.id
          ] })
        ] }),
        /* @__PURE__ */ jsx147("p", { className: "text-xs text-urvos-text-muted mt-0.5", children: "Clinical Details" })
      ] }),
      teeth.length === 1 && /* @__PURE__ */ jsx147("div", { className: "px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-semibold uppercase tracking-wider border border-green-200", children: "Adult" })
    ] }) }),
    !isBatchMode && /* @__PURE__ */ jsx147("div", { className: "flex border-b border-urvos-border px-2 flex-none", children: tabs2.map((tab) => {
      const Icon2 = tab.icon;
      const isActive = activeTab === tab.id;
      return /* @__PURE__ */ jsxs121(
        "button",
        {
          onClick: () => setActiveTab(tab.id),
          className: clsx114(
            "flex-1 flex flex-col items-center gap-1 p-3 text-xs font-medium border-b-2 transition-colors",
            isActive ? "border-blue-600 text-blue-600" : "border-transparent text-urvos-text-muted hover:text-urvos-text hover:bg-gray-50"
          ),
          children: [
            /* @__PURE__ */ jsx147(Icon2, { className: "w-4 h-4" }),
            tab.label
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsxs121("div", { className: "flex-1 overflow-auto bg-urvos-surface-sunken p-4", children: [
      isBatchMode && /* @__PURE__ */ jsxs121("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs121("div", { className: "bg-white p-4 rounded-xl border border-urvos-border shadow-sm", children: [
          /* @__PURE__ */ jsx147("h3", { className: "text-sm font-semibold text-urvos-text mb-3", children: "Batch Actions" }),
          /* @__PURE__ */ jsxs121("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx147("h4", { className: "text-xs font-medium text-urvos-text-muted mb-2", children: "1. Select Surfaces (Optional)" }),
            /* @__PURE__ */ jsx147(
              ToothSurfaceSelector,
              {
                selectedSurfaces: activeSurfaces,
                onChange: setActiveSurfaces
              }
            )
          ] }),
          /* @__PURE__ */ jsx147("h4", { className: "text-xs font-medium text-urvos-text-muted mb-2", children: "2. Apply Treatment / Finding" }),
          /* @__PURE__ */ jsx147("div", { className: "grid grid-cols-2 gap-2", children: CLINICAL_TOOLS.filter((t) => t.category !== "selection").map((tool) => {
            const Icon2 = tool.icon;
            return /* @__PURE__ */ jsxs121(
              "button",
              {
                onClick: () => {
                  onApplyTool(tool.id, activeSurfaces.length > 0 ? activeSurfaces : void 0);
                  setActiveSurfaces([]);
                },
                className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-urvos-border hover:bg-gray-50 text-xs font-medium text-urvos-text shadow-sm transition-colors text-left",
                children: [
                  /* @__PURE__ */ jsx147(Icon2, { className: clsx114("w-4 h-4 flex-none", tool.color) }),
                  /* @__PURE__ */ jsx147("span", { className: "truncate", children: tool.label })
                ]
              },
              tool.id
            );
          }) }),
          /* @__PURE__ */ jsxs121("div", { className: "grid grid-cols-2 gap-2 mt-2", children: [
            /* @__PURE__ */ jsxs121(
              "button",
              {
                onClick: () => {
                  const text = window.prompt("Enter batch note text:");
                  if (text && onAddNote) {
                    teeth.forEach((t) => onAddNote(t.id, "Batch Note", text));
                  }
                },
                className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 text-xs font-medium text-blue-700 transition-colors text-left",
                children: [
                  /* @__PURE__ */ jsx147(FileText11, { className: "w-4 h-4 flex-none" }),
                  /* @__PURE__ */ jsx147("span", { className: "truncate", children: "Add Batch Note" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs121("button", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 text-xs font-medium text-blue-700 transition-colors text-left", children: [
              /* @__PURE__ */ jsx147(ImageIcon2, { className: "w-4 h-4 flex-none" }),
              /* @__PURE__ */ jsx147("span", { className: "truncate", children: "Upload Images" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs121("div", { className: "bg-white p-4 rounded-xl border border-urvos-border shadow-sm", children: [
          /* @__PURE__ */ jsx147("h3", { className: "text-sm font-semibold text-urvos-text mb-3", children: "Selection Summary" }),
          /* @__PURE__ */ jsx147("div", { className: "space-y-2", children: (() => {
            const summaries = {};
            let healthyCount = 0;
            teeth.forEach((t) => {
              let hasFindings = false;
              if (t.findings && t.findings.length > 0) {
                t.findings.forEach((f) => {
                  var _a;
                  const label = ((_a = CLINICAL_TOOLS.find((ct) => ct.id === f.type)) == null ? void 0 : _a.label) || f.type;
                  summaries[label] = (summaries[label] || 0) + 1;
                  hasFindings = true;
                });
              }
              if (t.treatments && t.treatments.length > 0) {
                t.treatments.forEach((tr) => {
                  var _a;
                  const label = ((_a = CLINICAL_TOOLS.find((ct) => ct.id === tr.type)) == null ? void 0 : _a.label) || tr.type;
                  const key = `${tr.status === "existing" ? "Existing" : tr.status === "planned" ? "Planned" : "Completed"} ${label}`;
                  summaries[key] = (summaries[key] || 0) + 1;
                  hasFindings = true;
                });
              }
              if (!hasFindings) healthyCount++;
            });
            return /* @__PURE__ */ jsxs121("ul", { className: "space-y-2", children: [
              healthyCount > 0 && /* @__PURE__ */ jsxs121("li", { className: "flex justify-between text-xs p-2 bg-gray-50 rounded border border-gray-100", children: [
                /* @__PURE__ */ jsx147("span", { className: "text-urvos-text-muted", children: "Healthy" }),
                /* @__PURE__ */ jsx147("span", { className: "font-semibold", children: healthyCount })
              ] }),
              Object.entries(summaries).map(([label, count3]) => /* @__PURE__ */ jsxs121("li", { className: "flex justify-between text-xs p-2 bg-blue-50 rounded border border-blue-100", children: [
                /* @__PURE__ */ jsx147("span", { className: "text-blue-700", children: label }),
                /* @__PURE__ */ jsx147("span", { className: "font-semibold text-blue-900", children: count3 })
              ] }, label))
            ] });
          })() })
        ] })
      ] }),
      !isBatchMode && activeTooth && /* @__PURE__ */ jsxs121("div", { className: "space-y-6 h-full", children: [
        activeTab === "overview" && /* @__PURE__ */ jsx147(OverviewTab, { activeTooth, onRemoveRecord, onToggleSurface }),
        activeTab === "notes" && /* @__PURE__ */ jsx147(NotesTab, { activeTooth, onAddNote: onAddNote || (() => {
        }) }),
        activeTab === "history" && /* @__PURE__ */ jsx147(HistoryTab, { activeTooth }),
        activeTab === "images" && /* @__PURE__ */ jsx147(ImagesTab, {}),
        activeTab === "perio" && /* @__PURE__ */ jsxs121("div", { className: "flex flex-col items-center text-center opacity-50 py-12", children: [
          /* @__PURE__ */ jsx147(ActivityIcon, { className: "w-12 h-12 mb-3 mx-auto text-gray-400" }),
          /* @__PURE__ */ jsx147("p", { className: "text-sm text-urvos-text-muted", children: "Perio chart coming soon." })
        ] })
      ] })
    ] })
  ] });
};

// components/healthcare/TreatmentPlanWorkspace.tsx
import React93, { useMemo as useMemo9 } from "react";
import { clsx as clsx115 } from "clsx";
import { ChevronUp as ChevronUp3, ChevronDown as ChevronDown9, Check as Check13, Trash2 as Trash25, Calendar as Calendar10 } from "lucide-react";
import { jsx as jsx148, jsxs as jsxs122 } from "react/jsx-runtime";
var TreatmentPlanWorkspace = ({
  teeth,
  onSelectTooth,
  onUpdateTreatmentStatus,
  onRemoveTreatment
}) => {
  const [isExpanded, setIsExpanded] = React93.useState(false);
  const treatments = useMemo9(() => {
    const list = [];
    Object.values(teeth).forEach((tooth) => {
      tooth.treatments.forEach((t) => {
        const tool = CLINICAL_TOOLS.find((c) => c.id === t.type);
        list.push(__spreadProps(__spreadValues({
          toothId: tooth.id
        }, t), {
          label: (tool == null ? void 0 : tool.label) || t.type
        }));
      });
    });
    return list.sort((a, b) => {
      if (a.status !== b.status) {
        const order = { "planned": 0, "in_progress": 1, "completed": 2, "existing": 3 };
        return (order[a.status] || 4) - (order[b.status] || 4);
      }
      return parseInt(a.toothId) - parseInt(b.toothId);
    });
  }, [teeth]);
  const planned = treatments.filter((t) => t.status === "planned");
  const inProgress = treatments.filter((t) => t.status === "in_progress");
  const completed = treatments.filter((t) => t.status === "completed" || t.status === "existing");
  if (!isExpanded) {
    return /* @__PURE__ */ jsxs122("div", { className: "border-t border-urvos-border bg-white p-3 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] cursor-pointer hover:bg-gray-50 transition-colors rounded-b-xl", onClick: () => setIsExpanded(true), children: [
      /* @__PURE__ */ jsxs122("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx148("h3", { className: "font-semibold text-sm text-urvos-text", children: "Treatment Plan" }),
        /* @__PURE__ */ jsxs122("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs122("span", { className: "text-xs font-medium px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full", children: [
            planned.length,
            " Planned"
          ] }),
          /* @__PURE__ */ jsxs122("span", { className: "text-xs font-medium px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full", children: [
            inProgress.length,
            " In Progress"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx148(ChevronUp3, { className: "w-5 h-5 text-gray-400" })
    ] });
  }
  const renderSection = (title, list, colorClass) => {
    if (list.length === 0) return null;
    return /* @__PURE__ */ jsxs122("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs122("h4", { className: "text-sm font-semibold mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx148("span", { className: clsx115("w-2 h-2 rounded-full", colorClass) }),
        title,
        " (",
        list.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx148("div", { className: "border border-urvos-border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxs122("table", { className: "w-full text-sm text-left", children: [
        /* @__PURE__ */ jsx148("thead", { className: "bg-gray-50 text-urvos-text-muted text-xs uppercase font-semibold", children: /* @__PURE__ */ jsxs122("tr", { children: [
          /* @__PURE__ */ jsx148("th", { className: "px-4 py-2", children: "Tooth" }),
          /* @__PURE__ */ jsx148("th", { className: "px-4 py-2", children: "Procedure" }),
          /* @__PURE__ */ jsx148("th", { className: "px-4 py-2", children: "Surfaces" }),
          /* @__PURE__ */ jsx148("th", { className: "px-4 py-2", children: "Date" }),
          /* @__PURE__ */ jsx148("th", { className: "px-4 py-2 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx148("tbody", { className: "divide-y divide-gray-100", children: list.map((t) => {
          var _a;
          return /* @__PURE__ */ jsxs122("tr", { className: "bg-white hover:bg-blue-50/50 cursor-pointer transition-colors", onClick: () => onSelectTooth == null ? void 0 : onSelectTooth(t.toothId), children: [
            /* @__PURE__ */ jsxs122("td", { className: "px-4 py-3 font-medium text-urvos-text", children: [
              "#",
              t.toothId
            ] }),
            /* @__PURE__ */ jsx148("td", { className: "px-4 py-3 text-urvos-text", children: t.label }),
            /* @__PURE__ */ jsx148("td", { className: "px-4 py-3 text-urvos-text-muted", children: ((_a = t.surfaces) == null ? void 0 : _a.join("")) || "-" }),
            /* @__PURE__ */ jsx148("td", { className: "px-4 py-3 text-urvos-text-muted text-xs", children: new Date(t.createdAt).toLocaleDateString() }),
            /* @__PURE__ */ jsx148("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxs122("div", { className: "flex items-center justify-end gap-2", children: [
              t.status === "planned" && /* @__PURE__ */ jsx148(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onUpdateTreatmentStatus == null ? void 0 : onUpdateTreatmentStatus(t.toothId, t.id, "in_progress");
                  },
                  className: "p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded",
                  title: "Start Treatment",
                  children: /* @__PURE__ */ jsx148(Calendar10, { className: "w-4 h-4" })
                }
              ),
              (t.status === "planned" || t.status === "in_progress") && /* @__PURE__ */ jsx148(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onUpdateTreatmentStatus == null ? void 0 : onUpdateTreatmentStatus(t.toothId, t.id, "completed");
                  },
                  className: "p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded",
                  title: "Complete",
                  children: /* @__PURE__ */ jsx148(Check13, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx148(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onRemoveTreatment == null ? void 0 : onRemoveTreatment(t.toothId, t.id);
                  },
                  className: "p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx148(Trash25, { className: "w-4 h-4" })
                }
              )
            ] }) })
          ] }, t.id);
        }) })
      ] }) })
    ] });
  };
  return /* @__PURE__ */ jsxs122("div", { className: "border-t border-urvos-border bg-white flex flex-col shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] h-[40vh] transition-all rounded-b-xl z-10 relative", children: [
    /* @__PURE__ */ jsxs122("div", { className: "flex-none p-3 border-b border-urvos-border flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors", onClick: () => setIsExpanded(false), children: [
      /* @__PURE__ */ jsx148("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx148("h3", { className: "font-semibold text-sm text-urvos-text", children: "Treatment Plan" }) }),
      /* @__PURE__ */ jsx148(ChevronDown9, { className: "w-5 h-5 text-gray-400" })
    ] }),
    /* @__PURE__ */ jsxs122("div", { className: "flex-1 overflow-y-auto p-4 custom-scrollbar", children: [
      renderSection("Planned", planned, "bg-orange-500"),
      renderSection("In Progress", inProgress, "bg-purple-500"),
      renderSection("Completed / Existing", completed, "bg-green-500"),
      treatments.length === 0 && /* @__PURE__ */ jsx148("div", { className: "flex flex-col items-center justify-center h-full text-urvos-text-muted", children: /* @__PURE__ */ jsx148("p", { className: "text-sm", children: "No treatments planned yet." }) })
    ] })
  ] });
};

// components/healthcare/ToothChart.tsx
import {
  MousePointer2,
  Eraser,
  AlertCircle as AlertCircle11,
  Sparkles as Sparkles2,
  ShieldCheck as ShieldCheck4,
  Syringe as Syringe3,
  Crosshair,
  XSquare,
  Scissors,
  AlertTriangle as AlertTriangle12,
  Skull
} from "lucide-react";

// components/healthcare/hooks/useToothSelection.ts
import { useState as useState47 } from "react";

// components/healthcare/ClinicalEventBus.ts
var EventBus = class {
  constructor() {
    this.listeners = {};
  }
  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    return () => this.unsubscribe(eventType, callback);
  }
  unsubscribe(eventType, callback) {
    if (!this.listeners[eventType]) return;
    this.listeners[eventType] = this.listeners[eventType].filter((cb) => cb !== callback);
  }
  publish(event) {
    const fullEvent = __spreadProps(__spreadValues({}, event), {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (this.listeners[fullEvent.type]) {
      this.listeners[fullEvent.type].forEach((cb) => cb(fullEvent));
    }
    if (this.listeners["*"]) {
      this.listeners["*"].forEach((cb) => cb(fullEvent));
    }
  }
};
var ClinicalEventBus = new EventBus();

// components/healthcare/hooks/useToothSelection.ts
var generateId = () => Math.random().toString(36).substr(2, 9);
function useToothSelection({
  value,
  onChange,
  readOnly = false
}) {
  const [internalActiveTool, setInternalActiveTool] = useState47("select");
  const [internalActiveStatus, setInternalActiveStatus] = useState47("existing");
  const [activeSurfaces, setActiveSurfaces] = useState47([]);
  const [clearKey, setClearKey] = useState47(0);
  const getToolCategory = (toolId) => {
    var _a;
    return ((_a = CLINICAL_TOOLS.find((t) => t.id === toolId)) == null ? void 0 : _a.category) || "finding";
  };
  const addSurfaceToClinicalRecord = (tooth, identity, surfacesToToggle) => {
    const targetArray = identity.category === "finding" ? tooth.findings : tooth.treatments;
    const existingIndex = targetArray.findIndex((r) => {
      if (r.type !== identity.type) return false;
      if (r.status !== identity.status) return false;
      const tr = r;
      if (identity.provider && tr.provider !== identity.provider) return false;
      if (identity.visitId && tr.visitId !== identity.visitId) return false;
      return true;
    });
    let action = "";
    let added = [];
    let removed = [];
    const now = (/* @__PURE__ */ new Date()).toISOString();
    if (existingIndex > -1) {
      const record = targetArray[existingIndex];
      const isSurfaceClick = surfacesToToggle && surfacesToToggle.length > 0;
      if (isSurfaceClick) {
        let newRecordSurfaces = [...record.surfaces || []];
        surfacesToToggle.forEach((s) => {
          if (newRecordSurfaces.includes(s)) {
            newRecordSurfaces = newRecordSurfaces.filter((rs) => rs !== s);
            removed.push(s);
          } else {
            newRecordSurfaces.push(s);
            added.push(s);
          }
        });
        if (newRecordSurfaces.length === 0) {
          targetArray.splice(existingIndex, 1);
          action = `Removed ${identity.type} (all surfaces cleared)`;
          ClinicalEventBus.publish({
            type: identity.category === "finding" ? "FINDING_REMOVED" : "TREATMENT_REMOVED",
            toothId: tooth.id,
            recordId: record.id,
            payload: { type: identity.type }
          });
        } else {
          record.surfaces = newRecordSurfaces;
          action = `Updated ${identity.type}. Added: ${added.length ? added.join(",") : "none"}. Removed: ${removed.length ? removed.join(",") : "none"}`;
          ClinicalEventBus.publish({
            type: "SURFACE_MODIFIED",
            toothId: tooth.id,
            recordId: record.id,
            payload: { surfaces: newRecordSurfaces }
          });
        }
      } else {
        targetArray.splice(existingIndex, 1);
        action = `Removed ${identity.type}`;
        ClinicalEventBus.publish({
          type: identity.category === "finding" ? "FINDING_REMOVED" : "TREATMENT_REMOVED",
          toothId: tooth.id,
          recordId: record.id,
          payload: { type: identity.type }
        });
      }
    } else {
      const newSurfaces = surfacesToToggle && surfacesToToggle.length > 0 ? [...surfacesToToggle] : void 0;
      const newId = generateId();
      if (identity.category === "finding") {
        tooth.findings.push({
          id: newId,
          type: identity.type,
          surfaces: newSurfaces != null ? newSurfaces : [],
          status: "watch",
          createdAt: now,
          createdBy: "System",
          provider: identity.provider,
          visitId: identity.visitId
        });
        ClinicalEventBus.publish({
          type: "FINDING_CREATED",
          toothId: tooth.id,
          recordId: newId,
          payload: { type: identity.type, surfaces: newSurfaces }
        });
      } else if (identity.category === "treatment" || identity.category === "restoration") {
        tooth.treatments.push({
          id: newId,
          type: identity.type,
          surfaces: newSurfaces != null ? newSurfaces : [],
          status: identity.status,
          createdAt: now,
          createdBy: "System",
          provider: identity.provider,
          visitId: identity.visitId,
          procedureCode: identity.procedureCode,
          material: identity.material
        });
        ClinicalEventBus.publish({
          type: "TREATMENT_CREATED",
          toothId: tooth.id,
          recordId: newId,
          payload: { type: identity.type, status: identity.status, surfaces: newSurfaces }
        });
      }
      action = `Added ${identity.type}` + (newSurfaces ? ` on ${newSurfaces.join(",")}` : "");
    }
    tooth.history.push({
      id: generateId(),
      type: identity.category === "finding" ? "finding" : "treatment",
      action,
      timestamp: now,
      user: "System"
    });
  };
  const handleClearSelection = () => {
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    Object.keys(newState.teeth).forEach((id) => {
      newState.teeth[id] = __spreadProps(__spreadValues({}, newState.teeth[id]), { selected: false });
    });
    setClearKey((k) => k + 1);
    onChange == null ? void 0 : onChange(newState);
  };
  const applyToolToSelected = (toolId, customSurfaces) => {
    const selectedTeethList2 = Object.values(value.teeth).filter((t) => t.selected);
    if (selectedTeethList2.length > 0) {
      const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
      selectedTeethList2.forEach((tooth) => {
        const newTooth = __spreadProps(__spreadValues({}, tooth), { findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] });
        const category = getToolCategory(toolId);
        const identity = {
          type: toolId,
          category,
          status: category === "finding" ? "watch" : internalActiveStatus
        };
        addSurfaceToClinicalRecord(newTooth, identity, customSurfaces || activeSurfaces);
        newState.teeth[tooth.id] = newTooth;
      });
      onChange == null ? void 0 : onChange(newState);
      setActiveSurfaces([]);
    }
  };
  const handleToolClick = (toolId) => {
    if (toolId === "clear") {
      handleClearSelection();
      return;
    }
    if (internalActiveTool === toolId) {
      setInternalActiveTool("");
      return;
    }
    setInternalActiveTool(toolId);
    const tool = CLINICAL_TOOLS.find((t) => t.id === toolId);
    if (tool && tool.category !== "selection") {
      applyToolToSelected(toolId);
    }
  };
  const applyToolToSurface = (toothId, surfaceId) => {
    if (readOnly) return;
    const tool = CLINICAL_TOOLS.find((t) => t.id === internalActiveTool);
    if (!tool || tool.category === "selection") return;
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
    const newTooth = __spreadProps(__spreadValues({}, tooth), { findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] });
    const identity = {
      type: internalActiveTool,
      category: tool.category,
      status: tool.category === "finding" ? "watch" : internalActiveStatus
    };
    addSurfaceToClinicalRecord(newTooth, identity, [surfaceId]);
    newState.teeth[toothId] = newTooth;
    onChange == null ? void 0 : onChange(newState);
  };
  const handleSelectionChange = (toothId) => {
    if (readOnly) return;
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const currentTool = CLINICAL_TOOLS.find((t) => t.id === internalActiveTool);
    if (!currentTool || currentTool.category === "selection") {
      const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
      newState.teeth[toothId] = __spreadProps(__spreadValues({}, tooth), { selected: !tooth.selected });
    } else {
      const tooth = newState.teeth[toothId] || { id: toothId, selected: false, findings: [], treatments: [], history: [], notes: [], attachments: [] };
      const newTooth = __spreadProps(__spreadValues({}, tooth), { findings: [...tooth.findings], treatments: [...tooth.treatments], history: [...tooth.history] });
      const identity = {
        type: internalActiveTool,
        category: currentTool.category,
        status: currentTool.category === "finding" ? "watch" : internalActiveStatus
      };
      addSurfaceToClinicalRecord(newTooth, identity, activeSurfaces);
      newState.teeth[toothId] = newTooth;
    }
    onChange == null ? void 0 : onChange(newState);
  };
  const handleRemoveRecord = (toothId, recordId) => {
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    tooth.findings = tooth.findings.filter((r) => r.id !== recordId);
    tooth.treatments = tooth.treatments.filter((r) => r.id !== recordId);
    onChange == null ? void 0 : onChange(newState);
  };
  const handleAddNote = (toothId, type, text) => {
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    const newTooth = __spreadProps(__spreadValues({}, tooth), { notes: [...tooth.notes], history: [...tooth.history] });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newNoteId = generateId();
    newTooth.notes.push({
      id: newNoteId,
      type,
      text,
      author: "Dr. User",
      createdAt: now,
      timestamp: now
    });
    newTooth.history.push({
      id: generateId(),
      type: "note",
      action: `Added ${type}`,
      timestamp: now,
      user: "Dr. User"
    });
    ClinicalEventBus.publish({
      type: "NOTE_ADDED",
      toothId: tooth.id,
      recordId: newNoteId,
      payload: { type, text }
    });
    newState.teeth[toothId] = newTooth;
    onChange == null ? void 0 : onChange(newState);
  };
  const updateRecordStatus = (toothId, recordId, status) => {
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    const newTooth = __spreadProps(__spreadValues({}, tooth), { treatments: [...tooth.treatments], findings: [...tooth.findings], history: [...tooth.history] });
    let recordCategory = "";
    const tIndex = newTooth.treatments.findIndex((t) => t.id === recordId);
    if (tIndex > -1) {
      newTooth.treatments[tIndex] = __spreadProps(__spreadValues({}, newTooth.treatments[tIndex]), { status });
      recordCategory = "treatment";
    } else {
      const fIndex = newTooth.findings.findIndex((f) => f.id === recordId);
      if (fIndex > -1) {
        newTooth.findings[fIndex] = __spreadProps(__spreadValues({}, newTooth.findings[fIndex]), { status });
        recordCategory = "finding";
      }
    }
    if (recordCategory) {
      ClinicalEventBus.publish({
        type: recordCategory === "finding" ? "FINDING_UPDATED" : "TREATMENT_UPDATED",
        toothId: tooth.id,
        recordId,
        payload: { status }
      });
    }
    newTooth.history.push({
      id: generateId(),
      type: "treatment",
      action: `Updated status to ${status}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      user: "Dr. User"
    });
    newState.teeth[toothId] = newTooth;
    onChange == null ? void 0 : onChange(newState);
  };
  const toggleSurfaceOnRecord = (toothId, recordId, surface) => {
    if (readOnly) return;
    const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
    const tooth = newState.teeth[toothId];
    if (!tooth) return;
    const newTooth = __spreadProps(__spreadValues({}, tooth), { treatments: [...tooth.treatments], findings: [...tooth.findings] });
    let isFinding = false;
    let rIndex = newTooth.treatments.findIndex((t) => t.id === recordId);
    if (rIndex === -1) {
      rIndex = newTooth.findings.findIndex((f) => f.id === recordId);
      isFinding = true;
    }
    if (rIndex === -1) return;
    const record = isFinding ? __spreadValues({}, newTooth.findings[rIndex]) : __spreadValues({}, newTooth.treatments[rIndex]);
    let newSurfaces = [...record.surfaces || []];
    if (newSurfaces.includes(surface)) {
      newSurfaces = newSurfaces.filter((s) => s !== surface);
    } else {
      newSurfaces.push(surface);
    }
    if (newSurfaces.length === 0) {
      ClinicalEventBus.publish({
        type: isFinding ? "FINDING_REMOVED" : "TREATMENT_REMOVED",
        toothId: tooth.id,
        recordId: record.id,
        payload: { type: record.type }
      });
      handleRemoveRecord(toothId, recordId);
      return;
    }
    record.surfaces = newSurfaces;
    if (isFinding) {
      newTooth.findings[rIndex] = record;
    } else {
      newTooth.treatments[rIndex] = record;
    }
    ClinicalEventBus.publish({
      type: "SURFACE_MODIFIED",
      toothId: tooth.id,
      recordId: record.id,
      payload: { surfaces: newSurfaces }
    });
    newState.teeth[toothId] = newTooth;
    onChange == null ? void 0 : onChange(newState);
  };
  const selectedTeethList = Object.values(value.teeth).filter((t) => t.selected);
  return {
    internalActiveTool,
    setInternalActiveTool,
    internalActiveStatus,
    setInternalActiveStatus,
    activeSurfaces,
    setActiveSurfaces,
    clearKey,
    handleToolClick,
    applyToolToSelected,
    handleClearSelection,
    handleSelectionChange,
    handleRemoveRecord,
    handleAddNote,
    applyToolToSurface,
    selectedTeethList,
    updateRecordStatus,
    toggleSurfaceOnRecord
  };
}

// components/healthcare/ToothChart.tsx
import { jsx as jsx149, jsxs as jsxs123 } from "react/jsx-runtime";
var expandSurfaceGroup = (group) => {
  const map = {
    "MOD": ["M", "O", "D"],
    "MODBL": ["M", "O", "D", "B", "L"],
    "MO": ["M", "O"],
    "DO": ["D", "O"],
    "BOL": ["B", "O", "L"],
    "MID": ["M", "I", "D"],
    "MI": ["M", "I"],
    "DI": ["D", "I"]
  };
  if (map[group.toUpperCase()]) return map[group.toUpperCase()];
  const valid = ["M", "O", "D", "F", "B", "L", "I"];
  return group.toUpperCase().split("").filter((s) => valid.includes(s));
};
var CLINICAL_TOOLS = [
  // Findings (Pathology)
  { id: "caries", label: "Caries", icon: AlertCircle11, color: "text-clinical-caries", category: "finding", tooltip: "Tooth decay/cavity" },
  { id: "missing", label: "Missing", icon: XSquare, color: "text-clinical-missing", category: "finding", tooltip: "Missing tooth" },
  { id: "impacted", label: "Impacted", icon: AlertTriangle12, color: "text-clinical-impacted", category: "finding", tooltip: "Impacted tooth" },
  { id: "fracture", label: "Fracture", icon: Skull, color: "text-clinical-fracture", category: "finding", tooltip: "Broken or fractured tooth" },
  { id: "root_remnant", label: "Root Remnant", icon: Scissors, color: "text-clinical-in-progress", category: "finding", tooltip: "Retained root" },
  // Restorations (Existing work)
  { id: "amalgam", label: "Amalgam", icon: Sparkles2, color: "text-urvos-text-muted", category: "restoration", tooltip: "Silver filling" },
  { id: "composite", label: "Composite", icon: Sparkles2, color: "text-clinical-existing", category: "restoration", tooltip: "White filling" },
  { id: "crown_full", label: "Full Crown", icon: ShieldCheck4, color: "text-clinical-watch", category: "restoration", tooltip: "Full coverage crown" },
  { id: "implant", label: "Implant", icon: Syringe3, color: "text-clinical-in-progress", category: "restoration", tooltip: "Dental implant" },
  // Treatments (Planned)
  { id: "endo_treatment", label: "Root Canal", icon: Crosshair, color: "text-clinical-in-progress", category: "treatment", tooltip: "Endodontic treatment" },
  { id: "extraction_planned", label: "Plan Ext", icon: Scissors, color: "text-urvos-danger", category: "treatment", tooltip: "Planned extraction" },
  // Selection
  { id: "select", label: "Select", icon: MousePointer2, color: "text-urvos-primary", category: "selection", tooltip: "Select teeth" },
  { id: "clear", label: "Clear Selected", icon: Eraser, color: "text-urvos-text", category: "selection" }
];
var getConditionColor2 = (toolId, status) => {
  if (status === "planned") return "var(--urvos-color-clinical-planned)";
  if (status === "completed") return "var(--urvos-color-clinical-completed)";
  if (status === "existing") return "var(--urvos-color-clinical-existing)";
  if (status === "in_progress") return "var(--urvos-color-clinical-in-progress)";
  if (status === "watch") return "var(--urvos-color-clinical-watch)";
  const tool = CLINICAL_TOOLS.find((t) => t.id === toolId);
  if (toolId === "caries") return "var(--urvos-color-clinical-caries)";
  if (toolId === "missing") return "var(--urvos-color-clinical-missing)";
  if (toolId === "fracture") return "var(--urvos-color-clinical-fracture)";
  if (toolId === "impacted") return "var(--urvos-color-clinical-impacted)";
  return "var(--urvos-color-clinical-existing)";
};
var ToothChart = ({
  value,
  onChange,
  onSave,
  readOnly = false,
  className
}) => {
  const [mounted, setMounted] = useState48(false);
  const {
    internalActiveTool,
    setInternalActiveStatus,
    internalActiveStatus,
    handleToolClick,
    applyToolToSelected,
    handleSelectionChange,
    handleRemoveRecord,
    handleAddNote,
    applyToolToSurface,
    selectedTeethList,
    clearKey,
    updateRecordStatus,
    toggleSurfaceOnRecord
  } = useToothSelection({ value, onChange, readOnly });
  useEffect29(() => {
    setMounted(true);
  }, []);
  const showBatchActions = selectedTeethList.length > 1;
  const showSurfaceSelector = selectedTeethList.length === 1 && !readOnly;
  const activeConditionsList = useMemo10(() => {
    const items = [];
    Object.values(value.teeth).forEach((tooth) => {
      const allRecords = [...tooth.findings, ...tooth.treatments];
      allRecords.forEach((record) => {
        const tool = CLINICAL_TOOLS.find((t) => t.id === record.type);
        if (tool) {
          let details = [];
          if (record.status) details.push(record.status);
          if (record.surfaces && record.surfaces.length > 0) details.push(record.surfaces.join(","));
          items.push({
            toothId: tooth.id,
            toolLabel: tool.label,
            recordId: record.id,
            details: details.length > 0 ? `(${details.join(" - ")})` : ""
          });
        }
      });
    });
    return items.sort((a, b) => parseInt(a.toothId) - parseInt(b.toothId));
  }, [value.teeth]);
  const teethConditions = useMemo10(() => {
    const conditions = {};
    Object.values(value.teeth).forEach((tooth) => {
      if (tooth.selected) {
        if (!conditions["selected"]) {
          conditions["selected"] = { label: "Selected", teeth: [], outlineColor: "var(--urvos-color-action-primary)", fillColor: "var(--urvos-color-action-primary-hover)" };
        }
        conditions["selected"].teeth.push(`teeth-${tooth.id}`);
      }
      const allRecords = [...tooth.findings, ...tooth.treatments];
      allRecords.forEach((record) => {
        const tool = CLINICAL_TOOLS.find((t) => t.id === record.type);
        const conditionKey = `${record.type}-${record.status || "default"}`;
        if (!conditions[conditionKey]) {
          conditions[conditionKey] = {
            label: (tool == null ? void 0 : tool.label) || "Condition",
            teeth: [],
            outlineColor: getConditionColor2(record.type, record.status),
            fillColor: getConditionColor2(record.type, record.status) + "80"
            // Add some transparency
          };
        }
        conditions[conditionKey].teeth.push(`teeth-${tooth.id}`);
      });
    });
    return Object.values(conditions);
  }, [value.teeth]);
  const defaultSelectedTeeth = useMemo10(() => {
    return Object.values(value.teeth).filter((t) => t.selected).map((t) => `teeth-${t.id}`);
  }, [value.teeth]);
  const activeToolConfig = useMemo10(() => CLINICAL_TOOLS.find((t) => t.id === internalActiveTool), [internalActiveTool]);
  const interactionMode = !activeToolConfig || activeToolConfig.category === "selection" ? "tooth" : "surface";
  const activeHoverColor = interactionMode === "surface" && internalActiveTool ? getConditionColor2(internalActiveTool, internalActiveStatus) : "transparent";
  if (!mounted) return null;
  return /* @__PURE__ */ jsxs123("div", { className: clsx116("flex flex-col h-full bg-urvos-surface-sunken rounded-xl", className), children: [
    !readOnly && /* @__PURE__ */ jsxs123("div", { className: "flex-none p-4 border-b border-urvos-border bg-urvos-surface rounded-t-xl flex flex-col gap-3 shadow-sm", children: [
      /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx149("span", { className: "text-xs font-semibold text-urvos-text-muted uppercase tracking-wider mr-2", children: "Status:" }),
        ["existing", "planned", "completed"].map((status) => /* @__PURE__ */ jsx149(
          "button",
          {
            onClick: () => setInternalActiveStatus(status),
            className: clsx116(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              internalActiveStatus === status ? "bg-urvos-surface-alt border-urvos-border text-urvos-primary" : "bg-urvos-surface border-urvos-border text-urvos-text-muted hover:bg-urvos-surface-alt"
            ),
            children: status.charAt(0).toUpperCase() + status.slice(1)
          },
          status
        ))
      ] }),
      /* @__PURE__ */ jsxs123("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx149("div", { className: "flex flex-wrap items-center gap-2", children: CLINICAL_TOOLS.map((tool) => {
          const Icon2 = tool.icon;
          const isActive = internalActiveTool === tool.id;
          if (tool.id === "clear") {
            return /* @__PURE__ */ jsxs123(
              "button",
              {
                onClick: () => handleToolClick(tool.id),
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-urvos-border hover:bg-urvos-danger-bg text-urvos-danger transition-colors",
                children: [
                  /* @__PURE__ */ jsx149(Icon2, { className: "w-4 h-4" }),
                  tool.label
                ]
              },
              tool.id
            );
          }
          return /* @__PURE__ */ jsxs123(
            "button",
            {
              onClick: () => handleToolClick(tool.id),
              title: tool.tooltip,
              className: clsx116(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                isActive ? "bg-urvos-surface border-urvos-border shadow-sm text-urvos-text" : "bg-urvos-surface border-transparent hover:bg-urvos-surface-alt text-urvos-text-muted"
              ),
              children: [
                /* @__PURE__ */ jsx149(Icon2, { className: clsx116("w-4 h-4", tool.color) }),
                tool.label
              ]
            },
            tool.id
          );
        }) }),
        onSave && /* @__PURE__ */ jsx149(
          "button",
          {
            onClick: () => onSave(value),
            className: "px-4 py-1.5 bg-urvos-primary hover:bg-urvos-primary-hover text-urvos-text-inverse rounded-lg font-medium text-sm transition-colors shadow-sm",
            children: "Save Chart"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs123("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs123(
        "div",
        {
          className: "flex-1 flex flex-col items-center justify-center relative p-8 h-[600px] w-full",
          style: { "--active-hover-color": activeHoverColor },
          children: [
            /* @__PURE__ */ jsx149(
              CustomOdontogram,
              {
                className: "w-full h-full max-w-6xl max-h-full",
                onToothClick: handleSelectionChange,
                onSurfaceClick: (toothId, surfaceId) => applyToolToSurface(toothId, surfaceId),
                selectedTeeth: Object.keys(value.teeth).filter((id) => {
                  var _a;
                  return (_a = value.teeth[id]) == null ? void 0 : _a.selected;
                }),
                teethData: value.teeth,
                interactionMode,
                readOnly
              }
            ),
            /* @__PURE__ */ jsxs123("div", { className: "absolute bottom-6 left-8 flex items-center gap-4 bg-urvos-surface/90 backdrop-blur-sm p-3 rounded-xl border border-urvos-border shadow-sm text-xs font-medium text-urvos-text-muted", children: [
              /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx149("div", { className: "w-3 h-3 rounded-full bg-clinical-existing" }),
                "Existing"
              ] }),
              /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx149("div", { className: "w-3 h-3 rounded-full bg-clinical-planned" }),
                "Planned"
              ] }),
              /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx149("div", { className: "w-3 h-3 rounded-full bg-clinical-in-progress" }),
                "In Progress"
              ] }),
              /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx149("div", { className: "w-3 h-3 rounded-full bg-clinical-completed" }),
                "Completed"
              ] }),
              /* @__PURE__ */ jsxs123("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx149("div", { className: "w-3 h-3 rounded-full bg-clinical-watch" }),
                "Watch"
              ] })
            ] })
          ]
        }
      ),
      !readOnly && /* @__PURE__ */ jsx149(
        ToothInspectorPanel,
        {
          teeth: selectedTeethList,
          onApplyTool: applyToolToSelected,
          onRemoveRecord: handleRemoveRecord,
          onToggleSurface: toggleSurfaceOnRecord,
          onAddNote: handleAddNote
        }
      )
    ] }),
    !readOnly && /* @__PURE__ */ jsx149(
      TreatmentPlanWorkspace,
      {
        teeth: value.teeth,
        onSelectTooth: (toothId) => {
          const newState = __spreadProps(__spreadValues({}, value), { teeth: __spreadValues({}, value.teeth) });
          Object.keys(newState.teeth).forEach((id) => {
            newState.teeth[id] = __spreadProps(__spreadValues({}, newState.teeth[id]), { selected: id === toothId });
          });
          onChange == null ? void 0 : onChange(newState);
        },
        onUpdateTreatmentStatus: (toothId, treatmentId, status) => {
          if (updateRecordStatus) updateRecordStatus(toothId, treatmentId, status);
        },
        onRemoveTreatment: handleRemoveRecord
      }
    )
  ] });
};

// components/organisms/TenantThemeProvider.tsx
import { createContext as createContext7, useContext as useContext6, useEffect as useEffect30, useState as useState49 } from "react";
import { jsx as jsx150 } from "react/jsx-runtime";
var URVOS_DEFAULT_THEME = {
  tenantId: "default",
  name: "Urvos",
  brandGradient: ["#4F3FE0", "#2F6FED"],
  brandSolid: "#4F3FE0",
  brandTint: "#EEEBFD"
};
var TenantThemeContext = createContext7(null);
function useTenantTheme() {
  const ctx = useContext6(TenantThemeContext);
  if (!ctx) throw new Error("useTenantTheme must be used within <TenantThemeProvider>");
  return ctx;
}
function TenantThemeProvider({
  initialTheme = URVOS_DEFAULT_THEME,
  children
}) {
  const [theme, setTheme] = useState49(initialTheme);
  useEffect30(() => {
    const root = document.documentElement.style;
    root.setProperty("--brand-1", theme.brandGradient[0]);
    root.setProperty("--brand-2", theme.brandGradient[1]);
    root.setProperty("--brand-solid", theme.brandSolid);
    root.setProperty("--brand-tint", theme.brandTint);
  }, [theme]);
  return /* @__PURE__ */ jsx150(TenantThemeContext.Provider, { value: { theme, setTheme }, children });
}

// components/organisms/ThemeSelector.tsx
import { useState as useState50, useRef as useRef24, useEffect as useEffect31 } from "react";
import { clsx as clsx117 } from "clsx";
import { Palette, Moon, Sun, Monitor, Check as Check14 } from "lucide-react";
import { jsx as jsx151, jsxs as jsxs124 } from "react/jsx-runtime";
var THEMES = [
  { id: "default", label: "Default Blue", color: "#0B5B8E" },
  { id: "nord", label: "Nord (Blue)", color: "#2F6FED" },
  { id: "dental", label: "Dental (Green)", color: "#0EA968" },
  { id: "therapy", label: "Therapy (Violet)", color: "#7C5CFC" },
  { id: "cardiology", label: "Cardiology (Crimson)", color: "#E11D48" },
  { id: "pediatrics", label: "Pediatrics (Orange)", color: "#F97316" },
  { id: "oncology", label: "Oncology (Teal)", color: "#0D9488" },
  { id: "neurology", label: "Neurology (Indigo)", color: "#4F46E5" }
];
function ThemeSelector({ className }) {
  const { colorMode, colorTheme, setColorMode, setColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState50(false);
  const dropdownRef = useRef24(null);
  useEffect31(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs124("div", { className: clsx117("relative", className), ref: dropdownRef, children: [
    /* @__PURE__ */ jsx151(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center justify-center p-2 rounded-lg bg-urvos-surface border border-urvos-border hover:bg-urvos-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-urvos-primary",
        "aria-label": "Theme settings",
        children: /* @__PURE__ */ jsx151(Palette, { className: "w-5 h-5 text-urvos-ink" })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs124("div", { className: "absolute right-0 mt-2 w-72 bg-urvos-surface border border-urvos-border rounded-xl shadow-urvos-popout z-urvos-dropdown overflow-hidden", children: [
      /* @__PURE__ */ jsxs124("div", { className: "p-4 border-b border-urvos-border bg-urvos-surface-alt/50", children: [
        /* @__PURE__ */ jsx151("h3", { className: "text-sm font-semibold text-urvos-ink mb-3", children: "Appearance" }),
        /* @__PURE__ */ jsxs124("div", { className: "flex bg-urvos-surface-alt p-1 rounded-lg border border-urvos-border", children: [
          /* @__PURE__ */ jsxs124(
            "button",
            {
              onClick: () => setColorMode("light"),
              className: clsx117(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                colorMode === "light" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
              ),
              children: [
                /* @__PURE__ */ jsx151(Sun, { className: "w-4 h-4" }),
                " Light"
              ]
            }
          ),
          /* @__PURE__ */ jsxs124(
            "button",
            {
              onClick: () => setColorMode("dark"),
              className: clsx117(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                colorMode === "dark" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
              ),
              children: [
                /* @__PURE__ */ jsx151(Moon, { className: "w-4 h-4" }),
                " Dark"
              ]
            }
          ),
          /* @__PURE__ */ jsxs124(
            "button",
            {
              onClick: () => setColorMode("system"),
              className: clsx117(
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-colors",
                colorMode === "system" ? "bg-urvos-surface shadow-urvos-soft text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-ink"
              ),
              children: [
                /* @__PURE__ */ jsx151(Monitor, { className: "w-4 h-4" }),
                " System"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs124("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx151("h3", { className: "text-sm font-semibold text-urvos-ink mb-3", children: "Brand Theme" }),
        /* @__PURE__ */ jsx151("div", { className: "grid grid-cols-4 gap-3", children: THEMES.map((theme) => /* @__PURE__ */ jsxs124(
          "button",
          {
            onClick: () => setColorTheme(theme.id),
            className: "group flex flex-col items-center gap-1.5 focus-visible:outline-none",
            "aria-label": `Select ${theme.label} theme`,
            children: [
              /* @__PURE__ */ jsx151(
                "div",
                {
                  className: clsx117(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all group-hover:scale-110",
                    colorTheme === theme.id ? "border-urvos-primary scale-110 shadow-urvos-glow" : "border-transparent shadow-urvos-soft"
                  ),
                  style: { backgroundColor: theme.color },
                  children: colorTheme === theme.id && /* @__PURE__ */ jsx151(Check14, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsx151("span", { className: "text-[10px] text-center font-medium text-urvos-text-subtle group-hover:text-urvos-ink line-clamp-1", children: theme.label.split(" ")[0] })
            ]
          },
          theme.id
        )) })
      ] })
    ] })
  ] });
}

// components/organisms/GlobalSearchBox.tsx
import { useState as useState51, useEffect as useEffect32, useRef as useRef25 } from "react";
import { clsx as clsx118 } from "clsx";
import { Search as Search8, Command, X as X15, User as User8, FileText as FileText12, Pill as Pill7, Calendar as Calendar11 } from "lucide-react";
import { jsx as jsx152, jsxs as jsxs125 } from "react/jsx-runtime";
function GlobalSearchBox({
  placeholder = "Search patients, records, or press Cmd+K",
  onSearch,
  results = [],
  className
}) {
  const [query, setQuery] = useState51("");
  const [isFocused, setIsFocused] = useState51(false);
  const inputRef = useRef25(null);
  const containerRef = useRef25(null);
  useEffect32(() => {
    const handleKeyDown = (e) => {
      var _a, _b;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        (_a = inputRef.current) == null ? void 0 : _a.focus();
      }
      if (e.key === "Escape") {
        (_b = inputRef.current) == null ? void 0 : _b.blur();
        setIsFocused(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect32(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };
  const getIcon = (type) => {
    switch (type) {
      case "patient":
        return /* @__PURE__ */ jsx152(User8, { className: "w-4 h-4 text-blue-500" });
      case "document":
        return /* @__PURE__ */ jsx152(FileText12, { className: "w-4 h-4 text-emerald-500" });
      case "medication":
        return /* @__PURE__ */ jsx152(Pill7, { className: "w-4 h-4 text-amber-500" });
      case "appointment":
        return /* @__PURE__ */ jsx152(Calendar11, { className: "w-4 h-4 text-purple-500" });
    }
  };
  return /* @__PURE__ */ jsxs125("div", { className: clsx118("relative w-full max-w-lg", className), ref: containerRef, children: [
    /* @__PURE__ */ jsxs125("div", { className: clsx118(
      "relative flex items-center px-4 py-2.5 rounded-full border transition-all duration-200 bg-urvos-surface",
      isFocused ? "border-urvos-primary shadow-urvos-glow" : "border-urvos-border shadow-urvos-soft hover:border-urvos-border-hover"
    ), children: [
      /* @__PURE__ */ jsx152(Search8, { className: clsx118("w-5 h-5 shrink-0 transition-colors", isFocused ? "text-urvos-primary" : "text-urvos-text-subtle") }),
      /* @__PURE__ */ jsx152(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: query,
          onChange: handleChange,
          onFocus: () => setIsFocused(true),
          placeholder,
          className: "flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-sm font-medium text-urvos-ink placeholder:text-urvos-text-muted px-3"
        }
      ),
      query ? /* @__PURE__ */ jsx152(
        "button",
        {
          onClick: () => {
            var _a;
            setQuery("");
            (_a = inputRef.current) == null ? void 0 : _a.focus();
          },
          className: "p-1 rounded-full text-urvos-text-subtle hover:bg-urvos-surface-alt hover:text-urvos-ink transition-colors",
          children: /* @__PURE__ */ jsx152(X15, { className: "w-4 h-4" })
        }
      ) : /* @__PURE__ */ jsxs125("div", { className: "hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-urvos-surface-alt border border-urvos-border shrink-0", children: [
        /* @__PURE__ */ jsx152(Command, { className: "w-3 h-3 text-urvos-text-subtle" }),
        /* @__PURE__ */ jsx152("span", { className: "text-[10px] font-semibold text-urvos-text-subtle", children: "K" })
      ] })
    ] }),
    isFocused && query.length > 0 && /* @__PURE__ */ jsx152("div", { className: "absolute top-full left-0 right-0 mt-2 bg-urvos-surface border border-urvos-border rounded-xl shadow-urvos-popout z-urvos-dropdown overflow-hidden", children: results.length > 0 ? /* @__PURE__ */ jsx152("div", { className: "p-2 space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar", children: results.map((result) => /* @__PURE__ */ jsxs125(
      "a",
      {
        href: result.url,
        className: "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-urvos-surface-alt transition-colors group",
        children: [
          /* @__PURE__ */ jsx152("div", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-urvos-surface border border-urvos-border group-hover:border-urvos-border-hover transition-colors shrink-0", children: getIcon(result.type) }),
          /* @__PURE__ */ jsxs125("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx152("div", { className: "text-sm font-semibold text-urvos-ink truncate", children: result.title }),
            result.subtitle && /* @__PURE__ */ jsx152("div", { className: "text-xs text-urvos-text-subtle truncate", children: result.subtitle })
          ] })
        ]
      },
      result.id
    )) }) : /* @__PURE__ */ jsxs125("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsx152(Search8, { className: "w-8 h-8 mx-auto text-urvos-text-subtle mb-3 opacity-50" }),
      /* @__PURE__ */ jsxs125("p", { className: "text-sm font-medium text-urvos-ink", children: [
        'No results found for "',
        query,
        '"'
      ] }),
      /* @__PURE__ */ jsx152("p", { className: "text-xs text-urvos-text-subtle mt-1", children: "Try checking for typos or using different keywords." })
    ] }) })
  ] });
}

// lib/Image.tsx
import NextImage from "next/image";
import { jsx as jsx153 } from "react/jsx-runtime";
var DEFAULT_SIZES = {
  avatar: "48px",
  thumbnail: "(min-width: 768px) 240px, 100vw",
  content: "(min-width: 1180px) 1180px, 100vw"
};
function Image(_a) {
  var _b = _a, { variant = "content", sizes, priority } = _b, rest = __objRest(_b, ["variant", "sizes", "priority"]);
  return /* @__PURE__ */ jsx153(
    NextImage,
    __spreadValues({
      sizes: sizes != null ? sizes : DEFAULT_SIZES[variant],
      priority,
      placeholder: rest.blurDataURL ? "blur" : "empty"
    }, rest)
  );
}

// lib/Link.tsx
import NextLink from "next/link";
import { usePathname as usePathname2 } from "next/navigation";
import { jsx as jsx154, jsxs as jsxs126 } from "react/jsx-runtime";
function Link3(_a) {
  var _b = _a, { href, matchPrefix, className = "", children } = _b, rest = __objRest(_b, ["href", "matchPrefix", "className", "children"]);
  var _a2;
  const pathname = usePathname2();
  const hrefStr = typeof href === "string" ? href : (_a2 = href.pathname) != null ? _a2 : "";
  const active = matchPrefix ? pathname == null ? void 0 : pathname.startsWith(hrefStr) : pathname === hrefStr;
  return /* @__PURE__ */ jsx154(NextLink, __spreadProps(__spreadValues({ href, className, "data-active": active || void 0 }, rest), { children }));
}
function NavLink({
  href,
  icon,
  children,
  matchPrefix = true
}) {
  return /* @__PURE__ */ jsxs126(Link3, { href, matchPrefix, className: "nav-item", children: [
    icon,
    children
  ] });
}

// components/templates/application-shells/FullEHRApplicationShell.tsx
import { useState as useState52 } from "react";
import { clsx as clsx119 } from "clsx";
import {
  Search as Search9,
  Bell as Bell5,
  ChevronLeft as ChevronLeft6,
  ChevronRight as ChevronRight9,
  LayoutDashboard,
  Users as Users3,
  FileText as FileText13,
  Calendar as Calendar12,
  Settings as Settings4,
  ShieldCheck as ShieldCheck5,
  Stethoscope as Stethoscope5
} from "lucide-react";
import { jsx as jsx155, jsxs as jsxs127 } from "react/jsx-runtime";
function FullEHRApplicationShell({
  currentPatient = {
    name: "Rajesh Kumar",
    mrn: "MRN-2026-8819",
    age: 45,
    gender: "Male",
    abhaId: "91-8829-1029-4410"
  },
  children,
  activeNav = "clinical",
  onNavSelect,
  className
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState52(false);
  const [showNotifications, setShowNotifications] = useState52(false);
  const [searchQuery, setSearchQuery] = useState52("");
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clinical", label: "Clinical EHR", icon: Stethoscope5, badge: "Active" },
    { id: "patients", label: "Patient Directory", icon: Users3 },
    { id: "appointments", label: "Appointments", icon: Calendar12 },
    { id: "abdm", label: "ABDM Health Stack", icon: ShieldCheck5 },
    { id: "reports", label: "Analytics & Reports", icon: FileText13 },
    { id: "settings", label: "System Settings", icon: Settings4 }
  ];
  return /* @__PURE__ */ jsxs127("div", { className: clsx119("min-h-screen bg-urvos-background flex flex-col text-urvos-text font-sans", className), children: [
    /* @__PURE__ */ jsxs127("header", { className: "h-14 border-b border-urvos-border bg-urvos-surface px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs", children: [
      /* @__PURE__ */ jsxs127("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs127("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx155("div", { className: "w-8 h-8 rounded-lg bg-urvos-primary flex items-center justify-center text-white font-bold text-base shadow-xs", children: "U" }),
          /* @__PURE__ */ jsxs127("span", { className: "font-bold text-base tracking-tight text-urvos-text hidden sm:inline", children: [
            "Urvos ",
            /* @__PURE__ */ jsx155("span", { className: "text-urvos-primary font-normal text-xs uppercase tracking-wider", children: "Healthcare OS" })
          ] })
        ] }),
        currentPatient && /* @__PURE__ */ jsxs127("div", { className: "hidden lg:flex items-center space-x-3 px-3 py-1 bg-urvos-background border border-urvos-border rounded-lg text-xs", children: [
          /* @__PURE__ */ jsx155(Avatar, { name: currentPatient.name, size: "sm", status: "online" }),
          /* @__PURE__ */ jsxs127("div", { children: [
            /* @__PURE__ */ jsxs127("div", { className: "font-bold text-urvos-text flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx155("span", { children: currentPatient.name }),
              /* @__PURE__ */ jsxs127("span", { className: "text-urvos-text-subtle font-normal", children: [
                "(",
                currentPatient.age,
                "y/",
                currentPatient.gender,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs127("div", { className: "text-[10px] text-urvos-text-subtle font-mono", children: [
              currentPatient.mrn,
              " \u2022 ABHA: ",
              currentPatient.abhaId
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs127("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs127("div", { className: "relative hidden md:block w-72", children: [
          /* @__PURE__ */ jsx155(Search9, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle" }),
          /* @__PURE__ */ jsx155(
            "input",
            {
              type: "text",
              placeholder: "Search patients, ICD-10, orders... (Cmd+K)",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full pl-9 pr-8 py-1.5 text-xs bg-urvos-background border border-urvos-border rounded-lg focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
            }
          ),
          /* @__PURE__ */ jsx155("kbd", { className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-urvos-surface border border-urvos-border px-1 rounded text-urvos-text-subtle", children: "\u2318K" })
        ] }),
        /* @__PURE__ */ jsxs127(
          "button",
          {
            onClick: () => setShowNotifications(!showNotifications),
            className: "p-2 hover:bg-urvos-background rounded-lg text-urvos-text-subtle hover:text-urvos-text relative",
            "aria-label": "Notifications",
            children: [
              /* @__PURE__ */ jsx155(Bell5, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsx155("span", { className: "w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5" })
            ]
          }
        ),
        /* @__PURE__ */ jsx155(Avatar, { name: "Dr. A. Sharma", size: "sm" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs127("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs127(
        "aside",
        {
          className: clsx119(
            "border-r border-urvos-border bg-urvos-surface transition-all duration-200 flex flex-col justify-between shrink-0",
            sidebarCollapsed ? "w-16" : "w-60"
          ),
          children: [
            /* @__PURE__ */ jsx155("div", { className: "p-3 space-y-1", children: navItems.map((item) => {
              const Icon2 = item.icon;
              const isActive = activeNav === item.id;
              return /* @__PURE__ */ jsxs127(
                "button",
                {
                  onClick: () => onNavSelect == null ? void 0 : onNavSelect(item.id),
                  className: clsx119(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                    isActive ? "bg-urvos-primary text-white shadow-xs" : "text-urvos-text-subtle hover:bg-urvos-background hover:text-urvos-text"
                  ),
                  children: [
                    /* @__PURE__ */ jsx155(Icon2, { className: "w-4 h-4 shrink-0" }),
                    !sidebarCollapsed && /* @__PURE__ */ jsx155("span", { className: "truncate flex-1 text-left", children: item.label }),
                    !sidebarCollapsed && item.badge && /* @__PURE__ */ jsx155("span", { className: "px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-white/20 text-white", children: item.badge })
                  ]
                },
                item.id
              );
            }) }),
            /* @__PURE__ */ jsx155("div", { className: "p-3 border-t border-urvos-border space-y-2", children: /* @__PURE__ */ jsx155(
              "button",
              {
                onClick: () => setSidebarCollapsed(!sidebarCollapsed),
                className: "w-full flex items-center justify-center p-2 hover:bg-urvos-background rounded-lg text-urvos-text-subtle",
                children: sidebarCollapsed ? /* @__PURE__ */ jsx155(ChevronRight9, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx155(ChevronLeft6, { className: "w-4 h-4" })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx155("main", { className: "flex-1 overflow-y-auto p-6 bg-urvos-background/50", children })
    ] })
  ] });
}

// components/templates/application-shells/MinimalApplicationShell.tsx
import { clsx as clsx120 } from "clsx";
import { ArrowLeft, ShieldCheck as ShieldCheck6, X as X16 } from "lucide-react";
import { jsx as jsx156, jsxs as jsxs128 } from "react/jsx-runtime";
function MinimalApplicationShell({
  title,
  subtitle,
  onBack,
  onClose,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs128("div", { className: clsx120("min-h-screen bg-urvos-background flex flex-col font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs128("header", { className: "h-14 border-b border-urvos-border bg-urvos-surface px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs", children: [
      /* @__PURE__ */ jsxs128("div", { className: "flex items-center space-x-3", children: [
        onBack && /* @__PURE__ */ jsx156("button", { onClick: onBack, className: "p-1.5 hover:bg-urvos-background rounded-lg text-urvos-text-subtle", children: /* @__PURE__ */ jsx156(ArrowLeft, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxs128("div", { children: [
          /* @__PURE__ */ jsx156("h2", { className: "text-sm font-bold text-urvos-text", children: title }),
          subtitle && /* @__PURE__ */ jsx156("p", { className: "text-[11px] text-urvos-text-subtle", children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxs128("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxs128("span", { className: "text-[11px] text-urvos-text-subtle font-mono flex items-center", children: [
          /* @__PURE__ */ jsx156(ShieldCheck6, { className: "w-3.5 h-3.5 text-urvos-primary mr-1" }),
          " ABDM Compliant"
        ] }),
        onClose && /* @__PURE__ */ jsx156("button", { onClick: onClose, className: "p-1.5 hover:bg-urvos-background rounded-lg text-urvos-text-subtle", children: /* @__PURE__ */ jsx156(X16, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx156("main", { className: "flex-1 max-w-4xl w-full mx-auto p-6", children })
  ] });
}

// components/templates/application-shells/MobileProviderShell.tsx
import { clsx as clsx121 } from "clsx";
import { Stethoscope as Stethoscope6, Users as Users4, Bell as Bell6, UserCheck as UserCheck6, Search as Search10 } from "lucide-react";
import { jsx as jsx157, jsxs as jsxs129 } from "react/jsx-runtime";
function MobileProviderShell({
  providerName = "Dr. Anita Desai",
  facilityName = "Max Super Specialty Hospital",
  children,
  activeTab = "rounds",
  onTabChange,
  className
}) {
  return /* @__PURE__ */ jsxs129("div", { className: clsx121("min-h-screen bg-urvos-background flex flex-col font-sans text-urvos-text max-w-md mx-auto border-x border-urvos-border shadow-lg", className), children: [
    /* @__PURE__ */ jsxs129("header", { className: "h-14 bg-urvos-surface border-b border-urvos-border px-4 flex items-center justify-between sticky top-0 z-20", children: [
      /* @__PURE__ */ jsxs129("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx157(Avatar, { name: providerName, size: "sm", status: "online" }),
        /* @__PURE__ */ jsxs129("div", { children: [
          /* @__PURE__ */ jsx157("div", { className: "font-bold text-xs text-urvos-text", children: providerName }),
          /* @__PURE__ */ jsx157("div", { className: "text-[10px] text-urvos-text-subtle truncate max-w-[150px]", children: facilityName })
        ] })
      ] }),
      /* @__PURE__ */ jsx157("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx157("button", { className: "p-2 hover:bg-urvos-background rounded-full text-urvos-text-subtle", children: /* @__PURE__ */ jsx157(Bell6, { className: "w-4 h-4" }) }) })
    ] }),
    /* @__PURE__ */ jsx157("main", { className: "flex-1 p-4 overflow-y-auto", children }),
    /* @__PURE__ */ jsx157("nav", { className: "h-14 bg-urvos-surface border-t border-urvos-border grid grid-cols-4 sticky bottom-0 z-20", children: [
      { id: "rounds", label: "Rounds", icon: Stethoscope6 },
      { id: "patients", label: "Patients", icon: Users4 },
      { id: "search", label: "Search", icon: Search10 },
      { id: "profile", label: "Profile", icon: UserCheck6 }
    ].map((t) => {
      const Icon2 = t.icon;
      const isActive = activeTab === t.id;
      return /* @__PURE__ */ jsxs129(
        "button",
        {
          onClick: () => onTabChange == null ? void 0 : onTabChange(t.id),
          className: clsx121(
            "flex flex-col items-center justify-center space-y-0.5 text-[10px] font-semibold transition-colors",
            isActive ? "text-urvos-primary" : "text-urvos-text-subtle hover:text-urvos-text"
          ),
          children: [
            /* @__PURE__ */ jsx157(Icon2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx157("span", { children: t.label })
          ]
        },
        t.id
      );
    }) })
  ] });
}

// components/templates/application-shells/KioskCheckinShell.tsx
import { clsx as clsx122 } from "clsx";
import { ShieldCheck as ShieldCheck7, HeartPulse } from "lucide-react";
import { jsx as jsx158, jsxs as jsxs130 } from "react/jsx-runtime";
function KioskCheckinShell({
  facilityName = "Fortis Hospital & Research Center",
  children,
  className
}) {
  return /* @__PURE__ */ jsxs130("div", { className: clsx122("min-h-screen bg-urvos-surface text-urvos-text flex flex-col justify-between font-sans p-8", className), children: [
    /* @__PURE__ */ jsxs130("header", { className: "flex items-center justify-between border-b border-urvos-border pb-6", children: [
      /* @__PURE__ */ jsxs130("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx158("div", { className: "w-12 h-12 rounded-xl bg-urvos-primary text-white flex items-center justify-center font-extrabold text-xl shadow-md", children: /* @__PURE__ */ jsx158(HeartPulse, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxs130("div", { children: [
          /* @__PURE__ */ jsx158("h1", { className: "text-xl font-extrabold text-urvos-text tracking-tight", children: facilityName }),
          /* @__PURE__ */ jsx158("p", { className: "text-xs text-urvos-text-subtle", children: "Patient Self-Service Check-in Kiosk \u2022 ABHA & Insurance Enabled" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs130("div", { className: "flex items-center space-x-2 text-xs font-mono text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsx158(ShieldCheck7, { className: "w-5 h-5 text-emerald-500" }),
        /* @__PURE__ */ jsx158("span", { children: "ABDM Verified Terminal" })
      ] })
    ] }),
    /* @__PURE__ */ jsx158("main", { className: "flex-1 flex items-center justify-center my-8", children }),
    /* @__PURE__ */ jsx158("footer", { className: "border-t border-urvos-border pt-4 text-center text-xs text-urvos-text-subtle", children: "Touch anywhere on screen or scan your ABHA Health ID QR code to begin check-in." })
  ] });
}

// components/templates/dashboards/ClinicalOverviewDashboard.tsx
import { clsx as clsx123 } from "clsx";
import { Calendar as Calendar13 } from "lucide-react";
import { jsx as jsx159, jsxs as jsxs131 } from "react/jsx-runtime";
function ClinicalOverviewDashboard({
  providerName = "Dr. Anita Sharma",
  appointments = [
    { id: "1", time: "09:00 AM", patientName: "Rajesh Kumar", age: 45, gender: "M", type: "Follow-up", status: "In-Progress" },
    { id: "2", time: "09:30 AM", patientName: "Priya Mehta", age: 32, gender: "F", type: "New Consult", status: "Waiting" },
    { id: "3", time: "10:00 AM", patientName: "Amit Shah", age: 58, gender: "M", type: "Lab Review", status: "Waiting" }
  ],
  className
}) {
  return /* @__PURE__ */ jsxs131("div", { className: clsx123("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs131("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs131("div", { children: [
        /* @__PURE__ */ jsx159("h1", { className: "text-xl font-bold text-urvos-text", children: "Clinical OPD Command Center" }),
        /* @__PURE__ */ jsxs131("p", { className: "text-xs text-urvos-text-subtle", children: [
          "Good morning, ",
          /* @__PURE__ */ jsx159("strong", { className: "text-urvos-text", children: providerName }),
          " \u2022 ",
          appointments.length,
          " appointments scheduled today"
        ] })
      ] }),
      /* @__PURE__ */ jsx159("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx159(Button, { size: "sm", children: "+ New Patient Encounter" }) })
    ] }),
    /* @__PURE__ */ jsxs131("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs131("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsx159(
          PreChartPanel,
          {
            data: {
              patientName: "Rajesh Kumar",
              age: 45,
              gender: "Male",
              chiefComplaint: "Chest tightness & exertional dyspnea x 3 days",
              lastVitals: { bp: "138/88", hr: 82, temp: "98.6\xB0F", spo2: 98 },
              activeDiagnoses: ["Essential Hypertension", "Type 2 Diabetes Mellitus"],
              pendingOrders: ["ECG 12-Lead", "Troponin I Lab"],
              riskScore: "MODERATE"
            }
          }
        ),
        /* @__PURE__ */ jsx159(
          UnsignedChartsCard,
          {
            charts: [
              { id: "CH-1", patientName: "Sanjay Patel", encounterDate: "2026-07-23", encounterType: "OPD Consultation", providerName, daysPending: 1 },
              { id: "CH-2", patientName: "Kavita Rao", encounterDate: "2026-07-22", encounterType: "Follow-up", providerName, daysPending: 2, isLockWarning: true }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs131("div", { className: "bg-urvos-surface border border-urvos-border rounded-xl p-5 space-y-4 shadow-xs", children: [
        /* @__PURE__ */ jsxs131("div", { className: "flex items-center justify-between border-b border-urvos-border pb-3", children: [
          /* @__PURE__ */ jsxs131("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx159(Calendar13, { className: "w-5 h-5 text-urvos-primary" }),
            /* @__PURE__ */ jsx159("h3", { className: "font-semibold text-base text-urvos-text", children: "Today's Roster" })
          ] }),
          /* @__PURE__ */ jsxs131(Badge, { variant: "neutral", children: [
            appointments.length,
            " Patients"
          ] })
        ] }),
        /* @__PURE__ */ jsx159("div", { className: "space-y-3", children: appointments.map((apt) => /* @__PURE__ */ jsxs131("div", { className: "p-3 border border-urvos-border rounded-lg bg-urvos-background flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxs131("div", { children: [
            /* @__PURE__ */ jsx159("div", { className: "font-bold text-urvos-text", children: apt.patientName }),
            /* @__PURE__ */ jsxs131("div", { className: "text-[11px] text-urvos-text-subtle", children: [
              apt.time,
              " \u2022 ",
              apt.type,
              " (",
              apt.age,
              "y/",
              apt.gender,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx159(Badge, { variant: apt.status === "In-Progress" ? "success" : apt.status === "Waiting" ? "caution" : "neutral", children: apt.status })
        ] }, apt.id)) })
      ] })
    ] })
  ] });
}

// components/templates/dashboards/PopulationHealthDashboard.tsx
import { clsx as clsx124 } from "clsx";
import { jsx as jsx160, jsxs as jsxs132 } from "react/jsx-runtime";
function PopulationHealthDashboard({ className }) {
  return /* @__PURE__ */ jsxs132("div", { className: clsx124("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs132("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs132("div", { children: [
        /* @__PURE__ */ jsx160("h1", { className: "text-xl font-bold text-urvos-text", children: "Population Health & Chronic Care Analytics" }),
        /* @__PURE__ */ jsx160("p", { className: "text-xs text-urvos-text-subtle", children: "Cohort management, NCQA quality measure compliance, and clinical risk stratification" })
      ] }),
      /* @__PURE__ */ jsx160(Badge, { variant: "info", children: "Active Cohort: Diabetes & HTN (1,420 Patients)" })
    ] }),
    /* @__PURE__ */ jsxs132("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx160(ChartGauge, { value: 78, title: "HbA1c Target Compliance (<7.0%)", label: "78% Cohort Target Met" }),
      /* @__PURE__ */ jsx160(
        ChartRadar,
        {
          title: "Quality Measures Dimensions (NCQA / HEDIS)",
          seriesALabel: "Facility Quality Score",
          seriesBLabel: "National Benchmark",
          data: [
            { subject: "Diabetes Screening", A: 92, B: 85, fullMark: 100 },
            { subject: "BP Control (<130/80)", A: 78, B: 80, fullMark: 100 },
            { subject: "Statin Adherence", A: 88, B: 75, fullMark: 100 },
            { subject: "Eye Exam Compliance", A: 65, B: 70, fullMark: 100 },
            { subject: "Kidney Disease Mon.", A: 84, B: 78, fullMark: 100 }
          ]
        }
      )
    ] })
  ] });
}

// components/templates/dashboards/FinancialRCMDashboard.tsx
import { clsx as clsx125 } from "clsx";
import { jsx as jsx161, jsxs as jsxs133 } from "react/jsx-runtime";
function FinancialRCMDashboard({ className }) {
  return /* @__PURE__ */ jsxs133("div", { className: clsx125("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs133("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs133("div", { children: [
        /* @__PURE__ */ jsx161("h1", { className: "text-xl font-bold text-urvos-text", children: "Revenue Cycle Management (RCM & 835 ERA)" }),
        /* @__PURE__ */ jsx161("p", { className: "text-xs text-urvos-text-subtle", children: "Claim denial analysis, insurance pre-authorization queue, and cash flow performance" })
      ] }),
      /* @__PURE__ */ jsxs133("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx161(Badge, { variant: "critical", children: "\u20B94,85,000 Active Denials" }),
        /* @__PURE__ */ jsx161(Badge, { variant: "success", children: "\u20B912,40,000 Settled (30d)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs133("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx161(
        DenialAnalyticsCard,
        {
          denials: [
            { id: "DEN-1", claimId: "CLM-9918", patientName: "Rahul Verma", denialCode: "CARC 96", denialReason: "Non-covered procedure code without pre-authorization", amount: "\u20B945,000", suggestedAction: "Attach clinical pre-auth approval letter", deadlineDate: "2026-08-10" },
            { id: "DEN-2", claimId: "CLM-9924", patientName: "Meena Swaminathan", denialCode: "RARC N382", denialReason: "Missing rendering provider NPI / license details", amount: "\u20B918,500", suggestedAction: "Update provider license info in claim header", deadlineDate: "2026-08-04" }
          ]
        }
      ),
      /* @__PURE__ */ jsx161(
        EligibilityChecker,
        {
          initialData: {
            policyNumber: "POL-CGHS-882190",
            payerName: "Star Health Insurance",
            subscriberName: "Siddharth Das",
            status: "ACTIVE",
            copayAmount: "\u20B9500",
            deductibleRemaining: "\u20B92,500",
            annualMaxLimit: "\u20B95,000,000",
            coverageEndDate: "2027-12-31",
            requiresPreAuth: true
          }
        }
      )
    ] })
  ] });
}

// components/templates/dashboards/OperationalMetricsDashboard.tsx
import { clsx as clsx126 } from "clsx";
import { jsx as jsx162, jsxs as jsxs134 } from "react/jsx-runtime";
function OperationalMetricsDashboard({ className }) {
  return /* @__PURE__ */ jsxs134("div", { className: clsx126("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsx162("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: /* @__PURE__ */ jsxs134("div", { children: [
      /* @__PURE__ */ jsx162("h1", { className: "text-xl font-bold text-urvos-text", children: "Hospital Operations & Facility Metrics" }),
      /* @__PURE__ */ jsx162("p", { className: "text-xs text-urvos-text-subtle", children: "Bed occupancy rate, OPD waiting times density, and provider capacity utilization" })
    ] }) }),
    /* @__PURE__ */ jsxs134("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx162(ChartGauge, { value: 84, title: "Inpatient Bed Occupancy Rate", label: "84% Capacity (42/50 Beds)" }),
      /* @__PURE__ */ jsx162(
        ChartHeatmap,
        {
          title: "Hourly OPD Patient Check-in Density",
          data: [
            { day: "Mon", hour: "09:00", intensity: 4 },
            { day: "Mon", hour: "11:00", intensity: 4 },
            { day: "Mon", hour: "14:00", intensity: 2 },
            { day: "Tue", hour: "09:00", intensity: 3 },
            { day: "Tue", hour: "11:00", intensity: 4 },
            { day: "Tue", hour: "14:00", intensity: 1 }
          ]
        }
      )
    ] })
  ] });
}

// components/templates/dashboards/RealTimeMonitoringDashboard.tsx
import { useState as useState53, useEffect as useEffect33 } from "react";
import { clsx as clsx127 } from "clsx";
import { Activity as Activity11, Heart as Heart3, Radio as Radio2 } from "lucide-react";
import { jsx as jsx163, jsxs as jsxs135 } from "react/jsx-runtime";
function RealTimeMonitoringDashboard({ className }) {
  const [pulse, setPulse] = useState53(72);
  useEffect33(() => {
    const interval = setInterval(() => {
      setPulse(70 + Math.floor(Math.random() * 8));
    }, 2e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs135("div", { className: clsx127("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs135("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs135("div", { children: [
        /* @__PURE__ */ jsxs135("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx163(Radio2, { className: "w-5 h-5 text-rose-500 animate-pulse" }),
          /* @__PURE__ */ jsx163("h1", { className: "text-xl font-bold text-urvos-text", children: "ICU Live Telemetry Monitoring Stream" })
        ] }),
        /* @__PURE__ */ jsx163("p", { className: "text-xs text-urvos-text-subtle", children: "Real-time WebSocket physiological vital signs feed \u2022 Bedside Monitors 1-4" })
      ] }),
      /* @__PURE__ */ jsx163(Badge, { variant: "success", icon: /* @__PURE__ */ jsx163(Activity11, { className: "w-3 h-3 text-emerald-500 animate-spin" }), children: "Live Telemetry Connected" })
    ] }),
    /* @__PURE__ */ jsxs135("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs135("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs135("div", { className: "flex items-center justify-between text-xs text-urvos-text-subtle", children: [
          /* @__PURE__ */ jsx163("span", { children: "ICU Bed 1 \u2022 Patient A" }),
          /* @__PURE__ */ jsx163(Badge, { variant: "success", children: "Normal" })
        ] }),
        /* @__PURE__ */ jsxs135("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx163(Heart3, { className: "w-5 h-5 text-rose-500" }),
          /* @__PURE__ */ jsxs135("span", { className: "text-2xl font-black text-urvos-text", children: [
            pulse,
            " ",
            /* @__PURE__ */ jsx163("span", { className: "text-xs font-normal", children: "bpm" })
          ] })
        ] }),
        /* @__PURE__ */ jsx163("div", { className: "text-[10px] text-urvos-text-subtle font-mono", children: "SpO2: 99% \u2022 BP: 122/78" })
      ] }),
      /* @__PURE__ */ jsxs135("div", { className: "p-4 bg-urvos-surface border border-rose-500/30 bg-rose-500/5 rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs135("div", { className: "flex items-center justify-between text-xs text-urvos-text-subtle", children: [
          /* @__PURE__ */ jsx163("span", { children: "ICU Bed 2 \u2022 Patient B" }),
          /* @__PURE__ */ jsx163(Badge, { variant: "critical", children: "Tachycardia" })
        ] }),
        /* @__PURE__ */ jsxs135("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx163(Heart3, { className: "w-5 h-5 text-rose-600 animate-ping" }),
          /* @__PURE__ */ jsxs135("span", { className: "text-2xl font-black text-rose-600", children: [
            "128 ",
            /* @__PURE__ */ jsx163("span", { className: "text-xs font-normal", children: "bpm" })
          ] })
        ] }),
        /* @__PURE__ */ jsx163("div", { className: "text-[10px] text-rose-600 font-mono font-semibold", children: "SpO2: 92% \u2022 BP: 94/60" })
      ] })
    ] })
  ] });
}

// components/templates/dashboards/WidgetBasedCustomDashboard.tsx
import { clsx as clsx128 } from "clsx";
import { Plus as Plus7, Move } from "lucide-react";
import { jsx as jsx164, jsxs as jsxs136 } from "react/jsx-runtime";
function WidgetBasedCustomDashboard({ className }) {
  return /* @__PURE__ */ jsxs136("div", { className: clsx128("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs136("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs136("div", { children: [
        /* @__PURE__ */ jsx164("h1", { className: "text-xl font-bold text-urvos-text", children: "Customizable Provider Widget Dashboard" }),
        /* @__PURE__ */ jsx164("p", { className: "text-xs text-urvos-text-subtle", children: "Configurable clinical layout \u2022 Drag and position widgets according to specialty preferences" })
      ] }),
      /* @__PURE__ */ jsxs136(Button, { size: "sm", variant: "secondary", children: [
        /* @__PURE__ */ jsx164(Plus7, { className: "w-3.5 h-3.5 mr-1" }),
        " Add Widget"
      ] })
    ] }),
    /* @__PURE__ */ jsxs136("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs136("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs136("div", { className: "flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2", children: [
          /* @__PURE__ */ jsx164("span", { children: "Widget: Quick Order Sets" }),
          /* @__PURE__ */ jsx164(Move, { className: "w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" })
        ] }),
        /* @__PURE__ */ jsx164("p", { className: "text-xs text-urvos-text-subtle", children: "Order CBC, LFT, KFT in 1-click" })
      ] }),
      /* @__PURE__ */ jsxs136("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs136("div", { className: "flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2", children: [
          /* @__PURE__ */ jsx164("span", { children: "Widget: ABDM Consents" }),
          /* @__PURE__ */ jsx164(Move, { className: "w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" })
        ] }),
        /* @__PURE__ */ jsx164("p", { className: "text-xs text-urvos-text-subtle", children: "3 Active Consent Artifacts" })
      ] }),
      /* @__PURE__ */ jsxs136("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs136("div", { className: "flex items-center justify-between text-xs font-bold text-urvos-text border-b border-urvos-border pb-2", children: [
          /* @__PURE__ */ jsx164("span", { children: "Widget: Tele-Consult Room" }),
          /* @__PURE__ */ jsx164(Move, { className: "w-3.5 h-3.5 text-urvos-text-subtle cursor-grab" })
        ] }),
        /* @__PURE__ */ jsx164("p", { className: "text-xs text-urvos-text-subtle", children: "Next call in 15 mins" })
      ] })
    ] })
  ] });
}

// components/templates/patient-management/PatientRegistrationWizard.tsx
import { useState as useState54 } from "react";
import { clsx as clsx129 } from "clsx";
import { jsx as jsx165, jsxs as jsxs137 } from "react/jsx-runtime";
function PatientRegistrationWizard({ className }) {
  const [step, setStep] = useState54(1);
  return /* @__PURE__ */ jsxs137("div", { className: clsx129("max-w-4xl mx-auto space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs137("div", { className: "border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsx165("h1", { className: "text-xl font-bold text-urvos-text", children: "New Patient Registration & ABDM Verification" }),
      /* @__PURE__ */ jsx165("p", { className: "text-xs text-urvos-text-subtle", children: "Step-by-step registration workflow: Demographics \u2192 ABHA Link \u2192 Insurance Eligibility \u2192 Consent Signature" })
    ] }),
    /* @__PURE__ */ jsx165("div", { className: "grid grid-cols-4 gap-2 text-center text-xs", children: [
      { num: 1, title: "1. ABHA Health ID" },
      { num: 2, title: "2. Demographics" },
      { num: 3, title: "3. Insurance Pre-Check" },
      { num: 4, title: "4. Consent & Signature" }
    ].map((s) => /* @__PURE__ */ jsx165(
      "div",
      {
        onClick: () => setStep(s.num),
        className: clsx129(
          "p-2.5 rounded-lg border font-bold cursor-pointer transition-colors",
          step === s.num ? "bg-urvos-primary text-white border-urvos-primary shadow-xs" : step > s.num ? "bg-urvos-surface text-emerald-600 border-emerald-500/30" : "bg-urvos-surface text-urvos-text-subtle border-urvos-border"
        ),
        children: s.title
      },
      s.num
    )) }),
    /* @__PURE__ */ jsxs137("div", { className: "p-6 bg-urvos-surface border border-urvos-border rounded-xl space-y-4", children: [
      step === 1 && /* @__PURE__ */ jsx165(
        ABHAHealthIDCard,
        {
          abhaNumber: "91-8829-1029-4410",
          abhaAddress: "rajesh.kumar@abdm",
          name: "Rajesh Kumar",
          gender: "Male",
          dateOfBirth: "15/08/1981",
          mobile: "+91 98765 43210",
          state: "Maharashtra",
          district: "Mumbai",
          isVerified: true
        }
      ),
      step === 2 && /* @__PURE__ */ jsxs137("div", { className: "space-y-4 text-xs", children: [
        /* @__PURE__ */ jsx165("h3", { className: "font-bold text-sm text-urvos-text", children: "Personal & Emergency Contact Details" }),
        /* @__PURE__ */ jsxs137("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx165("input", { type: "text", defaultValue: "Rajesh Kumar", placeholder: "Full Name", className: "p-2 border border-urvos-border rounded bg-urvos-background" }),
          /* @__PURE__ */ jsx165("input", { type: "text", defaultValue: "+91 98765 43210", placeholder: "Mobile", className: "p-2 border border-urvos-border rounded bg-urvos-background" }),
          /* @__PURE__ */ jsx165("input", { type: "text", defaultValue: "15/08/1981", placeholder: "DOB", className: "p-2 border border-urvos-border rounded bg-urvos-background" }),
          /* @__PURE__ */ jsx165("input", { type: "text", defaultValue: "Spouse: Sunita Kumar (+91 98111 22233)", placeholder: "Emergency Contact", className: "p-2 border border-urvos-border rounded bg-urvos-background" })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsx165(
        EligibilityChecker,
        {
          initialData: {
            policyNumber: "POL-CGHS-882190",
            payerName: "Star Health Insurance",
            subscriberName: "Rajesh Kumar",
            status: "ACTIVE",
            copayAmount: "\u20B9500",
            deductibleRemaining: "\u20B92,500",
            annualMaxLimit: "\u20B95,000,000",
            coverageEndDate: "2027-12-31",
            requiresPreAuth: true
          }
        }
      ),
      step === 4 && /* @__PURE__ */ jsx165(
        SignatureCapture,
        {
          signatoryName: "Rajesh Kumar",
          signatoryRole: "Patient / Consent Grantor"
        }
      ),
      /* @__PURE__ */ jsxs137("div", { className: "flex justify-between pt-4 border-t border-urvos-border", children: [
        /* @__PURE__ */ jsx165(Button, { size: "sm", variant: "secondary", disabled: step === 1, onClick: () => setStep(step - 1), children: "Back" }),
        /* @__PURE__ */ jsx165(Button, { size: "sm", onClick: () => setStep(Math.min(4, step + 1)), children: step === 4 ? "Complete Registration" : "Next Step" })
      ] })
    ] })
  ] });
}

// components/templates/patient-management/Patient360Summary.tsx
import { clsx as clsx130 } from "clsx";
import { jsx as jsx166, jsxs as jsxs138 } from "react/jsx-runtime";
function Patient360Summary({ className }) {
  return /* @__PURE__ */ jsxs138("div", { className: clsx130("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs138("div", { className: "p-5 bg-urvos-surface border border-urvos-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs", children: [
      /* @__PURE__ */ jsxs138("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx166(Avatar, { name: "Ananya Roy", size: "lg", status: "online" }),
        /* @__PURE__ */ jsxs138("div", { children: [
          /* @__PURE__ */ jsxs138("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx166("h1", { className: "text-xl font-bold text-urvos-text", children: "Ananya Roy" }),
            /* @__PURE__ */ jsx166(Badge, { variant: "success", children: "ABHA Verified" })
          ] }),
          /* @__PURE__ */ jsxs138("div", { className: "text-xs text-urvos-text-subtle mt-0.5 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx166("span", { children: "38y / Female" }),
            /* @__PURE__ */ jsx166("span", { children: "\u2022" }),
            /* @__PURE__ */ jsx166("span", { children: "MRN: MRN-99182" }),
            /* @__PURE__ */ jsx166("span", { children: "\u2022" }),
            /* @__PURE__ */ jsx166("span", { children: "ABHA: 91-0021-9988-1234" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx166("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx166(Badge, { variant: "critical", children: "Allergy: Penicillin G" }) })
    ] }),
    /* @__PURE__ */ jsxs138("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs138("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsx166("h3", { className: "font-bold text-sm text-urvos-text", children: "Active Diagnoses" }),
        /* @__PURE__ */ jsxs138("ul", { className: "text-xs space-y-1 text-urvos-text-subtle list-disc list-inside", children: [
          /* @__PURE__ */ jsx166("li", { children: "Essential Hypertension (I10)" }),
          /* @__PURE__ */ jsx166("li", { children: "Asthma, Unspecified (J45.909)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs138("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsx166("h3", { className: "font-bold text-sm text-urvos-text", children: "Current Medications" }),
        /* @__PURE__ */ jsxs138("ul", { className: "text-xs space-y-1 text-urvos-text-subtle list-disc list-inside", children: [
          /* @__PURE__ */ jsx166("li", { children: "Tab. Telmisartan 40mg PO daily" }),
          /* @__PURE__ */ jsx166("li", { children: "Inhaler Budesonide 200mcg BID" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs138("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsx166("h3", { className: "font-bold text-sm text-urvos-text", children: "Recent Lab Results" }),
        /* @__PURE__ */ jsxs138("div", { className: "text-xs space-y-1", children: [
          /* @__PURE__ */ jsxs138("div", { className: "flex justify-between font-semibold", children: [
            /* @__PURE__ */ jsx166("span", { children: "HbA1c:" }),
            " 5.8% (Normal)"
          ] }),
          /* @__PURE__ */ jsxs138("div", { className: "flex justify-between font-semibold text-amber-600", children: [
            /* @__PURE__ */ jsx166("span", { children: "Serum K+:" }),
            " 3.3 mEq/L (Low)"
          ] })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/patient-management/PatientPortalHome.tsx
import { clsx as clsx131 } from "clsx";
import { Calendar as Calendar14, Download as Download2, CreditCard as CreditCard3, Video } from "lucide-react";
import { jsx as jsx167, jsxs as jsxs139 } from "react/jsx-runtime";
function PatientPortalHome({ className }) {
  return /* @__PURE__ */ jsxs139("div", { className: clsx131("max-w-4xl mx-auto space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs139("div", { className: "p-6 bg-urvos-primary text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md", children: [
      /* @__PURE__ */ jsxs139("div", { children: [
        /* @__PURE__ */ jsx167("h1", { className: "text-xl font-extrabold", children: "Welcome back, Ananya!" }),
        /* @__PURE__ */ jsx167("p", { className: "text-xs text-white/80 mt-1", children: "Your next appointment is today at 04:30 PM with Dr. Anita Sharma." })
      ] }),
      /* @__PURE__ */ jsxs139(Button, { size: "sm", variant: "secondary", className: "bg-white text-urvos-primary border-none font-bold", children: [
        /* @__PURE__ */ jsx167(Video, { className: "w-4 h-4 mr-1.5" }),
        " Join Tele-Consult"
      ] })
    ] }),
    /* @__PURE__ */ jsxs139("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs139("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs139("h3", { className: "font-bold text-sm text-urvos-text flex items-center", children: [
          /* @__PURE__ */ jsx167(Calendar14, { className: "w-4 h-4 mr-2 text-urvos-primary" }),
          " Appointments"
        ] }),
        /* @__PURE__ */ jsx167("p", { className: "text-xs text-urvos-text-subtle", children: "1 Upcoming \u2022 4 Past Visits" })
      ] }),
      /* @__PURE__ */ jsxs139("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs139("h3", { className: "font-bold text-sm text-urvos-text flex items-center", children: [
          /* @__PURE__ */ jsx167(Download2, { className: "w-4 h-4 mr-2 text-emerald-500" }),
          " Lab Reports"
        ] }),
        /* @__PURE__ */ jsx167("p", { className: "text-xs text-urvos-text-subtle", children: "Blood Test Report Available" })
      ] }),
      /* @__PURE__ */ jsxs139("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2", children: [
        /* @__PURE__ */ jsxs139("h3", { className: "font-bold text-sm text-urvos-text flex items-center", children: [
          /* @__PURE__ */ jsx167(CreditCard3, { className: "w-4 h-4 mr-2 text-amber-500" }),
          " Bills & Payments"
        ] }),
        /* @__PURE__ */ jsx167("p", { className: "text-xs text-urvos-text-subtle", children: "\u20B90 Balance Due" })
      ] })
    ] })
  ] });
}

// components/templates/patient-management/PatientJourneyTimeline.tsx
import { clsx as clsx132 } from "clsx";
import { jsx as jsx168, jsxs as jsxs140 } from "react/jsx-runtime";
function PatientJourneyTimeline({ className }) {
  const events = [
    { date: "2026-07-24", title: "OPD Cardiology Consult", type: "Encounter", provider: "Dr. Anita Sharma", status: "Completed" },
    { date: "2026-07-20", title: "12-Lead ECG & Blood Panel", type: "Lab", provider: "Fortis Diagnostics", status: "Verified" },
    { date: "2026-06-10", title: "Annual Physical Exam", type: "Encounter", provider: "Dr. Rajesh Gupta", status: "Archived" }
  ];
  return /* @__PURE__ */ jsxs140("div", { className: clsx132("max-w-2xl mx-auto space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs140("div", { className: "border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsx168("h1", { className: "text-xl font-bold text-urvos-text", children: "Patient Episode-of-Care Journey" }),
      /* @__PURE__ */ jsx168("p", { className: "text-xs text-urvos-text-subtle", children: "Chronological timeline of encounters, diagnostic labs, and treatments" })
    ] }),
    /* @__PURE__ */ jsx168("div", { className: "space-y-4 relative border-l-2 border-urvos-primary/30 pl-4 ml-2", children: events.map((e, idx) => /* @__PURE__ */ jsxs140("div", { className: "relative space-y-1", children: [
      /* @__PURE__ */ jsx168("div", { className: "w-3 h-3 bg-urvos-primary rounded-full absolute -left-[23px] top-1 border-2 border-urvos-surface" }),
      /* @__PURE__ */ jsx168("div", { className: "text-[11px] font-mono text-urvos-text-subtle", children: e.date }),
      /* @__PURE__ */ jsxs140("div", { className: "p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxs140("div", { children: [
          /* @__PURE__ */ jsx168("div", { className: "font-bold text-urvos-text", children: e.title }),
          /* @__PURE__ */ jsx168("div", { className: "text-urvos-text-subtle", children: e.provider })
        ] }),
        /* @__PURE__ */ jsx168(Badge, { variant: "neutral", children: e.type })
      ] })
    ] }, idx)) })
  ] });
}

// components/templates/clinical-workflows/SoapClinicalNotes.tsx
import { useState as useState55 } from "react";
import { clsx as clsx133 } from "clsx";
import { Lock as Lock4 } from "lucide-react";
import { jsx as jsx169, jsxs as jsxs141 } from "react/jsx-runtime";
function SoapClinicalNotes({ className }) {
  const [subjective, setSubjective] = useState55("Patient reports 3-day history of exertional dyspnea and tightness.");
  const [objective, setObjective] = useState55("Vitals: BP 138/88, HR 82. Lungs clear to auscultation bilaterally.");
  const [assessment, setAssessment] = useState55("Essential Hypertension, uncontrolled. Rule out Angina.");
  const [plan, setPlan] = useState55("Start Telmisartan 40mg PO. Order 12-lead ECG and Troponin I lab.");
  return /* @__PURE__ */ jsxs141("div", { className: clsx133("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs141("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs141("div", { children: [
        /* @__PURE__ */ jsx169("h1", { className: "text-xl font-bold text-urvos-text", children: "SOAP Clinical Note Editor" }),
        /* @__PURE__ */ jsx169("p", { className: "text-xs text-urvos-text-subtle", children: "Structured encounter documentation \u2022 Patient: Rajesh Kumar (MRN-8819)" })
      ] }),
      /* @__PURE__ */ jsxs141(Button, { size: "sm", children: [
        /* @__PURE__ */ jsx169(Lock4, { className: "w-3.5 h-3.5 mr-1" }),
        " Sign & Lock Note"
      ] })
    ] }),
    /* @__PURE__ */ jsxs141("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs141("div", { className: "lg:col-span-2 space-y-4 text-xs", children: [
        /* @__PURE__ */ jsxs141("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx169("label", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "S - Subjective" }),
          /* @__PURE__ */ jsx169(
            "textarea",
            {
              rows: 3,
              value: subjective,
              onChange: (e) => setSubjective(e.target.value),
              className: "w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs141("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx169("label", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "O - Objective" }),
          /* @__PURE__ */ jsx169(
            "textarea",
            {
              rows: 3,
              value: objective,
              onChange: (e) => setObjective(e.target.value),
              className: "w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs141("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx169("label", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "A - Assessment (ICD-10 Search)" }),
          /* @__PURE__ */ jsx169(
            Combobox,
            {
              placeholder: "Search ICD-10 Diagnosis...",
              value: assessment,
              onChange: (val) => setAssessment(val),
              options: [
                { value: "I10", label: "I10 - Essential Hypertension" },
                { value: "E11.9", label: "E11.9 - Type 2 Diabetes Mellitus" }
              ]
            }
          ),
          /* @__PURE__ */ jsx169(
            "textarea",
            {
              rows: 2,
              value: assessment,
              onChange: (e) => setAssessment(e.target.value),
              className: "w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface mt-2 focus:ring-2 focus:ring-urvos-primary/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs141("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx169("label", { className: "font-bold uppercase tracking-wider text-urvos-primary", children: "P - Plan & eRx" }),
          /* @__PURE__ */ jsx169(
            "textarea",
            {
              rows: 3,
              value: plan,
              onChange: (e) => setPlan(e.target.value),
              className: "w-full p-3 border border-urvos-border rounded-lg bg-urvos-surface focus:ring-2 focus:ring-urvos-primary/30"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx169("div", { children: /* @__PURE__ */ jsx169(
        SmartPhrasePanel,
        {
          phrases: [
            { shortcut: ".ros", title: "Review of Systems - Cardiac", category: "General", content: "Denied syncope, palpitations, orthopnea, or lower extremity edema." },
            { shortcut: ".normexam", title: "Normal Physical Exam", category: "Physical Exam", content: "Alert, oriented x 3. S1, S2 present, no murmurs. Lungs clear." }
          ]
        }
      ) })
    ] })
  ] });
}

// components/templates/clinical-workflows/MedicationAdministrationMar.tsx
import { useState as useState56 } from "react";
import { clsx as clsx134 } from "clsx";
import { Pill as Pill8, Clock as Clock12, CheckCircle2 as CheckCircle213, AlertTriangle as AlertTriangle14, XCircle, User as User11, ChevronLeft as ChevronLeft7, ChevronRight as ChevronRight10 } from "lucide-react";
import { jsx as jsx170, jsxs as jsxs142 } from "react/jsx-runtime";
var timeSlots = ["06:00", "08:00", "10:00", "12:00", "14:00", "18:00", "22:00"];
var marData = [
  { medication: "Aspirin 100mg", route: "PO", dose: "100mg", frequency: "OD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "given", "18:00": "due", "22:00": "na" } },
  { medication: "Ticagrelor 90mg", route: "PO", dose: "90mg", frequency: "BD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "due", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "Atorvastatin 40mg", route: "PO", dose: "40mg", frequency: "OD nocte", prescribedBy: "Dr. Sharma", administrations: { "06:00": "na", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "due" } },
  { medication: "Pantoprazole 40mg", route: "IV", dose: "40mg", frequency: "OD AC", prescribedBy: "Nurse Order", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "Metoprolol 25mg", route: "PO", dose: "25mg", frequency: "BD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "given", "08:00": "na", "10:00": "na", "12:00": "missed", "14:00": "na", "18:00": "due", "22:00": "na" } },
  { medication: "Enoxaparin 40mg", route: "SC", dose: "40mg", frequency: "OD", prescribedBy: "Dr. Sharma", administrations: { "06:00": "na", "08:00": "given", "10:00": "na", "12:00": "na", "14:00": "na", "18:00": "na", "22:00": "na" } },
  { medication: "NaCl 0.9% 100mL IV", route: "IV", dose: "100mL", frequency: "QID", prescribedBy: "Nurse Order", administrations: { "06:00": "given", "08:00": "na", "10:00": "given", "12:00": "na", "14:00": "given", "18:00": "due", "22:00": "na" } }
];
var statusIcon = {
  given: /* @__PURE__ */ jsx170(CheckCircle213, { className: "w-4 h-4 text-emerald-600" }),
  due: /* @__PURE__ */ jsx170(Clock12, { className: "w-4 h-4 text-amber-500" }),
  missed: /* @__PURE__ */ jsx170(XCircle, { className: "w-4 h-4 text-rose-500" }),
  held: /* @__PURE__ */ jsx170(AlertTriangle14, { className: "w-4 h-4 text-violet-500" }),
  na: /* @__PURE__ */ jsx170("span", { className: "text-urvos-border text-lg leading-none", children: "\u2014" })
};
var statusCell = {
  given: "bg-emerald-50 border-emerald-200",
  due: "bg-amber-50 border-amber-200",
  missed: "bg-rose-50 border-rose-200",
  held: "bg-violet-50 border-violet-200",
  na: "bg-transparent border-transparent"
};
function MedicationAdministrationMar({ className }) {
  const [date, setDate] = useState56("2026-07-24");
  return /* @__PURE__ */ jsxs142("div", { className: clsx134("space-y-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs142("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs142("div", { children: [
        /* @__PURE__ */ jsx170("h1", { className: "text-xl font-bold", children: "Medication Administration Record" }),
        /* @__PURE__ */ jsx170("p", { className: "text-xs text-urvos-text-subtle", children: "Rajesh Kumar \xB7 MRN-8819 \xB7 Room 302A \xB7 Dr. A. Sharma" })
      ] }),
      /* @__PURE__ */ jsxs142("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx170("button", { className: "p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background", children: /* @__PURE__ */ jsx170(ChevronLeft7, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx170("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "px-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" }),
        /* @__PURE__ */ jsx170("button", { className: "p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background", children: /* @__PURE__ */ jsx170(ChevronRight10, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx170("div", { className: "flex flex-wrap items-center gap-3 text-[11px]", children: Object.entries({ given: "Administered \u2713", due: "Due Now", missed: "Missed", held: "Held", na: "N/A for slot" }).map(([status, label]) => /* @__PURE__ */ jsxs142("div", { className: "flex items-center gap-1.5", children: [
      statusIcon[status],
      /* @__PURE__ */ jsx170("span", { className: "text-urvos-text-subtle", children: label })
    ] }, status)) }),
    /* @__PURE__ */ jsx170("div", { className: "overflow-x-auto rounded-xl border border-urvos-border", children: /* @__PURE__ */ jsxs142("table", { className: "w-full text-xs min-w-[700px]", children: [
      /* @__PURE__ */ jsx170("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsxs142("tr", { children: [
        /* @__PURE__ */ jsx170("th", { className: "px-4 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px] w-56", children: "Medication" }),
        /* @__PURE__ */ jsx170("th", { className: "px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]", children: "Route" }),
        /* @__PURE__ */ jsx170("th", { className: "px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]", children: "Prescribed By" }),
        timeSlots.map((ts) => /* @__PURE__ */ jsx170("th", { className: "px-2 py-2.5 text-center font-mono text-[10px] text-urvos-text-subtle font-semibold", children: ts }, ts))
      ] }) }),
      /* @__PURE__ */ jsx170("tbody", { className: "divide-y divide-urvos-border", children: marData.map((entry, i) => /* @__PURE__ */ jsxs142("tr", { className: "hover:bg-urvos-background transition-colors group", children: [
        /* @__PURE__ */ jsx170("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs142("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx170(Pill8, { className: "w-3.5 h-3.5 shrink-0 mt-0.5 text-urvos-primary" }),
          /* @__PURE__ */ jsxs142("div", { children: [
            /* @__PURE__ */ jsx170("p", { className: "font-semibold text-urvos-text", children: entry.medication }),
            /* @__PURE__ */ jsxs142("p", { className: "text-[10px] text-urvos-text-subtle", children: [
              entry.dose,
              " \xB7 ",
              entry.frequency
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx170("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsx170("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200", children: entry.route }) }),
        /* @__PURE__ */ jsx170("td", { className: "px-3 py-3 text-urvos-text-subtle text-[10px]", children: /* @__PURE__ */ jsxs142("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx170(User11, { className: "w-3 h-3" }),
          entry.prescribedBy
        ] }) }),
        timeSlots.map((ts) => {
          const status = entry.administrations[ts];
          return /* @__PURE__ */ jsx170("td", { className: "px-2 py-3", children: /* @__PURE__ */ jsx170("div", { className: clsx134("w-8 h-8 rounded-lg border flex items-center justify-center mx-auto cursor-pointer hover:opacity-80 transition-opacity", statusCell[status]), children: statusIcon[status] }) }, ts);
        })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx170("div", { className: "grid grid-cols-4 gap-3", children: [
      { label: "Scheduled", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter((v) => v !== "na").length, 0), color: "text-urvos-text" },
      { label: "Administered", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter((v) => v === "given").length, 0), color: "text-emerald-600" },
      { label: "Pending", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter((v) => v === "due").length, 0), color: "text-amber-600" },
      { label: "Missed", value: marData.reduce((acc, e) => acc + Object.values(e.administrations).filter((v) => v === "missed").length, 0), color: "text-rose-600" }
    ].map((stat) => /* @__PURE__ */ jsxs142("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center", children: [
      /* @__PURE__ */ jsx170("p", { className: clsx134("text-2xl font-black", stat.color), children: stat.value }),
      /* @__PURE__ */ jsx170("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5", children: stat.label })
    ] }, stat.label)) })
  ] });
}

// components/templates/clinical-workflows/LabOrderEntry.tsx
import { clsx as clsx135 } from "clsx";
import { jsx as jsx171, jsxs as jsxs143 } from "react/jsx-runtime";
function LabOrderEntry({ className }) {
  return /* @__PURE__ */ jsxs143("div", { className: clsx135("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs143("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs143("div", { children: [
        /* @__PURE__ */ jsx171("h1", { className: "text-xl font-bold text-urvos-text", children: "Diagnostic Lab & Order Entry Panel" }),
        /* @__PURE__ */ jsx171("p", { className: "text-xs text-urvos-text-subtle", children: "e-Order laboratory panels with priority selection & insurance coverage check" })
      ] }),
      /* @__PURE__ */ jsx171(Button, { size: "sm", children: "+ Submit Diagnostic Order" })
    ] }),
    /* @__PURE__ */ jsxs143("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx171("div", { className: "lg:col-span-2 space-y-4", children: /* @__PURE__ */ jsxs143("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs", children: [
        /* @__PURE__ */ jsx171("h3", { className: "font-bold text-sm text-urvos-text", children: "Active Order Draft" }),
        /* @__PURE__ */ jsxs143("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx171("span", { className: "px-2 py-1 bg-urvos-primary/10 text-urvos-primary font-mono font-bold rounded", children: "Complete Blood Count (CBC)" }),
          /* @__PURE__ */ jsx171("span", { className: "px-2 py-1 bg-emerald-500/10 text-emerald-600 font-mono font-bold rounded", children: "Lipid Profile Panel" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx171(
        FavoriteOrdersPanel,
        {
          orders: [
            { id: "ORD-1", name: "Cardiac Enzyme Panel", type: "Laboratory", details: "Troponin I, CK-MB, Myoglobin", frequency: "STAT" },
            { id: "ORD-2", name: "Comprehensive Metabolic Panel (CMP)", type: "Laboratory", details: "KFT, LFT, Electrolytes", frequency: "Routine" }
          ]
        }
      )
    ] })
  ] });
}

// components/templates/clinical-workflows/CarePlanCreation.tsx
import { useState as useState57 } from "react";
import { clsx as clsx136 } from "clsx";
import { Target as Target3, ListChecks as ListChecks2, RefreshCw as RefreshCw2, CheckCircle2 as CheckCircle214, Plus as Plus8, Clock as Clock13 } from "lucide-react";
import { jsx as jsx172, jsxs as jsxs144 } from "react/jsx-runtime";
var goals = [
  { id: 1, domain: "Cardiac", goal: "Stabilize hemodynamic status", metric: "BP < 140/90, HR 60-100", targetDate: "72h", status: "active" },
  { id: 2, domain: "Pain", goal: "Achieve adequate chest pain relief", metric: "VAS Pain Score < 3/10", targetDate: "24h", status: "active" },
  { id: 3, domain: "Medications", goal: "Optimize antiplatelet therapy", metric: "Aspirin + Ticagrelor DAPT initiated", targetDate: "Today", status: "achieved" },
  { id: 4, domain: "Mobility", goal: "Ambulate in room without dyspnea", metric: "Borg Scale < 3 post-ambulation", targetDate: "Day 3", status: "active" },
  { id: 5, domain: "Education", goal: "Patient understands cardiac risk factors", metric: "Patient can name 3 modifiable risk factors", targetDate: "Day 2", status: "active" }
];
var interventions = [
  { id: 1, goalId: 1, type: "Monitoring", action: "Continuous ECG monitoring", frequency: "Continuous", assignedTo: "Nurse", status: "inprogress" },
  { id: 2, goalId: 1, type: "Medication", action: "Metoprolol 25mg BD for rate control", frequency: "BD", assignedTo: "Nurse", status: "ordered" },
  { id: 3, goalId: 2, type: "PRN Medication", action: "Morphine 2mg IV PRN severe pain (>6/10)", frequency: "PRN", assignedTo: "Nurse", status: "ordered" },
  { id: 4, goalId: 3, type: "Medication", action: "Aspirin 100mg + Ticagrelor 90mg DAPT", frequency: "OD + BD", assignedTo: "Nurse", status: "done" },
  { id: 5, goalId: 4, type: "Physiotherapy", action: "Graded ambulation \u2014 bedside sitting Day 1", frequency: "Twice daily", assignedTo: "PT Dept", status: "ordered" },
  { id: 6, goalId: 5, type: "Education", action: "Cardiac rehab education: diet, activity, meds", frequency: "Once", assignedTo: "Clinical Educator", status: "ordered" }
];
var domainColor = { Cardiac: "bg-rose-50 text-rose-700 border-rose-200", Pain: "bg-amber-50 text-amber-700 border-amber-200", Medications: "bg-violet-50 text-violet-700 border-violet-200", Mobility: "bg-emerald-50 text-emerald-700 border-emerald-200", Education: "bg-blue-50 text-blue-700 border-blue-200" };
var intStatusColor = { ordered: "text-amber-600", inprogress: "text-blue-600", done: "text-emerald-600" };
var intStatusIcon = { ordered: /* @__PURE__ */ jsx172(Clock13, { className: "w-3 h-3" }), inprogress: /* @__PURE__ */ jsx172(RefreshCw2, { className: "w-3 h-3" }), done: /* @__PURE__ */ jsx172(CheckCircle214, { className: "w-3 h-3" }) };
function CarePlanCreation({ className }) {
  const [selectedGoal, setSelectedGoal] = useState57(null);
  const relatedInterventions = selectedGoal ? interventions.filter((i) => i.goalId === selectedGoal) : interventions;
  return /* @__PURE__ */ jsxs144("div", { className: clsx136("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs144("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs144("div", { children: [
        /* @__PURE__ */ jsx172("h1", { className: "text-xl font-bold", children: "Care Plan" }),
        /* @__PURE__ */ jsx172("p", { className: "text-xs text-urvos-text-subtle", children: "Rajesh Kumar \xB7 MRN-8819 \xB7 NSTEMI \xB7 Admitted 24 Jul 2026" })
      ] }),
      /* @__PURE__ */ jsxs144("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx172(Badge, { variant: "info", children: "NSTEMI \u2014 Active Plan" }),
        /* @__PURE__ */ jsxs144(Button, { size: "sm", children: [
          /* @__PURE__ */ jsx172(Plus8, { className: "w-3.5 h-3.5 mr-1" }),
          " Add Goal"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs144("div", { children: [
      /* @__PURE__ */ jsxs144("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx172(Target3, { className: "w-4 h-4 text-urvos-primary" }),
        " Care Goals"
      ] }),
      /* @__PURE__ */ jsx172("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: goals.map((goal) => /* @__PURE__ */ jsxs144("button", { onClick: () => setSelectedGoal(selectedGoal === goal.id ? null : goal.id), className: clsx136("p-3 rounded-xl border text-left transition-all", selectedGoal === goal.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background"), children: [
        /* @__PURE__ */ jsxs144("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsx172("span", { className: clsx136("text-[10px] font-bold px-2 py-0.5 rounded-full border", domainColor[goal.domain]), children: goal.domain }),
          goal.status === "achieved" ? /* @__PURE__ */ jsx172(CheckCircle214, { className: "w-4 h-4 text-emerald-500 shrink-0" }) : /* @__PURE__ */ jsx172(Clock13, { className: "w-4 h-4 text-amber-500 shrink-0" })
        ] }),
        /* @__PURE__ */ jsx172("p", { className: "text-sm font-semibold leading-tight", children: goal.goal }),
        /* @__PURE__ */ jsx172("p", { className: "text-[10px] text-urvos-text-subtle mt-1", children: goal.metric }),
        /* @__PURE__ */ jsxs144("div", { className: "flex items-center justify-between mt-2", children: [
          /* @__PURE__ */ jsxs144("span", { className: "text-[10px] text-urvos-text-subtle", children: [
            "Target: ",
            goal.targetDate
          ] }),
          /* @__PURE__ */ jsxs144("span", { className: "text-[10px] text-urvos-primary font-medium", children: [
            interventions.filter((i) => i.goalId === goal.id).length,
            " interventions"
          ] })
        ] })
      ] }, goal.id)) })
    ] }),
    /* @__PURE__ */ jsxs144("div", { children: [
      /* @__PURE__ */ jsxs144("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx172(ListChecks2, { className: "w-4 h-4 text-urvos-primary" }),
        selectedGoal ? `Interventions for Goal #${selectedGoal}` : "All Interventions",
        selectedGoal && /* @__PURE__ */ jsx172("button", { onClick: () => setSelectedGoal(null), className: "text-urvos-primary hover:underline font-normal", children: "Clear filter" })
      ] }),
      /* @__PURE__ */ jsx172("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs144("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx172("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx172("tr", { children: ["Type", "Intervention / Action", "Frequency", "Assigned To", "Status"].map((col) => /* @__PURE__ */ jsx172("th", { className: "px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]", children: col }, col)) }) }),
        /* @__PURE__ */ jsx172("tbody", { className: "divide-y divide-urvos-border", children: relatedInterventions.map((i) => /* @__PURE__ */ jsxs144("tr", { className: "hover:bg-urvos-background transition-colors", children: [
          /* @__PURE__ */ jsx172("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsx172(Badge, { variant: "info", className: "text-[10px]", children: i.type }) }),
          /* @__PURE__ */ jsx172("td", { className: "px-3 py-2.5 font-medium", children: i.action }),
          /* @__PURE__ */ jsx172("td", { className: "px-3 py-2.5 text-urvos-text-subtle", children: i.frequency }),
          /* @__PURE__ */ jsx172("td", { className: "px-3 py-2.5 text-urvos-text-subtle", children: i.assignedTo }),
          /* @__PURE__ */ jsx172("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs144("span", { className: clsx136("flex items-center gap-1 font-semibold capitalize", intStatusColor[i.status]), children: [
            intStatusIcon[i.status],
            " ",
            i.status
          ] }) })
        ] }, i.id)) })
      ] }) })
    ] })
  ] });
}

// components/templates/clinical-workflows/ReferralManagement.tsx
import { useState as useState58 } from "react";
import { clsx as clsx137 } from "clsx";
import { ArrowRight as ArrowRight4, CheckCircle2 as CheckCircle215, Clock as Clock14, AlertCircle as AlertCircle13, Search as Search11, Hospital, FileText as FileText15, Phone as Phone2 } from "lucide-react";
import { Fragment as Fragment12, jsx as jsx173, jsxs as jsxs145 } from "react/jsx-runtime";
var referrals = [
  { id: "REF-2026-0041", patient: "Rajesh Kumar", mrn: "MRN-8819", age: 45, from: "Dr. A. Sharma (Gen. Medicine)", to: "Dr. P. Nair (Cardiology)", reason: "NSTEMI workup \u2014 cardiac catheterization evaluation", priority: "urgent", status: "pending", created: "Today 09:30", facility: "Apollo Hospitals, Mumbai" },
  { id: "REF-2026-0039", patient: "Meena Iyer", mrn: "MRN-4421", age: 62, from: "Dr. V. Reddy (ICU)", to: "Nephrology", reason: "AKI on CKD \u2014 Cr 2.1, rising trend", priority: "urgent", status: "accepted", created: "Today 07:15", facility: "Apollo Hospitals, Mumbai" },
  { id: "REF-2026-0037", patient: "Suresh Patel", mrn: "MRN-7762", age: 58, from: "Dr. M. Gupta (GP)", to: "Orthopedics", reason: "R knee OA grade 3 \u2014 surgical opinion", priority: "routine", status: "scheduled", created: "Yesterday", facility: "Fortis Hospital, Pune" },
  { id: "REF-2026-0035", patient: "Kavitha Nair", mrn: "MRN-5530", age: 34, from: "Dr. S. Pillai (OBG)", to: "Endocrinology", reason: "Gestational diabetes \u2014 insulin initiation", priority: "routine", status: "completed", created: "22 Jul 2026", facility: "Apollo Hospitals, Mumbai" }
];
var priorityStyle = { urgent: "critical", routine: "info" };
var statusStyle = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  scheduled: "bg-violet-50 text-violet-700 border-violet-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200"
};
var statusIcon2 = {
  pending: /* @__PURE__ */ jsx173(Clock14, { className: "w-3.5 h-3.5" }),
  accepted: /* @__PURE__ */ jsx173(CheckCircle215, { className: "w-3.5 h-3.5" }),
  scheduled: /* @__PURE__ */ jsx173(FileText15, { className: "w-3.5 h-3.5" }),
  completed: /* @__PURE__ */ jsx173(CheckCircle215, { className: "w-3.5 h-3.5" })
};
function ReferralManagement({ className }) {
  var _a;
  const [search, setSearch] = useState58("");
  const [statusFilter, setStatusFilter] = useState58("all");
  const [selected, setSelected] = useState58("REF-2026-0041");
  const filtered = referrals.filter(
    (r) => (statusFilter === "all" || r.status === statusFilter) && (search === "" || r.patient.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  );
  const activeRef = referrals.find((r) => r.id === selected);
  return /* @__PURE__ */ jsxs145("div", { className: clsx137("space-y-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs145("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs145("div", { children: [
        /* @__PURE__ */ jsx173("h1", { className: "text-xl font-bold", children: "Referral Management" }),
        /* @__PURE__ */ jsx173("p", { className: "text-xs text-urvos-text-subtle", children: "Inbound & outbound specialist referrals \xB7 ABDM-linked" })
      ] }),
      /* @__PURE__ */ jsx173(Button, { size: "sm", children: "+ New Referral" })
    ] }),
    /* @__PURE__ */ jsxs145("div", { className: "flex flex-wrap gap-2", children: [
      ["all", "pending", "accepted", "scheduled", "completed"].map((s) => {
        const count3 = s === "all" ? referrals.length : referrals.filter((r) => r.status === s).length;
        return /* @__PURE__ */ jsxs145("button", { onClick: () => setStatusFilter(s), className: clsx137("px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors", statusFilter === s ? "border-urvos-primary bg-urvos-primary text-white" : "border-urvos-border bg-urvos-surface text-urvos-text-subtle hover:bg-urvos-background"), children: [
          s,
          " (",
          count3,
          ")"
        ] }, s);
      }),
      /* @__PURE__ */ jsxs145("div", { className: "relative ml-auto", children: [
        /* @__PURE__ */ jsx173(Search11, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" }),
        /* @__PURE__ */ jsx173("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search patient or ID...", className: "pl-8 pr-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs145("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsx173("div", { className: "lg:col-span-2 space-y-2", children: filtered.map((ref) => {
        var _a2;
        return /* @__PURE__ */ jsx173("button", { onClick: () => setSelected(ref.id), className: clsx137("w-full text-left p-3 rounded-xl border transition-all", selected === ref.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background"), children: /* @__PURE__ */ jsxs145("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs145("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs145("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx173("p", { className: "text-xs font-semibold", children: ref.patient }),
              /* @__PURE__ */ jsx173(Badge, { variant: priorityStyle[ref.priority], className: "text-[9px] py-0", children: ref.priority })
            ] }),
            /* @__PURE__ */ jsxs145("p", { className: "text-[10px] text-urvos-text-subtle", children: [
              ref.mrn,
              " \xB7 ",
              ref.id
            ] }),
            /* @__PURE__ */ jsxs145("p", { className: "text-[10px] text-urvos-primary font-medium mt-0.5 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx173("span", { className: "truncate", children: ((_a2 = ref.from.split("(")[1]) == null ? void 0 : _a2.slice(0, -1)) || ref.from }),
              /* @__PURE__ */ jsx173(ArrowRight4, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsx173("span", { className: "truncate", children: ref.to })
            ] }),
            /* @__PURE__ */ jsx173("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5 truncate", children: ref.reason })
          ] }),
          /* @__PURE__ */ jsxs145("span", { className: clsx137("flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0", statusStyle[ref.status]), children: [
            statusIcon2[ref.status],
            " ",
            ref.status
          ] })
        ] }) }, ref.id);
      }) }),
      /* @__PURE__ */ jsxs145("div", { className: "lg:col-span-3 p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4", children: [
        /* @__PURE__ */ jsxs145("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs145("div", { children: [
            /* @__PURE__ */ jsx173("p", { className: "font-bold text-base", children: activeRef.id }),
            /* @__PURE__ */ jsx173("p", { className: "text-xs text-urvos-text-subtle", children: activeRef.created })
          ] }),
          /* @__PURE__ */ jsxs145("span", { className: clsx137("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border", statusStyle[activeRef.status]), children: [
            statusIcon2[activeRef.status],
            " ",
            activeRef.status.charAt(0).toUpperCase() + activeRef.status.slice(1)
          ] })
        ] }),
        /* @__PURE__ */ jsxs145("div", { className: "p-3 rounded-xl bg-urvos-background border border-urvos-border flex items-center gap-3", children: [
          /* @__PURE__ */ jsx173("div", { className: "w-9 h-9 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center font-bold text-sm shrink-0", children: activeRef.patient.split(" ").map((n) => n[0]).join("") }),
          /* @__PURE__ */ jsxs145("div", { children: [
            /* @__PURE__ */ jsxs145("p", { className: "font-semibold text-sm", children: [
              activeRef.patient,
              " \xB7 ",
              activeRef.age,
              "y"
            ] }),
            /* @__PURE__ */ jsx173("p", { className: "text-xs text-urvos-text-subtle", children: activeRef.mrn })
          ] }),
          /* @__PURE__ */ jsx173(Badge, { variant: priorityStyle[activeRef.priority], className: "ml-auto", children: activeRef.priority })
        ] }),
        /* @__PURE__ */ jsxs145("div", { className: "flex items-start gap-3 text-xs", children: [
          /* @__PURE__ */ jsxs145("div", { className: "flex-1 p-3 rounded-xl bg-urvos-background border border-urvos-border", children: [
            /* @__PURE__ */ jsx173("p", { className: "text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1", children: "From" }),
            /* @__PURE__ */ jsx173("p", { className: "font-semibold text-sm", children: activeRef.from.split("(")[0].trim() }),
            /* @__PURE__ */ jsx173("p", { className: "text-urvos-primary text-[10px]", children: ((_a = activeRef.from.split("(")[1]) == null ? void 0 : _a.replace(")", "")) || "" })
          ] }),
          /* @__PURE__ */ jsx173(ArrowRight4, { className: "w-5 h-5 text-urvos-text-subtle mt-4 shrink-0" }),
          /* @__PURE__ */ jsxs145("div", { className: "flex-1 p-3 rounded-xl bg-urvos-primary/5 border border-urvos-primary/30", children: [
            /* @__PURE__ */ jsx173("p", { className: "text-[10px] font-bold text-urvos-primary uppercase tracking-wider mb-1", children: "To" }),
            /* @__PURE__ */ jsx173("p", { className: "font-semibold text-sm", children: activeRef.to }),
            /* @__PURE__ */ jsxs145("p", { className: "text-urvos-text-subtle text-[10px] flex items-center gap-1", children: [
              /* @__PURE__ */ jsx173(Hospital, { className: "w-3 h-3" }),
              activeRef.facility
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs145("div", { children: [
          /* @__PURE__ */ jsx173("p", { className: "text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1", children: "Referral Reason" }),
          /* @__PURE__ */ jsx173("p", { className: "text-sm", children: activeRef.reason })
        ] }),
        /* @__PURE__ */ jsxs145("div", { className: "flex flex-wrap gap-2 pt-2 border-t border-urvos-border", children: [
          activeRef.status === "pending" && /* @__PURE__ */ jsxs145(Fragment12, { children: [
            /* @__PURE__ */ jsxs145(Button, { size: "sm", children: [
              /* @__PURE__ */ jsx173(CheckCircle215, { className: "w-3.5 h-3.5 mr-1" }),
              " Accept"
            ] }),
            /* @__PURE__ */ jsxs145(Button, { size: "sm", variant: "secondary", children: [
              /* @__PURE__ */ jsx173(AlertCircle13, { className: "w-3.5 h-3.5 mr-1" }),
              " Request More Info"
            ] })
          ] }),
          /* @__PURE__ */ jsxs145(Button, { size: "sm", variant: "secondary", children: [
            /* @__PURE__ */ jsx173(FileText15, { className: "w-3.5 h-3.5 mr-1" }),
            " Attach Notes"
          ] }),
          /* @__PURE__ */ jsxs145(Button, { size: "sm", variant: "secondary", children: [
            /* @__PURE__ */ jsx173(Phone2, { className: "w-3.5 h-3.5 mr-1" }),
            " Contact Specialist"
          ] })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/clinical-workflows/ClinicalDecisionSupport.tsx
import { useState as useState59 } from "react";
import { clsx as clsx138 } from "clsx";
import { Zap, AlertTriangle as AlertTriangle16, CheckCircle2 as CheckCircle216, Info as Info4, XCircle as XCircle2, ChevronDown as ChevronDown10, ChevronUp as ChevronUp4, ExternalLink as ExternalLink3 } from "lucide-react";
import { jsx as jsx174, jsxs as jsxs146 } from "react/jsx-runtime";
var alerts = [
  { id: 1, type: "contraindication", priority: "critical", title: "NSAID Contraindicated in NSTEMI", detail: "Diclofenac 50mg (ordered) is contraindicated in ACS. NSAIDs increase cardiovascular mortality in acute coronary syndrome. Discontinue immediately.", source: "ACC/AHA 2023 ACS Guidelines", actions: ["Discontinue NSAID", "Suggest Paracetamol 1g TDS instead"] },
  { id: 2, type: "interaction", priority: "high", title: "Drug Interaction: Ticagrelor + Simvastatin", detail: "Ticagrelor inhibits CYP3A4 \u2014 may increase Simvastatin levels 5-fold. Risk of myopathy/rhabdomyolysis. Switch to Atorvastatin or Rosuvastatin.", source: "Medscape Drug Interactions DB", actions: ["Switch to Atorvastatin 40mg OD", "Dismiss \u2014 patient tolerating well"] },
  { id: 3, type: "order-set", priority: "high", title: "NSTEMI Order Set Available", detail: "Evidence-based NSTEMI order set includes: DAPT, anticoagulation, beta-blocker, statin, nitrate PRN, and cardiac monitoring. Click to apply.", source: "Urvos Clinical Decision Library", actions: ["Apply NSTEMI Order Set", "View Order Details"] },
  { id: 4, type: "recommendation", priority: "moderate", title: "Prophylactic Anticoagulation Recommended", detail: "Patient on bed rest post-ACS without anticoagulation. DVT prophylaxis with Enoxaparin 40mg SC OD recommended per ACCP guidelines.", source: "ACCP 2022 VTE Prophylaxis Guidelines", actions: ["Order Enoxaparin 40mg SC OD", "Patient already on LMWH \u2014 dismiss"] },
  { id: 5, type: "reminder", priority: "info", title: "Troponin Repeat Due at 06:00", detail: "Serial Troponin I ordered \u2014 3h repeat due at 06:00 AM. Positive Troponin \u2192 activate Cath Lab pathway immediately.", source: "Clinical Protocol Reminder", actions: ["Order Now", "Remind in 30 min"] }
];
var priorityStyle2 = {
  critical: "border-rose-300 bg-rose-50/60",
  high: "border-amber-300 bg-amber-50/60",
  moderate: "border-blue-300 bg-blue-50/60",
  info: "border-urvos-border bg-urvos-surface"
};
var priorityIcon = {
  critical: /* @__PURE__ */ jsx174(XCircle2, { className: "w-5 h-5 text-rose-600 shrink-0" }),
  high: /* @__PURE__ */ jsx174(AlertTriangle16, { className: "w-5 h-5 text-amber-600 shrink-0" }),
  moderate: /* @__PURE__ */ jsx174(Info4, { className: "w-5 h-5 text-blue-600 shrink-0" }),
  info: /* @__PURE__ */ jsx174(Info4, { className: "w-5 h-5 text-slate-400 shrink-0" })
};
var priorityBadge = { critical: "critical", high: "caution", moderate: "info", info: "neutral" };
function ClinicalDecisionSupportTemplate({ className }) {
  const [expanded, setExpanded] = useState59([1, 2]);
  const [dismissed, setDismiss] = useState59([]);
  const visible = alerts.filter((a) => !dismissed.includes(a.id));
  const toggle = (id) => setExpanded((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  return /* @__PURE__ */ jsxs146("div", { className: clsx138("space-y-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs146("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs146("div", { children: [
        /* @__PURE__ */ jsxs146("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx174(Zap, { className: "w-5 h-5 text-urvos-primary" }),
          " Clinical Decision Support"
        ] }),
        /* @__PURE__ */ jsx174("p", { className: "text-xs text-urvos-text-subtle", children: "Active CDS alerts for Rajesh Kumar \xB7 MRN-8819 \xB7 ACS / NSTEMI" })
      ] }),
      /* @__PURE__ */ jsxs146("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs146(Badge, { variant: "critical", children: [
          visible.filter((a) => a.priority === "critical").length,
          " Critical"
        ] }),
        /* @__PURE__ */ jsxs146(Badge, { variant: "caution", children: [
          visible.filter((a) => a.priority === "high").length,
          " High"
        ] })
      ] })
    ] }),
    visible.length === 0 && /* @__PURE__ */ jsxs146("div", { className: "flex flex-col items-center py-12 text-urvos-text-subtle", children: [
      /* @__PURE__ */ jsx174(CheckCircle216, { className: "w-10 h-10 mb-3 text-emerald-500" }),
      /* @__PURE__ */ jsx174("p", { className: "font-semibold", children: "No active CDS alerts" }),
      /* @__PURE__ */ jsx174("p", { className: "text-xs mt-1", children: "All alerts have been addressed or dismissed." })
    ] }),
    /* @__PURE__ */ jsx174("div", { className: "space-y-3", children: visible.map((alert) => {
      const isExpanded = expanded.includes(alert.id);
      return /* @__PURE__ */ jsxs146("div", { className: clsx138("rounded-xl border overflow-hidden transition-all", priorityStyle2[alert.priority]), children: [
        /* @__PURE__ */ jsxs146("button", { onClick: () => toggle(alert.id), className: "w-full flex items-center gap-3 p-4 text-left", children: [
          priorityIcon[alert.priority],
          /* @__PURE__ */ jsxs146("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs146("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx174("p", { className: "text-sm font-bold", children: alert.title }),
              /* @__PURE__ */ jsx174(Badge, { variant: priorityBadge[alert.priority], className: "text-[10px]", children: alert.priority }),
              /* @__PURE__ */ jsx174(Badge, { variant: "neutral", className: "text-[10px] capitalize", children: alert.type.replace("-", " ") })
            ] }),
            !isExpanded && /* @__PURE__ */ jsx174("p", { className: "text-xs text-urvos-text-subtle mt-0.5 truncate", children: alert.detail })
          ] }),
          isExpanded ? /* @__PURE__ */ jsx174(ChevronUp4, { className: "w-4 h-4 text-urvos-text-subtle shrink-0" }) : /* @__PURE__ */ jsx174(ChevronDown10, { className: "w-4 h-4 text-urvos-text-subtle shrink-0" })
        ] }),
        isExpanded && /* @__PURE__ */ jsxs146("div", { className: "px-4 pb-4 space-y-3 border-t border-current/10", children: [
          /* @__PURE__ */ jsx174("p", { className: "text-sm leading-relaxed mt-3", children: alert.detail }),
          /* @__PURE__ */ jsxs146("div", { className: "flex items-center gap-1 text-[10px] text-urvos-text-subtle", children: [
            /* @__PURE__ */ jsx174(ExternalLink3, { className: "w-3 h-3" }),
            "Source: ",
            /* @__PURE__ */ jsx174("span", { className: "font-medium ml-1", children: alert.source })
          ] }),
          alert.actions && /* @__PURE__ */ jsx174("div", { className: "flex flex-wrap gap-2 mt-3", children: alert.actions.map((action, i) => /* @__PURE__ */ jsx174(Button, { size: "sm", variant: i === 0 ? "primary" : "secondary", onClick: () => i === alert.actions.length - 1 && setDismiss((prev) => [...prev, alert.id]), children: action }, i)) })
        ] })
      ] }, alert.id);
    }) })
  ] });
}

// components/templates/analytics-reporting/ClinicalReportsDashboard.tsx
import { clsx as clsx139 } from "clsx";
import { Download as Download3 } from "lucide-react";
import { jsx as jsx175, jsxs as jsxs147 } from "react/jsx-runtime";
function ClinicalReportsDashboard({ className }) {
  return /* @__PURE__ */ jsxs147("div", { className: clsx139("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs147("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs147("div", { children: [
        /* @__PURE__ */ jsx175("h1", { className: "text-xl font-bold text-urvos-text", children: "Clinical Registries & Disease Reports" }),
        /* @__PURE__ */ jsx175("p", { className: "text-xs text-urvos-text-subtle", children: "Generate & export disease registries, immunization coverage, and clinical outcomes" })
      ] }),
      /* @__PURE__ */ jsxs147(Button, { size: "sm", children: [
        /* @__PURE__ */ jsx175(Download3, { className: "w-3.5 h-3.5 mr-1" }),
        " Export CSV Report"
      ] })
    ] }),
    /* @__PURE__ */ jsxs147("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs", children: [
      /* @__PURE__ */ jsx175("h3", { className: "font-bold text-sm text-urvos-text", children: "Active Clinical Registries" }),
      /* @__PURE__ */ jsxs147("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs147("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
          /* @__PURE__ */ jsx175("div", { className: "text-urvos-text-subtle", children: "Diabetes Type 2 Registry" }),
          /* @__PURE__ */ jsx175("div", { className: "text-lg font-bold text-urvos-text", children: "1,420 Patients" })
        ] }),
        /* @__PURE__ */ jsxs147("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
          /* @__PURE__ */ jsx175("div", { className: "text-urvos-text-subtle", children: "Hypertension Cohort" }),
          /* @__PURE__ */ jsx175("div", { className: "text-lg font-bold text-urvos-text", children: "2,890 Patients" })
        ] }),
        /* @__PURE__ */ jsxs147("div", { className: "p-3 bg-urvos-background border border-urvos-border rounded-lg space-y-1", children: [
          /* @__PURE__ */ jsx175("div", { className: "text-urvos-text-subtle", children: "Asthma & COPD Registry" }),
          /* @__PURE__ */ jsx175("div", { className: "text-lg font-bold text-urvos-text", children: "640 Patients" })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/analytics-reporting/RevenueCycleAnalytics.tsx
import { clsx as clsx140 } from "clsx";
import { jsx as jsx176, jsxs as jsxs148 } from "react/jsx-runtime";
function RevenueCycleAnalytics({ className }) {
  return /* @__PURE__ */ jsxs148("div", { className: clsx140("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs148("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs148("div", { children: [
        /* @__PURE__ */ jsx176("h1", { className: "text-xl font-bold text-urvos-text", children: "Revenue Cycle & Denial Waterfall Analytics" }),
        /* @__PURE__ */ jsx176("p", { className: "text-xs text-urvos-text-subtle", children: "Payer reimbursement rates, CARC denial waterfall, and collection velocity" })
      ] }),
      /* @__PURE__ */ jsx176(Badge, { variant: "success", children: "94.2% Clean Claim Rate" })
    ] }),
    /* @__PURE__ */ jsxs148("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs", children: [
      /* @__PURE__ */ jsxs148("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1", children: [
        /* @__PURE__ */ jsx176("div", { className: "text-urvos-text-subtle", children: "Gross Billed Revenue" }),
        /* @__PURE__ */ jsx176("div", { className: "text-xl font-black text-urvos-text", children: "\u20B942,80,000" })
      ] }),
      /* @__PURE__ */ jsxs148("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1", children: [
        /* @__PURE__ */ jsx176("div", { className: "text-urvos-text-subtle", children: "Net Collected Cash" }),
        /* @__PURE__ */ jsx176("div", { className: "text-xl font-black text-emerald-600", children: "\u20B938,10,000" })
      ] }),
      /* @__PURE__ */ jsxs148("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-1", children: [
        /* @__PURE__ */ jsx176("div", { className: "text-urvos-text-subtle", children: "Outstanding AR (>60d)" }),
        /* @__PURE__ */ jsx176("div", { className: "text-xl font-black text-amber-600", children: "\u20B94,70,000" })
      ] })
    ] })
  ] });
}

// components/templates/analytics-reporting/QualityMeasuresReport.tsx
import { clsx as clsx141 } from "clsx";
import { jsx as jsx177, jsxs as jsxs149 } from "react/jsx-runtime";
function QualityMeasuresReport({ className }) {
  return /* @__PURE__ */ jsxs149("div", { className: clsx141("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs149("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs149("div", { children: [
        /* @__PURE__ */ jsx177("h1", { className: "text-xl font-bold text-urvos-text", children: "NABH & NCQA Hospital Quality Indicators" }),
        /* @__PURE__ */ jsx177("p", { className: "text-xs text-urvos-text-subtle", children: "Quality compliance, hand hygiene auditing, and surgical site infection (SSI) tracking" })
      ] }),
      /* @__PURE__ */ jsx177(Badge, { variant: "success", children: "NABH Accredited Facility" })
    ] }),
    /* @__PURE__ */ jsxs149("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsx177(ChartGauge, { value: 96, title: "Hand Hygiene Audit Compliance Rate", label: "96% Audit Pass Score" }),
      /* @__PURE__ */ jsxs149("div", { className: "p-5 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs", children: [
        /* @__PURE__ */ jsx177("h3", { className: "font-bold text-sm text-urvos-text", children: "Clinical Quality KPIs" }),
        /* @__PURE__ */ jsxs149("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs149("div", { className: "flex justify-between border-b border-urvos-border pb-1", children: [
            /* @__PURE__ */ jsx177("span", { children: "Surgical Site Infection (SSI) Rate:" }),
            /* @__PURE__ */ jsx177("span", { className: "font-bold text-emerald-600", children: "0.02% (Target < 0.5%)" })
          ] }),
          /* @__PURE__ */ jsxs149("div", { className: "flex justify-between border-b border-urvos-border pb-1", children: [
            /* @__PURE__ */ jsx177("span", { children: "Patient Fall Incident Rate:" }),
            /* @__PURE__ */ jsx177("span", { className: "font-bold text-emerald-600", children: "0 per 1,000 bed days" })
          ] }),
          /* @__PURE__ */ jsxs149("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx177("span", { children: "Medication Reconciled at Discharge:" }),
            /* @__PURE__ */ jsx177("span", { className: "font-bold text-emerald-600", children: "98.4% Compliance" })
          ] })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/interoperability-fhir/FhirResourceViewer.tsx
import { clsx as clsx142 } from "clsx";
import { Copy as Copy3 } from "lucide-react";
import { jsx as jsx178, jsxs as jsxs150 } from "react/jsx-runtime";
function FhirResourceViewer({ className }) {
  const sampleFhirJson = JSON.stringify(
    {
      resourceType: "Patient",
      id: "pat-99182",
      active: true,
      name: [{ family: "Kumar", given: ["Rajesh"] }],
      gender: "male",
      birthDate: "1981-08-15",
      identifier: [
        { system: "https://healthid.abdm.gov.in", value: "91-8829-1029-4410" }
      ]
    },
    null,
    2
  );
  return /* @__PURE__ */ jsxs150("div", { className: clsx142("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs150("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs150("div", { children: [
        /* @__PURE__ */ jsx178("h1", { className: "text-xl font-bold text-urvos-text", children: "FHIR R4 Resource Explorer & JSON Inspector" }),
        /* @__PURE__ */ jsx178("p", { className: "text-xs text-urvos-text-subtle", children: "Structure definition viewer, schema validation, and HL7 FHIR payload inspector" })
      ] }),
      /* @__PURE__ */ jsx178(Badge, { variant: "success", children: "FHIR R4 Validated" })
    ] }),
    /* @__PURE__ */ jsxs150("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3", children: [
      /* @__PURE__ */ jsxs150("div", { className: "flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsx178("span", { className: "font-mono font-bold text-urvos-primary", children: "Resource: Patient/pat-99182" }),
        /* @__PURE__ */ jsxs150("button", { className: "flex items-center text-urvos-text-subtle hover:text-urvos-text", children: [
          /* @__PURE__ */ jsx178(Copy3, { className: "w-3.5 h-3.5 mr-1" }),
          " Copy JSON"
        ] })
      ] }),
      /* @__PURE__ */ jsx178("pre", { className: "p-4 bg-urvos-background border border-urvos-border rounded-lg font-mono text-xs text-emerald-600 dark:text-emerald-400 overflow-x-auto", children: sampleFhirJson })
    ] })
  ] });
}

// components/templates/interoperability-fhir/Hl7MessageMonitor.tsx
import { clsx as clsx143 } from "clsx";
import { jsx as jsx179, jsxs as jsxs151 } from "react/jsx-runtime";
function Hl7MessageMonitor({ className }) {
  const messages2 = [
    { id: "MSG-10029", type: "ADT^A08 (Patient Update)", status: "ACK Processed", timestamp: "2026-07-24 10:14:02", latency: "14ms" },
    { id: "MSG-10028", type: "ORM^O01 (Order General)", status: "ACK Processed", timestamp: "2026-07-24 10:12:45", latency: "22ms" },
    { id: "MSG-10027", type: "ORU^R01 (Observation Result)", status: "ACK Processed", timestamp: "2026-07-24 10:10:11", latency: "18ms" }
  ];
  return /* @__PURE__ */ jsxs151("div", { className: clsx143("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs151("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs151("div", { children: [
        /* @__PURE__ */ jsx179("h1", { className: "text-xl font-bold text-urvos-text", children: "HL7 v2.x Interface Engine Monitor" }),
        /* @__PURE__ */ jsx179("p", { className: "text-xs text-urvos-text-subtle", children: "Real-time MLLP TCP stream, ADT/ORM/ORU message queue latency & error repair" })
      ] }),
      /* @__PURE__ */ jsx179(Badge, { variant: "success", children: "Interface Active (0 Queued)" })
    ] }),
    /* @__PURE__ */ jsx179("div", { className: "space-y-3", children: messages2.map((m) => /* @__PURE__ */ jsxs151("div", { className: "p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxs151("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsxs151("div", { className: "font-bold text-urvos-text font-mono", children: [
          m.id,
          " \u2022 ",
          m.type
        ] }),
        /* @__PURE__ */ jsxs151("div", { className: "text-[11px] text-urvos-text-subtle", children: [
          m.timestamp,
          " \u2022 Latency: ",
          m.latency
        ] })
      ] }),
      /* @__PURE__ */ jsx179(Badge, { variant: "success", children: m.status })
    ] }, m.id)) })
  ] });
}

// components/templates/interoperability-fhir/AbdmGatewayDashboard.tsx
import { useState as useState60 } from "react";
import { clsx as clsx144 } from "clsx";
import { Wifi, CheckCircle2 as CheckCircle218, XCircle as XCircle3, RefreshCw as RefreshCw3, Clock as Clock15 } from "lucide-react";
import { jsx as jsx180, jsxs as jsxs152 } from "react/jsx-runtime";
var transactions = [
  { id: "TXN-2026-8841", ts: "09:42:05", type: "ABHA Verification", patient: "Rajesh Kumar", abha: "91-8829-1029-4410", status: "success", latency: "312ms" },
  { id: "TXN-2026-8840", ts: "09:38:22", type: "Consent Fetch (HIU)", patient: "Meena Iyer", abha: "91-7721-0011-2200", status: "success", latency: "487ms" },
  { id: "TXN-2026-8839", ts: "09:35:14", type: "Health Record Push (HIP)", patient: "Suresh Patel", abha: "91-4410-8811-5500", status: "failed", latency: "\u2014" },
  { id: "TXN-2026-8838", ts: "09:30:00", type: "PHR Link Request", patient: "Kavitha Nair", abha: "91-3300-7722-9901", status: "pending", latency: "\u2014" },
  { id: "TXN-2026-8837", ts: "09:22:48", type: "Insurance NHCX Claim", patient: "Amit Shah", abha: "91-2200-4411-6631", status: "success", latency: "621ms" },
  { id: "TXN-2026-8836", ts: "09:15:30", type: "ABHA OTP Verification", patient: "Sunita Rao", abha: "91-5500-1133-2244", status: "success", latency: "258ms" }
];
var statusIcon3 = {
  success: /* @__PURE__ */ jsx180(CheckCircle218, { className: "w-4 h-4 text-emerald-600" }),
  pending: /* @__PURE__ */ jsx180(Clock15, { className: "w-4 h-4 text-amber-500" }),
  failed: /* @__PURE__ */ jsx180(XCircle3, { className: "w-4 h-4 text-rose-500" })
};
var statusStyle2 = {
  success: "text-emerald-600",
  pending: "text-amber-600",
  failed: "text-rose-600 font-bold"
};
function AbdmGatewayDashboard({ className }) {
  const [autoRefresh, setAutoRefresh] = useState60(true);
  return /* @__PURE__ */ jsxs152("div", { className: clsx144("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs152("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs152("div", { children: [
        /* @__PURE__ */ jsxs152("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx180(Wifi, { className: "w-5 h-5 text-urvos-primary" }),
          " ABDM Gateway Dashboard"
        ] }),
        /* @__PURE__ */ jsx180("p", { className: "text-xs text-urvos-text-subtle", children: "ABHA \xB7 HIP/HIU \xB7 NHCX \xB7 PHR \xB7 ABDM Gateway v2.5" })
      ] }),
      /* @__PURE__ */ jsxs152("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx180(Badge, { variant: "success", children: "Gateway Online" }),
        /* @__PURE__ */ jsxs152("button", { onClick: () => setAutoRefresh(!autoRefresh), className: clsx144("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors", autoRefresh ? "border-urvos-primary bg-urvos-primary/10 text-urvos-primary" : "border-urvos-border text-urvos-text-subtle"), children: [
          /* @__PURE__ */ jsx180(RefreshCw3, { className: clsx144("w-3 h-3", autoRefresh && "animate-spin") }),
          " Auto-Refresh"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx180("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      { label: "ABHA Verifications", value: "1,284", change: "+12 today", color: "text-emerald-600", icon: "\u{1FAAA}" },
      { label: "Consents Fetched", value: "421", change: "+5 pending", color: "text-blue-600", icon: "\u{1F4CB}" },
      { label: "Health Records Pushed", value: "89", change: "2 failed", color: "text-violet-600", icon: "\u{1F4E4}" },
      { label: "NHCX Claims Filed", value: "36", change: "\u20B914.2L value", color: "text-amber-600", icon: "\u{1F3E5}" }
    ].map((stat) => /* @__PURE__ */ jsxs152("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
      /* @__PURE__ */ jsx180("div", { className: "text-2xl mb-1", children: stat.icon }),
      /* @__PURE__ */ jsx180("p", { className: clsx144("text-2xl font-black", stat.color), children: stat.value }),
      /* @__PURE__ */ jsx180("p", { className: "text-xs font-medium text-urvos-text", children: stat.label }),
      /* @__PURE__ */ jsx180("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5", children: stat.change })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxs152("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
      /* @__PURE__ */ jsx180("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "Service Health" }),
      /* @__PURE__ */ jsx180("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: [
        { name: "ABDM Auth Service", latency: "98ms", status: "online" },
        { name: "ABHA Verification API", latency: "312ms", status: "online" },
        { name: "HIU Consent Service", latency: "487ms", status: "online" },
        { name: "HIP Record Push", latency: "\u2014", status: "degraded" },
        { name: "NHCX Claims API", latency: "621ms", status: "online" },
        { name: "PHR Link Service", latency: "\u2014", status: "maintenance" }
      ].map((svc) => /* @__PURE__ */ jsxs152("div", { className: clsx144("flex items-center gap-2.5 p-2.5 rounded-lg border text-xs", svc.status === "online" ? "border-emerald-200 bg-emerald-50" : svc.status === "degraded" ? "border-amber-200 bg-amber-50" : "border-urvos-border bg-urvos-background"), children: [
        /* @__PURE__ */ jsx180("span", { className: clsx144("w-2.5 h-2.5 rounded-full shrink-0", svc.status === "online" ? "bg-emerald-500" : svc.status === "degraded" ? "bg-amber-500 animate-pulse" : "bg-slate-400") }),
        /* @__PURE__ */ jsxs152("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx180("p", { className: "font-semibold truncate", children: svc.name }),
          /* @__PURE__ */ jsxs152("p", { className: "text-[10px] text-urvos-text-subtle capitalize", children: [
            svc.status,
            " ",
            svc.latency !== "\u2014" && `\xB7 ${svc.latency}`
          ] })
        ] })
      ] }, svc.name)) })
    ] }),
    /* @__PURE__ */ jsxs152("div", { children: [
      /* @__PURE__ */ jsx180("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "Recent Transactions" }),
      /* @__PURE__ */ jsx180("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs152("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx180("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx180("tr", { children: ["Time", "Transaction ID", "Type", "Patient / ABHA", "Status", "Latency"].map((col) => /* @__PURE__ */ jsx180("th", { className: "px-3 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase", children: col }, col)) }) }),
        /* @__PURE__ */ jsx180("tbody", { className: "divide-y divide-urvos-border", children: transactions.map((tx) => /* @__PURE__ */ jsxs152("tr", { className: "hover:bg-urvos-background transition-colors", children: [
          /* @__PURE__ */ jsx180("td", { className: "px-3 py-2.5 font-mono text-urvos-text-subtle", children: tx.ts }),
          /* @__PURE__ */ jsx180("td", { className: "px-3 py-2.5 font-mono text-[10px] text-urvos-primary", children: tx.id }),
          /* @__PURE__ */ jsx180("td", { className: "px-3 py-2.5 font-medium", children: tx.type }),
          /* @__PURE__ */ jsxs152("td", { className: "px-3 py-2.5", children: [
            /* @__PURE__ */ jsx180("p", { className: "font-semibold", children: tx.patient }),
            /* @__PURE__ */ jsx180("p", { className: "text-[10px] font-mono text-urvos-text-subtle", children: tx.abha })
          ] }),
          /* @__PURE__ */ jsx180("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs152("span", { className: clsx144("flex items-center gap-1 capitalize", statusStyle2[tx.status]), children: [
            statusIcon3[tx.status],
            " ",
            tx.status
          ] }) }),
          /* @__PURE__ */ jsx180("td", { className: "px-3 py-2.5 font-mono", children: tx.latency })
        ] }, tx.id)) })
      ] }) })
    ] })
  ] });
}

// components/templates/inventory-pharmacy/MedicationInventory.tsx
import { clsx as clsx145 } from "clsx";
import { jsx as jsx181, jsxs as jsxs153 } from "react/jsx-runtime";
function MedicationInventory({ className }) {
  const stockItems = [
    { id: "STK-1", name: "Tab. Telmisartan 40mg", batch: "B-9918", expiry: "2027-11-30", stock: 1200, unit: "Tabs", status: "Optimal" },
    { id: "STK-2", name: "Inj. Paracetamol 1000mg IV", batch: "B-4421", expiry: "2026-08-15", stock: 45, unit: "Vials", status: "Low Stock Warning" },
    { id: "STK-3", name: "Inj. Morphine Sulfate 10mg", batch: "N-0012", expiry: "2028-01-10", stock: 12, unit: "Ampoules", status: "Narcotic Controlled" }
  ];
  return /* @__PURE__ */ jsxs153("div", { className: clsx145("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs153("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs153("div", { children: [
        /* @__PURE__ */ jsx181("h1", { className: "text-xl font-bold text-urvos-text", children: "Hospital Pharmacy & Stock Inventory" }),
        /* @__PURE__ */ jsx181("p", { className: "text-xs text-urvos-text-subtle", children: "Stock levels, reorder thresholds, expiry alerts, and narcotic tracking" })
      ] }),
      /* @__PURE__ */ jsx181(Badge, { variant: "caution", children: "1 Low Stock Alert" })
    ] }),
    /* @__PURE__ */ jsx181("div", { className: "space-y-3", children: stockItems.map((item) => /* @__PURE__ */ jsxs153("div", { className: "p-3.5 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxs153("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsx181("div", { className: "font-bold text-urvos-text", children: item.name }),
        /* @__PURE__ */ jsxs153("div", { className: "text-[11px] text-urvos-text-subtle", children: [
          "Batch: ",
          item.batch,
          " \u2022 Expires: ",
          item.expiry
        ] })
      ] }),
      /* @__PURE__ */ jsxs153("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxs153("span", { className: "font-bold font-mono text-sm", children: [
          item.stock,
          " ",
          item.unit
        ] }),
        /* @__PURE__ */ jsx181(Badge, { variant: item.status.includes("Low") ? "caution" : item.status.includes("Narcotic") ? "critical" : "success", children: item.status })
      ] })
    ] }, item.id)) })
  ] });
}

// components/templates/inventory-pharmacy/PharmacyOrderDashboard.tsx
import { clsx as clsx146 } from "clsx";
import { jsx as jsx182, jsxs as jsxs154 } from "react/jsx-runtime";
function PharmacyOrderDashboard({ className }) {
  return /* @__PURE__ */ jsxs154("div", { className: clsx146("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs154("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs154("div", { children: [
        /* @__PURE__ */ jsx182("h1", { className: "text-xl font-bold text-urvos-text", children: "Pharmacy Dispensing & Order Queue" }),
        /* @__PURE__ */ jsx182("p", { className: "text-xs text-urvos-text-subtle", children: "Outpatient & Inpatient eRx queue, dispensing verification, and barcode print" })
      ] }),
      /* @__PURE__ */ jsx182(Badge, { variant: "caution", children: "3 Orders Pending Dispense" })
    ] }),
    /* @__PURE__ */ jsxs154("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs", children: [
      /* @__PURE__ */ jsxs154("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx182("span", { className: "font-bold text-urvos-text", children: "eRx #RX-9981 \u2022 Patient: Rajesh Kumar" }),
        /* @__PURE__ */ jsx182(Button, { size: "sm", children: "Dispense & Print Barcode" })
      ] }),
      /* @__PURE__ */ jsx182("p", { className: "text-urvos-text-subtle", children: "Medications: Tab. Telmisartan 40mg (30 tabs) \u2022 Tab. Pantoprazole 40mg (14 tabs)" })
    ] })
  ] });
}

// components/templates/inventory-pharmacy/NarcoticSubstanceLog.tsx
import { useState as useState61 } from "react";
import { clsx as clsx147 } from "clsx";
import { Lock as Lock5, AlertTriangle as AlertTriangle18, FileText as FileText18, CheckCircle2 as CheckCircle219, Search as Search12, User as User13, Clock as Clock16, Shield as Shield2 } from "lucide-react";
import { jsx as jsx183, jsxs as jsxs155 } from "react/jsx-runtime";
var controlledSubstances = [
  { id: 1, drug: "Morphine 10mg/mL", schedule: "II", vial: "LOT-2026-M-0441", qty: 10, unit: "vials", status: "sealed", location: "Narcotic Safe A" },
  { id: 2, drug: "Fentanyl 50mcg/mL", schedule: "II", vial: "LOT-2026-F-0812", qty: 5, unit: "ampoules", status: "sealed", location: "Narcotic Safe A" },
  { id: 3, drug: "Midazolam 5mg/mL", schedule: "IV", vial: "LOT-2026-MD-0221", qty: 20, unit: "vials", status: "sealed", location: "ICU Safe B" },
  { id: 4, drug: "Tramadol 100mg Tab", schedule: "IV", vial: "LOT-2026-TR-1114", qty: 50, unit: "tabs", status: "partial", location: "Ward Safe C" },
  { id: 5, drug: "Codeine 30mg Tab", schedule: "V", vial: "LOT-2026-CD-0992", qty: 30, unit: "tabs", status: "sealed", location: "OPD Safe D" }
];
var dispensingLog = [
  { id: 1, ts: "09:42", drug: "Morphine 4mg IV", patient: "Meena Iyer (MRN-4421)", dispensedBy: "PharmD. Renu", witnessedBy: "Nurse Anita Desai", orderedBy: "Dr. A. Sharma", wastes: 6, qty: 4 },
  { id: 2, ts: "08:30", drug: "Fentanyl 25mcg IV", patient: "Rajesh Kumar (MRN-8819)", dispensedBy: "PharmD. Suresh", witnessedBy: "Nurse R. Thomas", orderedBy: "Dr. P. Nair", wastes: 25, qty: 25 },
  { id: 3, ts: "07:00", drug: "Midazolam 2mg IV", patient: "Suresh Patel (MRN-7762)", dispensedBy: "PharmD. Renu", witnessedBy: "Nurse K. Singh", orderedBy: "Dr. V. Reddy", wastes: 3, qty: 2 }
];
function NarcoticSubstanceLog({ className }) {
  const [search, setSearch] = useState61("");
  const filtered = controlledSubstances.filter((c) => c.drug.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxs155("div", { className: clsx147("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs155("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs155("div", { children: [
        /* @__PURE__ */ jsxs155("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx183(Lock5, { className: "w-5 h-5 text-urvos-primary" }),
          " Narcotic Substance Log"
        ] }),
        /* @__PURE__ */ jsx183("p", { className: "text-xs text-urvos-text-subtle", children: "Schedule II\u2013V Controlled Substances \xB7 Dual-witness dispensing \xB7 NDPS Act compliant" })
      ] }),
      /* @__PURE__ */ jsxs155("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx183(Badge, { variant: "info", children: "NDPS Act 1985" }),
        /* @__PURE__ */ jsxs155(Button, { size: "sm", children: [
          /* @__PURE__ */ jsx183(FileText18, { className: "w-3.5 h-3.5 mr-1" }),
          " Audit Report"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx183("div", { className: "grid grid-cols-3 gap-3", children: [
      { label: "Total CS Drugs Tracked", value: controlledSubstances.length, icon: "\u{1F48A}", color: "text-urvos-text" },
      { label: "Today's Dispensings", value: dispensingLog.length, icon: "\u{1F4E4}", color: "text-blue-600" },
      { label: "Discrepancies Found", value: 0, icon: "\u26A0\uFE0F", color: "text-emerald-600" }
    ].map((s) => /* @__PURE__ */ jsxs155("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center", children: [
      /* @__PURE__ */ jsx183("div", { className: "text-2xl mb-1", children: s.icon }),
      /* @__PURE__ */ jsx183("p", { className: clsx147("text-2xl font-black", s.color), children: s.value }),
      /* @__PURE__ */ jsx183("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs155("div", { children: [
      /* @__PURE__ */ jsxs155("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxs155("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2", children: [
          /* @__PURE__ */ jsx183(Shield2, { className: "w-4 h-4 text-urvos-primary" }),
          " Current Stock"
        ] }),
        /* @__PURE__ */ jsxs155("div", { className: "relative", children: [
          /* @__PURE__ */ jsx183(Search12, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" }),
          /* @__PURE__ */ jsx183("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search drug...", className: "pl-8 pr-3 py-1.5 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsx183("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs155("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx183("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx183("tr", { children: ["Drug", "Schedule", "Lot Number", "Quantity", "Status", "Location"].map((col) => /* @__PURE__ */ jsx183("th", { className: "px-3 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase", children: col }, col)) }) }),
        /* @__PURE__ */ jsx183("tbody", { className: "divide-y divide-urvos-border", children: filtered.map((cs) => /* @__PURE__ */ jsxs155("tr", { className: "hover:bg-urvos-background transition-colors", children: [
          /* @__PURE__ */ jsx183("td", { className: "px-3 py-2.5 font-semibold", children: cs.drug }),
          /* @__PURE__ */ jsx183("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs155(Badge, { variant: cs.schedule === "II" ? "critical" : cs.schedule === "IV" ? "caution" : "info", className: "text-[10px]", children: [
            "Sch-",
            cs.schedule
          ] }) }),
          /* @__PURE__ */ jsx183("td", { className: "px-3 py-2.5 font-mono text-[10px] text-urvos-text-subtle", children: cs.vial }),
          /* @__PURE__ */ jsxs155("td", { className: "px-3 py-2.5 font-bold", children: [
            cs.qty,
            " ",
            cs.unit
          ] }),
          /* @__PURE__ */ jsx183("td", { className: "px-3 py-2.5", children: cs.status === "sealed" ? /* @__PURE__ */ jsxs155("span", { className: "text-emerald-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx183(CheckCircle219, { className: "w-3 h-3" }),
            " Sealed"
          ] }) : /* @__PURE__ */ jsxs155("span", { className: "text-amber-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx183(AlertTriangle18, { className: "w-3 h-3" }),
            " Open/Partial"
          ] }) }),
          /* @__PURE__ */ jsx183("td", { className: "px-3 py-2.5 text-urvos-text-subtle", children: cs.location })
        ] }, cs.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs155("div", { children: [
      /* @__PURE__ */ jsx183("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "Today's Dispensing Log" }),
      /* @__PURE__ */ jsx183("div", { className: "space-y-2", children: dispensingLog.map((log) => /* @__PURE__ */ jsx183("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-surface text-xs", children: /* @__PURE__ */ jsxs155("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs155("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs155("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx183(Clock16, { className: "w-3 h-3 text-urvos-text-subtle" }),
            /* @__PURE__ */ jsx183("span", { className: "font-mono text-urvos-text-subtle", children: log.ts }),
            /* @__PURE__ */ jsx183("span", { className: "font-bold", children: log.drug }),
            /* @__PURE__ */ jsxs155("span", { className: "text-urvos-text-subtle", children: [
              "\u2192 ",
              log.patient
            ] })
          ] }),
          /* @__PURE__ */ jsxs155("div", { className: "flex flex-wrap gap-3 mt-1 text-[10px] text-urvos-text-subtle", children: [
            /* @__PURE__ */ jsxs155("span", { children: [
              /* @__PURE__ */ jsx183(User13, { className: "w-3 h-3 inline mr-0.5" }),
              " Dispensed by: ",
              /* @__PURE__ */ jsx183("span", { className: "font-medium text-urvos-text", children: log.dispensedBy })
            ] }),
            /* @__PURE__ */ jsxs155("span", { children: [
              "Witnessed: ",
              /* @__PURE__ */ jsx183("span", { className: "font-medium text-urvos-text", children: log.witnessedBy })
            ] }),
            /* @__PURE__ */ jsxs155("span", { children: [
              "Ordered: ",
              /* @__PURE__ */ jsx183("span", { className: "font-medium text-urvos-text", children: log.orderedBy })
            ] })
          ] }),
          /* @__PURE__ */ jsxs155("div", { className: "flex gap-3 mt-1 text-[10px]", children: [
            /* @__PURE__ */ jsxs155("span", { className: "text-blue-600", children: [
              "Dispensed: ",
              log.qty,
              " mcg/mg"
            ] }),
            /* @__PURE__ */ jsxs155("span", { className: "text-amber-600", children: [
              "Wasted: ",
              log.wastes,
              " mcg/mg"
            ] }),
            /* @__PURE__ */ jsx183("span", { className: "text-emerald-600", children: "Total reconciled \u2713" })
          ] })
        ] }),
        /* @__PURE__ */ jsx183(CheckCircle219, { className: "w-5 h-5 text-emerald-500 shrink-0" })
      ] }) }, log.id)) })
    ] })
  ] });
}

// components/templates/surgical-services/OrScheduleBoard.tsx
import { clsx as clsx148 } from "clsx";
import { jsx as jsx184, jsxs as jsxs156 } from "react/jsx-runtime";
function OrScheduleBoard({ className }) {
  const cases = [
    { id: "OR-1", suite: "OR Suite 1", procedure: "Laparoscopic Cholecystectomy", patient: "Ramesh Gupta", surgeon: "Dr. V. Malhotra", status: "In-Progress", startTime: "08:30 AM" },
    { id: "OR-2", suite: "OR Suite 2", procedure: "Total Knee Arthroplasty", patient: "Sunita Rao", surgeon: "Dr. A. Kulkarni", status: "Pre-Op Prep", startTime: "10:00 AM" }
  ];
  return /* @__PURE__ */ jsxs156("div", { className: clsx148("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs156("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs156("div", { children: [
        /* @__PURE__ */ jsx184("h1", { className: "text-xl font-bold text-urvos-text", children: "Operating Room (OR) Master Schedule Board" }),
        /* @__PURE__ */ jsx184("p", { className: "text-xs text-urvos-text-subtle", children: "Suite turnover, anesthesia readiness, and intra-operative case tracking" })
      ] }),
      /* @__PURE__ */ jsx184(Badge, { variant: "caution", children: "2 OR Suites Active" })
    ] }),
    /* @__PURE__ */ jsx184("div", { className: "space-y-3", children: cases.map((c) => /* @__PURE__ */ jsxs156("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxs156("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs156("div", { className: "font-bold text-sm text-urvos-text", children: [
          c.suite,
          " \u2022 ",
          c.procedure
        ] }),
        /* @__PURE__ */ jsxs156("div", { className: "text-urvos-text-subtle", children: [
          "Patient: ",
          c.patient,
          " \u2022 Surgeon: ",
          c.surgeon,
          " \u2022 Start: ",
          c.startTime
        ] })
      ] }),
      /* @__PURE__ */ jsx184(Badge, { variant: c.status === "In-Progress" ? "success" : "caution", children: c.status })
    ] }, c.id)) })
  ] });
}

// components/templates/surgical-services/SurgicalCountLog.tsx
import { clsx as clsx149 } from "clsx";
import { jsx as jsx185, jsxs as jsxs157 } from "react/jsx-runtime";
function SurgicalCountLog({ className }) {
  return /* @__PURE__ */ jsxs157("div", { className: clsx149("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs157("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs157("div", { children: [
        /* @__PURE__ */ jsx185("h1", { className: "text-xl font-bold text-urvos-text", children: "Intra-Operative Surgical Safety Count Log" }),
        /* @__PURE__ */ jsx185("p", { className: "text-xs text-urvos-text-subtle", children: "Sponge, needle, & instrument reconciliation with dual-scrub witness verification" })
      ] }),
      /* @__PURE__ */ jsx185(Badge, { variant: "success", children: "Count Verified Correct" })
    ] }),
    /* @__PURE__ */ jsxs157("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-3 text-xs", children: [
      /* @__PURE__ */ jsxs157("div", { className: "grid grid-cols-3 gap-3 font-bold border-b border-urvos-border pb-2", children: [
        /* @__PURE__ */ jsx185("span", { children: "Item Category" }),
        /* @__PURE__ */ jsx185("span", { children: "Initial / Pre-Closure" }),
        /* @__PURE__ */ jsx185("span", { children: "Final Count Verification" })
      ] }),
      /* @__PURE__ */ jsxs157("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsx185("span", { children: "Lap Sponges (Ray-Tec)" }),
        /* @__PURE__ */ jsx185("span", { children: "10 / 10" }),
        /* @__PURE__ */ jsx185("span", { className: "text-emerald-600 font-bold", children: "10 Correct" })
      ] }),
      /* @__PURE__ */ jsxs157("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsx185("span", { children: "Suture Needles" }),
        /* @__PURE__ */ jsx185("span", { children: "12 / 12" }),
        /* @__PURE__ */ jsx185("span", { className: "text-emerald-600 font-bold", children: "12 Correct" })
      ] })
    ] })
  ] });
}

// components/templates/surgical-services/PrePostOpCarePlan.tsx
import { clsx as clsx150 } from "clsx";
import { jsx as jsx186, jsxs as jsxs158 } from "react/jsx-runtime";
function PrePostOpCarePlan({ className }) {
  return /* @__PURE__ */ jsxs158("div", { className: clsx150("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs158("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs158("div", { children: [
        /* @__PURE__ */ jsx186("h1", { className: "text-xl font-bold text-urvos-text", children: "Pre-Op & PACU Post-Op Surgical Checklist" }),
        /* @__PURE__ */ jsx186("p", { className: "text-xs text-urvos-text-subtle", children: "WHO Surgical Safety Checklist, NPO status, and PACU Aldrete Recovery Score" })
      ] }),
      /* @__PURE__ */ jsx186(Badge, { variant: "success", children: "Aldrete Score: 9/10 (Ready for Ward Transfer)" })
    ] }),
    /* @__PURE__ */ jsxs158("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs", children: [
      /* @__PURE__ */ jsx186("h3", { className: "font-bold text-sm text-urvos-text", children: "WHO Surgical Safety Check" }),
      /* @__PURE__ */ jsxs158("ul", { className: "space-y-1 text-urvos-text-subtle list-disc list-inside", children: [
        /* @__PURE__ */ jsx186("li", { children: "Patient Identity, Site & Procedure Confirmed" }),
        /* @__PURE__ */ jsx186("li", { children: "Surgical Site Marked by Surgeon" }),
        /* @__PURE__ */ jsx186("li", { children: "Anesthesia Machine & Medication Check Complete" })
      ] })
    ] })
  ] });
}

// components/templates/behavioral-rehab/Phq9Gad7Tracking.tsx
import { useState as useState62 } from "react";
import { clsx as clsx151 } from "clsx";
import { TrendingUp as TrendingUp5, TrendingDown as TrendingDown3 } from "lucide-react";
import { jsx as jsx187, jsxs as jsxs159 } from "react/jsx-runtime";
var phqData = [
  { visit: "Mar 2026", phq9: 18, gad7: 14, label: "Severe" },
  { visit: "Apr 2026", phq9: 15, gad7: 12, label: "Moderate-Severe" },
  { visit: "May 2026", phq9: 12, gad7: 10, label: "Moderate" },
  { visit: "Jun 2026", phq9: 9, gad7: 8, label: "Moderate" },
  { visit: "Jul 2026", phq9: 7, gad7: 6, label: "Mild" },
  { visit: "Jul-24", phq9: 5, gad7: 4, label: "Minimal" }
];
var phq9Qs = ["Anhedonia", "Depressed mood", "Sleep disturbance", "Fatigue", "Appetite changes", "Worthlessness", "Concentration issues", "Psychomotor changes", "Suicidal ideation"];
var currentPhqAnswers = [1, 1, 1, 0, 1, 0, 1, 0, 0];
var gad7Qs = ["Feeling anxious", "Uncontrollable worry", "Excessive worry", "Trouble relaxing", "Restlessness", "Irritability", "Fearful feelings"];
var currentGadAnswers = [1, 0, 1, 1, 0, 1, 0];
var answerLabel = ["Not at all", "Several days", "More than half", "Nearly every day"];
var answerStyle = ["bg-urvos-background", "bg-amber-50 border-amber-200", "bg-orange-50 border-orange-200", "bg-rose-50 border-rose-200"];
var yScale = (v, max = 27, h = 120) => h - v / max * h + 10;
var xScale = (i, total, w = 480) => 30 + i / (total - 1) * w;
function Phq9Gad7Tracking({ className }) {
  const [tab, setTab] = useState62("trend");
  const phq9Total = currentPhqAnswers.reduce((a, b) => a + b, 0);
  const gad7Total = currentGadAnswers.reduce((a, b) => a + b, 0);
  const prevPhq9 = phqData[phqData.length - 2].phq9;
  const improvement = prevPhq9 - phq9Total;
  return /* @__PURE__ */ jsxs159("div", { className: clsx151("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs159("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs159("div", { children: [
        /* @__PURE__ */ jsx187("h1", { className: "text-xl font-bold", children: "PHQ-9 & GAD-7 Tracking" }),
        /* @__PURE__ */ jsx187("p", { className: "text-xs text-urvos-text-subtle", children: "Arun Mehta \xB7 MRN-6612 \xB7 Depression & Anxiety Monitoring \xB7 Dr. K. Pillai (Psychiatry)" })
      ] }),
      /* @__PURE__ */ jsxs159("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs159(Badge, { variant: phq9Total <= 4 ? "success" : phq9Total <= 9 ? "info" : "caution", children: [
          "PHQ-9: ",
          phq9Total
        ] }),
        /* @__PURE__ */ jsxs159(Badge, { variant: gad7Total <= 4 ? "success" : gad7Total <= 9 ? "info" : "caution", children: [
          "GAD-7: ",
          gad7Total
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx187("div", { className: "grid grid-cols-2 gap-4", children: [
      { label: "PHQ-9 Score", value: phq9Total, max: 27, severity: phq9Total <= 4 ? "Minimal" : phq9Total <= 9 ? "Mild" : phq9Total <= 14 ? "Moderate" : "Severe", color: phq9Total <= 9 ? "text-emerald-600" : "text-amber-600" },
      { label: "GAD-7 Score", value: gad7Total, max: 21, severity: gad7Total <= 4 ? "Minimal" : gad7Total <= 9 ? "Mild" : gad7Total <= 14 ? "Moderate" : "Severe", color: gad7Total <= 9 ? "text-emerald-600" : "text-amber-600" }
    ].map((s) => /* @__PURE__ */ jsxs159("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
      /* @__PURE__ */ jsx187("p", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider", children: s.label }),
      /* @__PURE__ */ jsxs159("p", { className: clsx151("text-4xl font-black mt-1", s.color), children: [
        s.value,
        /* @__PURE__ */ jsxs159("span", { className: "text-lg text-urvos-text-subtle font-normal", children: [
          "/",
          s.max
        ] })
      ] }),
      /* @__PURE__ */ jsx187("p", { className: clsx151("text-sm font-semibold", s.color), children: s.severity }),
      /* @__PURE__ */ jsx187("div", { className: "mt-2 h-2 bg-urvos-background rounded-full overflow-hidden", children: /* @__PURE__ */ jsx187("div", { className: clsx151("h-full rounded-full", s.value <= 9 ? "bg-emerald-500" : s.value <= 14 ? "bg-amber-500" : "bg-rose-500"), style: { width: `${s.value / s.max * 100}%` } }) })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs159("div", { className: clsx151("flex items-center gap-3 p-3 rounded-xl border text-sm font-semibold", improvement > 0 ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"), children: [
      improvement > 0 ? /* @__PURE__ */ jsx187(TrendingDown3, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx187(TrendingUp5, { className: "w-5 h-5" }),
      "PHQ-9 ",
      improvement > 0 ? `improved by ${improvement} points` : `unchanged`,
      " since last visit. Continue current treatment plan."
    ] }),
    /* @__PURE__ */ jsx187("div", { className: "flex gap-1 border-b border-urvos-border", children: ["trend", "phq9", "gad7"].map((t) => /* @__PURE__ */ jsx187("button", { onClick: () => setTab(t), className: clsx151("px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors -mb-px border-b-2", tab === t ? "border-urvos-primary text-urvos-primary" : "border-transparent text-urvos-text-subtle hover:text-urvos-text"), children: t === "trend" ? "\u{1F4C8} Trend Chart" : t === "phq9" ? "PHQ-9 Detail" : "GAD-7 Detail" }, t)) }),
    tab === "trend" && /* @__PURE__ */ jsx187("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface overflow-x-auto", children: /* @__PURE__ */ jsxs159("svg", { viewBox: "0 0 540 160", className: "w-full min-w-[480px]", children: [
      [0, 5, 10, 15, 20, 27].map((v) => /* @__PURE__ */ jsxs159("g", { children: [
        /* @__PURE__ */ jsx187("line", { x1: "25", x2: "515", y1: yScale(v), y2: yScale(v), stroke: "#e2e8f0", strokeWidth: "0.5" }),
        /* @__PURE__ */ jsx187("text", { x: "20", y: yScale(v) + 4, textAnchor: "end", fontSize: "8", fill: "#94a3b8", children: v })
      ] }, v)),
      phqData.map((d, i) => /* @__PURE__ */ jsx187("text", { x: xScale(i, phqData.length), y: 155, textAnchor: "middle", fontSize: "8", fill: "#94a3b8", children: d.visit }, i)),
      /* @__PURE__ */ jsx187("polyline", { points: phqData.map((d, i) => `${xScale(i, phqData.length)},${yScale(d.phq9)}`).join(" "), fill: "none", stroke: "#6366f1", strokeWidth: "2.5" }),
      phqData.map((d, i) => /* @__PURE__ */ jsx187("circle", { cx: xScale(i, phqData.length), cy: yScale(d.phq9), r: "4", fill: "#6366f1", stroke: "white", strokeWidth: "1.5" }, i)),
      /* @__PURE__ */ jsx187("polyline", { points: phqData.map((d, i) => `${xScale(i, phqData.length)},${yScale(d.gad7)}`).join(" "), fill: "none", stroke: "#f59e0b", strokeWidth: "2", strokeDasharray: "4,2" }),
      phqData.map((d, i) => /* @__PURE__ */ jsx187("circle", { cx: xScale(i, phqData.length), cy: yScale(d.gad7), r: "3.5", fill: "#f59e0b", stroke: "white", strokeWidth: "1.5" }, i)),
      /* @__PURE__ */ jsx187("circle", { cx: "60", cy: "145", r: "4", fill: "#6366f1" }),
      /* @__PURE__ */ jsx187("text", { x: "68", y: "149", fontSize: "8", fill: "#64748b", children: "PHQ-9" }),
      /* @__PURE__ */ jsx187("circle", { cx: "110", cy: "145", r: "4", fill: "#f59e0b" }),
      /* @__PURE__ */ jsx187("text", { x: "118", y: "149", fontSize: "8", fill: "#64748b", children: "GAD-7" })
    ] }) }),
    tab === "phq9" && /* @__PURE__ */ jsxs159("div", { className: "space-y-2", children: [
      phq9Qs.map((q, i) => /* @__PURE__ */ jsxs159("div", { className: clsx151("flex items-center gap-3 p-3 rounded-xl border text-xs", answerStyle[currentPhqAnswers[i]]), children: [
        /* @__PURE__ */ jsx187("span", { className: "w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-bold shrink-0", children: i + 1 }),
        /* @__PURE__ */ jsx187("span", { className: "flex-1 font-medium", children: q }),
        /* @__PURE__ */ jsxs159(Badge, { variant: currentPhqAnswers[i] === 0 ? "success" : currentPhqAnswers[i] === 1 ? "info" : "critical", className: "text-[10px] shrink-0", children: [
          answerLabel[currentPhqAnswers[i]],
          " (",
          currentPhqAnswers[i],
          ")"
        ] })
      ] }, q)),
      /* @__PURE__ */ jsxs159("p", { className: "text-xs font-bold text-urvos-text-subtle text-right pt-2", children: [
        "Total: ",
        phq9Total,
        " / 27"
      ] })
    ] }),
    tab === "gad7" && /* @__PURE__ */ jsxs159("div", { className: "space-y-2", children: [
      gad7Qs.map((q, i) => /* @__PURE__ */ jsxs159("div", { className: clsx151("flex items-center gap-3 p-3 rounded-xl border text-xs", answerStyle[currentGadAnswers[i]]), children: [
        /* @__PURE__ */ jsx187("span", { className: "w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-bold shrink-0", children: i + 1 }),
        /* @__PURE__ */ jsx187("span", { className: "flex-1 font-medium", children: q }),
        /* @__PURE__ */ jsxs159(Badge, { variant: currentGadAnswers[i] === 0 ? "success" : currentGadAnswers[i] === 1 ? "info" : "critical", className: "text-[10px] shrink-0", children: [
          answerLabel[currentGadAnswers[i]],
          " (",
          currentGadAnswers[i],
          ")"
        ] })
      ] }, q)),
      /* @__PURE__ */ jsxs159("p", { className: "text-xs font-bold text-urvos-text-subtle text-right pt-2", children: [
        "Total: ",
        gad7Total,
        " / 21"
      ] })
    ] })
  ] });
}

// components/templates/behavioral-rehab/TherapyPlanViewer.tsx
import { useState as useState63 } from "react";
import { clsx as clsx152 } from "clsx";
import { BookOpen as BookOpen3, Heart as Heart4, Clock as Clock17, CheckCircle2 as CheckCircle221, User as User14, AlertTriangle as AlertTriangle20, Plus as Plus9 } from "lucide-react";
import { jsx as jsx188, jsxs as jsxs160 } from "react/jsx-runtime";
var sessions = [
  { id: 1, patient: "Arun Mehta", mrn: "MRN-6612", date: "Mon, 21 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "CBT \u2014 Individual", goals: "Cognitive restructuring, thought journalling", status: "completed", notes: "Patient showed improved affect. Completed thought record exercise independently." },
  { id: 2, patient: "Arun Mehta", mrn: "MRN-6612", date: "Wed, 23 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "CBT \u2014 Individual", goals: "Behavioral activation, scheduling pleasant activities", status: "completed", notes: "Completed weekly activity schedule. Walked 20 min daily." },
  { id: 3, patient: "Arun Mehta", mrn: "MRN-6612", date: "Fri, 25 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "Group Therapy \u2014 Social Anxiety", goals: "Peer interaction, graded exposure", status: "scheduled", notes: "" },
  { id: 4, patient: "Arun Mehta", mrn: "MRN-6612", date: "Mon, 28 Jul", time: "10:00 AM", therapist: "Dr. K. Pillai", type: "Family Session", goals: "Psychoeducation, communication skills", status: "scheduled", notes: "" }
];
var sessionStatusStyle = {
  completed: "bg-emerald-50 border-emerald-200 text-emerald-700",
  scheduled: "bg-blue-50 border-blue-200 text-blue-700",
  missed: "bg-rose-50 border-rose-200 text-rose-700",
  cancelled: "bg-slate-50 border-slate-200 text-slate-500"
};
var sessionStatusIcon = {
  completed: /* @__PURE__ */ jsx188(CheckCircle221, { className: "w-3.5 h-3.5" }),
  scheduled: /* @__PURE__ */ jsx188(Clock17, { className: "w-3.5 h-3.5" }),
  missed: /* @__PURE__ */ jsx188(AlertTriangle20, { className: "w-3.5 h-3.5" }),
  cancelled: /* @__PURE__ */ jsx188(AlertTriangle20, { className: "w-3.5 h-3.5" })
};
var treatmentGoals = [
  { goal: "Reduce PHQ-9 score to < 5 (minimal depression)", progress: 85, current: 5, target: 5, achieved: true },
  { goal: "Eliminate suicidal ideation (Item 9 = 0)", progress: 100, current: 0, target: 0, achieved: true },
  { goal: "Improve sleep \u2014 7+ hours without medication", progress: 60, current: 5.5, target: 7, achieved: false },
  { goal: "Return to work (part-time initially)", progress: 30, current: null, target: null, achieved: false }
];
function TherapyPlanViewer({ className }) {
  const [selected, setSelected] = useState63(0);
  const active = sessions[selected];
  return /* @__PURE__ */ jsxs160("div", { className: clsx152("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs160("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs160("div", { children: [
        /* @__PURE__ */ jsxs160("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx188(BookOpen3, { className: "w-5 h-5 text-urvos-primary" }),
          " Therapy Plan Viewer"
        ] }),
        /* @__PURE__ */ jsx188("p", { className: "text-xs text-urvos-text-subtle", children: "Arun Mehta \xB7 MRN-6612 \xB7 CBT Program \u2014 Major Depressive Disorder \xB7 Week 8 of 12" })
      ] }),
      /* @__PURE__ */ jsxs160("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs160(Button, { size: "sm", variant: "secondary", children: [
          /* @__PURE__ */ jsx188(Plus9, { className: "w-3.5 h-3.5 mr-1" }),
          " Add Session"
        ] }),
        /* @__PURE__ */ jsx188(Button, { size: "sm", children: "Update Goals" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs160("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-3", children: [
      /* @__PURE__ */ jsxs160("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2", children: [
        /* @__PURE__ */ jsx188(Heart4, { className: "w-4 h-4 text-urvos-primary" }),
        " Treatment Goals"
      ] }),
      treatmentGoals.map((g, i) => /* @__PURE__ */ jsxs160("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxs160("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsx188("p", { className: "text-xs font-medium flex-1", children: g.goal }),
          g.achieved ? /* @__PURE__ */ jsxs160("span", { className: "text-emerald-600 flex items-center gap-1 text-xs font-semibold shrink-0", children: [
            /* @__PURE__ */ jsx188(CheckCircle221, { className: "w-3.5 h-3.5" }),
            " Achieved"
          ] }) : /* @__PURE__ */ jsxs160("span", { className: "text-xs font-semibold text-amber-600 shrink-0", children: [
            g.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx188("div", { className: "h-1.5 bg-urvos-background rounded-full overflow-hidden", children: /* @__PURE__ */ jsx188("div", { className: clsx152("h-full rounded-full transition-all", g.achieved ? "bg-emerald-500" : "bg-urvos-primary"), style: { width: `${g.progress}%` } }) })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs160("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs160("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx188("h2", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider", children: "Session Roster" }),
        sessions.map((s, i) => /* @__PURE__ */ jsx188("button", { onClick: () => setSelected(i), className: clsx152("w-full text-left p-3 rounded-xl border transition-all", selected === i ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background"), children: /* @__PURE__ */ jsxs160("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs160("div", { children: [
            /* @__PURE__ */ jsxs160("p", { className: "text-xs font-semibold", children: [
              s.date,
              " \xB7 ",
              s.time
            ] }),
            /* @__PURE__ */ jsx188("p", { className: "text-xs text-urvos-primary font-medium", children: s.type }),
            /* @__PURE__ */ jsx188("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5", children: s.therapist })
          ] }),
          /* @__PURE__ */ jsxs160("span", { className: clsx152("flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize", sessionStatusStyle[s.status]), children: [
            sessionStatusIcon[s.status],
            " ",
            s.status
          ] })
        ] }) }, s.id))
      ] }),
      /* @__PURE__ */ jsxs160("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4", children: [
        /* @__PURE__ */ jsxs160("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs160("div", { children: [
            /* @__PURE__ */ jsxs160("p", { className: "font-bold text-sm", children: [
              active.date,
              " at ",
              active.time
            ] }),
            /* @__PURE__ */ jsx188("p", { className: "text-xs text-urvos-primary font-medium", children: active.type })
          ] }),
          /* @__PURE__ */ jsxs160("span", { className: clsx152("flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border", sessionStatusStyle[active.status]), children: [
            sessionStatusIcon[active.status],
            " ",
            active.status.charAt(0).toUpperCase() + active.status.slice(1)
          ] })
        ] }),
        /* @__PURE__ */ jsxs160("div", { className: "space-y-1 text-xs", children: [
          /* @__PURE__ */ jsxs160("div", { className: "flex items-center gap-2 text-urvos-text-subtle", children: [
            /* @__PURE__ */ jsx188(User14, { className: "w-3.5 h-3.5" }),
            " ",
            /* @__PURE__ */ jsx188("span", { className: "font-medium text-urvos-text", children: active.therapist })
          ] }),
          /* @__PURE__ */ jsxs160("div", { className: "flex items-center gap-2 text-urvos-text-subtle", children: [
            /* @__PURE__ */ jsx188(Clock17, { className: "w-3.5 h-3.5" }),
            " ",
            /* @__PURE__ */ jsx188("span", { className: "font-medium text-urvos-text", children: "50 minute session" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs160("div", { children: [
          /* @__PURE__ */ jsx188("p", { className: "text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1", children: "Session Goals" }),
          /* @__PURE__ */ jsx188("p", { className: "text-xs leading-relaxed", children: active.goals })
        ] }),
        active.notes && /* @__PURE__ */ jsxs160("div", { children: [
          /* @__PURE__ */ jsx188("p", { className: "text-[10px] font-bold text-urvos-text-subtle uppercase tracking-wider mb-1", children: "Therapist Notes" }),
          /* @__PURE__ */ jsx188("div", { className: "p-3 rounded-lg bg-urvos-background border border-urvos-border text-xs leading-relaxed", children: active.notes })
        ] }),
        active.status === "scheduled" && /* @__PURE__ */ jsxs160("div", { className: "flex gap-2 pt-2 border-t border-urvos-border", children: [
          /* @__PURE__ */ jsx188(Button, { size: "sm", className: "flex-1 justify-center", children: "Start Session" }),
          /* @__PURE__ */ jsx188(Button, { size: "sm", variant: "secondary", children: "Reschedule" })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/home-health/RemoteMonitoringDashboard.tsx
import { useState as useState64 } from "react";
import { clsx as clsx153 } from "clsx";
import { Heart as Heart5, Wifi as Wifi2, WifiOff, Bell as Bell7, AlertTriangle as AlertTriangle21, CheckCircle2 as CheckCircle222 } from "lucide-react";
import { jsx as jsx189, jsxs as jsxs161 } from "react/jsx-runtime";
var patients = [
  { id: 1, name: "Rajesh Kumar", mrn: "MRN-8819", condition: "Post-ACS monitoring", hr: 72, bp: "124/80", spo2: 98, temp: 37.1, rr: 16, status: "stable", connected: true },
  { id: 2, name: "Meena Iyer", mrn: "MRN-4421", condition: "CHF \u2014 cardiac rehab", hr: 88, bp: "138/90", spo2: 94, temp: 37.3, rr: 19, status: "warning", connected: true },
  { id: 3, name: "Suresh Patel", mrn: "MRN-7762", condition: "COPD \u2014 home O2", hr: 92, bp: "145/95", spo2: 91, temp: 36.8, rr: 22, status: "critical", connected: true },
  { id: 4, name: "Kavitha Nair", mrn: "MRN-5530", condition: "Gestational DM", hr: 78, bp: "110/70", spo2: 99, temp: 37, rr: 15, status: "stable", connected: false }
];
var statusColor = { stable: "border-emerald-200 bg-emerald-50/50", warning: "border-amber-200 bg-amber-50/50", critical: "border-rose-300 bg-rose-50/50" };
var statusDot = { stable: "bg-emerald-500", warning: "bg-amber-500 animate-pulse", critical: "bg-rose-600 animate-pulse" };
var statusBadge = { stable: "success", warning: "caution", critical: "critical" };
function VitalChip({ label, value, unit, alert }) {
  return /* @__PURE__ */ jsxs161("div", { className: clsx153("flex flex-col items-center px-2.5 py-2 rounded-lg border text-center min-w-[60px]", alert ? "border-rose-200 bg-rose-50" : "border-urvos-border bg-urvos-background"), children: [
    /* @__PURE__ */ jsx189("p", { className: clsx153("text-base font-black leading-tight", alert ? "text-rose-600" : "text-urvos-text"), children: value }),
    /* @__PURE__ */ jsx189("p", { className: clsx153("text-[10px]", alert ? "text-rose-500" : "text-urvos-text-subtle"), children: unit }),
    /* @__PURE__ */ jsx189("p", { className: "text-[9px] text-urvos-text-subtle mt-0.5", children: label })
  ] });
}
function RemoteMonitoringDashboard({ className }) {
  const [selected, setSelected] = useState64(1);
  const active = patients.find((p) => p.id === selected);
  return /* @__PURE__ */ jsxs161("div", { className: clsx153("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs161("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs161("div", { children: [
        /* @__PURE__ */ jsxs161("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx189(Wifi2, { className: "w-5 h-5 text-urvos-primary" }),
          " Remote Patient Monitoring"
        ] }),
        /* @__PURE__ */ jsx189("p", { className: "text-xs text-urvos-text-subtle", children: "4 patients \xB7 Live vitals stream \xB7 Auto-alert at threshold breach" })
      ] }),
      /* @__PURE__ */ jsxs161("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx189(Badge, { variant: "success", children: "3 Online" }),
        /* @__PURE__ */ jsx189(Badge, { variant: "neutral", children: "1 Offline" }),
        /* @__PURE__ */ jsx189(Badge, { variant: "critical", children: "1 Critical" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs161("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsx189("div", { className: "space-y-2", children: patients.map((p) => /* @__PURE__ */ jsx189("button", { onClick: () => setSelected(p.id), className: clsx153("w-full text-left p-3 rounded-xl border-2 transition-all", selected === p.id ? "border-urvos-primary bg-urvos-primary/5" : statusColor[p.status] + " hover:opacity-90"), children: /* @__PURE__ */ jsxs161("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxs161("div", { className: "relative mt-0.5", children: [
          /* @__PURE__ */ jsx189("div", { className: "w-8 h-8 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold", children: p.name.split(" ").map((n) => n[0]).join("") }),
          /* @__PURE__ */ jsx189("span", { className: clsx153("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-urvos-surface", p.connected ? statusDot[p.status] : "bg-slate-400") })
        ] }),
        /* @__PURE__ */ jsxs161("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs161("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ jsx189("p", { className: "text-xs font-semibold truncate", children: p.name }),
            /* @__PURE__ */ jsx189(Badge, { variant: statusBadge[p.status], className: "text-[9px] py-0 shrink-0", children: p.status })
          ] }),
          /* @__PURE__ */ jsx189("p", { className: "text-[10px] text-urvos-text-subtle", children: p.mrn }),
          /* @__PURE__ */ jsx189("p", { className: "text-[10px] text-urvos-text-subtle truncate mt-0.5", children: p.condition }),
          /* @__PURE__ */ jsxs161("div", { className: "flex items-center gap-3 mt-1 text-[10px] font-semibold", children: [
            /* @__PURE__ */ jsxs161("span", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsx189(Heart5, { className: "w-2.5 h-2.5 text-rose-500" }),
              p.hr
            ] }),
            /* @__PURE__ */ jsx189("span", { children: p.bp }),
            /* @__PURE__ */ jsxs161("span", { className: clsx153(p.spo2 < 94 ? "text-rose-600" : "text-emerald-600"), children: [
              "SpO\u2082 ",
              p.spo2,
              "%"
            ] })
          ] })
        ] })
      ] }) }, p.id)) }),
      /* @__PURE__ */ jsxs161("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxs161("div", { className: clsx153("p-4 rounded-xl border-2 space-y-4", statusColor[active.status]), children: [
          /* @__PURE__ */ jsxs161("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs161("div", { children: [
              /* @__PURE__ */ jsx189("p", { className: "font-bold text-base", children: active.name }),
              /* @__PURE__ */ jsxs161("p", { className: "text-xs text-urvos-text-subtle", children: [
                active.mrn,
                " \xB7 ",
                active.condition
              ] })
            ] }),
            /* @__PURE__ */ jsxs161("div", { className: "flex items-center gap-2", children: [
              active.connected ? /* @__PURE__ */ jsx189(Wifi2, { className: "w-4 h-4 text-emerald-600" }) : /* @__PURE__ */ jsx189(WifiOff, { className: "w-4 h-4 text-slate-400" }),
              /* @__PURE__ */ jsx189(Badge, { variant: statusBadge[active.status], children: active.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxs161("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx189(VitalChip, { label: "Heart Rate", value: active.hr, unit: "bpm", alert: active.hr > 100 || active.hr < 50 }),
            /* @__PURE__ */ jsx189(VitalChip, { label: "Blood Pressure", value: active.bp, unit: "mmHg", alert: parseInt(active.bp.split("/")[0]) > 140 }),
            /* @__PURE__ */ jsx189(VitalChip, { label: "SpO\u2082", value: active.spo2, unit: "%", alert: active.spo2 < 94 }),
            /* @__PURE__ */ jsx189(VitalChip, { label: "Temperature", value: active.temp, unit: "\xB0C", alert: active.temp > 38.5 }),
            /* @__PURE__ */ jsx189(VitalChip, { label: "Resp. Rate", value: active.rr, unit: "/min", alert: active.rr > 20 || active.rr < 12 })
          ] }),
          active.status === "critical" && /* @__PURE__ */ jsxs161("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-rose-600 text-white text-sm font-semibold", children: [
            /* @__PURE__ */ jsx189(AlertTriangle21, { className: "w-5 h-5 shrink-0" }),
            "SpO\u2082 ",
            active.spo2,
            "% \u2014 Below threshold (94%). Oxygen therapy review required immediately."
          ] }),
          active.status === "warning" && /* @__PURE__ */ jsxs161("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-amber-500 text-white text-sm font-semibold", children: [
            /* @__PURE__ */ jsx189(Bell7, { className: "w-5 h-5 shrink-0" }),
            "BP elevated at ",
            active.bp,
            " mmHg. Review antihypertensive plan."
          ] }),
          active.status === "stable" && /* @__PURE__ */ jsxs161("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-200 text-emerald-700 text-sm font-semibold", children: [
            /* @__PURE__ */ jsx189(CheckCircle222, { className: "w-5 h-5 shrink-0" }),
            "All vitals within target range. Continue current monitoring protocol."
          ] })
        ] }),
        /* @__PURE__ */ jsxs161("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
          /* @__PURE__ */ jsx189("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "HR Trend \u2014 Last 12h" }),
          /* @__PURE__ */ jsxs161("svg", { viewBox: "0 0 400 60", className: "w-full", children: [
            /* @__PURE__ */ jsx189("polyline", { points: "0,40 30,38 60,35 90,42 120,38 150,32 180,36 210,30 240,35 270,33 300,36 330,34 360,32 390,35", fill: "none", stroke: "var(--color-urvos-primary, #3b82f6)", strokeWidth: "2" }),
            /* @__PURE__ */ jsx189("polyline", { points: "0,40 30,38 60,35 90,42 120,38 150,32 180,36 210,30 240,35 270,33 300,36 330,34 360,32 390,35 390,60 0,60", fill: "var(--color-urvos-primary, #3b82f6)", fillOpacity: "0.1" })
          ] }),
          /* @__PURE__ */ jsxs161("div", { className: "flex justify-between text-[10px] text-urvos-text-subtle mt-1", children: [
            /* @__PURE__ */ jsx189("span", { children: "12h ago" }),
            /* @__PURE__ */ jsx189("span", { children: "6h ago" }),
            /* @__PURE__ */ jsx189("span", { children: "Now" })
          ] })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/home-health/HomeHealthScheduler.tsx
import { clsx as clsx154 } from "clsx";
import { jsx as jsx190, jsxs as jsxs162 } from "react/jsx-runtime";
function HomeHealthScheduler({ className }) {
  return /* @__PURE__ */ jsxs162("div", { className: clsx154("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs162("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs162("div", { children: [
        /* @__PURE__ */ jsx190("h1", { className: "text-xl font-bold text-urvos-text", children: "Home Visit Care Scheduler & Nurse Routing" }),
        /* @__PURE__ */ jsx190("p", { className: "text-xs text-urvos-text-subtle", children: "Home nurse dispatch, GPS routing, and home blood draw appointments" })
      ] }),
      /* @__PURE__ */ jsx190(Badge, { variant: "info", children: "3 Home Visits Scheduled Today" })
    ] }),
    /* @__PURE__ */ jsxs162("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs", children: [
      /* @__PURE__ */ jsx190("div", { className: "font-bold text-sm text-urvos-text", children: "Nurse: Sister Lakshmi (RN)" }),
      /* @__PURE__ */ jsx190("div", { className: "text-urvos-text-subtle", children: "Visit 1 (10:00 AM): Wound Dressing Change \u2022 Patient: Mrs. Kapadia" })
    ] })
  ] });
}

// components/templates/emergency-inpatient/TriageDashboard.tsx
import { clsx as clsx155 } from "clsx";
import { jsx as jsx191, jsxs as jsxs163 } from "react/jsx-runtime";
function TriageDashboard({ className }) {
  const triageQueue = [
    { id: "TR-1", patient: "Sunil Varma", esiLevel: "ESI Level 1 (Resuscitation)", complaint: "Acute Respiratory Arrest", waitTime: "0 mins" },
    { id: "TR-2", patient: "Aarti Deshmukh", esiLevel: "ESI Level 2 (Emergent)", complaint: "Chest Pain / STEMI suspect", waitTime: "4 mins" },
    { id: "TR-3", patient: "Karan Patel", esiLevel: "ESI Level 3 (Urgent)", complaint: "Abdominal Pain", waitTime: "18 mins" }
  ];
  return /* @__PURE__ */ jsxs163("div", { className: clsx155("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs163("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs163("div", { children: [
        /* @__PURE__ */ jsx191("h1", { className: "text-xl font-bold text-urvos-text", children: "Emergency Department Triage (ESI 1-5)" }),
        /* @__PURE__ */ jsx191("p", { className: "text-xs text-urvos-text-subtle", children: "Emergency Severity Index acuity assignment & waiting room queue" })
      ] }),
      /* @__PURE__ */ jsx191(Badge, { variant: "critical", children: "1 ESI-1 STAT Critical" })
    ] }),
    /* @__PURE__ */ jsx191("div", { className: "space-y-3", children: triageQueue.map((t) => /* @__PURE__ */ jsxs163("div", { className: clsx155("p-4 border rounded-xl flex items-center justify-between text-xs", t.esiLevel.includes("Level 1") ? "bg-rose-500/10 border-rose-500/30" : "bg-urvos-surface border-urvos-border"), children: [
      /* @__PURE__ */ jsxs163("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs163("div", { className: "font-bold text-sm text-urvos-text", children: [
          t.patient,
          " (",
          t.esiLevel,
          ")"
        ] }),
        /* @__PURE__ */ jsxs163("div", { className: "text-urvos-text-subtle", children: [
          "Complaint: ",
          t.complaint,
          " \u2022 Waiting: ",
          t.waitTime
        ] })
      ] }),
      /* @__PURE__ */ jsx191(Badge, { variant: t.esiLevel.includes("Level 1") ? "critical" : t.esiLevel.includes("Level 2") ? "caution" : "neutral", children: t.esiLevel.split(" ")[2] })
    ] }, t.id)) })
  ] });
}

// components/templates/emergency-inpatient/BedManagementSystem.tsx
import { clsx as clsx156 } from "clsx";
import { jsx as jsx192, jsxs as jsxs164 } from "react/jsx-runtime";
function BedManagementSystem({ className }) {
  const beds = [
    { bed: "301", patient: "Rajesh Kumar", status: "Occupied", housekeeping: "Clean" },
    { bed: "302", patient: "Vikram Seth", status: "Occupied", housekeeping: "Clean" },
    { bed: "303", patient: "Vacant", status: "Available", housekeeping: "Sanitized & Ready" },
    { bed: "304", patient: "Discharging", status: "Pending Discharge", housekeeping: "Cleaning Required" }
  ];
  return /* @__PURE__ */ jsxs164("div", { className: clsx156("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs164("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs164("div", { children: [
        /* @__PURE__ */ jsx192("h1", { className: "text-xl font-bold text-urvos-text", children: "Inpatient Ward Bed Management (Ward 3B)" }),
        /* @__PURE__ */ jsx192("p", { className: "text-xs text-urvos-text-subtle", children: "Real-time bed availability, housekeeping status, and discharge queue" })
      ] }),
      /* @__PURE__ */ jsx192(Badge, { variant: "success", children: "1 Bed Available" })
    ] }),
    /* @__PURE__ */ jsx192("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: beds.map((b) => /* @__PURE__ */ jsxs164("div", { className: "p-4 bg-urvos-surface border border-urvos-border rounded-xl space-y-2 text-xs", children: [
      /* @__PURE__ */ jsxs164("div", { className: "flex justify-between items-center font-bold", children: [
        /* @__PURE__ */ jsxs164("span", { children: [
          "Bed ",
          b.bed
        ] }),
        /* @__PURE__ */ jsx192(Badge, { variant: b.status === "Available" ? "success" : b.status === "Occupied" ? "neutral" : "caution", children: b.status })
      ] }),
      /* @__PURE__ */ jsx192("div", { className: "text-urvos-text font-semibold", children: b.patient }),
      /* @__PURE__ */ jsxs164("div", { className: "text-[10px] text-urvos-text-subtle", children: [
        "HK: ",
        b.housekeeping
      ] })
    ] }, b.bed)) })
  ] });
}

// components/templates/emergency-inpatient/EmergencyCodeManager.tsx
import { useState as useState65 } from "react";
import { clsx as clsx157 } from "clsx";
import { Radio as Radio3, Activity as Activity14, CheckCircle2 as CheckCircle223, Zap as Zap2 } from "lucide-react";
import { jsx as jsx193, jsxs as jsxs165 } from "react/jsx-runtime";
var codes = [
  { code: "blue", label: "Code Blue", desc: "Cardiac / Respiratory Arrest", color: "bg-blue-600 text-white border-blue-600", active: true },
  { code: "red", label: "Code Red", desc: "Fire Emergency", color: "bg-rose-600 text-white border-rose-600", active: false },
  { code: "black", label: "Code Black", desc: "Bomb Threat / Security", color: "bg-gray-900 text-white border-gray-900", active: false },
  { code: "yellow", label: "Code Yellow", desc: "Internal Disaster / Mass Casualty", color: "bg-amber-500 text-white border-amber-500", active: false }
];
var codeBlueLog = [
  { time: "09:42:05", actor: "Nurse Anita Desai (ICU)", msg: "Code Blue activated \u2014 Bed 14A \u2014 Meena Iyer, MRN-4421 \u2014 Cardiac arrest", type: "activation" },
  { time: "09:42:12", actor: "System", msg: "Alert broadcast sent to Crash Team: Dr. Sharma, Dr. Nair, Anesthesia, Pharmacy", type: "system" },
  { time: "09:42:30", actor: "Dr. A. Sharma", msg: "On my way \u2014 3 minutes out", type: "response" },
  { time: "09:42:45", actor: "Dr. P. Nair (Cardio)", msg: "Acknowledged. CPR started? Defib ready?", type: "response" },
  { time: "09:43:00", actor: "Nurse Anita Desai", msg: "CPR in progress. AED attached. Rhythm: VF", type: "update" },
  { time: "09:43:10", actor: "System", msg: "Crash cart dispatched to ICU Bed 14A", type: "system" },
  { time: "09:44:00", actor: "Dr. A. Sharma", msg: "Arrived. Shock delivered 200J. Resuming CPR.", type: "update" },
  { time: "09:47:30", actor: "Dr. A. Sharma", msg: "ROSC achieved. Sinus rhythm. Moving to monitored bed.", type: "resolved" }
];
var logStyle = {
  activation: "border-rose-200 bg-rose-50 text-rose-700",
  system: "border-urvos-border bg-urvos-background text-urvos-text-subtle",
  response: "border-blue-200 bg-blue-50 text-blue-700",
  update: "border-amber-200 bg-amber-50 text-amber-700",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-700"
};
function EmergencyCodeManager({ className }) {
  const [activeCode, setActiveCode] = useState65("blue");
  const [broadcastMsg, setBroadcastMsg] = useState65("");
  return /* @__PURE__ */ jsxs165("div", { className: clsx157("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs165("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs165("div", { children: [
        /* @__PURE__ */ jsxs165("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx193(Radio3, { className: "w-5 h-5 text-rose-600 animate-pulse" }),
          " Emergency Code Manager"
        ] }),
        /* @__PURE__ */ jsx193("p", { className: "text-xs text-urvos-text-subtle", children: "Apollo Hospitals, Mumbai \xB7 Broadcast to all departments instantly" })
      ] }),
      /* @__PURE__ */ jsx193(Badge, { variant: "critical", children: "1 Active Code" })
    ] }),
    /* @__PURE__ */ jsx193("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: codes.map((c) => /* @__PURE__ */ jsxs165("button", { onClick: () => setActiveCode(activeCode === c.code ? null : c.code), className: clsx157("p-3 rounded-xl border-2 text-left transition-all", c.active ? c.color + " shadow-lg" : "bg-urvos-surface border-urvos-border text-urvos-text hover:bg-urvos-background"), children: [
      /* @__PURE__ */ jsxs165("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx193("p", { className: "font-bold text-sm", children: c.label }),
        c.active && /* @__PURE__ */ jsx193("span", { className: "w-2.5 h-2.5 rounded-full bg-white animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx193("p", { className: clsx157("text-[10px] mt-0.5", c.active ? "opacity-80" : "text-urvos-text-subtle"), children: c.desc })
    ] }, c.code)) }),
    activeCode === "blue" && /* @__PURE__ */ jsxs165("div", { className: "p-4 rounded-xl border-2 border-blue-500 bg-blue-50/40 space-y-4", children: [
      /* @__PURE__ */ jsxs165("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs165("div", { children: [
          /* @__PURE__ */ jsxs165("h2", { className: "font-bold text-blue-700 text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsx193(Zap2, { className: "w-5 h-5" }),
            " CODE BLUE \u2014 ACTIVE"
          ] }),
          /* @__PURE__ */ jsx193("p", { className: "text-xs text-blue-600", children: "ICU Bed 14A \xB7 Meena Iyer (MRN-4421) \xB7 Cardiac Arrest \xB7 Since 09:42:05" })
        ] }),
        /* @__PURE__ */ jsxs165(Button, { size: "sm", variant: "secondary", className: "text-blue-700 border-blue-400", children: [
          /* @__PURE__ */ jsx193(CheckCircle223, { className: "w-3.5 h-3.5 mr-1" }),
          " Resolve Code"
        ] })
      ] }),
      /* @__PURE__ */ jsxs165("div", { children: [
        /* @__PURE__ */ jsx193("p", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-2", children: "Crash Team Status" }),
        /* @__PURE__ */ jsx193("div", { className: "flex flex-wrap gap-2", children: [
          { name: "Dr. A. Sharma", role: "Lead Physician", status: "arrived" },
          { name: "Dr. P. Nair", role: "Cardiology", status: "arrived" },
          { name: "Dr. R. Gupta", role: "Anesthesia", status: "en-route" },
          { name: "Pharmacy", role: "Crash Meds", status: "dispatched" }
        ].map((m) => /* @__PURE__ */ jsxs165("div", { className: clsx157("flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium", m.status === "arrived" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : m.status === "en-route" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-blue-200 bg-blue-50 text-blue-700"), children: [
          m.status === "arrived" ? /* @__PURE__ */ jsx193(CheckCircle223, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx193(Activity14, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxs165("div", { children: [
            /* @__PURE__ */ jsx193("p", { className: "font-semibold", children: m.name }),
            /* @__PURE__ */ jsxs165("p", { className: "text-[10px] opacity-70", children: [
              m.role,
              " \xB7 ",
              m.status
            ] })
          ] })
        ] }, m.name)) })
      ] }),
      /* @__PURE__ */ jsxs165("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx193("input", { type: "text", value: broadcastMsg, onChange: (e) => setBroadcastMsg(e.target.value), placeholder: "Broadcast update to crash team\u2026", className: "flex-1 px-3 py-2 text-xs border border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/40" }),
        /* @__PURE__ */ jsxs165(Button, { size: "sm", children: [
          /* @__PURE__ */ jsx193(Radio3, { className: "w-3.5 h-3.5 mr-1" }),
          " Broadcast"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs165("div", { children: [
      /* @__PURE__ */ jsx193("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "Code Blue Event Log" }),
      /* @__PURE__ */ jsx193("div", { className: "space-y-2 max-h-64 overflow-y-auto pr-1", children: codeBlueLog.map((entry, i) => /* @__PURE__ */ jsxs165("div", { className: clsx157("flex items-start gap-3 p-2.5 rounded-xl border text-xs", logStyle[entry.type]), children: [
        /* @__PURE__ */ jsx193("span", { className: "font-mono shrink-0 opacity-70", children: entry.time }),
        /* @__PURE__ */ jsxs165("div", { children: [
          /* @__PURE__ */ jsx193("p", { className: "font-semibold", children: entry.actor }),
          /* @__PURE__ */ jsx193("p", { className: "opacity-90 leading-relaxed", children: entry.msg })
        ] })
      ] }, i)) })
    ] })
  ] });
}

// components/templates/emergency-inpatient/MassCasualtyCommander.tsx
import { clsx as clsx158 } from "clsx";
import { jsx as jsx194, jsxs as jsxs166 } from "react/jsx-runtime";
function MassCasualtyCommander({ className }) {
  return /* @__PURE__ */ jsxs166("div", { className: clsx158("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs166("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs166("div", { children: [
        /* @__PURE__ */ jsx194("h1", { className: "text-xl font-bold text-urvos-text", children: "Mass Casualty Incident (MCI) Incident Command" }),
        /* @__PURE__ */ jsx194("p", { className: "text-xs text-urvos-text-subtle", children: "Disaster surge management, START triage tracking (Red, Yellow, Green, Black)" })
      ] }),
      /* @__PURE__ */ jsx194(Badge, { variant: "critical", children: "MCI Surge Active (12 Inbound)" })
    ] }),
    /* @__PURE__ */ jsxs166("div", { className: "grid grid-cols-4 gap-4 text-xs font-bold text-center", children: [
      /* @__PURE__ */ jsx194("div", { className: "p-3 bg-rose-500/20 text-rose-600 rounded-lg", children: "Immediate (Red): 4" }),
      /* @__PURE__ */ jsx194("div", { className: "p-3 bg-amber-500/20 text-amber-600 rounded-lg", children: "Delayed (Yellow): 5" }),
      /* @__PURE__ */ jsx194("div", { className: "p-3 bg-emerald-500/20 text-emerald-600 rounded-lg", children: "Minor (Green): 3" }),
      /* @__PURE__ */ jsx194("div", { className: "p-3 bg-urvos-surface border border-urvos-border rounded-lg", children: "Expectant (Black): 0" })
    ] })
  ] });
}

// components/templates/specialty-care/MotherBabyChart.tsx
import { useState as useState66 } from "react";
import { clsx as clsx159 } from "clsx";
import { Baby, Heart as Heart6, CheckCircle2 as CheckCircle224, Thermometer as Thermometer4 } from "lucide-react";
import { jsx as jsx195, jsxs as jsxs167 } from "react/jsx-runtime";
var motherVitals = [
  { time: "06:00", temp: 37.2, hr: 82, rr: 16, spo2: 98, bp: "120/78" },
  { time: "09:00", temp: 37.4, hr: 88, rr: 18, spo2: 97, bp: "118/75" },
  { time: "12:00", temp: 37.1, hr: 80, rr: 16, spo2: 99, bp: "122/80" }
];
var babyVitals = [
  { time: "06:00", hr: 145, rr: 48, temp: 36.8, spo2: 96, weight: "3.2 kg" },
  { time: "09:00", hr: 142, rr: 46, temp: 37, spo2: 97, weight: "3.2 kg" },
  { time: "12:00", hr: 148, rr: 50, temp: 36.9, spo2: 97, weight: "3.2 kg" }
];
var apgarScores = [
  { time: "1 min", color: 2, cry: 2, movement: 1, pulse: 2, respiration: 2, total: 9 },
  { time: "5 min", color: 2, cry: 2, movement: 2, pulse: 2, respiration: 2, total: 10 }
];
function MotherBabyChart({ className }) {
  const [tab, setTab] = useState66("mother");
  return /* @__PURE__ */ jsxs167("div", { className: clsx159("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs167("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs167("div", { children: [
        /* @__PURE__ */ jsx195("h1", { className: "text-xl font-bold", children: "Mother-Baby Chart" }),
        /* @__PURE__ */ jsx195("p", { className: "text-xs text-urvos-text-subtle", children: "Post-Partum Care \xB7 Delivered 24 Jul 2026 at 04:18 AM \xB7 Maternity Ward" })
      ] }),
      /* @__PURE__ */ jsx195(Badge, { variant: "success", children: "Both Stable" })
    ] }),
    /* @__PURE__ */ jsxs167("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs167("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
        /* @__PURE__ */ jsxs167("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsx195("div", { className: "w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm", children: "P" }),
          /* @__PURE__ */ jsxs167("div", { children: [
            /* @__PURE__ */ jsx195("p", { className: "font-semibold text-sm", children: "Priya Sharma (Mother)" }),
            /* @__PURE__ */ jsx195("p", { className: "text-xs text-urvos-text-subtle", children: "MRN-9921 \xB7 28y \xB7 G2P2 \xB7 LSCS" })
          ] })
        ] }),
        /* @__PURE__ */ jsx195("div", { className: "grid grid-cols-3 gap-2 text-center text-xs", children: [{ label: "HR", value: "82 bpm" }, { label: "BP", value: "120/78" }, { label: "SpO\u2082", value: "98%" }].map((v) => /* @__PURE__ */ jsxs167("div", { className: "p-2 rounded-lg bg-urvos-background border border-urvos-border", children: [
          /* @__PURE__ */ jsx195("p", { className: "font-bold text-urvos-primary", children: v.value }),
          /* @__PURE__ */ jsx195("p", { className: "text-[10px] text-urvos-text-subtle", children: v.label })
        ] }, v.label)) }),
        /* @__PURE__ */ jsxs167("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-emerald-600", children: [
          /* @__PURE__ */ jsx195(CheckCircle224, { className: "w-3.5 h-3.5" }),
          " Post-op stable \xB7 Uterus firm \xB7 No bleeding"
        ] })
      ] }),
      /* @__PURE__ */ jsxs167("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
        /* @__PURE__ */ jsxs167("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsx195("div", { className: "w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600", children: /* @__PURE__ */ jsx195(Baby, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs167("div", { children: [
            /* @__PURE__ */ jsx195("p", { className: "font-semibold text-sm", children: "Baby Sharma (Neonate)" }),
            /* @__PURE__ */ jsx195("p", { className: "text-xs text-urvos-text-subtle", children: "DOB: 24 Jul 2026 \xB7 04:18 AM \xB7 Full-term \xB7 3.2 kg" })
          ] })
        ] }),
        /* @__PURE__ */ jsx195("div", { className: "grid grid-cols-3 gap-2 text-center text-xs", children: [{ label: "HR", value: "145 bpm" }, { label: "SpO\u2082", value: "97%" }, { label: "Temp", value: "36.9\xB0C" }].map((v) => /* @__PURE__ */ jsxs167("div", { className: "p-2 rounded-lg bg-urvos-background border border-urvos-border", children: [
          /* @__PURE__ */ jsx195("p", { className: "font-bold text-urvos-primary", children: v.value }),
          /* @__PURE__ */ jsx195("p", { className: "text-[10px] text-urvos-text-subtle", children: v.label })
        ] }, v.label)) }),
        /* @__PURE__ */ jsxs167("div", { className: "mt-2 flex items-center gap-1.5 text-xs text-emerald-600", children: [
          /* @__PURE__ */ jsx195(CheckCircle224, { className: "w-3.5 h-3.5" }),
          " APGAR 9/10 (1 min) \xB7 Breastfeeding initiated"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx195("div", { className: "flex gap-1 border-b border-urvos-border", children: ["mother", "baby"].map((t) => /* @__PURE__ */ jsx195("button", { onClick: () => setTab(t), className: clsx159("px-4 py-2 text-sm font-semibold capitalize transition-colors -mb-px border-b-2", tab === t ? "border-urvos-primary text-urvos-primary" : "border-transparent text-urvos-text-subtle hover:text-urvos-text"), children: t === "mother" ? "\u{1F469} Mother Vitals" : "\u{1F476} Baby Vitals & APGAR" }, t)) }),
    tab === "mother" && /* @__PURE__ */ jsx195("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs167("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsx195("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx195("tr", { children: ["Time", "Temp (\xB0C)", "HR (bpm)", "RR (/min)", "SpO\u2082 (%)", "BP (mmHg)"].map((col) => /* @__PURE__ */ jsx195("th", { className: "px-4 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase", children: col }, col)) }) }),
      /* @__PURE__ */ jsx195("tbody", { className: "divide-y divide-urvos-border", children: motherVitals.map((v) => /* @__PURE__ */ jsxs167("tr", { className: "hover:bg-urvos-background", children: [
        /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5 font-semibold", children: v.time }),
        /* @__PURE__ */ jsxs167("td", { className: "px-4 py-2.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx195(Thermometer4, { className: "w-3 h-3 text-rose-400" }),
          v.temp
        ] }),
        /* @__PURE__ */ jsxs167("td", { className: "px-4 py-2.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx195(Heart6, { className: "w-3 h-3 text-rose-500" }),
          v.hr
        ] }),
        /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5", children: v.rr }),
        /* @__PURE__ */ jsxs167("td", { className: "px-4 py-2.5", children: [
          v.spo2,
          "%"
        ] }),
        /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5 font-semibold text-urvos-primary", children: v.bp })
      ] }, v.time)) })
    ] }) }),
    tab === "baby" && /* @__PURE__ */ jsxs167("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx195("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: /* @__PURE__ */ jsxs167("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx195("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx195("tr", { children: ["Time", "HR (bpm)", "RR (/min)", "Temp (\xB0C)", "SpO\u2082 (%)", "Weight"].map((col) => /* @__PURE__ */ jsx195("th", { className: "px-4 py-2.5 text-left text-[10px] font-semibold text-urvos-text-subtle uppercase", children: col }, col)) }) }),
        /* @__PURE__ */ jsx195("tbody", { className: "divide-y divide-urvos-border", children: babyVitals.map((v) => /* @__PURE__ */ jsxs167("tr", { className: "hover:bg-urvos-background", children: [
          /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5 font-semibold", children: v.time }),
          /* @__PURE__ */ jsxs167("td", { className: "px-4 py-2.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx195(Heart6, { className: "w-3 h-3 text-blue-400" }),
            v.hr
          ] }),
          /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5", children: v.rr }),
          /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5", children: v.temp }),
          /* @__PURE__ */ jsxs167("td", { className: "px-4 py-2.5", children: [
            v.spo2,
            "%"
          ] }),
          /* @__PURE__ */ jsx195("td", { className: "px-4 py-2.5 font-semibold", children: v.weight })
        ] }, v.time)) })
      ] }) }),
      /* @__PURE__ */ jsxs167("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
        /* @__PURE__ */ jsx195("h3", { className: "text-xs font-bold uppercase tracking-wider text-urvos-text-subtle mb-3", children: "APGAR Scores" }),
        /* @__PURE__ */ jsx195("div", { className: "grid grid-cols-2 gap-3", children: apgarScores.map((a) => /* @__PURE__ */ jsxs167("div", { className: clsx159("p-3 rounded-xl border text-center", a.total >= 7 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"), children: [
          /* @__PURE__ */ jsx195("p", { className: clsx159("text-3xl font-black", a.total >= 7 ? "text-emerald-600" : "text-amber-600"), children: a.total }),
          /* @__PURE__ */ jsxs167("p", { className: "text-sm font-semibold text-urvos-text", children: [
            a.time,
            " APGAR"
          ] }),
          /* @__PURE__ */ jsx195("p", { className: clsx159("text-xs font-medium", a.total >= 7 ? "text-emerald-600" : "text-amber-600"), children: a.total >= 7 ? "Normal" : "Needs Attention" })
        ] }, a.time)) })
      ] })
    ] })
  ] });
}

// components/templates/specialty-care/LaborProgressTracker.tsx
import { useState as useState67 } from "react";
import { clsx as clsx160 } from "clsx";
import { AlertTriangle as AlertTriangle24, Heart as Heart7, CheckCircle2 as CheckCircle225 } from "lucide-react";
import { jsx as jsx196, jsxs as jsxs168 } from "react/jsx-runtime";
var partographData = [
  { hour: 0, dilation: 3, alertLine: 3, actionLine: 3, fhr: 142, contractions: 2 },
  { hour: 1, dilation: 3.5, alertLine: 4, actionLine: 4, fhr: 138, contractions: 2 },
  { hour: 2, dilation: 4, alertLine: 5, actionLine: 5, fhr: 145, contractions: 3 },
  { hour: 3, dilation: 5, alertLine: 6, actionLine: 6, fhr: 150, contractions: 3 },
  { hour: 4, dilation: 6, alertLine: 7, actionLine: 7, fhr: 148, contractions: 4 },
  { hour: 5, dilation: 6.5, alertLine: 8, actionLine: 8, fhr: 143, contractions: 4 },
  { hour: 6, dilation: 7, alertLine: 9, actionLine: 9, fhr: 136, contractions: 5 },
  { hour: 7, dilation: 8, alertLine: 10, actionLine: 10, fhr: 152, contractions: 5 }
];
var yScale2 = (v, min = 0, max = 10, h = 200) => h - (v - min) / (max - min) * h + 10;
var xScale2 = (i, total = 8, w = 520) => 30 + i / (total - 1) * w;
function LaborProgressTracker({ className }) {
  const [currentDilation] = useState67(7);
  const progressPct = currentDilation / 10 * 100;
  return /* @__PURE__ */ jsxs168("div", { className: clsx160("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs168("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs168("div", { children: [
        /* @__PURE__ */ jsx196("h1", { className: "text-xl font-bold", children: "WHO Partograph \u2014 Labor Progress Tracker" }),
        /* @__PURE__ */ jsx196("p", { className: "text-xs text-urvos-text-subtle", children: "Priya Sharma \xB7 G2P1 \xB7 EDD: 28 Jul 2026 \xB7 POG: 39+2 weeks" })
      ] }),
      /* @__PURE__ */ jsxs168(Badge, { variant: "caution", children: [
        "Active Labor \xB7 ",
        currentDilation,
        " cm Dilated"
      ] })
    ] }),
    /* @__PURE__ */ jsx196("div", { className: "grid grid-cols-4 gap-3", children: [
      { label: "Cervical Dilation", value: `${currentDilation} cm`, sub: "/ 10 cm", color: "text-urvos-primary" },
      { label: "FHR (Last)", value: "152 bpm", sub: "Normal 120-160", color: "text-emerald-600" },
      { label: "Contractions", value: "5 / 10 min", sub: "\u2265 45 sec duration", color: "text-amber-600" },
      { label: "Effacement", value: "80%", sub: "Near complete", color: "text-violet-600" }
    ].map((v) => /* @__PURE__ */ jsxs168("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center", children: [
      /* @__PURE__ */ jsx196("p", { className: clsx160("text-2xl font-black", v.color), children: v.value }),
      /* @__PURE__ */ jsx196("p", { className: "text-[10px] text-urvos-text-subtle", children: v.sub }),
      /* @__PURE__ */ jsx196("p", { className: "text-[10px] font-semibold text-urvos-text-subtle mt-0.5", children: v.label })
    ] }, v.label)) }),
    /* @__PURE__ */ jsxs168("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
      /* @__PURE__ */ jsxs168("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx196("p", { className: "text-sm font-semibold", children: "Cervical Dilation Progress" }),
        /* @__PURE__ */ jsxs168("span", { className: "text-xs text-urvos-text-subtle", children: [
          currentDilation,
          " cm / 10 cm \u2014 Active Phase"
        ] })
      ] }),
      /* @__PURE__ */ jsxs168("div", { className: "relative h-4 bg-urvos-background rounded-full overflow-hidden", children: [
        /* @__PURE__ */ jsx196("div", { className: "absolute inset-y-0 left-0 bg-urvos-primary rounded-full transition-all", style: { width: `${progressPct}%` } }),
        /* @__PURE__ */ jsx196("div", { className: "absolute inset-y-0 w-px bg-amber-500", style: { left: "70%" } }),
        /* @__PURE__ */ jsx196("div", { className: "absolute inset-y-0 w-px bg-rose-500", style: { left: "80%" } })
      ] }),
      /* @__PURE__ */ jsxs168("div", { className: "flex items-center gap-4 mt-2 text-[10px] text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsxs168("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx196("span", { className: "w-3 h-1.5 rounded-full bg-urvos-primary" }),
          " Actual dilation"
        ] }),
        /* @__PURE__ */ jsxs168("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx196("span", { className: "w-3 h-1.5 rounded-full bg-amber-500" }),
          " Alert line (7cm)"
        ] }),
        /* @__PURE__ */ jsxs168("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx196("span", { className: "w-3 h-1.5 rounded-full bg-rose-500" }),
          " Action line (8cm)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs168("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface overflow-x-auto", children: [
      /* @__PURE__ */ jsx196("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider mb-3", children: "Partograph Chart" }),
      /* @__PURE__ */ jsxs168("svg", { viewBox: "0 0 580 230", className: "w-full min-w-[500px] font-sans", children: [
        [0, 2, 4, 6, 8, 10].map((v) => /* @__PURE__ */ jsxs168("g", { children: [
          /* @__PURE__ */ jsx196("line", { x1: "25", x2: "555", y1: yScale2(v), y2: yScale2(v), stroke: "#e2e8f0", strokeWidth: "0.5" }),
          /* @__PURE__ */ jsx196("text", { x: "20", y: yScale2(v) + 4, textAnchor: "end", fontSize: "8", fill: "#94a3b8", children: v })
        ] }, v)),
        partographData.map((d, i) => /* @__PURE__ */ jsxs168("text", { x: xScale2(i), y: 225, textAnchor: "middle", fontSize: "8", fill: "#94a3b8", children: [
          d.hour,
          "h"
        ] }, i)),
        /* @__PURE__ */ jsx196("polyline", { points: partographData.map((d, i) => `${xScale2(i)},${yScale2(d.alertLine)}`).join(" "), fill: "none", stroke: "#f59e0b", strokeWidth: "1.5", strokeDasharray: "4,2" }),
        /* @__PURE__ */ jsx196("polyline", { points: partographData.map((d, i) => `${xScale2(i)},${yScale2(d.actionLine)}`).join(" "), fill: "none", stroke: "#ef4444", strokeWidth: "1.5", strokeDasharray: "4,2" }),
        /* @__PURE__ */ jsx196("polyline", { points: partographData.map((d, i) => `${xScale2(i)},${yScale2(d.dilation)}`).join(" "), fill: "none", stroke: "var(--color-urvos-primary, #3b82f6)", strokeWidth: "2.5" }),
        partographData.map((d, i) => /* @__PURE__ */ jsx196("circle", { cx: xScale2(i), cy: yScale2(d.dilation), r: "4", fill: "var(--color-urvos-primary, #3b82f6)", stroke: "white", strokeWidth: "1.5" }, i)),
        /* @__PURE__ */ jsx196("text", { x: "8", y: "115", textAnchor: "middle", fontSize: "9", fill: "#64748b", transform: "rotate(-90, 8, 115)", children: "Dilation (cm)" }),
        /* @__PURE__ */ jsx196("text", { x: "290", y: "15", textAnchor: "middle", fontSize: "9", fill: "#64748b", children: "Cervical Dilation Curve" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs168("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: [
      /* @__PURE__ */ jsx196("div", { className: "px-4 py-2 bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsxs168("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider flex items-center gap-2", children: [
        /* @__PURE__ */ jsx196(Heart7, { className: "w-3.5 h-3.5 text-rose-500" }),
        " Fetal Heart Rate & Contractions"
      ] }) }),
      /* @__PURE__ */ jsxs168("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx196("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsxs168("tr", { children: [
          /* @__PURE__ */ jsx196("th", { className: "px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase", children: "Hour" }),
          /* @__PURE__ */ jsx196("th", { className: "px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase", children: "FHR (bpm)" }),
          /* @__PURE__ */ jsx196("th", { className: "px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase", children: "Contractions / 10 min" }),
          /* @__PURE__ */ jsx196("th", { className: "px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase", children: "Dilation" }),
          /* @__PURE__ */ jsx196("th", { className: "px-4 py-2 text-left text-[10px] text-urvos-text-subtle font-semibold uppercase", children: "FHR Status" })
        ] }) }),
        /* @__PURE__ */ jsx196("tbody", { className: "divide-y divide-urvos-border", children: partographData.map((d, i) => /* @__PURE__ */ jsxs168("tr", { className: "hover:bg-urvos-background transition-colors", children: [
          /* @__PURE__ */ jsxs168("td", { className: "px-4 py-2 font-medium", children: [
            d.hour,
            "h"
          ] }),
          /* @__PURE__ */ jsx196("td", { className: "px-4 py-2 font-mono", children: d.fhr }),
          /* @__PURE__ */ jsx196("td", { className: "px-4 py-2", children: d.contractions }),
          /* @__PURE__ */ jsxs168("td", { className: "px-4 py-2 font-semibold text-urvos-primary", children: [
            d.dilation,
            " cm"
          ] }),
          /* @__PURE__ */ jsx196("td", { className: "px-4 py-2", children: d.fhr >= 120 && d.fhr <= 160 ? /* @__PURE__ */ jsxs168("span", { className: "text-emerald-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx196(CheckCircle225, { className: "w-3 h-3" }),
            " Normal"
          ] }) : /* @__PURE__ */ jsxs168("span", { className: "text-rose-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx196(AlertTriangle24, { className: "w-3 h-3" }),
            " Abnormal"
          ] }) })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs168("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx196("p", { className: "text-xs text-urvos-text-subtle", children: "Obstetrician: Dr. S. Pillai \xB7 Midwife: Nurse R. Thomas" }),
      /* @__PURE__ */ jsx196(Button, { size: "sm", children: "Record Vitals" })
    ] })
  ] });
}

// components/templates/specialty-care/PediatricGrowthSchedule.tsx
import { clsx as clsx161 } from "clsx";
import { jsx as jsx197, jsxs as jsxs169 } from "react/jsx-runtime";
function PediatricGrowthSchedule({ className }) {
  return /* @__PURE__ */ jsxs169("div", { className: clsx161("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs169("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs169("div", { children: [
        /* @__PURE__ */ jsx197("h1", { className: "text-xl font-bold text-urvos-text", children: "Pediatric Growth Percentiles & Vaccine Schedule" }),
        /* @__PURE__ */ jsx197("p", { className: "text-xs text-urvos-text-subtle", children: "WHO growth curves (Weight/Height-for-age) & UIP immunization schedule" })
      ] }),
      /* @__PURE__ */ jsx197(Badge, { variant: "success", children: "50th Percentile Growth" })
    ] }),
    /* @__PURE__ */ jsx197(
      ImmunizationRecord,
      {
        title: "UIP Infant Vaccine Schedule",
        records: [
          { id: "IMM-1", vaccineName: "BCG + OPV-0 + HepB-Birth", targetDisease: "Tuberculosis / Polio / HepB", doseNumber: "Birth Dose", dateGiven: "2026-01-10", status: "completed" },
          { id: "IMM-2", vaccineName: "Pentavalent-1 + Rotavirus-1", targetDisease: "DPT / HepB / Hib / Rota", doseNumber: "6 Weeks", dateGiven: "2026-02-22", status: "completed" }
        ]
      }
    )
  ] });
}

// components/templates/administrative-settings/UserManagement.tsx
import { clsx as clsx162 } from "clsx";
import { jsx as jsx198, jsxs as jsxs170 } from "react/jsx-runtime";
function UserManagement({ className }) {
  const users = [
    { id: "USR-1", name: "Dr. Anita Sharma", role: "Attending Physician (MD)", email: "anita.sharma@fortis.in", status: "Active" },
    { id: "USR-2", name: "Nurse Sarah Jenkins", role: "Ward Nurse (RN)", email: "sarah.j@fortis.in", status: "Active" }
  ];
  return /* @__PURE__ */ jsxs170("div", { className: clsx162("space-y-6 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs170("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs170("div", { children: [
        /* @__PURE__ */ jsx198("h1", { className: "text-xl font-bold text-urvos-text", children: "Staff User Management & Role RBAC Permissions" }),
        /* @__PURE__ */ jsx198("p", { className: "text-xs text-urvos-text-subtle", children: "Provider accounts, HPR registration, role-based access control" })
      ] }),
      /* @__PURE__ */ jsx198(Button, { size: "sm", children: "+ Add Staff Account" })
    ] }),
    /* @__PURE__ */ jsx198("div", { className: "space-y-3", children: users.map((u) => /* @__PURE__ */ jsxs170("div", { className: "p-3 bg-urvos-surface border border-urvos-border rounded-lg flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxs170("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx198(Avatar, { name: u.name, size: "sm" }),
        /* @__PURE__ */ jsxs170("div", { children: [
          /* @__PURE__ */ jsx198("div", { className: "font-bold text-urvos-text", children: u.name }),
          /* @__PURE__ */ jsxs170("div", { className: "text-urvos-text-subtle", children: [
            u.role,
            " \u2022 ",
            u.email
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx198(Badge, { variant: "success", children: u.status })
    ] }, u.id)) })
  ] });
}

// components/templates/administrative-settings/SystemSettings.tsx
import { useState as useState68 } from "react";
import { clsx as clsx163 } from "clsx";
import { Settings as Settings5, Hospital as Hospital2, Wifi as Wifi3, CreditCard as CreditCard4, Bell as Bell8, Shield as Shield3, Users as Users6, ChevronRight as ChevronRight11, Save } from "lucide-react";
import { jsx as jsx199, jsxs as jsxs171 } from "react/jsx-runtime";
var tabs = [
  { id: "general", label: "General", icon: Hospital2 },
  { id: "abdm", label: "ABDM Gateway", icon: Wifi3 },
  { id: "billing", label: "Billing & Payers", icon: CreditCard4 },
  { id: "notifications", label: "Notifications", icon: Bell8 },
  { id: "security", label: "Security & Access", icon: Shield3 },
  { id: "team", label: "Team & Roles", icon: Users6 }
];
function Toggle({ enabled, onToggle }) {
  return /* @__PURE__ */ jsx199("button", { onClick: onToggle, className: clsx163("w-10 h-5 rounded-full relative transition-colors shrink-0", enabled ? "bg-urvos-primary" : "bg-urvos-border"), "aria-label": "Toggle", children: /* @__PURE__ */ jsx199("span", { className: clsx163("absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-xs transition-transform", enabled && "translate-x-5") }) });
}
function SystemSettings({ className }) {
  const [activeTab, setActiveTab] = useState68("general");
  const [abdmEnabled, setAbdmEnabled] = useState68(true);
  const [hipaaAudit, setHipaaAudit] = useState68(true);
  const [twoFactor, setTwoFactor] = useState68(true);
  const [emailAlerts, setEmailAlerts] = useState68(true);
  const [smsAlerts, setSmsAlerts] = useState68(false);
  return /* @__PURE__ */ jsxs171("div", { className: clsx163("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs171("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs171("div", { children: [
        /* @__PURE__ */ jsxs171("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx199(Settings5, { className: "w-5 h-5 text-urvos-primary" }),
          " System Settings"
        ] }),
        /* @__PURE__ */ jsx199("p", { className: "text-xs text-urvos-text-subtle", children: "Facility configuration, integrations, and access management" })
      ] }),
      /* @__PURE__ */ jsxs171(Button, { size: "sm", children: [
        /* @__PURE__ */ jsx199(Save, { className: "w-3.5 h-3.5 mr-1.5" }),
        " Save Changes"
      ] })
    ] }),
    /* @__PURE__ */ jsxs171("div", { className: "flex gap-5", children: [
      /* @__PURE__ */ jsx199("div", { className: "w-48 shrink-0 space-y-0.5", children: tabs.map((tab) => {
        const Icon2 = tab.icon;
        return /* @__PURE__ */ jsxs171(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            className: clsx163("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left", activeTab === tab.id ? "bg-urvos-primary/10 text-urvos-primary font-semibold" : "text-urvos-text-subtle hover:bg-urvos-background hover:text-urvos-text"),
            children: [
              /* @__PURE__ */ jsx199(Icon2, { className: "w-4 h-4 shrink-0" }),
              tab.label,
              activeTab === tab.id && /* @__PURE__ */ jsx199(ChevronRight11, { className: "w-3 h-3 ml-auto" })
            ]
          },
          tab.id
        );
      }) }),
      /* @__PURE__ */ jsxs171("div", { className: "flex-1 min-w-0 bg-urvos-surface border border-urvos-border rounded-xl p-5 space-y-5", children: [
        activeTab === "general" && /* @__PURE__ */ jsxs171("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx199("h2", { className: "text-sm font-bold", children: "Facility Information" }),
          /* @__PURE__ */ jsx199("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
            { label: "Facility Name", value: "Apollo Hospitals, Mumbai" },
            { label: "HFR ID", value: "IN2610300009" },
            { label: "NABH Accreditation No.", value: "NABH-H-2024-0018" },
            { label: "Primary Contact", value: "+91 22 6671 0000" },
            { label: "State / District", value: "Maharashtra / Mumbai" },
            { label: "Time Zone", value: "Asia/Kolkata (IST, UTC+5:30)" }
          ].map((field) => /* @__PURE__ */ jsxs171("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx199("label", { className: "text-xs font-medium text-urvos-text-subtle", children: field.label }),
            /* @__PURE__ */ jsx199("input", { type: "text", defaultValue: field.value, className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
          ] }, field.label)) })
        ] }),
        activeTab === "abdm" && /* @__PURE__ */ jsxs171("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs171("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx199("h2", { className: "text-sm font-bold", children: "ABDM / National Health Stack Integration" }),
            /* @__PURE__ */ jsx199(Badge, { variant: abdmEnabled ? "success" : "critical", children: abdmEnabled ? "Connected" : "Disconnected" })
          ] }),
          /* @__PURE__ */ jsxs171("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsx199("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-background space-y-3", children: /* @__PURE__ */ jsxs171("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs171("div", { children: [
                /* @__PURE__ */ jsx199("p", { className: "font-medium", children: "ABDM Gateway" }),
                /* @__PURE__ */ jsx199("p", { className: "text-xs text-urvos-text-subtle", children: "Enables ABHA verification, HIU/HIP consent, and health records exchange." })
              ] }),
              /* @__PURE__ */ jsx199(Toggle, { enabled: abdmEnabled, onToggle: () => setAbdmEnabled(!abdmEnabled) })
            ] }) }),
            [
              { label: "HIP ID", value: "APOLLO-MUM-HIP-001" },
              { label: "HIU ID", value: "APOLLO-MUM-HIU-001" },
              { label: "ABDM Client ID", value: "abdm_prod_cl_****88ef" },
              { label: "Callback URL", value: "https://api.urvos.health/abdm/callback" }
            ].map((field) => /* @__PURE__ */ jsxs171("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx199("label", { className: "text-xs font-medium text-urvos-text-subtle", children: field.label }),
              /* @__PURE__ */ jsx199("input", { type: "text", defaultValue: field.value, className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
            ] }, field.label))
          ] })
        ] }),
        activeTab === "security" && /* @__PURE__ */ jsxs171("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx199("h2", { className: "text-sm font-bold", children: "Security & Access Controls" }),
          /* @__PURE__ */ jsxs171("div", { className: "space-y-3", children: [
            [
              { label: "Two-Factor Authentication (2FA)", desc: "Require TOTP/OTP for all staff logins.", enabled: twoFactor, toggle: () => setTwoFactor(!twoFactor) },
              { label: "HIPAA Audit Logging", desc: "Log all PHI access events and flag anomalies.", enabled: hipaaAudit, toggle: () => setHipaaAudit(!hipaaAudit) }
            ].map((row) => /* @__PURE__ */ jsxs171("div", { className: "flex items-center justify-between p-3 rounded-xl border border-urvos-border bg-urvos-background", children: [
              /* @__PURE__ */ jsxs171("div", { children: [
                /* @__PURE__ */ jsx199("p", { className: "text-sm font-medium", children: row.label }),
                /* @__PURE__ */ jsx199("p", { className: "text-xs text-urvos-text-subtle", children: row.desc })
              ] }),
              /* @__PURE__ */ jsx199(Toggle, { enabled: row.enabled, onToggle: row.toggle })
            ] }, row.label)),
            /* @__PURE__ */ jsxs171("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx199("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Session Timeout (minutes)" }),
              /* @__PURE__ */ jsx199("input", { type: "number", defaultValue: 30, className: "w-32 px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background text-sm focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
            ] })
          ] })
        ] }),
        activeTab === "notifications" && /* @__PURE__ */ jsxs171("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx199("h2", { className: "text-sm font-bold", children: "Alert & Notification Preferences" }),
          /* @__PURE__ */ jsx199("div", { className: "space-y-3", children: [
            { label: "Email Alerts", desc: "Critical lab results, missed appointments.", enabled: emailAlerts, toggle: () => setEmailAlerts(!emailAlerts) },
            { label: "SMS / WhatsApp Alerts", desc: "Emergency codes, drug interactions.", enabled: smsAlerts, toggle: () => setSmsAlerts(!smsAlerts) }
          ].map((row) => /* @__PURE__ */ jsxs171("div", { className: "flex items-center justify-between p-3 rounded-xl border border-urvos-border bg-urvos-background", children: [
            /* @__PURE__ */ jsxs171("div", { children: [
              /* @__PURE__ */ jsx199("p", { className: "text-sm font-medium", children: row.label }),
              /* @__PURE__ */ jsx199("p", { className: "text-xs text-urvos-text-subtle", children: row.desc })
            ] }),
            /* @__PURE__ */ jsx199(Toggle, { enabled: row.enabled, onToggle: row.toggle })
          ] }, row.label)) })
        ] }),
        (activeTab === "billing" || activeTab === "team") && /* @__PURE__ */ jsx199("div", { className: "flex items-center justify-center h-40 text-urvos-text-subtle text-sm", children: /* @__PURE__ */ jsxs171("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx199(Settings5, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
          /* @__PURE__ */ jsx199("p", { className: "font-medium", children: "Select a settings section from the left panel." })
        ] }) })
      ] })
    ] })
  ] });
}

// components/templates/administrative-settings/AuditLogsView.tsx
import { useState as useState69 } from "react";
import { clsx as clsx164 } from "clsx";
import { Activity as Activity17, Search as Search13, Download as Download4, AlertTriangle as AlertTriangle25, User as User15, FileText as FileText19, Eye, Lock as Lock6 } from "lucide-react";
import { jsx as jsx200, jsxs as jsxs172 } from "react/jsx-runtime";
var auditLogs = [
  { id: 1, ts: "2026-07-24 09:42:17", actor: "Dr. A. Sharma", role: "Senior Physician", action: "VIEW_PATIENT_RECORD", resource: "Rajesh Kumar (MRN-8819)", ip: "10.0.1.45", severity: "info", outcome: "success" },
  { id: 2, ts: "2026-07-24 09:40:05", actor: "Nurse Anita Desai", role: "ICU RN", action: "UPDATE_MEDICATION_ORDER", resource: "Meena Iyer (MRN-4421) \u2014 Norepinephrine dose", ip: "10.0.2.12", severity: "info", outcome: "success" },
  { id: 3, ts: "2026-07-24 09:38:44", actor: "admin@urvos.health", role: "System Admin", action: "EXPORT_PATIENT_DATA", resource: "Bulk export \u2014 Q2 2026 (2,184 records)", ip: "203.0.113.10", severity: "critical", outcome: "flagged" },
  { id: 4, ts: "2026-07-24 09:35:11", actor: "Dr. P. Nair", role: "Cardiologist", action: "PRESCRIBE_CONTROLLED_SUBSTANCE", resource: "Morphine 4mg IV \u2014 Bed 302A", ip: "10.0.1.67", severity: "warn", outcome: "success" },
  { id: 5, ts: "2026-07-24 09:30:02", actor: "billing@apollohospitals.com", role: "Billing Staff", action: "VIEW_INSURANCE_DETAILS", resource: "Rajesh Kumar (MRN-8819) \u2014 TPA Details", ip: "10.0.3.20", severity: "info", outcome: "success" },
  { id: 6, ts: "2026-07-24 09:28:55", actor: "Unknown", role: "\u2014", action: "FAILED_LOGIN_ATTEMPT", resource: "admin@urvos.health (5 failed attempts)", ip: "185.220.101.42", severity: "critical", outcome: "blocked" },
  { id: 7, ts: "2026-07-24 09:20:14", actor: "Dr. V. Shah", role: "Radiologist", action: "DOWNLOAD_DICOM_STUDY", resource: "CT Chest \u2014 Meena Iyer", ip: "10.0.1.88", severity: "info", outcome: "success" },
  { id: 8, ts: "2026-07-24 09:15:33", actor: "Dr. A. Sharma", role: "Senior Physician", action: "DELETE_DRAFT_NOTE", resource: "SOAP Note Draft (unsaved)", ip: "10.0.1.45", severity: "warn", outcome: "success" }
];
var severityStyle = {
  critical: "bg-rose-50 text-rose-700 border-rose-200",
  warn: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-sky-50 text-sky-700 border-sky-200"
};
var outcomeStyle = {
  success: "text-emerald-600",
  flagged: "text-rose-600 font-bold",
  blocked: "text-rose-600 font-bold"
};
var actionIcon = {
  VIEW_PATIENT_RECORD: /* @__PURE__ */ jsx200(Eye, { className: "w-3.5 h-3.5" }),
  UPDATE_MEDICATION_ORDER: /* @__PURE__ */ jsx200(Activity17, { className: "w-3.5 h-3.5" }),
  EXPORT_PATIENT_DATA: /* @__PURE__ */ jsx200(Download4, { className: "w-3.5 h-3.5" }),
  PRESCRIBE_CONTROLLED_SUBSTANCE: /* @__PURE__ */ jsx200(AlertTriangle25, { className: "w-3.5 h-3.5" }),
  VIEW_INSURANCE_DETAILS: /* @__PURE__ */ jsx200(FileText19, { className: "w-3.5 h-3.5" }),
  FAILED_LOGIN_ATTEMPT: /* @__PURE__ */ jsx200(Lock6, { className: "w-3.5 h-3.5" }),
  DOWNLOAD_DICOM_STUDY: /* @__PURE__ */ jsx200(Download4, { className: "w-3.5 h-3.5" }),
  DELETE_DRAFT_NOTE: /* @__PURE__ */ jsx200(FileText19, { className: "w-3.5 h-3.5" })
};
function AuditLogsView({ className }) {
  const [search, setSearch] = useState69("");
  const [filter, setFilter] = useState69("all");
  const filtered = auditLogs.filter(
    (l) => (filter === "all" || l.severity === filter) && (search === "" || l.actor.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()))
  );
  return /* @__PURE__ */ jsxs172("div", { className: clsx164("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs172("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs172("div", { children: [
        /* @__PURE__ */ jsxs172("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx200(Activity17, { className: "w-5 h-5 text-urvos-primary" }),
          " HIPAA Audit Log"
        ] }),
        /* @__PURE__ */ jsx200("p", { className: "text-xs text-urvos-text-subtle", children: "All PHI access and modification events \xB7 Tamper-proof \xB7 Retained 7 years" })
      ] }),
      /* @__PURE__ */ jsxs172(Button, { size: "sm", variant: "secondary", children: [
        /* @__PURE__ */ jsx200(Download4, { className: "w-3.5 h-3.5 mr-1.5" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsx200("div", { className: "grid grid-cols-4 gap-3", children: [
      { label: "Total Events (24h)", value: "2,841", color: "text-urvos-text" },
      { label: "Critical Alerts", value: "2", color: "text-rose-600" },
      { label: "Failed Logins", value: "7", color: "text-amber-600" },
      { label: "PHI Exports", value: "1", color: "text-rose-600" }
    ].map((stat) => /* @__PURE__ */ jsxs172("div", { className: "p-3 rounded-xl border border-urvos-border bg-urvos-surface text-center", children: [
      /* @__PURE__ */ jsx200("p", { className: clsx164("text-2xl font-black", stat.color), children: stat.value }),
      /* @__PURE__ */ jsx200("p", { className: "text-[10px] text-urvos-text-subtle mt-0.5", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxs172("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxs172("div", { className: "relative flex-1 min-w-0 max-w-xs", children: [
        /* @__PURE__ */ jsx200(Search13, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
        /* @__PURE__ */ jsx200("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by user or action...", className: "w-full pl-9 pr-3 py-2 text-xs border border-urvos-border rounded-lg bg-urvos-surface focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
      ] }),
      /* @__PURE__ */ jsx200("div", { className: "flex gap-1", children: ["all", "critical", "warn", "info"].map((f) => /* @__PURE__ */ jsx200("button", { onClick: () => setFilter(f), className: clsx164("px-3 py-2 rounded-lg text-xs font-medium capitalize border transition-colors", filter === f ? "border-urvos-primary bg-urvos-primary text-white" : "border-urvos-border bg-urvos-surface text-urvos-text-subtle hover:bg-urvos-background"), children: f }, f)) })
    ] }),
    /* @__PURE__ */ jsxs172("div", { className: "rounded-xl border border-urvos-border overflow-hidden", children: [
      /* @__PURE__ */ jsxs172("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsx200("thead", { className: "bg-urvos-background border-b border-urvos-border", children: /* @__PURE__ */ jsx200("tr", { children: ["Timestamp", "Actor", "Action", "Resource / Detail", "IP Address", "Outcome"].map((col) => /* @__PURE__ */ jsx200("th", { className: "px-3 py-2.5 text-left font-semibold text-urvos-text-subtle uppercase tracking-wide text-[10px]", children: col }, col)) }) }),
        /* @__PURE__ */ jsx200("tbody", { className: "divide-y divide-urvos-border", children: filtered.map((log) => /* @__PURE__ */ jsxs172("tr", { className: clsx164("transition-colors hover:bg-urvos-background", log.severity === "critical" && "bg-rose-50/40"), children: [
          /* @__PURE__ */ jsx200("td", { className: "px-3 py-2.5 font-mono text-urvos-text-subtle whitespace-nowrap", children: log.ts }),
          /* @__PURE__ */ jsx200("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs172("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx200(User15, { className: "w-3 h-3 text-urvos-text-subtle shrink-0" }),
            /* @__PURE__ */ jsxs172("div", { children: [
              /* @__PURE__ */ jsx200("p", { className: "font-medium", children: log.actor }),
              /* @__PURE__ */ jsx200("p", { className: "text-[10px] text-urvos-text-subtle", children: log.role })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx200("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxs172("span", { className: clsx164("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium", severityStyle[log.severity]), children: [
            actionIcon[log.action],
            /* @__PURE__ */ jsx200("span", { className: "font-mono text-[10px]", children: log.action })
          ] }) }),
          /* @__PURE__ */ jsx200("td", { className: "px-3 py-2.5 text-urvos-text max-w-xs truncate", children: log.resource }),
          /* @__PURE__ */ jsx200("td", { className: "px-3 py-2.5 font-mono text-urvos-text-subtle", children: log.ip }),
          /* @__PURE__ */ jsx200("td", { className: clsx164("px-3 py-2.5 capitalize", outcomeStyle[log.outcome]), children: log.outcome })
        ] }, log.id)) })
      ] }),
      /* @__PURE__ */ jsxs172("div", { className: "px-4 py-2.5 border-t border-urvos-border bg-urvos-background flex items-center justify-between text-xs text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsxs172("span", { children: [
          "Showing ",
          filtered.length,
          " of ",
          auditLogs.length,
          " events"
        ] }),
        /* @__PURE__ */ jsxs172("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx200("button", { className: "px-2 py-1 rounded border border-urvos-border hover:bg-urvos-surface", children: "\u2190 Prev" }),
          /* @__PURE__ */ jsx200("button", { className: "px-2 py-1 rounded border border-urvos-border hover:bg-urvos-surface", children: "Next \u2192" })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/administrative-settings/ComplianceDashboard.tsx
import { useState as useState70 } from "react";
import { clsx as clsx165 } from "clsx";
import { ShieldCheck as ShieldCheck8, AlertTriangle as AlertTriangle26, CheckCircle2 as CheckCircle226, XCircle as XCircle4, FileText as FileText20, RefreshCw as RefreshCw4 } from "lucide-react";
import { jsx as jsx201, jsxs as jsxs173 } from "react/jsx-runtime";
var frameworks = [
  {
    id: "nabh",
    label: "NABH",
    fullName: "National Accreditation Board for Hospitals",
    score: 87,
    total: 100,
    status: "Compliant",
    lastAudit: "14 Jan 2026",
    nextAudit: "14 Jan 2027",
    checks: [
      { area: "Patient Rights & Education", status: "pass", score: 92 },
      { area: "Patient Assessment", status: "pass", score: 88 },
      { area: "Care of Patients", status: "pass", score: 85 },
      { area: "Medication Management", status: "warn", score: 74 },
      { area: "Hospital Infection Control", status: "pass", score: 90 },
      { area: "Quality Improvement", status: "warn", score: 70 }
    ]
  },
  {
    id: "hipaa",
    label: "HIPAA",
    fullName: "Health Insurance Portability & Accountability Act",
    score: 94,
    total: 100,
    status: "Compliant",
    lastAudit: "01 Mar 2026",
    nextAudit: "01 Mar 2027",
    checks: [
      { area: "PHI Access Controls", status: "pass", score: 97 },
      { area: "Audit Logging", status: "pass", score: 95 },
      { area: "Encryption at Rest", status: "pass", score: 100 },
      { area: "Business Associate Agreements", status: "pass", score: 92 },
      { area: "Breach Notification Policy", status: "pass", score: 88 },
      { area: "HIPAA Training Records", status: "warn", score: 78 }
    ]
  },
  {
    id: "dpdp",
    label: "DPDP Act",
    fullName: "Digital Personal Data Protection Act 2023",
    score: 71,
    total: 100,
    status: "Action Required",
    lastAudit: "20 Jun 2026",
    nextAudit: "20 Sep 2026",
    checks: [
      { area: "Consent Management", status: "fail", score: 58 },
      { area: "Data Fiduciary Registration", status: "pass", score: 90 },
      { area: "Data Minimisation", status: "warn", score: 70 },
      { area: "Right to Erasure Implementation", status: "fail", score: 45 },
      { area: "Cross-border Data Transfer Logs", status: "pass", score: 88 },
      { area: "Grievance Redressal Officer", status: "pass", score: 100 }
    ]
  }
];
var statusIcon4 = { pass: CheckCircle226, warn: AlertTriangle26, fail: XCircle4 };
var statusStyle3 = { pass: "text-emerald-600", warn: "text-amber-600", fail: "text-rose-600" };
var statusBg = { pass: "bg-emerald-50 border-emerald-200", warn: "bg-amber-50 border-amber-200", fail: "bg-rose-50 border-rose-200" };
function ComplianceDashboard({ className }) {
  const [selected, setSelected] = useState70("nabh");
  const fw = frameworks.find((f) => f.id === selected);
  return /* @__PURE__ */ jsxs173("div", { className: clsx165("space-y-5 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs173("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs173("div", { children: [
        /* @__PURE__ */ jsxs173("h1", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx201(ShieldCheck8, { className: "w-5 h-5 text-urvos-primary" }),
          "Regulatory Compliance Dashboard"
        ] }),
        /* @__PURE__ */ jsx201("p", { className: "text-xs text-urvos-text-subtle", children: "NABH \xB7 HIPAA \xB7 DPDP 2023 \xB7 Automated compliance scoring" })
      ] }),
      /* @__PURE__ */ jsxs173(Button, { size: "sm", variant: "secondary", children: [
        /* @__PURE__ */ jsx201(FileText20, { className: "w-3.5 h-3.5 mr-1.5" }),
        " Export Compliance Report"
      ] })
    ] }),
    /* @__PURE__ */ jsx201("div", { className: "grid grid-cols-3 gap-3", children: frameworks.map((f) => /* @__PURE__ */ jsxs173("button", { onClick: () => setSelected(f.id), className: clsx165("p-4 rounded-xl border text-left transition-all", selected === f.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background"), children: [
      /* @__PURE__ */ jsxs173("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs173("div", { children: [
          /* @__PURE__ */ jsx201("p", { className: "text-sm font-bold", children: f.label }),
          /* @__PURE__ */ jsx201("p", { className: "text-[10px] text-urvos-text-subtle leading-tight mt-0.5", children: f.fullName })
        ] }),
        /* @__PURE__ */ jsxs173("span", { className: clsx165("text-xs font-bold ml-2 shrink-0", f.score >= 85 ? "text-emerald-600" : f.score >= 70 ? "text-amber-600" : "text-rose-600"), children: [
          f.score,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx201("div", { className: "mt-3 h-1.5 bg-urvos-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsx201("div", { className: clsx165("h-full rounded-full", f.score >= 85 ? "bg-emerald-500" : f.score >= 70 ? "bg-amber-500" : "bg-rose-500"), style: { width: `${f.score}%` } }) }),
      /* @__PURE__ */ jsx201("p", { className: clsx165("text-[10px] font-semibold mt-1.5", f.score >= 85 ? "text-emerald-600" : f.score >= 70 ? "text-amber-600" : "text-rose-600"), children: f.status })
    ] }, f.id)) }),
    /* @__PURE__ */ jsxs173("div", { className: "p-4 rounded-xl border border-urvos-border bg-urvos-surface space-y-4", children: [
      /* @__PURE__ */ jsxs173("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs173("div", { children: [
          /* @__PURE__ */ jsxs173("h2", { className: "font-bold text-base", children: [
            fw.label,
            " \u2014 ",
            fw.fullName
          ] }),
          /* @__PURE__ */ jsxs173("p", { className: "text-xs text-urvos-text-subtle", children: [
            "Last audit: ",
            fw.lastAudit,
            " \xB7 Next: ",
            fw.nextAudit
          ] })
        ] }),
        /* @__PURE__ */ jsxs173("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx201(Badge, { variant: fw.status === "Compliant" ? "success" : "critical", children: fw.status }),
          /* @__PURE__ */ jsx201("button", { className: "p-1.5 rounded-lg border border-urvos-border hover:bg-urvos-background text-urvos-text-subtle", children: /* @__PURE__ */ jsx201(RefreshCw4, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs173("div", { className: "flex items-center gap-4 p-3 rounded-lg bg-urvos-background border border-urvos-border", children: [
        /* @__PURE__ */ jsxs173("div", { className: "text-3xl font-black text-urvos-text", children: [
          fw.score,
          /* @__PURE__ */ jsxs173("span", { className: "text-lg text-urvos-text-subtle font-normal", children: [
            "/",
            fw.total
          ] })
        ] }),
        /* @__PURE__ */ jsxs173("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx201("div", { className: "h-3 bg-urvos-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsx201("div", { className: clsx165("h-full rounded-full transition-all", fw.score >= 85 ? "bg-emerald-500" : fw.score >= 70 ? "bg-amber-500" : "bg-rose-500"), style: { width: `${fw.score}%` } }) }),
          /* @__PURE__ */ jsx201("p", { className: "text-xs text-urvos-text-subtle mt-1", children: "Overall compliance score" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs173("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx201("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider", children: "Area-wise Breakdown" }),
        fw.checks.map((check) => {
          const Icon2 = statusIcon4[check.status];
          return /* @__PURE__ */ jsxs173("div", { className: clsx165("flex items-center gap-3 p-2.5 rounded-lg border text-xs", statusBg[check.status]), children: [
            /* @__PURE__ */ jsx201(Icon2, { className: clsx165("w-4 h-4 shrink-0", statusStyle3[check.status]) }),
            /* @__PURE__ */ jsx201("span", { className: "flex-1 font-medium", children: check.area }),
            /* @__PURE__ */ jsx201("div", { className: "w-20 h-1.5 bg-white/60 rounded-full overflow-hidden shrink-0", children: /* @__PURE__ */ jsx201("div", { className: clsx165("h-full rounded-full", check.status === "pass" ? "bg-emerald-500" : check.status === "warn" ? "bg-amber-500" : "bg-rose-500"), style: { width: `${check.score}%` } }) }),
            /* @__PURE__ */ jsxs173("span", { className: clsx165("font-bold shrink-0", statusStyle3[check.status]), children: [
              check.score,
              "%"
            ] })
          ] }, check.area);
        })
      ] })
    ] })
  ] });
}

// components/templates/authentication-communication/HealthcareLogin.tsx
import { clsx as clsx166 } from "clsx";
import { Heart as Heart8, Mail as Mail2, Key } from "lucide-react";
import { jsx as jsx202, jsxs as jsxs174 } from "react/jsx-runtime";
function HealthcareLogin({
  onGoogleLogin,
  onAppleLogin,
  onEmailLogin,
  onPasswordLogin,
  onSignupClick,
  className
}) {
  return /* @__PURE__ */ jsxs174("div", { className: clsx166("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs174("div", { className: "flex items-center gap-2.5 mb-8", children: [
      /* @__PURE__ */ jsx202("div", { className: "w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx202(Heart8, { className: "w-5 h-5 text-white stroke-[2.5]" }) }),
      /* @__PURE__ */ jsx202("span", { className: "text-xl font-semibold text-urvos-text tracking-tight", children: "Urvos" })
    ] }),
    /* @__PURE__ */ jsxs174(Card, { className: "w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface", children: [
      /* @__PURE__ */ jsx202("h1", { className: "text-xl font-semibold mb-1 text-urvos-text", children: "Welcome to Urvos" }),
      /* @__PURE__ */ jsx202("p", { className: "text-sm mb-6 text-urvos-text-subtle", children: "Sign in to your healthcare workspace." }),
      /* @__PURE__ */ jsxs174("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx202(Button, { variant: "secondary", size: "lg", className: "w-full justify-center", onClick: onGoogleLogin, children: "Continue with Google" }),
        /* @__PURE__ */ jsx202(Button, { variant: "secondary", size: "lg", className: "w-full justify-center", onClick: onAppleLogin, children: "Continue with Apple" }),
        /* @__PURE__ */ jsxs174("div", { className: "flex items-center gap-3 py-1", children: [
          /* @__PURE__ */ jsx202("div", { className: "flex-1 h-px bg-urvos-border" }),
          /* @__PURE__ */ jsx202("span", { className: "text-xs text-urvos-text-subtle", children: "or" }),
          /* @__PURE__ */ jsx202("div", { className: "flex-1 h-px bg-urvos-border" })
        ] }),
        /* @__PURE__ */ jsxs174(Button, { variant: "primary", size: "lg", className: "w-full justify-center", onClick: onEmailLogin, children: [
          /* @__PURE__ */ jsx202(Mail2, { className: "w-4 h-4 mr-2" }),
          " Continue with Email"
        ] }),
        /* @__PURE__ */ jsxs174(Button, { variant: "secondary", size: "lg", className: "w-full justify-center", onClick: onPasswordLogin, children: [
          /* @__PURE__ */ jsx202(Key, { className: "w-4 h-4 mr-2" }),
          " Continue with Password"
        ] })
      ] }),
      /* @__PURE__ */ jsxs174("p", { className: "text-xs text-center mt-6 text-urvos-text-subtle", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx202("button", { type: "button", onClick: onSignupClick, className: "text-urvos-primary font-medium hover:underline cursor-pointer", children: "Create Account" })
      ] })
    ] }),
    /* @__PURE__ */ jsx202("div", { className: "mt-4 w-full max-w-sm rounded-xl border border-urvos-primary/30 bg-urvos-primary/5 px-4 py-3 text-center", children: /* @__PURE__ */ jsx202("p", { className: "text-xs font-medium text-urvos-primary", children: /* @__PURE__ */ jsx202("a", { href: "/patient-portal/login", className: "hover:underline", children: "Patient Portal \u2192" }) }) }),
    /* @__PURE__ */ jsx202("p", { className: "mt-8 text-xs text-urvos-text-subtle", children: "\xA9 2026 Urvos Technologies. All rights reserved." })
  ] });
}

// components/templates/authentication-communication/SignUpPage.tsx
import React116, { useState as useState71 } from "react";
import { clsx as clsx167 } from "clsx";
import { Heart as Heart9, User as User16, Mail as Mail3, Phone as Phone5, Building2, FileText as FileText21, Eye as Eye2, EyeOff, CheckCircle2 as CheckCircle227, Upload } from "lucide-react";
import { Fragment as Fragment13, jsx as jsx203, jsxs as jsxs175 } from "react/jsx-runtime";
function SignUpPage({ className }) {
  const [step, setStep] = useState71(1);
  const [showPassword, setShowPassword] = useState71(false);
  const [password, setPassword] = useState71("Urvos@2026!");
  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*#?&]/.test(password) ? 4 : 3;
  const strengthColors = ["", "bg-urvos-danger-bg", "bg-urvos-warning-bg", "bg-urvos-warning-bg", "bg-urvos-success-bg"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  return /* @__PURE__ */ jsxs175("div", { className: clsx167("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 py-10 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs175("div", { className: "flex items-center gap-2.5 mb-8", children: [
      /* @__PURE__ */ jsx203("div", { className: "w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx203(Heart9, { className: "w-5 h-5 text-white stroke-[2.5]" }) }),
      /* @__PURE__ */ jsx203("span", { className: "text-xl font-semibold tracking-tight", children: "Urvos" }),
      /* @__PURE__ */ jsx203(Badge, { variant: "info", className: "ml-1", children: "Provider Registration" })
    ] }),
    /* @__PURE__ */ jsx203("div", { className: "flex items-center gap-2 mb-6 text-xs", children: ["Account", "Credentials", "Facility"].map((label, i) => /* @__PURE__ */ jsxs175(React116.Fragment, { children: [
      /* @__PURE__ */ jsxs175("div", { className: clsx167("flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-full", step === i + 1 ? "bg-urvos-primary text-white" : step > i + 1 ? "bg-urvos-success-bg/10 text-urvos-success" : "bg-urvos-surface text-urvos-text-subtle border border-urvos-border"), children: [
        step > i + 1 ? /* @__PURE__ */ jsx203(CheckCircle227, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx203("span", { className: "w-4 h-4 rounded-full bg-current/10 flex items-center justify-center text-[10px]", children: i + 1 }),
        label
      ] }),
      i < 2 && /* @__PURE__ */ jsx203("div", { className: "w-6 h-px bg-urvos-border" })
    ] }, label)) }),
    /* @__PURE__ */ jsxs175(Card, { className: "w-full max-w-md p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5", children: [
      step === 1 && /* @__PURE__ */ jsxs175(Fragment13, { children: [
        /* @__PURE__ */ jsxs175("div", { children: [
          /* @__PURE__ */ jsx203("h2", { className: "text-lg font-semibold", children: "Personal Information" }),
          /* @__PURE__ */ jsx203("p", { className: "text-xs text-urvos-text-subtle", children: "Create your provider account." })
        ] }),
        /* @__PURE__ */ jsxs175("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs175("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "First Name" }),
              /* @__PURE__ */ jsx203("input", { type: "text", defaultValue: "Rajesh", className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] }),
            /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Last Name" }),
              /* @__PURE__ */ jsx203("input", { type: "text", defaultValue: "Kumar", className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Work Email" }),
            /* @__PURE__ */ jsxs175("div", { className: "relative", children: [
              /* @__PURE__ */ jsx203(Mail3, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx203("input", { type: "email", defaultValue: "dr.rajesh@apollohospitals.com", className: "w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Mobile Number" }),
            /* @__PURE__ */ jsxs175("div", { className: "relative", children: [
              /* @__PURE__ */ jsx203(Phone5, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx203("input", { type: "tel", defaultValue: "+91 98765 43210", className: "w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx203(Button, { size: "sm", className: "w-full justify-center", onClick: () => setStep(2), children: "Continue \u2192" })
      ] }),
      step === 2 && /* @__PURE__ */ jsxs175(Fragment13, { children: [
        /* @__PURE__ */ jsxs175("div", { children: [
          /* @__PURE__ */ jsx203("h2", { className: "text-lg font-semibold", children: "Medical Credentials" }),
          /* @__PURE__ */ jsx203("p", { className: "text-xs text-urvos-text-subtle", children: "We verify all healthcare providers." })
        ] }),
        /* @__PURE__ */ jsxs175("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "HPR ID (Health Professional Registry)" }),
            /* @__PURE__ */ jsxs175("div", { className: "relative", children: [
              /* @__PURE__ */ jsx203(User16, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx203("input", { type: "text", defaultValue: "HPR-2026-DR-88192", className: "w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Medical License / Certificate" }),
            /* @__PURE__ */ jsxs175("div", { className: "border-2 border-dashed border-urvos-border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-urvos-primary/50 hover:bg-urvos-primary/5 transition-colors", children: [
              /* @__PURE__ */ jsx203(Upload, { className: "w-6 h-6 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsxs175("p", { className: "text-xs text-urvos-text-subtle text-center", children: [
                "Drop your MCI/NMC license PDF here, or ",
                /* @__PURE__ */ jsx203("span", { className: "text-urvos-primary font-medium", children: "browse" })
              ] }),
              /* @__PURE__ */ jsx203("p", { className: "text-[10px] text-urvos-text-subtle", children: "PDF, JPG, PNG up to 5MB" })
            ] }),
            /* @__PURE__ */ jsxs175("div", { className: "flex items-center gap-2 px-3 py-2 bg-urvos-success-bg border border-urvos-success rounded-lg text-xs text-urvos-success", children: [
              /* @__PURE__ */ jsx203(CheckCircle227, { className: "w-3.5 h-3.5 shrink-0" }),
              "MCI_License_Rajesh_Kumar.pdf \u2014 verified \u2713"
            ] })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Password" }),
            /* @__PURE__ */ jsxs175("div", { className: "relative", children: [
              /* @__PURE__ */ jsx203("input", { type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm pr-10" }),
              /* @__PURE__ */ jsx203("button", { onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle", children: showPassword ? /* @__PURE__ */ jsx203(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx203(Eye2, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsx203("div", { className: "flex gap-1 mt-1", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx203("div", { className: clsx167("h-1 flex-1 rounded-full transition-colors", i <= pwStrength ? strengthColors[pwStrength] : "bg-urvos-border") }, i)) }),
            password && /* @__PURE__ */ jsxs175("p", { className: clsx167("text-[10px] font-medium", pwStrength >= 4 ? "text-urvos-success" : pwStrength >= 2 ? "text-urvos-warning" : "text-urvos-danger"), children: [
              strengthLabels[pwStrength],
              " password"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs175("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx203(Button, { size: "sm", variant: "secondary", onClick: () => setStep(1), children: "\u2190 Back" }),
          /* @__PURE__ */ jsx203(Button, { size: "sm", className: "flex-1 justify-center", onClick: () => setStep(3), children: "Continue \u2192" })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs175(Fragment13, { children: [
        /* @__PURE__ */ jsxs175("div", { children: [
          /* @__PURE__ */ jsx203("h2", { className: "text-lg font-semibold", children: "Your Facility" }),
          /* @__PURE__ */ jsx203("p", { className: "text-xs text-urvos-text-subtle", children: "Associate your account with a healthcare facility." })
        ] }),
        /* @__PURE__ */ jsxs175("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Facility / Hospital Name" }),
            /* @__PURE__ */ jsxs175("div", { className: "relative", children: [
              /* @__PURE__ */ jsx203(Building2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx203("input", { type: "text", defaultValue: "Apollo Hospitals, Mumbai", className: "w-full pl-9 pr-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx203("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "HFR ID (Facility Registry)" }),
            /* @__PURE__ */ jsx203("input", { type: "text", defaultValue: "IN2610300009", placeholder: "HFR facility ID", className: "w-full px-3 py-2 border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30 text-sm" })
          ] }),
          /* @__PURE__ */ jsxs175("div", { className: "flex items-start gap-2 p-3 bg-urvos-background border border-urvos-border rounded-lg", children: [
            /* @__PURE__ */ jsx203("input", { type: "checkbox", id: "tos", defaultChecked: true, className: "mt-0.5 w-4 h-4 rounded accent-urvos-primary" }),
            /* @__PURE__ */ jsxs175("label", { htmlFor: "tos", className: "text-xs text-urvos-text-subtle leading-relaxed cursor-pointer", children: [
              "I agree to the ",
              /* @__PURE__ */ jsx203("span", { className: "text-urvos-primary hover:underline font-medium", children: "Terms of Service" }),
              " and ",
              /* @__PURE__ */ jsx203("span", { className: "text-urvos-primary hover:underline font-medium", children: "Privacy Policy" }),
              ". I confirm I am a licensed healthcare professional."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs175("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx203(Button, { size: "sm", variant: "secondary", onClick: () => setStep(2), children: "\u2190 Back" }),
          /* @__PURE__ */ jsxs175(Button, { size: "sm", className: "flex-1 justify-center", children: [
            /* @__PURE__ */ jsx203(FileText21, { className: "w-4 h-4 mr-1.5" }),
            " Create Account"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx203("p", { className: "mt-6 text-xs text-urvos-text-subtle", children: "\xA9 2026 Urvos Technologies. All rights reserved." })
  ] });
}

// components/templates/authentication-communication/ForgotPasswordPage.tsx
import { useState as useState72 } from "react";
import { clsx as clsx168 } from "clsx";
import { Heart as Heart10, Mail as Mail4, ArrowLeft as ArrowLeft2, KeyRound, ShieldCheck as ShieldCheck10, CheckCircle2 as CheckCircle228 } from "lucide-react";
import { Fragment as Fragment14, jsx as jsx204, jsxs as jsxs176 } from "react/jsx-runtime";
function ForgotPasswordPage({ className }) {
  const [step, setStep] = useState72("request");
  const [identifier, setIdentifier] = useState72("dr.rajesh@urvos.health");
  const [otp, setOtp] = useState72(["", "", "", ""]);
  return /* @__PURE__ */ jsxs176("div", { className: clsx168("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs176("div", { className: "flex items-center gap-2.5 mb-8", children: [
      /* @__PURE__ */ jsx204("div", { className: "w-9 h-9 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx204(Heart10, { className: "w-5 h-5 text-white stroke-[2.5]" }) }),
      /* @__PURE__ */ jsx204("span", { className: "text-xl font-semibold tracking-tight", children: "Urvos" })
    ] }),
    /* @__PURE__ */ jsxs176(Card, { className: "w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5", children: [
      step === "request" && /* @__PURE__ */ jsxs176(Fragment14, { children: [
        /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx204("h1", { className: "text-xl font-semibold", children: "Forgot Password?" }),
          /* @__PURE__ */ jsx204("p", { className: "text-sm text-urvos-text-subtle", children: "Enter your registered HPR ID or mobile number to receive a reset OTP." })
        ] }),
        /* @__PURE__ */ jsxs176("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx204("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "HPR ID / Mobile / Email" }),
            /* @__PURE__ */ jsxs176("div", { className: "relative", children: [
              /* @__PURE__ */ jsx204(Mail4, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx204(
                "input",
                {
                  type: "text",
                  value: identifier,
                  onChange: (e) => setIdentifier(e.target.value),
                  className: "w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30",
                  placeholder: "dr.name@hospital.com"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx204(Button, { size: "sm", className: "w-full justify-center", onClick: () => setStep("otp"), children: "Send Reset OTP" }),
          /* @__PURE__ */ jsxs176("button", { onClick: () => {
          }, className: "w-full text-xs text-urvos-text-subtle hover:text-urvos-text flex items-center justify-center gap-1 mt-1", children: [
            /* @__PURE__ */ jsx204(ArrowLeft2, { className: "w-3 h-3" }),
            " Back to Login"
          ] })
        ] })
      ] }),
      step === "otp" && /* @__PURE__ */ jsxs176(Fragment14, { children: [
        /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx204("h1", { className: "text-xl font-semibold", children: "Enter OTP" }),
          /* @__PURE__ */ jsxs176("p", { className: "text-sm text-urvos-text-subtle", children: [
            "A 6-digit OTP was sent to ",
            /* @__PURE__ */ jsx204("span", { className: "font-medium text-urvos-text", children: identifier })
          ] })
        ] }),
        /* @__PURE__ */ jsx204("div", { className: "flex gap-2 justify-center", children: otp.map((digit, i) => /* @__PURE__ */ jsx204(
          "input",
          {
            type: "text",
            maxLength: 1,
            value: digit,
            onChange: (e) => {
              const next = [...otp];
              next[i] = e.target.value.slice(-1);
              setOtp(next);
            },
            className: "w-10 h-12 text-center text-lg font-bold border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/40"
          },
          i
        )) }),
        /* @__PURE__ */ jsxs176("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx204(Button, { size: "sm", className: "w-full justify-center", onClick: () => setStep("reset"), children: "Verify OTP" }),
          /* @__PURE__ */ jsxs176("p", { className: "text-xs text-center text-urvos-text-subtle", children: [
            "Didn't receive it?",
            " ",
            /* @__PURE__ */ jsx204("button", { className: "text-urvos-primary font-medium hover:underline", children: "Resend OTP" })
          ] })
        ] })
      ] }),
      step === "reset" && /* @__PURE__ */ jsxs176(Fragment14, { children: [
        /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx204("h1", { className: "text-xl font-semibold", children: "New Password" }),
          /* @__PURE__ */ jsx204("p", { className: "text-sm text-urvos-text-subtle", children: "Choose a strong password for your account." })
        ] }),
        /* @__PURE__ */ jsxs176("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx204("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "New Password" }),
            /* @__PURE__ */ jsxs176("div", { className: "relative", children: [
              /* @__PURE__ */ jsx204(KeyRound, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
              /* @__PURE__ */ jsx204("input", { type: "password", defaultValue: "SecurePass@123", className: "w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
            ] }),
            /* @__PURE__ */ jsx204("div", { className: "flex gap-1 mt-1", children: ["bg-urvos-danger-bg", "bg-urvos-warning-bg", "bg-urvos-success-bg", "bg-urvos-success-bg"].map((c, i) => /* @__PURE__ */ jsx204("div", { className: clsx168("h-1 flex-1 rounded-full", c) }, i)) }),
            /* @__PURE__ */ jsx204("p", { className: "text-[10px] text-urvos-success font-medium", children: "Strong password" })
          ] }),
          /* @__PURE__ */ jsxs176("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx204("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Confirm New Password" }),
            /* @__PURE__ */ jsx204("input", { type: "password", defaultValue: "SecurePass@123", className: "w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30" })
          ] }),
          /* @__PURE__ */ jsxs176(Button, { size: "sm", className: "w-full justify-center", onClick: () => setStep("success"), children: [
            /* @__PURE__ */ jsx204(ShieldCheck10, { className: "w-4 h-4 mr-1.5" }),
            " Reset Password"
          ] })
        ] })
      ] }),
      step === "success" && /* @__PURE__ */ jsxs176("div", { className: "text-center space-y-4 py-4", children: [
        /* @__PURE__ */ jsx204("div", { className: "w-14 h-14 rounded-full bg-urvos-success-bg flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsx204(CheckCircle228, { className: "w-8 h-8 text-urvos-success" }) }),
        /* @__PURE__ */ jsxs176("div", { children: [
          /* @__PURE__ */ jsx204("h1", { className: "text-xl font-semibold", children: "Password Reset!" }),
          /* @__PURE__ */ jsx204("p", { className: "text-sm text-urvos-text-subtle mt-1", children: "Your password has been updated. You can now sign in." })
        ] }),
        /* @__PURE__ */ jsx204(Button, { size: "sm", className: "w-full justify-center", children: "Back to Login" })
      ] })
    ] }),
    /* @__PURE__ */ jsx204("p", { className: "mt-8 text-xs text-urvos-text-subtle", children: "\xA9 2026 Urvos Technologies. All rights reserved." })
  ] });
}

// components/templates/authentication-communication/ClinicalHandoffView.tsx
import { useState as useState73 } from "react";
import { clsx as clsx169 } from "clsx";
import { AlertTriangle as AlertTriangle27, CheckCircle2 as CheckCircle229, Clock as Clock19, ArrowRight as ArrowRight6, FileText as FileText22, Stethoscope as Stethoscope7, Pill as Pill9, FlaskConical as FlaskConical2 } from "lucide-react";
import { jsx as jsx205, jsxs as jsxs177 } from "react/jsx-runtime";
var handoffs = [
  {
    id: 1,
    patient: "Rajesh Kumar",
    mrn: "MRN-8819",
    age: 45,
    gender: "M",
    bed: "Room 302 / Bed A",
    diagnosis: "ACS \u2014 Unstable Angina",
    handingOff: "Dr. A. Sharma",
    receivingTo: "Dr. P. Nair",
    shift: "Night \u2192 Morning",
    acuity: "HIGH",
    flags: ["Active Chest Pain", "Awaiting Cath Lab", "NPO since 22:00"],
    situation: "Patient admitted 8h ago with exertional chest pain and ST-depression V4-V6. Troponin borderline at 0.12.",
    background: "Known HTN & DM2. On Telmisartan, Metformin. No prior cardiac history. Allergic to Penicillin.",
    assessment: "Likely NSTEMI. Awaiting repeat Troponin at 06:00. Cardiology consulted. Cath lab on standby.",
    recommendations: "Continue dual antiplatelet. NPO. Repeat ECG q2h. If Troponin positive \u2192 activate cath lab.",
    signed: false
  },
  {
    id: 2,
    patient: "Meena Iyer",
    mrn: "MRN-4421",
    age: 62,
    gender: "F",
    bed: "Room 210 / Bed B",
    diagnosis: "Septic Shock \u2014 UTI source",
    handingOff: "Dr. V. Reddy",
    receivingTo: "Dr. A. Sharma",
    shift: "Night \u2192 Morning",
    acuity: "CRITICAL",
    flags: ["Active Vasopressors", "MAP < 65", "Blood Cx Pending"],
    situation: "Patient presented with fever, hypotension and altered sensorium. Source likely UTI \u2192 pyelonephritis.",
    background: "DM2, CKD stage 3. On insulin. Last creatinine 2.1 mg/dL.",
    assessment: "Septic shock. On Norepinephrine 0.12 mcg/kg/min, MAP 63. Meropenem started 4h ago.",
    recommendations: "Target MAP \u226565. Reassess vasopressors hourly. Follow blood cultures. Nephrology consult if Cr rises.",
    signed: true
  }
];
var acuityColor = {
  HIGH: "bg-urvos-warning-bg text-urvos-warning border-urvos-warning",
  CRITICAL: "bg-urvos-danger-bg text-urvos-danger border-urvos-danger",
  MODERATE: "bg-urvos-glass text-urvos-primary border-urvos-primary"
};
function ClinicalHandoffView({ className }) {
  const [selected, setSelected] = useState73(1);
  const active = handoffs.find((h) => h.id === selected);
  return /* @__PURE__ */ jsxs177("div", { className: clsx169("space-y-4 font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs177("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-urvos-border pb-4", children: [
      /* @__PURE__ */ jsxs177("div", { children: [
        /* @__PURE__ */ jsx205("h1", { className: "text-xl font-bold", children: "Clinical Handoff \u2014 SBAR" }),
        /* @__PURE__ */ jsxs177("p", { className: "text-xs text-urvos-text-subtle", children: [
          "Shift: Night \u2192 Morning Shift \u2022 ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })
        ] })
      ] }),
      /* @__PURE__ */ jsx205("div", { className: "flex items-center gap-2 text-xs text-urvos-text-subtle", children: /* @__PURE__ */ jsxs177("span", { className: "px-2 py-1 rounded-full bg-urvos-primary/10 text-urvos-primary font-semibold", children: [
        handoffs.length,
        " Patients to Handoff"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs177("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs177("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx205("h3", { className: "text-xs font-bold text-urvos-text-subtle uppercase tracking-wider", children: "Handoff Roster" }),
        handoffs.map((h) => /* @__PURE__ */ jsxs177("button", { onClick: () => setSelected(h.id), className: clsx169("w-full text-left p-3 rounded-xl border transition-all", selected === h.id ? "border-urvos-primary bg-urvos-primary/5 shadow-xs" : "border-urvos-border bg-urvos-surface hover:bg-urvos-background"), children: [
          /* @__PURE__ */ jsxs177("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs177("div", { children: [
              /* @__PURE__ */ jsx205("p", { className: "text-sm font-semibold", children: h.patient }),
              /* @__PURE__ */ jsxs177("p", { className: "text-[10px] text-urvos-text-subtle", children: [
                h.mrn,
                " \xB7 ",
                h.bed
              ] }),
              /* @__PURE__ */ jsx205("p", { className: "text-[10px] text-urvos-primary font-medium mt-0.5", children: h.diagnosis })
            ] }),
            /* @__PURE__ */ jsxs177("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
              /* @__PURE__ */ jsx205("span", { className: clsx169("text-[10px] font-bold px-1.5 py-0.5 rounded border", acuityColor[h.acuity]), children: h.acuity }),
              h.signed ? /* @__PURE__ */ jsx205(CheckCircle229, { className: "w-4 h-4 text-urvos-success" }) : /* @__PURE__ */ jsx205(Clock19, { className: "w-4 h-4 text-urvos-warning" })
            ] })
          ] }),
          /* @__PURE__ */ jsx205("div", { className: "flex flex-wrap gap-1 mt-2", children: h.flags.slice(0, 2).map((f) => /* @__PURE__ */ jsxs177("span", { className: "text-[9px] px-1.5 py-0.5 rounded-full bg-urvos-danger-bg border border-urvos-danger text-urvos-danger font-medium", children: [
            "\u26A0 ",
            f
          ] }, f)) })
        ] }, h.id))
      ] }),
      /* @__PURE__ */ jsxs177("div", { className: "lg:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsxs177("div", { className: "flex items-center justify-between p-4 rounded-xl border border-urvos-border bg-urvos-surface", children: [
          /* @__PURE__ */ jsxs177("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx205("div", { className: "w-10 h-10 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center font-bold text-sm", children: active.patient.split(" ").map((n) => n[0]).join("") }),
            /* @__PURE__ */ jsxs177("div", { children: [
              /* @__PURE__ */ jsxs177("p", { className: "font-semibold text-sm", children: [
                active.patient,
                " \xB7 ",
                active.age,
                "y ",
                active.gender
              ] }),
              /* @__PURE__ */ jsxs177("p", { className: "text-xs text-urvos-text-subtle", children: [
                active.mrn,
                " \xB7 ",
                active.bed
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs177("div", { className: "flex flex-col items-end gap-1", children: [
            /* @__PURE__ */ jsxs177("span", { className: clsx169("text-xs font-bold px-2 py-0.5 rounded-full border", acuityColor[active.acuity]), children: [
              /* @__PURE__ */ jsx205(AlertTriangle27, { className: "w-3 h-3 inline mr-1" }),
              active.acuity,
              " ACUITY"
            ] }),
            /* @__PURE__ */ jsxs177("p", { className: "text-[10px] text-urvos-text-subtle", children: [
              active.handingOff,
              " ",
              /* @__PURE__ */ jsx205(ArrowRight6, { className: "w-3 h-3 inline" }),
              " ",
              active.receivingTo
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx205("div", { className: "flex flex-wrap gap-1.5", children: active.flags.map((f) => /* @__PURE__ */ jsxs177("span", { className: "text-xs px-2.5 py-1 rounded-full bg-urvos-danger-bg border border-urvos-danger text-urvos-danger font-semibold", children: [
          "\u26A0 ",
          f
        ] }, f)) }),
        [
          { icon: Stethoscope7, label: "S \u2014 Situation", color: "text-urvos-primary bg-urvos-glass border-urvos-primary", content: active.situation },
          { icon: FileText22, label: "B \u2014 Background", color: "text-violet-600 bg-violet-50 border-violet-200", content: active.background },
          { icon: FlaskConical2, label: "A \u2014 Assessment", color: "text-urvos-warning bg-urvos-warning-bg border-urvos-warning", content: active.assessment },
          { icon: Pill9, label: "R \u2014 Recommendations", color: "text-urvos-success bg-urvos-success-bg border-urvos-success", content: active.recommendations }
        ].map(({ icon: Icon2, label, color, content }) => /* @__PURE__ */ jsxs177("div", { className: clsx169("p-3 rounded-xl border text-sm", color), children: [
          /* @__PURE__ */ jsxs177("p", { className: "font-bold text-xs mb-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx205(Icon2, { className: "w-3.5 h-3.5" }),
            label
          ] }),
          /* @__PURE__ */ jsx205("p", { className: "text-xs leading-relaxed opacity-90", children: content })
        ] }, label)),
        /* @__PURE__ */ jsxs177("div", { className: "flex items-center justify-between pt-2", children: [
          /* @__PURE__ */ jsxs177("p", { className: "text-xs text-urvos-text-subtle", children: [
            "Receiving: ",
            /* @__PURE__ */ jsx205("span", { className: "font-semibold text-urvos-text", children: active.receivingTo })
          ] }),
          active.signed ? /* @__PURE__ */ jsxs177("span", { className: "flex items-center gap-1.5 text-xs text-urvos-success font-semibold", children: [
            /* @__PURE__ */ jsx205(CheckCircle229, { className: "w-4 h-4" }),
            " Handoff Signed"
          ] }) : /* @__PURE__ */ jsxs177(Button, { size: "sm", children: [
            /* @__PURE__ */ jsx205(CheckCircle229, { className: "w-3.5 h-3.5 mr-1" }),
            " Sign & Accept Handoff"
          ] })
        ] })
      ] })
    ] })
  ] });
}

// components/templates/authentication-communication/SecureTeamMessaging.tsx
import { useState as useState74 } from "react";
import { clsx as clsx170 } from "clsx";
import { MessageSquare as MessageSquare3, Send, Phone as Phone6, Video as Video2, Paperclip, Search as Search14, CheckCheck, Clock as Clock20 } from "lucide-react";
import { jsx as jsx206, jsxs as jsxs178 } from "react/jsx-runtime";
var conversations = [
  { id: 1, name: "Dr. Priya Nair", role: "Cardiologist", lastMsg: "Please review ECG for MRN-8819", time: "2m", unread: 2, online: true, patientCtx: "Rajesh Kumar" },
  { id: 2, name: "Nurse Anita Desai", role: "ICU RN", lastMsg: "Potassium level critical \u2014 action?", time: "12m", unread: 1, online: true, patientCtx: "Bed 14A" },
  { id: 3, name: "Dr. Vikram Shah", role: "Radiologist", lastMsg: "CT chest report uploaded", time: "1h", unread: 0, online: false, patientCtx: "Meena Iyer" },
  { id: 4, name: "PharmD. Renu", role: "Pharmacist", lastMsg: "Drug interaction flagged on eRx", time: "3h", unread: 0, online: false, patientCtx: null }
];
var messages = [
  { id: 1, sender: "Dr. Priya Nair", mine: false, text: "Dr. Sharma, patient Rajesh Kumar (MRN-8819) is showing ST-depression on the ECG. Can you review?", time: "10:32 AM" },
  { id: 2, sender: "me", mine: true, text: "Reviewing now. What was his troponin at last draw?", time: "10:34 AM" },
  { id: 3, sender: "Dr. Priya Nair", mine: false, text: "Troponin I = 0.12 ng/mL (borderline). Repeat in 3h ordered.", time: "10:35 AM" },
  { id: 4, sender: "me", mine: true, text: "Agreed. Start aspirin 325mg stat + Ticagrelor 180mg loading. Prep cath lab on standby. I'll be there in 10.", time: "10:36 AM", read: true },
  { id: 5, sender: "Dr. Priya Nair", mine: false, text: "Roger. Cath lab notified. Patient is on O2 2L NC, stable BP 118/76.", time: "10:37 AM" }
];
function SecureTeamMessaging({ className }) {
  const [activeConv, setActiveConv] = useState74(1);
  const [draft, setDraft] = useState74("");
  const active = conversations.find((c) => c.id === activeConv);
  return /* @__PURE__ */ jsxs178("div", { className: clsx170("h-[600px] flex overflow-hidden rounded-xl border border-urvos-border bg-urvos-surface font-sans text-urvos-text shadow-sm", className), children: [
    /* @__PURE__ */ jsxs178("div", { className: "w-72 shrink-0 border-r border-urvos-border flex flex-col", children: [
      /* @__PURE__ */ jsxs178("div", { className: "p-3 border-b border-urvos-border space-y-2", children: [
        /* @__PURE__ */ jsxs178("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs178("h2", { className: "text-sm font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx206(MessageSquare3, { className: "w-4 h-4 text-urvos-primary" }),
            " Clinical Messaging"
          ] }),
          /* @__PURE__ */ jsx206(Badge, { variant: "info", className: "text-[10px]", children: "HIPAA Secure" })
        ] }),
        /* @__PURE__ */ jsxs178("div", { className: "relative", children: [
          /* @__PURE__ */ jsx206(Search14, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-urvos-text-subtle" }),
          /* @__PURE__ */ jsx206("input", { type: "text", placeholder: "Search colleagues...", className: "w-full pl-8 pr-3 py-2 text-xs border border-urvos-border rounded-lg bg-urvos-background focus:outline-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsx206("div", { className: "flex-1 overflow-y-auto divide-y divide-urvos-border", children: conversations.map((conv) => /* @__PURE__ */ jsx206("button", { onClick: () => setActiveConv(conv.id), className: clsx170("w-full text-left p-3 transition-colors hover:bg-urvos-background", activeConv === conv.id && "bg-urvos-primary/5 border-r-2 border-urvos-primary"), children: /* @__PURE__ */ jsxs178("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxs178("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx206("div", { className: "w-9 h-9 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold", children: conv.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
          conv.online && /* @__PURE__ */ jsx206("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-urvos-success-bg rounded-full border-2 border-urvos-surface" })
        ] }),
        /* @__PURE__ */ jsxs178("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs178("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx206("p", { className: "text-xs font-semibold truncate", children: conv.name }),
            /* @__PURE__ */ jsx206("span", { className: "text-[10px] text-urvos-text-subtle shrink-0 ml-1", children: conv.time })
          ] }),
          /* @__PURE__ */ jsx206("p", { className: "text-[10px] text-urvos-primary font-medium", children: conv.role }),
          conv.patientCtx && /* @__PURE__ */ jsxs178("p", { className: "text-[10px] text-urvos-text-subtle truncate", children: [
            "\u{1F4CB} ",
            conv.patientCtx
          ] }),
          /* @__PURE__ */ jsx206("p", { className: "text-[10px] text-urvos-text-subtle truncate mt-0.5", children: conv.lastMsg })
        ] }),
        conv.unread > 0 && /* @__PURE__ */ jsx206("span", { className: "shrink-0 w-4 h-4 rounded-full bg-urvos-primary text-white text-[9px] font-bold flex items-center justify-center", children: conv.unread })
      ] }) }, conv.id)) })
    ] }),
    /* @__PURE__ */ jsxs178("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxs178("div", { className: "h-14 px-4 flex items-center justify-between border-b border-urvos-border bg-urvos-surface shrink-0", children: [
        /* @__PURE__ */ jsxs178("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxs178("div", { className: "relative", children: [
            /* @__PURE__ */ jsx206("div", { className: "w-8 h-8 rounded-full bg-urvos-primary/10 text-urvos-primary flex items-center justify-center text-xs font-bold", children: active.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
            active.online && /* @__PURE__ */ jsx206("span", { className: "absolute bottom-0 right-0 w-2 h-2 bg-urvos-success-bg rounded-full border-2 border-urvos-surface" })
          ] }),
          /* @__PURE__ */ jsxs178("div", { children: [
            /* @__PURE__ */ jsx206("p", { className: "text-sm font-semibold", children: active.name }),
            /* @__PURE__ */ jsxs178("p", { className: "text-[10px] text-urvos-text-subtle", children: [
              active.role,
              " ",
              active.online ? "\xB7 Online" : "\xB7 Offline"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs178("div", { className: "flex items-center gap-2", children: [
          active.patientCtx && /* @__PURE__ */ jsxs178(Badge, { variant: "info", className: "text-[10px]", children: [
            "\u{1F4CB} ",
            active.patientCtx
          ] }),
          /* @__PURE__ */ jsx206("button", { className: "p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle", "aria-label": "Call", children: /* @__PURE__ */ jsx206(Phone6, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx206("button", { className: "p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle", "aria-label": "Video", children: /* @__PURE__ */ jsx206(Video2, { className: "w-4 h-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx206("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-urvos-background/50", children: messages.map((msg) => /* @__PURE__ */ jsx206("div", { className: clsx170("flex", msg.mine ? "justify-end" : "justify-start"), children: /* @__PURE__ */ jsxs178("div", { className: clsx170("max-w-[75%] space-y-1"), children: [
        !msg.mine && /* @__PURE__ */ jsx206("p", { className: "text-[10px] text-urvos-text-subtle px-1", children: msg.sender }),
        /* @__PURE__ */ jsx206("div", { className: clsx170("px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-xs", msg.mine ? "bg-urvos-primary text-white rounded-br-sm" : "bg-urvos-surface border border-urvos-border text-urvos-text rounded-bl-sm"), children: msg.text }),
        /* @__PURE__ */ jsxs178("div", { className: clsx170("flex items-center gap-1 text-[10px] text-urvos-text-subtle px-1", msg.mine && "justify-end"), children: [
          /* @__PURE__ */ jsx206(Clock20, { className: "w-2.5 h-2.5" }),
          " ",
          msg.time,
          msg.mine && msg.read && /* @__PURE__ */ jsx206(CheckCheck, { className: "w-3 h-3 text-urvos-primary" })
        ] })
      ] }) }, msg.id)) }),
      /* @__PURE__ */ jsx206("div", { className: "px-4 py-1 bg-urvos-warning-bg border-t border-urvos-warning text-center text-[10px] text-urvos-warning shrink-0", children: "\u{1F512} This conversation is HIPAA-compliant and encrypted. Do not share patient data externally." }),
      /* @__PURE__ */ jsx206("div", { className: "p-3 border-t border-urvos-border bg-urvos-surface shrink-0", children: /* @__PURE__ */ jsxs178("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx206("button", { className: "p-2 rounded-lg hover:bg-urvos-background text-urvos-text-subtle shrink-0", children: /* @__PURE__ */ jsx206(Paperclip, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx206(
          "input",
          {
            type: "text",
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            placeholder: "Type a secure message\u2026 (Shift+Enter for new line)",
            className: "flex-1 px-3 py-2 text-xs border border-urvos-border rounded-xl bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
          }
        ),
        /* @__PURE__ */ jsx206("button", { className: clsx170("p-2 rounded-xl shrink-0 transition-colors", draft ? "bg-urvos-primary text-white" : "bg-urvos-border text-urvos-text-subtle"), "aria-label": "Send", children: /* @__PURE__ */ jsx206(Send, { className: "w-4 h-4" }) })
      ] }) })
    ] })
  ] });
}

// components/templates/authentication-communication/MfaVerificationPage.tsx
import { useState as useState75 } from "react";
import { clsx as clsx171 } from "clsx";
import { ShieldCheck as ShieldCheck11, Smartphone, Mail as Mail5, ArrowLeft as ArrowLeft3 } from "lucide-react";
import { jsx as jsx207, jsxs as jsxs179 } from "react/jsx-runtime";
function MfaVerificationPage({
  className,
  defaultMethod = "sms",
  phoneNumber = "***-***-4321",
  email = "d***@hospital.com",
  onVerify,
  onBack,
  onResend
}) {
  const [method, setMethod] = useState75(defaultMethod);
  const [code, setCode] = useState75(["", "", "", "", "", ""]);
  const handleVerify = () => {
    onVerify == null ? void 0 : onVerify(code.join(""));
  };
  return /* @__PURE__ */ jsx207("div", { className: clsx171("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className), children: /* @__PURE__ */ jsxs179(Card, { className: "w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5", children: [
    /* @__PURE__ */ jsxs179("div", { className: "flex flex-col items-center text-center space-y-2 mb-2", children: [
      /* @__PURE__ */ jsx207("div", { className: "w-12 h-12 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary", children: /* @__PURE__ */ jsx207(ShieldCheck11, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx207("h1", { className: "text-xl font-semibold text-urvos-text", children: "Two-Step Verification" }),
      /* @__PURE__ */ jsxs179("p", { className: "text-sm text-urvos-text-subtle", children: [
        method === "sms" && /* @__PURE__ */ jsxs179("span", { children: [
          "Enter the 6-digit code sent to ",
          /* @__PURE__ */ jsx207("br", {}),
          /* @__PURE__ */ jsx207("span", { className: "font-medium text-urvos-text", children: phoneNumber })
        ] }),
        method === "email" && /* @__PURE__ */ jsxs179("span", { children: [
          "Enter the 6-digit code sent to ",
          /* @__PURE__ */ jsx207("br", {}),
          /* @__PURE__ */ jsx207("span", { className: "font-medium text-urvos-text", children: email })
        ] }),
        method === "authenticator" && /* @__PURE__ */ jsxs179("span", { children: [
          "Enter the 6-digit code from your ",
          /* @__PURE__ */ jsx207("br", {}),
          /* @__PURE__ */ jsx207("span", { className: "font-medium text-urvos-text", children: "Authenticator App" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx207("div", { className: "flex gap-2 justify-center py-2", children: code.map((digit, i) => /* @__PURE__ */ jsx207(
      "input",
      {
        type: "text",
        maxLength: 1,
        value: digit,
        onChange: (e) => {
          const next = [...code];
          next[i] = e.target.value.slice(-1);
          setCode(next);
        },
        className: "w-10 h-12 text-center text-lg font-semibold border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/50 text-urvos-text"
      },
      i
    )) }),
    /* @__PURE__ */ jsxs179("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx207(Button, { size: "md", className: "w-full justify-center", onClick: handleVerify, children: "Verify Code" }),
      /* @__PURE__ */ jsxs179("div", { className: "flex flex-col gap-2 pt-2 border-t border-urvos-border", children: [
        method !== "sms" && /* @__PURE__ */ jsxs179(
          "button",
          {
            onClick: () => setMethod("sms"),
            className: "flex items-center gap-2 text-sm text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors",
            children: [
              /* @__PURE__ */ jsx207(Smartphone, { className: "w-4 h-4" }),
              " Send code via SMS"
            ]
          }
        ),
        method !== "email" && /* @__PURE__ */ jsxs179(
          "button",
          {
            onClick: () => setMethod("email"),
            className: "flex items-center gap-2 text-sm text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors",
            children: [
              /* @__PURE__ */ jsx207(Mail5, { className: "w-4 h-4" }),
              " Send code via Email"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs179("div", { className: "flex items-center justify-between mt-4", children: [
      /* @__PURE__ */ jsxs179(
        "button",
        {
          onClick: onBack,
          className: "text-xs text-urvos-text-subtle hover:text-urvos-text flex items-center gap-1 font-medium",
          children: [
            /* @__PURE__ */ jsx207(ArrowLeft3, { className: "w-3 h-3" }),
            " Back to Login"
          ]
        }
      ),
      /* @__PURE__ */ jsx207(
        "button",
        {
          onClick: onResend,
          className: "text-xs text-urvos-primary font-medium hover:underline",
          children: "Resend Code"
        }
      )
    ] })
  ] }) });
}

// components/templates/authentication-communication/ResetPasswordPage.tsx
import { useState as useState76 } from "react";
import { clsx as clsx172 } from "clsx";
import { ShieldCheck as ShieldCheck12, KeyRound as KeyRound2, AlertCircle as AlertCircle14 } from "lucide-react";
import { jsx as jsx208, jsxs as jsxs180 } from "react/jsx-runtime";
function ResetPasswordPage({ className, onReset, onCancel }) {
  const [password, setPassword] = useState76("");
  const [confirmPassword, setConfirmPassword] = useState76("");
  const [showError, setShowError] = useState76(false);
  const isLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const score = (isLength ? 1 : 0) + (hasUpper ? 1 : 0) + (hasSpecial ? 1 : 0);
  const getScoreColor = () => {
    if (score === 0 && password.length > 0) return "bg-urvos-danger-bg";
    if (score === 1) return "bg-urvos-danger-bg";
    if (score === 2) return "bg-urvos-warning-bg";
    if (score === 3) return "bg-urvos-success-bg";
    return "bg-urvos-border";
  };
  const handleReset = () => {
    if (password !== confirmPassword || score < 2) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onReset == null ? void 0 : onReset(password);
  };
  return /* @__PURE__ */ jsx208("div", { className: clsx172("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className), children: /* @__PURE__ */ jsxs180(Card, { className: "w-full max-w-sm p-6 shadow-sm border border-urvos-border bg-urvos-surface space-y-5", children: [
    /* @__PURE__ */ jsxs180("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx208("h1", { className: "text-xl font-semibold", children: "Create New Password" }),
      /* @__PURE__ */ jsx208("p", { className: "text-sm text-urvos-text-subtle", children: "Your new password must be different from previous used passwords." })
    ] }),
    showError && /* @__PURE__ */ jsxs180("div", { className: "p-3 bg-urvos-danger-bg border border-urvos-danger rounded-md flex items-start gap-2", children: [
      /* @__PURE__ */ jsx208(AlertCircle14, { className: "w-4 h-4 text-urvos-danger mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsx208("p", { className: "text-xs text-urvos-danger", children: "Passwords do not match or are not strong enough. Please check requirements." })
    ] }),
    /* @__PURE__ */ jsxs180("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs180("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx208("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "New Password" }),
        /* @__PURE__ */ jsxs180("div", { className: "relative", children: [
          /* @__PURE__ */ jsx208(KeyRound2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
          /* @__PURE__ */ jsx208(
            "input",
            {
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30",
              placeholder: "Enter new password"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs180("div", { className: "flex gap-1 mt-2", children: [
          /* @__PURE__ */ jsx208("div", { className: clsx172("h-1 flex-1 rounded-full", password.length > 0 ? getScoreColor() : "bg-urvos-border") }),
          /* @__PURE__ */ jsx208("div", { className: clsx172("h-1 flex-1 rounded-full", score >= 2 ? getScoreColor() : "bg-urvos-border") }),
          /* @__PURE__ */ jsx208("div", { className: clsx172("h-1 flex-1 rounded-full", score >= 3 ? getScoreColor() : "bg-urvos-border") })
        ] }),
        /* @__PURE__ */ jsxs180("div", { className: "text-[10px] space-y-1 mt-2 text-urvos-text-subtle", children: [
          /* @__PURE__ */ jsx208("p", { className: isLength ? "text-urvos-success" : "", children: "\u2713 At least 8 characters" }),
          /* @__PURE__ */ jsx208("p", { className: hasUpper ? "text-urvos-success" : "", children: "\u2713 At least 1 uppercase letter" }),
          /* @__PURE__ */ jsx208("p", { className: hasSpecial ? "text-urvos-success" : "", children: "\u2713 At least 1 special character" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs180("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx208("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Confirm New Password" }),
        /* @__PURE__ */ jsx208(
          "input",
          {
            type: "password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            className: "w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30",
            placeholder: "Re-enter new password"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs180("div", { className: "pt-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxs180(Button, { size: "md", className: "w-full justify-center", onClick: handleReset, children: [
          /* @__PURE__ */ jsx208(ShieldCheck12, { className: "w-4 h-4 mr-1.5" }),
          " Reset Password"
        ] }),
        /* @__PURE__ */ jsx208(
          "button",
          {
            onClick: onCancel,
            className: "text-sm font-medium text-urvos-text-subtle hover:text-urvos-text p-2 rounded-md hover:bg-urvos-surface-hover transition-colors",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}

// components/templates/authentication-communication/SessionTimeoutOverlay.tsx
import { useState as useState77 } from "react";
import { clsx as clsx173 } from "clsx";
import { Lock as Lock8, LogOut as LogOut2 } from "lucide-react";
import { jsx as jsx209, jsxs as jsxs181 } from "react/jsx-runtime";
function SessionTimeoutOverlay({
  className,
  isOpen = true,
  userFullName = "Dr. Rajesh Kumar",
  userRole = "Cardiologist",
  onUnlock,
  onLogout
}) {
  const [password, setPassword] = useState77("");
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx209("div", { className: clsx173("fixed inset-0 z-[100] flex items-center justify-center bg-urvos-background/80 backdrop-blur-sm", className), children: /* @__PURE__ */ jsxs181("div", { className: "w-full max-w-sm p-8 bg-urvos-surface border border-urvos-border shadow-lg rounded-2xl flex flex-col items-center", children: [
    /* @__PURE__ */ jsx209("div", { className: "w-16 h-16 rounded-full bg-urvos-surface-hover flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx209(Lock8, { className: "w-8 h-8 text-urvos-text-subtle" }) }),
    /* @__PURE__ */ jsx209("h2", { className: "text-xl font-semibold text-urvos-text mb-1", children: "Session Locked" }),
    /* @__PURE__ */ jsx209("p", { className: "text-sm text-center text-urvos-text-subtle mb-6", children: "For your security, your session has been locked due to inactivity." }),
    /* @__PURE__ */ jsxs181("div", { className: "w-full bg-urvos-surface-hover rounded-xl p-4 flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx209("div", { className: "w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary font-bold", children: userFullName.charAt(0) }),
      /* @__PURE__ */ jsxs181("div", { children: [
        /* @__PURE__ */ jsx209("p", { className: "font-medium text-urvos-text text-sm", children: userFullName }),
        /* @__PURE__ */ jsx209("p", { className: "text-xs text-urvos-text-subtle", children: userRole })
      ] })
    ] }),
    /* @__PURE__ */ jsxs181("div", { className: "w-full space-y-4", children: [
      /* @__PURE__ */ jsxs181("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx209("label", { className: "text-xs font-medium text-urvos-text-subtle", children: "Enter Password to Resume" }),
        /* @__PURE__ */ jsx209(
          "input",
          {
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") onUnlock == null ? void 0 : onUnlock(password);
            },
            autoFocus: true,
            className: "w-full px-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30",
            placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
          }
        )
      ] }),
      /* @__PURE__ */ jsx209(Button, { size: "md", className: "w-full justify-center", onClick: () => onUnlock == null ? void 0 : onUnlock(password), children: "Unlock Session" }),
      /* @__PURE__ */ jsxs181(
        "button",
        {
          onClick: onLogout,
          className: "w-full flex items-center justify-center gap-2 text-sm font-medium text-urvos-danger hover:text-urvos-danger hover:bg-urvos-danger-bg p-2 rounded-lg transition-colors mt-2",
          children: [
            /* @__PURE__ */ jsx209(LogOut2, { className: "w-4 h-4" }),
            " Sign Out completely"
          ]
        }
      )
    ] })
  ] }) });
}

// components/templates/authentication-communication/MagicLinkLogin.tsx
import { useState as useState78 } from "react";
import { clsx as clsx174 } from "clsx";
import { Wand2, Mail as Mail6, CheckCircle2 as CheckCircle230 } from "lucide-react";
import { Fragment as Fragment15, jsx as jsx210, jsxs as jsxs182 } from "react/jsx-runtime";
function MagicLinkLogin({ className, onRequestLink, onUsePassword }) {
  const [email, setEmail] = useState78("");
  const [step, setStep] = useState78("request");
  const handleRequest = () => {
    if (!email) return;
    setStep("sent");
    onRequestLink == null ? void 0 : onRequestLink(email);
  };
  return /* @__PURE__ */ jsx210("div", { className: clsx174("min-h-screen bg-urvos-background flex flex-col items-center justify-center px-4 font-sans text-urvos-text", className), children: /* @__PURE__ */ jsxs182(Card, { className: "w-full max-w-sm p-8 shadow-sm border border-urvos-border bg-urvos-surface space-y-6", children: [
    step === "request" && /* @__PURE__ */ jsxs182(Fragment15, { children: [
      /* @__PURE__ */ jsxs182("div", { className: "flex flex-col items-center text-center space-y-3", children: [
        /* @__PURE__ */ jsx210("div", { className: "w-14 h-14 rounded-2xl bg-urvos-primary/10 flex items-center justify-center text-urvos-primary shadow-sm border border-urvos-primary/20", children: /* @__PURE__ */ jsx210(Wand2, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxs182("div", { children: [
          /* @__PURE__ */ jsx210("h1", { className: "text-xl font-semibold", children: "Magic Link Sign In" }),
          /* @__PURE__ */ jsx210("p", { className: "text-sm text-urvos-text-subtle mt-1", children: "Enter your email and we'll send you a secure, passwordless link to sign in instantly." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs182("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs182("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx210("label", { className: "text-sm font-medium text-urvos-text", children: "Email Address" }),
          /* @__PURE__ */ jsxs182("div", { className: "relative", children: [
            /* @__PURE__ */ jsx210(Mail6, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-urvos-text-subtle" }),
            /* @__PURE__ */ jsx210(
              "input",
              {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full pl-9 pr-3 py-2.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30",
                placeholder: "patient@example.com"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx210(Button, { size: "md", className: "w-full justify-center", onClick: handleRequest, children: "Send Magic Link" })
      ] }),
      /* @__PURE__ */ jsx210("div", { className: "pt-4 border-t border-urvos-border text-center", children: /* @__PURE__ */ jsx210(
        "button",
        {
          onClick: onUsePassword,
          className: "text-sm text-urvos-text-subtle hover:text-urvos-text font-medium transition-colors",
          children: "Sign in with Password instead"
        }
      ) })
    ] }),
    step === "sent" && /* @__PURE__ */ jsxs182("div", { className: "flex flex-col items-center text-center space-y-4 py-4", children: [
      /* @__PURE__ */ jsx210("div", { className: "w-16 h-16 rounded-full bg-urvos-success-bg border border-urvos-success flex items-center justify-center text-urvos-success", children: /* @__PURE__ */ jsx210(CheckCircle230, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxs182("div", { children: [
        /* @__PURE__ */ jsx210("h1", { className: "text-xl font-semibold", children: "Check your email" }),
        /* @__PURE__ */ jsxs182("p", { className: "text-sm text-urvos-text-subtle mt-2", children: [
          "We've sent a magic link to ",
          /* @__PURE__ */ jsx210("br", {}),
          /* @__PURE__ */ jsx210("span", { className: "font-medium text-urvos-text", children: email })
        ] }),
        /* @__PURE__ */ jsx210("p", { className: "text-xs text-urvos-text-subtle mt-3 bg-urvos-surface-hover p-3 rounded-lg border border-urvos-border", children: "Click the link in the email to securely sign in to your patient portal. The link expires in 15 minutes." })
      ] }),
      /* @__PURE__ */ jsx210(
        "button",
        {
          onClick: () => setStep("request"),
          className: "text-sm text-urvos-primary font-medium hover:underline mt-4",
          children: "Try another email address"
        }
      )
    ] })
  ] }) });
}

// components/templates/authentication-communication/EnterpriseSsoLogin.tsx
import { clsx as clsx175 } from "clsx";
import { Server, Building, KeyRound as KeyRound3, ArrowRight as ArrowRight7, ShieldCheck as ShieldCheck13 } from "lucide-react";
import { jsx as jsx211, jsxs as jsxs183 } from "react/jsx-runtime";
function EnterpriseSsoLogin({
  className,
  hospitalName = "Memorial Healthcare System",
  onSsoLogin,
  onStaffLogin,
  onPatientLogin
}) {
  return /* @__PURE__ */ jsxs183("div", { className: clsx175("min-h-screen bg-urvos-background flex flex-col md:flex-row font-sans text-urvos-text", className), children: [
    /* @__PURE__ */ jsxs183("div", { className: "hidden md:flex flex-col justify-between w-1/3 bg-urvos-surface border-r border-urvos-border p-10", children: [
      /* @__PURE__ */ jsxs183("div", { children: [
        /* @__PURE__ */ jsxs183("div", { className: "flex items-center gap-2 mb-12", children: [
          /* @__PURE__ */ jsx211("div", { className: "w-10 h-10 rounded-xl bg-urvos-primary flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx211(Server, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsx211("span", { className: "text-xl font-bold tracking-tight", children: "Urvos Enterprise" })
        ] }),
        /* @__PURE__ */ jsxs183("h1", { className: "text-3xl font-semibold leading-tight mb-4", children: [
          "Secure Access for ",
          /* @__PURE__ */ jsx211("br", {}),
          " ",
          hospitalName
        ] }),
        /* @__PURE__ */ jsx211("p", { className: "text-urvos-text-subtle mb-8", children: "Access your unified clinical workspace, patient records, and communication tools securely through your organization's identity provider." })
      ] }),
      /* @__PURE__ */ jsxs183("div", { className: "text-xs text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsx211("p", { children: "Protected by Urvos Security Center" }),
        /* @__PURE__ */ jsx211("p", { className: "mt-1", children: "HIPAA Compliant \u2022 SOC 2 Type II" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs183("div", { className: "flex-1 flex flex-col items-center justify-center p-6 md:p-20 bg-urvos-background", children: [
      /* @__PURE__ */ jsxs183("div", { className: "flex md:hidden items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx211("div", { className: "w-8 h-8 rounded-lg bg-urvos-primary flex items-center justify-center", children: /* @__PURE__ */ jsx211(Server, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsx211("span", { className: "text-lg font-bold tracking-tight", children: "Urvos Enterprise" })
      ] }),
      /* @__PURE__ */ jsxs183(Card, { className: "w-full max-w-md p-8 shadow-sm border border-urvos-border bg-urvos-surface space-y-8", children: [
        /* @__PURE__ */ jsxs183("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsx211("h2", { className: "text-2xl font-semibold", children: "Sign In" }),
          /* @__PURE__ */ jsx211("p", { className: "text-sm text-urvos-text-subtle", children: "Choose your authentication method" })
        ] }),
        /* @__PURE__ */ jsxs183("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs183(
            "button",
            {
              onClick: () => onSsoLogin == null ? void 0 : onSsoLogin("azure"),
              className: "w-full flex items-center justify-between p-4 border border-urvos-border rounded-xl bg-urvos-background hover:bg-urvos-surface-hover hover:border-urvos-primary/30 transition-all group",
              children: [
                /* @__PURE__ */ jsxs183("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx211("div", { className: "w-8 h-8 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary", children: /* @__PURE__ */ jsx211(Building, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs183("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsx211("p", { className: "font-medium text-sm group-hover:text-urvos-primary transition-colors", children: "Azure Active Directory" }),
                    /* @__PURE__ */ jsx211("p", { className: "text-xs text-urvos-text-subtle", children: "Corporate Login (Recommended)" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx211(ArrowRight7, { className: "w-4 h-4 text-urvos-text-subtle group-hover:text-urvos-primary transition-colors" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs183(
            "button",
            {
              onClick: () => onSsoLogin == null ? void 0 : onSsoLogin("okta"),
              className: "w-full flex items-center justify-between p-4 border border-urvos-border rounded-xl bg-urvos-background hover:bg-urvos-surface-hover hover:border-urvos-primary/30 transition-all group",
              children: [
                /* @__PURE__ */ jsxs183("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx211("div", { className: "w-8 h-8 rounded bg-urvos-glass flex items-center justify-center text-urvos-primary", children: /* @__PURE__ */ jsx211(ShieldCheck13, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs183("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsx211("p", { className: "font-medium text-sm group-hover:text-urvos-primary transition-colors", children: "Okta SSO" }),
                    /* @__PURE__ */ jsx211("p", { className: "text-xs text-urvos-text-subtle", children: "Alternative Corporate Login" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx211(ArrowRight7, { className: "w-4 h-4 text-urvos-text-subtle group-hover:text-urvos-primary transition-colors" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs183("div", { className: "relative flex items-center py-2", children: [
          /* @__PURE__ */ jsx211("div", { className: "flex-grow border-t border-urvos-border" }),
          /* @__PURE__ */ jsx211("span", { className: "flex-shrink-0 mx-4 text-xs text-urvos-text-subtle uppercase tracking-wider font-medium", children: "Or" }),
          /* @__PURE__ */ jsx211("div", { className: "flex-grow border-t border-urvos-border" })
        ] }),
        /* @__PURE__ */ jsxs183("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs183(
            "button",
            {
              onClick: onStaffLogin,
              className: "w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-urvos-text hover:bg-urvos-surface-hover border border-transparent hover:border-urvos-border rounded-lg transition-colors",
              children: [
                /* @__PURE__ */ jsx211(KeyRound3, { className: "w-4 h-4 text-urvos-text-subtle" }),
                "Staff Login (Urvos Credentials)"
              ]
            }
          ),
          /* @__PURE__ */ jsx211(
            "button",
            {
              onClick: onPatientLogin,
              className: "w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-urvos-text hover:bg-urvos-surface-hover border border-transparent hover:border-urvos-border rounded-lg transition-colors",
              children: "Patient Portal Login"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs183("p", { className: "mt-8 text-xs text-urvos-text-subtle text-center", children: [
        "Need help accessing your account? ",
        /* @__PURE__ */ jsx211("a", { href: "#", className: "text-urvos-primary hover:underline", children: "Contact IT Helpdesk" })
      ] })
    ] })
  ] });
}

// components/templates/authentication-communication/UnifiedClinicalInbox.tsx
import { useState as useState79 } from "react";
import { clsx as clsx176 } from "clsx";
import { Inbox, AlertTriangle as AlertTriangle28, FileText as FileText23, Search as Search15, Filter as Filter3, MoreVertical as MoreVertical2, CheckCircle as CheckCircle7, Printer } from "lucide-react";
import { Fragment as Fragment16, jsx as jsx212, jsxs as jsxs184 } from "react/jsx-runtime";
function UnifiedClinicalInbox({ className }) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [activeCategory, setActiveCategory] = useState79("all");
  const [selectedMessage, setSelectedMessage] = useState79(1);
  const messages2 = [
    {
      id: 1,
      category: "direct",
      sender: "Dr. Sarah Jenkins",
      subject: "Consultation Request: Patient John Doe",
      preview: "Hi Rajesh, I have a complex cardiology case I'd like your opinion on...",
      time: "10:42 AM",
      unread: true,
      urgent: false
    },
    {
      id: 2,
      category: "labs",
      sender: "Lab System",
      subject: "Critical Value: Potassium 6.2 mEq/L",
      preview: "Patient: Alice Smith. Ordered by: Dr. Rajesh Kumar. Value requires immediate attention.",
      time: "09:15 AM",
      unread: true,
      urgent: true
    },
    {
      id: 3,
      category: "system",
      sender: "IT Administrator",
      subject: "Scheduled Downtime Tonight",
      preview: "The EHR system will be down for maintenance from 2:00 AM to 4:00 AM.",
      time: "Yesterday",
      unread: false,
      urgent: false
    },
    {
      id: 4,
      category: "direct",
      sender: "Nurse Jackie",
      subject: "Discharge instructions for Bed 4",
      preview: "Could you review and sign the discharge summary for Mr. Patel?",
      time: "Yesterday",
      unread: false,
      urgent: false
    }
  ];
  const filteredMessages = messages2.filter((m) => activeCategory === "all" || m.category === activeCategory);
  return /* @__PURE__ */ jsxs184("div", { className: clsx176("h-[800px] max-h-screen flex flex-col bg-urvos-background font-sans text-urvos-text border border-urvos-border rounded-xl overflow-hidden shadow-sm", className), children: [
    /* @__PURE__ */ jsxs184("header", { className: "h-16 flex-shrink-0 border-b border-urvos-border bg-urvos-surface flex items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx212("div", { className: "w-8 h-8 rounded-lg bg-urvos-primary/10 flex items-center justify-center text-urvos-primary", children: /* @__PURE__ */ jsx212(Inbox, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx212("h1", { className: "text-lg font-semibold", children: "Clinical Inbox" }),
        /* @__PURE__ */ jsx212(Badge, { variant: "caution", className: "ml-2", children: "2 Unread" })
      ] }),
      /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs184("div", { className: "relative w-64", children: [
          /* @__PURE__ */ jsx212(Search15, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-urvos-text-subtle" }),
          /* @__PURE__ */ jsx212(
            "input",
            {
              type: "text",
              placeholder: "Search messages...",
              className: "w-full pl-9 pr-3 py-1.5 text-sm border border-urvos-border rounded-lg bg-urvos-background focus:outline-none focus:ring-2 focus:ring-urvos-primary/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs184(Button, { variant: "secondary", size: "sm", className: "hidden sm:inline-flex", children: [
          /* @__PURE__ */ jsx212(Filter3, { className: "w-4 h-4 mr-2" }),
          "Filter"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs184("div", { className: "flex-1 flex overflow-hidden", children: [
      /* @__PURE__ */ jsxs184("div", { className: "w-full md:w-1/3 flex-shrink-0 border-r border-urvos-border bg-urvos-surface flex flex-col", children: [
        /* @__PURE__ */ jsxs184("div", { className: "flex p-2 gap-1 border-b border-urvos-border overflow-x-auto", children: [
          /* @__PURE__ */ jsx212(
            "button",
            {
              onClick: () => setActiveCategory("all"),
              className: clsx176("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "all" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover"),
              children: "All Messages"
            }
          ),
          /* @__PURE__ */ jsx212(
            "button",
            {
              onClick: () => setActiveCategory("direct"),
              className: clsx176("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "direct" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover"),
              children: "Direct"
            }
          ),
          /* @__PURE__ */ jsxs184(
            "button",
            {
              onClick: () => setActiveCategory("labs"),
              className: clsx176("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap flex items-center gap-1", activeCategory === "labs" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover"),
              children: [
                "Labs ",
                /* @__PURE__ */ jsx212("span", { className: "w-2 h-2 rounded-full bg-urvos-danger-bg" })
              ]
            }
          ),
          /* @__PURE__ */ jsx212(
            "button",
            {
              onClick: () => setActiveCategory("system"),
              className: clsx176("px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap", activeCategory === "system" ? "bg-urvos-primary text-white" : "text-urvos-text-subtle hover:bg-urvos-surface-hover"),
              children: "System Alerts"
            }
          )
        ] }),
        /* @__PURE__ */ jsx212("div", { className: "flex-1 overflow-y-auto", children: filteredMessages.map((msg) => /* @__PURE__ */ jsxs184(
          "div",
          {
            onClick: () => setSelectedMessage(msg.id),
            className: clsx176(
              "p-4 border-b border-urvos-border cursor-pointer transition-colors relative",
              selectedMessage === msg.id ? "bg-urvos-primary/5 border-l-2 border-l-urvos-primary" : "hover:bg-urvos-surface-hover border-l-2 border-l-transparent",
              msg.unread ? "font-semibold" : "font-normal"
            ),
            children: [
              msg.unread && /* @__PURE__ */ jsx212("div", { className: "absolute top-4 right-4 w-2 h-2 rounded-full bg-urvos-primary" }),
              /* @__PURE__ */ jsxs184("div", { className: "flex justify-between items-start mb-1 pr-4", children: [
                /* @__PURE__ */ jsx212("span", { className: "text-sm truncate mr-2", children: msg.sender }),
                /* @__PURE__ */ jsx212("span", { className: "text-xs text-urvos-text-subtle whitespace-nowrap", children: msg.time })
              ] }),
              /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-1.5 mb-1", children: [
                msg.urgent && /* @__PURE__ */ jsx212(AlertTriangle28, { className: "w-3.5 h-3.5 text-urvos-danger" }),
                /* @__PURE__ */ jsx212("h4", { className: "text-sm truncate", children: msg.subject })
              ] }),
              /* @__PURE__ */ jsx212("p", { className: "text-xs text-urvos-text-subtle line-clamp-2", children: msg.preview })
            ]
          },
          msg.id
        )) })
      ] }),
      /* @__PURE__ */ jsx212("div", { className: "hidden md:flex flex-1 bg-urvos-background flex-col", children: selectedMessage ? /* @__PURE__ */ jsxs184(Fragment16, { children: [
        /* @__PURE__ */ jsx212("div", { className: "p-6 border-b border-urvos-border bg-urvos-surface", children: /* @__PURE__ */ jsxs184("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxs184("div", { children: [
            /* @__PURE__ */ jsxs184("h2", { className: "text-xl font-bold mb-2", children: [
              ((_a = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _a.urgent) && /* @__PURE__ */ jsx212(Badge, { variant: "critical", className: "mr-2 mb-1 align-middle", children: "URGENT" }),
              (_b = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _b.subject
            ] }),
            /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx212(Avatar, { name: ((_c = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _c.sender) || "U", size: "sm" }),
              /* @__PURE__ */ jsxs184("div", { children: [
                /* @__PURE__ */ jsx212("p", { className: "text-sm font-medium", children: (_d = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _d.sender }),
                /* @__PURE__ */ jsxs184("p", { className: "text-xs text-urvos-text-subtle", children: [
                  "To: You \u2022 ",
                  (_e = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _e.time
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs184("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx212(Button, { variant: "secondary", size: "sm", title: "Mark as Read/Unread", children: /* @__PURE__ */ jsx212(CheckCircle7, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxs184(Button, { variant: "secondary", size: "sm", children: [
              /* @__PURE__ */ jsx212(Printer, { className: "w-4 h-4 mr-2" }),
              "Print"
            ] }),
            /* @__PURE__ */ jsx212(Button, { variant: "ghost", size: "sm", className: "px-2", children: /* @__PURE__ */ jsx212(MoreVertical2, { className: "w-4 h-4" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs184("div", { className: "p-8 flex-1 overflow-y-auto", children: [
          ((_f = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _f.category) === "labs" ? /* @__PURE__ */ jsxs184(Card, { className: "p-5 border-urvos-danger bg-urvos-danger-bg/50 shadow-none mb-6", children: [
            /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-2 text-urvos-danger font-semibold mb-2", children: [
              /* @__PURE__ */ jsx212(AlertTriangle28, { className: "w-5 h-5" }),
              "Critical Lab Result"
            ] }),
            /* @__PURE__ */ jsxs184("div", { className: "grid grid-cols-2 gap-4 text-sm mt-4", children: [
              /* @__PURE__ */ jsxs184("div", { children: [
                /* @__PURE__ */ jsx212("p", { className: "text-urvos-text-subtle", children: "Patient" }),
                /* @__PURE__ */ jsx212("p", { className: "font-medium", children: "Alice Smith (DOB: 12/04/1980)" })
              ] }),
              /* @__PURE__ */ jsxs184("div", { children: [
                /* @__PURE__ */ jsx212("p", { className: "text-urvos-text-subtle", children: "Collected" }),
                /* @__PURE__ */ jsx212("p", { className: "font-medium", children: "Today, 08:30 AM" })
              ] }),
              /* @__PURE__ */ jsxs184("div", { className: "col-span-2 p-3 bg-white rounded border border-urvos-danger", children: [
                /* @__PURE__ */ jsxs184("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx212("span", { className: "font-medium", children: "Potassium (K) Level" }),
                  /* @__PURE__ */ jsx212("span", { className: "text-urvos-danger font-bold text-lg", children: "6.2 mEq/L" })
                ] }),
                /* @__PURE__ */ jsx212("p", { className: "text-xs text-urvos-text-subtle mt-1", children: "Reference Range: 3.6 - 5.2 mEq/L" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs184("div", { className: "mt-4 flex gap-3", children: [
              /* @__PURE__ */ jsx212(Button, { size: "sm", variant: "primary", children: "Open Patient Chart" }),
              /* @__PURE__ */ jsx212(Button, { size: "sm", variant: "secondary", children: "Acknowledge" })
            ] })
          ] }) : /* @__PURE__ */ jsxs184("div", { className: "prose prose-sm max-w-none text-urvos-text", children: [
            /* @__PURE__ */ jsx212("p", { children: "Hi Rajesh," }),
            /* @__PURE__ */ jsx212("p", { children: "I have a complex cardiology case I'd like your opinion on. The patient presented with atypical chest pain and has a history of severe hypertension." }),
            /* @__PURE__ */ jsx212("p", { children: "I've attached the latest EKG and echo reports. Could we briefly discuss this during lunch?" }),
            /* @__PURE__ */ jsxs184("p", { children: [
              "Thanks,",
              /* @__PURE__ */ jsx212("br", {}),
              "Sarah"
            ] })
          ] }),
          ((_g = messages2.find((m) => m.id === selectedMessage)) == null ? void 0 : _g.category) === "direct" && /* @__PURE__ */ jsxs184("div", { className: "mt-8 border-t border-urvos-border pt-6", children: [
            /* @__PURE__ */ jsx212("h4", { className: "text-sm font-medium mb-3", children: "Attachments (2)" }),
            /* @__PURE__ */ jsxs184("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-2 p-2.5 border border-urvos-border rounded-lg bg-urvos-surface w-48 cursor-pointer hover:border-urvos-primary transition-colors", children: [
                /* @__PURE__ */ jsx212("div", { className: "w-8 h-8 bg-urvos-glass text-urvos-primary rounded flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx212(FileText23, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxs184("div", { className: "overflow-hidden", children: [
                  /* @__PURE__ */ jsx212("p", { className: "text-xs font-medium truncate", children: "EKG_Tracing_Oct24.pdf" }),
                  /* @__PURE__ */ jsx212("p", { className: "text-[10px] text-urvos-text-subtle", children: "1.2 MB" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs184("div", { className: "flex items-center gap-2 p-2.5 border border-urvos-border rounded-lg bg-urvos-surface w-48 cursor-pointer hover:border-urvos-primary transition-colors", children: [
                /* @__PURE__ */ jsx212("div", { className: "w-8 h-8 bg-urvos-glass text-urvos-primary rounded flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx212(FileText23, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxs184("div", { className: "overflow-hidden", children: [
                  /* @__PURE__ */ jsx212("p", { className: "text-xs font-medium truncate", children: "Echo_Report.pdf" }),
                  /* @__PURE__ */ jsx212("p", { className: "text-[10px] text-urvos-text-subtle", children: "450 KB" })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs184("div", { className: "flex-1 flex flex-col items-center justify-center text-urvos-text-subtle", children: [
        /* @__PURE__ */ jsx212(Inbox, { className: "w-12 h-12 mb-4 opacity-20" }),
        /* @__PURE__ */ jsx212("p", { children: "Select a message to read" })
      ] }) })
    ] })
  ] });
}

// components/templates/authentication-communication/PatientPortalMessaging.tsx
import { useState as useState80 } from "react";
import { clsx as clsx177 } from "clsx";
import { Paperclip as Paperclip2, Send as Send2, AlertTriangle as AlertTriangle29, ShieldCheck as ShieldCheck14 } from "lucide-react";
import { jsx as jsx213, jsxs as jsxs185 } from "react/jsx-runtime";
function PatientPortalMessaging({ className, patientName = "John Doe" }) {
  const [message, setMessage] = useState80("");
  return /* @__PURE__ */ jsxs185("div", { className: clsx177("max-w-4xl mx-auto flex flex-col h-[700px] bg-urvos-background font-sans text-urvos-text border border-urvos-border rounded-xl overflow-hidden shadow-sm", className), children: [
    /* @__PURE__ */ jsxs185("header", { className: "h-16 flex-shrink-0 border-b border-urvos-border bg-urvos-surface flex items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxs185("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx213("div", { className: "w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary font-bold", children: "DR" }),
        /* @__PURE__ */ jsxs185("div", { children: [
          /* @__PURE__ */ jsx213("h1", { className: "text-sm font-semibold", children: "Dr. Rajesh Kumar" }),
          /* @__PURE__ */ jsx213("p", { className: "text-xs text-urvos-text-subtle", children: "Cardiology Department" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs185("div", { className: "flex items-center gap-2 text-xs font-medium text-urvos-success bg-urvos-success-bg px-3 py-1.5 rounded-full", children: [
        /* @__PURE__ */ jsx213(ShieldCheck14, { className: "w-3.5 h-3.5" }),
        "Secure Connection"
      ] })
    ] }),
    /* @__PURE__ */ jsxs185("div", { className: "bg-urvos-danger-bg border-b border-urvos-danger p-3 flex items-start gap-2", children: [
      /* @__PURE__ */ jsx213(AlertTriangle29, { className: "w-4 h-4 text-urvos-danger mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxs185("p", { className: "text-xs text-urvos-danger", children: [
        /* @__PURE__ */ jsx213("strong", { children: "This messaging system is not for medical emergencies." }),
        " If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately. Messages are typically answered within 2 business days."
      ] })
    ] }),
    /* @__PURE__ */ jsxs185("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
      /* @__PURE__ */ jsx213("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx213("span", { className: "text-[10px] font-medium text-urvos-text-subtle uppercase tracking-wider bg-urvos-surface-hover px-2 py-1 rounded-md", children: "Tuesday, Oct 24" }) }),
      /* @__PURE__ */ jsx213("div", { className: "flex gap-3 justify-end", children: /* @__PURE__ */ jsxs185("div", { className: "max-w-[75%]", children: [
        /* @__PURE__ */ jsx213("div", { className: "bg-urvos-primary text-white p-3 rounded-2xl rounded-tr-sm shadow-sm", children: /* @__PURE__ */ jsx213("p", { className: "text-sm", children: "Hi Dr. Kumar, I've been checking my blood pressure daily like you asked. It's been hovering around 135/85. Is this okay or should I adjust my medication?" }) }),
        /* @__PURE__ */ jsx213("p", { className: "text-xs text-right text-urvos-text-subtle mt-1", children: "10:14 AM" })
      ] }) }),
      /* @__PURE__ */ jsxs185("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx213("div", { className: "mt-auto", children: /* @__PURE__ */ jsx213(Avatar, { name: "Dr. Rajesh Kumar", size: "sm" }) }),
        /* @__PURE__ */ jsxs185("div", { className: "max-w-[75%]", children: [
          /* @__PURE__ */ jsxs185("div", { className: "bg-urvos-surface border border-urvos-border p-3 rounded-2xl rounded-tl-sm shadow-sm", children: [
            /* @__PURE__ */ jsx213("p", { className: "text-sm", children: "Hello John. 135/85 is slightly elevated but acceptable for now as your body adjusts to the new dosage. Let's not change the medication yet." }),
            /* @__PURE__ */ jsx213("p", { className: "text-sm mt-2", children: "Please continue to monitor it daily and we will review the full log at your next appointment in two weeks." })
          ] }),
          /* @__PURE__ */ jsx213("p", { className: "text-xs text-urvos-text-subtle mt-1", children: "11:30 AM" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx213("div", { className: "p-4 bg-urvos-surface border-t border-urvos-border", children: /* @__PURE__ */ jsxs185("div", { className: "flex flex-col gap-3 bg-urvos-background border border-urvos-border rounded-xl p-3 focus-within:ring-2 focus-within:ring-urvos-primary/30 transition-shadow", children: [
      /* @__PURE__ */ jsx213(
        "textarea",
        {
          className: "w-full bg-transparent border-none focus:outline-none resize-none text-sm min-h-[80px]",
          placeholder: "Type your message to Dr. Kumar...",
          value: message,
          onChange: (e) => setMessage(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxs185("div", { className: "flex justify-between items-center pt-2", children: [
        /* @__PURE__ */ jsxs185("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx213("button", { className: "p-2 text-urvos-text-subtle hover:text-urvos-text hover:bg-urvos-surface-hover rounded-full transition-colors", title: "Attach file", children: /* @__PURE__ */ jsx213(Paperclip2, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx213("span", { className: "text-xs text-urvos-text-subtle", children: "Supported: PDF, JPG, PNG (Max 5MB)" })
        ] }),
        /* @__PURE__ */ jsxs185(Button, { size: "sm", disabled: !message.trim(), className: "gap-2", children: [
          "Send ",
          /* @__PURE__ */ jsx213(Send2, { className: "w-3.5 h-3.5" })
        ] })
      ] })
    ] }) })
  ] });
}

// components/templates/authentication-communication/TelehealthWaitingRoom.tsx
import { useState as useState81, useEffect as useEffect34 } from "react";
import { clsx as clsx178 } from "clsx";
import { Video as Video3, Mic as Mic2, MicOff, VideoOff, CheckCircle2 as CheckCircle232, AlertCircle as AlertCircle15, Settings as Settings6, PhoneForwarded } from "lucide-react";
import { jsx as jsx214, jsxs as jsxs186 } from "react/jsx-runtime";
function TelehealthWaitingRoom({
  className,
  providerName = "Dr. Rajesh Kumar",
  appointmentTime = "Today, 10:30 AM",
  onJoinCall
}) {
  const [micEnabled, setMicEnabled] = useState81(true);
  const [camEnabled, setCamEnabled] = useState81(true);
  const [micTested, setMicTested] = useState81(true);
  const [camTested, setCamTested] = useState81(true);
  const [netTested, setNetTested] = useState81(true);
  const [providerReady, setProviderReady] = useState81(false);
  useEffect34(() => {
    const timer = setTimeout(() => {
      setProviderReady(true);
    }, 3e3);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ jsx214("div", { className: clsx178("min-h-screen bg-urvos-background flex flex-col items-center justify-center p-4 font-sans text-urvos-text", className), children: /* @__PURE__ */ jsxs186("div", { className: "w-full max-w-4xl grid md:grid-cols-5 gap-6", children: [
    /* @__PURE__ */ jsx214("div", { className: "md:col-span-3 space-y-4", children: /* @__PURE__ */ jsxs186("div", { className: "relative w-full aspect-video bg-urvos-ink rounded-2xl overflow-hidden shadow-md flex items-center justify-center border border-urvos-border", children: [
      camEnabled ? /* @__PURE__ */ jsxs186("div", { className: "text-center text-white space-y-2 opacity-50", children: [
        /* @__PURE__ */ jsx214(Video3, { className: "w-12 h-12 mx-auto" }),
        /* @__PURE__ */ jsx214("p", { children: "Camera Preview Active" })
      ] }) : /* @__PURE__ */ jsxs186("div", { className: "text-center text-white space-y-2 opacity-50", children: [
        /* @__PURE__ */ jsx214(VideoOff, { className: "w-12 h-12 mx-auto text-urvos-danger" }),
        /* @__PURE__ */ jsx214("p", { children: "Camera is off" })
      ] }),
      /* @__PURE__ */ jsxs186("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-urvos-ink/80 backdrop-blur-md rounded-full", children: [
        /* @__PURE__ */ jsx214(
          "button",
          {
            onClick: () => setMicEnabled(!micEnabled),
            className: clsx178("w-12 h-12 rounded-full flex items-center justify-center transition-colors", micEnabled ? "bg-white/10 hover:bg-white/20 text-white" : "bg-urvos-danger-bg hover:bg-urvos-danger-bg text-white"),
            children: micEnabled ? /* @__PURE__ */ jsx214(Mic2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx214(MicOff, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx214(
          "button",
          {
            onClick: () => setCamEnabled(!camEnabled),
            className: clsx178("w-12 h-12 rounded-full flex items-center justify-center transition-colors", camEnabled ? "bg-white/10 hover:bg-white/20 text-white" : "bg-urvos-danger-bg hover:bg-urvos-danger-bg text-white"),
            children: camEnabled ? /* @__PURE__ */ jsx214(Video3, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx214(VideoOff, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx214("div", { className: "w-px h-8 bg-white/20 mx-2" }),
        /* @__PURE__ */ jsx214("button", { className: "w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsx214(Settings6, { className: "w-5 h-5" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx214("div", { className: "md:col-span-2 space-y-6", children: /* @__PURE__ */ jsxs186(Card, { className: "p-6 border border-urvos-border shadow-sm", children: [
      /* @__PURE__ */ jsx214("h1", { className: "text-xl font-bold mb-1", children: "Telehealth Visit" }),
      /* @__PURE__ */ jsxs186("p", { className: "text-sm text-urvos-text-subtle mb-6", children: [
        "with ",
        providerName,
        " \u2022 ",
        appointmentTime
      ] }),
      /* @__PURE__ */ jsxs186("div", { className: "space-y-4 mb-8", children: [
        /* @__PURE__ */ jsx214("h3", { className: "text-sm font-semibold uppercase tracking-wider text-urvos-text-subtle", children: "System Check" }),
        /* @__PURE__ */ jsxs186("div", { className: "flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface", children: [
          /* @__PURE__ */ jsxs186("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx214(Mic2, { className: "w-4 h-4 text-urvos-text-subtle" }),
            /* @__PURE__ */ jsx214("span", { className: "text-sm font-medium", children: "Microphone" })
          ] }),
          micTested ? /* @__PURE__ */ jsx214(CheckCircle232, { className: "w-5 h-5 text-urvos-success" }) : /* @__PURE__ */ jsx214(AlertCircle15, { className: "w-5 h-5 text-urvos-danger" })
        ] }),
        /* @__PURE__ */ jsxs186("div", { className: "flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface", children: [
          /* @__PURE__ */ jsxs186("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx214(Video3, { className: "w-4 h-4 text-urvos-text-subtle" }),
            /* @__PURE__ */ jsx214("span", { className: "text-sm font-medium", children: "Camera" })
          ] }),
          camTested ? /* @__PURE__ */ jsx214(CheckCircle232, { className: "w-5 h-5 text-urvos-success" }) : /* @__PURE__ */ jsx214(AlertCircle15, { className: "w-5 h-5 text-urvos-danger" })
        ] }),
        /* @__PURE__ */ jsxs186("div", { className: "flex items-center justify-between p-3 rounded-lg border border-urvos-border bg-urvos-surface", children: [
          /* @__PURE__ */ jsxs186("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx214(PhoneForwarded, { className: "w-4 h-4 text-urvos-text-subtle" }),
            /* @__PURE__ */ jsx214("span", { className: "text-sm font-medium", children: "Connection" })
          ] }),
          netTested ? /* @__PURE__ */ jsx214(CheckCircle232, { className: "w-5 h-5 text-urvos-success" }) : /* @__PURE__ */ jsx214(AlertCircle15, { className: "w-5 h-5 text-urvos-danger" })
        ] })
      ] }),
      providerReady ? /* @__PURE__ */ jsxs186("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs186("div", { className: "bg-urvos-success-bg border border-urvos-success text-urvos-success text-sm p-4 rounded-lg flex gap-3", children: [
          /* @__PURE__ */ jsx214("div", { className: "w-2 h-2 rounded-full bg-urvos-success-bg animate-pulse mt-1.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxs186("p", { children: [
            /* @__PURE__ */ jsxs186("strong", { children: [
              providerName,
              " is ready."
            ] }),
            " You can now join the secure video consultation."
          ] })
        ] }),
        /* @__PURE__ */ jsx214(Button, { size: "lg", className: "w-full text-base", onClick: onJoinCall, children: "Join Consultation" })
      ] }) : /* @__PURE__ */ jsxs186("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs186("div", { className: "bg-urvos-warning-bg border border-urvos-warning text-urvos-warning text-sm p-4 rounded-lg flex gap-3", children: [
          /* @__PURE__ */ jsx214("div", { className: "w-4 h-4 border-2 border-urvos-warning border-t-transparent rounded-full animate-spin mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxs186("p", { children: [
            "Please wait here. ",
            /* @__PURE__ */ jsx214("strong", { children: providerName }),
            " will join the call shortly when they are ready."
          ] })
        ] }),
        /* @__PURE__ */ jsx214(Button, { size: "lg", className: "w-full text-base", disabled: true, children: "Waiting for Provider..." })
      ] })
    ] }) })
  ] }) });
}
export {
  ABDMConsentManager,
  ABHAHealthIDCard,
  AbdmGatewayDashboard,
  Accordion,
  AdvancedDirective,
  Alert,
  AlertError,
  AlertInfo,
  AlertSuccess,
  AlertWarning,
  AllergyManager,
  AuditLogsView,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  BadgeGroup,
  BaseSelector,
  BedManagementSystem,
  BentoCard,
  BentoGrid,
  BodyText,
  Breadcrumb,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CLINICAL_TOOLS,
  Caption,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardGrid,
  CardHeader,
  CardTitle,
  CarePlanCreation,
  CarePlanViewer,
  Carousel,
  ChartArea,
  ChartBar,
  ChartBubble,
  ChartFunnel,
  ChartGauge,
  ChartHeatmap,
  ChartLine,
  ChartPie,
  ChartRadar,
  ChartSankey,
  ChartScatter,
  ChartSparkline,
  Checkbox,
  ClaimStatusTimeline,
  ClickOutside,
  ClinicalCopilot,
  ClinicalDataChart,
  ClinicalDecisionSupport,
  ClinicalDecisionSupportTemplate,
  ClinicalFlowsheet,
  ClinicalGuidelines,
  ClinicalHandoffView,
  ClinicalImpression,
  ClinicalOverviewDashboard,
  ClinicalReportsDashboard,
  Code,
  CodeBlock,
  CollectPaymentPanel,
  ColorPicker,
  Combobox,
  CommandPalette,
  ComplianceDashboard,
  ConditionManager,
  Container,
  CopyToClipboard,
  CountUp,
  DataGrid,
  DatePicker,
  DateRangeFilter,
  DateRangePicker,
  DenialAnalyticsCard,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EligibilityChecker,
  EmergencyCodeManager,
  EmptyState,
  EncounterForm,
  EnterpriseSsoLogin,
  EnterpriseTopBar,
  ErrorBoundary,
  FamilyHistory,
  FavoriteOrdersPanel,
  FhirResourceViewer,
  Field,
  FileUpload,
  FinancialRCMDashboard,
  FocusTrap,
  Footer,
  ForgotPasswordPage,
  FullEHRApplicationShell,
  Fullscreen,
  GlobalSearchBox,
  GoalTracker,
  Heading,
  HealthcareLogin,
  Hl7MessageMonitor,
  HomeHealthScheduler,
  Hotkey,
  IdleTimer,
  Image,
  ImmunizationRecord,
  InAppNotification,
  Input,
  InputGroup,
  InputGroupAddon,
  KebabMenu,
  KeyboardShortcut,
  KioskCheckinAlert,
  KioskCheckinShell,
  LabOrderEntry,
  LabResultViewer,
  LabResultsList,
  Label3 as Label,
  LabelledProgress,
  LaborProgressTracker,
  Lightbox,
  Link3 as Link,
  List2 as List,
  ListItem,
  MagicLinkLogin,
  Markdown,
  Masonry,
  MassCasualtyCommander,
  MedicationAdministration,
  MedicationAdministrationMar,
  MedicationInventory,
  MedicationList,
  MegaMenu,
  MfaVerificationPage,
  MinimalApplicationShell,
  MobileProviderShell,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
  MotherBabyChart,
  MultiSelect,
  NarcoticSubstanceLog,
  NavItem,
  NavLink,
  NotificationCenter,
  NotificationPopover,
  NotificationProvider,
  NotificationSettings,
  NursingHandoffReport,
  OTPInput,
  ObservationTrend,
  OperationalMetricsDashboard,
  OrScheduleBoard,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Patient360Summary,
  PatientBanner,
  PatientEducation,
  PatientJourneyTimeline,
  PatientPortalHome,
  PatientPortalMessaging,
  PatientRegistrationWizard,
  PatientSearch,
  PatientSelector,
  PatientSummary,
  PatientTimeline,
  PatientTimelineView,
  PediatricGrowthSchedule,
  PharmacyOrderDashboard,
  Phq9Gad7Tracking,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopulationHealthDashboard,
  Portal9 as Portal,
  PreChartPanel,
  PrePostOpCarePlan,
  ProcedureHistory,
  Progress,
  ProviderSelector,
  QRCode,
  QualityMeasure,
  QualityMeasuresReport,
  Radio,
  RadioCard,
  RadioGroup,
  RealTimeMonitoringDashboard,
  ReferralManagement,
  RemoteMonitoringDashboard,
  ResetPasswordPage,
  ResizeHandle,
  RevenueCycleAnalytics,
  RiskAssessment,
  ScrollArea,
  ScrollBar,
  Section,
  SecureTeamMessaging,
  SegmentedControl,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator3 as Separator,
  SessionTimeoutOverlay,
  Sheet,
  Shell,
  Sidebar,
  SignUpPage,
  SignatureCapture,
  Skeleton,
  SkeletonCard,
  SkeletonCircle,
  SkeletonTable,
  SkeletonTableRows,
  SkipLink,
  Slider,
  SmartPhrasePanel,
  SoapClinicalNotes,
  SocialHistory,
  Spinner,
  SplitButton,
  StatCard,
  StepIndicator,
  SurgicalCountLog,
  SuspenseWrapper,
  Switch,
  SystemSettings,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsScrollable,
  TabsTrigger,
  TabsVertical,
  Tag,
  TelehealthWaitingRoom,
  TenantThemeProvider,
  Textarea,
  ThemeProvider,
  ThemeSelector,
  TherapyPlanViewer,
  TimePicker,
  Timeline,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  ToothChart,
  ToothInspectorPanel,
  TopNav,
  TreatmentPlanWorkspace,
  TreeView,
  TriageDashboard,
  TypographySpecimen,
  UnifiedClinicalInbox,
  UnsignedChartsCard,
  UserManagement,
  VirtualizedTable,
  WidgetBasedCustomDashboard,
  Wizard,
  buttonVariants,
  expandSurfaceGroup,
  useDebounce,
  useNotifications,
  useTenantTheme,
  useTheme,
  useThrottle
};
