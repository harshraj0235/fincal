const fs = require('fs');

function analyzeMissingRoutes() {
  const logPath = 'C:\\Users\\harshraj\\.gemini\\antigravity-ide\\brain\\796a466c-9f04-4143-bc0d-f070f80e6001\\.system_generated\\tasks\\task-3806.log';
  const liveUrlsPath = 'live-urls.json';

  const logContent = fs.readFileSync(logPath, 'utf8');
  const liveUrls = JSON.parse(fs.readFileSync(liveUrlsPath, 'utf8'));

  // Extract built routes from Next.js log
  const builtRoutes = new Set();
  const lines = logContent.split('\n');
  
  for (const line of lines) {
    // Next.js static output starts with ├ ○ or └ ○ or ├ ● or └ ●
    const match = line.match(/^[├└] [○●] (\/[^\s]+)/);
    if (match) {
      builtRoutes.add(match[1]);
    }
  }
  
  // Also add some known dynamic routes that might not be fully statically generated
  builtRoutes.add('/calculators/[id]');
  builtRoutes.add('/crypto/[slug]');
  builtRoutes.add('/news/[slug]');
  builtRoutes.add('/news/[category]/[slug]');
  builtRoutes.add('/blog/[slug]');
  builtRoutes.add('/discover/[slug]');
  
  console.log(`Extracted ${builtRoutes.size} static/dynamic routes from Next.js build log.`);
  
  const missingUrls = [];
  
  for (let url of liveUrls) {
    if (url === '/') continue;
    
    // Remove trailing slash if present
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    
    if (builtRoutes.has(url)) continue;
    
    // Check dynamic route patterns
    let foundDynamic = false;
    if (url.startsWith('/calculators/')) foundDynamic = true;
    if (url.startsWith('/crypto/')) foundDynamic = true;
    if (url.startsWith('/news/')) foundDynamic = true;
    if (url.startsWith('/blog/')) foundDynamic = true;
    if (url.startsWith('/discover/')) foundDynamic = true;
    if (url.startsWith('/government-schemes/')) foundDynamic = true;
    if (url.startsWith('/excel-tools/')) foundDynamic = true;
    
    if (!foundDynamic) {
      missingUrls.push(url);
    }
  }
  
  // Filter out image/media URLs or specific non-page URLs if any
  const filteredMissing = missingUrls.filter(u => !u.includes('.png') && !u.includes('.jpg'));
  
  console.log(`Found ${filteredMissing.length} live URLs that are missing in our Next.js app.`);
  
  // Group missing URLs by their base path to see patterns
  const groupings = {};
  for (const url of filteredMissing) {
    const segments = url.split('/').filter(Boolean);
    const base = segments.length > 0 ? '/' + segments[0] : '/';
    if (!groupings[base]) groupings[base] = 0;
    groupings[base]++;
  }
  
  console.log("Missing URL breakdown by base path:");
  const sortedEntries = Object.entries(groupings).sort((a,b) => b[1] - a[1]);
  for (const [base, count] of sortedEntries) {
    console.log(`  ${base}: ${count} missing URLs`);
  }
  
  // Print some examples of missing bank-tools, insurance-tools, etc.
  const examplesToPrint = ['/insurance-tools', '/bank-tools', '/corporate-finance', '/gold-tools', '/loan-tools', '/gst-tools', '/festival-tools', '/tools'];
  for (const base of examplesToPrint) {
    const examples = filteredMissing.filter(u => u.startsWith(base)).slice(0, 3);
    if (examples.length > 0) {
      console.log(`\nExamples for ${base}:`);
      examples.forEach(e => console.log(`  - ${e}`));
    }
  }
}

analyzeMissingRoutes();
