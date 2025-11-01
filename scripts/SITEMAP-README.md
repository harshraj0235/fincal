# 🗺️ Sitemap System - Production Ready

**Last Updated:** Nov 2025  
**Version:** 2.0 (Complete Rebuild)

---

## 📂 Architecture

```
scripts/
  └── generate-sitemaps-production.cjs  ← Main generator (runs on build)

public/
  ├── all-urls-complete.txt             ← Master URL list (1,666 URLs)
  ├── sitemap.xml                        ← Master index
  ├── sitemap-news.xml                   ← News articles (Google News format)
  ├── sitemap-calculators.xml            ← Calculators
  ├── sitemap-learn.xml                  ← Learn platform
  ├── sitemap-blog.xml                   ← Blog posts
  ├── sitemap-tools.xml                  ← Tools
  ├── sitemap-government.xml             ← Government schemes
  ├── sitemap-crypto.xml                 ← Crypto content
  └── sitemap-pages.xml                  ← Static pages
```

---

## ✨ Features

✅ **Auto-generates** on every build (`npm run build`)  
✅ **Scans codebase** for news articles (plainArticleLoader.ts)  
✅ **Google News compliant** (proper schema for news)  
✅ **Auto-splits** large categories (max 50,000 URLs per file)  
✅ **Never breaks** (error handling for missing files)  
✅ **Scalable** (add 10,000s of URLs without code changes)  
✅ **Validated** (checks URL format before adding)  
✅ **Deduplicates** (no duplicate URLs)  

---

## 🚀 How to Add New URLs

### Method 1: News Articles (Automatic!)
1. Create article in `src/cms-content/news-articles/[category]/`
2. Register in `src/cms-content/plainArticleLoader.ts`
3. **Done!** Script auto-detects and adds to `sitemap-news.xml`

### Method 2: Other Content (Manual)
1. Add URL to `public/all-urls-complete.txt`
2. Script auto-categorizes based on path:
   - `/blog/` → sitemap-blog.xml
   - `/calculator` → sitemap-calculators.xml
   - `/learn` → sitemap-learn.xml
   - `/tools/` → sitemap-tools.xml
3. **Done!** Appears in next build

---

## 📊 Current Stats

| Category | URLs | Priority | Changefreq |
|----------|------|----------|------------|
| **News** | 56 | 0.8 | daily |
| **Calculators** | 104 | 0.9 | monthly |
| **Learn** | 159 | 0.8 | weekly |
| **Blog** | 727 | 0.7 | weekly |
| **Tools** | 280 | 0.7 | monthly |
| **Government** | 185 | 0.7 | monthly |
| **Crypto** | 71 | 0.65 | weekly |
| **Pages** | 82 | 0.6 | monthly |
| **TOTAL** | **1,666** | — | — |

---

## 🎯 Google News Format (News Articles)

```xml
<url>
  <loc>https://moneycal.in/news/markets/article-slug</loc>
  <news:news>
    <news:publication>
      <news:name>MoneyCal</news:name>
      <news:language>hi</news:language>
    </news:publication>
    <news:publication_date>2025-11-09T10:00:00+05:30</news:publication_date>
    <news:title>Article Title</news:title>
    <news:keywords>markets, India, finance</news:keywords>
  </news:news>
  <lastmod>2025-11-09</lastmod>
  <priority>0.8</priority>
</url>
```

---

## 🔧 Manual Run (Local Testing)

```bash
cd fincal
node scripts/generate-sitemaps-production.cjs
```

Generates fresh sitemaps in `public/` directory.

---

## 🌐 Submit to Google

1. **Google Search Console:**
   - Submit: `https://moneycal.in/sitemap.xml`

2. **Google News Publisher Center:**
   - Submit: `https://moneycal.in/sitemap-news.xml`

3. **Verify:**
   - Check "Coverage" report
   - Monitor indexing status

---

## 🎊 Scalability

✅ **Can handle:** 1,000,000+ URLs (auto-splits into multiple files)  
✅ **Add 100 news articles:** Just register in plainArticleLoader  
✅ **Add 1000 blog posts:** Just add to all-urls-complete.txt  
✅ **No code changes needed!**  

---

## 🛡️ Error Handling

- ✅ Missing files → graceful skip
- ✅ Invalid URLs → auto-filtered
- ✅ Duplicate URLs → removed
- ✅ XML special chars → properly escaped
- ✅ Large categories → auto-split

**Never breaks the build!** 🎯

