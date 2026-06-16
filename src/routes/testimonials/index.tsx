import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { TestimonialStories } from "@/components/testimonial-stories";

export const Route = createFileRoute("/testimonials/")({ component: TestimonialsPage });

function TestimonialsPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Testimonials · 客户评价</div>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl text-balance">
            三段经历，一份<span className="text-gradient">信任</span>。
          </h1>
          <p className="mt-4 text-base text-muted-foreground">均经当事人授权 · 点击查看完整评价与聊天截图。</p>
        </motion.div>

        <div className="mt-14">
          <TestimonialStories />
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background"
          >
            开始您自己的故事 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
