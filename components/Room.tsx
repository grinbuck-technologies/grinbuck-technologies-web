"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "@/lib/gsap";

const W = 20;
const H = 10;
const D = 16;
const HW = W / 2;
const HD = D / 2;

const SCENE_BG = "#1C1A15";

const COLORS = {
  wall: SCENE_BG,
  ceiling: "#141210",
  floor: "#0F0D0A",
  cork: "#8B6914",
  gold: "#B8963E",
  olive: "#6E7A3E",
  card: "#FAFAF7",
  panel: "#0A0A0A",
} as const;

function createTimerClock(): { clock: THREE.Clock; dispose: () => void } {
  const timer = new THREE.Timer();
  timer.connect(document);
  const clock = {
    autoStart: true,
    startTime: 0,
    oldTime: 0,
    elapsedTime: 0,
    running: true,
    start() {
      timer.reset();
      clock.elapsedTime = 0;
      clock.oldTime = 0;
      clock.running = true;
    },
    stop() {
      clock.running = false;
    },
    getElapsedTime() {
      return timer.getElapsed();
    },
    getDelta() {
      timer.update();
      return timer.getDelta();
    },
  };
  return { clock: clock as unknown as THREE.Clock, dispose: () => timer.dispose() };
}

function SceneBackground() {
  return <color attach="background" args={[SCENE_BG]} />;
}

function TimerClock() {
  const set = useThree((state) => state.set);

  useLayoutEffect(() => {
    const { clock, dispose } = createTimerClock();
    set({ clock });
    return dispose;
  }, [set]);

  return null;
}

const CAMERA_KEYFRAMES = [
  { t: 0, position: [0, 2.2, 6] as const, lookAt: [0, 2, 0] as const },
  { t: 0.3, position: [0, 2.2, 10] as const, lookAt: [0, 2, -2] as const },
  { t: 0.65, position: [-3, 2.2, -2] as const, lookAt: [-10, 2, -4] as const },
  { t: 1, position: [3, 2.2, -2] as const, lookAt: [10, 2, -4] as const },
];

const CARD_OFFSETS: [number, number][] = [
  [-2.05, 1], [0, 1], [2.05, 1],
  [-2.05, -1], [0, -1], [2.05, -1],
];

function sampleCamera(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  let i = 0;
  while (i < CAMERA_KEYFRAMES.length - 1 && p > CAMERA_KEYFRAMES[i + 1].t) i += 1;
  const a = CAMERA_KEYFRAMES[i];
  const b = CAMERA_KEYFRAMES[Math.min(i + 1, CAMERA_KEYFRAMES.length - 1)];
  const span = b.t - a.t;
  const u = span <= 0 ? 0 : (p - a.t) / span;
  const lerp = (x: number, y: number) => x + (y - x) * u;
  return {
    position: [lerp(a.position[0], b.position[0]), lerp(a.position[1], b.position[1]), lerp(a.position[2], b.position[2])] as [
      number,
      number,
      number,
    ],
    lookAt: [lerp(a.lookAt[0], b.lookAt[0]), lerp(a.lookAt[1], b.lookAt[1]), lerp(a.lookAt[2], b.lookAt[2])] as [
      number,
      number,
      number,
    ],
  };
}

type ScrollRef = React.RefObject<HTMLDivElement | null>;

function CameraRig({ scrollRef }: { scrollRef: ScrollRef }) {
  const targetPos = useRef(new THREE.Vector3(0, 2.2, 6));
  const targetLook = useRef(new THREE.Vector3(0, 2, 0));
  const smoothLook = useRef(new THREE.Vector3(0, 2, 0));

  useFrame(({ camera }) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const progress = max > 0 ? el.scrollTop / max : 0;
    const { position, lookAt } = sampleCamera(progress);
    targetPos.current.set(...position);
    targetLook.current.set(...lookAt);
    camera.position.lerp(targetPos.current, 0.06);
    smoothLook.current.lerp(targetLook.current, 0.06);
    camera.lookAt(smoothLook.current);
  });
  return null;
}

function BrassStrip({ size, position }: { size: [number, number, number]; position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function PanelFrame({ w, h, z }: { w: number; h: number; z: number }) {
  const t = 0.04;
  const d = 0.08;
  return (
    <group>
      <mesh position={[0, h / 2 + t / 2, z]}>
        <boxGeometry args={[w + t * 2, t, d]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -h / 2 - t / 2, z]}>
        <boxGeometry args={[w + t * 2, t, d]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-w / 2 - t / 2, 0, z]}>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[w / 2 + t / 2, 0, z]}>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function PinboardFrame() {
  const bw = 7;
  const bh = 5;
  const t = 0.06;
  const z = -7.85;
  return (
    <group>
      <mesh position={[0, 4 + bh / 2 + t / 2, z]}>
        <boxGeometry args={[bw + t * 2, t, 0.1]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[0, 4 - bh / 2 - t / 2, z]}>
        <boxGeometry args={[bw + t * 2, t, 0.1]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[-bw / 2 - t / 2, 4, z]}>
        <boxGeometry args={[t, bh, 0.1]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.15} />
      </mesh>
      <mesh position={[bw / 2 + t / 2, 4, z]}>
        <boxGeometry args={[t, bh, 0.1]} />
        <meshStandardMaterial color={COLORS.gold} metalness={0.8} roughness={0.15} />
      </mesh>
    </group>
  );
}

function OfficeScene({ scrollRef }: { scrollRef: ScrollRef }) {
  const pinSpot = useRef<THREE.SpotLight>(null);
  const gallerySpot = useRef<THREE.SpotLight>(null);

  useLayoutEffect(() => {
    [pinSpot, gallerySpot].forEach((ref, i) => {
      const light = ref.current;
      if (!light?.parent) return;
      light.target.position.set(0, 4, i === 0 ? -7.9 : -8);
      light.parent.add(light.target);
    });
  }, []);

  return (
    <>
      <SceneBackground />
      <TimerClock />
      <CameraRig scrollRef={scrollRef} />

      <ambientLight intensity={2.5} />
      <pointLight color="#FFE4B5" intensity={8} position={[0, 8, 0]} />
      <pointLight color="#6E7A3E" intensity={3} position={[0, 6, -6]} />
      <spotLight ref={gallerySpot} color="#FFF0D0" intensity={15} position={[0, 9, 2]} angle={0.45} penumbra={0.4} />
      <spotLight ref={pinSpot} color="#FFF0D0" intensity={10} position={[0, 8.5, -3]} angle={0.35} penumbra={0.3} />

      {/* Room shell — explicit box walls (basic material: no lighting dependency) */}
      <mesh position={[0, 5, -8]} name="back-wall">
        <boxGeometry args={[20, 10, 0.2]} />
        <meshBasicMaterial color={COLORS.wall} />
      </mesh>
      <mesh position={[-10, 5, 0]} name="left-wall">
        <boxGeometry args={[0.2, 10, 16]} />
        <meshBasicMaterial color={COLORS.wall} />
      </mesh>
      <mesh position={[10, 5, 0]} name="right-wall">
        <boxGeometry args={[0.2, 10, 16]} />
        <meshBasicMaterial color={COLORS.wall} />
      </mesh>
      <mesh position={[0, 10, 0]} name="ceiling">
        <boxGeometry args={[20, 0.2, 16]} />
        <meshBasicMaterial color={COLORS.ceiling} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color={COLORS.floor} roughness={0.15} metalness={0.4} />
      </mesh>
      <gridHelper args={[W, 20, "#2A2A1A", "#1A1A0F"]} position={[0, 0.002, 0]} />

      {/* Brass accent strips */}
      <BrassStrip size={[W, 0.04, 0.04]} position={[0, 0.02, -HD + 0.02]} />
      <BrassStrip size={[W, 0.04, 0.04]} position={[0, H - 0.02, -HD + 0.02]} />
      <BrassStrip size={[0.04, 0.04, D]} position={[-HW + 0.02, 0.02, 0]} />
      <BrassStrip size={[0.04, 0.04, D]} position={[-HW + 0.02, H - 0.02, 0]} />
      <BrassStrip size={[0.04, 0.04, D]} position={[HW - 0.02, 0.02, 0]} />
      <BrassStrip size={[0.04, 0.04, D]} position={[HW - 0.02, H - 0.02, 0]} />

      {/* Pinboard */}
      <PinboardFrame />
      <mesh position={[0, 4, -7.9]}>
        <boxGeometry args={[7, 5, 0.08]} />
        <meshStandardMaterial color={COLORS.cork} roughness={0.9} />
      </mesh>
      <Text position={[0, 6.9, -7.82]} fontSize={0.4} color={COLORS.olive} anchorX="center" anchorY="middle">
        gb
      </Text>
      {CARD_OFFSETS.map(([x, y], i) => (
        <group key={i} position={[x, 4 + y * 1.05, -7.86]}>
          <mesh position={[0, 0.38, 0.02]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color={COLORS.gold} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[0.9, 0.65, 0.02]} />
            <meshStandardMaterial color={COLORS.card} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* About panel — left wall */}
      <group position={[-9.5, 4, -4]} rotation={[0, Math.PI / 2, 0]}>
        <PanelFrame w={4} h={3} z={0.04} />
        <mesh>
          <boxGeometry args={[4, 3, 0.06]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.8} />
        </mesh>
        <Html transform occlude="blending" center distanceFactor={4}>
          <div
            style={{
              width: 280,
              padding: 24,
              color: "#E8E4DA",
              fontFamily: "var(--font-display)",
              pointerEvents: "auto",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: COLORS.olive,
                marginBottom: 12,
                fontFamily: "var(--font-mono)",
              }}
            >
              ABOUT — GRINBUCK TECHNOLOGIES
            </p>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, lineHeight: 1.2 }}>Building the GrinVerse</h2>
            <p style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.7 }}>
              A Canadian holding company based in Victoria, BC. We build ventures across 3D printing, SaaS, local
              commerce, and beyond. Each venture is a pin on our board.
            </p>
            <p
              style={{
                fontSize: 11,
                marginTop: 20,
                color: COLORS.olive,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              EST. 2024 — VICTORIA, BC
            </p>
          </div>
        </Html>
      </group>
      <pointLight color="#4A7A3A" intensity={4} position={[-7, 4, -4]} />

      {/* Contact panel — right wall */}
      <group position={[9.5, 4, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <PanelFrame w={4} h={3} z={0.04} />
        <mesh>
          <boxGeometry args={[4, 3, 0.06]} />
          <meshStandardMaterial color={COLORS.panel} roughness={0.8} />
        </mesh>
        <Html transform occlude="blending" center distanceFactor={4}>
          <div
            style={{
              width: 280,
              padding: 24,
              color: "#E8E4DA",
              fontFamily: "var(--font-display)",
              pointerEvents: "auto",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: COLORS.olive,
                marginBottom: 12,
                fontFamily: "var(--font-mono)",
              }}
            >
              CONTACT — GET IN TOUCH
            </p>
            <input
              aria-label="Your name"
              placeholder="Name"
              style={{
                display: "block",
                width: "100%",
                marginBottom: 10,
                padding: "8px 12px",
                background: "#1A1A1A",
                border: "1px solid #3A3A2A",
                color: "#E8E4DA",
                borderRadius: 3,
                fontSize: 13,
                outline: "none",
              }}
            />
            <input
              type="email"
              aria-label="Your email address"
              placeholder="Email"
              style={{
                display: "block",
                width: "100%",
                marginBottom: 10,
                padding: "8px 12px",
                background: "#1A1A1A",
                border: "1px solid #3A3A2A",
                color: "#E8E4DA",
                borderRadius: 3,
                fontSize: 13,
                outline: "none",
              }}
            />
            <textarea
              aria-label="Your message"
              placeholder="Message"
              rows={3}
              style={{
                display: "block",
                width: "100%",
                marginBottom: 10,
                padding: "8px 12px",
                background: "#1A1A1A",
                border: "1px solid #3A3A2A",
                color: "#E8E4DA",
                borderRadius: 3,
                fontSize: 13,
                resize: "none",
                outline: "none",
              }}
            />
            <button
              type="button"
              style={{
                width: "100%",
                padding: 10,
                background: COLORS.olive,
                color: "#FAFAF7",
                border: "none",
                borderRadius: 3,
                fontSize: 13,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              SEND MESSAGE
            </button>
          </div>
        </Html>
      </group>
      <pointLight color="#4A7A3A" intensity={4} position={[7, 4, -4]} />
    </>
  );
}

type Props = {
  isActive: boolean;
  scrollRef: ScrollRef;
  wheelInterceptorRef?: React.MutableRefObject<((e: WheelEvent) => boolean) | null>;
};

export default function Room({ isActive, scrollRef, wheelInterceptorRef }: Props) {
  useEffect(() => {
    if (!isActive || !wheelInterceptorRef || !scrollRef.current) {
      if (wheelInterceptorRef) wheelInterceptorRef.current = null;
      return;
    }
    const el = scrollRef.current;
    wheelInterceptorRef.current = (e: WheelEvent) => {
      const max = el.scrollHeight - el.clientHeight;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop >= max - 1;
      if (e.deltaY < 0 && atTop) return false;
      if (e.deltaY > 0 && atBottom) {
        e.preventDefault();
        return true;
      }
      e.preventDefault();
      el.scrollTop += e.deltaY;
      return true;
    };
    return () => {
      wheelInterceptorRef.current = null;
    };
  }, [isActive, scrollRef, wheelInterceptorRef]);

  useEffect(() => {
    if (isActive || !scrollRef.current) return;
    gsap.set(scrollRef.current, { scrollTop: 0 });
  }, [isActive, scrollRef]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: SCENE_BG }}>
      <Canvas
        camera={{ fov: 48, near: 0.1, far: 100, position: [0, 2.2, 6] }}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(SCENE_BG, 1)}
      >
        <OfficeScene scrollRef={scrollRef} />
      </Canvas>
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
          zIndex: 10,
          pointerEvents: "all",
        }}
      >
        <div style={{ height: "400vh" }} />
      </div>
    </div>
  );
}
