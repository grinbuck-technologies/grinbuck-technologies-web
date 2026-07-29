// ClickIT has exactly one product, offered in two sound variants (silent,
// audible). Colorways/editions are deliberately omitted for now, not ready
// to commit to them publicly. Add a `variants` field back here when that's
// decided; nothing downstream renders it yet.
export type Product = {
  name: string;
  description: string;
};

export const clicker: Product = {
  name: "The Clicker",
  description:
    "A pocket-sized clicker with one tactile button, silent or audible. One product, two jobs: a focus tool you run by touch instead of sight, and a precision marker signal for dog training.",
};

export type ClickerVariant = { value: string; label: string };

/** The clicker's two sound variants, shared by every form that asks a buyer to choose one. */
export const CLICKER_VARIANTS: ClickerVariant[] = [
  { value: "Silent", label: "Silent" },
  { value: "Audible", label: "Audible" },
];
