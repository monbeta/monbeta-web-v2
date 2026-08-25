import type { CSSProperties, ReactNode } from "react";
import type { TiptapJSON } from "@/db/schema";
import { cn } from "@/lib/utils";

function safeHref(href: unknown): string | null {
  if (typeof href !== "string") return null;
  const trimmed = href.trim();
  if (/^(https?:|mailto:|\/)/i.test(trimmed)) return trimmed;
  return null;
}

function safeSrc(src: unknown): string | null {
  if (typeof src !== "string") return null;
  const trimmed = src.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return null;
}

function TextInline({ node }: { node: TiptapJSON }) {
  if (node.type === "hardBreak") return <br />;
  if (node.type !== "text" || !node.text) return null;

  let el: ReactNode = node.text;
  const marks = node.marks ?? [];
  for (const mark of marks) {
    if (mark.type === "bold") el = <strong>{el}</strong>;
    if (mark.type === "italic") el = <em>{el}</em>;
    if (mark.type === "underline") el = <u>{el}</u>;
    if (mark.type === "strike") el = <s>{el}</s>;
    if (mark.type === "link") {
      const href = safeHref(mark.attrs?.href);
      if (href) {
        el = (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {el}
          </a>
        );
      }
    }
    if (mark.type === "textStyle") {
      const color = typeof mark.attrs?.color === "string" ? mark.attrs.color : undefined;
      if (color) el = <span style={{ color }}>{el}</span>;
    }
  }
  return <>{el}</>;
}

function Block({ node, index }: { node: TiptapJSON; index: number }) {
  const align =
    typeof node.attrs?.textAlign === "string" ? (node.attrs.textAlign as CSSProperties["textAlign"]) : undefined;
  const style = align ? { textAlign: align } : undefined;
  const children = node.content?.map((child, i) => {
    if (child.type === "text" || child.type === "hardBreak") {
      return <TextInline key={i} node={child} />;
    }
    return <Block key={i} node={child} index={i} />;
  });

  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return <p style={style}>{children ?? <br />}</p>;
    case "heading": {
      const level = Number(node.attrs?.level) || 2;
      if (level === 1) return <h1 style={style}>{children}</h1>;
      if (level === 3) return <h3 style={style}>{children}</h3>;
      return <h2 style={style}>{children}</h2>;
    }
    case "bulletList":
      return <ul>{children}</ul>;
    case "orderedList":
      return <ol>{children}</ol>;
    case "listItem":
      return <li>{children}</li>;
    case "blockquote":
      return <blockquote>{children}</blockquote>;
    case "horizontalRule":
      return <hr />;
    case "image": {
      const src = safeSrc(node.attrs?.src);
      const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
      if (!src) return null;
      return (
        <figure>
          <img src={src} alt={alt} />
        </figure>
      );
    }
    default:
      return <div key={index}>{children}</div>;
  }
}

export function ArticleBody({ body, className }: { body: TiptapJSON; className?: string }) {
  return (
    <div className={cn("article-body", className)}>
      <Block node={body} index={0} />
    </div>
  );
}
