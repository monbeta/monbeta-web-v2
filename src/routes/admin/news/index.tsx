import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteArticle, listAdminArticles } from "@/lib/cms";

export const Route = createFileRoute("/admin/news/")({
  loader: () => listAdminArticles(),
  component: AdminNewsList,
});

function AdminNewsList() {
  const articles = Route.useLoaderData();
  const router = useRouter();

  const onDelete = async (id: string, title: string) => {
    if (!window.confirm(`确定删除「${title}」？此操作不可恢复。`)) return;
    try {
      await deleteArticle({ data: { id } });
      toast.success("已删除");
      await router.invalidate();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold">文章</h1>
        <Button asChild>
          <Link to="/admin/news/new">新建文章</Link>
        </Button>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border/70 bg-card">
        {articles.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted-foreground">还没有文章。先创建一篇草稿。</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/70 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">标题</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3 font-medium">标签</th>
                <th className="px-4 py-3 font-medium">更新</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3">
                    <Link to="/admin/news/$id" params={{ id: article.id }} className="font-medium hover:text-primary">
                      {article.title || "无标题"}
                    </Link>
                    <div className="font-mono text-xs text-muted-foreground">/{article.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        article.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {article.status === "published" ? "已发布" : "草稿"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {article.tags.map((tag) => tag.name).join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{article.updatedAt.slice(0, 10)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to="/admin/news/$id/preview"
                      params={{ id: article.id }}
                      className="mr-3 text-xs text-muted-foreground hover:text-foreground"
                    >
                      预览
                    </Link>
                    <button
                      type="button"
                      className="text-xs text-destructive hover:underline"
                      onClick={() => void onDelete(article.id, article.title)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
