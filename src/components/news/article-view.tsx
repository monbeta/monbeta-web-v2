import { Calendar } from "lucide-react";
import { ArticleBody } from "@/components/news/article-body";
import { cloudinaryThumb, type ArticleDetail } from "@/lib/news-types";

export function ArticleView({ article }: { article: ArticleDetail }) {
  const date = article.publishedAt ?? article.updatedAt;
  const cover = cloudinaryThumb(article.coverUrl, 1400);

  return (
    <div className="pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">News · 资讯动态</div>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl text-balance">
          {article.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date.slice(0, 10)}
          </span>
          {article.tags.map((tag) => (
            <span key={tag.id} className="rounded-full bg-accent/60 px-2.5 py-1 text-xs font-medium text-foreground/80">
              {tag.name}
            </span>
          ))}
        </div>
        {article.excerpt && <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>}
        {cover && (
          <img src={cover} alt="" className="mt-8 w-full rounded-3xl border border-border/60 object-cover" />
        )}
        <ArticleBody body={article.body} className="mt-10" />
      </article>
    </div>
  );
}
