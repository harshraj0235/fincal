/**
 * Dynamic Sitemap Generator for MoneyCal.in
 * Generates multiple categorized sitemaps with auto-updating dates
 * Runs: Build time + Every 36 hours via cron/scheduler
 * 
 * Categories:
 * 1. sitemap-calculators.xml - All calculator pages (113 URLs)
 * 2. sitemap-blog.xml - Blog posts (400+ URLs)
 * 3. sitemap-learn.xml - Learn platform lessons (200+ URLs)
 * 4. sitemap-tools.xml - Tools & utilities (100+ URLs)
 * 5. sitemap-government.xml - Government schemes (80+ URLs)
 * 6. sitemap-crypto.xml - Cryptocurrency articles (50+ URLs)
 * 7. sitemap-pages.xml - Static pages (20+ URLs)
 * 8. sitemap.xml - Master sitemap index
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const OUTPUT_DIR = path.join(__dirname, '../public');

// Get current timestamp for lastmod
const getCurrentTimestamp = () => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
};

// XML Header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

// Sitemap Index Header
const sitemapIndexHeader = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Create URL entry
const createUrlEntry = (loc, priority = 0.8, changefreq = 'weekly', lastmod = null) => {
  const timestamp = lastmod || getCurrentTimestamp();
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Create sitemap index entry
const createSitemapEntry = (filename) => {
  const timestamp = getCurrentTimestamp();
  return `  <sitemap>
    <loc>${BASE_URL}/${filename}</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>`;
};

// ============================================
// CALCULATOR URLS (113 calculators)
// ============================================
const calculatorUrls = [
  // Loan Calculators (15)
  '/calculators/emi-calculator',
  '/calculators/home-loan-calculator',
  '/calculators/personal-loan-calculator',
  '/calculators/car-loan-calculator',
  '/calculators/business-loan-calculator',
  '/calculators/loan-prepayment-calculator',
  '/calculators/loan-comparison-calculator',
  '/calculators/credit-card-emi-calculator',
  '/calculators/gold-loan-emi-calculator',
  '/calculators/loan-calculator',
  '/calculators/loan-eligibility-calculator',
  '/calculators/loan-refinance-calculator',
  '/calculators/loan-affordability-calculator',
  '/calculators/loan-tenure-converter',
  
  // Investment Calculators (15)
  '/calculators/sip-calculator',
  '/calculators/mutual-fund-calculator',
  '/calculators/mutual-fund-cost-calculator',
  '/calculators/ppf-calculator',
  '/calculators/nps-calculator',
  '/calculators/nps-tier2-calculator',
  '/calculators/nps-return-calculator',
  '/calculators/sukanya-samriddhi-calculator',
  '/calculators/post-office-calculator',
  '/calculators/gold-investment-calculator',
  '/calculators/gold-etf-vs-physical-calculator',
  '/calculators/simple-interest-calculator',
  '/calculators/compound-interest-calculator',
  '/calculators/future-value-calculator',
  '/calculators/step-up-sip-calculator',
  
  // Tax Calculators (12)
  '/calculators/income-tax-calculator',
  '/calculators/income-tax-regime-comparison-calculator',
  '/calculators/advance-tax-calculator',
  '/calculators/gst-calculator',
  '/calculators/gst-seller-calculator',
  '/calculators/tds-calculator',
  '/calculators/capital-gains-tax-calculator',
  '/calculators/capital-gains-tax-advanced-calculator',
  '/calculators/tax-saving-investment-calculator',
  '/calculators/section-80c-calculator',
  '/calculators/section-80d-calculator',
  '/calculators/hra-exemption-calculator',
  
  // Retirement Calculators (8)
  '/calculators/retirement-calculator',
  '/calculators/pension-calculator',
  '/calculators/inflation-calculator',
  '/calculators/inflation-adjusted-sip-calculator',
  '/calculators/human-life-value-calculator',
  '/calculators/senior-citizen-savings-planner',
  '/calculators/emergency-fund-calculator',
  '/calculators/epf-calculator',
  
  // Property Calculators (8)
  '/calculators/rent-vs-buy-calculator',
  '/calculators/rent-vs-buy-advanced-calculator',
  '/calculators/property-investment-calculator',
  '/calculators/property-calculator',
  '/calculators/stamp-duty-calculator',
  '/calculators/property-registration-calculator',
  '/calculators/property-registration-charges-calculator',
  '/calculators/fixed-deposit-calculator',
  
  // Insurance Calculators (5)
  '/calculators/term-insurance-calculator',
  '/calculators/health-insurance-calculator',
  '/calculators/life-insurance-calculator',
  '/calculators/insurance-calculator',
  '/calculators/gratuity-calculator',
  
  // Business Calculators (8)
  '/calculators/break-even-calculator',
  '/calculators/profit-margin-calculator',
  '/calculators/inventory-turnover-calculator',
  '/calculators/debt-equity-calculator',
  '/calculators/msme-loan-eligibility-checker',
  '/calculators/salary-calculator',
  '/calculators/take-home-salary-calculator',
  '/calculators/bike-loan-calculator',
  
  // Banking Calculators (10)
  '/calculators/cheque-bounce-charges-calculator',
  '/calculators/bank-charges-analyzer',
  '/calculators/bank-ifsc-finder',
  '/calculators/atm-locator',
  '/calculators/bank-holiday-calendar',
  '/calculators/interest-rates-comparison',
  '/calculators/savings-account-calculator',
  '/calculators/currency-converter',
  '/calculators/bank-locker-finder',
  '/calculators/rd-calculator',
  
  // Fintech & Advanced (15)
  '/calculators/virtual-card-issuer',
  '/calculators/bnpl-calculator',
  '/calculators/p2p-lending-calculator',
  '/calculators/crowdfunding-investment-portal',
  '/calculators/crypto-tax-estimator',
  '/calculators/xirr-tracker',
  '/calculators/dividend-yield-calculator',
  '/calculators/asset-allocation-planner',
  '/calculators/risk-appetite-assessment',
  '/calculators/digital-wealth-robo-advisor',
  '/calculators/stable-return-fixed-income-aggregator',
  '/calculators/nri-stock-investment-dashboard',
  '/calculators/mutual-fund-overlap-checker',
  '/calculators/financial-goal-calculator',
  '/calculators/budget-calculator',
  
  // Trading Calculators (5)
  '/calculators/brokerage-calculator',
  '/calculators/margin-trading-calculator',
  '/calculators/commodity-margin-calculator',
  '/calculators/forex-margin-calculator',
  '/calculators/forex-pip-calculator',
  
  // Misc Calculators (7)
  '/calculators/interest-rate-converter',
  '/calculators/lcm-hcf-calculator',
  '/calculators/green-energy-investment-calculator',
  '/calculators/credit-card-finder',
  '/calculators/net-worth-calculator',
  '/calculators/upi-failure-troubleshooter',
  '/calculators/pe-ratio-calculator',
];

// ============================================
// LEARN PLATFORM URLS (200+ URLs)
// ============================================
const learnUrls = [
  '/learn',
  
  // Loans Hub (40 URLs)
  '/learn/loans',
  '/learn/loans/what-is-loan',
  '/learn/loans/types-of-loans',
  '/learn/loans/secured-vs-unsecured',
  '/learn/loans/what-is-emi',
  '/learn/loans/simple-vs-compound-interest',
  '/learn/loans/common-loan-terms',
  '/learn/loans/how-banks-evaluate',
  '/learn/loans/check-eligibility',
  '/learn/loans/cibil-score-impact',
  '/learn/loans/documents-required',
  '/learn/loans/loan-application-process',
  '/learn/loans/fixed-vs-floating-rates',
  '/learn/loans/loan-tenure-explained',
  '/learn/loans/repayment-options',
  '/learn/loans/loan-default-consequences',
  '/learn/loans/compare-loan-offers',
  '/learn/loans/calculate-true-cost',
  '/learn/loans/loan-agreement-guide',
  '/learn/loans/common-mistakes',
  
  // Home Loans (10 URLs)
  '/learn/home-loans',
  '/learn/home-loans/what-is-home-loan',
  '/learn/home-loans/home-loan-types',
  '/learn/home-loans/eligibility-criteria',
  '/learn/home-loans/documents-required',
  '/learn/home-loans/loan-to-value-ratio',
  '/learn/home-loans/fixed-vs-floating',
  '/learn/home-loans/home-loan-insurance',
  '/learn/home-loans/tax-benefits',
  '/learn/home-loans/common-mistakes',
  
  // Personal Loans (10 URLs)
  '/learn/personal-loans',
  '/learn/personal-loans/what-is-personal-loan',
  '/learn/personal-loans/eligibility-calculator',
  '/learn/personal-loans/interest-rates',
  '/learn/personal-loans/documents-needed',
  '/learn/personal-loans/instant-approval',
  '/learn/personal-loans/debt-consolidation',
  '/learn/personal-loans/pre-closure',
  '/learn/personal-loans/vs-credit-card',
  '/learn/personal-loans/common-mistakes',
  
  // Vehicle Loans (10 URLs)
  '/learn/vehicle-loans',
  '/learn/vehicle-loans/car-loan-basics',
  '/learn/vehicle-loans/car-loan-eligibility',
  '/learn/vehicle-loans/new-vs-used-car',
  '/learn/vehicle-loans/down-payment',
  '/learn/vehicle-loans/interest-rates',
  '/learn/vehicle-loans/insurance-options',
  '/learn/vehicle-loans/loan-transfer',
  '/learn/vehicle-loans/refinancing',
  '/learn/vehicle-loans/common-mistakes',
  
  // Gold Loans (10 URLs)
  '/learn/gold-loans',
  '/learn/gold-loans/what-is-gold-loan',
  '/learn/gold-loans/interest-rates',
  '/learn/gold-loans/eligibility-calculator',
  '/learn/gold-loans/documents-required',
  '/learn/gold-loans/application-process',
  '/learn/gold-loans/valuation-process',
  '/learn/gold-loans/repayment-options',
  '/learn/gold-loans/vs-personal-loan',
  '/learn/gold-loans/auction-process',
  '/learn/gold-loans/common-mistakes',
  
  // Business Loans (10 URLs)
  '/learn/business-loans',
  '/learn/business-loans/types-of-business-loans',
  '/learn/business-loans/mudra-loan-scheme',
  '/learn/business-loans/msme-loans',
  '/learn/business-loans/working-capital',
  '/learn/business-loans/term-loans',
  '/learn/business-loans/eligibility-requirements',
  '/learn/business-loans/documentation',
  '/learn/business-loans/interest-rates',
  '/learn/business-loans/collateral-requirements',
  '/learn/business-loans/common-mistakes',
  
  // Credit Cards (10 URLs)
  '/learn/credit-cards',
  '/learn/credit-cards/what-is-credit-card',
  '/learn/credit-cards/how-to-choose',
  '/learn/credit-cards/rewards-cashback',
  '/learn/credit-cards/credit-limit',
  '/learn/credit-cards/billing-cycle',
  '/learn/credit-cards/minimum-due',
  '/learn/credit-cards/balance-transfer',
  '/learn/credit-cards/closure-process',
  '/learn/credit-cards/cibil-impact',
  '/learn/credit-cards/best-credit-cards',
  '/learn/credit-cards/common-mistakes',
  
  // Credit Score (10 URLs)
  '/learn/credit-score',
  '/learn/credit-score/what-is-credit-score',
  '/learn/credit-score/how-calculated',
  '/learn/credit-score/score-ranges',
  '/learn/credit-score/check-score-free',
  '/learn/credit-score/improve-score',
  '/learn/credit-score/common-mistakes',
  '/learn/credit-score/score-vs-report',
  '/learn/credit-score/dispute-errors',
  '/learn/credit-score/loan-approval',
  '/learn/credit-score/build-from-scratch',
  
  // Investments (20 URLs)
  '/learn/investments',
  '/learn/investments/investment-basics',
  '/learn/investments/risk-vs-return',
  '/learn/investments/asset-allocation',
  '/learn/investments/diversification',
  '/learn/investments/mutual-funds',
  '/learn/investments/sip-benefits',
  '/learn/investments/direct-vs-regular',
  '/learn/investments/ppf-investment',
  '/learn/investments/nps-retirement',
  '/learn/investments/gold-investment',
  '/learn/investments/real-estate',
  '/learn/investments/fixed-deposits',
  '/learn/investments/bonds-debentures',
  '/learn/investments/stocks-equity',
  '/learn/investments/emergency-fund',
  '/learn/investments/tax-saving',
  '/learn/investments/retirement-planning',
  '/learn/investments/child-education',
  '/learn/investments/wealth-creation',
  '/learn/investments/common-mistakes',
  
  // Taxation (15 URLs)
  '/learn/taxation',
  '/learn/taxation/income-tax-basics',
  '/learn/taxation/tax-slabs',
  '/learn/taxation/old-vs-new-regime',
  '/learn/taxation/section-80c',
  '/learn/taxation/section-80d',
  '/learn/taxation/hra-exemption',
  '/learn/taxation/capital-gains',
  '/learn/taxation/tds-explained',
  '/learn/taxation/advance-tax',
  '/learn/taxation/itr-filing',
  '/learn/taxation/tax-planning',
  '/learn/taxation/gst-basics',
  '/learn/taxation/tax-deductions',
  '/learn/taxation/common-mistakes',
  
  // Insurance (15 URLs)
  '/learn/insurance',
  '/learn/insurance/types-of-insurance',
  '/learn/insurance/life-insurance',
  '/learn/insurance/term-insurance',
  '/learn/insurance/health-insurance',
  '/learn/insurance/car-insurance',
  '/learn/insurance/home-insurance',
  '/learn/insurance/travel-insurance',
  '/learn/insurance/claim-process',
  '/learn/insurance/riders-addons',
  '/learn/insurance/premium-calculation',
  '/learn/insurance/insurance-vs-investment',
  '/learn/insurance/choosing-right-policy',
  '/learn/insurance/policy-renewal',
  '/learn/insurance/common-mistakes',
];

// ============================================
// BLOG URLS (Extract from codebase - sample shown)
// ============================================
const blogUrls = [
  '/blog',
  '/blog/atal-pension-yojana-guide',
  '/blog/ashok-leyland-bonus-share-issue-complete-guide-shareholders',
  '/blog/personal-finance-beginners-guide',
  '/blog/emi-calculator-guide-reduce-home-loan-emi-burden-strategies',
  '/blog/car-loan-interest-rates-june-2024-best-banks-lowest-emi-new-used-cars',
  '/blog/tax-saving-investment-guide-section-80c-80d-complete-strategy',
  '/blog/mutual-fund-sip-comparison-best-returns-guide',
  '/blog/retirement-planning-calculator-monthly-pension-corpus-calculation',
  '/blog/home-loan-emi-calculate-online-hindi-guide',
  '/blog/nps-return-calculator-pension-planning-hindi-guide',
  '/blog/ppf-interest-rate-calculation-maturity-guide-hindi',
  '/blog/sip-investment-return-calculate-kaise-kare-hindi-guide',
  '/blog/fd-interest-rate-calculator-fixed-deposit-returns-hindi-guide',
  // Add more blog URLs - 400+ total
  '/blog/category/mutual-funds',
  '/blog/category/investment-guides',
  '/blog/category/cryptocurrency',
  '/blog/category/stock-market',
  '/blog/category/insurance',
];

// ============================================
// TOOLS URLS (100+ tools)
// ============================================
const toolsUrls = [
  // GST Tools
  '/tools/gstr-9a-deadline-calculator',
  '/tools/gst-credit-note-generator',
  '/tools/gst-refund-documentation-checklist',
  '/tools/composition-scheme-eligibility-checker',
  '/tools/rcm-tax-calculation-tool',
  '/tools/gst-discounted-price-calculator',
  '/tools/gst-audit-report-generator',
  '/tools/gst-slab-finder',
  '/tools/gst-refund-adjustment-calculator',
  '/tools/gst-refundable-deposit-calculator',
  '/tools/composition-scheme-invoice-generator',
  '/tools/gst-refund-processing-time-calculator',
  '/tools/gst-payment-status-tracker',
  '/tools/gst-advance-payment-calculator',
  '/tools/gstr-1-deadline-calculator',
  '/tools/gst-rate-impact-analyzer',
  '/tools/persona-builder',
  '/tools/promo-designer',
  
  // Festival Tools
  '/festival-tools/dhanteras-date-finder',
  '/festival-tools/karwa-chauth-moonrise',
  '/festival-tools/maha-shivratri-duration',
  '/festival-tools/navratri/fasting-meal-planner-satvik',
  '/festival-tools/navratri/garba-song-playlist-randomizer',
  '/festival-tools/navratri/horoscope-puja-color-suggestion',
  '/festival-tools/navratri/safe-fasting-checklist',
  '/festival-tools/navratri/prasad-quantity-estimator',
  '/festival-tools/navratri/puja-calendar-tithi-reminders',
  '/festival-tools/navratri/daily-aarti-reminder-scheduler',
  '/festival-tools/chhath-puja/train-bus-fare-estimator',
  '/festival-tools/chhath-puja/chhath-travel-expense',
  '/festival-tools/chhath-puja/eco-friendly-puja-checklist',
  '/festival-tools/chhath-puja/riverbank-safety-checklist',
  '/festival-tools/chhath-puja/donation-splitter-helpers',
  '/festival-tools/chhath-puja/chhath-puja-photography-checklist',
  '/festival-tools/chhath-puja/thekua-calories-calculator',
  '/festival-tools/chhath-puja/sweet-prasad-cost-estimator',
  '/festival-tools/durga-puja/durga-puja-photo-spots-checklist',
  '/festival-tools/durga-puja/travel-cost-pandal-hopping',
  '/festival-tools/durga-puja/durga-puja-pandal-travel-guide',
  '/festival-tools/baisakhi/farmer-subsidy-estimator',
  '/festival-tools/baisakhi/langar-food-plate-cost-estimator',
  '/festival-tools/baisakhi/tractor-farming-cost-calculator',
  '/festival-tools/onam/onam-dress-budget-calculator',
  '/festival-shopping',
  '/festival-shopping/',
  '/festival-info/seasonal-festivals-calendar',
  '/religious-tools/bhajan-playlist-generator',
  '/religious-tools/vrat-duration-calculator',
  
  // Finance Tools
  '/finance-tools/backup-goal-tracker',
  '/finance-tools/education-cost-forecaster',
  '/finance-tools/mutual-fund-exit-load-calculator',
  '/finance-tools/short-vs-long-term-goal-allocator',
  '/finance-tools/personal-finance-journey-timeline',
  '/finance-tools/international-vacation-cost-forecaster',
  '/finance-tools/tax-free-retirement-income-tool',
  '/finance-tools/emergency-fund-target-tool',
  '/finance-tools/tiered-emergency-fund-planner',
  '/finance-tools/mutual-fund-star-ratings-explorer',
  '/finance-tools/buying-car-vs-investing-scenario-planner',
  '/finance-tools/car-loan-vs-buy-cash-visualizer',
  '/finance-tools/down-payment-savings-tracker',
  '/finance-tools/goal-progress-visual-dashboard',
  '/finance-tools/wedding-budget-tracker',
  '/finance-tools/monthly-goal-check-reminder',
  '/finance-tools/vacation-savings-goal-tool',
  '/finance-tools/goal-wise-sip-split-tool',
  '/finance-tools/goal-stretch-estimator',
  '/finance-tools/big-purchase-vs-investment-roi',
  '/finance-tools/multi-goal-investment-planner',
  '/finance-tools/debt-free-goal-planner',
  '/finance-tools/marriage-cost-estimator',
  '/finance-tools/sip-tracker-with-goal-thermometer',
  '/finance-tools/investment-timeline-visualizer',
  
  // Astro Finance
  '/astro-finance/zodiac-savings-calculator',
  '/astro-finance/horoscope',
  '/astro-finance/lucky-numbers',
  '/astro-finance/compatibility',
  '/astro-finance/crystal-calculator',
  
  // Invoice/Insurance Tools
  '/invoicing-tools/custom-invoice-theme-creator',
  '/invoicing-tools/invoice-due-date-tracker',
  '/insurance-tools/portfolio-dashboard',
  
  // Tax Tools
  '/tax-tools/sip-step-up-planner',
  '/tax-tools/capital-gains-annual-summary-generator',
  
  // Excel Tools
  '/excel-tool-builder',
  '/exceltool/excel-budgeting-forecasting-templates-tools-guide',
  '/exceltool/big-data-processing-excel-ai-tools-data-cleaning-guide',
  '/exceltool/top-excel-addons-predictive-analytics-trend-forecasting',
  '/exceltool/smart-financial-models-excel-ai-automation-guide',
  '/exceltool/how-to-create-a-monthly-budget-in-excel',
];

// ============================================
// GOVERNMENT SCHEMES URLS (80+ schemes)
// ============================================
const governmentUrls = [
  '/government-schemes/calculate-healthcare-savings-with-ayushman-bharat-and-moneycal',
  '/government-schemes/saksham-anganwadi-poshan-2-nutrition-benefits-women-children-2025',
  '/government-schemes/beti-bachao-beti-padhao-yojana-2025',
  '/government-schemes/pm-fasal-bima-yojana-2025',
  '/government-schemes/pmjdy-account-opening-moneycal-savings-tools',
  '/government-schemes/haryana-dbt-schemes-apply-moneycal-guide',
  '/government-schemes/bihar-bscb-cooperative-bank-assistant-online-form-2025-last-date-today',
  '/government-schemes/plan-your-healthcare-with-ayushman-bharat-and-moneycal-budget-calculator',
  '/government-schemes/ups-vs-nps-deadline-extended-unified-pension-scheme-choice-guide-2025',
  '/government-schemes/maximize-mudra-loan-benefits-moneycal-emi-tool-2025',
  '/government-schemes/credit-support-msme-stress-period-emergency-funding-july-2025',
  '/government-schemes/check-kerala-welfare-scheme-eligibility-moneycal-calculator',
  '/government-schemes/check-government-scheme-eligibility-moneycal-tools',
  '/government-schemes/pmjdy-savings-calculator-moneycal-money-saving-tips',
  '/government-schemes/how-ayushman-bharat-saves-medical-costs-moneycal-tips',
  '/government-schemes/social-security-gig-workers-epfo-bonus-2025',
  '/government-schemes/women-entrepreneurs-loan-scheme-sc-st-financial-assistance-2025',
  '/government-schemes/calculate-day-skill-development-benefits-moneycal',
  '/government-schemes/saksham-anganwadi-poshan-2-health-gig-workers-2025',
  '/government-schemes/pradhan-mantri-janjatiya-unnat-gram-abhiyan-tribal-development-july-2025',
  '/government-schemes/pmjdy-rural-india-benefits-moneycal-eligibility-check',
  '/government-schemes/credit-guarantee-scheme-msme-manufacturing-machinery-loan-july-2025',
  '/government-schemes/dhan-dhaanya-krishi-yojana-2025-100-districts-farming-benefits',
  '/government-schemes/how-to-apply-for-pmay-and-calculate-emi-with-moneycal',
  '/government-schemes/top-10-government-schemes-2025-moneycal-financial-tips',
  '/government-schemes/pmjdy-emi-calculator-moneycal-overdraft-repayment-management',
  '/government-schemes/swamih-fund-2-affordable-housing-middle-class-families-2025',
  '/government-schemes/digital-india-skill-development-2025',
  '/government-schemes/maximize-pmay-benefits-moneycal-emi-planner',
  '/government-schemes/pmjjby-pmsby-atal-pension-grassroots-enrollment-simplified-2025',
  '/government-schemes/calculate-ppf-returns-moneycal-tool',
  '/government-schemes/mudra-loan-calculator-moneycal-complete-guide-2025',
  '/government-schemes/plan-savings-up-schemes-moneycal-budget-tool',
  '/government-schemes/best-pmay-subsidy-options-use-moneycal-loan-tool',
  '/government-schemes/plan-medical-expenses-with-ayushman-bharat-and-moneycal-calculator',
  '/government-schemes/top-punjab-government-schemes-plan-moneycal-calculator',
  '/government-schemes/plan-savings-post-office-schemes-moneycal-tools',
  '/government-schemes/calculate-mudra-kishor-loan-repayments-moneycal',
  '/government-schemes/mudra-shishu-loan-application-guide-moneycal-2025',
  '/government-schemes/fund-first-time-women-sc-st-entrepreneurs-2-cr-loan-guide',
  '/government-schemes/pm-kisan-samman-nidhi-yojana-2025',
  '/government-schemes/government-schemes-startups-calculate-loans-moneycal',
  '/government-schemes/maharashtra-government-schemes-moneycal-financial-tools',
  '/government-schemes/day-supports-livelihood-plan-moneycal-budget-calculator',
  '/government-schemes/calculate-punjab-mai-bhago-vidya-scheme-benefits-moneycal',
  '/government-schemes/pmjdy-benefits-maximization-moneycal-financial-calculators',
  '/government-schemes/maximize-apy-benefits-moneycal-retirement-planner',
  '/government-schemes/rural-prosperity-resilience-programme-2025',
  '/government-schemes/ssc-cgl-correction-edit-form-2025',
  '/government-schemes/comprehensive-internship-opportunities-1-crore-youth-top-500-companies-july-2025',
  '/government-schemes/day-empowers-women-plan-moneycal-calculator',
  '/government-schemes/new-skilling-programme-youth-20-lakh-iti-upgrade-july-2025',
  '/government-schemes/saksham-anganwadi-poshan-2-protein-pregnant-women-kids-2025',
  '/government-schemes/msme-growth-revised-classification-turnover-investment-2025',
  '/government-schemes/long-term-innovation-loans-1-lakh-crore-corpus-2025',
  '/government-schemes/maximize-goa-swayampurna-benefits-moneycal-guide',
  '/government-schemes/calculate-apy-savings-age-60-moneycal-tool',
  '/government-schemes/msme-redefined-investment-turnover-criteria-unlock-benefits-2025',
  '/government-schemes/new-10000-crore-fund-of-funds-startups-how-to-tap-in-2025',
  '/government-schemes/rajasthan-rssb-lab-attendant-online-form-2025-last-date-today',
  '/government-schemes/swamih-fund-2-middle-income-housing-2025',
  '/government-schemes/jal-jeevan-mission-extension-2028-home-water-financial-planning',
  '/government-schemes/national-mission-high-yield-seeds-farmers-guide-premium-seeds-2025',
  '/government-schemes/blue-economy-aquaculture-coastal-loans-opportunities-2025',
  '/government-schemes/mudra-loan-emi-calculator-moneycal-tool-2025',
  '/government-schemes/credit-guarantee-fund-msme-10-crore-cover-2025',
  '/government-schemes/ayushman-bharat-health-insurance-2025',
  '/government-schemes/pradhan-mantri-jan-dhan-yojana-2025',
  '/government-schemes/calculate-government-scheme-loan-emi-moneycal-tool',
  '/government-schemes/how-to-save-on-pmay-home-loans-with-moneycal-tools',
  '/government-schemes/pmjdy-account-opening-guide-moneycal-financial-planner',
  '/government-schemes/apy-tax-benefits-plan-moneycal-tax-calculator',
  '/government-schemes/udan-scheme-revamped-120-new-destinations-2035-travel-planning',
  '/government-schemes/credit-guarantee-fund-boost-10-crore-cover-msmes-2025',
  '/government-schemes/bio-manufacturing-bio-foundry-scheme-green-innovations-funding-2025',
  '/government-schemes/aatmanirbharta-pulses-mission-investment-opportunities-2025',
  '/government-schemes/credit-guarantee-cover-msmes-doubled-10-crore-action-checklist',
  '/government-schemes/jpsc-project-manager-online-form-2025-last-date-today',
  '/government-schemes/swamih-fund-2-affordable-housing-scheme-2025',
  '/government-schemes/women-marginalized-entrepreneur-loan-scheme-2025',
  '/government-schemes/indian-army-ssc-technical-april-2026-online-form',
  '/government-schemes/pm-svanidhi-revamp-loans-upi-cards-street-vendors-2025',
  '/government-schemes/choose-right-apy-plan-moneycal-calculator',
  '/government-schemes/best-mudra-loan-schemes-eligibility-checker-moneycal-2025',
  '/government-schemes/pmmy-mudra-budget-calculator-business-planning-moneycal-2025',
  '/government-schemes/calculate-pmay-home-loan-emi-with-moneycal-calculator',
];

// ============================================
// CRYPTO URLS (50+ articles)
// ============================================
const cryptoUrls = [
  '/crypto/bittensor-tao-india-complete-investment-guide',
  '/crypto/how-to-buy-bitcoin-crypto-india-2024',
  '/crypto/should-you-invest-bitcoin-2025',
  '/crypto/defi-explained-indian-investors',
  '/crypto/best-platforms-ai-crypto-tokens-instantly-buy',
  '/crypto/crypto-scams-india-how-to-avoid',
  '/crypto/griffain-token-buying-guide-beginners-india-complete-tutorial',
  '/crypto/crypto-tax-filing-india-step-by-step',
  '/crypto/defi-investing-india-complete-guide-2025',
  '/crypto/how-to-secure-crypto-investments-2025',
  '/crypto/secure-hardware-wallet-ai-tokens-india-buying-guide',
  '/crypto/nft-investment-guide-earning-strategies-india',
  '/crypto/crypto-tax-optimization-legal-ways-save-money-india',
];

// ============================================
// STATIC PAGES (20+ pages)
// ============================================
const staticUrls = [
  '/',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-service',
  '/terms-and-conditions',
  '/help-center',
  '/disclaimer',
  '/cookie-policy',
  '/editorial-policy',
  '/sitemap',
  '/ads.txt',
  '/credit-card-finder',
  '/bank-tools',
  '/news',
  '/news-reel',
  '/missed-call-banking-directory',
  '/corporate-finance',
  '/insurance-tools',
  '/astro-finance',
];

// ============================================
// GENERATE SITEMAPS
// ============================================

console.log('🚀 Starting Dynamic Sitemap Generation...\n');

// 1. Generate Calculator Sitemap
const generateCalculatorSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Calculators: ${calculatorUrls.length} URLs -->\n\n`;
  
  calculatorUrls.forEach(url => {
    sitemap += createUrlEntry(url, 0.9, 'monthly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-calculators.xml'), sitemap);
  console.log(`✅ sitemap-calculators.xml generated (${calculatorUrls.length} URLs)`);
};

// 2. Generate Learn Platform Sitemap
const generateLearnSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Learn Platform: ${learnUrls.length} URLs -->\n\n`;
  
  learnUrls.forEach(url => {
    const priority = url === '/learn' ? 1.0 : 0.8;
    sitemap += createUrlEntry(url, priority, 'weekly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-learn.xml'), sitemap);
  console.log(`✅ sitemap-learn.xml generated (${learnUrls.length} URLs)`);
};

// 3. Generate Blog Sitemap
const generateBlogSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Blog Posts: ${blogUrls.length} URLs -->\n\n`;
  
  blogUrls.forEach(url => {
    const priority = url === '/blog' ? 0.9 : 0.7;
    sitemap += createUrlEntry(url, priority, 'weekly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-blog.xml'), sitemap);
  console.log(`✅ sitemap-blog.xml generated (${blogUrls.length} URLs)`);
};

// 4. Generate Tools Sitemap
const generateToolsSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Tools: ${toolsUrls.length} URLs -->\n\n`;
  
  toolsUrls.forEach(url => {
    sitemap += createUrlEntry(url, 0.7, 'monthly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-tools.xml'), sitemap);
  console.log(`✅ sitemap-tools.xml generated (${toolsUrls.length} URLs)`);
};

// 5. Generate Government Schemes Sitemap
const generateGovernmentSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Government Schemes: ${governmentUrls.length} URLs -->\n\n`;
  
  governmentUrls.forEach(url => {
    sitemap += createUrlEntry(url, 0.7, 'monthly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-government.xml'), sitemap);
  console.log(`✅ sitemap-government.xml generated (${governmentUrls.length} URLs)`);
};

// 6. Generate Crypto Sitemap
const generateCryptoSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Crypto Articles: ${cryptoUrls.length} URLs -->\n\n`;
  
  cryptoUrls.forEach(url => {
    sitemap += createUrlEntry(url, 0.6, 'weekly') + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-crypto.xml'), sitemap);
  console.log(`✅ sitemap-crypto.xml generated (${cryptoUrls.length} URLs)`);
};

// 7. Generate Static Pages Sitemap
const generatePagesSitemap = () => {
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Static Pages: ${staticUrls.length} URLs -->\n\n`;
  
  staticUrls.forEach(url => {
    const priority = url === '/' ? 1.0 : 0.5;
    const changefreq = url === '/' ? 'daily' : 'yearly';
    sitemap += createUrlEntry(url, priority, changefreq) + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-pages.xml'), sitemap);
  console.log(`✅ sitemap-pages.xml generated (${staticUrls.length} URLs)`);
};

// 8. Generate Master Sitemap Index
const generateMasterSitemap = () => {
  const timestamp = getCurrentTimestamp();
  const sitemaps = [
    'sitemap-calculators.xml',
    'sitemap-learn.xml',
    'sitemap-blog.xml',
    'sitemap-tools.xml',
    'sitemap-government.xml',
    'sitemap-crypto.xml',
    'sitemap-pages.xml',
  ];
  
  let sitemapIndex = sitemapIndexHeader + '\n';
  sitemapIndex += `<!-- Generated: ${timestamp} | Master Sitemap Index | Categories: ${sitemaps.length} -->\n\n`;
  
  sitemaps.forEach(filename => {
    sitemapIndex += createSitemapEntry(filename) + '\n';
  });
  
  sitemapIndex += '</sitemapindex>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemapIndex);
  console.log(`✅ sitemap.xml (Master Index) generated (${sitemaps.length} child sitemaps)`);
};

// Execute all generators
try {
  generateCalculatorSitemap();
  generateLearnSitemap();
  generateBlogSitemap();
  generateToolsSitemap();
  generateGovernmentSitemap();
  generateCryptoSitemap();
  generatePagesSitemap();
  generateMasterSitemap();
  
  const totalUrls = calculatorUrls.length + learnUrls.length + blogUrls.length + 
                    toolsUrls.length + governmentUrls.length + cryptoUrls.length + 
                    staticUrls.length;
  
  console.log(`\n🎉 Sitemap Generation Complete!`);
  console.log(`📊 Total URLs: ${totalUrls}`);
  console.log(`📁 Location: ${OUTPUT_DIR}`);
  console.log(`⏰ Next auto-update: 36 hours from now`);
  console.log(`\n✅ All sitemaps generated with dynamic timestamps!`);
  
} catch (error) {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
}

