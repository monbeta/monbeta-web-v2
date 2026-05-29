import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, CheckCircle2, ImageIcon } from "lucide-react";
import { CASES, type CaseStudy, type ChatMessage } from "@/lib/cases-data";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const c = CASES.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { case: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.case.title} — MonBeta 真实案例` },
          { name: "description", content: loaderData.case.excerpt },
          { property: "og:title", content: loaderData.case.title },
          { property: "og:description", content: loaderData.case.excerpt },
        ]
      : [],
  }),
  component: CaseDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-3xl">案例未找到</h1>
        <Link to="/" className="mt-4 inline-block text-primary">回到首页</Link>
      </div>
    </div>
  ),
});

function CaseDetail() {
  const { case: c } = Route.useLoaderData() as { case: CaseStudy };

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> 返回首页
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            {c.category}
          </div>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl text-balance">
            {c.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.excerpt}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Fact icon={<CheckCircle2 className="h-4 w-4" />} label="结果" value={c.outcome} />
            <Fact icon={<MapPin className="h-4 w-4" />} label="来源 / 落地" value={c.origin} />
            <Fact icon={<Calendar className="h-4 w-4" />} label="时间线" value={c.timeline} />
          </div>
        </motion.header>

        {/* Body */}
        <article className="prose-custom mt-14 space-y-6">
          {c.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-[15.5px] leading-[1.85] text-foreground/85"
            >
              {p}
            </motion.p>
          ))}
        </article>

        {/* Chat transcript */}
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-serif text-2xl font-semibold">沟通记录</h2>
            <span className="text-xs text-muted-foreground">已征得当事人授权 · 隐去个人信息</span>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-[#EDEDED] p-4 sm:p-6">
            <div className="mx-auto max-w-md space-y-3">
              {c.chats.map((m, i) => (
                <ChatBubble key={i} m={m} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-border/60 bg-accent/20 p-8 text-center sm:p-12">
          <h3 className="font-serif text-2xl font-semibold sm:text-3xl">遇到了类似的情况?</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            预约一次结构化咨询,带走可执行的方案和下一步清单。咨询费可在签署正式服务协议时抵扣。
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background"
          >
            预约付费咨询
          </Link>
        </div>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4">
      <div className="rounded-xl bg-accent/60 p-2 text-foreground">{icon}</div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function ChatBubble({ m }: { m: ChatMessage }) {
  const isClient = m.from === "client";
  return (
    <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[78%]">
        {m.time && (
          <div className={`mb-1 text-[10px] text-muted-foreground ${isClient ? "text-left" : "text-right"}`}>
            {m.time}
          </div>
        )}
        {m.image ? (
          <div className={`flex items-center gap-2 rounded-2xl border border-border/60 bg-white p-3 text-xs text-muted-foreground ${isClient ? "rounded-tl-sm" : "rounded-tr-sm"}`}>
            <ImageIcon className="h-4 w-4" />
            {m.image}
          </div>
        ) : (
          <div
            className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
              isClient
                ? "rounded-tl-sm bg-white text-foreground"
                : "rounded-tr-sm bg-secondary text-foreground"
            }`}
          >
            {m.text}
          </div>
        )}
      </div>
    </div>
  );
}
