export function isAdminPreviewPath(pathname: string): boolean {
  return /^\/admin\/news\/[^/]+\/preview\/?$/.test(pathname);
}

export function showPublicChrome(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) return true;
  return isAdminPreviewPath(pathname);
}

export function showAdminSidebar(pathname: string): boolean {
  if (!pathname.startsWith("/admin")) return false;
  if (pathname === "/admin/login") return false;
  return !isAdminPreviewPath(pathname);
}
