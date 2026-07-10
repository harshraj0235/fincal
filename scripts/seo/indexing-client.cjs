/**
 * 🔍 GOOGLE INDEXING API CLIENT
 * Programmatically notifies Google about new or updated URLs
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');

const keyPath = path.join(__dirname, '../../gsc-key.json');

// LOAD CREDENTIALS
if (!fs.existsSync(keyPath)) {
  console.error('❌ ERROR: gsc-key.json not found in project root!');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

// NORMALIZE PRIVATE KEY
const privateKey = key.private_key.replace(/\\n/g, '\n');

// AUTHENTICATE
const auth = new google.auth.JWT(
  key.client_email,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/indexing']
);

/**
 * Notify Google about a URL update
 * @param {string} url - The URL to index
 * @param {string} type - URL_UPDATED or URL_DELETED
 */
async function notifyIndex(url, type = 'URL_UPDATED') {
  try {
    const indexing = google.indexing({ version: 'v3', auth });
    
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type
      }
    });
    
    console.log(`✅ Success [${type}]: ${url}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error indexing ${url}:`, error.message);
    if (error.response && error.response.data && error.response.data.error) {
      console.error('   Details:', error.response.data.error.message);
    }
    return null;
  }
}

/**
 * Process URLs from a JSON file
 * @param {string} filePath - Path to unindexed-urls.json
 */
async function processBatch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ERROR: File ${filePath} not found!`);
    return;
  }

  const urls = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`🚀 Processing batch of ${urls.length} URLs...\n`);

  for (const url of urls) {
    await notifyIndex(url);
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✨ Batch processing complete!');
}

/**
 * Process URLs from a Sitemap
 * @param {string} sitemapUrl - URL to sitemap.xml
 */
async function processSitemap(sitemapUrl) {
  try {
    console.log(`📡 Fetching sitemap: ${sitemapUrl}...`);
    const response = await axios.get(sitemapUrl);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    
    let urls = [];
    if (result.urlset && result.urlset.url) {
      urls = result.urlset.url.map(u => u.loc[0]);
    } else if (result.sitemapindex && result.sitemapindex.sitemap) {
      // It's a sitemap index! Recurse into sub-sitemaps
      const subSitemaps = result.sitemapindex.sitemap.map(s => s.loc[0]);
      console.log(`📁 Found sitemap index with ${subSitemaps.length} sub-sitemaps. Processing...`);
      for (const sub of subSitemaps) {
        await processSitemap(sub);
      }
      return;
    }

    console.log(`🚀 Processing ${urls.length} URLs from sitemap...\n`);
    for (const url of urls) {
      await notifyIndex(url);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error(`❌ Error processing sitemap ${sitemapUrl}:`, error.message);
  }
}

// CLI SUPPORT
const args = process.argv.slice(2);
if (args[0] === '--batch') {
  const batchFile = args[1] || path.join(__dirname, 'unindexed-urls.json');
  processBatch(batchFile);
} else if (args[0] === '--url') {
  notifyIndex(args[1]);
} else if (args[0] === '--sitemap') {
  const sitemapUrl = args[1] || 'https://moneycal.in/sitemap.xml';
  processSitemap(sitemapUrl);
} else {
  console.log('Usage:');
  console.log('  node scripts/seo/indexing-client.cjs --url <URL>');
  console.log('  node scripts/seo/indexing-client.cjs --batch <path_to_json>');
  console.log('  node scripts/seo/indexing-client.cjs --sitemap <sitemap_url>');
}

module.exports = { notifyIndex, processBatch, processSitemap };
