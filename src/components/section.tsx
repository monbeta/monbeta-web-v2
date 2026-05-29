import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
          )}
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-snug tracking-tight sm:text-5xl sm:leading-[1.15] text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
          )}
        </motion.div>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
