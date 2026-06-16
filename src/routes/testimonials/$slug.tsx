import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials-data";
import { TestimonialChatGallery } from "@/components/testimonial-chat-gallery";

export const Route = createFileRoute("/testimonials/$slug")({
  loader: ({ params }) => {
    const t = TESTIMONIALS.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return { testimonial: t };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.testimonial.author} 的评价 — MonBeta 客户评价` },
          { name: "description", content: loaderData.testimonial.excerpt },
          { property: "og:title", content: `${loaderData.testimonial.author} 的评价` },
          { property: "og:description", content: loaderData.testimonial.excerpt },
        ]
      : [],
  }),
  component: TestimonialDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-3xl">评价未找到</h1>
        <Link to="/testimonials" className="mt-4 inline-block text-primary">
          返回客户评价
        </Link>
      </div>
    </div>
  ),
});

function TestimonialDetail() {
  const { testimonial: t } = Route.useLoaderData();

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/testimonials"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> 返回客户评价
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Quote className="h-10 w-10 text-primary/25" />
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl text-balance">
            {t.headline}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">{t.author}</span>
            {t.timeline && (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {t.timeline}
              </span>
            )}
          </div>

          {t.services.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {t.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent/50 px-3 py-1 text-xs font-medium text-foreground/75"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {t.screenshots.length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold">原始聊天截图</h2>
            <p className="mt-1 text-sm text-muted-foreground">经当事人授权 · 点击可放大查看</p>
            <TestimonialChatGallery screenshots={t.screenshots} className="mt-5" />
          </section>
        )}

        <article className="mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-8 sm:p-10">
          {t.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="whitespace-pre-wrap text-[15.5px] leading-[1.9] text-foreground/85"
            >
              {p}
            </motion.p>
          ))}
        </article>

        <p className="mt-8 text-center text-xs text-muted-foreground">经当事人授权发布 · 隐去可识别个人信息</p>

        <div className="mt-10 rounded-3xl border border-border/60 bg-accent/20 p-8 text-center sm:p-10">
          <h3 className="font-serif text-2xl font-semibold">也想获得同样踏实的支持？</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            预约一次结构化咨询，带走可执行的方案和下一步清单。咨询费可在签署正式服务协议时抵扣。
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
