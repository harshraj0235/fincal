import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, 'src', 'data', 'blogs');

function cleanText(text) {
    // 1. Currency: ? followed by digits -> ₹
    text = text.replace(/\?+(\d+[,0-9]*(\.[0-9]+)?[kKlLcC]?)/g, '₹$1');
    // 2. Clusters of 2 or more ?
    text = text.replace(/\?{2,}/g, ' ');
    // 3. Isolated ? surrounded by spaces (lookbehind/ahead)
    text = text.replace(/(?<=\s)\?(?=\s)/g, ' ');
    return text;
}

const files = fs.readdirSync(blogDir);
let count = 0;
for (const file of files) {
    if (file.endsWith('.ts') && file !== 'index.ts') {
        const filePath = path.join(blogDir, file);
        const data = fs.readFileSync(filePath, 'utf8');
        const newData = cleanText(data);
        if (newData !== data) {
            fs.writeFileSync(filePath, newData, 'utf8');
            console.log('Fixed', file);
            count++;
        }
    }
}
console.log('Fixed', count, 'files.');
