"use client";
import { HTMLAttributes, ReactNode } from "react";

type Variant = "default" | "clickable" | "elevated" | "inset";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function Card({ variant = "default", header, footer, children, className = "", ...rest }: CardProps) {
  const variantClass = variant === "default" ? "" : `card--${variant}`;
  return (
    <div
      className={`card ${variantClass} ${className}`}
      role={variant === "clickable" ? "button" : undefined}
      tabIndex={variant === "clickable" ? 0 : undefined}
      {...rest}
    >
      {header && <div className="card__header">{header}</div>}
      {children}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card__header ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`card__title ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`card__description ${className}`} {...props}>{children}</p>;
}

export function CardContent({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card__content ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card__footer ${className}`} {...props}>{children}</div>;
}
