import { createFileRoute } from "@tanstack/react-router";
import { NewsIndexView } from "@/components/news/news-index-view";
import { listPublishedArticles, listTags } from "@/lib/cms";

type NewsSearch = { tag?: string };

export const Route = createFileRoute("/news/")({
  validateSearch: (search: Record<string, unknown>): NewsSearch => ({
    tag: typeof search.tag === "string" && search.tag ? search.tag : undefined,
  }),
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps }) => {
    const [articles, tags] = await Promise.all([
      listPublishedArticles({ data: { tag: deps.tag } }),
      listTags(),
    ]);
    return { articles, tags };
  },
  component: NewsPage,
});

function NewsPage() {
  const { articles, tags } = Route.useLoaderData();
  const { tag } = Route.useSearch();
  return <NewsIndexView articles={articles} tags={tags} activeTag={tag} />;
}
