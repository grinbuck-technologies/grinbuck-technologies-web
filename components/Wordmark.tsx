"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { EASE_ENTER, SplitText } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/constants";

type Props = { gateOpen: boolean; rootRef: React.RefObject<HTMLDivElement | null> };

// Persistent hero lockup. Lives in SceneStage's fixed layer so it can travel
// from hero-center (scene 1) to a docked header (scene 2). The settle entrance
// animates the chars; the stage animates this root's scale/position separately.
export default function Wordmark({ gateOpen, rootRef }: Props) {
  const wordRef = useRef<HTMLDivElement>(null);
  const grinRef = useRef<HTMLSpanElement>(null);
  const buckRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!gateOpen) return;

      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        gsap.set(wordRef.current, { opacity: 1 });
        gsap.set(buckRef.current, { color: "var(--color-olive)" });
        gsap.set(subtitleRef.current, { opacity: 1, visibility: "visible" });
        return;
      }

      const grinSplit = new SplitText(grinRef.current!, { type: "chars,words" });
      const buckSplit = new SplitText(buckRef.current!, { type: "chars,words" });
      [...grinSplit.words, ...buckSplit.words].forEach((w) => {
        (w as HTMLElement).style.display = "inline-block";
      });

      const allChars = [...grinSplit.chars, ...buckSplit.chars];
      gsap.set(wordRef.current, { opacity: 1 });
      gsap.set(subtitleRef.current, { opacity: 0, visibility: "hidden" });

      gsap
        .timeline()
        .fromTo(
          allChars,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: EASE_ENTER, stagger: 0.045 }
        )
        .to(buckRef.current, { color: "var(--color-olive)", duration: 0.6, ease: EASE_ENTER }, "+=0.25")
        .to(subtitleRef.current, { opacity: 1, visibility: "visible", duration: 0.6, ease: EASE_ENTER }, "<0.8")
        .to(
          wordRef.current,
          { fontWeight: "+=8", duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" },
          "+=0.2"
        );

      return () => {
        grinSplit.revert();
        buckSplit.revert();
      };
    },
    { dependencies: [gateOpen], scope: rootRef }
  );

  const type: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(4rem, 18vw, 16rem)",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    color: "var(--color-ink)",
  };

  return (
    <div
      ref={rootRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        willChange: "transform",
      }}
    >
      <div ref={wordRef} style={{ ...type, opacity: 0 }}>
        <span ref={grinRef}>grin</span>
        <span ref={buckRef}>buck</span>
      </div>

      <p
        ref={subtitleRef}
        data-subtitle
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          letterSpacing: "0.08em",
          color: "var(--color-ink)",
          opacity: 0,
          visibility: "hidden",
          margin: 0,
          textAlign: "center",
        }}
      >
        Technologies Inc.
      </p>
    </div>
  );
}
