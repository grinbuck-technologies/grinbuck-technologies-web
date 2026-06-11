"use client";
import { useEffect, useRef } from "react";
import gsap, { EASE_ENTER } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY, Z_CURSOR } from "@/lib/constants";

const LINK_PROXIMITY_PX = 80;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const isNear = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    // Injected <style> beats any inline cursor:pointer — !important in a stylesheet
    // wins over inline styles, so even <a style="cursor:pointer"> gets suppressed.
    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);
    // Belt-and-suspenders: also stamp it directly on the root elements
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const teardown = () => {
      document.head.removeChild(styleEl);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };

    // Start off-screen so dot doesn't flash at origin before first move
    gsap.set(dotRef.current, { x: -100, y: -100 });

    if (reduced) {
      // Static dot — no trailing, no proximity tint
      const onMove = (e: MouseEvent) =>
        gsap.set(dotRef.current, { x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", onMove);
      return () => { window.removeEventListener("mousemove", onMove); teardown(); };
    }

    const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Find closest point on every <a> rect; flag proximity within LINK_PROXIMITY_PX
      const links = document.querySelectorAll<HTMLElement>("a");
      let near = false;
      for (const link of links) {
        const linkRect = link.getBoundingClientRect();
        const clampedX = Math.max(linkRect.left, Math.min(e.clientX, linkRect.right));
        const clampedY = Math.max(linkRect.top,  Math.min(e.clientY, linkRect.bottom));
        if (Math.hypot(e.clientX - clampedX, e.clientY - clampedY) < LINK_PROXIMITY_PX) { near = true; break; }
      }

      if (near !== isNear.current) {
        isNear.current = near;
        gsap.to(dotRef.current, {
          scale:           near ? 2.5 : 1,
          backgroundColor: near ? "var(--color-olive)" : "var(--color-ink)",
          duration: 0.35,
          ease: EASE_ENTER,
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mousemove", onMove); teardown(); };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        // Offset by half the dot so GSAP x/y of clientX/Y centers the dot on the pointer
        top: -4,
        left: -4,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--color-ink)",
        pointerEvents: "none",
        zIndex: Z_CURSOR,
        willChange: "transform",
      }}
    />
  );
}
