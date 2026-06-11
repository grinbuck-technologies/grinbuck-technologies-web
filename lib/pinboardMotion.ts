import gsap from "@/lib/gsap";
import { nearestSlotIndex, type PinSlot } from "@/lib/pinboard";

export const UPPER_ZONE = 0.8;

export function slotPx(board: DOMRect, slot: PinSlot) {
  return { left: (slot.x / 100) * board.width, top: (slot.y / 100) * board.height };
}

export function placeCard(el: HTMLElement, board: DOMRect, slot: PinSlot, rotation: number) {
  const pos = slotPx(board, slot);
  gsap.killTweensOf(el);
  gsap.set(el, { x: 0, y: 0, rotation });
  el.style.left = `${pos.left}px`;
  el.style.top = `${pos.top}px`;
}

export function snapCard(el: HTMLElement, board: DOMRect, slot: PinSlot, rotation: number) {
  const pos = slotPx(board, slot);
  gsap.killTweensOf(el);
  gsap.to(el, { left: pos.left, top: pos.top, rotation, duration: 0.4, ease: "back.out(1.2)" });
}

export function dropCard(el: HTMLElement, board: HTMLElement, stack: number) {
  gsap.killTweensOf(el);
  const boardRect = board.getBoundingClientRect();
  const left = parseFloat(el.style.left) || 0;
  const targetTop = boardRect.height - 18 - stack * 16 - el.offsetHeight;
  const rot = (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * 6);
  gsap.to(el, {
    left: left + (Math.random() - 0.5) * 26,
    top: targetTop,
    rotation: rot,
    duration: 0.6,
    ease: "power2.in",
  });
}

export function clampToBoard(
  left: number,
  top: number,
  cardW: number,
  cardH: number,
  boardW: number,
  boardH: number
) {
  return {
    left: Math.max(0, Math.min(left, boardW - cardW)),
    top: Math.max(0, Math.min(top, boardH - cardH)),
  };
}

type PointerOpts = {
  getBoard: () => HTMLElement | null;
  slots: PinSlot[];
  onRepin: (slotIdx: number) => void;
  onFallen: () => void;
};

export function bindCardPointer(el: HTMLElement, opts: PointerOpts): () => void {
  if (el.dataset.pointerBound === "1") return () => {};
  el.dataset.pointerBound = "1";

  let offsetX = 0;
  let offsetY = 0;

  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const board = opts.getBoard();
    if (!board) return;

    gsap.killTweensOf(el);
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "1";
    el.style.zIndex = "50";

    const cardRect = el.getBoundingClientRect();
    offsetX = e.clientX - cardRect.left;
    offsetY = e.clientY - cardRect.top;
    e.preventDefault();
  };

  const onMove = (e: PointerEvent) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    const board = opts.getBoard();
    if (!board) return;

    const boardRect = board.getBoundingClientRect();
    const left = e.clientX - boardRect.left - offsetX;
    const top = e.clientY - boardRect.top - offsetY;
    const clamped = clampToBoard(left, top, el.offsetWidth, el.offsetHeight, boardRect.width, boardRect.height);
    el.style.left = `${clamped.left}px`;
    el.style.top = `${clamped.top}px`;
  };

  const onUp = (e: PointerEvent) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    el.releasePointerCapture(e.pointerId);
    el.dataset.dragging = "";

    const board = opts.getBoard();
    if (!board) return;

    const boardRect = board.getBoundingClientRect();
    const left = parseFloat(el.style.left) || 0;
    const top = parseFloat(el.style.top) || 0;
    const midY = top + el.offsetHeight / 2;
    const inUpper = midY < boardRect.height * UPPER_ZONE;

    if (inUpper) {
      const pinX = boardRect.left + left + el.offsetWidth / 2;
      const pinY = boardRect.top + top;
      const slotIdx = nearestSlotIndex(pinX, pinY, opts.slots, boardRect);
      opts.onRepin(slotIdx);
      el.style.zIndex = "1";
    } else {
      opts.onFallen();
      el.style.zIndex = "20";
    }
  };

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);

  return () => {
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerup", onUp);
    el.removeEventListener("pointercancel", onUp);
    delete el.dataset.pointerBound;
  };
}
