"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { SplitText, ScrollTrigger } from "@/lib/gsap";

type Props = { gateOpen: boolean };

export default function Hero({ gateOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const grinRef = useRef<HTMLSpanElement>(null);
  const buckRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!gateOpen) return;

      // Reduced motion: reveal everything instantly at final state
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(wordmarkRef.current, { opacity: 1 });
        gsap.set(buckRef.current, { color: "var(--color-olive)" });
        gsap.set(subtitleRef.current, { opacity: 1, visibility: "visible" });
        return;
      }

      const grinSplit = new SplitText(grinRef.current!, { type: "chars,words" });
      const buckSplit = new SplitText(buckRef.current!, { type: "chars,words" });

      // Keep display:inline-block so word wrappers flow correctly — overflow:hidden
      // removed because it clips glyphs like "g" at large sizes; opacity:0 on the
      // fromTo start already keeps chars invisible below the baseline.
      [...grinSplit.words, ...buckSplit.words].forEach((w) => {
        (w as HTMLElement).style.display = "inline-block";
      });

      const allChars = [...grinSplit.chars, ...buckSplit.chars];
      gsap.set(wordmarkRef.current, { opacity: 1 });
      // Guarantee subtitle is invisible before the timeline begins — belt-and-suspenders
      // alongside the inline CSS, guards against any prior GSAP state on the element.
      gsap.set(subtitleRef.current, { opacity: 0, visibility: "hidden" });

      gsap
        .timeline()
        // Chars rise — opacity:0 start hides them, no clip-mask needed
        .fromTo(
          allChars,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: "weight", stagger: 0.045 }
        )
        // "buck" turns olive a beat after grin has settled
        .to(buckRef.current, { color: "var(--color-olive)", duration: 0.6, ease: "weight" }, "+=0.25")
        // "<0.8" → 0.8 s after the buck color tween starts
        .to(subtitleRef.current, { opacity: 1, visibility: "visible", duration: 0.6, ease: "weight" }, "<0.8")
        // Idle breathing via variable font weight axis
        .to(
          wordmarkRef.current,
          { fontWeight: "+=8", duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" },
          "+=0.2"
        );

      return () => {
        grinSplit.revert();
        buckSplit.revert();
      };
    },
    { dependencies: [gateOpen], scope: containerRef }
  );

  // ── Scroll pin: wordmark scrubs to small docked mark as user scrolls past hero ──
  useGSAP(
    () => {
      if (!gateOpen) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Scrub wordmark from full-size center → 0.42× near viewport top.
      // fromTo with explicit start values so progress=0 is always scale:1/y:0
      // regardless of when this effect fires relative to the settle animation.
      const scrub = gsap
        .timeline({ defaults: { ease: "none" } })
        .fromTo(
          wordmarkRef.current,
          { scale: 1, y: 0 },
          { scale: 0.42, y: () => -(window.innerHeight * 0.5 - 64) }
        )
        .fromTo(subtitleRef.current, { opacity: 1, visibility: "visible" }, { opacity: 0 }, 0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        animation: scrub,
        invalidateOnRefresh: true,
      });
    },
    { dependencies: [gateOpen], scope: containerRef }
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
    <section
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        background: "var(--color-paper)",
      }}
    >
      <div ref={wordmarkRef} style={{ ...type, opacity: 0 }}>
        <span ref={grinRef}>grin</span>
        <span ref={buckRef}>buck</span>
      </div>

      <p
        ref={subtitleRef}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-ink)",
          opacity: 0,
          visibility: "hidden",
          margin: 0,
          textAlign: "center",
        }}
      >
        Technologies Inc.
      </p>
    </section>
  );
}
