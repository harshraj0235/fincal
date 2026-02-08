# Crawled – currently not indexed (Validation Failed) – Fix Summary

## Issue
- **Status:** Crawled - currently not indexed | **Validation:** Failed (Started 11/21/25, Failed 11/22/25)
- **Affected:** ~1.14K pages on moneycal.in

## Root cause addressed
1. **Duplicate path in URLs** – Some canonicals/sitemaps/links produced `https://moneycal.in/moneycal.in/...`. That confuses Google and can cause validation to fail.
2. **Canonical and sitemap consistency** – Canonicals and sitemap `<loc>` values are now normalized so the domain never appears twice in the path.

## Fixes applied in codebase

### 1. Canonical URL normalizer (`src/utils/canonicalUrl.ts`)
- `normalizePath(path)` – Strips leading `/moneycal.in` or `moneycal.in/` from paths.
- `normalizeCanonicalUrl(urlOrPath)` – Builds a single canonical and removes duplicate domain in path.
- `ensureNoDuplicateDomain(href)` – Ensures final href never contains `moneycal.in` twice.

### 2. Layout & SEO components
- **UniversalCanonical** – Uses `normalizePath(location.pathname)` and `normalizeCanonicalUrl` for custom canonicals.
- **SEOHelmet** – Canonical and `og:url` use `normalizeCanonicalUrl` and `ensureNoDuplicateDomain`; breadcrumb URLs normalized.
- **AdvancedSEO** – Same canonical normalization.

### 3. Sitemap scripts
- **generate-sitemaps-production.cjs** – `normalizeSitemapUrl()` applied when reading URL lists and when writing each `<loc>`.
- **merge-all-urls.cjs** – `normalizeUrl()` applied to every URL before adding to the master list.
- **extract-all-routes-from-code.cjs** – Route paths normalized before building full URLs.

## Project stack (for push/pull)
- **Framework:** **Vite + React** (not Next.js). Use the same repo; build and deploy as a Vite SPA.

## Git – push and pull

Run these in your project folder (e.g. `fincal-main` or repo root):

```bash
# Pull latest (if you have a remote)
git pull

# Stage indexing fix files
git add src/utils/canonicalUrl.ts
git add src/components/UniversalCanonical.tsx
git add src/components/SEOHelmet.tsx
git add src/components/AdvancedSEO.tsx
git add scripts/generate-sitemaps-production.cjs
git add scripts/merge-all-urls.cjs
git add scripts/extract-all-routes-from-code.cjs
git add CRAWLED_NOT_INDEXED_FIX_SUMMARY.md

# Commit
git commit -m "fix(indexing): canonical and sitemap URL normalization for Crawled-not-indexed"

# Push (if you have a remote)
git push
```

## After deploy

1. **Regenerate sitemaps**
   ```bash
   npm run generate-sitemaps
   ```
   Then upload the new sitemaps and submit the main sitemap in Google Search Console if needed.

2. **Redirect bad URLs (recommended)**  
   If your host supports it, add a 301 rule:
   - From: `https://moneycal.in/moneycal.in/*`
   - To: `https://moneycal.in/*`

3. **Re-request indexing**  
   In Search Console → URL Inspection, request indexing for a few important URLs (e.g. homepage, key blog/calculator URLs).

4. **Validate fix**  
   In **Page indexing → Crawled - currently not indexed**, click **Validate fix**. Validation can take several days.

## Note on “Crawled - currently not indexed”
Even with correct canonicals and sitemaps, Google may still choose not to index some URLs (e.g. thin or duplicate content, low crawl priority). The changes above ensure:
- No duplicate-domain URLs in canonicals or sitemaps.
- Consistent, single-version URLs so validation can succeed and indexing can improve over time.
