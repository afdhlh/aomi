import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const nav = [
  { label: "Ceremonial Grade", href: "#grade" },
  { label: "Flavors", href: "#flavors" },
  { label: "The Ritual", href: "#ritual" },
  { label: "Our Farm", href: "#farm" },
];

export function Header({ count, onOpenCart }: { count: number; onOpenCart: () => void }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[70] border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-[0.2em] text-primary">AOMI</span>
          <span className="text-sm text-accent">青み</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={onOpenCart}
          className="group relative flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Bag</span>
          <span className="tabular-nums">({count})</span>
        </button>
      </div>
    </motion.header>
  );
}
