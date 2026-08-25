import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleView } from "@/components/news/article-view";
import { getPublishedArticleBySlug } from "@/lib/cms";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const article = await getPublishedArticleBySlug({ data: { slug: params.slug } });
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — MonBeta 资讯` },
          { name: "description", content: loaderData.article.excerpt ?? loaderData.article.title },
          { property: "og:title", content: loaderData.article.title },
          { property: "og:description", content: loaderData.article.excerpt ?? loaderData.article.title },
        ]
      : [],
  }),
  component: NewsDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-3xl">文章未找到</h1>
        <Link to="/news" className="mt-4 inline-block text-primary">
          返回资讯列表
        </Link>
      </div>
    </div>
  ),
});

function NewsDetailPage() {
  const { article } = Route.useLoaderData();
  return <ArticleView article={article} />;
}
