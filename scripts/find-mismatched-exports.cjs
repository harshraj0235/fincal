#!/usr/bin/env node
/**
 * Finds .tsx files where the component defined (const X: React.FC) doesn't match export default Y
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const results = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (f.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const constMatch = content.match(/const\s+(\w+)\s*:\s*React\.FC/);
      const exportMatch = content.match(/export\s+default\s+(\w+)\s*;?\s*$/m);
      if (constMatch && exportMatch) {
        const defined = constMatch[1];
        const exported = exportMatch[1];
        if (defined !== exported) {
          results.push({ file: path.relative(process.cwd(), full), defined, exported });
        }
      }
    }
  }
}

walk(srcDir);
if (results.length > 0) {
  console.log('Mismatched exports found:');
  results.forEach((r) => console.log(`  ${r.file}: defines "${r.defined}" but exports "${r.exported}"`));
  process.exit(1);
} else {
  console.log('No mismatched exports found.');
}
