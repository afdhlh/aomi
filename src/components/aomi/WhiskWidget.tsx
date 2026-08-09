import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Flavor } from "@/lib/flavors";

type P = { x: number; y: number; vx: number; vy: number; life: number; r: number };

export function WhiskWidget({ flavor }: { flavor: Flavor }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holding = useRef(false);
  const particles = useRef<P[]>([]);
  const angle = useRef(0);
  const [foam, setFoam] = useState(0);
  const foamRef = useRef(0);

  const start = useCallback(() => (holding.current = true), []);
  const stop = useCallback(() => (holding.current = false), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    let last = performance.now();

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 16.67, 3);
      last = t;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      if (holding.current) {
        angle.current += 0.35 * dt;
        foamRef.current = Math.min(1, foamRef.current + 0.008 * dt);
        for (let i = 0; i < 2; i++) {
          const a = angle.current + Math.random() * 1.2;
          const rr = 40 + Math.random() * 50;
          particles.current.push({
            x: cx + Math.cos(a) * rr,
            y: cy + Math.sin(a) * rr * 0.75,
            vx: -Math.sin(a) * (1 + Math.random()),
            vy: Math.cos(a) * (1 + Math.random()) * 0.7 - 0.4,
            life: 1,
            r: 1.5 + Math.random() * 3.5,
          });
        }
      } else {
        foamRef.current = Math.max(0, foamRef.current - 0.003 * dt);
      }
      setFoam(Math.round(foamRef.current * 100));

      // bowl
      ctx.beginPath();
      ctx.ellipse(cx, cy, 118, 92, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(27,46,30,0.06)";
      ctx.fill();

      // liquid
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, 104, 80, 0, 0, Math.PI * 2);
      ctx.clip();
      const g = ctx.createLinearGradient(0, cy - 80, 0, cy + 80);
      g.addColorStop(0, flavor.top);
      g.addColorStop(1, flavor.bottom);
      ctx.fillStyle = g;
      ctx.fillRect(cx - 110, cy - 90, 220, 180);

      // swirl
      for (let i = 0; i < 5; i++) {
        const a = angle.current * (0.6 + i * 0.12);
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a) * (8 + i * 3), cy + Math.sin(a) * (6 + i * 2), 70 - i * 11, 52 - i * 8, a, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${0.06 + foamRef.current * 0.16})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();

      // particles
      particles.current = particles.current.filter((p) => p.life > 0);
      if (particles.current.length > 420) particles.current.splice(0, particles.current.length - 420);
      for (const p of particles.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.02 * dt;
        p.life -= 0.018 * dt;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, p.life) * 0.75})`;
        ctx.fill();
      }

      // whisk
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle.current * 0.5);
      ctx.strokeStyle = "rgba(197,160,89,0.85)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.quadraticCurveTo(Math.cos(a) * 34, -10, Math.cos(a) * 20, 34);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.roundRect(-7, -108, 14, 52, 6);
      ctx.fillStyle = "rgba(197,160,89,0.9)";
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [flavor]);

  return (
    <section id="ritual" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">The Craft</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            Hold, and whisk
            <span className="block italic text-accent">until it breathes foam.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A chasen of eighty bamboo prongs, a wrist moving in a quiet W. Press and hold the bowl to
            fold air into the tea — the way it has been done in Uji for four hundred years.
          </p>
          <div className="mt-8 max-w-xs">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Foam density</span>
              <span className="font-serif text-2xl text-primary tabular-nums">{foam}%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gold"
                animate={{ width: `${foam}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 22 }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            data-cursor
            className="relative select-none rounded-full p-4 glass-panel"
            onPointerDown={start}
            onPointerUp={stop}
            onPointerLeave={stop}
            style={{ touchAction: "none" }}
          >
            <canvas ref={canvasRef} style={{ width: 320, height: 320 }} className="max-w-full" />
            <span className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Press &amp; hold
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
