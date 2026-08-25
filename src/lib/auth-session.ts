import { getAuth } from "@/lib/auth";
import { seedAdminIfNeeded } from "@/lib/seed-admin";

export type AdminSession = {
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export async function readSessionFromHeaders(headers: Headers): Promise<AdminSession | null> {
  await seedAdminIfNeeded();
  const session = await getAuth().api.getSession({ headers });
  if (!session) return null;
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  };
}

export async function requireAdminFromHeaders(headers: Headers): Promise<AdminSession> {
  const session = await readSessionFromHeaders(headers);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
