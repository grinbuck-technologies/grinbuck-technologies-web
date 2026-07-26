import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/** Wire-drawn fingertip tapping a button — small accent for the focus story. */
export function FocusTap(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <circle cx="60" cy="72" r="20" />
      <path d="M60 30 L60 46" />
      <path d="M52 36 Q52 28 60 26 Q68 28 68 36 L68 52 Q68 58 60 58 Q52 58 52 52 Z" />
      <path d="M36 60 L44 64" />
      <path d="M84 60 L76 64" />
    </Wire>
  );
}
