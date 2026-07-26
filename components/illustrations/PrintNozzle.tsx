import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/** Wire-drawn hot end: heat block, tapered nozzle cone, and a drip. */
export function PrintNozzle(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <rect x="40" y="20" width="40" height="24" rx="3" />
      <path d="M40 44 L80 44" />
      <path d="M48 44 L60 78 L72 44" />
      <circle cx="60" cy="90" r="3" />
    </Wire>
  );
}
