type WordmarkProps = {
  // "lower" (default) matches the nav/hero treatment ("grin" / "buck").
  // "upper" matches the footer's heading-style caps ("GRIN" / "BUCK").
  case?: "lower" | "upper";
  inkColor?: string;
  accentColor?: string;
};

/**
 * The two-color "grinbuck" wordmark split: first syllable in `inkColor`,
 * second in `accentColor`. Renders only the colored text spans, not
 * surrounding typography (font, size, weight) or a wrapping element, so
 * callers keep control of how the mark sits in its own context (nav link,
 * hero heading, footer heading).
 */
export function Wordmark({
  case: wordCase = "lower",
  inkColor = "var(--color-ink)",
  accentColor = "var(--color-brand)",
}: WordmarkProps) {
  const ink = wordCase === "upper" ? "GRIN" : "grin";
  const accent = wordCase === "upper" ? "BUCK" : "buck";
  return (
    <>
      <span style={{ color: inkColor }}>{ink}</span>
      <span style={{ color: accentColor }}>{accent}</span>
    </>
  );
}
