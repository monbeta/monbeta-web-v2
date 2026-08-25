import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { cloudinaryThumb, type ArticleListItem } from "@/lib/news-types";

function ArticleLink({
  article,
  disabled,
  className,
  children,
}: {
  article: ArticleListItem;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (disabled) return <div className={className}>{children}</div>;
  return (
    <Link to="/news/$slug" params={{ slug: article.slug }} className={className}>
      {children}
    </Link>
  );
}

function Meta({ article }: { article: ArticleListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {article.tags[0] && (
        <span className="rounded-full bg-accent/60 px-2.5 py-1 font-medium text-foreground/80">
          {article.tags[0].name}
        </span>
      )}
      <span className="flex items-center gap-1 text-muted-foreground">
        <Calendar className="h-3 w-3" /> {(article.publishedAt ?? article.updatedAt).slice(0, 10)}
      </span>
    </div>
  );
}

export function ArticleFeatured({
  article,
  preview = false,
}: {
  article: ArticleListItem;
  preview?: boolean;
}) {
  const cover = cloudinaryThumb(article.coverUrl, 1200);
  return (
    <ArticleLink article={article} disabled={preview} className="block">
      <article className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:shadow-md">
        <div className={cover ? "grid lg:grid-cols-2" : ""}>
          {cover && (
            <div className="bg-muted">
              <img
                src={cover}
                alt=""
                className="h-56 w-full object-cover sm:h-72 lg:h-full lg:min-h-[320px]"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <Meta article={article} />
            <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl text-balance">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground">{article.excerpt}</p>
            )}
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              阅读全文 <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </ArticleLink>
  );
}

export function ArticleCard({
  article,
  preview = false,
}: {
  article: ArticleListItem;
  preview?: boolean;
}) {
  const cover = cloudinaryThumb(article.coverUrl, 800);
  return (
    <ArticleLink article={article} disabled={preview} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-md">
        {cover && (
          <div className="bg-muted">
            <img src={cover} alt="" className="aspect-[16/10] w-full object-cover" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <Meta article={article} />
          <h3 className="mt-4 font-serif text-xl font-semibold leading-snug">{article.title}</h3>
          {article.excerpt && (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            阅读全文 <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </ArticleLink>
  );
}
