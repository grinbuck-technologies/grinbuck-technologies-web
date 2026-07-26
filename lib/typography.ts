import type { CSSProperties } from "react";

/**
 * Shared style for eyebrow/category-tag labels across the homepage,
 * Grinbuck3D, and ClickIT: small, mono, uppercase, low-contrast — a quiet
 * tag sitting beneath a heading, never competing with it. Color is left to
 * the caller since it varies by section (e.g. muted gray on light bands,
 * `--color-brand` for a highlighted label).
 */
export const EYEBROW_STYLE: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};
