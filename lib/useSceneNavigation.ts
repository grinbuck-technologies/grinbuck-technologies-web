"use client";
import { useEffect, useLayoutEffect, useRef, type MutableRefObject } from "react";

type TransitionFn = (target: number, prev: number, direction: number) => Promise<void>;

type Args = {
  enabled: boolean;
  count: number;
  onTransition: TransitionFn;
  wheelInterceptor?: MutableRefObject<((e: WheelEvent) => boolean) | null>;
  scrollSceneIndex?: number;
};

const WHEEL_THRESHOLD = 24;
const SWIPE_THRESHOLD = 50;
const COOLDOWN_MS = 320;

/**
 * Owns the snap-scene paradigm: one scroll/swipe/key gesture advances exactly
 * one scene. Input is locked for the duration of the transition plus a short
 * cooldown so trackpad/touch momentum can't double-fire. Lenis is left intact —
 * the page is a fixed non-scrolling stage, so there's nothing for it to scroll.
 */
export function useSceneNavigation({ enabled, count, onTransition, wheelInterceptor, scrollSceneIndex }: Args) {
  const sceneRef = useRef(0);
  const lockRef = useRef(false);
  const enabledRef = useRef(enabled);
  const cbRef = useRef(onTransition);
  const wheelRef = useRef(wheelInterceptor);
  const scrollIndexRef = useRef(scrollSceneIndex);

  useLayoutEffect(() => {
    enabledRef.current = enabled;
    cbRef.current = onTransition;
    wheelRef.current = wheelInterceptor;
    scrollIndexRef.current = scrollSceneIndex;
  });

  useEffect(() => {
    const trigger = (direction: number) => {
      if (!enabledRef.current || lockRef.current) return;
      const prev = sceneRef.current;
      const next = ((prev + direction) % count + count) % count;
      if (next === prev) return;

      lockRef.current = true;
      sceneRef.current = next;
      cbRef.current(next, prev, direction).then(() => {
        setTimeout(() => {
          lockRef.current = false;
        }, COOLDOWN_MS);
      });
    };

    const onWheel = (event: WheelEvent) => {
      const onScrollScene =
        scrollIndexRef.current !== undefined && sceneRef.current === scrollIndexRef.current;
      if (onScrollScene && wheelRef.current?.current) {
        const handled = wheelRef.current.current(event);
        if (handled) return;
      }
      event.preventDefault();
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      trigger(event.deltaY > 0 ? 1 : -1);
    };

    let touchStartY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => event.preventDefault();
    const onTouchEnd = (event: TouchEvent) => {
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      trigger(deltaY < 0 ? 1 : -1); // swipe up → advance
    };

    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        trigger(1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        trigger(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [count]);

  return sceneRef;
}
