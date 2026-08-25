import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireAdminFromHeaders } from "@/lib/auth-session";
import { requireEnv } from "@/lib/env";

async function requireAdminSession() {
  return requireAdminFromHeaders(getRequest().headers);
}

const CLOUDINARY_FOLDER = "monbeta-news";

async function sha1Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const getCloudinarySignature = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdminSession();
  const cloudName = requireEnv("CLOUDINARY_CLOUD_NAME");
  const apiKey = requireEnv("CLOUDINARY_API_KEY");
  const apiSecret = requireEnv("CLOUDINARY_API_SECRET");
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = CLOUDINARY_FOLDER;
  const signature = await sha1Hex(`folder=${folder}&timestamp=${timestamp}${apiSecret}`);
  return { cloudName, apiKey, timestamp, signature, folder };
});
