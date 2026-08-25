import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTag, deleteTag, listTags, updateTag } from "@/lib/cms";
import { slugify } from "@/lib/slugify";

export const Route = createFileRoute("/admin/tags")({
  loader: () => listTags(),
  component: AdminTagsPage,
});

function AdminTagsPage() {
  const tags = Route.useLoaderData();
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const refresh = () => router.invalidate();

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createTag({ data: { name, slug: slug || slugify(name) } });
      setName("");
      setSlug("");
      toast.success("标签已创建");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    }
  };

  const onRename = async (id: string, currentName: string, currentSlug: string) => {
    const nextName = window.prompt("标签名称", currentName);
    if (!nextName) return;
    const nextSlug = window.prompt("slug", currentSlug) ?? currentSlug;
    try {
      await updateTag({ data: { id, name: nextName, slug: nextSlug } });
      toast.success("已更新");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "更新失败");
    }
  };

  const onDelete = async (id: string, tagName: string) => {
    if (!window.confirm(`删除标签「${tagName}」？文章上的该标签会被移除。`)) return;
    try {
      await deleteTag({ data: { id } });
      toast.success("已删除");
      await refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold">标签</h1>
      <form onSubmit={(event) => void onCreate(event)} className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="tag-name">
            名称
          </label>
          <Input
            id="tag-name"
            className="mt-1 w-48"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setSlug(slugify(event.target.value));
            }}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="tag-slug">
            slug
          </label>
          <Input
            id="tag-slug"
            className="mt-1 w-48 font-mono text-sm"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
        </div>
        <Button type="submit">添加</Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">
        用来生成URL Query，建议用英文 slug，例如 study-permit。中文可以用，但筛选链接复制后会变成编码。
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-card">
        {tags.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted-foreground">还没有标签。</p>
        ) : (
          <ul>
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center justify-between border-b border-border/50 px-4 py-3 last:border-0"
              >
                <div>
                  <div className="font-medium">{tag.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{tag.slug}</div>
                </div>
                <div className="flex gap-3 text-xs">
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => void onRename(tag.id, tag.name, tag.slug)}
                  >
                    编辑
                  </button>
                  <button
                    type="button"
                    className="text-destructive hover:underline"
                    onClick={() => void onDelete(tag.id, tag.name)}
                  >
                    删除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
