# Page with redirect – moneycal.in (GSC)

## What “Page with redirect” means

Google crawled a URL, got a **301/302 redirect**, and therefore **does not index that URL**. It may index the **destination** URL instead. The 132 affected URLs are the **redirecting** (source) URLs, not the destinations.

## What was fixed

### 1. Hindi URLs (`/hi/*`) were 410 (Gone)

- **Before:** `netlify.toml` had `/hi/*` → `/404` with **status 410**. Google treated these as “permanently gone” and did not pass link equity to any destination.
- **After:** `/hi/*` now **301** to `/:splat` (e.g. `/hi/calculators/emi-calculator` → `/calculators/emi-calculator`). Same in `public/_redirects`. So Google can **index the destination** and pass equity.
- **Also:** Removed the “deprecated Hindi noindex” headers for `/hi/*` in `netlify.toml` (no content is served there; redirect response is sent).

### 2. Server-side 301 for `/excel` and `/contact`

- **Before:** Only client-side `<Navigate>` in the app, so Google got 200 + HTML and saw a “soft” redirect.
- **After:** **301** in `public/_redirects` and `netlify.toml`:
  - `/excel` → `/excel-tools`
  - `/contact` → `/contact-us`
- So Google gets a real 301 and can index the destination.

### 3. Explicit `/hi` → `/`

- Added `/hi` → `/` 301 in `_redirects` and `netlify.toml` so the bare `/hi` path redirects to homepage.

## What you should do next

1. **Deploy**  
   Deploy so the new redirects (301 for `/hi/*`, `/excel`, `/contact`, `/hi`) are live.

2. **Sitemap**  
   Ensure **destination** URLs are in your sitemap and indexable, e.g.:
   - `/calculators/emi-calculator`, `/excel-tools`, `/contact-us`, `/help-center`, `/finance-tools`, `/corporate-finance`, `/bank-tools`, `/crypto`, `/financial-education`, `/tools`, `/astro-finance`, etc.

3. **Google Search Console**  
   - The **132 “Page with redirect”** URLs will stay in the report as **redirecting** URLs (they are not supposed to be indexed).
   - Over time, Google will index the **destination** URLs if they are in the sitemap and not blocked. You can use **URL Inspection** on a few key destinations (e.g. `/calculators/emi-calculator`, `/contact-us`) and request indexing.
   - No need to “fix” the redirecting URLs themselves; the fix was making them **301** instead of **410** and ensuring destinations are canonical and in the sitemap.

## Redirect map (source → destination)

| Source (not indexed)        | Destination (should be indexed)   |
|----------------------------|-----------------------------------|
| `http://moneycal.in/*`     | `https://moneycal.in/:splat`      |
| `/hi`, `/hi/*`             | `/`, `/:splat`                    |
| `/excel`                   | `/excel-tools`                    |
| `/contact`                 | `/contact-us`                     |
| `/feedback`                | `/contact-us`                     |
| `/help`                    | `/help-center`                    |
| `/loan-tools/*`            | `/calculators/:splat`             |
| `/business-tools`, etc.    | `/corporate-finance`              |
| `/invoicing-tools/*`       | `/corporate-finance`              |
| `/financial-navigator`     | `/tools`                          |
| `/astro-finance-insights`  | `/astro-finance`                  |
| `/lcm-hcf-calculator`      | `/calculators/lcm-hcf-calculator`|
| `/calculators/lumpsum-calculator` | `/calculators/sip-calculator` |
| (others)                   | See `public/_redirects`           |

All of these are **301** so Google can consolidate to the destination URL.
