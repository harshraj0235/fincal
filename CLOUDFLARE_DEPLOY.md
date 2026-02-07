# Deploy Moneycal (Next.js) to Cloudflare

This project is set up to deploy the **Next.js** build to **Cloudflare Workers / Pages** using the **OpenNext Cloudflare adapter** (recommended over the deprecated `@cloudflare/next-on-pages`).

---

## Current codebase stage

- **Next.js** (App Router) on branch `nextjs-migration`: home, blog, blog/[slug], about-us, contact-us, calculators/[id], catch-all for all other routes.
- **SEO**: `app/sitemap.ts`, `app/robots.ts`, metadata per page, JSON-LD in layout.
- **Build**: `next build` with `output: 'standalone'` and `images: { unoptimized: true }` for Cloudflare.
- **Dual mode**: Vite (`npm run dev` / `npm run build`) for legacy SPA; Next.js (`npm run dev:next` / `npm run build:next`) for SSR/SSG. Use Next.js for production and Cloudflare deploy.

---

## 1. Install dependencies

```bash
npm install
```

This installs `@opennextjs/cloudflare` and `wrangler` (devDependencies). **Wrangler 3.99+** is required.

---

## 2. Build and run locally (Cloudflare runtime)

```bash
npm run build:next
npm run preview:cf
```

This runs `opennextjs-cloudflare build` (which runs `next build` internally), then serves the app in the Workers runtime locally.

---

## 3. Deploy from CLI

```bash
npm run deploy:cf
```

Log in with Wrangler if prompted (`npx wrangler login`). This builds and deploys to **Cloudflare Workers**. Your app will be at `https://moneycal.<your-subdomain>.workers.dev` (or your custom domain).

---

## 4. Connect GitHub to Cloudflare Pages (recommended for CI/CD)

1. **Cloudflare Dashboard** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select **GitHub** and authorize; choose repo `fincal` (or your repo name).
3. **Build settings** (use these exactly for OpenNext):

   | Setting              | Value                                      |
   |----------------------|--------------------------------------------|
   | Framework preset     | None (or Next.js if available)             |
   | Build command        | `npx opennextjs-cloudflare build`          |
   | Build output dir     | (leave default; OpenNext uses Workers)      |
   | Root directory       | `/`                                        |
   | Node.js version      | 18 or 20                                   |

   If Cloudflare Pages offers a **Next.js** preset, check their doc: some use `opennextjs-cloudflare build` and deploy the Worker from the build output (e.g. `.open-next`). When in doubt, use **Build command**: `npm run build:next && npx opennextjs-cloudflare build` and ensure the **deploy step** uses the OpenNext output (Worker + assets).

4. **Environment variables** (optional):  
   **Settings** → **Environment variables** → add e.g. `NEXT_PUBLIC_SITE_URL=https://moneycal.in`.

5. Save and deploy. Every push to the selected branch will trigger a new build and deploy.

---

## 5. Custom domain (moneycal.in)

1. In Cloudflare: **Workers & Pages** → your project → **Custom domains** → **Set up a custom domain**.
2. Add `moneycal.in` (and `www.moneycal.in` if needed). If the domain is not on Cloudflare, add the site in the **Websites** tab and update nameservers at your registrar.
3. Cloudflare will issue SSL and handle HTTP→HTTPS.

---

## 6. SEO and caching (already in project)

- **Sitemap**: `https://moneycal.in/sitemap.xml` (from `app/sitemap.ts`).
- **Robots**: `app/robots.ts` allows crawlers and points to sitemaps.
- **Static cache**: `public/_headers` includes `/_next/static/*` with `Cache-Control: public, max-age=31536000, immutable`.

---

## 7. Optional: Cloudflare cache rules for finance sites

In **Cloudflare Dashboard** → your application → **Caching** or **Page Rules** / **Cache Rules**:

- **Static assets**: Cache `/_next/static/*`, `/images/*`, `/*.js`, `/*.css` with long TTL (e.g. 1 year).
- **HTML pages**: Prefer **Cache Everything** with short TTL or **Respect origin** so Next.js `revalidate` and headers are honored when you use OpenNext’s caching (e.g. R2 incremental cache).

---

## 8. AdSense and Google

- Use **HTTPS** (Cloudflare provides it).
- Ensure **real content** is in server-rendered HTML (your Next.js pages and metadata already do this).
- Submit **sitemap** in Google Search Console: `https://moneycal.in/sitemap.xml`.
- Follow your existing **AdSense approval checklist** (content, privacy, disclaimer, etc.).

---

## Fix: "npm ci" / lock file out of sync (Cloudflare build fails)

Cloudflare runs **`npm ci`**, which requires `package-lock.json` to match `package.json`. If you see **"Missing: ... from lock file"** or **"package.json and package-lock.json are in sync"**:

### Option A – Use lock file (recommended long-term)

On your machine (with Node 18+ and npm in PATH):

```bash
npm install
git add package-lock.json
git commit -m "chore: update package-lock.json for Cloudflare npm ci"
git push origin main
```

Redeploy on Cloudflare so it uses the new lock file.

### Option B – Skip `npm ci` and use `npm install` in the build

1. **Cloudflare Dashboard** → your Pages project → **Settings** → **Environment variables**.
2. Add **Variable**: `SKIP_DEPENDENCY_INSTALL`, **Value**: `1` (Production and Preview if you use both).
3. **Settings** → **Builds & deployments** → **Build configuration**.
4. Set **Build command** to:

   ```bash
   npm install --legacy-peer-deps && npx opennextjs-cloudflare build
   ```

   (Or, if you only need the Next build: `npm install --legacy-peer-deps && npm run build:next && npx opennextjs-cloudflare build`.)

5. Save and **Retry deployment**. Cloudflare will no longer run `npm ci`; your build command will run `npm install` then the OpenNext build.

---

## Troubleshooting

- **Build fails**: Ensure Node 18+ and `npm run build:next` succeeds locally. Then run `npx opennextjs-cloudflare build` in the repo root.
- **Wrangler version**: Must be **3.99.0** or later for Next.js on Cloudflare.
- **Edge runtime**: Remove any `export const runtime = 'edge'` from your app; OpenNext Cloudflare does not support the Edge runtime yet.

**References:**  
[OpenNext Cloudflare – Get started](https://opennext.js.org/cloudflare/get-started) · [OpenNext CLI](https://opennext.js.org/cloudflare/cli) · [Cloudflare Pages – Deploy a Next.js site](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site)
