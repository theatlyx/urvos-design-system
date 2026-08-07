import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";

/**
 * Self-hosted, zero-layout-shift typography via next/font.
 * Replaces the <link href="fonts.googleapis.com/..."> tags used in the
 * static HTML volumes — those were fine for standalone mockups, but a real
 * Next.js app should never make a render-blocking request to Google Fonts.
 *
 * Usage in app/layout.tsx:
 *
 *   import { fontVariables } from "@/lib/fonts";
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en" className={fontVariables}>
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 *
 * Then in tokens.css, --font-ui / --font-serif / --font-data already
 * reference these same family names, so no further change is needed there
 * — next/font just makes the @font-face self-hosted and preloaded.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-data",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${fraunces.variable} ${plexMono.variable}`;
