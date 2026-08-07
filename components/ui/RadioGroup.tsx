"use client";
import React, { forwardRef, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

// 1. Variants
const radioVariants = cva("radio", {
  variants: {
    size: {
      sm: "radio--sm",
      md: "radio--md",
      lg: "radio--lg",
    },
    state: {
      default: "",
      error: "radio--error",
      success: "radio--success",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

// 2. Radio Props Interface
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof radioVariants> {
  /** Label text for the radio button */
  label?: string;
  /** Clinical significance for healthcare context */
  clinicalSignificance?: "critical" | "warning" | "info" | "normal";
  /** Optional FHIR observation code mapping */
  fhirObservationCode?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      size = "md",
      state = "default",
      label,
      disabled = false,
      required = false,
      clinicalSignificance,
      fhirObservationCode,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const currentState = state;

    return (
      <div className={clsx("radio-container", `radio-container--${size}`, className)}>
        <div className="radio-input-wrapper">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className={clsx(
              radioVariants({ size, state: currentState }),
              "radio-input",
              disabled && "radio--disabled",
              clinicalSignificance && `radio--${clinicalSignificance}`
            )}
            disabled={disabled}
            required={required}
            aria-label={!label ? props["aria-label"] || "Radio" : undefined}
            {...props}
          />
          <div className="radio-indicator" aria-hidden="true" />
        </div>
        
        {label && (
          <label
            htmlFor={radioId}
            className={clsx(
              "radio-label",
              disabled && "radio-label--disabled",
              clinicalSignificance && `radio-label--${clinicalSignificance}`
            )}
          >
            {label}
          </label>
        )}
        
        {/* FHIR integration */}
        {fhirObservationCode && (
          <input type="hidden" data-fhir-code={fhirObservationCode} />
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

// 3. RadioGroup Props Interface
export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Label for the radio group (rendered as a legend) */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text for additional context */
  helper?: string;
  /** Layout orientation of the radio buttons */
  orientation?: "horizontal" | "vertical";
  /** Marks the group as required */
  required?: boolean;
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      className,
      label,
      error,
      helper,
      orientation = "vertical",
      required = false,
      children,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <fieldset
        ref={ref}
        className={clsx("radio-group", className)}
        aria-invalid={hasError}
        {...props}
      >
        {label && (
          <legend className="radio-group-label">
            {label}
            {required && <span className="radio-group-required" aria-hidden="true">*</span>}
          </legend>
        )}
        
        <div className={clsx("radio-group-items", `radio-group-items--${orientation}`)}>
          {children}
        </div>

        {/* Error / Helper Messages */}
        {error && (
          <div className="radio-group-error" role="alert">
            {error}
          </div>
        )}
        {helper && !error && (
          <div className="radio-group-helper">
            {helper}
          </div>
        )}
      </fieldset>
    );
  }
);

export interface RadioCardProps extends RadioProps {
  description?: string;
}

export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ className, label, description, id, checked, ...props }, ref) => {
    const generatedId = useId();
    const radioId = id || generatedId;

    return (
      <label
        htmlFor={radioId}
        className={clsx(
          "flex cursor-pointer items-start gap-3 rounded-lg border border-urvos-border p-4 transition-all hover:bg-urvos-surface-muted data-[checked=true]:border-urvos-primary data-[checked=true]:bg-urvos-primary/5",
          className
        )}
        data-checked={checked}
      >
        <Radio ref={ref} id={radioId} checked={checked} {...props} />
        <div className="flex flex-col">
          {label && <span className="font-semibold text-sm text-urvos-text">{label}</span>}
          {description && <span className="text-xs text-urvos-text-subtle mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }
);
RadioCard.displayName = "RadioCard";
