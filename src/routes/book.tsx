import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Clock, Video, AlertTriangle, ArrowRight } from "lucide-react";
import xhsQr from "@/assets/xiaohongshu-qr.jpg";

export const Route = createFileRoute("/book")({ component: BookPage });

const FEES = [
  { len: 15, price: 99, tag: "快速答疑" },
  { len: 30, price: 179, tag: "最受欢迎", featured: true },
  { len: 45, price: 239, tag: "深度梳理" },
  { len: 60, price: 299, tag: "完整方案" },
];

const TOPICS = [
  "移民规划 / 永居路径",
  "学签申请或续签",
  "工签 / PGWP / 配偶工签",
  "访问签证 / 超级签证",
  "拒签 / PFL 回复 / 补救",
  "身份恢复 / ARC / TRP",
  "其他（请在备注中说明）",
];

const schema = z.object({
  name: z.string().trim().min(1, "请填写姓名").max(80),
  email: z.string().trim().email("请输入有效邮箱").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  wechat: z.string().trim().max(80).optional().or(z.literal("")),
  topic: z.string().min(1, "请选择咨询主题"),
  length: z.number(),
  date: z.string().min(1, "请选择日期"),
  time: z.string().min(1, "请选择时间"),
  timezone: z.string().min(1),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

function BookPage() {
  const [length, setLength] = useState(30);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      wechat: String(fd.get("wechat") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      length,
      date: String(fd.get("date") ?? ""),
      time: String(fd.get("time") ?? ""),
      timezone: String(fd.get("timezone") ?? "America/Vancouver"),
      notes: String(fd.get("notes") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "请检查填写信息");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("预约已提交！我们将在 1 个工作日内通过邮件与您确认时间与支付链接。");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Book · 预约咨询</div>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-6xl text-balance">
            预约与 Tong 的<span className="text-gradient">一对一咨询</span>。
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            选择时长、留下信息与意向时间，我们将在 1 个工作日内通过邮件确认时间并发送支付链接。
            <strong className="text-foreground"> 预约在您完成 Initial Consultation Agreement 之后正式生效。</strong>
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card p-7 sm:p-10">
            {/* length picker */}
            <Label>咨询时长 (CAD)</Label>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FEES.map((f) => (
                <button
                  type="button"
                  key={f.len}
                  onClick={() => setLength(f.len)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    length === f.len
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/60 bg-background hover:border-foreground/40"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-semibold">{f.len} 分钟</div>
                  </div>
                  <div className="mt-1 text-sm opacity-80">${f.price}</div>
                  <div className={`mt-2 text-[10px] uppercase tracking-widest ${length === f.len ? "opacity-80" : "text-muted-foreground"}`}>
                    {f.tag}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="姓名 *"><input name="name" required className={inputCls} placeholder="例如：张三" maxLength={80} /></Field>
              <Field label="邮箱 *"><input name="email" required type="email" className={inputCls} placeholder="you@example.com" maxLength={160} /></Field>
              <Field label="电话 (可选)"><input name="phone" className={inputCls} placeholder="+1 604 000 0000" maxLength={40} /></Field>
              <Field label="微信 (可选)"><input name="wechat" className={inputCls} maxLength={80} /></Field>
            </div>

            <Field label="咨询主题 *" className="mt-4">
              <select name="topic" required defaultValue="" className={inputCls}>
                <option value="" disabled>请选择…</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="期望日期 *"><input name="date" type="date" required className={inputCls} /></Field>
              <Field label="期望时间 *"><input name="time" type="time" required className={inputCls} /></Field>
              <Field label="时区">
                <select name="timezone" defaultValue="America/Vancouver" className={inputCls}>
                  <option value="America/Vancouver">温哥华 PST/PDT</option>
                  <option value="America/Toronto">多伦多 EST/EDT</option>
                  <option value="Asia/Shanghai">中国 CST</option>
                  <option value="Asia/Hong_Kong">香港 HKT</option>
                </select>
              </Field>
            </div>

            <Field label="备注 (可选)" className="mt-4">
              <textarea name="notes" rows={4} maxLength={1000} className={`${inputCls} resize-none`} placeholder="简要描述您的情况、目前签证状态、希望讨论的问题等。" />
            </Field>

            <div className="mt-6 flex items-start gap-2 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                咨询费 <strong>不可退款</strong>。如未在预约时间出席，将不再安排补时段；如签署正式服务协议，每个案件最多可抵扣一次咨询费。
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {submitting ? "提交中…" : <>提交预约请求 <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border/60 bg-card p-7">
              <h3 className="font-serif text-xl font-semibold">您将获得</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {["对您当前情况与目标的结构化梳理", "可执行的下一步与材料清单", "潜在风险提前预警 (含执法与不可受理事项)", "对您而言最合理的方案与替代选项"].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-7">
              <h3 className="font-serif text-xl font-semibold">范围与限制</h3>
              <ul className="mt-4 space-y-3 text-sm text-foreground/85">
                <li className="flex gap-2"><Video className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> 所有咨询通过 <strong>Zoom</strong> 在线进行</li>
                <li className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> 仅接受加拿大移民 / 难民 / 签证相关事务</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card p-7">
              <h3 className="font-serif text-xl font-semibold">小红书</h3>
              <p className="mt-2 text-sm text-muted-foreground">扫码关注，预约前可先浏览案例与政策解读。</p>
              <div className="mt-4 flex items-center gap-5">
                <img
                  src={xhsQr}
                  alt="小红书二维码"
                  className="h-28 w-28 shrink-0 rounded-lg bg-white object-contain"
                />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">BeckyHuang1234</div>
                  <div className="mt-1 text-sm font-semibold">Becky 是签证小能手</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-7">
              <h3 className="font-serif text-lg font-semibold">还没准备好预约？</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                您可以先填写免费评估表，我们会审阅并仅在识别到可行方案时联系您。
              </p>
              <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
                免费评估表 <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border/70 bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-foreground/60 focus:ring-2 focus:ring-primary/30";

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{children}</div>;
}
function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
