#!/usr/bin/env node
/**
 * Add getServerSideProps to all Pages Router pages to force SSR (avoid prerender errors).
 * Run before build: node scripts/add-getserversideprops-to-pages.cjs
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages');
const GSSP = `
/** Force SSR - avoid prerender (classList/add, useContext null) on Cloudflare. */
export async function getServerSideProps() {
  return { props: {} };
}
`;

function walkDir(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, files);
    else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts')) files.push(full);
  }
  return files;
}

let count = 0;
for (const file of walkDir(PAGES_DIR)) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('getServerSideProps') || content.includes('getStaticProps')) continue;
  if (!content.includes('export default')) continue;
  if (content.includes('getServerSideProps')) continue;
  const insert = GSSP.trim();
  const updated = content.trimEnd() + '\n\n' + insert + '\n';
  {
    fs.writeFileSync(file, updated);
    count++;
    console.log('Added getServerSideProps to', path.relative(PAGES_DIR, file));
  }
}
console.log(`\nDone. Updated ${count} files.`);
