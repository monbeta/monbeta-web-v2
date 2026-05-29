import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { ServiceCategory } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function ServicesCarousel({ categories }: { categories: ServiceCategory[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const n = categories.length;
  const go = (next: number) => {
    setDir(next > i ? 1 : -1);
    setI((next + n) % n);
  };
  const cat = categories[i];

  return (
    <div className="relative">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => go(idx)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              idx === i
                ? "border-foreground bg-foreground text-background shadow-sm"
                : "border-border/60 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            <span className="mr-1.5 opacity-60">{String(idx + 1).padStart(2, "0")}</span>
            {c.title}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl">
        <button
          aria-label="Previous"
          onClick={() => go(i - 1)}
          className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border/60 bg-background p-3 shadow-md hover:bg-accent/40 sm:flex lg:-left-14"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(i + 1)}
          className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border/60 bg-background p-3 shadow-md hover:bg-accent/40 sm:flex lg:-right-14"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-background shadow-xl">
          <div className="relative h-[460px] sm:h-[420px] lg:h-[380px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={cat.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 grid gap-6 p-8 sm:gap-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-10 lg:p-12"
              >
                <div className="flex min-h-0 flex-col">
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
                    {cat.subtitle}
                  </div>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
                    {cat.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground sm:mt-5">
                    <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-12 bg-foreground/30" />
                    <span className="font-mono">{String(n).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    共 {cat.items.length} 项服务，每项均标注编号与交付范围。
                  </p>
                </div>

                <ul
                  className={cn(
                    "min-h-0 overflow-y-auto overscroll-contain pr-1",
                    "grid content-start gap-2.5",
                    cat.items.length <= 3 ? "grid-cols-1" : "sm:grid-cols-2",
                  )}
                >
                  {cat.items.map((it, j) => (
                    <motion.li
                      key={`${it.code}-${j}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + j * 0.04 }}
                      className="rounded-xl border border-border/60 bg-accent/10 px-3.5 py-3 transition-colors hover:bg-accent/30"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground">
                          {it.code}
                        </span>
                        <span className="text-sm font-semibold leading-snug">{it.name}</span>
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{it.en}</div>
                      {it.desc && (
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-foreground/70">{it.desc}</p>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border/60 px-8 py-4 sm:px-10 sm:py-5 lg:px-12">
            <Link
              to="/services"
              hash={cat.id}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              查看此类别详情 <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {categories.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to ${idx + 1}`}
              onClick={() => go(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
