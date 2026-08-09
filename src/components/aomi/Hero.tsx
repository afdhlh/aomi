import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import glassImg from "@/assets/matcha-glass-mountain.png";
import { flavors, type Flavor } from "@/lib/flavors";
import { Chasen, Chashaku, IceShard, UjiMap, particleMap } from "@/components/aomi/props";

type FloatSpec = { x: number; y: number; d: number; s: number; kind: "fruit" | "ice" | "chasen" | "chashaku" };

const floaters: FloatSpec[] = [
  { x: -38, y: -22, d: 22, s: 1, kind: "fruit" },
  { x: 36, y: -30, d: 34, s: 0.85, kind: "ice" },
  { x: -30, y: 26, d: 16, s: 0.8, kind: "fruit" },
  { x: 33, y: 22, d: 28, s: 0.9, kind: "fruit" },
  { x: -46, y: -2, d: 12, s: 1.1, kind: "chasen" },
  { x: 46, y: 6, d: 40, s: 1, kind: "chashaku" },
  { x: -14, y: -36, d: 26, s: 0.7, kind: "ice" },
  { x: 16, y: 34, d: 20, s: 0.7, kind: "ice" },
];

function Floater({
  spec,
  px,
  py,
  flavor,
}: {
  spec: FloatSpec;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  flavor: Flavor;
}) {
  const tx = useTransform(px, (v: number) => v * spec.d);
  const ty = useTransform(py, (v: number) => v * spec.d);
  const Particle = particleMap[flavor.particle];

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
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
      {spec.kind === "ice" ? (
        <IceShard className="h-9 w-9 drop-shadow-sm" />
      ) : spec.kind === "chasen" ? (
        <Chasen className="h-24 w-16 opacity-80" />
      ) : spec.kind === "chashaku" ? (
        <Chashaku className="h-8 w-24 opacity-80" />
      ) : (
        <AnimatePresence mode="wait">
          <motion.span
            key={flavor.particle}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 30 }}
            transition={{ duration: 0.4 }}
            className="block"
          >
            <Particle className="h-10 w-10 drop-shadow-sm" />
          </motion.span>
        </AnimatePresence>
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
  const flavor = flavors[index] ?? flavors[0]!;

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

      {/* translucent Uji, Kyoto map outline */}
      <UjiMap className="pointer-events-none absolute -left-[10%] top-[12%] h-[70vw] w-[70vw] max-h-[760px] max-w-[760px] text-primary/[0.07]" />

      {/* kanji watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4%] top-[6%] select-none font-serif text-[26vw] leading-[0.8] text-primary/[0.05] md:text-[20vw]"
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

          {/* rough-edge washi / stone badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="washi-badge absolute left-0 top-16 hidden px-5 py-3 md:flex md:items-center md:gap-2"
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
            className="washi-badge absolute right-0 top-40 hidden px-5 py-3 md:flex md:items-center md:gap-2"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-primary">
              Direct from Uji, Kyoto
            </span>
          </motion.div>

          {/* stone pedestal shadow */}
          <div className="absolute bottom-[78px] left-1/2 h-8 w-72 -translate-x-1/2 rounded-[50%] bg-primary/25 blur-xl md:w-80" />

          {/* glass on matcha mountain */}
          <motion.div
            className="absolute bottom-[80px] left-1/2 h-[430px] w-[310px] -translate-x-1/2 will-change-transform md:h-[500px] md:w-[360px]"
            style={{ x: glassX, y: glassY }}
          >
            <img
              src={glassImg}
              alt="Ribbed glass of layered iced ceremonial matcha latte with gold kintsugi veins, set on a mountain of matcha powder over a slate stone"
              width={1024}
              height={1408}
              className="h-full w-full object-contain"
            />
            {/* liquid morph overlay masked to the glass silhouette */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[62%] mix-blend-multiply"
              animate={{
                background: `linear-gradient(to bottom, transparent 6%, ${flavor.top} 22%, ${flavor.top} 46%, ${flavor.bottom} 70%, ${flavor.bottom} 98%)`,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                maskImage: `url(${glassImg})`,
                maskSize: "100% 161%",
                maskRepeat: "no-repeat",
                maskPosition: "top center",
                opacity: 0.82,
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
                  aria-label={`Select ${f.name}`}
                  className="washi-badge absolute left-1/2 top-6 w-[150px] origin-bottom rounded-2xl p-3 text-left will-change-transform md:w-[168px]"
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
