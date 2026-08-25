import { Link, Outlet, createFileRoute, redirect, useRouter, useRouterState } from "@tanstack/react-router";
import { FileText, LogOut, Tags } from "lucide-react";
import { getSession } from "@/lib/auth-functions";
import { authClient } from "@/lib/auth-client";
import { showAdminSidebar } from "@/lib/admin-paths";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();
    const isLogin = location.pathname === "/admin/login";
    if (isLogin) {
      if (session) throw redirect({ to: "/admin/news" });
      return { user: null as { id: string; email: string; name: string } | null };
    }
    if (!session) throw redirect({ to: "/admin/login" });
    return { user: session.user };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const router = useRouter();
  const { user } = Route.useRouteContext();

  if (!showAdminSidebar(pathname)) {
    return <Outlet />;
  }

  const onLogout = async () => {
    await authClient.signOut();
    await router.navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="flex w-60 flex-col border-r border-border/70 bg-background px-4 py-6">
        <div className="px-2">
          <div className="font-serif text-lg font-semibold">MonBeta CMS</div>
          <div className="mt-1 truncate text-xs text-muted-foreground">{user?.email}</div>
        </div>
        <nav className="mt-8 space-y-1">
          <Link
            to="/admin/news"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            activeProps={{ className: "flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground" }}
          >
            <FileText className="h-4 w-4" /> 文章
          </Link>
          <Link
            to="/admin/tags"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            activeProps={{ className: "flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground" }}
          >
            <Tags className="h-4 w-4" /> 标签
          </Link>
        </nav>
        <div className="mt-auto space-y-2 px-1">
          <Link to="/" className="block text-xs text-muted-foreground hover:text-foreground">
            查看官网
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => void onLogout()}>
            <LogOut className="h-4 w-4" /> 退出
          </Button>
        </div>
      </aside>
      <div className="flex-1 overflow-auto p-6 sm:p-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
