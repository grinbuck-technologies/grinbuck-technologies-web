import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "ClickIT Shop — Coming soon",
  description: "The ClickIT shop is coming soon.",
};

/** `/clickit/shop` route — placeholder "coming soon" page for the ClickIT shop. */
export default function ClickitShopPage() {
  return (
    <div>
      <Nav
        homeHref="/"
        links={[
          { label: "ClickIT", href: "/clickit" },
          { label: "Home", href: "/" },
        ]}
      />
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(5rem, 12vh, 10rem) clamp(1.5rem, 4vw, 4rem)",
          background: "var(--color-paper)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            margin: "0 0 1rem",
          }}
        >
          Coming soon.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "var(--color-subhead)",
            maxWidth: "480px",
            margin: 0,
          }}
        >
          The ClickIT shop isn&apos;t open yet — check back soon.
        </p>
      </main>
    </div>
  );
}
