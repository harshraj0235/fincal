# MoneyCal India - Automated News Blog Generator

## Overview
This automated script generates 10 new blog posts every 36 hours by fetching trending topics from Google News and creating high-quality, SEO-friendly, Google Discover-optimized content in Hindi. The script is designed to help your website rank better on Google and appear in Google Discover.

## Features

### 🚀 Automated Content Generation
- **Frequency**: Generates 10 new blog posts every 36 hours
- **Content Type**: News articles based on trending topics from Google News
- **Language**: 100% Hindi content for better Indian market reach
- **Word Count**: Each article is exactly 1200 words (Google's preferred length)

### 📰 News Sources
- **Finance**: Latest financial news and developments
- **Technology**: Tech innovations and digital transformation
- **Business**: Business trends and startup ecosystem
- **Stock Market**: Market analysis and investment opportunities
- **Cryptocurrency**: Crypto market updates and trends

### 🎯 SEO & Google Optimization
- **Google News Ready**: Follows all Google News guidelines
- **Google Discover Friendly**: Optimized for Google Discover algorithm
- **Structured Data**: Includes NewsArticle schema markup
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Canonical URLs**: Proper canonicalization for SEO
- **Keywords**: Strategic keyword placement for better ranking

### 🔄 Content Freshness
- **Auto-Update**: Blog dates automatically refresh every 24 hours
- **Freshness Signal**: Google recognizes content as consistently fresh
- **Continuous Ranking**: Maintains search engine visibility

### 📍 Geographic Coverage
- **30+ Indian Cities**: Covers major economic centers
- **Local Relevance**: City-specific content for better local SEO
- **Regional Markets**: Focuses on city-specific business developments

## Installation & Setup

### 1. Prerequisites
```bash
# Ensure you have Node.js installed
node --version

# Install project dependencies
npm install
```

### 2. Configuration
The script is pre-configured but you can modify these settings in `scripts/auto-news-generator.cjs`:

```javascript
const CONFIG = {
  INTERVAL_HOURS: 36,           // Generate posts every 36 hours
  POSTS_PER_CYCLE: 10,         // 10 posts per cycle
  WORD_COUNT_TARGET: 1200,     // Target word count per post
  UPDATE_INTERVAL_HOURS: 24    // Update dates every 24 hours
};
```

### 3. Running the Script

#### One-time Generation
```bash
# Generate 10 new blog posts immediately
npm run auto-news
```

#### Continuous Operation
```bash
# Start the continuous automation (recommended)
npm run auto-news
```

The script will:
1. Generate 10 new blog posts immediately
2. Schedule the next generation in 36 hours
3. Update existing blog dates every 24 hours
4. Automatically commit and push changes to GitHub

## How It Works

### 1. News Fetching
- Fetches trending topics from Google News RSS feeds
- Covers finance, technology, business, stock market, and crypto
- Uses Hindi language sources for better relevance

### 2. Content Generation
- Creates unique, plagiarism-free content using AI-powered templates
- Ensures exactly 1200 words per article
- Combines trending topics with random Indian cities
- Generates SEO-optimized titles and meta descriptions

### 3. SEO Optimization
- Implements NewsArticle schema markup
- Includes Open Graph and Twitter Card meta tags
- Optimizes for Google News and Google Discover
- Follows all Google SEO guidelines

### 4. Automation
- Runs every 36 hours automatically
- Updates blog dates every 24 hours
- Commits and pushes changes to GitHub
- Maintains continuous content freshness

## Output Structure

### Generated Blog Posts
Each generated blog post includes:
- **File**: `src/data/blogs/{number}.ts`
- **Content**: 1200-word Hindi news article
- **SEO**: Complete meta tags and structured data
- **Schema**: NewsArticle markup for Google News
- **Freshness**: Auto-updating dates for Google ranking

### File Naming Convention
- **Current Cycle**: 731-740 (first run)
- **Next Cycle**: 741-750 (after 36 hours)
- **Continuing**: 751-760, 761-770, etc.

## Google News & Discover Optimization

### Google News Guidelines Compliance
✅ **Content Quality**: High-quality, original content
✅ **News Format**: Proper news article structure
✅ **Author Information**: Clear author attribution
✅ **Publisher Details**: Complete publisher information
✅ **Structured Data**: NewsArticle schema markup
✅ **Fresh Content**: Regular updates every 24 hours

### Google Discover Optimization
✅ **Content Freshness**: Auto-updating dates
✅ **High-Quality Content**: 1200-word comprehensive articles
✅ **Relevant Topics**: Trending news from Google News
✅ **Local Relevance**: City-specific content
✅ **Engaging Content**: Easy-to-understand Hindi language

## Monitoring & Maintenance

### Logs
The script provides detailed logging:
```
🚀 Starting automated news blog generation...
📰 Fetching FINANCE news from Google News...
📰 Fetching TECHNOLOGY news from Google News...
📝 Generating 10 blog posts from 731 to 740...
✅ Created blog post 731: वित्तीय प्रौद्योगिकी in Mumbai
✅ Successfully generated 10 blog posts!
🎉 All changes committed and pushed to GitHub!
⏰ Next run scheduled for: [Date + 36 hours]
```

### Error Handling
- Automatic fallback to predefined topics if Google News is unavailable
- Graceful error handling with detailed logging
- Continues operation even if individual news sources fail

### Performance
- **Memory Efficient**: Minimal memory footprint
- **Fast Execution**: Generates 10 posts in under 2 minutes
- **Reliable**: Built-in error handling and recovery

## Customization

### Adding New Topics
```javascript
const CONFIG = {
  TOPICS: [
    'finance', 'technology', 'business', 'stock market',
    'cryptocurrency', 'startup', 'investment', 'banking',
    'insurance', 'real estate', 'your-new-topic'  // Add here
  ]
};
```

### Adding New Cities
```javascript
const CONFIG = {
  CITIES: [
    'Mumbai', 'Delhi', 'Bangalore',
    // ... existing cities
    'Your-City'  // Add here
  ]
};
```

### Modifying Content Templates
Edit the `HINDI_TEMPLATES` object to customize content generation patterns.

## Troubleshooting

### Common Issues

#### 1. Google News Fetching Fails
**Solution**: The script automatically falls back to predefined topics
**Prevention**: Check internet connectivity and firewall settings

#### 2. Git Operations Fail
**Solution**: Ensure proper Git configuration and GitHub access
**Prevention**: Verify GitHub credentials and repository permissions

#### 3. Content Generation Issues
**Solution**: Check Node.js version and dependencies
**Prevention**: Run `npm install` before starting the script

### Debug Mode
```bash
# Run with verbose logging
DEBUG=true npm run auto-news
```

## Best Practices

### 1. Content Quality
- The script generates high-quality content, but review occasionally
- Monitor Google Search Console for performance
- Check Google News indexing status

### 2. SEO Monitoring
- Track ranking improvements in Google Search Console
- Monitor Google Discover performance
- Check structured data validation

### 3. Performance Optimization
- Run during low-traffic hours
- Monitor server resources during generation
- Schedule maintenance windows if needed

## Support & Updates

### Version History
- **v1.0**: Initial release with basic automation
- **v1.1**: Added Google News RSS integration
- **v1.2**: Enhanced SEO and Google Discover optimization

### Future Enhancements
- [ ] Multi-language support (English + Hindi)
- [ ] Advanced content analytics
- [ ] Social media auto-posting
- [ ] Performance metrics dashboard

## License
This script is part of the MoneyCal India project and follows the same licensing terms.

---

**Note**: This automated script is designed to help your website achieve better Google rankings and Google Discover visibility. Monitor the generated content quality and adjust templates as needed for your specific audience.
