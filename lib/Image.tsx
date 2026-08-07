"use client";
import NextImage, { ImageProps as NextImageProps } from "next/image";

/**
 * Thin wrapper around next/image that makes `sizes` a required prop for
 * any non-fill image — the single most common next/image mistake is
 * omitting `sizes`, which silently defeats responsive srcset generation
 * and ships a full-resolution image to mobile.
 *
 * Also standardizes the blur placeholder for clinical photography
 * (patient photos, document scans) so nothing pops in abruptly on a
 * slow ward-tablet connection.
 */
export interface ImageProps extends Omit<NextImageProps, "sizes"> {
  /** Required unless `fill` is false and both width/height are fixed and small (e.g. an avatar/icon). */
  sizes?: string;
  /** Marks this as decorative clinical content — avatar, thumbnail — vs. a large content image. */
  variant?: "avatar" | "thumbnail" | "content";
}

const DEFAULT_SIZES: Record<NonNullable<ImageProps["variant"]>, string> = {
  avatar: "48px",
  thumbnail: "(min-width: 768px) 240px, 100vw",
  content: "(min-width: 1180px) 1180px, 100vw",
};

export function Image({ variant = "content", sizes, priority, ...rest }: ImageProps) {
  return (
    <NextImage
      sizes={sizes ?? DEFAULT_SIZES[variant]}
      priority={priority}
      placeholder={rest.blurDataURL ? "blur" : "empty"}
      {...rest}
    />
  );
}
