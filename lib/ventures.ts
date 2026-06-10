export type Venture = {
  name: string;
  description: string;
  url: string;
  icon: string;
};

export const ventures: Venture[] = [
  { name: "Grinbuck3D", description: "Precision 3D-printed goods at scale.", url: "/3d", icon: "Box" },
  { name: "ClickIT", description: "3D printed fidget toys for schools.", url: "/clickit", icon: "MousePointerClick" },
  { name: "SmallBiz Hub", description: "Canadian SMB compliance SaaS.", url: "https://smallbizhub.ca", icon: "BarChart2" },
  { name: "IslandPass", description: "Local commerce network for Victoria.", url: "https://islandpass.ca", icon: "MapPin" },
];
