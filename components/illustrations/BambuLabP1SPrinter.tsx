import type { IllustrationProps } from "./types";
import { Wire } from "./Wire";

/**
 * Wire-drawn Bambu Lab P1S: an enclosed cube-frame FDM printer, drawn in
 * isometric to keep the boxy enclosure recognizable — front face, top spool
 * holder, internal gantry rail, nozzle carriage, and print bed. Required
 * illustration for the homepage's Grinbuck3D venture band.
 */
export function BambuLabP1SPrinter(props: IllustrationProps) {
  return (
    <Wire {...props}>
      {/* Enclosure: front face, top face, right side face */}
      <path d="M20 40 L20 100 L80 100 L80 40 Z" />
      <path d="M20 40 L40 20 L100 20 L80 40 Z" />
      <path d="M80 40 L100 20 L100 80 L80 100 Z" />

      {/* Top spool holder */}
      <circle cx="60" cy="28" r="6" />

      {/* Gantry rail and carriage */}
      <path d="M25 55 L75 55" />
      <rect x="48" y="51" width="8" height="8" />
      <path d="M52 59 L52 66 L48 72 L56 72 Z" />

      {/* Print bed */}
      <rect x="25" y="85" width="50" height="7" rx="1.5" />

      {/* Front control panel */}
      <rect x="66" y="88" width="9" height="7" rx="1.5" />
    </Wire>
  );
}
