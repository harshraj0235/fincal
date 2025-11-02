# ⚡ QUICK START - 5 Minutes to Launch!

## 🚀 **Get Your Automated News System Running NOW!**

---

## ✅ **STEP 1: Get FREE API Keys (3 Minutes)**

### **1. Gemini AI (FREE - Required)**
```
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Copy the key
```

### **2. Unsplash (FREE - Required)**
```
1. Visit: https://unsplash.com/developers
2. Sign up / Login
3. Click "New Application"
4. Copy "Access Key"
```

### **3. Pexels (FREE - Required)**
```
1. Visit: https://www.pexels.com/api/
2. Sign up / Login
3. Copy API key from dashboard
```

### **4. GNews (Optional - $9/month)**
```
1. Visit: https://gnews.io
2. Sign up
3. Copy API key

OR use free alternatives (Google News RSS) - already configured!
```

---

## ✅ **STEP 2: Add to GitHub (1 Minute)**

```bash
1. Go to: https://github.com/YOUR_USERNAME/fincal
2. Click: Settings
3. Click: Secrets and variables → Actions
4. Click: New repository secret

Add these 3-4 secrets:

Name: GEMINI_API_KEY
Value: [Paste your Gemini key]

Name: UNSPLASH_ACCESS_KEY
Value: [Paste your Unsplash key]

Name: PEXELS_API_KEY
Value: [Paste your Pexels key]

Name: GNEWS_API_KEY (optional)
Value: [Paste your GNews key]
```

---

## ✅ **STEP 3: Enable GitHub Actions (30 Seconds)**

```bash
1. Go to: Repository → Actions tab
2. If disabled, click "I understand, enable them"
3. Find workflow: "Auto-Publish News Articles"
4. Click "Enable workflow" (if needed)
```

---

## ✅ **STEP 4: Manual Test Run (Optional - 1 Minute)**

```bash
1. Go to: Actions tab
2. Click: "Auto-Publish News Articles"
3. Click: "Run workflow" dropdown
4. Click: "Run workflow" button
5. Wait 5-10 minutes
6. Check if 10 articles were published!
```

---

## 🎉 **DONE! You're Live!**

### **What Happens Now:**

✅ **Tomorrow 2 AM IST:** System automatically runs  
✅ **Fetches:** 10 trending India financial news  
✅ **Generates:** 10 unique 1000+ word articles  
✅ **Publishes:** To your website automatically  
✅ **Repeats:** Every 24 hours forever! 🔄

---

## 📊 **Verify It's Working:**

### **Check GitHub Actions:**
```
Repository → Actions → Latest workflow run
Look for green ✅ (success) or red ❌ (failed)
```

### **Check Website:**
```
Visit: https://moneycal.in/news
You should see 10 new articles!
```

### **Check Logs:**
```
Actions → Workflow run → View logs
See exactly what happened
```

---

## 🔧 **Troubleshooting:**

### **Problem: Workflow not running**
**Solution:** 
- Verify GitHub Actions enabled (Settings → Actions)
- Check if API keys added correctly (no extra spaces!)
- Ensure repository has recent commits (GitHub disables inactive repos)

### **Problem: Articles not generating**
**Solution:**
- Check Gemini API key is correct
- Verify API quota not exceeded (check Gemini dashboard)
- View workflow logs for specific error

### **Problem: Images failing**
**Solution:**
- Verify Unsplash/Pexels API keys
- Check API quotas (Unsplash: 50/hour, Pexels: 200/hour)
- System falls back to placeholder if both fail (safe!)

---

## ⚙️ **Customization (Optional):**

### **Change Publishing Time:**
Edit: `.github/workflows/auto-publish-news.yml`
```yaml
cron: '30 20 * * *'  # Current: 2 AM IST
# Change to your preferred time (in UTC - 5:30)
```

### **Change Articles Per Day:**
Edit: `scripts/auto-news-publisher/config.js`
```javascript
articlesPerCategory: 2, // 2 × 5 = 10 total
// Change to 3 for 15 articles/day
```

### **Change Categories:**
Edit: `scripts/auto-news-publisher/config.js`
```javascript
categories: {
  markets: { keywords: '...', author: '...' },
  // Modify keywords or add new categories
}
```

---

## 📈 **Expected Results:**

### **Week 1:**
- 70 articles published
- 100-500 organic visitors
- Initial indexing by Google

### **Month 1:**
- 300 articles published
- 1,000-3,000 organic visitors
- Multiple keywords ranking

### **Month 3:**
- 900 articles published
- 5,000-15,000 organic visitors
- Google Discover inclusion
- Top 20 rankings

### **Month 6:**
- 1,800 articles published
- 20,000-50,000 organic visitors
- Established authority
- **Revenue potential: ₹50,000-1,00,000/month**

### **Month 12:**
- 3,650 articles published
- 100,000+ organic visitors
- Domain authority 50+
- **Revenue potential: ₹2-5 Lakh/month**

---

## 💰 **Cost Breakdown:**

| Service | Cost | Tier |
|---------|------|------|
| Gemini AI | **FREE** | Generous free tier |
| Unsplash | **FREE** | 50 requests/hour |
| Pexels | **FREE** | 200 requests/hour |
| GNews | $9/month | Optional (can use free RSS) |
| GitHub Actions | **FREE** | 2,000 minutes/month |
| **TOTAL** | **$0-9/month** | 🎉 |

---

## 🎯 **Monetization Ready:**

Once you have traffic, monetize via:

1. **Google AdSense:** ₹20-50K/month (10K visitors)
2. **Affiliate Links:** Calculator → Products (₹30-80K/month)
3. **Premium Courses:** Based on content (₹50-200K/month)
4. **Sponsored Content:** ₹10-30K per article
5. **Consulting:** Establish authority

**Total Potential: ₹2-5 Lakh/month by Month 12!**

---

## 🏆 **You're All Set!**

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║        🎉 AUTOMATED NEWS SYSTEM ACTIVE! 🎉           ║
║                                                      ║
║   ✅ 10 Articles Daily (Automated!)                 ║
║   ✅ FREE to Run (0-9/month)                        ║
║   ✅ SEO Optimized (Google-friendly)                ║
║   ✅ 1000+ Words Each (High Quality)                ║
║   ✅ Images Included (Professional)                 ║
║   ✅ Runs While You Sleep 💤                        ║
║                                                      ║
║      SIT BACK & WATCH TRAFFIC GROW! 📈              ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

**Next check: Tomorrow morning - 10 new articles! 🚀**

---

**Questions? Check:**
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup
- `DEMO_OUTPUT.md` - Expected output
- GitHub Actions logs - Real-time status

**Happy Automating! 🤖🎉**

