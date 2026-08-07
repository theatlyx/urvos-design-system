declare module "next/image" {
  import type * as React from "react";
  export interface ImageProps {
    src: string | { src: string; height: number; width: number; blurDataURL?: string };
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    placeholder?: string;
    blurDataURL?: string;
    quality?: number;
    loading?: "lazy" | "eager";
    style?: React.CSSProperties;
    className?: string;
    onLoad?: (e: unknown) => void;
    onError?: (e: unknown) => void;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}
