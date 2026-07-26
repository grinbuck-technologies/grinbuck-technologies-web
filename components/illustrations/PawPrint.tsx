import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/** Wire-drawn paw print — small accent for the training story. */
export function PawPrint(props: IllustrationProps) {
  return (
    <Wire {...props}>
      <ellipse cx="60" cy="78" rx="22" ry="18" />
      <ellipse cx="30" cy="52" rx="9" ry="12" />
      <ellipse cx="52" cy="34" rx="9" ry="12" />
      <ellipse cx="76" cy="34" rx="9" ry="12" />
      <ellipse cx="94" cy="52" rx="9" ry="12" />
    </Wire>
  );
}
