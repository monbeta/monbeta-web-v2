import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import logo from "@/assets/logo.svg";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    const result = await authClient.signIn.email({ email, password });
    setSubmitting(false);
    if (result.error) {
      toast.error(result.error.message ?? "登录失败");
      return;
    }
    await router.navigate({ to: "/admin/news" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-soft px-4">
      <form
        onSubmit={(event) => void onSubmit(event)}
        className="w-full max-w-sm rounded-3xl border border-border/70 bg-card p-8 shadow-sm"
      >
        <img src={logo} alt="MonBeta" className="h-12 w-12" />
        <h1 className="mt-4 font-serif text-2xl font-semibold">内容管理</h1>
        <p className="mt-1 text-sm text-muted-foreground">使用 monbeta.dev 管理员账号登录</p>
        <div className="mt-6">
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            type="email"
            className="mt-1.5"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            className="mt-1.5"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button type="submit" className="mt-6 w-full" disabled={submitting}>
          {submitting ? "登录中…" : "登录"}
        </Button>
      </form>
    </div>
  );
}
