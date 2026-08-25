import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline as UnderlineIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { toast } from "sonner";
import { Toggle } from "@/components/ui/toggle";
import type { TiptapJSON } from "@/db/schema";
import { EMPTY_DOC } from "@/lib/news-types";
import { uploadToCloudinary } from "@/lib/upload-image";
import { cn } from "@/lib/utils";

function ToolbarButton({
  pressed,
  onPressedChange,
  children,
  label,
}: {
  pressed?: boolean;
  onPressedChange: () => void;
  children: ReactNode;
  label: string;
}) {
  return (
    <Toggle
      size="sm"
      pressed={pressed}
      onPressedChange={onPressedChange}
      aria-label={label}
      title={label}
    >
      {children}
    </Toggle>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("链接地址", previous ?? "https://");
    if (href === null) return;
    if (href.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };

  const insertImage = async (file: File) => {
    try {
      const uploaded = await uploadToCloudinary(file);
      editor.chain().focus().setImage({ src: uploaded.url }).run();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "图片上传失败");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border/70 bg-muted/40 px-2 py-1.5">
      <ToolbarButton
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        label="加粗"
      >
        <Bold />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        label="斜体"
      >
        <Italic />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        label="下划线"
      >
        <UnderlineIcon />
      </ToolbarButton>
      <ToolbarButton pressed={editor.isActive("link")} onPressedChange={setLink} label="链接">
        <LinkIcon />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        label="左对齐"
      >
        <AlignLeft />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
        label="居中"
      >
        <AlignCenter />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
        label="右对齐"
      >
        <AlignRight />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        label="无序列表"
      >
        <List />
      </ToolbarButton>
      <ToolbarButton
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        label="编号列表"
      >
        <ListOrdered />
      </ToolbarButton>
      <label className="ml-1 inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground">
        颜色
        <input
          type="color"
          className="h-5 w-7 cursor-pointer rounded border border-input bg-transparent"
          onInput={(event) => editor.chain().focus().setColor(event.currentTarget.value).run()}
        />
      </label>
      <button
        type="button"
        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted"
        onClick={() => fileRef.current?.click()}
      >
        <ImagePlus className="h-4 w-4" />
        插图
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void insertImage(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

export function TiptapEditor({
  value,
  onChange,
  className,
}: {
  value: TiptapJSON;
  onChange: (value: TiptapJSON) => void;
  className?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "在这里撰写正文。图片会插入在段落之间。" }),
    ],
    content: value?.type ? value : EMPTY_DOC,
    onUpdate: ({ editor: instance }) => {
      onChange(instance.getJSON() as TiptapJSON);
    },
    editorProps: {
      attributes: {
        class: "tiptap min-h-[280px] px-4 py-3 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return (
      <div className={cn("rounded-xl border border-border/70 bg-background", className)}>
        <div className="px-4 py-10 text-sm text-muted-foreground">编辑器加载中…</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border/70 bg-background", className)}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
