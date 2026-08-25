import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleEditor } from "@/components/admin/article-editor";
import { getAdminArticle, listTags } from "@/lib/cms";

export const Route = createFileRoute("/admin/news/$id/")({
  loader: async ({ params }) => {
    const [article, tags] = await Promise.all([
      getAdminArticle({ data: { id: params.id } }),
      listTags(),
    ]);
    if (!article) throw notFound();
    return { article, tags };
  },
  component: EditArticlePage,
});

function EditArticlePage() {
  const { article, tags } = Route.useLoaderData();
  return <ArticleEditor article={article} allTags={tags} />;
}
