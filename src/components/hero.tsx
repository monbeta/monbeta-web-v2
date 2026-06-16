import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import dots from "@/lib/world-dots.json";

// Map coordinate space: 1000 × 500 (equirectangular).
const DOTS = dots as [number, number][];

// Vancouver lat 49.28, lon -123.12 -> ~(158, 113)
const VAN = { x: 158, y: 113 };

const ORIGINS: { name: string; x: number; y: number }[] = [
  { name: "Beijing", x: 823, y: 139 },
  { name: "Shanghai", x: 837, y: 163 },
  { name: "Hong Kong", x: 817, y: 188 },
  { name: "Tokyo", x: 888, y: 151 },
  { name: "Mumbai", x: 702, y: 197 },
  { name: "Dubai", x: 653, y: 180 },
  { name: "London", x: 499, y: 107 },
  { name: "Moscow", x: 604, y: 95 },
  { name: "São Paulo", x: 370, y: 315 },
  { name: "Sydney", x: 920, y: 344 },
  { name: "Lagos", x: 509, y: 232 },
];

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const bend = Math.min(70, len * 0.18);
  const cx = mx + (-dy / len) * bend * Math.sign(from.x - to.x || 1);
  const cy = my + (dx / len) * bend * Math.sign(from.x - to.x || 1) - bend * 0.3;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

/** Crop viewBox to land + overlays so the map fills the frame without excess polar/ocean padding. */
function buildMapViewBox() {
  const xs = [...DOTS.map(([x]) => x), ...ORIGINS.map((o) => o.x), VAN.x, VAN.x + 98];
  const ys = [
    ...DOTS.map(([, y]) => y),
    ...ORIGINS.map((o) => o.y),
    VAN.y - 38,
    VAN.y + 6,
    VAN.y - 14,
  ];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padX = 14;
  const padY = 8;
  return `${minX - padX} ${minY - padY} ${maxX - minX + padX * 2} ${maxY - minY + padY * 2}`;
}

const MAP_VIEWBOX = buildMapViewBox();

export function Hero() {
  return (
    <section className="relative isolate overflow-x-clip pt-28 pb-20 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute -top-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-secondary/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          CICC 持牌 RCIC-IRB · 温哥华
        </motion.div>

        <h1 className="mx-auto mt-6 max-w-4xl text-center font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          帮助世界各地的人才，
          <br />
          <span className="text-gradient">稳稳抵达加拿大。</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          MonBeta 移民留学咨询中心 · 持牌加拿大移民顾问 Tong Huang (RCIC-IRB)。
          一对一、结构化的咨询，让您看清选项、识别风险、带走可执行的方案。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/book"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            预约付费咨询
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white/70 px-7 py-3.5 text-sm font-medium backdrop-blur hover:bg-white"
          >
            查看服务项目
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="relative mx-auto mt-10 max-w-6xl sm:mt-12"
        >
          <div className="relative overflow-visible rounded-3xl border border-white/60 bg-white/40 p-3 shadow-[0_30px_80px_-30px_rgba(80,170,160,0.4)] backdrop-blur sm:p-4">
            <svg viewBox={MAP_VIEWBOX} overflow="visible" className="block w-full overflow-visible" aria-hidden preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="arc" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3D6B5D" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3D6B5D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2F5248" stopOpacity="1" />
                </linearGradient>
                <radialGradient id="pinGlow">
                  <stop offset="0%" stopColor="#3D6B5D" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#3D6B5D" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g fill="#2A3D38" opacity="0.28">
                {(dots as [number, number][]).map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="1.2" />
                ))}
              </g>

              {ORIGINS.map((o, i) => {
                const d = arcPath(o, VAN);
                return (
                  <g key={o.name}>
                    <path d={d} fill="none" stroke="#3D6B5D" strokeOpacity="0.18" strokeWidth="1" />
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#arc)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="0.18 1"
                      className="hero-arc"
                      style={{ animationDelay: `${0.6 + i * 0.22}s` }}
                    />
                    <motion.circle
                      cx={o.x}
                      cy={o.y}
                      r="3"
                      fill="#3D6B5D"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                    />
                  </g>
                );
              })}

              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                <circle cx={VAN.x} cy={VAN.y} r="36" fill="url(#pinGlow)" />
                <motion.circle
                  cx={VAN.x}
                  cy={VAN.y}
                  r="10"
                  fill="none"
                  stroke="#3D6B5D"
                  strokeWidth="1.5"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${VAN.x}px ${VAN.y}px` }}
                />
                <path
                  d={`M ${VAN.x} ${VAN.y - 18}
                      C ${VAN.x - 8} ${VAN.y - 18}, ${VAN.x - 8} ${VAN.y - 6}, ${VAN.x} ${VAN.y + 4}
                      C ${VAN.x + 8} ${VAN.y - 6}, ${VAN.x + 8} ${VAN.y - 18}, ${VAN.x} ${VAN.y - 18} Z`}
                  fill="#3D6B5D"
                />
                <circle cx={VAN.x} cy={VAN.y - 11} r="2.6" fill="#fff" />
                <g transform={`translate(${VAN.x + 12}, ${VAN.y - 14})`}>
                  <rect x="0" y="0" width="122" height="22" rx="11" fill="#fff" stroke="#3D6B5D" strokeOpacity="0.25" />
                  <text
                    x="10"
                    y="15"
                    fontSize="11"
                    fontFamily="Inter, Noto Sans SC, ui-sans-serif, system-ui"
                    fill="#2A3D38"
                    fontWeight="600"
                  >
                    Vancouver, Canada
                  </text>
                </g>
              </motion.g>
            </svg>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
