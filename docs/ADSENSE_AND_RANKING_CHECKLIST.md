# Whole codebase – Google AdSense approval & quick ranking

This checklist applies to **both** the main app (Next.js/React) and the SvelteKit app so the whole codebase is set up for **easy AdSense approval** and **faster ranking**.

---

## ✅ Google AdSense approval (already in place)

### Required by Google

| Requirement | Main app (Next/React) | SvelteKit app |
|-------------|------------------------|----------------|
| **ads.txt** at root | ✅ `public/ads.txt` + `ads.txt` | ✅ `static/ads.txt` |
| **Privacy Policy** | ✅ `/privacy-policy` (2,500+ words) | ✅ `/privacy-policy` (summary + link) |
| **Terms of Service** | ✅ `/terms-of-service` | ✅ `/terms-of-service` |
| **Contact** | ✅ `/contact-us` | ✅ `/contact-us` |
| **About** | ✅ `/about-us` | ✅ `/about-us` (via catch-all) |
| **Substantial content** | ✅ 100+ pages, 50k+ words, calculators, blog, news | ✅ Shell + key routes |
| **AdSense script + meta** | ✅ `index.html` + `App.tsx` (ca-pub-4446717165665089) | Add when you run ads on SvelteKit |
| **Cookie / ad disclosure** | ✅ Privacy & Cookie policy mention AdSense | ✅ Privacy page mentions AdSense |

### After deploy – verify once

1. **ads.txt** – Open `https://moneycal.in/ads.txt` (or your domain). Must show:  
   `google.com, pub-4446717165665089, DIRECT, f08c47fec0942fa0`
2. **Policy pages** – Open `/privacy-policy`, `/terms-of-service`, `/contact-us`. No 404, readable content.
3. **Mobile** – Site usable on phone (no broken layout).
4. **No policy violations** – No adult content, no prohibited content, no invalid traffic.

If you **deploy SvelteKit** as the main site, keep `ads.txt` in `sveltekit-app/static/` (already added) and ensure Privacy/Terms/Contact are linked in the footer.

---

## ✅ Quick ranking (SEO already in place)

| Factor | Status |
|--------|--------|
| **Unique, useful content** | ✅ Calculators, learn, blog, news, tools (50k+ words). |
| **Title & description** | ✅ Per-page (Next `generateMetadata` / SEOHelmet; SvelteKit `<svelte:head>`). |
| **Canonical URLs** | ✅ Set on important pages. |
| **Sitemaps** | ✅ `sitemap.xml` + category sitemaps (news, learn, blog, etc.). |
| **robots.txt** | ✅ Allow Googlebot; sitemaps listed; no blocking of main content. |
| **Structured data** | ✅ JSON-LD (Organization, Article, HowTo, etc.) where needed. |
| **Internal links** | ✅ Footer, nav, in-content links to calculators/tools/learn. |
| **Mobile-friendly** | ✅ Responsive layout. |
| **HTTPS** | ✅ Use HTTPS in production (Cloudflare provides it). |
| **Core Web Vitals** | ✅ Aim for LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1 (improve if needed). |

### Optional for faster ranking

- **Google Search Console** – Add property for `https://moneycal.in`, submit sitemap, fix any crawl errors.
- **Fresh content** – Publish or update blog/news/learn regularly.
- **Backlinks** – Earn links from relevant, quality sites (guest posts, tools, data).
- **Page speed** – Keep bundles small (lazy load, optimize images). SvelteKit helps here.

---

## One-line summary

**AdSense:** ads.txt + Privacy/Terms/Contact/About + real content + no violations = whole codebase ready for approval.  
**Ranking:** Good titles, canonicals, sitemaps, structure, and content = set up for quick(er) ranking; use Search Console and keep improving speed and content.
