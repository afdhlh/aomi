import originalAsset from "@/assets/original.png.asset.json";
import strawberryAsset from "@/assets/starwberry.png.asset.json";
import blueberryAsset from "@/assets/blueberry.png.asset.json";
import raspberryAsset from "@/assets/raspberry.png.asset.json";
import brownSugarAsset from "@/assets/brown_sugar.png.asset.json";

export type Flavor = {
  id: string;
  name: string;
  region: string;
  desc: string;
  price: number;
  /** ceramic bowl (chawan) product image shown on the matcha mound */
  image: string;
  /** swatch layers, top -> bottom */
  top: string;
  bottom: string;
  accent: string;
  tint: string;
  particle: "leaf" | "strawberry" | "blueberry" | "raspberry" | "crumb";
  notes: { umami: number; sweetness: number; richness: number; caffeine: number };
};

export const flavors: Flavor[] = [
  {
    id: "shizuoka",
    name: "Shizuoka Original",
    region: "Shizuoka",
    desc: "Classic pure ceremonial matcha — grassy, oceanic, endlessly smooth, finished with gold flakes.",
    price: 38,
    image: originalAsset.url,
    top: "oklch(0.62 0.16 145)",
    bottom: "oklch(0.94 0.03 130)",
    accent: "oklch(0.55 0.14 148)",
    tint: "oklch(0.96 0.02 140)",
    particle: "leaf",
    notes: { umami: 95, sweetness: 32, richness: 70, caffeine: 78 },
  },
  {
    id: "uji-strawberry",
    name: "Uji Strawberry",
    region: "Uji, Kyoto",
    desc: "Emerald matcha swirled with whipped strawberry cream and fresh sliced berries.",
    price: 42,
    image: strawberryAsset.url,
    top: "oklch(0.66 0.17 148)",
    bottom: "oklch(0.82 0.13 18)",
    accent: "oklch(0.66 0.19 20)",
    tint: "oklch(0.96 0.025 25)",
    particle: "strawberry",
    notes: { umami: 62, sweetness: 82, richness: 74, caffeine: 60 },
  },
  {
    id: "kyoto-blueberry",
    name: "Kyoto Blueberry",
    region: "Kyoto",
    desc: "A deep violet blueberry swirl folded through ceremonial matcha foam.",
    price: 42,
    image: blueberryAsset.url,
    top: "oklch(0.6 0.15 150)",
    bottom: "oklch(0.5 0.16 295)",
    accent: "oklch(0.52 0.17 292)",
    tint: "oklch(0.95 0.02 292)",
    particle: "blueberry",
    notes: { umami: 58, sweetness: 74, richness: 68, caffeine: 58 },
  },
  {
    id: "raspberry",
    name: "Raspberry Matcha",
    region: "Hokkaido",
    desc: "Ruby raspberry ribbons cut with cold Hokkaido milk and whole berries.",
    price: 44,
    image: raspberryAsset.url,
    top: "oklch(0.64 0.16 147)",
    bottom: "oklch(0.62 0.21 14)",
    accent: "oklch(0.6 0.22 12)",
    tint: "oklch(0.96 0.02 12)",
    particle: "raspberry",
    notes: { umami: 55, sweetness: 78, richness: 66, caffeine: 55 },
  },
  {
    id: "brown-sugar",
    name: "Brown Sugar Matcha",
    region: "Fukuoka",
    desc: "Slow-toasted brown sugar syrup drizzled over a golden crumble crown.",
    price: 46,
    image: brownSugarAsset.url,
    top: "oklch(0.58 0.13 142)",
    bottom: "oklch(0.66 0.11 70)",
    accent: "oklch(0.72 0.1 78)",
    tint: "oklch(0.96 0.02 80)",
    particle: "crumb",
    notes: { umami: 68, sweetness: 88, richness: 92, caffeine: 64 },
  },
];
