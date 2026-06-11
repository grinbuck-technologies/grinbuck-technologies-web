import gsap, { EASE_ENTER, EASE_EXIT } from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/constants";

export type SceneRefs = {
  track: HTMLElement | null;
  wordmark: HTMLElement | null;
  underline: HTMLElement | null;
  leftPanel: HTMLElement | null;
  rightPanel: HTMLElement | null;
  curtainText: HTMLElement | null;
  stage: HTMLElement | null;
};

// Docked-header geometry — wordmark shrinks and flies toward the top of scene 2.
export const DOCK_SCALE = 0.2;
const dockY = () => -(window.innerHeight * 0.42);

function getSubtitle(stage: HTMLElement | null) {
  const subtitleEl = stage?.querySelector("[data-subtitle]");
  return subtitleEl ? [subtitleEl] : [];
}

// Instantly places every scene element at its target state. Run while the
// curtain panels fully cover the viewport, so the swap is never seen.
function setSceneState(target: number, refs: SceneRefs, count: number) {
  const home = target === 0;
  gsap.set(refs.track, { yPercent: -(100 * target) / count });
  gsap.set(refs.wordmark, { scale: home ? 1 : DOCK_SCALE, y: home ? 0 : dockY(), autoAlpha: home ? 1 : 0 });
  gsap.set(getSubtitle(refs.stage), { opacity: home ? 1 : 0, visibility: home ? "visible" : "hidden" });
  gsap.set(refs.underline, { scaleX: 0 });
}

// Curtain wipe with a centered seam label (same mechanic as the intro gate):
// panels close → scene swaps under cover → label fades in/holds/out → panels
// retract. The label is the target scene's name, driven entirely by this timeline.
export function animateToScene(
  target: number,
  refs: SceneRefs,
  count: number,
  label: string
): Promise<void> {
  const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;

  if (reduced) {
    setSceneState(target, refs, count);
    gsap.set([refs.leftPanel, refs.rightPanel], { xPercent: (i: number) => (i === 0 ? -100 : 100) });
    gsap.set(refs.curtainText, { opacity: 0 });
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });

    tl
      // Stamp the target label, hidden, before the panels move.
      .add(() => {
        if (refs.curtainText) refs.curtainText.textContent = label;
      }, 0)
      .set(refs.curtainText, { opacity: 0 }, 0)
      // Close — panels sweep in to meet at center (~0.5s).
      .to(refs.leftPanel, { xPercent: 0, duration: 0.5, ease: EASE_EXIT }, 0)
      .to(refs.rightPanel, { xPercent: 0, duration: 0.5, ease: EASE_EXIT }, 0)
      // Covered — instant scene + wordmark dock swap behind the panels.
      .add(() => setSceneState(target, refs, count), 0.5)
      // Label fades in once fully closed, holds 400ms, fades out before retract.
      .to(refs.curtainText, { opacity: 1, duration: 0.2, ease: EASE_ENTER }, 0.5)
      .to(refs.curtainText, { opacity: 0, duration: 0.2, ease: EASE_ENTER }, 1.1)
      // Open — panels retract, revealing the swapped scene.
      .to(refs.leftPanel, { xPercent: -100, duration: 0.55, ease: EASE_ENTER }, 1.3)
      .to(refs.rightPanel, { xPercent: 100, duration: 0.55, ease: EASE_ENTER }, 1.3);
  });
}
