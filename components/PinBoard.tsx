"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import type { Venture } from "@/lib/ventures";
import {
  cardSlotsFromAssignments,
  CORK_TEXTURE,
  createAssignments,
  generateRotations,
  getPinSlots,
} from "@/lib/pinboard";
import { createPinController } from "@/lib/pinboardController";
import { createDragManager } from "@/lib/pinboardDrag";
import PinCard from "@/components/PinCard";
import PinHole from "@/components/PinHole";

const PIN_SLOTS = getPinSlots();
type Props = { ventures: Venture[]; active: boolean; page: number; totalPages: number };

export default function PinBoard({ ventures, active, page, totalPages }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const assignments = useRef(createAssignments(ventures.length));
  const cardSlot = useRef(cardSlotsFromAssignments(assignments.current, ventures.length));
  const fallen = useRef(new Set<number>());
  const dragMgr = useRef(createDragManager());
  const [rotations, setRotations] = useState<number[] | null>(null);

  useEffect(() => {
    assignments.current = createAssignments(ventures.length);
    cardSlot.current = cardSlotsFromAssignments(assignments.current, ventures.length);
    fallen.current.clear();
    dragMgr.current = createDragManager();
    setRotations(generateRotations(ventures.length));
  }, [ventures.length]);

  const ctrl = () => {
    const board = boardRef.current;
    if (!board || !rotations) return null;
    return createPinController({
      board,
      cardEls: cardEls.current,
      pinSlots: PIN_SLOTS,
      rotations,
      assignments: assignments.current,
      cardSlot: cardSlot.current,
      fallen: fallen.current,
      cardCount: ventures.length,
    });
  };

  const ensureDrag = (index: number) => {
    const el = cardEls.current[index];
    const board = boardRef.current;
    if (!el || !board) return;
    dragMgr.current.ensure(index, el, board, (i) => ctrl()?.onDragEnd(i));
  };

  useGSAP(
    () => {
      if (!rotations) return;
      cardEls.current.forEach((el, i) => {
        const slot = cardSlot.current[i];
        if (!el || slot === null) return;
        const { x, y } = PIN_SLOTS[slot];
        gsap.set(el, { left: `${x}%`, top: `${y}%`, x: 0, y: 0, rotation: rotations[i] });
        dragMgr.current.sync(el);
      });
    },
    { dependencies: [rotations], scope: boardRef }
  );

  useGSAP(() => {
    if (!active || !rotations) return;
    ctrl()?.reset();
    dragMgr.current.syncAll(ventures.length, cardEls.current);
  }, { dependencies: [active, rotations], scope: boardRef });

  const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", color: "var(--color-olive)" };
  const board: React.CSSProperties = {
    position: "relative", boxSizing: "border-box", width: "88vw", height: "88vh", flexShrink: 0,
    background: "#C4A882", backgroundImage: CORK_TEXTURE, backgroundBlendMode: "multiply",
    border: "8px solid #8B6914", borderRadius: 8,
    boxShadow: "inset 0 0 80px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.2)", overflow: "hidden",
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#2C2416", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div ref={boardRef} suppressHydrationWarning style={board}>
        <div style={{ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, lineHeight: 1, pointerEvents: "none", zIndex: 0 }}>
          <span style={{ color: "var(--color-ink)" }}>g</span>
          <span style={{ color: "var(--color-olive)" }}>b</span>
        </div>
        {PIN_SLOTS.map((slot, i) => <PinHole key={i} slot={slot} />)}
        {rotations?.map((rot, i) => (
          <PinCard
            key={ventures[i].name}
            venture={ventures[i]}
            rot={rot}
            index={i}
            registerRef={(idx, el) => { cardEls.current[idx] = el; if (el) ensureDrag(idx); }}
            onUnpin={() => ctrl()?.drop(i)}
          />
        ))}
        {totalPages > 1 && (
          <div style={{ ...mono, position: "absolute", bottom: "1rem", right: "1.25rem", fontSize: "0.7rem", letterSpacing: "0.12em", display: "flex", gap: 12, opacity: 0.8, pointerEvents: "none" }}>
            {page > 0 && <span>↑ PREV</span>}
            <span>{String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
            {page < totalPages - 1 && <span>NEXT ↓</span>}
          </div>
        )}
      </div>
    </div>
  );
}
