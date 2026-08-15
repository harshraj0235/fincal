const http = require('http');

const routes = [
  '/',
  '/calculators',
  '/calculators/emi-calculator',
  '/calculators/sip-calculator',
  '/calculators/income-tax-calculator',
  '/ipo',
  '/news',
  '/learn',
  '/games',
  '/gold-rate',
  '/silver-rate',
  '/blog',
  '/tools',
  '/finance-tools',
  '/tax-tools',
  '/gst-tools',
  '/excel-tools',
  '/government-schemes',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/disclaimer',
  '/discover',
  '/market',
  '/loan-tools',
  '/gold',
  '/gst',
  '/insurance',
  '/corporate',
  '/festival',
  '/gk',
  '/stamp-duty',
  '/personal-finance',
  '/sitemap',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${route}`, { timeout: 10000 }, (res) => {
      // Follow redirects
      const status = res.statusCode;
      const location = res.headers.location || '';
      resolve({ route, status, location });
    });
    req.on('error', (err) => {
      resolve({ route, status: 'ERROR', location: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ route, status: 'TIMEOUT', location: '' });
    });
  });
}

(async () => {
  console.log('Verifying routes...\n');
  const results = [];
  
  for (const route of routes) {
    const result = await checkRoute(route);
    const icon = result.status === 200 ? '✅' : result.status === 307 || result.status === 308 ? '↪️ ' : '❌';
    const extra = result.location ? ` → ${result.location}` : '';
    console.log(`  ${icon} ${String(result.status).padEnd(4)} ${route}${extra}`);
    results.push(result);
  }
  
  const ok = results.filter(r => r.status === 200 || r.status === 307 || r.status === 308).length;
  const broken = results.filter(r => r.status === 404).length;
  const errors = results.filter(r => r.status !== 200 && r.status !== 307 && r.status !== 308 && r.status !== 404).length;
  
  console.log(`\n─── Summary ───`);
  console.log(`  ✅ ${ok} routes working`);
  console.log(`  ❌ ${broken} routes returning 404`);
  console.log(`  ⚠️  ${errors} routes with errors`);
  console.log(`  Total: ${routes.length} routes tested`);
})();
