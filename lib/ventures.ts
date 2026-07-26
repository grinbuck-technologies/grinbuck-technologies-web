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
      "Additive manufacturing and 3D-print production for clients who need parts fast, precise, and built to spec. We take every job from prototype to production run.",
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
      "QP Quintet trades both ways between India and Canada, importing and exporting goods across the Pacific.",
    url: "https://qpquintet.ca",
    status: "In Development",
    logo: "/qp-canada-expanded.svg",
  },
];
