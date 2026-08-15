const https = require('https');
const fs = require('fs');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function analyzeSitemaps() {
  console.log("Fetching main sitemap index...");
  const sitemapIndexXml = await fetchUrl('https://moneycal.in/sitemap.xml');
  
  const sitemapRegex = /<loc>(https:\/\/moneycal\.in\/sitemap-[^<]+)<\/loc>/g;
  const sitemaps = [];
  let match;
  while ((match = sitemapRegex.exec(sitemapIndexXml)) !== null) {
    sitemaps.push(match[1]);
  }
  
  console.log(`Found ${sitemaps.length} sitemaps.`);
  
  let allUrls = [];
  
  for (const sitemapUrl of sitemaps) {
    console.log(`Fetching ${sitemapUrl}...`);
    try {
      const xml = await fetchUrl(sitemapUrl);
      const urlRegex = /<loc>(https:\/\/moneycal\.in\/[^<]+)<\/loc>/g;
      let urlMatch;
      while ((urlMatch = urlRegex.exec(xml)) !== null) {
        // Only keep the pathname
        const urlObj = new URL(urlMatch[1]);
        allUrls.push(urlObj.pathname);
      }
    } catch (e) {
      console.log(`Failed to fetch ${sitemapUrl}: ${e.message}`);
    }
  }
  
  // Save all URLs to a file
  fs.writeFileSync('live-urls.json', JSON.stringify(allUrls, null, 2));
  console.log(`Saved ${allUrls.length} total URLs to live-urls.json`);
}

analyzeSitemaps();
