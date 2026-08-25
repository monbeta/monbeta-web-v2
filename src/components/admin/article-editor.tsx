import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TiptapJSON } from "@/db/schema";
import { saveArticle } from "@/lib/cms";
import { EMPTY_DOC, type ArticleDetail, type ArticleTag } from "@/lib/news-types";
import { slugify } from "@/lib/slugify";
import { uploadToCloudinary } from "@/lib/upload-image";

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function ArticleEditor({
  article,
  allTags,
}: {
  article?: ArticleDetail;
  allTags: ArticleTag[];
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article?.slug));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [coverPublicId, setCoverPublicId] = useState(article?.coverPublicId ?? null);
  const [coverUrl, setCoverUrl] = useState(article?.coverUrl ?? null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [body, setBody] = useState<TiptapJSON>(article?.body ?? EMPTY_DOC);
  const [tagIds, setTagIds] = useState<string[]>(article?.tagIds ?? []);
  const [publishedAt, setPublishedAt] = useState(toDatetimeLocal(article?.publishedAt ?? null));
  const [saving, setSaving] = useState<"draft" | "publish" | "preview" | null>(null);

  const payload = useMemo(
    () => ({
      id: article?.id,
      title,
      slug: slug || slugify(title),
      excerpt,
      coverPublicId,
      coverUrl,
      body,
      tagIds,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
    }),
    [article?.id, title, slug, excerpt, coverPublicId, coverUrl, body, tagIds, publishedAt],
  );
  const payloadRef = useRef(payload);
  payloadRef.current = payload;

  const persist = async (status: "draft" | "published") => {
    return saveArticle({ data: { ...payloadRef.current, status } });
  };

  const onSaveDraft = async () => {
    setSaving("draft");
    try {
      const saved = await persist("draft");
      toast.success("草稿已保存");
      if (!article) {
        await navigate({ to: "/admin/news/$id", params: { id: saved.id } });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "保存失败");
    } finally {
      setSaving(null);
    }
  };

  const onPublish = async () => {
    setSaving("publish");
    try {
      await persist("published");
      toast.success("已发布");
      await navigate({ to: "/admin/news" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "发布失败");
      setSaving(null);
    }
  };

  const onPreview = async () => {
    setSaving("preview");
    try {
      const saved = await persist(article?.status === "published" ? "published" : "draft");
      await navigate({ to: "/admin/news/$id/preview", params: { id: saved.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "保存失败");
      setSaving(null);
    }
  };

  const onCover = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("封面请小于 10MB");
      return;
    }
    setCoverUploading(true);
    try {
      const uploaded = await uploadToCloudinary(file);
      setCoverPublicId(uploaded.publicId);
      setCoverUrl(uploaded.url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "封面上传失败");
    } finally {
      setCoverUploading(false);
    }
  };

  const busy = Boolean(saving) || coverUploading;

  const toggleTag = (id: string) => {
    setTagIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            to="/admin/news"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>
          <h1 className="font-serif text-2xl font-semibold">{article ? "编辑文章" : "新建文章"}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" disabled={busy} onClick={() => void onSaveDraft()}>
            {saving === "draft" ? "保存中…" : "保存草稿"}
          </Button>
          <Button variant="outline" disabled={busy} onClick={() => void onPreview()}>
            {saving === "preview" ? "保存中…" : "保存并预览"}
          </Button>
          <Button disabled={busy} onClick={() => void onPublish()}>
            {saving === "publish" ? "发布中…" : article?.status === "published" ? "更新并保持发布" : "发布"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              className="mt-1.5"
              value={title}
              onChange={(event) => {
                const next = event.target.value;
                setTitle(next);
                if (!slugTouched) setSlug(slugify(next));
              }}
            />
          </div>
          <div>
            <Label htmlFor="slug">URL slug</Label>
            <Input
              id="slug"
              className="mt-1.5 font-mono text-sm"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              用来生成URL的，建议用英文+日期组合，例如 oinp-draw-20250816。中文也能打开，但复制链接会变成一长串编码。
            </p>
          </div>
          <div>
            <Label htmlFor="excerpt">摘要</Label>
            <Textarea
              id="excerpt"
              className="mt-1.5 min-h-24"
              placeholder="列表页展示；留空则从正文截取"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
            />
          </div>
          <div>
            <Label>正文</Label>
            <div className="mt-1.5">
              <TiptapEditor value={body} onChange={setBody} />
            </div>
          </div>
        </div>

        <aside className="space-y-5 rounded-2xl border border-border/70 bg-card p-5">
          <div>
            <Label>封面</Label>
            {coverUrl && (
              <img src={coverUrl} alt="" className="mt-2 h-36 w-full rounded-xl bg-muted object-contain" />
            )}
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-2"
              disabled={coverUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) void onCover(file);
              }}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {coverUploading ? "正在上传封面…" : "选图后会马上传到图床，再点保存或发布才会写入文章。"}
            </p>
            {coverUrl && (
              <button
                type="button"
                className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setCoverPublicId(null);
                  setCoverUrl(null);
                }}
              >
                移除封面
              </button>
            )}
          </div>
          <div>
            <Label htmlFor="publishedAt">发布时间</Label>
            <Input
              id="publishedAt"
              type="datetime-local"
              className="mt-1.5"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">发布时若为空则使用当前时间</p>
          </div>
          <div>
            <Label>标签</Label>
            <div className="mt-2 space-y-2">
              {allTags.length === 0 && (
                <p className="text-xs text-muted-foreground">还没有标签，请先到标签页创建。</p>
              )}
              {allTags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-2 text-sm">
                  <Checkbox checked={tagIds.includes(tag.id)} onCheckedChange={() => toggleTag(tag.id)} />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
