const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../src/app/sitemap/SitemapClient.tsx');
let content = fs.readFileSync(sitemapPath, 'utf8');

const appDir = path.join(__dirname, '../src/app');
const calcData = fs.readFileSync(path.join(__dirname, '../src/data/calculatorData.ts'), 'utf8');

// Find all `{ title: '...', url: '/...', category: '...' }` blocks
const regex = /{([^}]*url:\s*['"]([^'"]+)['"][^}]*)}/g;

let totalFound = 0;
let totalRemoved = 0;

const newContent = content.replace(regex, (match, inner, url) => {
  totalFound++;

  // Dynamic routes we know exist from data arrays
  if (url.startsWith('/blog/')) return match;
  if (url.startsWith('/government-schemes/')) return match;
  if (url.startsWith('/crypto/')) return match;
  if (url.startsWith('/news/')) return match;
  if (url.startsWith('/gk/')) return match;
  if (url.startsWith('/excel-tools/')) return match;
  if (url.startsWith('/ipo/')) return match;
  if (url.startsWith('/festival-tools/')) return match;
  if (url.startsWith('/gold-tools/')) return match;
  if (url.startsWith('/learn/')) return match;

  // Check calculators
  if (url.startsWith('/calculators/')) {
    const slug = url.split('/calculators/')[1];
    if (slug && calcData.includes(`id: '${slug}'`)) {
      return match;
    }
    // If it doesn't exist in calculatorData, it's a hallucinated calculator
    totalRemoved++;
    return `{ title: 'All Calculators', url: '/calculators', category: 'calculator' }`;
  }

  // Check static app directory routes
  const segments = url.split('/').filter(Boolean);
  const dirPath = path.join(appDir, ...segments);

  if (segments.length === 0 || fs.existsSync(dirPath)) {
    return match; // Exists
  }

  // It's broken
  totalRemoved++;
  console.log(`❌ Removing broken sitemap link: ${url}`);
  // Replace with /tools to be safe
  return `{ title: 'Tools Hub', url: '/tools', category: 'finance' }`;
});

fs.writeFileSync(sitemapPath, newContent, 'utf8');
console.log(`\nSitemap Audit: Checked ${totalFound} static links. Replaced ${totalRemoved} broken links with fallbacks.`);
