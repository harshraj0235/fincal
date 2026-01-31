# Soft 404 Resolution – moneycal.in

## What was fixed

1. **Duplicate-domain URLs (e.g. `/moneycal.in/moneycal.in/learn/...`)**
   - **Server:** 301 redirects added so `/moneycal.in/*` → `/:splat` in:
     - `public/_redirects` (Netlify/Cloudflare)
     - `netlify.toml` (root)
   - **Client:** In `src/main.tsx`, if the path starts with `/moneycal.in/`, the app redirects to the correct path before rendering (fallback if server redirect is missed).
   - **Result:** Crawlers and users hitting wrong URLs get a 301 to the canonical URL, so Google can drop the Soft 404 for those URLs over time.

2. **404 page**
   - `NotFound404.tsx` already uses `SEOHelmet` with `noIndex={true}` and `noFollow={true}`, so the 404 page is not indexed (reduces Soft 404 for “not found” views).

3. **Canonical and sitemaps**
   - `src/utils/canonicalUrl.ts` normalizes paths and canonicals so links and sitemaps do not contain duplicate `/moneycal.in/` in the path. Sitemap scripts use this when generating URLs.

## What you should do next

1. **Deploy**  
   Deploy the latest build so the new redirects and client redirect are live.

2. **Regenerate sitemaps**  
   Run `npm run generate-sitemaps` (or your sitemap script) so all URLs in sitemaps are normalized (no duplicate domain in path). Submit the updated sitemap in Google Search Console.

3. **In Google Search Console**
   - **URL Inspection:** For a few previously “Soft 404” URLs (both duplicate-domain and normal ones), request indexing after deployment.
   - **Page indexing → Soft 404:** After a few recrawls (1–2 weeks), recheck “Affected pages”; the count should go down as Google recrawls and sees 301s and correct content.

4. **Ongoing**
   - Keep generating sitemaps with the canonical normalizer so no new duplicate-domain URLs are submitted.
   - For valid pages still reported as Soft 404, ensure each has a unique `<title>`, meta description, and enough visible content (e.g. 300+ words where appropriate).

## Stack

- **App:** Vite + React (SPA). All routes serve the same `index.html`; routing is client-side.
- **Hosting:** Redirects are configured for Netlify (`_redirects`, `netlify.toml`). If you use Vercel, ensure `vercel.json` has the same `/moneycal.in/*` → `/:path*` (and `/moneycal.in` → `/`) 301 redirects.
