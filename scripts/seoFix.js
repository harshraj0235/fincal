import fs from 'fs';
import path from 'path';

const auditPath = path.join(process.cwd(), 'seo-audit.json');

if (!fs.existsSync(auditPath)) {
  console.error("No seo-audit.json found. Run seoAudit.js first.");
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));

let filesModified = new Set();

// Helper to read/write safely
function processFile(relPath, modifier) {
  const filePath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const newContent = modifier(content);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    filesModified.add(relPath);
  }
}

console.log("Fixing missing alt tags...");
audit.missingAlt.forEach(issue => {
  processFile(issue.file, (content) => {
    // If it's an img or Image without alt, add alt="MoneyCal Graphic"
    return content.replace(/<(img|Image)(?![^>]*\balt=)[^>]*>/g, (match) => {
      if (match.endsWith('/>')) {
        return match.slice(0, -2) + ' alt="MoneyCal Graphic" />';
      }
      return match.slice(0, -1) + ' alt="MoneyCal Graphic" >';
    });
  });
});

console.log("Fixing multiple H1s...");
audit.multipleH1.forEach(issue => {
  processFile(issue.file, (content) => {
    let h1Count = 0;
    // Replace <h1...> with <h2...> on 2nd+ occurrence
    let updated = content.replace(/<h1\b([^>]*)>/gi, (match, attrs) => {
      h1Count++;
      if (h1Count > 1) {
        return `<h2${attrs}>`;
      }
      return match;
    });
    
    // Replace </h1> with </h2> (we need to be careful, but since we replaced 2nd+ <h1...>, we must replace 2nd+ </h1>)
    let endCount = 0;
    updated = updated.replace(/<\/h1>/gi, (match) => {
      endCount++;
      if (endCount > 1) {
        return `</h2>`;
      }
      return match;
    });
    return updated;
  });
});

console.log("Fixing broken links...");
// Known redirects mapping
const redirects = {
  '/stock-market/tools-practical-application': '/calculators',
  '/stock-market/fundamental-analysis': '/calculators',
  '/stock-market/technical-analysis': '/calculators',
  '/religious-tools/puja-vidhi-generator': '/festival',
  '/insurance/compare/term-plans': '/insurance-tools',
  '/ipo/list/mainboard-ipo-list': '/ipo',
  '/ipo/list/sme-ipo-list': '/ipo'
};

audit.brokenLinks.forEach(issue => {
  processFile(issue.file, (content) => {
    let updated = content;
    const brokenHref = issue.href;
    
    let newHref = '/calculators'; // Default fallback
    
    if (redirects[brokenHref]) {
      newHref = redirects[brokenHref];
    } else if (brokenHref.includes('/astro-finance/')) {
      newHref = '/astro-finance';
    } else if (brokenHref.includes('excel-templates')) {
      newHref = '/excel-tools';
    } else if (brokenHref.includes('/tools/marketing')) {
      newHref = '/tools';
    }
    
    // Replace exact href strings safely
    const searchRegex = new RegExp(`href=["']${brokenHref}["']`, 'g');
    updated = updated.replace(searchRegex, `href="${newHref}"`);
    return updated;
  });
});

console.log(`Successfully patched ${filesModified.size} files for SEO.`);
