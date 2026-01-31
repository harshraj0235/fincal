# 🤖 Automated Blog Generation System

This system automatically generates high-quality, SEO-optimized blog posts daily at 6 AM IST by fetching news from RSS feeds and creating comprehensive finance articles.

## 🚀 Features

- **Automated RSS Feed Fetching**: Fetches latest news from 5 major Indian finance RSS feeds
- **AI-Generated Content**: Creates 1200+ word articles with proper SEO structure
- **Daily Automation**: Runs automatically at 6 AM IST every day
- **Cloud Deployment Ready**: Works on Vercel, Netlify, and other cloud platforms
- **Google SEO Optimized**: Includes structured data, meta descriptions, and Open Graph tags
- **Dynamic Home Page**: Shows latest blog posts on the home page
- **Plagiarism-Free**: Generates unique content for each article
- **Google News & Discover Ready**: Optimized for Google News and Discover ranking

## 📊 RSS Feeds Used

1. **Moneycontrol** - https://www.moneycontrol.com/rss/business.xml
2. **Economic Times** - https://economictimes.indiatimes.com/rssfeeds/837555174.cms
3. **Mint (Livemint)** - https://www.livemint.com/rss/money
4. **CNBC-TV18** - https://www.cnbctv18.com/commonfeeds/v1/cnbc-rss-feeds.xml
5. **Investing.com India** - https://in.investing.com/rss/news.rss

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Automation

```bash
# Create deployment configurations
node deploy-automation.cjs setup

# Test the blog generation (generates 20 blog posts)
node automated-blog-generator.cjs
```

### 3. Cloud Deployment Setup

#### Option A: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Setup GitHub Actions for automation (create `.github/workflows/automation.yml`):
```yaml
name: Automated Blog Generation
on:
  schedule:
    - cron: '0 6 * * *'  # 6 AM IST daily
  workflow_dispatch:  # Manual trigger

jobs:
  generate-blogs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node automated-blog-generator.cjs
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Auto-generated blog posts from RSS feeds"
          git push
```

#### Option B: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

### 4. Local Automation (Optional)

For local automation that runs even when your computer is off:

#### Using Windows Task Scheduler:

1. Create a batch file `run-automation.bat`:
```batch
@echo off
cd /d "C:\path\to\your\project"
node automated-blog-generator.cjs
```

2. Open Task Scheduler and create a new task:
   - Trigger: Daily at 6:00 AM
   - Action: Start a program
   - Program: `C:\path\to\run-automation.bat`

#### Using Linux/Mac Cron:

```bash
# Edit crontab
crontab -e

# Add this line (adjust path):
0 6 * * * cd /path/to/project && node automated-blog-generator.cjs
```

## 📁 File Structure

```
├── automated-blog-generator.cjs   # Main automation script
├── deploy-automation.cjs          # Deployment automation
├── src/
│   ├── components/
│   │   └── FinanceNewsSection.tsx # Home page news section
│   └── data/blogs/
│       ├── index.ts               # Blog index (auto-updated)
│       ├── types.ts               # TypeScript types
│       └── [652-800].ts           # Generated blog files
├── logs/                          # Automation logs
├── backups/                       # Backup files
└── crontab.txt                    # Cron job configuration
```

## 🔧 Configuration

### Blog Topics (652-800)

The system generates blogs on 149 different finance topics including:
- Stock Market Analysis
- Cryptocurrency Investment
- Real Estate Trends
- Mutual Fund Strategies
- Digital Banking
- Insurance Planning
- Tax Saving Options
- And many more...

### SEO Optimization

Each blog post includes:
- ✅ 1200+ words of high-quality content
- ✅ Meta descriptions and keywords
- ✅ Structured data (Schema.org)
- ✅ Open Graph tags
- ✅ FAQ schema
- ✅ Google Discover optimization
- ✅ Internal linking
- ✅ Related posts

### Content Structure

Each blog post contains:
1. **Introduction** - Overview of the topic
2. **Market Overview** - Current market analysis
3. **Key Trends** - Latest developments
4. **Investment Opportunities** - Available options
5. **Risk Assessment** - Risk factors and mitigation
6. **Strategic Recommendations** - Actionable advice
7. **Future Outlook** - Predictions and trends
8. **Conclusion** - Summary and next steps

## 🚀 Usage

### Manual Generation

```bash
# Generate 20 blog posts immediately
node automated-blog-generator.cjs
```

### Automated Generation

The system automatically:
1. Fetches latest news from RSS feeds
2. Generates 20 unique blog posts
3. Updates the blog index
4. Commits and pushes changes
5. Deploys to your platform

### Monitoring

Check logs for automation status:
```bash
# View latest log
tail -f logs/deployment-$(date +%Y-%m-%d).log

# View cron logs
tail -f logs/cron.log
```

## 📈 SEO Benefits

- **Google News**: Optimized for Google News inclusion
- **Google Discover**: Enhanced for Discover feed
- **Search Rankings**: Improved organic search visibility
- **User Engagement**: High-quality, engaging content
- **Internal Linking**: Strategic internal link structure
- **Fresh Content**: Daily updates keep content fresh

## 🔒 Security & Reliability

- **Error Handling**: Comprehensive error handling and retry logic
- **Backup System**: Automatic backups before changes
- **Logging**: Detailed logging for monitoring and debugging
- **Validation**: Content validation before publishing
- **Rate Limiting**: Respectful RSS feed access

## 📞 Support

For issues or questions:
1. Check the logs in the `logs/` directory
2. Verify RSS feed accessibility
3. Ensure all dependencies are installed
4. Check GitHub Actions status (if using)

## 🎯 Next Steps

1. **Setup GitHub Actions** for cloud automation
2. **Configure notifications** (email, Slack, etc.)
3. **Monitor performance** and adjust content generation
4. **Add more RSS feeds** for broader coverage
5. **Customize topics** based on your audience

---

**Note**: This system generates educational content. Always consult financial professionals for investment advice.
