import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import SmoothScroll from "@/components/SmoothScroll";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
