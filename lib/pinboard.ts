export type PinSlot = { x: number; y: number };

export const CARD_SHADOW = "3px 6px 20px rgba(0,0,0,0.25)";
export const CORK_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)' opacity='0.15'/%3E%3C/svg%3E\")";
export const CARDS_PER_PAGE = 6;
export const PIN_COUNT = 6;

const COLS = 3;
const ROWS = 2;
const GRID = { top: 14, bottom: 6, left: 5, right: 5 };

export function getPinSlots(): PinSlot[] {
  const width = 100 - GRID.left - GRID.right;
  const height = 100 - GRID.top - GRID.bottom;
  const cellW = width / COLS;
  const cellH = height / ROWS;
  return Array.from({ length: PIN_COUNT }, (_, i) => ({
    x: GRID.left + (i % COLS + 0.5) * cellW,
    y: GRID.top + (Math.floor(i / COLS) + 0.5) * cellH,
  }));
}

export function paginate<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

export function generateRotations(count: number): number[] {
  return Array.from({ length: count }, () => (Math.random() - 0.5) * 8);
}

function slotCenterPx(slot: PinSlot, board: DOMRect) {
  return {
    x: board.left + (slot.x / 100) * board.width,
    y: board.top + (slot.y / 100) * board.height,
  };
}

export function nearestSlotIndex(px: number, py: number, slots: PinSlot[], board: DOMRect): number {
  let best = 0;
  let bestD = Infinity;
  slots.forEach((slot, i) => {
    const c = slotCenterPx(slot, board);
    const d = Math.hypot(px - c.x, py - c.y);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}
