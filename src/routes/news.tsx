import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { NEWS } from "@/lib/content-data";

export const Route = createFileRoute("/news")({ component: NewsPage });

function NewsPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">News · 资讯动态</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            政策的<span className="text-gradient">每一处微调</span>，我们替您盯紧。
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            每周更新 IRCC、CICC 与各省提名项目的关键变化。简明、实操、不堆术语。
          </p>
        </motion.div>

        {/* Featured */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Featured n={NEWS[0]} />
          <div className="space-y-6">
            {NEWS.slice(1, 3).map((n) => (
              <Card key={n.slug} n={n} small />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(3).map((n) => (
            <Card key={n.slug} n={n} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary">
            想就具体案件聊聊？预约咨询 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

type N = typeof NEWS[number];

function Featured({ n }: { n: N }) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-brand p-8 sm:p-10">
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-background/80 px-2.5 py-1 font-medium">{n.tag}</span>
        <span className="flex items-center gap-1 text-foreground/70"><Calendar className="h-3 w-3" /> {n.date}</span>
      </div>
      <div className="mt-12">
        <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl text-balance">{n.title}</h2>
        <p className="mt-4 max-w-xl text-base text-foreground/80">{n.excerpt}</p>
        <button className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
          阅读全文 <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

function Card({ n, small }: { n: N; small?: boolean }) {
  return (
    <article className={`group flex flex-col rounded-3xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md ${small ? "" : ""}`}>
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-accent/60 px-2.5 py-1 font-medium text-foreground/80">{n.tag}</span>
        <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {n.date}</span>
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug">{n.title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
      <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        阅读全文 <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}
