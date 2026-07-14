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
    name: "tabMonk",
    description:
      "tabMonk helps you track expenses, send invoices, and stay on top of deadlines. Built for personal budgets, rental properties, and small businesses alike.",
    url: "https://www.tabmonk.com",
    status: "Live",
    logo: "/tabmonk-wordmark.png",
  },
  {
    name: "QP Quintet",
    description:
      "Import-export operations connecting East India to British Columbia.",
    url: "https://qpquintet.ca",
    status: "In Development",
    logo: "/qp-canada-expanded.svg",
  },
  {
    name: "ClickIT",
    description:
      "3D-printed tactical clickers built to help with focus and ADHD management.",
    url: "/clickit",
    status: "In Development",
  },
];
