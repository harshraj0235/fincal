import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://moneycal.in';

function getKeywordFromPath(p) {
    const slug = path.basename(p, '.html');
    if (slug === 'index') {
        const parent = path.basename(path.dirname(p));
        return parent === 'dist' ? 'home' : parent.replace(/-/g, ' ');
    }
    return slug.replace(/-/g, ' ');
}

function processHtmlFile(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = html.match(/<meta\s+(?:name|property)="description"\s+content="([^"]*)"/is) || html.match(/<meta\s+content="([^"]*)"\s+(?:name|property)="description"/is);
    const desc = descMatch ? descMatch[1].trim() : '';

    // Extract H1s (case insensitive, match across newlines)
    const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map(m => m[1].replace(/<[^>]*>/g, '').trim());

    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/is);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';

    // Simple text extraction - strip all HTML tags
    const textContext = html.replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/(&nbsp;|&amp;|&quot;|&lt;|&gt;)/g, ' ')
        .trim();
    // Rough word count
    const wordCount = textContext.split(/\s+/).filter(w => w.length > 2).length;

    return { title, desc, h1s, canonical, wordCount };
}

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

console.log('Starting full Googlebot SEO Audit on prerendered HTML...');
const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files to audit.`);

let issues = [];
let passCount = 0;

for (const file of htmlFiles) {
    if (file.includes('404')) continue;

    const relPath = file.replace(DIST_DIR, '').replace(/\\/g, '/');
    const urlPath = relPath.endsWith('index.html') ? relPath.replace('/index.html', '') || '/' : relPath.replace('.html', '');

    let data;
    try {
        data = processHtmlFile(file);
    } catch (e) {
        issues.push({ url: BASE_URL + urlPath, issues: ['File parsing error'] });
        continue;
    }

    const expectedKeyword = getKeywordFromPath(file).toLowerCase();
    const pageIssues = [];

    if (!data.title) pageIssues.push('Missing Title');
    else if (data.title.length < 10) pageIssues.push(`Title too short (${data.title.length} chars)`);
    else if (data.title.length > 135) pageIssues.push(`Title too long (${data.title.length} chars)`);

    if (!data.desc) pageIssues.push('Missing Meta Description');
    else if (data.desc.length < 50) pageIssues.push(`Description too short (${data.desc.length} chars)`);
    else if (data.desc.length > 170) pageIssues.push(`Description too long (${data.desc.length} chars)`);

    if (data.h1s.length === 0) pageIssues.push('Missing H1');
    else if (data.h1s.length > 1) pageIssues.push(`Multiple H1s (${data.h1s.length})`);

    if (!data.canonical) pageIssues.push('Missing Canonical Link');

    if (data.wordCount < 200) pageIssues.push(`Thin Content (${data.wordCount} words)`);

    const isHinglish = expectedKeyword.includes('rupaye') || expectedKeyword.includes('kare') || expectedKeyword.includes('hindi') || expectedKeyword.includes('se') || expectedKeyword.includes('mein') || expectedKeyword.includes('liye');

    if (expectedKeyword && expectedKeyword !== 'home' && !isHinglish) {
        const titleLower = data.title.toLowerCase();
        const h1Lower = data.h1s.length > 0 ? data.h1s[0].toLowerCase() : '';

        const kwWords = expectedKeyword.replace(/-/g, ' ').split(' ').filter(w => w.length > 3 && !['with', 'that', 'this', 'from', 'for', 'the', 'and', 'india', 'how', 'what', 'why', 'are', 'can', 'does', 'buy', 'sell', 'guide'].includes(w));
        let titleHasKw = 0;
        let h1HasKw = 0;

        for (const w of kwWords) {
            // Strip plural 's' for basic stemming
            const stem = w.endsWith('s') ? w.slice(0, -1) : w;
            if (titleLower.includes(stem)) titleHasKw++;
            if (h1Lower.includes(stem)) h1HasKw++;
        }

        if (kwWords.length > 0) {
            if (titleHasKw === 0) pageIssues.push(`Title lacks relevance to URL keyword "${expectedKeyword}"`);
            if (h1HasKw === 0 && data.h1s.length > 0) pageIssues.push(`H1 lacks relevance to URL keyword "${expectedKeyword}"`);
        }
    }

    if (pageIssues.length > 0) {
        issues.push({ url: BASE_URL + urlPath, issues: pageIssues });
    } else {
        passCount++;
    }
}

console.log(`\nAudit Complete! Passed perfectly: ${passCount}`);
console.log(`Pages with issues: ${issues.length}`);

const ARTIFACT_DIR = 'C:\\Users\\harshraj\\.gemini\\antigravity\\brain\\ac5457aa-c0a7-4f9c-bdfb-a9b756a5e2ae';
const reportPath = path.join(ARTIFACT_DIR, 'comprehensive_seo_audit.md');

let report = `# Full Website SEO Audit (2400+ URLs)

Executed an aggressive static analysis over **${htmlFiles.length}** prerendered pages simulating Googlebot's extraction of Title, Meta Description, H1, Canonical Links, Word Count, and Keyword Relevance.

- **Passed Perfectly (0 issues):** ${passCount}
- **Pages with Issues:** ${issues.length}

## Aggregate Issue Breakdown
`;

const issueCounts = {};
issues.forEach(r => {
    r.issues.forEach(i => {
        const baseIssue = i.split('(')[0].trim().replace(/".*"/, 'URL keyword');
        issueCounts[baseIssue] = (issueCounts[baseIssue] || 0) + 1;
    });
});

for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
    report += `- **${issue}**: affects ${count} pages\n`;
}

report += `\n## Sample Failing Pages (Top 150)\n\n`;
issues.slice(0, 150).forEach(r => {
    report += `### [${r.url}](${r.url})\n`;
    r.issues.forEach(i => report += `- ${i}\n`);
    report += `\n`;
});

report += `\n*Note: To view all failures, run the script locally. Only the top 150 are shown here to conserve space.*\n`;

fs.writeFileSync(reportPath, report);
console.log(`Saved detailed report to ${reportPath}`);
