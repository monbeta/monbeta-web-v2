import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ArticleCard, ArticleFeatured } from "@/components/news/article-cards";
import type { ArticleListItem, ArticleTag } from "@/lib/news-types";

export function NewsIndexView({
  articles,
  tags,
  activeTag,
  preview = false,
}: {
  articles: ArticleListItem[];
  tags: ArticleTag[];
  activeTag?: string;
  preview?: boolean;
}) {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">News · 资讯动态</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            政策的<span className="text-gradient">每一处微调</span>，我们替您盯紧。
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            持续更新 IRCC 及各省提名项目的重要变化。简明、实用、不堆术语，让您快速掌握与自身申请相关的关键信息。
          </p>
        </motion.div>

        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {preview ? (
              <>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${activeTag ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}>
                  全部
                </span>
                {tags.map((item) => (
                  <span
                    key={item.id}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activeTag === item.slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </>
            ) : (
              <>
                <Link
                  to="/news"
                  className={`rounded-full px-3 py-1 text-xs font-medium ${activeTag ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  全部
                </Link>
                {tags.map((item) => (
                  <Link
                    key={item.id}
                    to="/news"
                    search={{ tag: item.slug }}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activeTag === item.slug
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        )}

        {articles.length === 0 ? (
          <p className="mt-16 text-muted-foreground">暂时还没有已发布的资讯。</p>
        ) : (
          <>
            {featured && (
              <div className="mt-14">
                <ArticleFeatured article={featured} preview={preview} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((item) => (
                  <ArticleCard key={item.id} article={item} preview={preview} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-14 text-center">
          {preview ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              想就具体案件聊聊？预约咨询 <ArrowRight className="h-4 w-4" />
            </span>
          ) : (
            <Link to="/book" className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary">
              想就具体案件聊聊？预约咨询 <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
