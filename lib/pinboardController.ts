import gsap from "@/lib/gsap";
import { syncDrag } from "@/lib/pinboardDrag";
import {
  cardSlotsFromAssignments,
  createAssignments,
  nearestSlotIndex,
  PIN_COUNT,
  type PinSlot,
} from "@/lib/pinboard";

type ControllerOpts = {
  board: HTMLElement;
  cardEls: (HTMLElement | null)[];
  pinSlots: PinSlot[];
  rotations: number[];
  assignments: (number | null)[];
  cardSlot: (number | null)[];
  fallen: Set<number>;
  cardCount: number;
};

const place = (el: HTMLElement, props: gsap.TweenVars) => {
  gsap.set(el, props);
  syncDrag(el);
};

export function createPinController(opts: ControllerOpts) {
  const { board, cardEls, pinSlots, rotations, assignments, cardSlot, fallen, cardCount } = opts;

  const snapTo = (cardIdx: number, slotIdx: number) => {
    const el = cardEls[cardIdx];
    if (!el) return;
    const slot = pinSlots[slotIdx];
    el.dataset.fallen = "";
    el.dataset.stack = "";
    fallen.delete(cardIdx);
    place(el, {
      left: `${slot.x}%`,
      top: `${slot.y}%`,
      x: 0,
      y: 0,
      rotation: rotations[cardIdx],
      zIndex: 1,
    });
  };

  const fall = (cardIdx: number) => {
    if (fallen.has(cardIdx)) return;
    fallen.add(cardIdx);
    const el = cardEls[cardIdx];
    if (!el) return;

    const boardRect = board.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const stackIdx = fallen.size - 1;
    const currentX = Number(gsap.getProperty(el, "x")) || 0;
    const currentY = Number(gsap.getProperty(el, "y")) || 0;
    const targetY = currentY + (boardRect.bottom - 18 - stackIdx * 16 - elRect.bottom);
    const targetX = (stackIdx - (fallen.size - 1) / 2) * 28 + (Math.random() - 0.5) * 10;
    const rot = (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * 6);

    el.dataset.fallen = "1";
    el.dataset.stack = String(stackIdx);
    place(el, { x: targetX, y: targetY, rotation: rot, zIndex: 2 + stackIdx });
  };

  const drop = (cardIdx: number) => {
    const fromSlot = cardSlot[cardIdx];
    if (fromSlot === null) return;
    assignments[fromSlot] = null;
    cardSlot[cardIdx] = null;
    fall(cardIdx);
  };

  const onDragEnd = (cardIdx: number) => {
    const el = cardEls[cardIdx];
    if (!el) return;

    const boardRect = board.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const pinX = rect.left + rect.width / 2;
    const pinY = rect.top;
    const toSlot = nearestSlotIndex(pinX, pinY, pinSlots, boardRect);
    const fromSlot = cardSlot[cardIdx];
    const occupant = assignments[toSlot];
    const inFallZone = pinY > boardRect.top + boardRect.height * 0.72;

    if (fallen.has(cardIdx) && inFallZone) {
      syncDrag(el);
      return;
    }

    if (fromSlot === toSlot) {
      snapTo(cardIdx, toSlot);
      return;
    }
    if (occupant === null) {
      if (fromSlot !== null) assignments[fromSlot] = null;
      assignments[toSlot] = cardIdx;
      cardSlot[cardIdx] = toSlot;
      snapTo(cardIdx, toSlot);
      return;
    }
    if (occupant === cardIdx) {
      syncDrag(el);
      return;
    }

    assignments[toSlot] = cardIdx;
    cardSlot[cardIdx] = toSlot;
    snapTo(cardIdx, toSlot);

    if (fromSlot !== null) {
      assignments[fromSlot] = occupant;
      cardSlot[occupant] = fromSlot;
      snapTo(occupant, fromSlot);
    } else {
      cardSlot[occupant] = null;
      fall(occupant);
    }
  };

  const reset = () => {
    fallen.clear();
    const next = createAssignments(cardCount);
    for (let i = 0; i < PIN_COUNT; i++) assignments[i] = next[i];
    const slots = cardSlotsFromAssignments(assignments, cardCount);
    for (let i = 0; i < cardCount; i++) cardSlot[i] = slots[i];
    cardEls.forEach((el, i) => {
      if (!el) return;
      el.dataset.fallen = "";
      const slot = cardSlot[i];
      if (slot !== null) snapTo(i, slot);
    });
  };

  return { snapTo, drop, onDragEnd, reset };
}
