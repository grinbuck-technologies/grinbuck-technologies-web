// Array-based structure is a permanent architectural requirement, same rule
// as `ventures.ts` — do not collapse back to a single object. Adding a new
// Grinbuck3D product line means adding one array entry here, nothing else.
export type SubBrand = {
  name: string;
  description: string;
  url: string;
};

export const subBrands: SubBrand[] = [
  {
    name: "ClickIT",
    description:
      "Tactile clickers, designed and manufactured in-house. Built for focus and for training.",
    url: "/grinbuck3d/clickit",
  },
];
