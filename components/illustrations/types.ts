/**
 * Shared prop contract for every wire-drawn illustration in this folder.
 * Single continuous line weight, no fills, no gradients — `color` is the
 * only thing that changes between instances (ink or brand green).
 */
export type IllustrationProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  /** Stroke color. Defaults to currentColor so callers set it via CSS `color`. */
  color?: string;
  strokeWidth?: number;
};

export const ILLUSTRATION_DEFAULTS = {
  width: 120,
  height: 120,
  color: "currentColor",
  strokeWidth: 3.5,
} as const;
