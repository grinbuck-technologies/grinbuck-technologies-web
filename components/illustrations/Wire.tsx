import type { ReactNode } from "react";
import { ILLUSTRATION_DEFAULTS, type IllustrationProps } from "./types";

type WireProps = IllustrationProps & {
  children: ReactNode;
  /** Defaults to the shared 120x120 icon grid every illustration in this folder is drawn on. */
  viewBox?: string;
};

/**
 * Shared `<svg>` wrapper for every wire-drawn illustration: single stroke,
 * no fill, consistent line caps/joins. Each icon in this folder supplies
 * only its own `<path>`/`<circle>`/etc. children.
 */
export function Wire({
  className,
  width = ILLUSTRATION_DEFAULTS.width,
  height = ILLUSTRATION_DEFAULTS.height,
  color = ILLUSTRATION_DEFAULTS.color,
  strokeWidth = ILLUSTRATION_DEFAULTS.strokeWidth,
  viewBox = "0 0 120 120",
  children,
}: WireProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
