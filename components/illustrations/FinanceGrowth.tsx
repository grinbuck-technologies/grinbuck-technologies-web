import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/**
 * Wire-drawn coin paired with a rising line, standing in for tabMonk's
 * finance tracking without implying any specific screen or feature.
 */
export function FinanceGrowth(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <circle cx="38" cy="70" r="22" />
      <path d="M22 70 L54 70" />
      <path d="M38 60 Q34 65 38 70 Q42 75 38 80" />
      <polyline points="64,85 80,63 90,72 106,38" />
      <polyline points="92,38 106,38 106,52" />
    </Wire>
  );
}
