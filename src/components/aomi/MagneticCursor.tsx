import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-primary/60 bg-primary/10 backdrop-blur-[1px]"
        animate={{ width: active ? 48 : 16, height: active ? 48 : 16, opacity: active ? 1 : 0.7 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </motion.div>
  );
}
