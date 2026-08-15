const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

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
    } else if (fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = walkDir(appDir);

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Since the import was already replaced with useRouter, we just need to fix the body.
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
  content = content.replace(/\bnavigate\(/g, 'router.push(');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
}

console.log(`✅ Fixed useNavigate syntax in ${fixedCount} components.`);
