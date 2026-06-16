import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const links = [
  { to: "/", label: "首页" },
  { to: "/about", label: "关于我们" },
  { to: "/services", label: "服务项目" },
  { to: "/testimonials", label: "客户评价" },
  // { to: "/news", label: "资讯动态" }, // temporarily hidden
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="MonBeta" className="h-10 w-10" />
          <div className="hidden sm:block leading-tight">
            <div className="font-serif text-base font-semibold tracking-tight">MonBeta</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Immigration · Vancouver</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/40 hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent/60" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            预约咨询 →
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border/70 p-2 md:hidden"
            aria-label="menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/40"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-foreground px-3 py-2.5 text-center text-sm font-medium text-background"
            >
              预约咨询
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
