import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/**
 * Wire-drawn crate with two arrows circling it in opposite directions —
 * two-way trade, not a single route line.
 */
export function TradeLoop(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <rect x="40" y="45" width="40" height="40" rx="2" />
      <path d="M40 45 L80 85" />
      <path d="M80 45 L40 85" />

      <path d="M28 38 A42 42 0 0 1 92 38" />
      <polyline points="80,30 92,38 86,50" />

      <path d="M92 92 A42 42 0 0 1 28 92" />
      <polyline points="40,100 28,92 34,80" />
    </Wire>
  );
}
