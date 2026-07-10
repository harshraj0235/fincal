const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const APP_PATH = path.join(__dirname, '../src/App.tsx');
const OUTPUT_PATH = path.join(__dirname, '../public/all-learn-urls.txt');

function extractLearnRoutes(appSource) {
  const routes = new Set();
  const routeRegex = /path="(\/learn[^"]*)"/g;
  let match;

  while ((match = routeRegex.exec(appSource)) !== null) {
    const routePath = match[1].trim();
    if (!routePath.startsWith('/learn')) continue;
    if (routePath.includes(':') || routePath.includes('*')) continue;
    routes.add(routePath);
  }

  return Array.from(routes).sort((a, b) => a.localeCompare(b));
}

function main() {
  if (!fs.existsSync(APP_PATH)) {
    throw new Error(`App.tsx not found: ${APP_PATH}`);
  }

  const appSource = fs.readFileSync(APP_PATH, 'utf-8');
  const learnPaths = extractLearnRoutes(appSource);
  const learnUrls = learnPaths.map((p) => `${BASE_URL}${p}`);

  fs.writeFileSync(OUTPUT_PATH, learnUrls.join('\n'));

  console.log(`Learn URLs generated: ${learnUrls.length}`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main();

module.exports = { extractLearnRoutes };
