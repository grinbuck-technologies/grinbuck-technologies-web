"use client";
import { useEffect, useSyncExternalStore } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/constants";

function subscribeToReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  // No `window` during SSR — assume motion is fine; corrected client-side
  // via useSyncExternalStore's snapshot without a hydration mismatch.
  return false;
}

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

    // Direct hash-URL loads (e.g. /#about) previously raced against Lenis
    // taking over scroll on mount — with `scroll-behavior: smooth` still
    // set (now removed, see globals.css), the browser's own animated
    // anchor-jump could get interrupted/frozen wherever it was mid-flight
    // the instant Lenis's construction-time scroll snapshot ran. Correct
    // it once, here, after Lenis is fully attached — no `offset` needed,
    // Lenis's scrollTo already reads the target's own scroll-margin-top
    // from CSS. immediate: true — no animation, so there's nothing left
    // to race against. lenis.resize() forces an immediate re-measurement
    // of scroll limits rather than waiting on Lenis's normal 250ms-
    // debounced ResizeObserver, in case content above the target is still
    // settling (fonts, async layout) at this point.
    if (window.location.hash) {
      requestAnimationFrame(() => {
        lenis.resize();
        lenis.scrollTo(window.location.hash, { immediate: true });
      });
    }

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

type Props = { children: React.ReactNode };

/**
 * Wraps the app in Lenis smooth scrolling, synced to GSAP's ticker and
 * ScrollTrigger. Respects `prefers-reduced-motion`: when set, renders
 * `children` directly with native scroll and no ticker sync instead.
 *
 * @param children - The app content to wrap.
 */
export function SmoothScroll({ children }: Props) {
  // useSyncExternalStore (not useState+useEffect) — reads the
  // prefers-reduced-motion media query without a hydration mismatch: React
  // uses getReducedMotionServerSnapshot for both the server render and the
  // client's initial hydration pass, then re-renders with the real
  // client-side value immediately after. Also stays live if the OS setting
  // changes while the page is open.
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Reduced motion: render children without Lenis — native scroll, no ticker sync
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}>
      <GSAPSyncBridge />
      {children}
    </ReactLenis>
  );
}
