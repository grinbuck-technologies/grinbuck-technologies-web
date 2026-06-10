import gsap from "@/lib/gsap";

export type SceneRefs = {
  track: HTMLElement | null;
  wordmark: HTMLElement | null;
  underline: HTMLElement | null;
  stage: HTMLElement | null;
};

// Docked-header geometry — wordmark shrinks and flies toward the top of scene 2.
export const DOCK_SCALE = 0.2;
const dockY = () => -(window.innerHeight * 0.42);

function getTargets(stage: HTMLElement | null) {
  const rows = stage ? gsap.utils.toArray<HTMLElement>("[data-venture-row]", stage) : [];
  const subtitleEl = stage?.querySelector("[data-subtitle]");
  const subtitle = subtitleEl ? [subtitleEl] : [];
  return { rows, subtitle };
}

function setSceneInstant(target: number, refs: SceneRefs) {
  const { rows, subtitle } = getTargets(refs.stage);
  const atIndex = target === 1;
  gsap.set(refs.track, { yPercent: atIndex ? -50 : 0 });
  gsap.set(refs.wordmark, { scale: atIndex ? DOCK_SCALE : 1, y: atIndex ? dockY() : 0 });
  gsap.set(subtitle, { opacity: atIndex ? 0 : 1, visibility: atIndex ? "hidden" : "visible" });
  gsap.set(rows, { opacity: atIndex ? 1 : 0, yPercent: atIndex ? 0 : 60 });
  gsap.set(refs.underline, { scaleX: atIndex ? 1 : 0 });
}

// Builds the scene displacement: the whole stage slides one viewport while the
// wordmark morphs between hero-center and docked header, ventures rows stagger
// in, and an olive divider draws under the docked mark.
export function animateToScene(target: number, refs: SceneRefs): Promise<void> {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    setSceneInstant(target, refs);
    return Promise.resolve();
  }

  const { rows, subtitle } = getTargets(refs.stage);

  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve, defaults: { ease: "weight" } });

    if (target === 1) {
      tl.to(subtitle, { opacity: 0, duration: 0.3 }, 0)
        .to(refs.track, { yPercent: -50, duration: 0.95 }, 0)
        .to(refs.wordmark, { scale: DOCK_SCALE, y: dockY, duration: 0.95 }, 0)
        .to(rows, { opacity: 1, yPercent: 0, stagger: 0.07, duration: 0.7 }, 0.45)
        .to(refs.underline, { scaleX: 1, duration: 0.6 }, 0.5);
    } else {
      tl.to(refs.underline, { scaleX: 0, duration: 0.4 }, 0)
        .to(rows, { opacity: 0, yPercent: 60, stagger: 0.04, duration: 0.4 }, 0)
        .to(refs.track, { yPercent: 0, duration: 0.95 }, 0.1)
        .to(refs.wordmark, { scale: 1, y: 0, duration: 0.95 }, 0.1)
        .to(subtitle, { opacity: 1, visibility: "visible", duration: 0.5 }, 0.55);
    }
  });
}
