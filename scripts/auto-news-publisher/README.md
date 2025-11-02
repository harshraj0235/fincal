# 🤖 Automated News Publishing System

## 📋 Overview

This system automatically:
- ✅ Fetches 10 trending news topics daily from Google News (India-focused)
- ✅ Generates unique, plagiarism-free 1000+ word articles using AI
- ✅ Fetches relevant images from Unsplash/Pexels
- ✅ Publishes to CMS content (5 categories: Markets, Business, Startups, Economy, Tech)
- ✅ Auto-updates sitemap
- ✅ Submits to Google Search Console
- ✅ Runs automatically every 24 hours

---

## 🔧 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  1. NEWS FETCHER (Google News API / NewsAPI.org)            │
│     - Fetch 10 trending India business news topics          │
│     - Categorize: Markets, Business, Startups, Economy, Tech│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  2. AI CONTENT GENERATOR (OpenAI GPT-4 or Claude API)       │
│     - Generate 1000+ word unique article per topic          │
│     - SEO-optimized with long-tail keywords                 │
│     - Plagiarism-free, human-friendly content               │
│     - India-focused perspective                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  3. IMAGE FETCHER (Unsplash API + Pexels API)               │
│     - Search relevant image for article topic               │
│     - Download high-quality image                           │
│     - Save to /public/images/news/                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  4. ARTICLE PUBLISHER                                        │
│     - Create TypeScript file in cms-content/news-articles/  │
│     - Format: Google News compliant schema                  │
│     - Update plainArticleLoader.ts                          │
│     - Update contentRegistry.ts                             │
│     - Assign appropriate author per category                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  5. SITEMAP UPDATER                                          │
│     - Run generate-sitemaps-production.cjs                  │
│     - Submit to Google Search Console API                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  6. GIT AUTO-COMMIT & PUSH                                   │
│     - Git add all new files                                 │
│     - Commit with date + article titles                     │
│     - Push to GitHub (triggers Cloudflare build)            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 API Keys Needed

### **1. News API (Choose ONE):**
- **Google News API:** Free tier limited
- **NewsAPI.org:** $449/month for commercial (10,000 requests/day)
- **GNews API:** $150/month (100,000 requests/month)
- **Recommended:** NewsAPI.org (most reliable)

### **2. AI Content Generation (Choose ONE):**
- **OpenAI GPT-4:** $30-100/month (10 articles/day)
- **Claude API (Anthropic):** $20-80/month
- **Gemini API (Google):** Free tier available!
- **Recommended:** Gemini API (free + good for Indian context)

### **3. Image APIs (Free Tiers Available):**
- **Unsplash API:** 50 requests/hour (free)
- **Pexels API:** 200 requests/hour (free)
- **Both recommended:** Fallback if one fails

### **4. Google Search Console API:**
- Free, needs OAuth setup

---

## 💰 Monthly Cost Estimate

| Service | Cost |
|---------|------|
| News API (NewsAPI.org) | $449 (~₹37,000) |
| OR GNews API | $150 (~₹12,500) |
| OR Google News Scraper | Free (but violates ToS) |
| AI API (Gemini) | Free (with limits) |
| AI API (OpenAI GPT-4) | $30-100 (~₹2,500-8,000) |
| Image APIs (Unsplash + Pexels) | Free |
| Google Search Console | Free |
| Server (if needed) | $5-10/month (~₹400-800) |
| **Total (Budget Option)** | **₹12,500-15,000/month** |
| **Total (Premium Option)** | **₹40,000-50,000/month** |

---

## 🚀 Deployment Options

### **Option A: GitHub Actions (Recommended - Free!)**
- Runs on GitHub's servers
- Schedule: Cron job every 24 hours
- Auto-commits and pushes
- Free tier: 2,000 minutes/month (enough!)

### **Option B: Cloudflare Workers (Advanced)**
- Runs on edge
- Scheduled cron
- Cost: $5/month

### **Option C: Your Own Server (VPS)**
- DigitalOcean/AWS
- Full control
- Cost: $5-20/month

---

## 📝 Legal & Ethical Considerations

### ⚠️ **IMPORTANT DISCLAIMERS:**

1. **Copyright:** AI-generated content based on news = OK (not verbatim copy)
2. **Attribution:** Mention original source if directly referencing
3. **Google News Policy:** Original analysis/perspective required (not just rewrites)
4. **Plagiarism:** Use AI to generate unique content, not copy-paste
5. **Fact-Checking:** AI can hallucinate - verify facts before publishing
6. **Editorial Oversight:** Human review recommended (at least weekly audit)

### ✅ **Best Practices:**

- AI writes draft → Human edits → Publish
- Add original insights/Indian perspective
- Cite sources for data/statistics
- Update articles if facts change
- Monitor for AI hallucinations

---

## 🎯 Article Quality Checklist

Each auto-generated article must have:
- ✅ 1000-1500 words (not less!)
- ✅ SEO-optimized title (60 characters)
- ✅ Meta description (150 characters)
- ✅ 5+ long-tail keywords
- ✅ 3-5 relevant headings (H2/H3)
- ✅ Indian perspective/context
- ✅ Featured image (1200×630px)
- ✅ Author name (category-specific)
- ✅ Publish date
- ✅ Category tags
- ✅ Internal links (2-3 to related articles/calculators)
- ✅ Google News schema markup

---

## 📊 Categories & Author Assignment

| Category | Author Name | Focus Keywords |
|----------|-------------|----------------|
| Markets | Rajesh Sharma | stock market, Nifty, Sensex, market analysis |
| Business | Priya Patel | business news, corporate, earnings, mergers |
| Startups | Arjun Singh | startup funding, unicorns, VC, new launches |
| Economy | Dr. Meera Kapoor | GDP, inflation, RBI policy, economy trends |
| Tech Business | Vikram Iyer | fintech, tech IPO, digital transformation |

---

## 🔄 Workflow (Every 24 Hours)

```bash
# Runs at 2:00 AM IST daily

1. Fetch trending news (10 topics from 5 categories)
2. For each topic:
   a. Generate 1000+ word article (AI)
   b. Fetch relevant image (Unsplash/Pexels)
   c. Create .ts file in cms-content/news-articles/[category]/
   d. Generate unique slug
3. Update plainArticleLoader.ts (add all 10 articles)
4. Update contentRegistry.ts (add metadata)
5. Regenerate sitemaps
6. Git commit + push (triggers Cloudflare build)
7. Submit sitemap to Google Search Console
8. Log success + send notification
```

---

## 📁 File Structure

```
fincal/
├── scripts/auto-news-publisher/
│   ├── config.js              # API keys, settings
│   ├── news-fetcher.js        # Fetch trending topics
│   ├── ai-writer.js           # Generate article content
│   ├── image-fetcher.js       # Download images
│   ├── article-publisher.js   # Create TS files
│   ├── sitemap-updater.js     # Regenerate sitemaps
│   ├── git-auto-commit.js     # Auto commit & push
│   ├── google-indexing.js     # Submit to GSC
│   ├── main.js                # Orchestrator
│   └── README.md              # This file
├── .github/workflows/
│   └── auto-publish-news.yml  # GitHub Actions cron
└── .env                       # API keys (DO NOT COMMIT!)
```

---

## 🎯 Next Steps

I'll now create the complete automated system with:
1. ✅ News fetching script
2. ✅ AI content generation
3. ✅ Image downloading
4. ✅ Article publishing automation
5. ✅ GitHub Actions workflow
6. ✅ Configuration guide

**Proceeding with implementation...**


