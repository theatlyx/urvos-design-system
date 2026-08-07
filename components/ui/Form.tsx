"use client";
import { InputHTMLAttributes, ReactNode, useId } from "react";
import { clsx } from "clsx";

/* ============ Field wrapper — label + control + help/error ============ */
export function Field({
  label,
  help,
  error,
  children,
  htmlFor,
}: {
  label?: string;
  help?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="field">
      {label && (
        <label className="field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <div className="field__error" role="alert">
          ⚠ {error}
        </div>
      ) : help ? (
        <div className="field__help">{help}</div>
      ) : null}
    </div>
  );
}

/* ============ Input ============ */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export function Input({ error, className = "", ...rest }: InputProps) {
  return <input className={clsx("input", className)} data-state={error ? "error" : undefined} {...rest} />;
}
