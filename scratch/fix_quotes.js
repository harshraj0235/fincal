const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/discover');

if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // This regex matches a single quote that is NOT preceded by ": " or "{ " (start of string) 
    // and NOT followed by "," or "\n" (end of string).
    // Specifically, for properties like `title: '...',` or `excerpt: '...',`
    
    let modified = false;
    
    // We split by lines to handle it safely
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Find single-line properties like title, excerpt, id, slug, etc.
        const match = line.match(/^(\s*\w+:\s*')([^']*)(',\s*)$/);
        if (match) {
            // But wait, what if there are multiple quotes inside?
            // The regex above ([^']*) fails if there are quotes inside!
            // Let's use a smarter approach:
        }
        
        // Let's just find strings surrounded by `'` and `',` at the ends.
        const propMatch = line.match(/^(\s*[a-zA-Z0-9_]+:\s*')(.+)(',\s*)$/);
        if (propMatch) {
            const prefix = propMatch[1];
            let inner = propMatch[2];
            const suffix = propMatch[3];
            
            // If inner contains any unescaped single quotes, escape them
            if (/[^\\]'/.test(inner) || inner.startsWith("'")) {
                // escape all single quotes that are not already escaped
                inner = inner.replace(/(?<!\\)'/g, "\\'");
                lines[i] = prefix + inner + suffix;
                modified = true;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
        console.log(`Fixed single quotes in: ${file}`);
        fixedCount++;
    }
}

console.log(`Done! Fixed ${fixedCount} files.`);
