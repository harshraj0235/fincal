# SvelteKit + Cloudflare Workers — Alternative to Next.js

This doc explains how **SvelteKit on Cloudflare** can resolve the kind of issues we hit with Next.js (OOM, 25 MiB limit, heavy builds).

---

## Why consider SvelteKit for Cloudflare

| Issue with Next.js on Cloudflare | How SvelteKit helps |
|----------------------------------|---------------------|
| **25 MiB worker limit** | SvelteKit adapter produces smaller Workers; no single 88 MiB handler. |
| **Build OOM (4GB)** | Lighter build: smaller bundles, less memory during SSG/SSR. |
| **Static export + 2125 routes** | Hybrid SSR/SSG; you can prerender key routes and do on-demand for the rest without building 2k pages at once. |
| **Heavy React bundle** | Svelte compiles to small, framework-less JS → smaller payloads and less runtime memory. |

**Other benefits**

- **SEO**: SSR/SSG, meta, structured data — same level as Next.
- **Cloudflare support**: Official `@sveltejs/adapter-cloudflare` (and `adapter-cloudflare-workers`).
- **No “static params” cap**: You’re not forced to prebuild all routes in one process; you can mix prerender and server-rendered.

---

## What migration would involve

This repo is **Next.js + React SPA** (500+ React components, React Router, etc.). Moving to SvelteKit would mean:

1. **New framework**: SvelteKit (Svelte) instead of Next.js (React).
2. **Rewrite or gradual migration**:
   - **Full rewrite**: All pages/components in Svelte (.svelte) and SvelteKit routes (+page.svelte, +page.server.ts, etc.).
   - **Gradual**: Run SvelteKit for a subset of routes and keep the existing app behind an iframe or subdomain until you migrate.
3. **Same backend/APIs**: Cloudflare Workers, env, KV/D1/R2 if you use them — no change.
4. **SEO**: Replicate current meta, canonicals, and structured data in SvelteKit (layout load, +page.server.ts, or components).

So: “use SvelteKit to resolve this type of issue” is the right **direction**; the actual fix is either migrating to SvelteKit or reducing Next.js build/runtime load (e.g. fewer static params, different host for build).

---

## Minimal SvelteKit + Cloudflare setup (reference)

Use this as a reference to “resolve this type of issue” with SvelteKit + Cloudflare, not as part of the current Next app.

### 1. New SvelteKit project (separate repo or subfolder)

```bash
npm create svelte@latest my-app -- --template skeleton --types ts
cd my-app
npm install
```

### 2. Add Cloudflare adapter

```bash
npm install -D @sveltejs/adapter-cloudflare
```

### 3. Configure adapter

**svelte.config.js:**

```js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
};

export default config;
```

### 4. Build and deploy

```bash
npm run build
# Deploy with Wrangler (or connect repo to Cloudflare Pages with Framework preset: SvelteKit)
npx wrangler pages deploy build --project-name=my-app
```

### 5. SEO (meta, canonical)

In **+page.svelte** or **+layout.svelte**:

```svelte
<svelte:head>
  <title>Page Title | MoneyCal</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://moneycal.in/..." />
</svelte:head>
```

Or use a load in **+page.server.ts** and set via a shared layout. For structured data, inject JSON-LD in `<svelte:head>`.

---

## Recommendation

- **Short term**: Stay on Next.js; keep static param cap (e.g. 180) and 3GB heap so Cloudflare builds succeed. Optionally move the **build** to a bigger environment (e.g. GitHub Actions) and deploy only the `out/` artifact to Cloudflare Pages.
- **Long term**: If you want smaller workers, no build OOM, and a single stack that fits Cloudflare well, **plan a move to SvelteKit + Cloudflare** and use this doc + the minimal setup above as the way to “use this to resolve this type of issue” (lighter, better memory, SSR/SSG, excellent SEO).

---

## Links

- [SvelteKit on Cloudflare](https://kit.svelte.dev/docs/adapter-cloudflare)
- [Cloudflare Pages – SvelteKit](https://developers.cloudflare.com/pages/framework-guides/sveltekit/)
- [SvelteKit SEO](https://kit.svelte.dev/docs/seo)
