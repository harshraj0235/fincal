// Script to fix unescaped single quotes in discover article content strings
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'data', 'discover');

const files = [
    'bank-holiday-alert-july-13-19-digital-banking.ts',
    'kusumgar-ipo-allotment-status-bse-check-guide.ts',
    'sbi-funds-management-ipo-gmp-listing-gains.ts',
    'hdfc-bank-tcs-jobs-automation-ai-impact.ts',
    'kalyan-jewellers-share-price-target-buy-sell.ts',
    'cupid-share-price-multibagger-target-analysis.ts',
    'gold-price-prediction-80000-festival-sgb-investment.ts',
    'epfo-new-rules-claim-settlement-update-2026.ts',
    'nifty-today-groww-trading-beginners-guide.ts',
    'ankur-warikoo-investment-tips-index-funds-wealth.ts',
];

let totalFixes = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`SKIP: ${file} not found`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all content: '...' lines and fix unescaped single quotes inside them
    // Strategy: match content strings and escape internal single quotes
    let fixes = 0;
    
    // Replace content lines - find strings between content: ' and the closing '
    // We need to handle multi-line awareness but these are single-line strings
    const lines = content.split('\n');
    const fixedLines = lines.map((line, idx) => {
        // Match lines like: content: '...'
        const match = line.match(/^(\s*content:\s*)'(.*)'(,?\s*)$/);
        if (!match) return line;
        
        const prefix = match[1];
        let inner = match[2];
        const suffix = match[3];
        
        // The inner string already has some escaped quotes (\')
        // We need to find unescaped single quotes (not preceded by \)
        // First, temporarily replace already-escaped quotes
        const placeholder = '___ESCAPED_QUOTE___';
        let temp = inner.replace(/\\'/g, placeholder);
        
        // Now find any remaining single quotes and escape them
        if (temp.includes("'")) {
            const count = (temp.match(/'/g) || []).length;
            fixes += count;
            temp = temp.replace(/'/g, "\\'");
        }
        
        // Restore the already-escaped quotes
        temp = temp.replace(new RegExp(placeholder, 'g'), "\\'");
        
        return `${prefix}'${temp}'${suffix}`;
    });
    
    if (fixes > 0) {
        const fixedContent = fixedLines.join('\n');
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`FIXED: ${file} - ${fixes} unescaped quote(s)`);
        totalFixes += fixes;
    } else {
        console.log(`OK: ${file}`);
    }
});

console.log(`\nTotal fixes: ${totalFixes}`);
