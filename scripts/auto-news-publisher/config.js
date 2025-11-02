/**
 * 🤖 AUTO NEWS PUBLISHER - CONFIGURATION
 * 
 * SETUP INSTRUCTIONS:
 * 1. Copy .env.example to .env
 * 2. Add your API keys
 * 3. Never commit .env (already in .gitignore)
 */

module.exports = {
  // 📰 News API Configuration
  newsAPI: {
    provider: 'google-news-rss', // Options: 'google-news-rss' (FREE!), 'gnews' (paid), 'newsapi' (paid)
    apiKey: process.env.GNEWS_API_KEY || '', // Only needed if using 'gnews'
    country: 'in', // India
    language: 'en',
    articlesPerCategory: 2, // 2 articles × 5 categories = 10 total/day
    categories: {
      markets: {
        keywords: 'stock market india, nifty sensex, share market news, market analysis india',
        author: 'Rajesh Sharma',
        slug: 'markets'
      },
      business: {
        keywords: 'business news india, corporate news, company earnings, mergers acquisitions india',
        author: 'Priya Patel',
        slug: 'business-analysis'
      },
      startups: {
        keywords: 'startup funding india, unicorn startup, venture capital india, new startup launch',
        author: 'Arjun Singh',
        slug: 'startups'
      },
      economy: {
        keywords: 'indian economy, GDP india, inflation rbi, economic policy india',
        author: 'Dr. Meera Kapoor',
        slug: 'economy'
      },
      techBusiness: {
        keywords: 'fintech india, tech ipo, digital transformation india, technology business',
        author: 'Vikram Iyer',
        slug: 'tech-business'
      }
    }
  },

  // 🤖 AI Content Generation
  ai: {
    provider: 'gemini', // Options: 'gemini' (free!), 'openai', 'claude'
    apiKey: process.env.GEMINI_API_KEY || '', // Get from: makersuite.google.com/app/apikey
    model: 'gemini-pro',
    temperature: 0.7, // 0.7 = balanced (creative but factual)
    minWords: 1000,
    maxWords: 1500,
    tone: 'professional, informative, Indian perspective',
    instructions: `Write a comprehensive, unique financial news article for Indian readers. 
    - Length: 1000-1500 words
    - SEO: Include long-tail keywords naturally
    - Structure: Title, Excerpt (150 words), 3-5 main sections with headings
    - Perspective: Indian market context, rupee prices, local examples
    - Tone: Professional yet accessible, avoid jargon
    - Facts: Accurate, cite sources if using statistics
    - Unique: DO NOT copy source articles - write fresh analysis/perspective
    - Internal links: Mention relevant calculators/tools
    - Call-to-action: Encourage readers to learn more`
  },

  // 🖼️ Image APIs
  images: {
    unsplash: {
      apiKey: process.env.UNSPLASH_ACCESS_KEY || '', // Get from: unsplash.com/developers
      perPage: 5, // Fetch 5 options, pick best
      orientation: 'landscape',
      size: 'regular' // 1080×720px
    },
    pexels: {
      apiKey: process.env.PEXELS_API_KEY || '', // Get from: pexels.com/api
      perPage: 5,
      orientation: 'landscape',
      size: 'large' // 1280×853px
    },
    fallback: true, // If both fail, use placeholder
    savePath: './public/images/news/'
  },

  // 📁 File Paths
  paths: {
    newsArticlesDir: './src/cms-content/news-articles/',
    plainArticleLoader: './src/cms-content/plainArticleLoader.ts',
    contentRegistry: './src/cms-content/contentRegistry.ts',
    sitemapScript: './scripts/generate-sitemaps-production.cjs',
    logFile: './logs/auto-publisher.log'
  },

  // ⏰ Schedule
  schedule: {
    enabled: true,
    time: '02:00', // 2:00 AM IST (low traffic time)
    timezone: 'Asia/Kolkata',
    articlesPerDay: 10
  },

  // 🔍 Google Search Console
  googleSearchConsole: {
    enabled: false, // Set true after OAuth setup
    serviceAccountKey: process.env.GSC_SERVICE_ACCOUNT_KEY || '',
    sitemapUrl: 'https://moneycal.in/sitemap.xml'
  },

  // 📊 Monitoring & Notifications
  notifications: {
    email: {
      enabled: false,
      to: 'your-email@example.com',
      from: 'noreply@moneycal.in'
    },
    slack: {
      enabled: false,
      webhookUrl: process.env.SLACK_WEBHOOK_URL || ''
    },
    console: true // Always log to console
  },

  // 🛡️ Safety & Quality Checks
  quality: {
    minWordCount: 1000,
    maxWordCount: 2000,
    plagiarismCheck: false, // Requires paid API
    humanReview: false, // Set true to save as drafts (manual review)
    maxArticlesPerDay: 10, // Safety limit
    skipWeekends: false // Publish on weekends?
  },

  // 🔐 Git Automation
  git: {
    autoCommit: true,
    autoPush: true,
    commitMessage: (date, count) => `feat: Auto-publish ${count} news articles - ${date}`,
    branch: 'main'
  }
};


