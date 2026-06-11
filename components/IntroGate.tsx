"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap, { EASE_EXIT } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY, Z_INTRO_GATE } from "@/lib/constants";

const PROGRESS_BAR_FULL_WIDTH = 120;

type Props = { onOpen?: () => void };

export default function IntroGate({ onOpen }: Props) {
  // Stable ref so the effect closure never captures a stale onOpen
  const onOpenRef = useRef(onOpen);
  useLayoutEffect(() => {
    onOpenRef.current = onOpen;
  });

  const gateRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);

    // Reduced motion: instant dismiss, no scroll lock needed
    if (mq.matches) {
      gsap.set(gateRef.current, { display: "none" });
      onOpenRef.current?.();
      return;
    }

    document.body.style.overflow = "hidden";

    const handleComplete = () => {
      document.body.style.overflow = "";
      gsap.set(gateRef.current, { display: "none" });
      onOpenRef.current?.();
    };

    const tl = gsap.timeline({ onComplete: handleComplete });

    // Progress bar fills over 1.5 s
    tl.to(progressRef.current, { width: PROGRESS_BAR_FULL_WIDTH, duration: 1.5, ease: "none" })
      // Text fades during the 0.8 s hold (first 0.4 s)
      .to(textRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" })
      // 0.4 s later → 0.8 s total hold after bar completes → panels split
      .to(leftRef.current, { xPercent: -100, duration: 1.1, ease: EASE_EXIT }, "+=0.4")
      .to(rightRef.current, { xPercent: 100, duration: 1.1, ease: EASE_EXIT }, "<");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []); // one-shot on mount

  const panel: React.CSSProperties = {
    position: "fixed",
    top: 0,
    height: "100vh",
    width: "50vw",
    background: "var(--color-gate)",
  };

  return (
    <div ref={gateRef} style={{ position: "fixed", inset: 0, zIndex: Z_INTRO_GATE }}>
      {/* Left and right panels */}
      <div ref={leftRef} style={{ ...panel, left: 0 }} />
      <div ref={rightRef} style={{ ...panel, right: 0 }} />

      {/* Label + progress bar, centered across the seam */}
      <div
        ref={textRef}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-press-start-2p)",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-paper)",
          }}
        >
          WELCOME TO THE GRINVERSE
        </span>

        {/* 1 px hairline progress bar */}
        <div
          ref={progressRef}
          style={{ height: "1px", width: 0, background: "var(--color-olive)" }}
        />
      </div>
    </div>
  );
}
