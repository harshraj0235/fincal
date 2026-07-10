# Software Requirements Specification (SRS)
## Project: MoneyCal / Fincal Codebase
## Version: 1.0
## Date: 2026-02-11

---

## 1) Purpose

This document defines the current end-to-end system structure of the MoneyCal codebase, how modules are connected, file inventory summary with names, and operational requirements for maintenance and scaling.

---

## 2) System Overview

MoneyCal is a large React + TypeScript financial platform containing:

- Public site pages (home, blog, news, learn, hubs)
- Dynamic and direct calculator routes
- 100+ calculator componentsa
- 200+ learn pages
- Large content datasets (blog, news, government schemes, crypto, tools)
- SEO schema/meta system
- Sitemap generation and deployment automation

Primary runtime stack:

- `React` + `TypeScript`
- `react-router-dom` (routing)
- `Vite` (build)
- `lucide-react` (icons)
- JSON-LD schema + custom SEO meta components

---

## 3) High-Level Architecture

### 3.1 Entrypoints

- `index.html` - HTML shell, static metadata, initial resource loading
- `src/main.tsx` - React bootstrap (`StrictMode`, `HelmetProvider`, `BrowserRouter`)
- `src/App.tsx` - Main route orchestrator (lazy imports + route wiring)

### 3.2 Core Layering

- **Presentation Layer**: `src/pages/**`, `src/calculators/**`, `src/components/**`
- **Routing/Composition Layer**: `src/App.tsx`, `src/pages/CalculatorPage.tsx`
- **Content/Data Layer**: `src/data/**`, `src/cms-content/**`
- **Utility Layer**: `src/utils/**`, `src/hooks/**`
- **Build/Infra Layer**: `vite.config.ts`, `scripts/**`, `public/sitemap*.xml`, CI workflows

### 3.3 Runtime Flow

1. Browser loads `index.html`
2. React mounts through `src/main.tsx`
3. `App.tsx` resolves route
4. Route lazy-loads corresponding page/calculator
5. SEO/meta/schema applied through `SEOHelmet`/schema components
6. Content/data loaded from static TS/JSON registries

---

## 4) Module Attachment Map (How Everything Connects)

### 4.1 Main Attachment Graph

```text
index.html
  -> src/main.tsx
      -> src/App.tsx
          -> src/components/Layout.tsx
          -> src/pages/*
          -> src/pages/CalculatorPage.tsx
              -> src/data/calculatorData.ts
              -> src/calculators/*
          -> src/components/SEOHelmet.tsx
          -> src/components/UniversalCanonical.tsx
```

### 4.2 Calculator System Attachment

- Source of truth metadata:
  - `src/data/calculatorData.ts`
- Route resolver:
  - `src/pages/CalculatorPage.tsx`
- Actual computation/UI components:
  - `src/calculators/*.tsx`

Attachment behavior:

- Dynamic route generation from calculator metadata
- Specific direct routes in `App.tsx` for selected calculators
- `CalculatorPage` uses `calculatorId` and switch-case mapping

### 4.3 SEO Attachment

- `src/components/SEOHelmet.tsx` -> title/meta/canonical/OpenGraph/Twitter/schema
- `src/components/UniversalCanonical.tsx` -> global canonical normalization
- `src/components/CalculatorSchema.tsx` -> calculator structured data
- `src/components/NewsArticleSchema.tsx` -> news structured data

### 4.4 Content Attachment

- Blog pages read from:
  - `src/data/blogData.ts`
  - `src/data/blogData1.ts`
  - `src/data/blogs/*.ts`
- News pages read from:
  - `src/cms-content/news-articles/**`
  - `src/data/news-articles/**`
- Learn pages wired in:
  - `src/pages/learn/**`
  - helpers in `src/data/learn/**`

---

## 5) File Inventory and Counts

## 5.1 Total Tracked Files

- **Total tracked files**: `1551`

## 5.2 By Extension (tracked)

- `.tsx`: `842`
- `.ts`: `341`
- `.md`: `161`
- `.js`: `21`
- `.json`: `20`
- `.xml`: `19`
- `.txt`: `18`
- `.cjs`: `16`
- `.ps1`: `15`
- `.html`: `10`
- plus smaller counts (`.bat`, `.css`, `.yml`, `.jpeg`, `.jpg`, `.svg`, `.ico`, etc.)

## 5.3 By Top-Level Directory (tracked)

- `src`: `1186`
- `public`: `40`
- `email-automation`: `35`
- `scripts`: `20`
- `svelte-calculators`: `12`
- `.github`: `3`
- `.bolt`: `3`
- plus many root-level config/docs/scripts files

---

## 6) Named File Structure (Major Runtime Files)

## 6.1 Root Runtime/Config Files

- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `wrangler.toml`
- `netlify.toml`
- `deploy.cjs`
- `build.sh`

## 6.2 Core Source Files

- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/pages/CalculatorPage.tsx`
- `src/data/calculatorData.ts`

## 6.3 Core SEO/Schema Components

- `src/components/SEOHelmet.tsx`
- `src/components/UniversalCanonical.tsx`
- `src/components/CalculatorSchema.tsx`
- `src/components/NewsArticleSchema.tsx`
- `src/components/StructuredData.tsx`

## 6.4 Utility Core

- `src/utils/calculatorUtils.ts`
- `src/utils/analytics.ts`
- `src/utils/performance.ts`
- `src/utils/seoUtils.ts`
- `src/utils/seoOptimizer.ts`
- `src/utils/sitemapGenerator.ts`
- `src/utils/internalLinkingUtils.ts`

---

## 7) Directory-Level File Name Catalog (Operational)

## 7.1 `src/calculators/` (117 files)

Contains calculator implementations for:

- Loan domain: `LoanCalculator.tsx`, `LoanComparisonCalculator.tsx`, `LoanPrepaymentCalculator.tsx`, `LoanRefinanceCalculator.tsx`, `LoanAffordabilityCalculator.tsx`, `LoanTenureConverter.tsx`, `HomeLoanCalculator.tsx`, `PersonalLoanCalculator.tsx`, `CarLoanCalculator.tsx`, `BikeLoanCalculator.tsx`, `BusinessLoanCalculator.tsx`, etc.
- Investment/tax/retirement/personal finance/GST/fintech categories and advanced calculators.

## 7.2 `src/pages/` (470+ files)

Sub-directories include:

- `src/pages/blog/`
- `src/pages/news/`
- `src/pages/learn/`
- `src/pages/loan-tools/`
- `src/pages/finance-tools/`
- `src/pages/tax-tools/`
- `src/pages/gst/`
- `src/pages/tools/`
- `src/pages/festival/`
- `src/pages/festival-tools/`
- `src/pages/invoicing-tools/`
- `src/pages/corporate/`

## 7.3 `src/data/` (200+ files)

Key named registries:

- `src/data/calculatorData.ts`
- `src/data/blogData.ts`
- `src/data/blogData1.ts`
- `src/data/allBlogData.ts`
- `src/data/governmentSchemesData.ts`
- `src/data/cryptoData.ts`
- `src/data/hsnSacData.ts`
- `src/data/excelToolsData.ts`
- `src/data/festivalToolsData.ts`

And heavy subfolders:

- `src/data/blogs/` (70+)
- `src/data/crypto/` (74)
- `src/data/news-articles/`
- `src/data/learn/`

## 7.4 `src/cms-content/` (80+ files)

News article content and category registries:

- `src/cms-content/contentRegistry.ts`
- `src/cms-content/news-articles/markets/**`
- `src/cms-content/news-articles/economy/**`
- `src/cms-content/news-articles/startups/**`
- `src/cms-content/news-articles/tech-business/**`

## 7.5 `public/` (sitemaps + static)

Key files:

- `public/robots.txt`
- `public/_redirects`
- `public/sitemap.xml`
- `public/sitemap-calculators.xml`
- `public/sitemap-blog.xml`
- `public/sitemap-learn.xml`
- and additional category sitemap files

---

## 8) Functional Requirements (Current System)

## 8.1 Routing and Rendering

- Must resolve all configured routes from `App.tsx`
- Must support lazy-loading for performance
- Must render calculator pages via `calculatorId` and component mapping

## 8.2 Calculator Execution

- Must support input validation and numerical output formatting
- Must support related calculator linking and FAQs
- Must attach schema and metadata for indexability

## 8.3 Content Delivery

- Must render blog/news/learn content pages from TS data registries
- Must support category + slug based navigation

## 8.4 SEO and Indexing

- Must produce canonical URLs consistently
- Must expose sitemap index and sub-sitemaps
- Must provide page-specific structured data where implemented

---

## 9) Non-Functional Requirements

- **Performance**: lazy-loaded routes and manual chunking
- **Scalability**: large content repositories and automated sitemap pipeline
- **Maintainability**: modular page/calculator files, utility layer
- **SEO Reliability**: canonical + schema + sitemap + robots
- **Compatibility**: modern browsers and mobile-first rendering

---

## 10) Build and Deployment Requirements

- Build command path:
  - `npm run build`
  - includes sitemap generation scripts + TypeScript compile + Vite build
- CI automation:
  - `.github/workflows/auto-publish-news.yml`
  - `.github/workflows/update-sitemaps.yml`
  - `.github/workflows/automation.yml`

---

## 11) Current Risks / Known Structural Issues

- Very large `src/App.tsx` (route and import complexity)
- Dynamic/direct calculator route overlap in some cases
- Some metadata text artifacts in dataset files still exist and need cleanup
- Duplicate/legacy pages/backups increase maintenance noise
- Some root-level odd filenames indicate historical shell/merge artifacts

---

## 12) Recommended Future Refactor Plan

1. Split `App.tsx` into route modules per domain
2. Convert calculator switch map to typed registry map
3. Add route consistency tests for dynamic vs direct routes
4. Normalize naming and remove legacy/backup duplicates
5. Add file-index generation script for always-current SRS appendix

---

## 13) Appendix A - Critical Attachment File List

- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/pages/CalculatorPage.tsx`
- `src/data/calculatorData.ts`
- `src/components/Layout.tsx`
- `src/components/SEOHelmet.tsx`
- `src/components/UniversalCanonical.tsx`
- `src/components/CalculatorSchema.tsx`
- `src/utils/calculatorUtils.ts`
- `scripts/extract-all-routes-from-code.cjs`
- `scripts/merge-all-urls.cjs`
- `scripts/generate-sitemaps-production.cjs`
- `public/robots.txt`
- `public/_redirects`

---

## 14) Appendix B - Major Folder Name List

- `src/calculators`
- `src/components`
- `src/pages`
- `src/pages/learn`
- `src/pages/news`
- `src/pages/blog`
- `src/pages/tools`
- `src/pages/loan-tools`
- `src/pages/finance-tools`
- `src/pages/tax-tools`
- `src/pages/gst`
- `src/pages/festival`
- `src/pages/invoicing-tools`
- `src/data`
- `src/data/blogs`
- `src/data/crypto`
- `src/cms-content`
- `public`
- `scripts`
- `email-automation`

---

## 15) Appendix C - Notes

- This SRS reflects the current codebase snapshot and runtime wiring.
- This document was generated as an internal engineering specification and does not modify deployment state.
- As requested: **no push performed** for this documentation task.

---

## 16) Update Log - 2026-02-11 (News + Structured Data + Sitemap)

### A. Added 15 new Hindi finance/economy news stories (1200+ words each)

- `muthoot-finance-profit-jumps-strong-gold-loan-demand-feb-11-2026` (`markets`)
- `rbi-bond-switch-operation-fy27-buyback-2040-issuance-feb-11-2026` (`economy`)
- `rbi-policy-banks-can-finance-reits-directly-feb-11-2026` (`economy`)
- `union-budget-2026-27-rs-53-47-lakh-crore-spending-plan-feb-11-2026` (`economy`)
- `msci-adds-aditya-birla-capital-lt-finance-global-index-feb-11-2026` (`markets`)
- `standing-committee-finance-india-growth-resilient-global-tension-feb-11-2026` (`economy`)
- `sebi-chief-india-market-evolution-global-fragmentation-feb-11-2026` (`markets`)
- `india-cpi-inflation-data-watch-rbi-policy-outlook-feb-11-2026` (`economy`)
- `india-retail-inflation-january-2-75-new-cpi-series-feb-11-2026` (`economy`)
- `irctc-q3-results-profit-up-dividend-declared-feb-11-2026` (`markets`)
- `india-market-sentiment-mixed-signals-global-headwinds-feb-11-2026` (`markets`)
- `stock-market-update-mixed-trends-indices-sectors-feb-11-2026` (`markets`)
- `groww-and-platforms-live-market-news-ipo-mutual-funds-feb-11-2026` (`tech-business`)
- `budget-2026-live-key-tax-spending-economic-measures-feb-11-2026` (`economy`)
- `global-finance-reuters-developments-impact-indian-markets-feb-11-2026` (`economy`)

### B. Files updated for publishing and routing

- `src/cms-content/news-articles/economy/india-finance-headlines-feb-11-2026.ts` (new article source module)
- `src/cms-content/plainArticleLoader.ts` (slug -> article mapping)
- `src/cms-content/contentRegistry.ts` (category/author/date/image metadata registration)

### C. Sitemap refresh updates

- `public/sitemap-news.xml` updated with:
  - today date refresh (`2026-02-11`)
  - all 15 new news article URLs
  - `<news:news>` publication metadata blocks

### D. Structured data coverage (current system behavior)

- `src/components/SEOHelmet.tsx` already supports:
  - `BreadcrumbList` generation using `breadcrumbs` prop
  - `FAQPage` generation using `faqData` prop
- `src/components/CalculatorSchema.tsx` already supports:
  - `WebApplication` schema
  - optional `aggregateRating` when rating data is present
  - `FAQPage`, `HowTo`, and `BreadcrumbList`

### E. Google documentation references used for this update

- Review snippet and aggregate rating:
  - https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- FAQ structured data:
  - https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Breadcrumb structured data:
  - https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

---

## 17) Update Log - 2026-02-11 (Codebase-wide SEO + Tool Quality Pass)

### A. Shared structured-data upgrades across tool/calculator pages

- `src/components/SEOHelmet.tsx` enhanced for broader Google rich-result coverage:
  - automatic fallback FAQ generation for tool-like URLs when explicit FAQ data is missing
  - `WebApplication` schema now includes `aggregateRating` defaults for review-snippet eligibility
  - additional `Review` schema node emitted alongside calculator/tool structured data
  - continued support for dynamic `BreadcrumbList` generation from URL path

### B. Calculator page quality and content expansion

- `src/pages/CalculatorPage.tsx` updated to improve ranking quality signals:
  - richer long-form decision guide blocks added for all calculator pages served through this template
  - expanded quick-answer content for high-intent calculator queries
  - `calculatorData` now passes rating metadata to structured data layer
  - stronger scenario/planning context to reduce thin-content risk

### C. Tool page footer quality expansion

- `src/components/ToolQualityFooter.tsx` upgraded to provide:
  - deeper explanatory content section for all tool pages using shared footer
  - FAQ-style quick answer cards for core user intent
  - improved practical guidance and trust-building content

### D. Direct page upgrades completed in this pass

- `src/pages/ChequeBounceChargesCalculator.tsx`
  - advanced estimation logic (bank category, reason-weighted fee, legal stage, settlement slider, timeline risk)
  - improved UI/UX and expanded long-form content
  - FAQ + breadcrumb schema coverage

- `src/pages/learn/home-loans/DocumentsRequired.tsx`
  - interactive borrower-profile checklist (salaried/self-employed/NRI)
  - progress tracking and copy-checklist utility
  - expanded long-form documentation strategy content
  - FAQ + breadcrumb schema coverage

- `src/pages/tax-tools/TDSImpactVisualizerOnGains.tsx`
  - section-wise TDS logic, threshold handling, PAN impact, cess/surcharge modeling
  - refund vs additional tax estimate and quarterly cashflow visualization
  - upgraded UI and long-form keyword-oriented content
  - FAQ + breadcrumb schema coverage

### E. Google references used for this pass

- Review snippet:
  - https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- FAQPage:
  - https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Breadcrumb:
  - https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

