// Array-based structure is a permanent architectural requirement — do not
// collapse back to a single object regardless of how many ventures exist.
export type Venture = {
  name: string;
  description: string;
  url: string;
  status: "Live" | "In Development" | "Coming Soon";
  logo?: string;
};

export const ventures: Venture[] = [
  {
    name: "Grinbuck3D",
    description:
      "3D-print production for clients who need parts made to spec and delivered on time. We take every job from prototype to production run.",
    url: "/grinbuck3d",
    status: "Live",
  },
  {
    name: "tabMonk",
    description:
      "tabMonk tracks income and expenses, sends invoices, and keeps you ready for tax season. Built for personal budgets and small businesses alike.",
    url: "https://www.tabmonk.com",
    status: "Live",
    logo: "/tabmonk-wordmark.png",
  },
  {
    name: "QP Quintet",
    description:
      "QP Quintet imports and exports goods between India and Canada.",
    url: "https://qpquintet.ca",
    status: "In Development",
    logo: "/qp-canada-expanded.svg",
  },
];
