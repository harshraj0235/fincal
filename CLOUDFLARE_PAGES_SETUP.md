# Cloudflare Pages – Required settings (fix 25 MiB error)

This project uses **static export** (no server/worker). You must set these in the dashboard so the build does **not** use OpenNext (which produces the 88 MiB handler and fails).

## In Cloudflare Dashboard

1. Go to **Workers & Pages** → your project → **Settings** → **Builds & deployments**.
2. Under **Build configuration** set:

| Setting | Value |
|--------|--------|
| **Framework preset** | **Next.js (Static HTML Export)** or **None** |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | (leave blank) |

3. Save. Redeploy.

If you use **Next.js** (non-static) or any preset that runs `opennextjs-cloudflare` or `next-on-pages`, the build will produce `server-functions/default/handler.mjs` (~88 MiB) and fail with "Pages only supports files up to 25 MiB".

## What this repo does

- `next.config.mjs` has `output: 'export'` → `next build` writes static files to `out/`.
- `npm run build` runs: generate-sitemaps → generate-static-params → next build.
- No OpenNext, no server bundle, no handler.mjs.
