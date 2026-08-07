"use client";
import { type ReactNode } from "react";
import { clsx } from "clsx";

/* ── Heading ─────────────────────────────────────────────────── */
type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

export function Heading({ level = 2, children, className }: HeadingProps) {
  const Tag = (`h${level}` as "h1" | "h2" | "h3" | "h4");
  return (
    <Tag className={clsx("heading", `heading--${level}`, className)}>
      {children}
    </Tag>
  );
}

/* ── Body Text ───────────────────────────────────────────────── */
type BodySize   = "lg" | "md" | "sm" | "xs";
type BodyColor  = "default" | "muted" | "subtle";

export interface BodyTextProps {
  size?: BodySize;
  color?: BodyColor;
  as?: "p" | "span" | "div";
  children: ReactNode;
  className?: string;
}

export function BodyText({
  size = "md",
  color = "default",
  as: Tag = "p",
  children,
  className,
}: BodyTextProps) {
  return (
    <Tag
      className={clsx(
        "body-text",
        `body-text--${size}`,
        color !== "default" && `body-text--${color}`,
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ── Caption ─────────────────────────────────────────────────── */
export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx("caption", className)}>{children}</span>;
}

/* ── Label ───────────────────────────────────────────────────── */
export function Label({ children, htmlFor, className }: { children: ReactNode; htmlFor?: string; className?: string }) {
  return <label htmlFor={htmlFor} className={clsx("label", className)}>{children}</label>;
}

/* ── Inline Code ─────────────────────────────────────────────── */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return <code className={clsx("code", className)}>{children}</code>;
}

/* ── Code Block ──────────────────────────────────────────────── */
export function CodeBlock({ children, language, className }: { children: string; language?: string; className?: string }) {
  return (
    <pre className={clsx("code-block", className)} data-language={language}>
      <code>{children}</code>
    </pre>
  );
}

/* ── Typography specimen (all at once) ──────────────────────── */
export function TypographySpecimen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Heading level={1}>Display Heading (H1)</Heading>
      <Heading level={2}>Section Heading (H2)</Heading>
      <Heading level={3}>Subsection Heading (H3)</Heading>
      <Heading level={4}>Card Title (H4)</Heading>
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "4px 0" }} />
      <BodyText size="lg">Large body — 17px. Optimised for reading comfort.</BodyText>
      <BodyText size="md">Medium body — 15px. Default size for paragraphs.</BodyText>
      <BodyText size="sm">Small body — 14px. Form helper text, descriptions.</BodyText>
      <BodyText size="xs">XS body — 13px. Table cells, dense data.</BodyText>
      <BodyText size="md" color="muted">Muted text — reduced emphasis.</BodyText>
      <BodyText size="md" color="subtle">Subtle text — timestamps, meta.</BodyText>
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "4px 0" }} />
      <Caption>Caption — 12px. Image captions, footnotes.</Caption>
      <Label>Form Label — 13px bold</Label>
      <div>
        <Code>inline code</Code>{" "}
        <span className="body-text body-text--sm"> ← inline code component</span>
      </div>
      <CodeBlock language="tsx">{`function hello() {\n  return "World";\n}`}</CodeBlock>
    </div>
  );
}
