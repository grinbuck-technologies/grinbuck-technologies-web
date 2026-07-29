import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/** Wire-drawn filament spool: rim, hub, spokes, and a trailing unspooled line. */
export function FilamentSpool(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <circle cx="55" cy="60" r="32" />
      <circle cx="55" cy="60" r="10" />
      <path d="M55 50 L55 30" />
      <path d="M55 70 L55 90" />
      <path d="M45 60 L25 60" />
      <path d="M65 60 L85 60" />
      <path d="M87 62 Q100 70 94 86 Q90 96 100 102" />
    </Wire>
  );
}
