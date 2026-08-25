import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { readSessionFromHeaders, requireAdminFromHeaders } from "@/lib/auth-session";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  return readSessionFromHeaders(getRequest().headers);
});

export const ensureSession = createServerFn({ method: "GET" }).handler(async () => {
  return requireAdminFromHeaders(getRequest().headers);
});
