"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "grinverse-entered";

const panelBase: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "50%",
  background: "#0d0d0d",
};

export default function IntroGate() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // Lazy initializer avoids synchronous setState inside the effect body.
  // typeof window guard prevents a ReferenceError during SSR.
  const [done, setDone] = useState(
    () => typeof window !== "undefined" && !!sessionStorage.getItem(SESSION_KEY),
  );

  useEffect(() => {
    if (done) return;

    const tl = gsap.timeline({
      delay: 2.5,
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setDone(true);
      },
    });

    tl.to(textRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(leftRef.current, { x: "-100%", duration: 1, ease: "power3.inOut" }, "<0.05")
      .to(rightRef.current, { x: "100%", duration: 1, ease: "power3.inOut" }, "<");

    return () => { tl.kill(); };
  }, [done]);

  if (done) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div ref={leftRef} style={{ ...panelBase, left: 0 }} />
      <div ref={rightRef} style={{ ...panelBase, right: 0 }} />

      <div
        ref={textRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-press-start-2p), monospace",
            fontSize: "2.4rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#ffffff",
          }}
        >
          Welcome to the GrinVerse
        </span>
      </div>
    </div>
  );
}
