import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";

// Dev-only middleware that runs the Vercel Edge functions in `api/` directly via
// Vite's SSR loader. Lets `/share/reaction` and `/api/og` work in `npm run dev`
// without needing `vercel dev`.
function vercelEdgeDevPlugin(): Plugin {
  type EdgeHandler = (req: Request) => Promise<Response> | Response;

  const routes: Array<{ path: string; module: string }> = [
    { path: "/api/og", module: "/api/og.tsx" },
    { path: "/api/share/reaction", module: "/api/share/reaction.ts" },
    { path: "/share/reaction", module: "/api/share/reaction.ts" },
    { path: "/og.png", module: "/api/og.tsx" },
  ];

  return {
    name: "vercel-edge-dev",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      const handle = async (
        modulePath: string,
        req: IncomingMessage,
        res: ServerResponse
      ) => {
        try {
          const mod = await server.ssrLoadModule(modulePath);
          const handler = mod.default as EdgeHandler;
          if (typeof handler !== "function") {
            res.statusCode = 500;
            res.end(`No default export in ${modulePath}`);
            return;
          }

          const host = req.headers.host || "localhost";
          const proto =
            (req.headers["x-forwarded-proto"] as string) ||
            (req.socket && "encrypted" in req.socket && (req.socket as { encrypted?: boolean }).encrypted
              ? "https"
              : "http");
          const fullUrl = `${proto}://${host}${req.url || "/"}`;

          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === "string") headers.set(k, v);
            else if (Array.isArray(v)) headers.set(k, v.join(", "));
          }
          const webReq = new Request(fullUrl, {
            method: req.method,
            headers,
          });

          const webRes = await handler(webReq);
          res.statusCode = webRes.status;
          webRes.headers.forEach((value, key) => res.setHeader(key, value));
          const buf = Buffer.from(await webRes.arrayBuffer());
          res.end(buf);
        } catch (err) {
          console.error(`[vercel-edge-dev] ${modulePath}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
          }
          res.end(`Edge handler error: ${(err as Error).message || err}`);
        }
      };

      for (const route of routes) {
        server.middlewares.use(route.path, (req, res, next) => {
          // Only handle exact path (allow query strings)
          const urlPath = (req.url || "").split("?")[0];
          if (urlPath === "/" || urlPath === "") {
            void handle(route.module, req, res);
          } else {
            next();
          }
        });
      }
    },
  };
}

export default defineConfig(() => ({
  base: "/",
  server: {
    host: "::",
    port: 8082,
    strictPort: true,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Only proxy chat API to the local express server. The OG/share Edge
      // handlers are served directly by the Vite plugin above.
      '/api/chat': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/generate': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    vercelEdgeDevPlugin(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      includeAssets: ["robots.txt", "pwa-source.svg", "pwa-180.png", "pwa-192.png", "pwa-512.png"],
      manifest: {
        name: "UN Lab — Interactive Science Laboratory",
        short_name: "UN Lab",
        description:
          "Explore chemistry, physics, biology & earth sciences with interactive 3D simulations, 500+ reactions, and a live periodic table.",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        display_override: ["standalone", "browser"],
        orientation: "any",
        scope: "/",
        start_url: "/",
        id: "/",
        categories: ["education", "science"],
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache hashed JS/CSS and static assets only — not index.html. A precached
        // shell can reference deleted chunks after a new deploy (blank black screen).
        // Navigations are served by the host (e.g. Vercel) so HTML always matches current assets.
        globPatterns: ["assets/**/*.{js,css}", "**/*.{ico,png,svg,webp}", "**/manifest.webmanifest"],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: null,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    sourcemap: false,
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;

          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendor";
          }
          if (id.includes("framer-motion")) {
            return "motion-vendor";
          }
          if (id.includes("@radix-ui") || id.includes("cmdk") || id.includes("vaul")) {
            return "radix-vendor";
          }
          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts-vendor";
          }
          if (id.includes("react-markdown") || id.includes("remark-") || id.includes("rehype-") || id.includes("micromark") || id.includes("mdast-") || id.includes("hast-")) {
            return "markdown-vendor";
          }
          if (id.includes("react-i18next") || id.includes("i18next")) {
            return "i18n-vendor";
          }
          if (id.includes("@tanstack/react-query")) {
            return "query-vendor";
          }
          if (id.includes("react-router")) {
            return "router-vendor";
          }
          if (id.includes("react-dom") || id.includes("scheduler") || id.includes("react/")) {
            return "react-vendor";
          }
          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }
          return "vendor";
        },
      },
    },
  },
  esbuild: {
    legalComments: "none",
  },
}));
