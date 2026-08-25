import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { getAuth } from "@/lib/auth";
import { account } from "@/db/schema";

const CREDENTIAL_ISSUER = "local:credential";

function readEnvSecret(name: string): string | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  return raw;
}

export async function seedAdminIfNeeded() {
  const email = readEnvSecret("ADMIN_EMAIL")?.toLowerCase();
  const password = readEnvSecret("ADMIN_PASSWORD");
  if (!email || !password) return;

  const ctx = await getAuth().$context;
  let existing: Awaited<ReturnType<typeof ctx.internalAdapter.findUserByEmail>> = null;
  try {
    existing = await ctx.internalAdapter.findUserByEmail(email, { includeAccounts: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/Failed query|does not exist/i.test(message)) {
      throw new Error("数据库表尚未创建。请运行 npm run db:migrate，然后重启 dev server。");
    }
    throw error;
  }

  const hashPassword = (value: string) => ctx.password.hash(value);
  const hashed = await hashPassword(password);

  const credential = existing?.accounts.find(
    (item) =>
      item.providerId === "credential" &&
      item.issuer === CREDENTIAL_ISSUER &&
      item.accountId === existing.user.id,
  );

  if (existing && credential?.password) {
    const matches = await ctx.password.verify({ hash: credential.password, password });
    if (matches) return;
    await getDb()
      .update(account)
      .set({ password: hashed, issuer: CREDENTIAL_ISSUER, accountId: existing.user.id })
      .where(eq(account.userId, existing.user.id));
    return;
  }

  if (existing) {
    await getDb()
      .update(account)
      .set({
        issuer: CREDENTIAL_ISSUER,
        accountId: existing.user.id,
        providerId: "credential",
        password: hashed,
      })
      .where(eq(account.userId, existing.user.id));
    return;
  }

  const created = await ctx.internalAdapter.createUser(
    {
      email,
      name: "MonBeta Admin",
      emailVerified: true,
    },
    { method: "email" },
  );
  await ctx.internalAdapter.createAccount({
    userId: created.id,
    providerId: "credential",
    accountId: created.id,
    issuer: CREDENTIAL_ISSUER,
    password: hashed,
  });
}
