"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import {
  Z_NAV,
  CONTACT_EMAIL,
  NAV_HEIGHT,
  NAV_SCROLL_OFFSET,
  NAV_SHADOW_THRESHOLD,
  SCROLL_DURATION,
} from "@/lib/constants";

// Default homepage nav links. "Ventures" stays an in-page anchor since that
// section lives fully on the homepage. "About" is a real route — the
// homepage's #about section is now just a teaser with its own link, not
// what this nav item targets.
type NavLinkItem =
  | { label: string; kind: "anchor"; id: string }
  | { label: string; kind: "route"; href: string };

const NAV_LINKS: NavLinkItem[] = [
  { label: "Ventures", kind: "anchor", id: "ventures" },
  { label: "About", kind: "route", href: "/about" },
];

type NavProps = {
  // Brand mark target. "#hero" (default) scroll-snaps to the top of the
  // current page via Lenis, matching the homepage. Anything else (e.g. "/")
  // is a plain route link, for pages that live outside the homepage's
  // anchor sections.
  homeHref?: string;
  // Overrides the default in-page #ventures/#about anchors with plain route
  // links, for pages that don't share those homepage sections.
  links?: { label: string; href: string }[];
};

/**
 * Sticky site header shared by every page: brand mark, nav links, and a
 * mailto Contact link. Gains a drop shadow once the page scrolls past
 * `NAV_SHADOW_THRESHOLD`.
 *
 * @param homeHref - Brand mark target. `"#hero"` (default) scroll-snaps to
 *   the top of the current page via Lenis, matching the homepage. Any other
 *   value (e.g. `"/"`) renders a plain route `<Link>`, for pages outside the
 *   homepage's anchor sections.
 * @param links - Overrides the default homepage nav items (`Ventures`
 *   anchor, `About` route) with plain route links, for pages that don't
 *   share the homepage's `#ventures` section.
 */
export function Nav({ homeHref = "#hero", links }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  // Lenis dispatches native scroll events — listen on window for shadow trigger
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_SHADOW_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // "hero" scrolls to absolute top; other sections offset to clear the sticky nav
    if (id === "hero") {
      lenis?.scrollTo(0, { duration: SCROLL_DURATION });
    } else {
      lenis?.scrollTo(`#${id}`, { duration: SCROLL_DURATION, offset: -NAV_SCROLL_OFFSET });
    }
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "0.875rem",
    fontWeight: 450,
    color: "var(--color-ink)",
    textDecoration: "none",
    opacity: 0.6,
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: Z_NAV,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 4vw, 4rem)",
        height: `${NAV_HEIGHT}px`,
        background: "var(--color-paper)",
        borderBottom: "1px solid var(--color-hairline)",
        boxShadow: scrolled
          ? "0 4px 20px -4px rgba(10, 10, 10, 0.10)"
          : "none",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {homeHref.startsWith("#") ? (
        <a
          href={homeHref}
          onClick={goto(homeHref.slice(1))}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "var(--color-ink)" }}>grin</span>
          <span style={{ color: "var(--color-brand)" }}>buck</span>
        </a>
      ) : (
        <Link
          href={homeHref}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.125rem",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "var(--color-ink)" }}>grin</span>
          <span style={{ color: "var(--color-brand)" }}>buck</span>
        </Link>
      )}

      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {links
          ? links.map(({ label, href }) => (
              <Link key={href} href={href} className="nav-link" style={linkStyle}>
                {label}
              </Link>
            ))
          : NAV_LINKS.map((item) =>
              item.kind === "anchor" ? (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={goto(item.id)}
                  className="nav-link"
                  style={linkStyle}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  style={linkStyle}
                >
                  {item.label}
                </Link>
              )
            )}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="nav-link"
          style={linkStyle}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
