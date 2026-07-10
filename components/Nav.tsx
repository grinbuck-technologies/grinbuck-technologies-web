"use client";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import {
  Z_NAV,
  CONTACT_EMAIL,
  NAV_HEIGHT,
  NAV_SCROLL_OFFSET,
  NAV_SHADOW_THRESHOLD,
  SCROLL_DURATION,
} from "@/lib/constants";

const NAV_LINKS = [
  { label: "Ventures", id: "ventures" },
  { label: "About", id: "about" },
] as const;

export default function Nav() {
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
      <a
        href="#hero"
        onClick={goto("hero")}
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

      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={goto(id)}
            className="nav-link"
            style={linkStyle}
          >
            {label}
          </a>
        ))}
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
