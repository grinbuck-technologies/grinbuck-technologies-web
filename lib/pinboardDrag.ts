import gsap, { Draggable } from "@/lib/gsap";

export function syncDrag(el: HTMLElement) {
  Draggable.get(el)?.update();
}

export function createDragManager() {
  const instances: (Draggable | null)[] = [];

  const stackZ = (el: HTMLElement) => {
    const fallen = el.dataset.fallen === "1";
    return fallen ? 2 + Number(el.dataset.stack ?? 0) : 1;
  };

  return {
    ensure(index: number, el: HTMLElement, board: HTMLElement, onDragEnd: (i: number) => void) {
      if (instances[index]?.target === el) {
        syncDrag(el);
        return instances[index]!;
      }
      const inst = Draggable.create(el, {
        type: "x,y",
        bounds: board,
        dragClickables: true,
        onDragStart: () => {
          syncDrag(el);
          el.dataset.dragging = "1";
          gsap.set(el, { zIndex: 20 });
        },
        onDragEnd: () => {
          el.dataset.dragging = "";
          onDragEnd(index);
          syncDrag(el);
          gsap.set(el, { zIndex: stackZ(el) });
        },
      })[0];
      instances[index] = inst;
      return inst;
    },
    sync(el: HTMLElement | null) {
      if (el) syncDrag(el);
    },
    syncIndex(index: number, els: (HTMLElement | null)[]) {
      const el = els[index];
      if (el) syncDrag(el);
    },
    syncAll(count: number, els: (HTMLElement | null)[]) {
      for (let i = 0; i < count; i++) {
        const el = els[i];
        if (el) syncDrag(el);
      }
    },
  };
}
