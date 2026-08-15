const http = require('http');

const sections = {
  'Loan Calculators': [
    ['/calculators/emi-calculator', 'EMI Calculator'],
    ['/calculators/home-loan-calculator', 'Home Loan Calculator'],
    ['/calculators/personal-loan-calculator', 'Personal Loan Calculator'],
    ['/calculators/car-loan-calculator', 'Car Loan Calculator'],
    ['/calculators/bike-loan-calculator', 'Bike Loan Calculator'],
    ['/calculators/business-loan-calculator', 'Business Loan Calculator'],
    ['/calculators/gold-loan-emi-calculator', 'Gold Loan EMI'],
    ['/calculators/loan-comparison-calculator', 'Loan Comparison'],
    ['/calculators/loan-prepayment-calculator', 'Loan Prepayment'],
    ['/calculators/education-loan-calculator', 'Education Loan'],
  ],
  'Investment Tools': [
    ['/calculators/sip-calculator', 'SIP Calculator'],
    ['/calculators/mutual-fund-returns-calculator', 'Mutual Fund Returns'],
    ['/calculators/ppf-calculator', 'PPF Calculator'],
    ['/calculators/fd-calculator', 'FD Calculator'],
    ['/calculators/rd-calculator', 'RD Calculator'],
    ['/calculators/nps-calculator', 'NPS Calculator'],
    ['/calculators/step-up-sip-calculator', 'Step-Up SIP'],
    ['/calculators/retirement-calculator', 'Retirement Planner'],
    ['/calculators/compound-interest-calculator', 'Compound Interest'],
    ['/calculators/sukanya-samriddhi-calculator', 'Sukanya Samriddhi'],
  ],
  'Tax & GST Tools': [
    ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
    ['/calculators/gst-calculator', 'GST Calculator'],
    ['/calculators/income-tax-regime-comparison-calculator', 'Old vs New Regime'],
    ['/calculators/hra-exemption-calculator', 'HRA Exemption'],
    ['/calculators/tds-calculator', 'TDS Calculator'],
    ['/calculators/capital-gains-tax-calculator', 'Capital Gains Tax'],
    ['/calculators/section-80c-calculator', 'Section 80C Calculator'],
    ['/calculators/salary-calculator', 'Salary Calculator'],
    ['/gst-tools', 'GST Tools Hub'],
    ['/tax-tools', 'Tax Tools Hub'],
  ],
  'Tools & Resources': [
    ['/gold-rate', 'Gold Rate Today'],
    ['/gold-rate-delhi-today', 'Gold Rate Delhi (Dynamic)'],
    ['/silver-rate', 'Silver Rate Today'],
    ['/silver-rate-mumbai-today', 'Silver Rate Mumbai (Dynamic)'],
    ['/ipo', 'IPO Dashboard'],
    ['/stock-market', 'Stock Market'],
    ['/stamp-duty', 'Stamp Duty Calculator'],
    ['/excel-tools', 'Excel Tools'],
    ['/government-schemes', 'Government Schemes'],
    ['/discover', 'Discover Articles'],
    ['/insurance', 'Insurance Tools'],
  ],
  'Learn Finance': [
    ['/learn', 'Learn Finance Hub'],
    ['/learn/loans', 'Loan Basics'],
    ['/learn/investing', 'Investing & Wealth'],
    ['/learn/taxation', 'Income Tax Guide'],
    ['/learn/credit-cards', 'Credit Cards Guide'],
    ['/learn/credit-score', 'Credit Score Guide'],
    ['/learn/insurance', 'Insurance Guide'],
    ['/learn/savings-bank', 'Savings Bank Guide'],
  ],
  'Blog & News': [
    ['/blog', 'Finance Blog'],
    ['/news', 'Finance News'],
    ['/news/news-home-page', 'Market News'],
    ['/markets', 'Markets News Category (Dynamic)'],
  ],
  'Company Pages': [
    ['/about-us', 'About Us'],
    ['/contact-us', 'Contact Us'],
    ['/privacy-policy', 'Privacy Policy'],
    ['/terms-of-service', 'Terms of Service'],
    ['/disclaimer', 'Disclaimer'],
    ['/sitemap', 'Sitemap'],
  ],
  'Content Posts (Samples)': [
    ['/blog', 'Blog Index'],
    ['/blog/budget-2025-senior-citizens-expectations', 'Specific Blog Post'],
    ['/discover', 'Discover Index'],
    ['/discover/ntpc-green-cube-highways', 'Specific Discover Post'],
    ['/news/news-home-page', 'News Index'],
    ['/news/pmegp-loan-subsidy-2026-guide-100-percent-approval', 'Specific News Post'],
    ['/ipo/coca-cola-india-ipo-review-hindi', 'Specific IPO Post'],
    ['/government-schemes', 'Govt Schemes Index'],
    ['/games', 'Games Hub'],
    ['/market', 'Market Hub'],
    ['/loan-tools', 'Loan Tools Hub'],
    ['/finance-tools', 'Finance Tools Hub'],
    ['/tools', 'All Tools Hub'],
    ['/calculators', 'All Calculators Hub'],
  ],
};

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${route}`, { timeout: 15000 }, (res) => {
      resolve({ route, status: res.statusCode, location: res.headers.location || '' });
    });
    req.on('error', (err) => resolve({ route, status: 'ERR', location: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ route, status: 'TIMEOUT', location: '' }); });
  });
}

(async () => {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║   MoneyCal FULL Route Audit — Every Page Listed by User            ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  let totalOk = 0, totalBroken = 0, totalRedirect = 0;
  const broken = [];

  for (const [section, routes] of Object.entries(sections)) {
    console.log(`\n┌── ${section} ${'─'.repeat(Math.max(1,60 - section.length))}┐`);
    let sectionOk = 0, sectionBroken = 0;

    for (const [route, label] of routes) {
      const result = await checkRoute(route);
      const s = result.status;
      let icon = '❌';
      if (s === 200) { icon = '✅'; sectionOk++; totalOk++; }
      else if (s === 307 || s === 308 || s === 301 || s === 302) { icon = '↪️ '; totalRedirect++; sectionOk++; }
      else { sectionBroken++; totalBroken++; broken.push({ route, label, status: s }); }
      const extra = result.location ? ` → ${result.location}` : '';
      console.log(`│ ${icon} ${String(s).padEnd(4)} ${label.padEnd(28)} ${route}${extra}`);
    }
    console.log(`└── ${sectionOk}/${routes.length} working ${'─'.repeat(Math.max(1,51 - String(sectionOk).length - String(routes.length).length))}┘`);
  }

  console.log(`\n═══════════════════════════════════════`);
  console.log(`  ✅ ${totalOk} routes OK`);
  console.log(`  ↪️  ${totalRedirect} redirects`);
  console.log(`  ❌ ${totalBroken} BROKEN`);
  const total = totalOk + totalBroken + totalRedirect;
  console.log(`  Total: ${total} routes tested`);
  
  if (broken.length > 0) {
    console.log(`\n─── BROKEN ROUTES ───`);
    for (const b of broken) {
      console.log(`  ❌ [${b.status}] ${b.label} → ${b.route}`);
    }
  }
})();
