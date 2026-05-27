import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Shield } from "lucide-react";
import logo from "@/assets/logo.svg";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-background to-accent/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MonBeta" className="h-12 w-12" />
              <div>
                <div className="font-serif text-lg font-semibold">MonBeta 移民留学咨询中心</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">MonBeta Immigration</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              由持牌加拿大移民顾问 Tong Huang (RCIC-IRB) 创立。我们相信每一次签证决定都应有依据、有方案、有底线 —— 让您在加拿大的每一步都走得踏实。
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs text-foreground/80 w-fit">
              <Shield className="h-3.5 w-3.5 text-primary" />
              CICC 持牌顾问 · License No. R706081
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">站点</div>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">关于我们</Link></li>
              <li><Link to="/services" className="hover:text-foreground">服务项目</Link></li>
              <li><Link to="/testimonials" className="hover:text-foreground">客户评价</Link></li>
              <li><Link to="/news" className="hover:text-foreground">资讯动态</Link></li>
              <li><Link to="/book" className="hover:text-foreground">预约咨询</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">联系</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> 加拿大 BC 省 温哥华</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> hello@monbeta.ca</li>
              <li className="text-xs">小红书：BeckyHuang1234</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} MonBeta Immigration. 保留所有权利。</div>
          <div>本网站不构成法律意见，所有正式委托须签署服务协议。</div>
        </div>
      </div>
    </footer>
  );
}
