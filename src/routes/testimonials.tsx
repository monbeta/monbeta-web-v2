import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Star, Quote, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content-data";

export const Route = createFileRoute("/testimonials")({ component: TestimonialsPage });

function TestimonialsPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Testimonials · 客户评价</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            一份案件，一份<span className="text-gradient">交代</span>。
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            以下评价经客户本人授权发布。出于隐私我们保留姓氏与案件类型。需要详细案例请在咨询时索取。
          </p>
        </motion.div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="mb-6 break-inside-avoid rounded-3xl border border-border/60 bg-card p-7"
            >
              <Quote className="h-6 w-6 text-primary/30" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5 border-t border-border/60 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background">
            开始您自己的故事 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
