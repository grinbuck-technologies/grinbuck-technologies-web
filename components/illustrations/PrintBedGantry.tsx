import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/** Wire-drawn print bed and gantry rail, with a carriage riding the rail. */
export function PrintBedGantry(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <rect x="20" y="88" width="80" height="10" rx="2" />
      <path d="M25 88 L25 42" />
      <path d="M95 88 L95 42" />
      <path d="M20 42 L100 42" />
      <rect x="52" y="38" width="16" height="10" rx="2" />
      <path d="M60 48 L60 60" />
    </Wire>
  );
}
