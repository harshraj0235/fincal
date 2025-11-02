# 🚀 AUTO NEWS PUBLISHER - COMPLETE SETUP GUIDE

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ GitHub repository with Actions enabled
- ✅ API keys for news and AI services

---

## 🔧 STEP-BY-STEP SETUP (15 Minutes)

### **STEP 1: Get API Keys (All Free Tiers Available!)**

#### **1A. Get GNews API Key (News Source)**
1. Visit: https://gnews.io
2. Sign up (free tier: 100 requests/day)
3. Get API key from dashboard
4. **Cost:** Free tier or $9/month (10,000 requests)

#### **1B. Get Gemini API Key (AI Writer) - FREE!**
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Create new key or use existing
4. **Cost:** FREE (60 requests/minute)

#### **1C. Get Unsplash API Key (Images) - FREE!**
1. Visit: https://unsplash.com/developers
2. Register as developer
3. Create new application
4. Get Access Key
5. **Cost:** FREE (50 requests/hour)

#### **1D. Get Pexels API Key (Backup Images) - FREE!**
1. Visit: https://www.pexels.com/api/
2. Sign up
3. Get API key from dashboard
4. **Cost:** FREE (200 requests/hour)

---

### **STEP 2: Configure GitHub Secrets**

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these secrets:

```
Name: GNEWS_API_KEY
Value: [Your GNews API key]

Name: GEMINI_API_KEY
Value: [Your Gemini API key]

Name: UNSPLASH_ACCESS_KEY
Value: [Your Unsplash access key]

Name: PEXELS_API_KEY
Value: [Your Pexels API key]
```

---

### **STEP 3: Install Dependencies**

```bash
cd fincal
npm install axios @google/generative-ai dotenv
```

---

### **STEP 4: Test Locally (Optional)**

```bash
# Create .env file (copy from .env.template)
cp scripts/auto-news-publisher/.env.template .env

# Add your API keys to .env
# GNEWS_API_KEY=your_key_here
# GEMINI_API_KEY=your_key_here
# ... etc

# Run the publisher
node scripts/auto-news-publisher/main.js
```

Expected output:
```
✅ Fetched 10 news topics
✅ Generated 10 articles
✅ Downloaded 10 images
✅ Published 10 articles
✅ Pushed to GitHub
```

---

### **STEP 5: Enable GitHub Actions**

1. Push code to GitHub (already done if you followed along)
2. Go to: Repository → Actions tab
3. You should see: "Auto-Publish News Articles" workflow
4. Click on it → Enable if disabled
5. **Manual run:** Click "Run workflow" to test

---

### **STEP 6: Verify Daily Automation**

The workflow runs automatically at **2:00 AM IST** every day.

To verify:
1. Check GitHub Actions tab next morning
2. Look for green ✅ (success) or red ❌ (failed)
3. View logs to see what happened
4. Check your website for new articles!

---

## 📊 What Happens Every Day at 2 AM IST?

```
1. GitHub Actions wakes up
2. Fetches 10 trending Indian financial news topics
3. AI generates 10 unique 1000+ word articles
4. Downloads relevant images from Unsplash/Pexels
5. Creates TypeScript files in cms-content/news-articles/
6. Updates plainArticleLoader.ts and contentRegistry.ts
7. Regenerates sitemaps
8. Commits and pushes to GitHub
9. Cloudflare auto-deploys in 5-10 minutes
10. New articles LIVE on website!
```

**Total time:** 10-15 minutes (fully automated!)

---

## 🎯 Customization Options

### **Change Publishing Time:**
Edit `.github/workflows/auto-publish-news.yml`:
```yaml
cron: '30 20 * * *'  # 2:00 AM IST
```

Convert to UTC: IST = UTC + 5:30
- 2 AM IST = 20:30 UTC (previous day)
- 10 AM IST = 04:30 UTC
- 6 PM IST = 12:30 UTC

### **Change Articles Per Day:**
Edit `scripts/auto-news-publisher/config.js`:
```javascript
articlesPerCategory: 2, // 2 × 5 categories = 10 total
```

### **Change Categories:**
Edit categories in `config.js`:
```javascript
categories: {
  markets: { keywords: '...', author: '...' },
  // Add/modify categories here
}
```

---

## 🔍 Monitoring & Logs

### **View Logs:**
```bash
# On GitHub
Repository → Actions → Latest workflow run → View logs

# Locally
cat logs/auto-publisher.log
```

### **Check Published Articles:**
```bash
# Count articles published today
ls -la src/cms-content/news-articles/*/*.ts | wc -l

# View latest articles
ls -lt src/cms-content/news-articles/*/*.ts | head -10
```

---

## ❓ Troubleshooting

### **Issue: Workflow not running**
**Fix:** 
- Check GitHub Actions is enabled (Settings → Actions → Allow all actions)
- Verify cron syntax is correct
- Check if repository has recent commits (GitHub disables workflows on inactive repos after 60 days)

### **Issue: Articles not generated**
**Fix:**
- Check API keys are correct (GitHub Secrets)
- Verify API quotas not exceeded (check GNews/Gemini dashboards)
- Check logs for specific error

### **Issue: Images not downloading**
**Fix:**
- Verify Unsplash/Pexels API keys
- Check internet connectivity
- Falls back to placeholder if both fail (safe!)

### **Issue: Git push failed**
**Fix:**
- Check GitHub token permissions (Settings → Actions → General → Workflow permissions → Read and write)
- Verify no merge conflicts

---

## 💰 Cost Breakdown (Monthly)

### **Free Tier (Recommended for Start):**
- GNews: Free (100 requests/day = 3 days/month) OR $9/month
- Gemini AI: FREE (generous limits!)
- Unsplash: FREE
- Pexels: FREE
- GitHub Actions: FREE (2,000 minutes/month)
- **Total: $0-9/month!** 🎉

### **Paid Tier (Unlimited):**
- GNews: $150/month
- Gemini AI: FREE
- Unsplash: FREE
- Pexels: FREE
- **Total: $150/month (~₹12,500)**

---

## 🎉 You're All Set!

Your automated news publishing system is now:
✅ Fetching trending news daily
✅ Generating unique AI articles
✅ Publishing to your website
✅ Submitting to Google
✅ Running 100% automatically!

**Sit back and watch your traffic grow! 📈**

Questions? Check logs or create GitHub issue.

