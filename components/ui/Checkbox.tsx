"use client";
import React, { forwardRef, useId, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Check, Minus } from "lucide-react";

// 1. Variants
const checkboxVariants = cva("checkbox", {
  variants: {
    size: {
      sm: "checkbox--sm",
      md: "checkbox--md",
      lg: "checkbox--lg",
    },
    state: {
      default: "",
      error: "checkbox--error",
      success: "checkbox--success",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

// 2. Props Interface
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
  /** Label text for the checkbox */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text for additional context */
  helper?: string;
  /** Sets indeterminate state (neither checked nor unchecked) */
  indeterminate?: boolean;
  /** Makes the field required */
  required?: boolean;
  /** Clinical significance for healthcare context */
  clinicalSignificance?: "critical" | "warning" | "info" | "normal";
  /** Optional FHIR observation code mapping */
  fhirObservationCode?: string;
  /** Custom class name */
  className?: string;
}

// 3. Component Implementation
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
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
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error || state === "error";
    const currentState = hasError ? "error" : state;

    // Handle indeterminate state
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Merge refs
    const setRefs = (element: HTMLInputElement) => {
      if (typeof ref === "function") ref(element);
      else if (ref) {
        (ref as any).current = element;
      }
      inputRef.current = element;
    };

    // Handle change with indeterminate state clearing
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (indeterminate) {
        // If indeterminate, clicking sets to checked
        if (inputRef.current) {
          inputRef.current.indeterminate = false;
        }
        // Trigger onChange with synthetic event
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            checked: true,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
        return;
      }
      onChange?.(e);
    };

    return (
      <div className={clsx("checkbox-wrapper", className)}>
        <div className={clsx("checkbox-container", `checkbox-container--${size}`)}>
          <div className="checkbox-input-wrapper">
            <input
              ref={setRefs}
              id={checkboxId}
              type="checkbox"
              className={clsx(
                checkboxVariants({ size, state: currentState }),
                "checkbox-input",
                disabled && "checkbox--disabled",
                clinicalSignificance && `checkbox--${clinicalSignificance}`
              )}
              disabled={disabled}
              required={required}
              checked={checked}
              defaultChecked={defaultChecked}
              aria-invalid={hasError}
              aria-describedby={
                error ? `${checkboxId}-error` : helper ? `${checkboxId}-helper` : undefined
              }
              aria-label={!label ? props["aria-label"] || "Checkbox" : undefined}
              onChange={handleChange}
              {...props}
            />
            {indeterminate ? (
              <Minus 
                className={clsx(
                  "checkbox-indicator", 
                  "checkbox-indicator--minus",
                  checked && "checkbox-indicator--checked"
                )} 
                aria-hidden="true" 
              />
            ) : (
              <Check 
                className={clsx(
                  "checkbox-indicator", 
                  "checkbox-indicator--check",
                  checked && "checkbox-indicator--checked"
                )} 
                aria-hidden="true" 
              />
            )}
          </div>
          
          {label && (
            <label
              htmlFor={checkboxId}
              className={clsx(
                "checkbox-label",
                disabled && "checkbox-label--disabled",
                clinicalSignificance && `checkbox-label--${clinicalSignificance}`
              )}
            >
              {label}
              {required && <span className="checkbox-required" aria-hidden="true">*</span>}
            </label>
          )}
        </div>

        {/* Error / Helper Messages */}
        {error && (
          <div id={`${checkboxId}-error`} className="checkbox-error" role="alert">
            {error}
          </div>
        )}
        {helper && !error && (
          <div id={`${checkboxId}-helper`} className="checkbox-helper">
            {helper}
          </div>
        )}
        
        {/* FHIR integration */}
        {fhirObservationCode && (
          <input type="hidden" data-fhir-code={fhirObservationCode} />
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
