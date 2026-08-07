import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
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
        toggle: "border-transparent",
      },
      intent: {
        brand: "",
        neutral: "", 
        success: "",
        warning: "",
        danger: "",
        info: "",
      },
      size: {
        xs: "h-6 px-2 text-xs gap-1 rounded-sm [&_svg]:size-3",
        sm: "h-8 px-3 text-sm gap-1.5 rounded-md [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm gap-2 rounded-lg [&_svg]:size-4",
        lg: "h-12 px-5 text-base gap-2 rounded-lg [&_svg]:size-[18px]",
        xl: "h-14 px-6 text-lg gap-2.5 rounded-xl [&_svg]:size-5",
        icon: "h-10 w-10 p-0 rounded-lg [&_svg]:size-4",
        "icon-sm": "h-8 w-8 p-0 rounded-md [&_svg]:size-3.5",
      },
      shape: {
        default: "",
        square: "!rounded-none",
        pill: "!rounded-full",
        circle: "!rounded-full aspect-square p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
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
      { variant: "filled", intent: "info", className: "bg-urvos-info text-urvos-text-inverse hover:bg-urvos-info/90 hover:opacity-90 active:bg-urvos-info/80 focus-visible:ring-urvos-info" },
    ],
    defaultVariants: {
      variant: "filled",
      intent: "brand",
      size: "md",
      shape: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "variant" | "size"> {
  variant?: VariantProps<typeof buttonVariants>["variant"] | "primary" | "secondary"
  size?: VariantProps<typeof buttonVariants>["size"] | "icon-sm"
  asChild?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  icon?: React.ReactNode
  analyticsId?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, shape, fullWidth, loading, icon, iconLeft, iconRight, asChild = false, children, analyticsId, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const leftIcon = iconLeft ?? icon
    
    // Auto-map legacy variants if passed
    const normalizedVariant = variant === "primary" ? "filled" : variant === "secondary" ? "outline" : variant
    const normalizedIntent = variant === "primary" ? "brand" : variant === "secondary" ? "neutral" : intent

    const ariaProps = {
      "aria-busy": loading ? true : undefined,
      "aria-disabled": disabled || loading ? true : undefined,
      "data-disabled": disabled ? true : undefined,
      "data-loading": loading ? true : undefined,
    }
    
    // We conditionally pass props, intercepting onClick when disabled/loading
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (disabled || loading) {
        e.preventDefault()
        return
      }
      props.onClick?.(e)
    }

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant: normalizedVariant, intent: normalizedIntent, size, shape, fullWidth, className }))}
          ref={ref}
          {...ariaProps}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant: normalizedVariant, intent: normalizedIntent, size, shape, fullWidth, className }))}
        ref={ref}
        disabled={disabled} // don't native-disable on loading so it can still be focused/accessible per spec
        data-analytics-id={analyticsId}
        {...ariaProps}
        {...props}
        onClick={handleClick}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin" style={{ width: "1em", height: "1em" }} />
          </div>
        )}
        <div className={cn("inline-flex items-center justify-center gap-inherit", loading && "text-transparent [&_svg]:opacity-0")}>
          {!loading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span className="truncate">{children}</span>
          {!loading && iconRight && <span className="inline-flex shrink-0">{iconRight}</span>}
        </div>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
