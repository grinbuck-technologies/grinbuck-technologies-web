"use client";
import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import Wordmark from "@/components/Wordmark";
import Ventures from "@/components/Ventures";
import { useSceneNavigation } from "@/lib/useSceneNavigation";
import { animateToScene, type SceneRefs } from "@/lib/sceneTransition";

type Props = { gateOpen: boolean };

// Full-viewport snap-scene stage. Scene 1 (hero) and scene 2 (ventures) are
// stacked in a 200vh track that displaces by one viewport per gesture. The
// wordmark lives in a separate fixed layer so it can persist across both scenes.
export default function SceneStage({ gateOpen }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Lock native scrolling — scenes snap, the page itself never scrolls.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Initial hidden state for the scene-2 reveal targets.
  useGSAP(
    () => {
      gsap.set("[data-venture-row]", { opacity: 0, yPercent: 60 });
      gsap.set(underlineRef.current, { xPercent: -50, scaleX: 0 });
    },
    { scope: stageRef }
  );

  const onTransition = useCallback((target: number) => {
    const refs: SceneRefs = {
      track: trackRef.current,
      wordmark: wordmarkRef.current,
      underline: underlineRef.current,
      stage: stageRef.current,
    };
    return animateToScene(target, refs);
  }, []);

  useSceneNavigation({ enabled: gateOpen, count: 2, onTransition });

  const scene: React.CSSProperties = { height: "100vh", width: "100%", background: "var(--color-paper)" };

  return (
    <div ref={stageRef} style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 1 }}>
      {/* Sliding track holds both scenes stacked vertically (200vh total) */}
      <div ref={trackRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "200vh", willChange: "transform" }}>
        <section style={scene} aria-label="Intro" />
        <section style={scene} aria-label="Ventures">
          <Ventures />
        </section>
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
          zIndex: 5,
        }}
      >
        <Wordmark gateOpen={gateOpen} rootRef={wordmarkRef} />
      </div>

      {/* Olive divider that draws under the docked wordmark in scene 2 */}
      <div
        ref={underlineRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "13vh",
          left: "50%",
          width: "min(420px, 60vw)",
          height: 1,
          background: "var(--color-olive)",
          transformOrigin: "center",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}
