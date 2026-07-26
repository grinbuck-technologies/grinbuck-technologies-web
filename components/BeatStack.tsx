import type { CSSProperties } from "react";

type BeatStackProps = {
  beats: string[];
  /** Style applied to every paragraph — callers own their own type scale. */
  paragraphStyle: CSSProperties;
  gap?: string;
};

/**
 * Stacks short paragraph "beats" with space between them, instead of one
 * dense block — used wherever copy reads better as several short
 * statements than one long paragraph (the homepage About section, and
 * every prose block on the ClickIT page). Capped at 60ch so a beat never
 * stretches into an unreadably long line on a wide viewport.
 */
export function BeatStack({ beats, paragraphStyle, gap = "0.6rem" }: BeatStackProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, maxWidth: "60ch" }}>
      {beats.map((beat) => (
        <p key={beat} style={paragraphStyle}>
          {beat}
        </p>
      ))}
    </div>
  );
}
