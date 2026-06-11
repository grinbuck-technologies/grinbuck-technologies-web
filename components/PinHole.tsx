import type { PinSlot } from "@/lib/pinboard";

type Props = { slot: PinSlot };

export default function PinHole({ slot }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: `calc(${slot.x}% - 3px)`,
        top: `calc(${slot.y}% - 3px)`,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.2)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
