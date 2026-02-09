# MoneyCal – SvelteKit (Cloudflare)

This is the **SvelteKit** version of MoneyCal, built for **Cloudflare Pages**. It avoids the Next.js OOM and 25 MiB worker limits by using a lighter stack.

## Build & run locally

```bash
cd sveltekit-app
npm install
npm run dev
```

## Build for Cloudflare

```bash
npm run build
```

Output is in `.svelte-kit/cloudflare`. Preview with:

```bash
npx wrangler pages dev .svelte-kit/cloudflare
```

## Deploy to Cloudflare Pages

### Option A: Cloudflare dashboard (Git)

1. **Workers & Pages** → your project (or create one) → **Settings** → **Builds & deployments**.
2. Set **Root directory** to `sveltekit-app`.
3. **Build command:** `npm run build`
4. **Build output directory:** `.svelte-kit/cloudflare`
5. **Framework preset:** SvelteKit (if available).
6. Add **Compatibility flag:** `nodejs_compat` in Runtime settings.
7. Save and deploy.

### Option B: Wrangler CLI

From repo root:

```bash
cd sveltekit-app
npm install
npm run build
npx wrangler pages deploy .svelte-kit/cloudflare --project-name=moneycal
```

## Routes

- `/` – Home
- `/calculators`, `/news`, `/learn`, `/tools` – Section landing pages
- `/*` – Catch-all (e.g. `/news/economy/article`, `/learn/loans/lesson`) with SEO meta and canonical URLs.

Content can be migrated from the Next.js app (e.g. copy `contentRegistry`, article loaders, learn data) and rendered in Svelte pages or via `+page.server.ts` load functions.
