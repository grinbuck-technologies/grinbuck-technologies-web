"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IntroGate() {
  const gateRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    tl.to(textRef.current, { opacity: 0, duration: 0.3 })
      .to(leftRef.current, { x: "-100%", duration: 1, ease: "power3.inOut" }, "<0.1")
      .to(rightRef.current, { x: "100%", duration: 1, ease: "power3.inOut" }, "<")
      .set(gateRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={gateRef}
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}
    >
      <div ref={leftRef} style={{ width: "50%", height: "100%", background: "#0d0d0d" }} />
      <div ref={rightRef} style={{ width: "50%", height: "100%", background: "#0d0d0d" }} />

      <div
        ref={textRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#666",
          }}
        >
          Welcome to the GrinVerse
        </span>
      </div>
    </div>
  );
}
