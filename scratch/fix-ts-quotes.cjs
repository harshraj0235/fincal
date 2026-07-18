const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/discover');
const files = [
    'odyssey-movie-hindi-dubbed-download-telegram.ts',
    'odyssey-movie-download-filmyzilla-1080p-hindi.ts',
    'how-to-watch-odyssey-hindi-dubbed-online.ts',
    'odyssey-christopher-nolan-hindi-dubbed-ott.ts',
    'odyssey-movie-2026-hindi-dubbed-vegamovies.ts'
];

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // This regex matches a line that has a key, a single quote, some content, and an ending single quote with optional comma
        // It strictly captures the inside content to allow escaping
        const match = line.match(/^(\s*(?:content|title|snippet|coverImage|author|date|id|slug):\s*)'(.*)'(,?)\s*\r?$/);
        
        if (match) {
            let prefix = match[1];
            let inner = match[2];
            let suffix = match[3];
            
            // Escape any existing backticks and template literals
            inner = inner.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
            
            // Reconstruct the line using backticks instead of single quotes
            lines[i] = `${prefix}\`${inner}\`${suffix}`;
        }
    }
    
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Fixed ${file}`);
}
