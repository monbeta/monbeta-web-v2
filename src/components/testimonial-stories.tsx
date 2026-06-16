import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Images, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials-data";

export function TestimonialStories() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <motion.article
          key={t.slug}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="flex h-full flex-col"
        >
          <Link
            to="/testimonials/$slug"
            params={{ slug: t.slug }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {t.screenshots.length > 0 ? (
              <div className="relative flex h-36 items-start gap-2 overflow-hidden bg-[#EDEDED] p-3">
                {t.screenshots.slice(0, 3).map((src, j) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-full flex-1 rounded-xl border border-black/5 object-cover object-top shadow-sm"
                    style={{ transform: `rotate(${j === 0 ? -2 : j === 1 ? 0 : 2}deg)` }}
                  />
                ))}
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
                  <Images className="h-3 w-3" />
                  {t.screenshots.length} 张截图
                </span>
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center bg-accent/20">
                <Quote className="h-8 w-8 text-primary/30" />
              </div>
            )}

            <div className="flex flex-1 flex-col p-7">
              <p className="flex-1 text-sm leading-relaxed text-foreground/85 line-clamp-5">{t.excerpt}</p>

              <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
                <h3 className="font-serif text-lg font-semibold leading-snug group-hover:text-primary">{t.headline}</h3>

                {t.services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {t.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-accent/50 px-2.5 py-1 text-[11px] font-medium text-foreground/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{t.author}</span>
                  {t.timeline && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {t.timeline}
                    </span>
                  )}
                </div>
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                查看完整评价 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
