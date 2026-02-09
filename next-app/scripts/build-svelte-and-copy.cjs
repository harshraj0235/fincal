/**
 * Build Svelte app with BUILD_FOR_NEXT=1 (static export, base /svelte)
 * and copy output to next-app/public/svelte so Next.js static export includes it.
 * Run from repo root: node next-app/scripts/build-svelte-and-copy.cjs
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const svelteBuildDir = path.join(repoRoot, 'build');
const nextPublicSvelte = path.join(__dirname, '..', 'public', 'svelte');

try {
  execSync('npm run build', {
    cwd: repoRoot,
    env: { ...process.env, BUILD_FOR_NEXT: '1' },
    stdio: 'inherit'
  });
} catch (e) {
  console.warn('Svelte build skipped (install deps at repo root and run to include /svelte).');
  process.exit(0);
}

if (!fs.existsSync(svelteBuildDir)) {
  console.warn('Svelte build output not found at', svelteBuildDir, '- skipping copy.');
  process.exit(0);
}

if (fs.existsSync(nextPublicSvelte)) {
  fs.rmSync(nextPublicSvelte, { recursive: true });
}
fs.cpSync(svelteBuildDir, nextPublicSvelte, { recursive: true });
console.log('Copied Svelte build to next-app/public/svelte');
process.exit(0);
