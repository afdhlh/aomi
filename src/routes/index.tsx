import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { flavors, type Flavor } from "@/lib/flavors";
import { MagneticCursor } from "@/components/aomi/MagneticCursor";
import { Header } from "@/components/aomi/Header";
import { Hero } from "@/components/aomi/Hero";
import { WhiskWidget } from "@/components/aomi/WhiskWidget";
import { CartDrawer, type CartLine } from "@/components/aomi/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aomi Matcha — Ceremonial Grade Matcha from Uji, Kyoto" },
      {
        name: "description",
        content:
          "Aomi Matcha: stone-milled ceremonial grade matcha from Uji, Kyoto. Explore five layered flavours, tasting notes and the whisking ritual.",
      },
      { property: "og:title", content: "Aomi Matcha — Ceremonial Grade Japanese Matcha" },
      {
        property: "og:description",
        content:
          "Five layered ceremonial matcha lattes, direct from Uji. Taste the stillness of green.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((f: Flavor) => {
    setCart((c) => {
      const found = c.find((l) => l.flavor.id === f.id);
      return found
        ? c.map((l) => (l.flavor.id === f.id ? { ...l, qty: l.qty + 1 } : l))
        : [...c, { flavor: f, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const onQty = useCallback((id: string, delta: number) => {
    setCart((c) =>
      c
        .map((l) => (l.flavor.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const count = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <MagneticCursor />
      <Header count={count} onOpenCart={() => setOpen(true)} />
      <Hero onAdd={add} />

      <section id="grade" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Shade-grown 21 days",
              d: "Tencha leaves rest beneath rice straw, deepening chlorophyll and theanine into a rounder, sweeter body.",
            },
            {
              t: "Stone-milled, 40g / hour",
              d: "Granite wheels turn slowly so the leaf never scorches. One hour of milling yields a single tin.",
            },
            {
              t: "Harvest to whisk in 21 days",
              d: "Nitrogen-flushed and shipped cold, so the green you see is the green the field saw.",
            },
          ].map((c, i) => (
            <motion.article
              key={c.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border-t border-border pt-6"
            >
              <span className="font-serif text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-2xl text-primary">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <WhiskWidget flavor={flavors[0]!} />

      <section id="farm" className="relative overflow-hidden bg-primary py-28 text-primary-foreground">
        <span
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-1/2 -translate-y-1/2 select-none font-serif text-[22vw] leading-none text-primary-foreground/[0.05]"
          style={{ writingMode: "vertical-rl" }}
        >
          青み
        </span>
        <div className="relative mx-auto max-w-3xl px-5 text-center md:px-10">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-primary-foreground/60">
            Our Farm
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-tight md:text-6xl">
            Four generations on the same
            <span className="italic text-gold"> two hectares.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
            The Aomi fields sit along the Uji river, where morning mist does the work of shade cloth.
            We buy nothing from auction — every tin is traceable to a single row.
          </p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground md:flex-row md:px-10">
        <span>Aomi 青み · Uji, Kyoto</span>
        <span>© {new Date().getFullYear()} Aomi Matcha</span>
      </footer>

      <CartDrawer open={open} onClose={() => setOpen(false)} lines={cart} onQty={onQty} />
    </main>
  );
}
