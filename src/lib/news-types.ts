import type { TiptapJSON } from "@/db/schema";

export const EMPTY_DOC: TiptapJSON = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export type ArticleTag = {
  id: string;
  name: string;
  slug: string;
};

export type ArticleListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverUrl: string | null;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
  tags: ArticleTag[];
};

export type ArticleDetail = ArticleListItem & {
  coverPublicId: string | null;
  body: TiptapJSON;
  createdAt: string;
  tagIds: string[];
};

export function cloudinaryThumb(url: string | null, width = 960): string | null {
  if (!url) return null;
  return url.replace("/upload/", `/upload/c_fill,w_${width},f_auto,q_auto/`);
}

export function excerptFromBody(body: TiptapJSON, max = 140): string {
  const parts: string[] = [];
  walkText(body, parts);
  const text = parts.join("").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function walkText(node: TiptapJSON, out: string[]) {
  if (node.text) out.push(node.text);
  node.content?.forEach((child) => walkText(child, out));
}

export function toIso(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}
