import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Award, Shield, MapPin, GraduationCap, AlertTriangle, ArrowRight, FileBadge } from "lucide-react";
import { AVOIDED_PROGRAMS } from "@/lib/services-data";
import rcic from "@/assets/rcic.png";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">About · 关于我们</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            Tong (Becky) Huang —— <span className="text-gradient">您在加拿大的同行人</span>。
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            MonBeta 移民留学咨询中心由持牌加拿大移民顾问 Tong Huang (RCIC-IRB) 创立并独立运营。
            我们刻意保持"一个顾问 · 一个客户"的节奏 —— 每一个 case 都由她本人评估、撰写并递交。
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <Section title="关于顾问">
              <p>
                Tong (Becky) Huang 现居加拿大温哥华，持有加拿大移民顾问学院 (CICC) 颁发的
                <strong> Regulated Canadian Immigration Consultant — IRB</strong> 牌照
                (License No. <span className="font-mono">R706081</span>)，
                可代表客户出庭加拿大移民与难民委员会 (IRB) 听证程序，并为联邦及大多数省份的签证、移民、留学事务提供合规代理。
              </p>
              <p>
                在创立 MonBeta 之前，Becky 长期处理境内拒签补救与执法类事务，对 PFL 回复、ARC、TRP、Restoration 等"压力大、容错低"的案件有丰富实战经验。
              </p>
            </Section>

            <Section title="工作方式">
              <ul className="space-y-4">
                {[
                  { title: "一对一沟通", desc: "评估、撰写、递交全部由顾问本人负责，不外包。" },
                  { title: "结构化咨询", desc: "每次会议结束后提供书面方案与下一步清单。" },
                  { title: "明确范围", desc: "可做的与不可做的当面说清，不为收费扩大承诺。" },
                  { title: "全程合规", desc: "所有沟通与文件留痕，符合 CICC Code of Professional Conduct。" },
                ].map(({ title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0">
                      <div className="font-semibold leading-snug">{title}</div>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground/75">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-white p-5 shadow-xl">
              <img src={rcic} alt="CICC RCIC-IRB Certificate - Tong Huang" className="w-full rounded-xl" />
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground"><Shield className="h-3.5 w-3.5" /> CICC 持牌</div>
                <div className="font-mono">R706081 · IRB</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat icon={<Award className="h-5 w-5" />} label="资质" value="RCIC-IRB" />
              <Stat icon={<MapPin className="h-5 w-5" />} label="所在地" value="Vancouver" />
              <Stat icon={<FileBadge className="h-5 w-5" />} label="License" value="R706081" />
              <Stat icon={<GraduationCap className="h-5 w-5" />} label="背景" value="留学 + 移民" />
            </div>

          </div>
        </div>

        {/* avoided */}
        <div className="mt-20 rounded-3xl border border-amber-200 bg-amber-50/50 p-8 sm:p-12">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 text-amber-600" />
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">Avoided · 我们不做的事</div>
              <h2 className="mt-1 font-serif text-3xl font-semibold">为了让您不走弯路</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {AVOIDED_PROGRAMS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-amber-200/70 bg-white p-5">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background">
            预约一次咨询 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-7">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4">
      <div className="text-primary">{icon}</div>
      <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
