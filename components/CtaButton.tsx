import type { ReactNode } from "react";
import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  /** Icon rendered before the label, e.g. one of the wire-drawn illustrations at a small size. */
  icon?: ReactNode;
  variant?: "ink" | "brand";
  size?: "sm" | "md";
};

/**
 * Shared pill-shaped CTA link: internal routes render through `next/link`,
 * anything else (mailto, in-page anchors, external URLs) renders as a
 * plain anchor. Used for the simple label-plus-arrow CTAs across the
 * homepage, Grinbuck3D, and ClickIT — the multi-line CTA cards (e.g.
 * ClickIT's closing pair) stay bespoke, since their content shape (a
 * heading plus a subtext line) doesn't fit this component.
 */
export function CtaButton({ href, children, icon, variant = "brand", size = "md" }: CtaButtonProps) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: size === "sm" ? "0.75rem 1.5rem" : "0.875rem 1.75rem",
    background: variant === "brand" ? "var(--color-brand)" : "var(--color-ink)",
    color: "var(--color-paper)",
    fontFamily: "var(--font-noto-sans)",
    fontSize: "0.9375rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    textDecoration: "none",
    borderRadius: "6px",
    whiteSpace: "nowrap" as const,
  };

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  const isInternalRoute = href.startsWith("/");

  if (isInternalRoute) {
    return (
      <Link className="btn-cta" href={href} style={style}>
        {content}
      </Link>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a
      className="btn-cta"
      href={href}
      style={style}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
