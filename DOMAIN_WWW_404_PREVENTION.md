# Domain & WWW 404 Prevention

## Issue Resolved (Feb 2026)

**Problem:** Google URL Inspection for `https://www.moneycal.in/` returned:
- "URL is not available to Google"
- "Page cannot be indexed: Not found (404)"
- "Page fetch: Failed: Not found (404)"

**Root Cause:** Site uses `moneycal.in` (non-www) as canonical. When Google or users hit `www.moneycal.in`, no redirect existed → 404.

## DO THIS IN NETLIFY (Required - 2 min)

**Redirects in code ONLY work if Netlify receives the request.** If www still 404s after deploy:

### Step 1: Add www domain
1. Go to **app.netlify.com** → your site → **Domain management**
2. Click **Add domain** or **Add domain alias**
3. Enter: `www.moneycal.in`
4. Add it

### Step 2: Verify DNS
- **If using Netlify DNS:** www CNAME should auto-create
- **If external DNS:** Ensure `www` CNAME points to your Netlify site (e.g. `your-site.netlify.app`)

### Step 3: Optional - Netlify UI redirect
Netlify → **Domain management** → find `www.moneycal.in` → **Options** → **Redirect** → set to `https://moneycal.in` (301)

## Fixes Applied in Code

### 1. netlify.toml
Explicit root + wildcard redirects (in order)

### 2. public/_redirects
Same rules as backup

## Canonical Consistency

- **Sitemaps:** `https://moneycal.in/...` (no www)
- **robots.txt Sitemap:** `https://moneycal.in/sitemap.xml`
- **index.html canonical:** `<link rel="canonical" href="https://moneycal.in" />`
- **All structured data:** `https://moneycal.in`

## Verification

After deploy:
1. `https://www.moneycal.in/` → 301 to `https://moneycal.in/`
2. `https://www.moneycal.in/blog` → 301 to `https://moneycal.in/blog`
3. Google Search Console URL Inspection → should succeed for www (after redirect)
