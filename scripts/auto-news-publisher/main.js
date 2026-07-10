#!/usr/bin/env node

/**
 * 🤖 AUTO NEWS PUBLISHER - MAIN ORCHESTRATOR
 * Runs the complete automated news publishing pipeline
 */

const { fetchAllNews } = require('./news-fetcher');
const { generateArticles } = require('./ai-writer');
const { fetchImage } = require('./image-fetcher');
const { publishArticles } = require('./article-publisher');
const { notifyIndex } = require('../seo/indexing-client.cjs');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const config = require('./config');
const fs = require('fs');
const path = require('path');

/**
 * Main execution function
 */
async function main() {
  const startTime = new Date();
  console.log('╔═══════════════════════════════════════════════════════════════════════╗');
  console.log('║       🤖 AUTOMATED NEWS PUBLISHER - STARTING PIPELINE                ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════╝');
  console.log(`📅 Date: ${startTime.toLocaleDateString('en-IN')}`);
  console.log(`⏰ Time: ${startTime.toLocaleTimeString('en-IN')}\n`);

  const results = {
    newsFetched: 0,
    articlesGenerated: 0,
    imagesDownloaded: 0,
    articlesPublished: 0,
    errors: []
  };

  try {
    // STEP 1: Fetch trending news topics
    console.log('🔍 STEP 1: Fetching trending news...\n');
    const newsTopics = await fetchAllNews();
    results.newsFetched = newsTopics.length;

    if (newsTopics.length === 0) {
      throw new Error('No news topics fetched! Check API configuration.');
    }

    // STEP 2: Generate AI articles
    console.log('\n📝 STEP 2: Generating AI articles...\n');
    const articles = await generateArticles(newsTopics);
    results.articlesGenerated = articles.length;

    if (articles.length === 0) {
      throw new Error('No articles generated! Check AI API configuration.');
    }

    // STEP 3: Fetch images for articles
    console.log('\n🖼️  STEP 3: Fetching images...\n');
    const imagePaths = [];
    
    for (const article of articles) {
      try {
        const query = article.focusKeywords[0] || article.seoKeywords[0];
        const slug = generateSlug(article.title);
        const imagePath = await fetchImage(query, slug);
        imagePaths.push(imagePath);
        results.imagesDownloaded++;
      } catch (error) {
        console.error(`❌ Image fetch failed for "${article.title}":`, error.message);
        imagePaths.push('/images/news/placeholder.jpg');
        results.errors.push(`Image: ${error.message}`);
      }
    }

    // STEP 4: Publish articles to CMS
    console.log('\n📤 STEP 4: Publishing articles...\n');
    const publishedFiles = await publishArticles(articles, imagePaths);
    results.articlesPublished = publishedFiles.length;

    // STEP 5: Regenerate sitemaps
    console.log('\n🗺️  STEP 5: Regenerating sitemaps...\n');
    try {
      await execAsync('npm run generate-sitemaps');
      console.log('✅ Sitemaps regenerated successfully');
    } catch (error) {
      console.error('❌ Sitemap generation failed:', error.message);
      results.errors.push(`Sitemap: ${error.message}`);
    }

    // STEP 6: Git commit and push
    if (config.git.autoCommit && publishedFiles.length > 0) {
      console.log('\n📤 STEP 6: Committing and pushing to GitHub...\n');
      try {
        const date = new Date().toLocaleDateString('en-IN');
        const commitMsg = config.git.commitMessage(date, publishedFiles.length);
        
        await execAsync('git add .');
        await execAsync(`git commit -m "${commitMsg}"`);
        
        if (config.git.autoPush) {
          await execAsync(`git push origin ${config.git.branch}`);
          console.log('✅ Pushed to GitHub successfully');
        }
      } catch (error) {
        console.error('❌ Git operations failed:', error.message);
        results.errors.push(`Git: ${error.message}`);
      }
    }

    // STEP 7: Google Indexing API Ping
    if (publishedFiles.length > 0) {
      console.log('\n🔍 STEP 7: Indexing new articles...\n');
      for (const file of publishedFiles) {
        const url = `https://moneycal.in/news/${file.category}/${file.slug}`;
        await notifyIndex(url);
      }
    }

    // SUCCESS SUMMARY
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(1);

    console.log('\n╔═══════════════════════════════════════════════════════════════════════╗');
    console.log('║                    ✅ PIPELINE COMPLETED SUCCESSFULLY                 ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════╝');
    console.log(`\n📊 RESULTS:`);
    console.log(`   📰 News topics fetched: ${results.newsFetched}`);
    console.log(`   🤖 Articles generated: ${results.articlesGenerated}`);
    console.log(`   🖼️  Images downloaded: ${results.imagesDownloaded}`);
    console.log(`   📝 Articles published: ${results.articlesPublished}`);
    console.log(`   ⏱️  Duration: ${duration} minutes`);
    
    if (results.errors.length > 0) {
      console.log(`\n⚠️  WARNINGS (${results.errors.length}):`);
      results.errors.forEach(err => console.log(`   - ${err}`));
    }

    console.log('\n🎉 All articles published to CMS and pushed to GitHub!');
    console.log('🚀 Cloudflare will auto-build and deploy in 5-10 minutes.\n');

    // Log to file
    logResults(results, startTime, endTime);

    process.exit(0);
  } catch (error) {
    console.error('\n╔═══════════════════════════════════════════════════════════════════════╗');
    console.error('║                      ❌ PIPELINE FAILED                               ║');
    console.error('╚═══════════════════════════════════════════════════════════════════════╝\n');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);

    // Log error
    logError(error, results);

    process.exit(1);
  }
}

/**
 * Log results to file
 */
function logResults(results, startTime, endTime) {
  const logDir = path.dirname(config.paths.logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logEntry = {
    timestamp: startTime.toISOString(),
    date: startTime.toLocaleDateString('en-IN'),
    duration: ((endTime - startTime) / 1000 / 60).toFixed(1) + ' minutes',
    results,
    status: 'SUCCESS'
  };

  fs.appendFileSync(
    config.paths.logFile,
    JSON.stringify(logEntry, null, 2) + '\n---\n',
    'utf-8'
  );
}

/**
 * Log error to file
 */
function logError(error, partialResults) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    status: 'FAILED',
    error: error.message,
    stack: error.stack,
    partialResults
  };

  const logDir = path.dirname(config.paths.logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(
    config.paths.logFile,
    JSON.stringify(logEntry, null, 2) + '\n---\n',
    'utf-8'
  );
}

// Helper function to generate slug (for main.js scope)
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };


