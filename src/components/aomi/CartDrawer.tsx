import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { Flavor } from "@/lib/flavors";

export type CartLine = { flavor: Flavor; qty: number };

export function CartDrawer({
  open,
  onClose,
  lines,
  onQty,
}: {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onQty: (id: string, delta: number) => void;
}) {
  const total = lines.reduce((s, l) => s + l.flavor.price * l.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-primary/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-background shadow-[var(--shadow-drawer)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <h2 className="font-serif text-xl text-primary">Shopping Bag</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close bag"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {lines.length === 0 ? (
                <p className="mt-16 text-center text-sm text-muted-foreground">
                  Your bag is quiet. Choose a flavour to begin the ritual.
                </p>
              ) : (
                <ul className="space-y-5">
                  {lines.map((l) => (
                    <motion.li
                      key={l.flavor.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 rounded-xl border border-border/70 p-4"
                    >
                      <span
                        className="h-12 w-12 shrink-0 rounded-lg"
                        style={{
                          background: `linear-gradient(160deg, ${l.flavor.top}, ${l.flavor.bottom})`,
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-base text-primary">{l.flavor.name}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          ${l.flavor.price}.00
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Decrease"
                          onClick={() => onQty(l.flavor.id, -1)}
                          className="rounded-full border border-border p-1.5 text-primary transition-colors hover:bg-secondary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-sm tabular-nums">{l.qty}</span>
                        <button
                          aria-label="Increase"
                          onClick={() => onQty(l.flavor.id, 1)}
                          className="rounded-full border border-border p-1.5 text-primary transition-colors hover:bg-secondary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-border px-6 py-6">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Total</span>
                <span className="font-serif text-2xl text-primary tabular-nums">${total}.00</span>
              </div>
              <button className="w-full rounded-full bg-primary px-6 py-3.5 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-transform hover:scale-[1.01]">
                Checkout
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
