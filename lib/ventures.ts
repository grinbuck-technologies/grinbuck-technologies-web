export type Venture = {
  name: string;
  description: string;
  url: string;
  status: string;
};

export const ventures: Venture[] = [
  { name: "Grinbuck3D", description: "Precision 3D-printed goods at scale.", url: "/3d", status: "Live" },
  { name: "ClickIT", description: "3D printed fidget toys for schools.", url: "/clickit", status: "In Development" },
  { name: "SmallBiz Hub", description: "Canadian SMB compliance SaaS.", url: "https://smallbizhub.ca", status: "Beta" },
  { name: "IslandPass", description: "Local commerce network for Victoria.", url: "https://islandpass.ca", status: "Active" },
];
