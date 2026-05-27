import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, AlertTriangle, Award, MapPin, FileBadge, Star, Quote, Calendar } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SERVICE_CATEGORIES, AVOIDED_PROGRAMS } from "@/lib/services-data";
import { TESTIMONIALS, NEWS } from "@/lib/content-data";
import rcic from "@/assets/rcic.png";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />

      {/* About preview */}
      <Section
        eyebrow="About · 关于我们"
        title={<>不是大机构，是一位 <span className="text-gradient">为你负责到底</span> 的持牌顾问。</>}
        subtitle="MonBeta 由 Tong Huang (RCIC-IRB) 创办。我们刻意保持小而专 —— 每一个案件都由她本人评估、跟进与递交。"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-xl">
              <img src={rcic} alt="CICC License - Tong Huang" className="w-full rounded-xl" />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-border/60 bg-white px-5 py-4 shadow-lg sm:block">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">RCIC-IRB</div>
              <div className="font-mono text-lg font-semibold">R706081</div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Fact icon={<Award />} label="持牌资质" value="CICC RCIC-IRB" />
              <Fact icon={<MapPin />} label="所在地" value="温哥华 · BC" />
              <Fact icon={<FileBadge />} label="License" value="R706081" />
              <Fact icon={<ShieldCheck />} label="执业承诺" value="不评估通过不接案" />
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Tong (Becky) Huang 持有加拿大移民顾问学院 (CICC) 颁发的 RCIC-IRB 牌照，可代理联邦及大多数省份的签证、学签、工签、移民、身份恢复以及 IRB 听证程序。
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
              查看完整介绍 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Avoided programs */}
        <div className="mt-20 rounded-3xl border border-border/60 bg-accent/20 p-8 sm:p-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-amber-600" />
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                我们刻意不做的事
              </div>
              <h3 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">
                诚信比成单更重要
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                以下项目我们不接 —— 不是不愿意，而是不愿意为收费让您冒不必要的风险。
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {AVOIDED_PROGRAMS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border/60 bg-background/80 p-5 backdrop-blur">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services preview */}
      <Section
        eyebrow="Services · 服务项目"
        title={<>从一次咨询，到一张<span className="text-gradient">枫叶卡</span>，全程透明。</>}
        subtitle="服务覆盖临时居民签证、学签、工签、永居与执法类事务。每一项均有清晰的服务编号、流程与交付物。"
        className="bg-gradient-soft"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                {cat.subtitle}
              </div>
              <div className="text-xl font-serif font-semibold">{cat.title}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {cat.items.slice(0, 4).map((it, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/80">{it.name}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
              >
                查看详情 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-6 py-3 text-sm font-medium hover:bg-accent/40">
            浏览所有服务项目 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow="Testimonials · 客户评价"
        title={<>真实的反馈，来自<span className="text-gradient">真实的案件</span>。</>}
        subtitle="所有评价经客户本人授权后展示。出于隐私保留姓氏与方向，欢迎在咨询时索取案例细节。"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-3xl border border-border/60 bg-card p-7"
            >
              <Quote className="absolute right-5 top-5 h-6 w-6 text-primary/30" />
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5 border-t border-border/60 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
            查看更多客户故事 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* News */}
      <Section
        eyebrow="News · 资讯动态"
        title={<>跟紧 <span className="text-gradient">政策的每一次微调</span>。</>}
        subtitle="我们每周梳理 IRCC、CICC 与省提名项目的关键更新。"
        className="bg-gradient-soft"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 3).map((n, i) => (
            <motion.article
              key={n.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col rounded-3xl border border-border/60 bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-accent/60 px-2.5 py-1 font-medium text-foreground/80">{n.tag}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {n.date}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold leading-snug">{n.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
              <Link to="/news" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                阅读全文 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-brand p-10 sm:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl text-balance">
                把您的案子，交给会说"不"的顾问。
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80">
                15 / 30 / 45 / 60 分钟，Zoom 一对一。带走结构化方案与下一步清单。咨询费可在签署正式服务协议时抵扣。
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:scale-[1.02] transition-transform">
                立刻预约 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-background/80 px-7 py-3.5 text-sm font-medium backdrop-blur hover:bg-background">
                先看服务
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4">
      <div className="rounded-xl bg-accent/60 p-2 text-foreground">
        <div className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
