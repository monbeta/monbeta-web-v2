import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_CATEGORIES, AVOIDED_PROGRAMS } from "@/lib/services-data";

export const Route = createFileRoute("/services")({ component: ServicesPage });

function ServicesPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Services · 服务项目</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            一份清晰的<span className="text-gradient">服务清单</span>。
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            每项服务均明确列明服务范围、申请类别及交付内容。
            <br />
            咨询时，我们会根据您的背景和需求，协助组合最适合的申请方案。
          </p>
        </motion.div>

        <div className="mt-14 space-y-14">
          {SERVICE_CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{cat.subtitle}</div>
                  <h2 className="mt-2 font-serif text-3xl font-semibold">{cat.title}</h2>
                </div>
                <div className="text-xs text-muted-foreground">{cat.items.length} 项</div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {cat.items.map((it, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{it.name}</div>
                      <span className="rounded-full bg-accent/60 px-2 py-0.5 font-mono text-[10px]">{it.code}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{it.en}</div>
                    {it.desc && <div className="mt-3 text-sm text-foreground/80">{it.desc}</div>}
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Process */}
        <section className="mt-24 rounded-3xl border border-border/60 bg-gradient-soft p-8 sm:p-12">
          <h2 className="font-serif text-3xl font-semibold">服务流程</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "预约咨询", d: "选择 15 / 30 / 45 / 60 分钟，付费确认。" },
              { n: "02", t: "结构化咨询", d: "Zoom 一对一，结束后提供书面方案。" },
              { n: "03", t: "签署服务协议", d: "若双方同意继续，签署正式协议；咨询费可抵扣一次。" },
              { n: "04", t: "递交与跟进", d: "材料组织、递交、补料、面试辅导直到结果。" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-white/70 p-6">
                <div className="font-mono text-xs text-primary">{s.n}</div>
                <div className="mt-2 font-semibold">{s.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* avoided */}
        <section className="mt-16 rounded-3xl border border-amber-200/70 bg-amber-50/40 p-8 sm:p-12">
          <h2 className="font-serif text-3xl font-semibold">我们不接的案件</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">透明在前，省去您的时间与金钱。</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {AVOIDED_PROGRAMS.map((p) => (
              <li key={p.title} className="flex gap-3 rounded-2xl border border-amber-200/70 bg-white p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.reason}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background">
            预约付费咨询 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
