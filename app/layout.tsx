import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-display",
  weight: "200 700",
  display: "swap",
});

// Scoped to the "Serious Tech. Serious Fun." redesign (homepage, /grinbuck3d,
// /grinbuck3d/clickit) via the --font-noto-sans variable — /about and the
// rest of the site keep --font-display (GeneralSans). 800 is available for
// the hero; 400/700 cover body copy and other headings.
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-noto-sans",
  display: "swap",
});

// Backs the canonical --font-mono variable (see globals.css) — used for
// eyebrows/section labels/metadata across the same three redesign pages.
const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grinbuck.com"),
  title: "Grinbuck Technologies Inc.",
  description:
    "Grinbuck Technologies builds hardware and software products in Victoria, BC, and runs a two-way trade venture between India and Canada.",
  openGraph: {
    title: "Grinbuck Technologies Inc.",
    description:
      "Grinbuck Technologies builds hardware and software products in Victoria, BC, and runs a two-way trade venture between India and Canada.",
    url: "https://grinbuck.com",
    siteName: "Grinbuck Technologies Inc.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grinbuck Technologies Inc.",
    description:
      "Grinbuck Technologies builds hardware and software products in Victoria, BC, and runs a two-way trade venture between India and Canada.",
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
    <html
      lang="en"
      className={`${display.variable} ${notoSans.variable} ${notoSansMono.variable}`}
    >
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
