const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// We just generated these folders in src/app:
// calculators, astro-finance, corporate-finance, invoicing-tools, missed-call-banking-directory
const targetDirs = [
  'calculators',
  'astro-finance',
  'corporate-finance',
  'invoicing-tools',
  'missed-call-banking-directory'
];

let fixedCount = 0;

function walkDir(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(walkDir(fullPath));
    } else if (fullPath.endsWith('Client.tsx') || fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

for (const target of targetDirs) {
  const dirPath = path.join(appDir, target);
  const files = walkDir(dirPath);
  
  for (const filePath of files) {
    if (filePath.endsWith('page.tsx')) continue; // leave the wrapper alone
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix react-router-dom
    if (content.includes('react-router-dom')) {
      content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
        let replacement = '';
        if (imports.includes('useNavigate')) {
          replacement += `import { useRouter } from 'next/navigation';\n`;
          content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
          content = content.replace(/\bnavigate\(/g, 'router.push(');
        }
        if (imports.includes('Link')) {
          replacement += `import Link from 'next/link';\n`;
        }
        return replacement;
      });
      content = content.replace(/<RouterLink\b/g, '<Link');
      content = content.replace(/<\/RouterLink>/g, '</Link>');
      content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');
    }

    // Fix relative imports (../../../components -> @/components)
    const topLevelDirs = ['components', 'data', 'utils', 'hooks', 'calculators', 'services'];
    content = content.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)\/?(.*?)['"]/g, (match, dirName, restPath) => {
      if (topLevelDirs.includes(dirName)) {
        return `from '@/${dirName}${restPath ? '/' + restPath : ''}'`;
      }
      return match;
    });

    // Fix Link collision with lucide-react
    if (/from\s+['"]lucide-react['"]/.test(content) && /{.*?\bLink\b.*?}/.test(content)) {
      content = content.replace(/(import\s+{.*?\b)Link(\b.*?}\s+from\s+['"]lucide-react['"])/g, '$1Link as LinkIcon$2');
      content = content.replace(/LinkIconIcon+/g, 'LinkIcon');
      content = content.replace(/<Link(?![^>]*href=)/g, '<LinkIcon');
    }

    // Fix raw <a> to <Link> for internal links if necessary, but leave for now

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixedCount++;
    }
  }
}

console.log(`✅ Applied Next.js syntax fixes to ${fixedCount} legacy restored components.`);
