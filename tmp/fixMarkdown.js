import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src/data/blogData.ts');

let content = fs.readFileSync(blogDataPath, 'utf8');

// Replace **text** with <strong>text</strong>
content = content.replace(/\*\*([^\\*]+)\*\*/g, '<strong>$1</strong>');

// Replace # text with <h3>text</h3>
// Be careful with JSON structures. `content` might be `"content": "# Text"`
// We match `"content": "# ` and replace with `"content": "<h3>` and we need to close it with `</h3>"`.
// Wait, regex for this:
content = content.replace(/"content"\s*:\s*"#\s+([^"]+)"/g, '"content": "<h3>$1</h3>"');

fs.writeFileSync(blogDataPath, content, 'utf8');

console.log("Successfully replaced markdown symbols in blogData.ts!");
