"use client";
import { useEffect, useRef } from "react";
import { Box, MousePointerClick, BarChart2, MapPin, type LucideProps } from "lucide-react";
import gsap from "@/lib/gsap";
import type { Venture } from "@/lib/ventures";

type IconComponent = React.ComponentType<LucideProps>;
const ICONS: Record<string, IconComponent> = { Box, MousePointerClick, BarChart2, MapPin };

const SHADOW_ON  = "0 18px 40px -24px rgba(10,10,10,0.45)";
const SHADOW_OFF = "0 18px 40px -24px rgba(10,10,10,0)";

// quickTo fn — accepts one number, return value unused
type QuickFn = (value: number) => void;

type Props = { venture: Venture; index: number; isLast: boolean };

export default function VentureRow({ venture, index, isLast }: Props) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const rowRef    = useRef<HTMLAnchorElement>(null);
  const idxRef    = useRef<HTMLSpanElement>(null);
  const oliveRef  = useRef<HTMLSpanElement>(null);
  const descRef   = useRef<HTMLDivElement>(null);
  const xToRef    = useRef<QuickFn | null>(null);
  const yToRef    = useRef<QuickFn | null>(null);

  useEffect(() => {
    const fine    = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || !magnetRef.current) return;

    xToRef.current = gsap.quickTo(magnetRef.current, "x", { duration: 0.4, ease: "power3" }) as QuickFn;
    yToRef.current = gsap.quickTo(magnetRef.current, "y", { duration: 0.4, ease: "power3" }) as QuickFn;
  }, []);

  const Icon  = ICONS[venture.icon] ?? Box;
  const label = String(index + 1).padStart(2, "0");

  const enter = () => {
    gsap.to(rowRef.current,   { y: -6, scale: 1.005, boxShadow: SHADOW_ON,  duration: 0.5, ease: "weight" });
    gsap.to(idxRef.current,   { color: "var(--color-olive)",      duration: 0.4, ease: "weight" });
    gsap.to(oliveRef.current, { clipPath: "inset(0 0% 0 0)",      duration: 0.55, ease: "weight" });
    gsap.to(descRef.current,  { height: "auto", opacity: 0.5,     duration: 0.4, ease: "weight" });
  };

  const leave = () => {
    gsap.to(rowRef.current,   { y: 0, scale: 1, boxShadow: SHADOW_OFF, duration: 0.5, ease: "weight" });
    gsap.to(idxRef.current,   { color: "var(--color-olive-mist)",  duration: 0.4, ease: "weight" });
    gsap.to(oliveRef.current, { clipPath: "inset(0 100% 0 0)",     duration: 0.45, ease: "weight" });
    gsap.to(descRef.current,  { height: 0, opacity: 0,             duration: 0.35, ease: "weight" });
    // Snap magnetic wrapper back to origin
    xToRef.current?.(0);
    yToRef.current?.(0);
  };

  const onMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!xToRef.current || !yToRef.current || !magnetRef.current) return;
    const r  = magnetRef.current.getBoundingClientRect();
    xToRef.current((e.clientX - (r.left + r.width  / 2)) * 0.25);
    yToRef.current((e.clientY - (r.top  + r.height / 2)) * 0.25);
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.75rem, 6vw, 4.75rem)",
    fontWeight: 540,
    letterSpacing: "-0.03em",
    lineHeight: 1,
    whiteSpace: "nowrap",
  };

  return (
    // Magnetic wrapper — receives x/y pull; data-venture-row here so scroll-
    // trigger and Ventures query target this element, not the inner <a>.
    <div ref={magnetRef} data-venture-row>
      <a
        ref={rowRef}
        href={venture.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={enter}
        onMouseLeave={leave}
        onMouseMove={onMagneticMove}
        style={{
          display: "block",
          paddingBlock: "clamp(1rem, 2vw, 1.6rem)",
          minHeight: "44px", // mobile tap target
          borderTop: "1px solid var(--color-hairline)",
          ...(isLast && { borderBottom: "1px solid var(--color-hairline)" }),
          textDecoration: "none",
          boxShadow: SHADOW_OFF,
        }}
      >
        {/* Main row — index · name · rule · icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem, 2vw, 1.5rem)" }}>
          <span
            ref={idxRef}
            data-venture-index
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-olive-mist)", flexShrink: 0, minWidth: "2rem" }}
          >
            {label}
          </span>

          {/* Name with absolutely-positioned olive clone for wipe effect */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <span style={{ ...nameStyle, color: "var(--color-ink)" }}>{venture.name}</span>
            <span
              ref={oliveRef}
              aria-hidden="true"
              style={{ ...nameStyle, color: "var(--color-olive)", position: "absolute", inset: 0, clipPath: "inset(0 100% 0 0)" }}
            >
              {venture.name}
            </span>
          </div>

          <div style={{ flex: 1, height: "1px", background: "var(--color-hairline)", alignSelf: "center" }} />

          <Icon size={18} strokeWidth={1.5} color="var(--color-ink)" style={{ flexShrink: 0, opacity: 0.45 }} />
        </div>

        {/* Description — height:0 at rest, revealed on hover */}
        <div ref={descRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-ink)",
            margin: 0,
            paddingTop: "0.6rem",
            paddingLeft: "calc(2rem + clamp(0.75rem, 2vw, 1.5rem))",
          }}>
            {venture.description}
          </p>
        </div>
      </a>
    </div>
  );
}
