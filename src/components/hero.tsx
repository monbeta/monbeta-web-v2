import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32">
      {/* Animated sky background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#EAF8F8] via-[#F2FBF4] to-background" />

      {/* Drifting clouds */}
      <Cloud className="absolute top-24 left-[-8%] h-16 w-40 text-white/90 animate-drift-slow [animation-duration:60s]" />
      <Cloud className="absolute top-40 left-[-15%] h-12 w-28 text-white/70 animate-drift-slow [animation-duration:90s] [animation-delay:-20s]" />
      <Cloud className="absolute top-64 left-[-10%] h-20 w-52 text-white/80 animate-drift-slow [animation-duration:75s] [animation-delay:-40s]" />

      {/* Soft blobs */}
      <div className="absolute -top-20 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#AFEEEE]/40 blur-3xl animate-blob" />
      <div className="absolute bottom-0 -left-32 -z-10 h-[24rem] w-[24rem] rounded-full bg-[#ADEBB3]/40 blur-3xl animate-blob [animation-delay:-4s]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-primary/30 bg-white/60 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          CICC 持牌 RCIC-IRB · 温哥华
        </motion.div>

        <h1 className="mx-auto mt-6 max-w-4xl text-center font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {"在加拿大，".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04, duration: 0.6 }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gradient"
          >
            走得清楚，走得稳。
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          MonBeta 移民留学咨询中心 · 持牌加拿大移民顾问 Tong Huang (RCIC-IRB)。
          一对一、结构化的咨询，让您看清选项、识别风险、带走一份可执行的方案。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
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

        {/* Hero scene — animated mountains */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/30 shadow-[0_30px_80px_-30px_rgba(80,170,160,0.45)] backdrop-blur">
            <svg viewBox="0 0 1200 480" className="block w-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#CFEEF0" />
                  <stop offset="1" stopColor="#F5FBF7" />
                </linearGradient>
                <linearGradient id="mt1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#7BC58B" />
                  <stop offset="1" stopColor="#D8F0DE" />
                </linearGradient>
                <linearGradient id="mt2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#A6DDB0" />
                  <stop offset="1" stopColor="#ECF8EE" />
                </linearGradient>
              </defs>
              <rect width="1200" height="480" fill="url(#sky)" />
              {/* sun */}
              <motion.circle
                cx="900" cy="140" r="60" fill="#FFF8DC"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 1.2 }}
              />
              {/* distant clouds */}
              <motion.g
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx="300" cy="120" rx="70" ry="14" fill="#ffffff" opacity="0.85" />
                <ellipse cx="340" cy="110" rx="50" ry="12" fill="#ffffff" opacity="0.85" />
              </motion.g>
              <motion.g
                animate={{ x: [0, -25, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx="700" cy="90" rx="55" ry="11" fill="#ffffff" opacity="0.7" />
              </motion.g>
              {/* back mountain */}
              <motion.path
                d="M0 380 Q 200 200, 420 320 T 820 270 T 1200 340 L1200 480 L0 480 Z"
                fill="url(#mt2)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.4 }}
              />
              {/* front mountain */}
              <motion.path
                d="M0 420 Q 180 280, 380 360 Q 560 240, 720 340 Q 900 260, 1080 360 Q 1140 380, 1200 360 L1200 480 L0 480 Z"
                fill="url(#mt1)"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7, duration: 1.0 }}
              />
              {/* tiny figure */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                <circle cx="600" cy="335" r="5" fill="#2C3E50" />
                <rect x="597" y="340" width="6" height="14" fill="#2C3E50" />
              </motion.g>
            </svg>
          </div>

          {/* floating chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="absolute -left-4 top-8 hidden rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-lg sm:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">License</div>
            <div className="font-mono text-sm font-semibold">R706081</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="absolute -right-4 bottom-10 hidden rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-lg sm:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Based in</div>
            <div className="text-sm font-semibold">Vancouver, BC</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="currentColor">
      <ellipse cx="60" cy="50" rx="55" ry="22" />
      <ellipse cx="110" cy="40" rx="45" ry="28" />
      <ellipse cx="150" cy="52" rx="40" ry="20" />
    </svg>
  );
}
