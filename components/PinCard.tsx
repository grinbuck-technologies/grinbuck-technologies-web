"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import type { Venture } from "@/lib/ventures";
import BrassPin from "@/components/BrassPin";
import { CARD_SHADOW } from "@/lib/pinboard";

const CARD_SHADOW_HOVER = "8px 16px 40px rgba(0,0,0,0.38)";

type Props = {
  venture: Venture;
  rot: number;
  index: number;
  registerRef: (index: number, el: HTMLDivElement | null) => void;
  onUnpin: () => void;
};

export default function PinCard({ venture, rot, index, registerRef, onUnpin }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => registerRef(index, ref.current), { scope: ref });

  const locked = () => ref.current?.dataset.fallen === "1" || ref.current?.dataset.dragging === "1";

  const enter = () => {
    if (locked() || !cardRef.current) return;
    gsap.to(ref.current, { rotation: 0, duration: 0.3, ease: "weight" });
    gsap.to(cardRef.current, { boxShadow: CARD_SHADOW_HOVER, duration: 0.3, ease: "weight" });
  };
  const leave = () => {
    if (locked() || !cardRef.current) return;
    gsap.to(ref.current, { rotation: rot, duration: 0.3, ease: "weight" });
    gsap.to(cardRef.current, { boxShadow: CARD_SHADOW, duration: 0.3, ease: "weight" });
  };

  const mono = (size: string, opacity: number, color = "var(--color-ink)"): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: size,
    color,
    opacity,
  });

  return (
    <div
      ref={ref}
      data-pin-wrapper
      data-rot={rot}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        position: "absolute",
        width: "clamp(180px, 22vw, 260px)",
        transformOrigin: "50% 0",
        zIndex: 1,
        touchAction: "none",
      }}
    >
      <BrassPin name={venture.name} onUnpin={onUnpin} />
      <a
        ref={cardRef}
        href={venture.url}
        target="_blank"
        rel="noopener noreferrer"
        data-pin-card
        style={{
          display: "block",
          marginTop: 12,
          background: "var(--color-paper)",
          borderRadius: 4,
          boxShadow: CARD_SHADOW,
          padding: "1.4rem 1rem 0.9rem",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-ink)" }}>
          {venture.name}
        </div>
        <p style={{ ...mono("0.7rem", 0.6), margin: "0.5rem 0 0.85rem", lineHeight: 1.55 }}>{venture.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.65rem" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-olive)", flexShrink: 0 }} />
          <span style={{ ...mono("0.62rem", 0.7), textTransform: "uppercase", letterSpacing: "0.08em" }}>{venture.status}</span>
        </div>
        <div style={mono("0.65rem", 1, "var(--color-olive)")}>{venture.url.replace(/^https?:\/\//, "")}</div>
      </a>
    </div>
  );
}
