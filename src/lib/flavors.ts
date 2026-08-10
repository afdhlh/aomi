import originalImg from "@/assets/original.png";
import strawberryImg from "@/assets/strawberry.png";
import blueberryImg from "@/assets/blueberry.png";
import raspberryImg from "@/assets/raspberry.png";
import brownSugarImg from "@/assets/brown_sugar.png";

export interface FlavorNotes {
  umami: number;
  sweetness: number;
  richness: number;
  caffeine: number;
}

export interface Flavor {
  id: string;
  name: string;
  region: string;
  price: number;
  desc: string;
  image: string;
  top: string;
  bottom: string;
  tint: string;
  accent: string;
  particle: "leaf" | "strawberry" | "blueberry" | "raspberry" | "sugar";
  notes: FlavorNotes;
}

export const flavors: Flavor[] = [
  {
    id: "shizuoka-original",
    name: "Shizuoka Original",
    region: "Shizuoka, Japan",
    price: 32,
    desc: "A pure, balanced ceremonial grade matcha with deep umami notes and a smooth, creamy finish.",
    image: originalImg,
    top: "#2D5A27",
    bottom: "#1E3F1B",
    tint: "#EAF3E8",
    accent: "#386633",
    particle: "leaf",
    notes: { umami: 88, sweetness: 45, richness: 78, caffeine: 70 },
  },
  {
    id: "uji-strawberry",
    name: "Uji Strawberry",
    region: "Uji, Kyoto",
    price: 36,
    desc: "Ceremonial matcha layered with ripe Uji strawberries for a delicate fruit-forward sweetness.",
    image: strawberryImg,
    top: "#E26D7D",
    bottom: "#355E3B",
    tint: "#FCEEEF",
    accent: "#D64550",
    particle: "strawberry",
    notes: { umami: 70, sweetness: 85, richness: 65, caffeine: 60 },
  },
  {
    id: "kyoto-blueberry",
    name: "Kyoto Blueberry",
    region: "Kyoto, Japan",
    price: 36,
    desc: "Rich matcha combined with wild Kyoto blueberries for a tart, antioxidant-rich flavor profile.",
    image: blueberryImg,
    top: "#5B5B8C",
    bottom: "#2B4C38",
    tint: "#F0F0F8",
    accent: "#4A4E69",
    particle: "blueberry",
    notes: { umami: 65, sweetness: 78, richness: 72, caffeine: 65 },
  },
  {
    id: "raspberry-matcha",
    name: "Raspberry Matcha",
    region: "Nara, Japan",
    price: 36,
    desc: "Vibrant and tangy raspberries paired with stone-ground matcha for an invigorating blend.",
    image: raspberryImg,
    top: "#C7385A",
    bottom: "#2B4C38",
    tint: "#FAECEF",
    accent: "#B82547",
    particle: "raspberry",
    notes: { umami: 60, sweetness: 82, richness: 60, caffeine: 65 },
  },
  {
    id: "okinawa-brown-sugar",
    name: "Okinawa Brown Sugar",
    region: "Okinawa, Japan",
    price: 38,
    desc: "Decadent Kokuto brown sugar from Okinawa melted into robust ceremonial matcha.",
    image: brownSugarImg,
    top: "#8C6239",
    bottom: "#2B4C38",
    tint: "#F7F2EC",
    accent: "#7A4E2A",
    particle: "sugar",
    notes: { umami: 80, sweetness: 92, richness: 90, caffeine: 55 },
  },
];