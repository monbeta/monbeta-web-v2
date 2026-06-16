import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  screenshots: string[];
  className?: string;
  compact?: boolean;
};

export function TestimonialChatGallery({ screenshots, className, compact = false }: Props) {
  const [active, setActive] = useState<string | null>(null);

  if (screenshots.length === 0) return null;

  return (
    <>
      <div className={cn("grid gap-3", compact ? "grid-cols-3" : "sm:grid-cols-2", className)}>
        {screenshots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            className={cn(
              "group overflow-hidden rounded-2xl border border-border/60 bg-[#EDEDED] text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              compact && "aspect-[3/4]",
            )}
          >
            <img
              src={src}
              alt={`聊天截图 ${i + 1}`}
              className={cn(
                "w-full object-cover object-top transition-transform group-hover:scale-[1.02]",
                compact ? "h-full" : "max-h-80",
              )}
            />
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-none bg-transparent p-2 shadow-none sm:p-4">
          {active && (
            <img
              src={active}
              alt="聊天截图放大"
              className="mx-auto max-h-[85vh] w-auto rounded-2xl border border-border/40 bg-[#EDEDED] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
