import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { CASES } from "@/lib/cases-data";

export function CaseStories() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {CASES.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <Link
            to="/cases/$slug"
            params={{ slug: c.slug }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex h-44 items-center justify-center bg-gradient-case-cover text-6xl">
              <span className="drop-shadow-sm">{c.cover}</span>
              <span className="absolute right-4 top-4 rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background shadow-sm">
                {c.outcome}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">{c.category}</div>
              <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">{c.title}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {c.origin}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {c.timeline}
                </span>
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                查看完整案例 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
