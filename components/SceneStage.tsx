"use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import gsap from "@/lib/gsap";
import { Z_CURTAIN, Z_CURTAIN_TEXT, Z_WORDMARK } from "@/lib/constants";
import Wordmark from "@/components/Wordmark";
import PinBoard from "@/components/PinBoard";
import ClosingScene from "@/components/ClosingScene";
import { ventures } from "@/lib/ventures";
import { paginate, CARDS_PER_PAGE } from "@/lib/pinboard";
import { useSceneNavigation } from "@/lib/useSceneNavigation";
import { animateToScene, type SceneRefs } from "@/lib/sceneTransition";

// Vertical position of the olive divider that sits under the docked wordmark
const UNDERLINE_TOP = "13vh";

type Scene = { label: string; render: (active: boolean) => ReactNode };

// Scenes are derived automatically: HOME plus one PinBoard scene per page of
// ventures. Adding a venture (past CARDS_PER_PAGE) spawns a new paginated scene
// with no other code changes.
const venturePages = paginate(ventures, CARDS_PER_PAGE);
const scenes: Scene[] = [
  { label: "HOME", render: () => null },
  ...venturePages.map((items, pageIndex) => ({
    label: pageIndex === 0 ? "OUR VENTURES" : "OUR VENTURES — CONTINUED",
    render: (active: boolean) => (
      <PinBoard ventures={items} active={active} page={pageIndex} totalPages={venturePages.length} />
    ),
  })),
  { label: "ABOUT US", render: () => null },
];

const ABOUT_SCENE_INDEX = scenes.length - 1;

type Props = { gateOpen: boolean };

// Full-viewport snap-scene stage. Scenes are stacked in a tall track; each
// gesture runs a curtain wipe that swaps the scene under cover. The wordmark
// lives in a separate fixed layer so it persists across every scene.
export default function SceneStage({ gateOpen }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const curtainTextRef = useRef<HTMLSpanElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const lenis = useLenis();

  // Pause Lenis: we own the wheel for snap-scenes, so smooth-scroll must not
  // also process wheel input. Restored if the stage ever unmounts.
  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [lenis]);

  // Lock native scrolling — keyed to gateOpen so it re-asserts AFTER IntroGate
  // clears body.overflow on open.
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [gateOpen]);

  // Initial states: olive divider hidden + curtain panels parked off-screen.
  useGSAP(
    () => {
      gsap.set(underlineRef.current, { xPercent: -50, scaleX: 0 });
      gsap.set(leftPanelRef.current, { xPercent: -100 });
      gsap.set(rightPanelRef.current, { xPercent: 100 });
    },
    { scope: stageRef }
  );

  const onTransition = useCallback((target: number) => {
    // Flip active scene at gesture start so the incoming scene (e.g. PinBoard)
    // resets while still hidden behind the closing curtain.
    setActiveScene(target);
    const refs: SceneRefs = {
      track: trackRef.current,
      wordmark: wordmarkRef.current,
      underline: underlineRef.current,
      leftPanel: leftPanelRef.current,
      rightPanel: rightPanelRef.current,
      curtainText: curtainTextRef.current,
      stage: stageRef.current,
    };
    return animateToScene(target, refs, scenes.length, scenes[target].label);
  }, []);

  useSceneNavigation({ enabled: gateOpen, count: scenes.length, onTransition });

  const panel: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: "50vw",
    height: "100vh",
    background: "var(--color-gate)",
    pointerEvents: "none",
    willChange: "transform",
    zIndex: Z_CURTAIN,
  };

  return (
    <div ref={stageRef} style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 1 }}>
      {/* Sliding track stacks every scene vertically */}
      <div
        ref={trackRef}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: `${scenes.length * 100}vh`, willChange: "transform" }}
      >
        {scenes.map((s, i) => (
          <section
            key={s.label}
            aria-label={s.label}
            style={{ height: "100vh", width: "100%", background: "var(--color-paper)", overflow: "hidden" }}
          >
            {i === ABOUT_SCENE_INDEX ? <ClosingScene /> : s.render(activeScene === i)}
          </section>
        ))}
      </div>

      {/* Persistent wordmark — fixed center, travels to docked header on transition */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: Z_WORDMARK,
        }}
      >
        <Wordmark gateOpen={gateOpen} rootRef={wordmarkRef} />
      </div>

      {/* Olive divider that draws under the docked wordmark */}
      <div
        ref={underlineRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: UNDERLINE_TOP,
          left: "50%",
          width: "min(420px, 60vw)",
          height: 1,
          background: "var(--color-olive)",
          transformOrigin: "center",
          pointerEvents: "none",
          zIndex: Z_WORDMARK,
        }}
      />

      {/* Curtain panels — sweep in to cover the swap, then retract */}
      <div ref={leftPanelRef} aria-hidden="true" style={{ ...panel, left: 0 }} />
      <div ref={rightPanelRef} aria-hidden="true" style={{ ...panel, right: 0 }} />

      {/* Seam label shown while the panels are closed (above the panels) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: Z_CURTAIN_TEXT,
        }}
      >
        <span
          ref={curtainTextRef}
          style={{
            fontFamily: "var(--font-press-start-2p)",
            color: "var(--color-paper)",
            fontSize: "1.2rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}
