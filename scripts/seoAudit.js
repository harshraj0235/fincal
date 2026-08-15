import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const issues = {
  missingAlt: [],
  multipleH1: [],
  brokenLinks: [],
  missingMetadata: []
};

const validRoutes = new Set();
// Basic route collection from app directory
walkDir(path.join(srcDir, 'app'), (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    let route = filePath.replace(path.join(srcDir, 'app'), '').replace(/\\page\.tsx$/, '').replace(/\\/g, '/');
    if (route === '') route = '/';
    validRoutes.add(route);
  }
});

// Since dynamic routes like [id] or [slug] exist, we'll store them as regex patterns
const routePatterns = Array.from(validRoutes).map(r => {
  let pattern = r.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+');
  return new RegExp('^' + pattern + '$');
});

// Hardcode some known dynamic registries
validRoutes.add('/calculators');
validRoutes.add('/tools');
validRoutes.add('/discover');
validRoutes.add('/blog');

function isValidLink(href) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return true;
  if (href === '/') return true;
  
  // Remove query params and hashes
  let cleanHref = href.split('?')[0].split('#')[0];
  if (cleanHref.endsWith('/') && cleanHref.length > 1) cleanHref = cleanHref.slice(0, -1);
  
  if (validRoutes.has(cleanHref)) return true;
  
  for (let pattern of routePatterns) {
    if (pattern.test(cleanHref)) return true;
  }
  
  // Special dynamic checks based on actual data
  if (cleanHref.startsWith('/calculators/')) return true; // Handled by dynamic [id]
  if (cleanHref.startsWith('/discover/')) return true; // Handled by dynamic [slug]
  if (cleanHref.startsWith('/tools/')) return true; 
  if (cleanHref.startsWith('/gst-tools/')) return true; 
  if (cleanHref.startsWith('/learn/')) return true; 
  
  return false;
}

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Check for missing alt on img or Image
  const imgMatches = content.match(/<(img|Image)[^>]+>/g);
  if (imgMatches) {
    imgMatches.forEach(img => {
      if (!img.includes('alt=')) {
        issues.missingAlt.push({ file: relativePath, img });
      }
    });
  }
  
  // Check for multiple H1s in a single file
  const h1Matches = content.match(/<h1[^>]*>/g);
  if (h1Matches && h1Matches.length > 1) {
    issues.multipleH1.push({ file: relativePath, count: h1Matches.length });
  }
  
  // Check for Links
  const linkMatches = content.matchAll(/href=["'](.*?)["']/g);
  for (const match of linkMatches) {
    const href = match[1];
    if (!href.startsWith('{') && !isValidLink(href)) {
      issues.brokenLinks.push({ file: relativePath, href });
    }
  }
});

console.log("=== SEO AUDIT RESULTS ===");
console.log(`Missing Alt Tags: ${issues.missingAlt.length}`);
console.log(`Multiple H1s: ${issues.multipleH1.length}`);
console.log(`Potential Broken Links: ${issues.brokenLinks.length}`);

fs.writeFileSync('seo-audit.json', JSON.stringify(issues, null, 2));
console.log("Details saved to seo-audit.json");
