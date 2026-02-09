# Cloudflare Pages – Required Dashboard Setup

**Quick fix:** Set **Build command** = `npm run build` or `npm run build:cf:ci`, **Build output directory** = **`out`**. Do not use `@cloudflare/next-on-pages` or `.vercel/output/static`.

This project uses **Next.js static export** (`output: 'export'`). Output is the **`out`** folder, **not** OpenNext or Vercel.

## Resolve “Build failed” / wrong output / OOM

If you see:
- **Build command** `npx @cloudflare/next-on-pages@1` or **Build output** `.vercel/output/static` → wrong for this repo.
- **FATAL ERROR: JavaScript heap out of memory** during `next build` → build uses too much RAM for Cloudflare.

Do this:

1. **Workers & Pages** → your project → **Settings** → **Builds & deployments**
2. Set **Build configuration** exactly:

| Setting | Value |
|--------|--------|
| **Build command** | `npm run build` **or** `npm run build:cf:ci` (see below) |
| **Build output directory** | **`out`** (not `.vercel/output/static`) |
| **Root directory** | *(leave empty)* |
| **Framework preset** | **None** or **Next.js (Static HTML Export)** |

Do **not** use:
- `npx @cloudflare/next-on-pages@1` (this repo uses static export, not Next-on-Pages)
- Build output `.vercel/output/static` (output is **`out`**)

## 1. Build configuration (reference)

| Setting | Value |
|--------|--------|
| **Framework preset** | **None** or **Next.js (Static HTML Export)** |
| **Build command** | `npm run build` |
| **Build output directory** | **`out`** |
| **Root directory** | *(leave empty)* |

## 2. If you use SKIP_DEPENDENCY_INSTALL=1

If **Environment variables** has `SKIP_DEPENDENCY_INSTALL` = `1`, Cloudflare won’t run `npm install`. Use a build command that installs deps first:

- **Build command:** `npm run build:cf:ci`  
  (runs `npm install --legacy-peer-deps` then sitemaps, static params, then `next build`)

**Build output directory** stays **`out`**.

## 3. If you still get “JavaScript heap out of memory”

- Static export is capped to **100 pages** by default to fit Cloudflare’s build memory. To change: add env **`STATIC_PARAMS_LIMIT`** (e.g. `80` for safer).
- Optional: add env **`NODE_OPTIONS`** = **`--max-old-space-size=2048`** (script already uses 2048; this reinforces it).
- If OOM continues: build the Next app elsewhere (e.g. GitHub Actions with more RAM) and deploy the **`out`** folder, or use the **SvelteKit** app for Cloudflare (see **CLOUDFLARE_SVELTEKIT.md**).

## 4. Redeploy

Click **Retry deployment** or push a new commit.

---

See **CLOUDFLARE_PAGES_SETUP.md** for more detail.
