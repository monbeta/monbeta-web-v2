import { and, desc, eq, lte } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getDb } from "@/db";
import { articleTags, articles, tags } from "@/db/schema";
import { requireAdminFromHeaders } from "@/lib/auth-session";
import {
  EMPTY_DOC,
  excerptFromBody,
  toIso,
  type ArticleDetail,
  type ArticleListItem,
  type ArticleTag,
} from "@/lib/news-types";
import { slugify } from "@/lib/slugify";
import type { TiptapJSON } from "@/db/schema";

function throwUniqueOrRethrow(error: unknown, message: string): never {
  const text = error instanceof Error ? error.message : String(error);
  if (/unique|duplicate/i.test(text)) throw new Error(message);
  throw error;
}

function mapTags(
  rows: Array<{ tag: { id: string; name: string; slug: string } | null }>,
): ArticleTag[] {
  return rows
    .map((row) => row.tag)
    .filter((tag): tag is ArticleTag => Boolean(tag));
}

function toListItem(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  status: "draft" | "published";
  publishedAt: Date | null;
  updatedAt: Date;
  articleTags: Array<{ tag: { id: string; name: string; slug: string } | null }>;
}): ArticleListItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverUrl: row.coverUrl,
    status: row.status,
    publishedAt: toIso(row.publishedAt),
    updatedAt: toIso(row.updatedAt) ?? new Date().toISOString(),
    tags: mapTags(row.articleTags),
  };
}

async function replaceArticleTags(articleId: string, tagIds: string[]) {
  const db = getDb();
  await db.delete(articleTags).where(eq(articleTags.articleId, articleId));
  if (tagIds.length === 0) return;
  await db.insert(articleTags).values(tagIds.map((tagId) => ({ articleId, tagId })));
}

async function loadArticle(id: string): Promise<ArticleDetail | null> {
  const db = getDb();
  const row = await db.query.articles.findFirst({
    where: eq(articles.id, id),
    with: { articleTags: { with: { tag: true } } },
  });
  if (!row) return null;
  const mapped = toListItem(row);
  return {
    ...mapped,
    coverPublicId: row.coverPublicId,
    body: row.body,
    createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
    tagIds: mapped.tags.map((tag) => tag.id),
  };
}

async function requireAdminSession() {
  return requireAdminFromHeaders(getRequest().headers);
}

export const listTags = createServerFn({ method: "GET" }).handler(async () => {
  const db = getDb();
  return db.select().from(tags).orderBy(tags.name);
});

export const createTag = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; slug?: string }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const name = data.name.trim();
    if (!name) throw new Error("标签名称不能为空");
    const slug = slugify(data.slug?.trim() || name);
    const id = crypto.randomUUID();
    try {
      await getDb().insert(tags).values({ id, name, slug });
    } catch (error) {
      throwUniqueOrRethrow(error, "这个标签 slug 已被占用");
    }
    return { id, name, slug };
  });

export const updateTag = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; name: string; slug: string }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const name = data.name.trim();
    const slug = slugify(data.slug.trim() || name);
    if (!name) throw new Error("标签名称不能为空");
    await getDb()
      .update(tags)
      .set({ name, slug })
      .where(eq(tags.id, data.id));
    return { id: data.id, name, slug };
  });

export const deleteTag = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    await getDb().delete(tags).where(eq(tags.id, data.id));
    return { ok: true as const };
  });

export const listAdminArticles = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminSession();
  const rows = await getDb().query.articles.findMany({
    orderBy: [desc(articles.updatedAt)],
    with: { articleTags: { with: { tag: true } } },
  });
  return rows.map(toListItem);
});

export const getAdminArticle = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const article = await loadArticle(data.id);
    if (!article) throw new Error("文章不存在");
    return article;
  });

type SaveArticleInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverPublicId: string | null;
  coverUrl: string | null;
  body: TiptapJSON;
  tagIds: string[];
  status: "draft" | "published";
  publishedAt: string | null;
};

export const saveArticle = createServerFn({ method: "POST" })
  .inputValidator((data: SaveArticleInput) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    const title = data.title.trim();
    if (!title) throw new Error("标题不能为空");
    const slug = slugify(data.slug.trim() || title);
    const excerpt = data.excerpt.trim() || excerptFromBody(data.body) || null;
    const body = data.body?.type ? data.body : EMPTY_DOC;
    const now = new Date();
    let publishedAt: Date | null = null;
    if (data.status === "published") {
      publishedAt = data.publishedAt ? new Date(data.publishedAt) : now;
    } else if (data.publishedAt) {
      publishedAt = new Date(data.publishedAt);
    }

    const db = getDb();
    const id = data.id ?? crypto.randomUUID();

    try {
      if (data.id) {
        await db
          .update(articles)
          .set({
            title,
            slug,
            excerpt,
            coverPublicId: data.coverPublicId,
            coverUrl: data.coverUrl,
            body,
            status: data.status,
            publishedAt,
            updatedAt: now,
          })
          .where(eq(articles.id, id));
      } else {
        await db.insert(articles).values({
          id,
          title,
          slug,
          excerpt,
          coverPublicId: data.coverPublicId,
          coverUrl: data.coverUrl,
          body,
          status: data.status,
          publishedAt,
          createdAt: now,
          updatedAt: now,
        });
      }
    } catch (error) {
      throwUniqueOrRethrow(error, "这个 slug 已被占用，请换一个");
    }

    await replaceArticleTags(id, data.tagIds);
    const saved = await loadArticle(id);
    if (!saved) throw new Error("保存失败");
    return saved;
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireAdminSession();
    await getDb().delete(articles).where(eq(articles.id, data.id));
    return { ok: true as const };
  });

export const listPublishedArticles = createServerFn({ method: "GET" })
  .inputValidator((data: { tag?: string }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    const now = new Date();
    const rows = await db.query.articles.findMany({
      where: and(eq(articles.status, "published"), lte(articles.publishedAt, now)),
      orderBy: [desc(articles.publishedAt)],
      with: { articleTags: { with: { tag: true } } },
    });
    const mapped = rows.map(toListItem);
    if (!data.tag) return mapped;
    return mapped.filter((article) => article.tags.some((tag) => tag.slug === data.tag));
  });

export const getPublishedArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const db = getDb();
    const row = await db.query.articles.findFirst({
      where: eq(articles.slug, data.slug),
      with: { articleTags: { with: { tag: true } } },
    });
    if (!row || row.status !== "published") return null;
    if (!row.publishedAt || row.publishedAt > new Date()) return null;
    return {
      ...toListItem(row),
      coverPublicId: row.coverPublicId,
      body: row.body,
      createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
      tagIds: mapTags(row.articleTags).map((tag) => tag.id),
    } satisfies ArticleDetail;
  });
