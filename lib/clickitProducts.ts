// ClickIT has exactly one product. Variant names (colorways, editions) are
// deliberately omitted for now — not ready to commit to them publicly. Add a
// `variants` field back here when that's decided; nothing downstream renders
// it yet.
export type Product = {
  name: string;
  description: string;
};

export const clicker: Product = {
  name: "The Clicker",
  description:
    "A pocket-sized clicker with one quiet, tactile button. One product, two jobs: a focus tool you run by touch instead of sight, and a precision marker signal for dog training.",
};
