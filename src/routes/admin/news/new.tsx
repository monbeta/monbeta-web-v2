import { createFileRoute } from "@tanstack/react-router";
import { ArticleEditor } from "@/components/admin/article-editor";
import { listTags } from "@/lib/cms";

export const Route = createFileRoute("/admin/news/new")({
  loader: () => listTags(),
  component: NewArticlePage,
});

function NewArticlePage() {
  const tags = Route.useLoaderData();
  return <ArticleEditor allTags={tags} />;
}
