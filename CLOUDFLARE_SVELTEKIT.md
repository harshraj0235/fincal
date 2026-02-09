# Deploy SvelteKit to Cloudflare Pages (no OOM, small worker)

To use the **SvelteKit** app instead of Next.js and avoid build OOM / 25 MiB limits:

## 1. In Cloudflare Dashboard

**Workers & Pages** → your project → **Settings** → **Builds & deployments**:

| Setting | Value |
|--------|--------|
| **Root directory** | `sveltekit-app` |
| **Build command** | `npm run build` |
| **Build output directory** | `.svelte-kit/cloudflare` |
| **Framework preset** | SvelteKit (or None) |

**Environment variables:** remove `SKIP_DEPENDENCY_INSTALL` so Cloudflare runs `npm install` before the build.

**Runtime** → Compatibility flag: add `nodejs_compat`.

Save and **Retry deployment**.

## 2. What you get

- **SvelteKit** builds in the `sveltekit-app` folder (lighter, no 2125-page static export).
- **Output** is `.svelte-kit/cloudflare` (worker + assets, well under 25 MiB).
- **Routes**: `/`, `/calculators`, `/news`, `/learn`, `/tools`, and a catch-all for the rest with SEO meta and canonicals.

## 3. Content migration

The SvelteKit app is a shell. To bring over content from the Next.js app:

- Copy or reuse `src/cms-content/contentRegistry.ts`, article data, learn lessons, etc. into `sveltekit-app` (or load via API).
- Add `+page.server.ts` / `+page.ts` load functions and render in `.svelte` pages.
- Sitemaps can stay in the repo and be served from `static/` or generated in a server endpoint.

The Next.js app remains in the repo for reference or local use; Cloudflare will build only `sveltekit-app` when the root directory is set as above.
