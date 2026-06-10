"use client";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Rendered inside the ReactLenis context so useLenis() can subscribe
 * reactively — it re-runs when the Lenis instance is created (which
 * happens in ReactLenis's own useEffect, one tick after mount).
 * This avoids the race condition where lenisRef.current?.lenis is
 * undefined at the time an outer useEffect([]) fires.
 */
function GSAPSyncBridge() {
  const lenis = useLenis(); // reactive — undefined → Lenis instance

  useEffect(() => {
    if (!lenis) return;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (time is seconds → convert to ms for lenis.raf)
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);

    // Disable GSAP lag-clamping so Lenis handles its own smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

type Props = { children: React.ReactNode };

export default function SmoothScroll({ children }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reduced motion: render children without Lenis — native scroll, no ticker sync
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}>
      <GSAPSyncBridge />
      {children}
    </ReactLenis>
  );
}
