import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grinbuck.com"),
  title: "Grinbuck Technologies Inc.",
  description:
    "A Victoria, BC-based holding company building and operating independent businesses for the long term.",
  openGraph: {
    title: "Grinbuck Technologies Inc.",
    description:
      "A Victoria, BC-based holding company building and operating independent businesses for the long term.",
    url: "https://grinbuck.com",
    siteName: "Grinbuck Technologies Inc.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grinbuck Technologies Inc.",
    description:
      "A Victoria, BC-based holding company building and operating independent businesses for the long term.",
    images: ["/og-image.png"],
  },
};

/**
 * Root layout for every route: loads the display/mono fonts, sets shared
 * `<html>`/`<body>` metadata, and wraps all page content in SmoothScroll.
 *
 * @param children - The active route's rendered page content.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${GeistMono.variable}`}>
      <head>
        {/* Blocking, runs before paint — disables the browser's own
            scroll-restoration-on-reload/back-forward so a reload always
            starts at the top instead of snapping back to wherever the tab
            last scrolled. Must run this early (not in a useEffect, which
            fires after the browser's restoration already happened) and on
            every load, since scrollRestoration resets to "auto" per
            navigation. Lenis adopts whatever scroll position already
            exists on mount rather than resetting it, so without this the
            restored position sticks. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }",
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
