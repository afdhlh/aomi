export type Flavor = {
  id: string;
  name: string;
  region: string;
  desc: string;
  price: number;
  /** liquid layers, top -> bottom */
  top: string;
  bottom: string;
  accent: string;
  tint: string;
  notes: { umami: number; sweetness: number; richness: number; caffeine: number };
};

export const flavors: Flavor[] = [
  {
    id: "shizuoka",
    name: "Shizuoka Original",
    region: "Shizuoka",
    desc: "Classic pure ceremonial matcha — grassy, oceanic, endlessly smooth.",
    price: 38,
    top: "oklch(0.62 0.16 145)",
    bottom: "oklch(0.94 0.03 130)",
    accent: "oklch(0.55 0.14 148)",
    tint: "oklch(0.96 0.02 140)",
    notes: { umami: 95, sweetness: 32, richness: 70, caffeine: 78 },
  },
  {
    id: "uji-strawberry",
    name: "Uji Strawberry",
    region: "Uji, Kyoto",
    desc: "Emerald matcha layered under whipped fresh strawberry cream.",
    price: 42,
    top: "oklch(0.66 0.17 148)",
    bottom: "oklch(0.82 0.13 18)",
    accent: "oklch(0.66 0.19 20)",
    tint: "oklch(0.96 0.025 25)",
    notes: { umami: 62, sweetness: 82, richness: 74, caffeine: 60 },
  },
  {
    id: "kyoto-blueberry",
    name: "Kyoto Blueberry",
    region: "Kyoto",
    desc: "A deep violet blueberry layer sinking through ceremonial matcha.",
    price: 42,
    top: "oklch(0.6 0.15 150)",
    bottom: "oklch(0.5 0.16 295)",
    accent: "oklch(0.52 0.17 292)",
    tint: "oklch(0.95 0.02 292)",
    notes: { umami: 58, sweetness: 74, richness: 68, caffeine: 58 },
  },
  {
    id: "hokkaido-raspberry",
    name: "Hokkaido Raspberry",
    region: "Hokkaido",
    desc: "Ruby raspberry infusion cut with cold Hokkaido milk and matcha.",
    price: 44,
    top: "oklch(0.64 0.16 147)",
    bottom: "oklch(0.62 0.21 14)",
    accent: "oklch(0.6 0.22 12)",
    tint: "oklch(0.96 0.02 12)",
    notes: { umami: 55, sweetness: 78, richness: 66, caffeine: 55 },
  },
  {
    id: "brown-sugar",
    name: "Toasted Brown Sugar Crumb",
    region: "Fukuoka",
    desc: "Slow-toasted brown sugar with a golden crunch crumb topping.",
    price: 46,
    top: "oklch(0.58 0.13 142)",
    bottom: "oklch(0.66 0.11 70)",
    accent: "oklch(0.72 0.1 78)",
    tint: "oklch(0.96 0.02 80)",
    notes: { umami: 68, sweetness: 88, richness: 92, caffeine: 64 },
  },
];
