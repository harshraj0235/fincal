const fs = require('fs');
function test() {
  const html = fs.readFileSync('dist/news/technology/whatsapp-banking-popularity-2026/index.html', 'utf8');
  console.log('Adsbygoogle tag:', html.includes('adsbygoogle'));
  console.log('Advertisement text:', html.includes('Advertisement'));
  console.log('Module script missing (React stripped):', !html.includes('type="module"'));
  console.log('seo-static-prerender present:', html.includes('seo-static-prerender'));
}
test();
