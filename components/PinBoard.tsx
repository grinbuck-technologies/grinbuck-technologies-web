"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import gsap, { EASE_ENTER } from "@/lib/gsap";
import type { Venture } from "@/lib/ventures";
import { BOARD_SHADOW, CORK_TEXTURE, generateRotations, getPinSlots } from "@/lib/pinboard";
import { bindCardPointer, dropCard, placeCard, snapCard, slotPx } from "@/lib/pinboardMotion";
import PinCard from "@/components/PinCard";
import PinHole from "@/components/PinHole";

const PIN_SLOTS = getPinSlots();
type Props = { ventures: Venture[]; active: boolean; page: number; totalPages: number };

export default function PinBoard({ ventures, active, page, totalPages }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const fallen = useRef(new Set<number>());
  const [rotations, setRotations] = useState<number[] | null>(null);

  useEffect(() => {
    fallen.current.clear();
    startTransition(() => {
      setRotations(generateRotations(ventures.length));
    });
  }, [ventures.length]);

  const snapTo = (i: number, slotIdx: number) => {
    const el = cardEls.current[i];
    const board = boardRef.current;
    if (!el || !board || !rotations) return;
    fallen.current.delete(i);
    el.dataset.fallen = "";
    snapCard(el, board.getBoundingClientRect(), PIN_SLOTS[slotIdx], rotations[i]);
  };

  const drop = (i: number) => {
    const el = cardEls.current[i];
    const board = boardRef.current;
    if (!el || !board || fallen.current.has(i)) return;
    fallen.current.add(i);
    el.dataset.fallen = "1";
    el.style.zIndex = "20";
    dropCard(el, board, fallen.current.size - 1);
  };

  const bindPointer = (i: number, el: HTMLDivElement) => {
    bindCardPointer(el, {
      getBoard: () => boardRef.current,
      slots: PIN_SLOTS,
      onRepin: (slot) => snapTo(i, slot),
      onFallen: () => { fallen.current.add(i); el.dataset.fallen = "1"; },
    });
  };

  useGSAP(
    () => {
      const board = boardRef.current;
      if (!board || !rotations) return;
      const rect = board.getBoundingClientRect();
      cardEls.current.forEach((el, i) => {
        if (!el) return;
        placeCard(el, rect, PIN_SLOTS[i], rotations[i]);
      });
    },
    { dependencies: [rotations], scope: boardRef }
  );

  useGSAP(() => {
    const board = boardRef.current;
    if (!active || !board || !rotations) return;
    fallen.current.clear();
    const rect = board.getBoundingClientRect();
    cardEls.current.forEach((el, i) => {
      if (!el) return;
      el.dataset.fallen = "";
      el.style.zIndex = "1";
      const pos = slotPx(rect, PIN_SLOTS[i]);
      gsap.to(el, { left: pos.left, top: pos.top, rotation: rotations[i], duration: 0.8, ease: EASE_ENTER });
    });
  }, { dependencies: [active, rotations], scope: boardRef });

  const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", color: "var(--color-olive)" };
  const boardStyle: React.CSSProperties = {
    position: "relative", boxSizing: "border-box", width: "88vw", height: "88vh", flexShrink: 0,
    background: "var(--color-cork)", backgroundImage: CORK_TEXTURE, backgroundBlendMode: "multiply",
    border: "8px solid var(--color-cork-border)", borderRadius: 8,
    boxShadow: BOARD_SHADOW, overflow: "hidden",
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "var(--color-wall)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div ref={boardRef} suppressHydrationWarning style={boardStyle}>
        <div style={{ position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 0 }}>
          <Image src="/gb.png" alt="Grinbuck" width={500} height={500} style={{ width: "48px", height: "auto", mixBlendMode: "multiply" }} />
        </div>
        {PIN_SLOTS.map((slot, i) => <PinHole key={i} slot={slot} />)}
        {rotations?.map((rot, i) => (
          <PinCard
            key={ventures[i].name}
            venture={ventures[i]}
            rot={rot}
            index={i}
            registerRef={(idx, el) => { cardEls.current[idx] = el; if (el) bindPointer(idx, el); }}
            onUnpin={() => drop(i)}
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
