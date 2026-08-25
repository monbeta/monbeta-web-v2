import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArticleView } from "@/components/news/article-view";
import { NewsIndexView } from "@/components/news/news-index-view";
import { getAdminArticle } from "@/lib/cms";

export const Route = createFileRoute("/admin/news/$id/preview")({
  loader: async ({ params }) => {
    const article = await getAdminArticle({ data: { id: params.id } });
    if (!article) throw notFound();
    return { article };
  },
  component: ArticlePreviewPage,
});

function ArticlePreviewPage() {
  const { article } = Route.useLoaderData();
  const [view, setView] = useState<"list" | "article">("article");

  return (
    <div>
      <div className="fixed inset-x-0 top-16 z-40 border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-sm text-amber-950">
            {article.status === "published" ? "官网预览" : "草稿预览 · 公众看不到这篇文章"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                view === "list" ? "bg-amber-900 text-amber-50" : "bg-amber-100 text-amber-950"
              }`}
            >
              列表页
            </button>
            <button
              type="button"
              onClick={() => setView("article")}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                view === "article" ? "bg-amber-900 text-amber-50" : "bg-amber-100 text-amber-950"
              }`}
            >
              文章页
            </button>
            <Link
              to="/admin/news/$id"
              params={{ id: article.id }}
              className="rounded-full bg-background px-3 py-1 text-xs font-medium text-foreground"
            >
              返回编辑
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-12">
        {view === "list" ? (
          <NewsIndexView articles={[article]} tags={article.tags} preview />
        ) : (
          <ArticleView article={article} />
        )}
      </div>
    </div>
  );
}
