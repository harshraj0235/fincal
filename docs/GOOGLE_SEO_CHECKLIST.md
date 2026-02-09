# Google SEO checklist – MoneyCal.in

All pages (calculators, blog, news, learn, tools, finance-tools, tax-tools, GST, insurance, government schemes, crypto, etc.) are **reachable on the website** via the app routes and sitemaps. This project uses **static export** (`output: 'export'`), so **getServerSideProps is not used** (and must not be added); content is served as static HTML + client-side routing so Googlebot and users see full content.

## ✅ Implemented for Google SEO

| Item | Status |
|------|--------|
| **Unique title per page** | Root layout + per-page via `SEOHelmet` (Blog, calculators, news, learn, tools, etc.) |
| **Meta description** | Root layout + `SEOHelmet` on key pages |
| **Canonical URL** | Set via `SEOHelmet` / Next metadata where used |
| **Sitemaps** | `/sitemap.xml` (Next.js) + generated `sitemap-*.xml` in `public/` (blog, news, learn, calculators, tax-tools, finance-tools, pages, etc.) |
| **robots.txt** | Allow `/`, disallow admin/private/api; sitemaps listed; `robots: index, follow` in layout |
| **Structured data (JSON-LD)** | Organization + WebSite in root layout; Blog/Article where applicable |
| **Mobile-friendly** | Responsive layout and viewport meta |
| **HTTPS** | Use HTTPS in production (Cloudflare) |
| **Internal links** | Home nav, footer, in-content links to all sections |
| **Content quality** | Substantial text on calculators, blog, learn, news; no thin content |

## Build and deploy

- **Static export** builds all pre-rendered routes; catch-all `[...slug]` + client `App` routes ensure every listed page (Blog, CAGRCalculator, BankTools, learn/*, news/*, etc.) **shows on the website** when the user or crawler visits its URL.
- Submit **https://moneycal.in/sitemap.xml** (and category sitemaps) in **Google Search Console** for indexing.

## Do not add

- **getServerSideProps** – Incompatible with `output: 'export'`. All content must be static or client-rendered.
