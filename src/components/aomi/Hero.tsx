import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Leaf, MapPin, Sparkles } from "lucide-react";
import glassImg from "@/assets/matcha-glass.png";
import { flavors, type Flavor } from "@/lib/flavors";

const floaters = [
  { x: -38, y: -22, d: 22, s: 1, icon: "leaf" },
  { x: 36, y: -30, d: 34, s: 0.8, icon: "ice" },
  { x: -30, y: 26, d: 16, s: 0.7, icon: "slice" },
  { x: 33, y: 22, d: 28, s: 0.9, icon: "leaf" },
  { x: -44, y: 4, d: 12, s: 0.6, icon: "ice" },
  { x: 45, y: -4, d: 40, s: 0.75, icon: "slice" },
];

function Floater({
  spec,
  px,
  py,
  flavor,
}: {
  spec: (typeof floaters)[number];
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  flavor: Flavor;
}) {
  const tx = useTransform(px, (v: number) => v * spec.d);
  const ty = useTransform(py, (v: number) => v * spec.d);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${50 + spec.x}%`,
        top: `${50 + spec.y}%`,
        x: tx,
        y: ty,
        scale: spec.s,
      }}
      animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 6 + spec.d / 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {spec.icon === "leaf" ? (
        <Leaf className="h-8 w-8 text-accent/70" />
      ) : spec.icon === "ice" ? (
        <span className="block h-9 w-9 rotate-12 rounded-lg border border-white/70 bg-white/40 backdrop-blur-sm" />
      ) : (
        <motion.span
          className="block h-9 w-9 rounded-full"
          animate={{ backgroundColor: flavor.bottom }}
          transition={{ duration: 0.8 }}
          style={{ opacity: 0.75 }}
        />
      )}
    </motion.div>
  );
}

function Gauge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className="font-serif text-sm text-primary tabular-nums">{value}</span>
      </div>
      <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${value}%`, backgroundColor: color }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export function Hero({ onAdd }: { onAdd: (f: Flavor) => void }) {
  const [index, setIndex] = useState(0);
  const flavor = flavors[index];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const glassX = useTransform(px, (v: number) => v * -14);
  const glassY = useTransform(py, (v: number) => v * -10);

  return (
    <section id="top" className="relative overflow-hidden pt-28">
      {/* ambient tint */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundColor: flavor.tint }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[120px]"
        animate={{ backgroundColor: flavor.accent, opacity: 0.16 }}
        transition={{ duration: 1.1 }}
      />

      {/* kanji watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[6%] select-none font-serif text-[26vw] leading-[0.8] text-primary/[0.045] md:text-[20vw]"
        style={{ writingMode: "vertical-rl" }}
      >
        青み
      </span>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="eyebrow"
          >
            Ceremonial Grade · First Harvest
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-4xl font-serif text-[13vw] leading-[0.92] text-primary sm:text-7xl md:text-8xl"
          >
            The stillness
            <span className="block italic text-accent">of green.</span>
          </motion.h1>
        </div>

        {/* glass + floaters */}
        <div className="relative mx-auto mt-8 h-[520px] w-full max-w-3xl md:h-[620px]">
          {floaters.map((f, i) => (
            <Floater key={i} spec={f} px={px} py={py} flavor={flavor} />
          ))}

          {/* badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute left-0 top-16 hidden rounded-full px-4 py-2.5 glass-panel md:flex md:items-center md:gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-primary">
              100% Ceremonial Grade
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            className="absolute right-0 top-40 hidden rounded-full px-4 py-2.5 glass-panel md:flex md:items-center md:gap-2"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-primary">
              Direct from Uji, Kyoto
            </span>
          </motion.div>

          {/* stone pedestal */}
          <div className="absolute bottom-[86px] left-1/2 h-10 w-72 -translate-x-1/2 rounded-[50%] bg-slate-stone/80 blur-[1px] md:w-80" />
          <div className="absolute bottom-[72px] left-1/2 h-8 w-64 -translate-x-1/2 rounded-[50%] bg-primary/25 blur-xl" />

          {/* glass */}
          <motion.div
            className="absolute bottom-[92px] left-1/2 h-[420px] w-[300px] -translate-x-1/2 md:h-[480px] md:w-[340px]"
            style={{ x: glassX, y: glassY }}
          >
            <img
              src={glassImg}
              alt="Layered iced ceremonial matcha latte in a ribbed glass on slate stone"
              width={1024}
              height={1408}
              className="h-full w-full object-contain"
            />
            {/* liquid morph overlay masked to the glass silhouette */}
            <motion.div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply"
              animate={{
                background: `linear-gradient(to bottom, transparent 8%, ${flavor.top} 26%, ${flavor.top} 46%, ${flavor.bottom} 66%, ${flavor.bottom} 96%)`,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                maskImage: `url(${glassImg})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                opacity: 0.85,
              }}
            />
          </motion.div>

          {/* arc carousel */}
          <div className="absolute bottom-0 left-1/2 h-[190px] w-full max-w-3xl -translate-x-1/2 [perspective:1200px]">
            {flavors.map((f, i) => {
              const offset = i - index;
              const active = offset === 0;
              return (
                <motion.button
                  key={f.id}
                  onClick={() => setIndex(i)}
                  data-cursor
                  className="absolute left-1/2 top-6 w-[150px] origin-bottom rounded-2xl p-3 text-left glass-panel md:w-[168px]"
                  animate={{
                    x: offset * 132 - 84,
                    y: Math.abs(offset) * 26 + (active ? -26 : 0),
                    rotate: offset * 9,
                    scale: active ? 1.08 : 0.9,
                    opacity: Math.abs(offset) > 2 ? 0 : active ? 1 : 0.68,
                    zIndex: 10 - Math.abs(offset),
                  }}
                  whileHover={{ scale: active ? 1.12 : 0.98 }}
                  transition={{ type: "spring", stiffness: 210, damping: 24 }}
                >
                  <span
                    className="block h-12 w-full rounded-lg"
                    style={{ background: `linear-gradient(150deg, ${f.top}, ${f.bottom})` }}
                  />
                  <span className="mt-2 block font-serif text-[0.95rem] leading-tight text-primary">
                    {f.name}
                  </span>
                  <span className="mt-1 block text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {f.region}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* details + tasting notes */}
        <div id="flavors" className="mt-16 grid gap-10 pb-24 md:grid-cols-[1.1fr_1fr] md:items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <p className="eyebrow">{flavor.region}</p>
              <h2 className="mt-3 font-serif text-4xl text-primary md:text-5xl">{flavor.name}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {flavor.desc}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onAdd(flavor)}
                  className="rounded-full bg-primary px-8 py-3.5 text-[0.68rem] uppercase tracking-[0.24em] text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Order Fresh Batch
                </button>
                <span className="font-serif text-2xl text-primary tabular-nums">
                  ${flavor.price}.00
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="rounded-3xl p-6 glass-panel">
            <p className="eyebrow">Tasting Notes</p>
            <div className="mt-5 space-y-4">
              <Gauge label="Umami" value={flavor.notes.umami} color={flavor.accent} />
              <Gauge label="Sweetness" value={flavor.notes.sweetness} color={flavor.accent} />
              <Gauge label="Richness" value={flavor.notes.richness} color={flavor.accent} />
              <Gauge label="Caffeine" value={flavor.notes.caffeine} color={flavor.accent} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
