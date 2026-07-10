import fs from 'fs';
import path from 'path';

const blogDataPath = path.join(process.cwd(), 'src/data/blogData.ts');

let content = fs.readFileSync(blogDataPath, 'utf8');

// Replace **text** with <strong>text</strong>
content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// Change paragraphs starting with "# " to type "heading"
// Pattern: "type": "paragraph",\s*"content": "# ([^"]+)"
// We want to replace it with: "type": "heading",\n      "content": "$1"
const headingRegex = /"type"\s*:\s*"paragraph"\s*,\s*"content"\s*:\s*"#\s+([^"]+)"/g;
content = content.replace(headingRegex, '"type": "heading",\n      "content": "$1"');

fs.writeFileSync(blogDataPath, content, 'utf8');

console.log("Successfully replaced markdown symbols in blogData.ts!");
