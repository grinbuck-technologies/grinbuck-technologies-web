// Variant names (colorways, editions) are deliberately omitted for now —
// not ready to commit to them publicly. Add a `variants` field back here
// when that's decided; nothing downstream renders it yet.
export type Product = {
  name: string;
  description: string;
};

export const products: Product[] = [
  {
    name: "Clicker",
    description:
      "Clicker channels restless energy into one quiet motion, so your hands stay busy while your mind stays on task.",
  },
  {
    name: "Infinity Cube",
    description:
      "Infinity Cube keeps restless hands moving without a sound. Fold and flip it endlessly while your focus stays exactly where it belongs.",
  },
];
