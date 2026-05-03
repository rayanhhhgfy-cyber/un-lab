import { findReaction, type Reaction } from "../../src/data/reactions.js";

export const config = {
  runtime: "edge",
};

function parseReactants(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/[,+\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml({
  origin,
  eq,
  description,
  ogUrl,
  appUrl,
  type,
  reactants,
}: {
  origin: string;
  eq: string;
  description: string;
  ogUrl: string;
  appUrl: string;
  type: string;
  reactants: string;
}) {
  const safeEq = escapeHtml(eq);
  const safeDesc = escapeHtml(description);
  const safeOg = escapeHtml(ogUrl);
  const safeApp = escapeHtml(appUrl);
  const safeType = escapeHtml(type);
  const safeReactants = escapeHtml(reactants);
  const title = `${eq} — UN Lab Chemistry`;
  const safeTitle = escapeHtml(title);
  const canonical = escapeHtml(`${origin}/share/reaction?r=${encodeURIComponent(reactants)}`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#000000" />
<meta name="color-scheme" content="dark" />
<title>${safeTitle}</title>
<meta name="description" content="${safeDesc}" />
<link rel="canonical" href="${canonical}" />
<link rel="icon" type="image/png" sizes="192x192" href="/pwa-192.png" />

<meta property="og:type" content="article" />
<meta property="og:site_name" content="UN Lab" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDesc}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${safeOg}" />
<meta property="og:image:secure_url" content="${safeOg}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${safeEq}" />
<meta property="article:tag" content="${safeType}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDesc}" />
<meta name="twitter:image" content="${safeOg}" />
<meta name="twitter:image:alt" content="${safeEq}" />

<style>
  html,body{margin:0;padding:0;background:#000;color:#e2e8f0;font-family:Inter,system-ui,sans-serif;min-height:100%;}
  .wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:32px;text-align:center;background:radial-gradient(ellipse at center,#0a0a14 0%,#000 70%);}
  .badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .9rem;border-radius:9999px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.35);color:#67e8f9;font-size:.7rem;letter-spacing:.25em;text-transform:uppercase;font-weight:800}
  .eq{margin:1.5rem 0 .75rem;font-family:ui-monospace,Menlo,monospace;font-size:clamp(1.4rem,4vw,2.4rem);font-weight:900;background:linear-gradient(90deg,#67e8f9,#93c5fd,#c4b5fd);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.02em;line-height:1.15;max-width:90vw;word-wrap:break-word}
  .desc{color:#94a3b8;max-width:560px;margin:0 0 1.5rem;font-size:.95rem;line-height:1.5}
  .cta{display:inline-flex;align-items:center;gap:.6rem;padding:.85rem 1.5rem;border-radius:9999px;background:linear-gradient(90deg,#22d3ee,#3b82f6,#8b5cf6);color:white;font-weight:800;font-size:.9rem;text-decoration:none;box-shadow:0 14px 30px -10px rgba(56,189,248,.45),inset 0 0 0 1px rgba(255,255,255,.18)}
  .cta:hover{filter:brightness(1.1)}
  .small{margin-top:2rem;font-size:.7rem;color:#475569;letter-spacing:.2em;text-transform:uppercase}
  .preview{margin-top:1.5rem;border-radius:18px;border:1px solid rgba(255,255,255,.08);max-width:min(680px,90vw);box-shadow:0 30px 80px -20px rgba(0,0,0,.7)}
</style>
<script>
(function(){
  try {
    var ua = navigator.userAgent || "";
    var isCrawler = /bot|crawler|spider|crawling|facebookexternalhit|twitterbot|slackbot|discordbot|telegrambot|whatsapp|linkedin|preview|embed/i.test(ua);
    if (!isCrawler) {
      window.location.replace(${JSON.stringify(appUrl)});
    }
  } catch(e) {}
})();
</script>
</head>
<body>
  <div class="wrap">
    <span class="badge">${safeType}</span>
    <div class="eq">${safeEq}</div>
    <p class="desc">${safeDesc}</p>
    <a class="cta" href="${safeApp}">Open in UN Lab →</a>
    <img class="preview" src="${safeOg}" alt="${safeEq}" loading="lazy" />
    <div class="small">UN Lab · ${safeReactants}</div>
  </div>
</body>
</html>`;
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const rRaw = url.searchParams.get("r") || url.searchParams.get("reactants");
  const reactants = parseReactants(rRaw);

  let reaction: Reaction | null = null;
  if (reactants.length >= 2) {
    reaction = findReaction(reactants);
  }

  const origin = `${url.protocol}//${url.host}`;
  const reactantsParam = reactants.join(",");
  const ogUrl = `${origin}/api/og?r=${encodeURIComponent(reactantsParam)}`;
  const appUrl = `${origin}/chemistry?r=${encodeURIComponent(reactantsParam)}&auto=1`;

  const eq =
    reaction?.eq ||
    (reactants.length >= 2
      ? `${reactants[0]} + ${reactants[1]} → ?`
      : "UN Lab — Interactive Chemistry");
  const description =
    reaction?.desc ||
    "Run this reaction live in UN Lab — interactive chemistry simulator with 500+ real reactions, periodic table & calculators.";
  const type = reaction?.type || "reaction";

  const html = buildHtml({
    origin,
    eq,
    description,
    ogUrl,
    appUrl,
    type,
    reactants: reactantsParam,
  });

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
