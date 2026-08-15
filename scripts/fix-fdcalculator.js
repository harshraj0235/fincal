const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/calculators/FdCalculator.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Add "use client";
if (!content.startsWith('"use client"')) {
  content = '"use client";\n' + content;
}

// Transform imports
content = content.replace(/react-router-dom/g, 'next/navigation');
const topLevelDirs = ['components', 'data', 'utils', 'hooks', 'calculators', 'services', 'engine'];
content = content.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)\/?(.*?)['"]/g, (match, dirName, restPath) => {
  if (topLevelDirs.includes(dirName)) {
    return `from '@/${dirName}${restPath ? '/' + restPath : ''}'`;
  }
  return match;
});

if (/from\s+['"]lucide-react['"]/.test(content) && /{.*?\bLink\b.*?}/.test(content)) {
  content = content.replace(/(import\s+{.*?\b)Link(\b.*?}\s+from\s+['"]lucide-react['"])/g, '$1Link as LinkIcon$2');
  content = content.replace(/LinkIconIcon+/g, 'LinkIcon');
  content = content.replace(/<Link(?![^>]*href=)/g, '<LinkIcon');
}

// Fix schemaUrl prop destructuring
content = content.replace(
  /export const FdCalculator:\s*React\.FC<FdSEOProps>\s*=\s*\(\{\s*title,\s*description,\s*keywords,\s*h1,\s*subtitle,\s*url,\s*faqData,\s*defaultPreset\s*\}\)/,
  `export const FdCalculator: React.FC<FdSEOProps> = ({\n  title, description, keywords, h1, subtitle, url, faqData,\n  defaultPreset, schemaUrl\n})`
);

// Add export default at the bottom if missing
if (!content.includes('export default FdCalculator;')) {
  content += '\n\nexport default FdCalculator;\n';
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Fixed FdCalculator.tsx successfully!');
