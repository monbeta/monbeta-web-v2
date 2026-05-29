// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Vercel uses Nitro. Cloudflare uses @cloudflare/vite-plugin (set DEPLOY_TARGET=cloudflare).
const useCloudflare = process.env.DEPLOY_TARGET === "cloudflare";

export default defineConfig({
  cloudflare: useCloudflare,
  plugins: useCloudflare ? [] : [nitro()],
  tanstackStart: useCloudflare
    ? {
        // Cloudflare-only SSR error wrapper (src/server.ts).
        server: { entry: "server" },
      }
    : {},
});
