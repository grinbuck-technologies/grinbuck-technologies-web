"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ventures, type Venture } from "@/lib/ventures";

const GEAR_SIZE = 80;
const PUSH_RADIUS = 200;
const MIN_SPEED = 1.2;
const MAX_SPEED = 2.8;

type GearState = { x: number; y: number; vx: number; vy: number };
type TooltipState = { venture: Venture; x: number; y: number };

function initGear(vw: number, vh: number): GearState {
  const cx = vw / 2, cy = vh / 2;
  let x: number, y: number;
  do {
    x = Math.random() * (vw - GEAR_SIZE);
    y = Math.random() * (vh - GEAR_SIZE);
  } while (Math.hypot(x + GEAR_SIZE / 2 - cx, y + GEAR_SIZE / 2 - cy) < PUSH_RADIUS + GEAR_SIZE);
  const angle = Math.random() * Math.PI * 2;
  const speed = (MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)) * 0.8;
  return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}

export default function OrbitingGears() {
  // Lazy initializer runs once on the client (this component is loaded with ssr:false).
  // Stored in state so initial positions are readable during render without a ref access.
  const [gearInits] = useState<GearState[]>(() =>
    ventures.map(() => initGear(window.innerWidth, window.innerHeight)),
  );
  // Mutable animation state — never read during render, only written by the RAF loop.
  const gearStates = useRef<GearState[]>(gearInits.map((g) => ({ ...g })));
  const gearEls = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const tick = () => {
      const cw = window.innerWidth, ch = window.innerHeight;
      const cx = cw / 2, cy = ch / 2;

      gearStates.current.forEach((g, i) => {
        if (hoveredRef.current === i) return;

        g.x += g.vx;
        g.y += g.vy;

        if (g.x < 0)              { g.x = 0;              g.vx =  Math.abs(g.vx); }
        if (g.x > cw - GEAR_SIZE) { g.x = cw - GEAR_SIZE; g.vx = -Math.abs(g.vx); }
        if (g.y < 0)              { g.y = 0;              g.vy =  Math.abs(g.vy); }
        if (g.y > ch - GEAR_SIZE) { g.y = ch - GEAR_SIZE; g.vy = -Math.abs(g.vy); }

        const gcx = g.x + GEAR_SIZE / 2, gcy = g.y + GEAR_SIZE / 2;
        const dist = Math.sqrt((gcx - cx) ** 2 + (gcy - cy) ** 2);
        if (dist < PUSH_RADIUS && dist > 0) {
          const nx = (gcx - cx) / dist;
          const ny = (gcy - cy) / dist;
          g.x = cx + nx * PUSH_RADIUS - GEAR_SIZE / 2;
          g.y = cy + ny * PUSH_RADIUS - GEAR_SIZE / 2;
          const dot = g.vx * nx + g.vy * ny;
          if (dot < 0) {
            g.vx -= 2 * dot * nx;
            g.vy -= 2 * dot * ny;
          }
        }

        const el = gearEls.current[i];
        if (el) el.style.transform = `translate(${g.x}px, ${g.y}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleEnter = (i: number) => {
    hoveredRef.current = i;
    const el = gearEls.current[i];
    if (el) {
      const r = el.getBoundingClientRect();
      setTooltip({ venture: ventures[i], x: r.left + r.width / 2, y: r.top });
    }
  };

  const handleLeave = () => {
    hoveredRef.current = null;
    setTooltip(null);
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "clamp(180px,22vw,340px)",
            zIndex: 0,
          }}
        >
          <Image
            src="/grinbuck-logo.png"
            alt="Grinbuck Technologies"
            width={808}
            height={814}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {ventures.map((venture, i) => (
          <div
            key={venture.name}
            ref={(el) => { gearEls.current[i] = el; }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: GEAR_SIZE,
              height: GEAR_SIZE,
              transform: `translate(${gearInits[i]?.x ?? 0}px, ${gearInits[i]?.y ?? 0}px)`,
              cursor: "pointer",
              pointerEvents: "auto",
              zIndex: 10,
            }}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
          >
            <Image src="/gears.svg" alt="" width={GEAR_SIZE} height={GEAR_SIZE} />
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 6,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#888",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {venture.name}
            </div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, calc(-100% - 12px))",
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            borderRadius: 8,
            padding: "16px 20px",
            zIndex: 200,
            minWidth: 190,
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#f0f0f0",
              border: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#888",
              fontFamily: "sans-serif",
            }}
          >
            {tooltip.venture.name.charAt(0)}
          </div>
          <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111", marginBottom: 4 }}>
            {tooltip.venture.name}
          </p>
          <p style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.5, marginBottom: 10 }}>
            {tooltip.venture.description}
          </p>
          <span style={{ fontSize: "0.75rem", color: "#4A5E2A", fontFamily: "monospace" }}>
            Visit →
          </span>
        </div>
      )}
    </>
  );
}
