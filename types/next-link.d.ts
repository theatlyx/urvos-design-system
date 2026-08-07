declare module "next/link" {
  import type * as React from "react";
  export interface LinkProps {
    href: string | { pathname: string; query?: Record<string, string | string[] | undefined> };
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    legacyBehavior?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}
