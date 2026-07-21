const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '../src/pages'),
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/calculators')
];

let filesModified = 0;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Remove import statement
  // Matches: import AstroFinanceButton from '../../components/AstroFinanceButton';
  newContent = newContent.replace(/import AstroFinanceButton from [^;\n]+;?\n?/g, '');
  
  // Remove component usage
  // Matches: <AstroFinanceButton /> (with possible indentation)
  newContent = newContent.replace(/^[ \t]*<AstroFinanceButton\s*\/>\r?\n?/gm, '');
  
  // Cleanup any lingering usages without indentation
  newContent = newContent.replace(/<AstroFinanceButton\s*\/>/g, '');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Modified: ${filePath}`);
    filesModified++;
  }
}

console.log('Starting E-E-A-T Cleanup (Removing AstroFinanceButton)...');
targetDirs.forEach(processDirectory);
console.log(`Cleanup complete. Modified ${filesModified} files.`);
