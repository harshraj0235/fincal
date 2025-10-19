import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Search, Calculator, TrendingUp, Shield, BookOpen, 
  ChevronDown, ChevronUp, CheckCircle, ExternalLink, ArrowRight,
  FileText, DollarSign, BarChart3, Users, Zap
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, color: 'from-blue-500 to-indigo-600' },
    { id: 'calculators', name: 'Calculators', icon: Calculator, color: 'from-green-500 to-emerald-600' },
    { id: 'gst', name: 'GST Tools', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
    { id: 'tax', name: 'Tax Tools', icon: Shield, color: 'from-orange-500 to-red-600' },
    { id: 'investment', name: 'Investment', icon: TrendingUp, color: 'from-cyan-500 to-blue-600' },
    { id: 'account', name: 'Account & Privacy', icon: Users, color: 'from-violet-500 to-purple-600' }
  ];

  const faqs = [
    {
      category: 'calculators',
      question: 'How do I use the PPF Calculator to calculate my maturity amount?',
      answer: `<strong>Step-by-Step Guide:</strong><br/><br/>
      1. <strong>Navigate to PPF Calculator:</strong> Visit <a href="/calculators/ppf-calculator" class="text-blue-600 underline">PPF Calculator</a><br/>
      2. <strong>Enter Investment Amount:</strong> Use slider or input box (₹500 to ₹1.5 lakh)<br/>
      3. <strong>Set Interest Rate:</strong> Default is 7.1% (current rate for Q4 FY 2024-25)<br/>
      4. <strong>Choose Duration:</strong> Minimum 15 years, can go up to 50 years<br/>
      5. <strong>View Results:</strong> See maturity value, total interest, and year-by-year breakup<br/>
      6. <strong>Download/Share:</strong> Export PDF report or share results<br/><br/>
      <strong>Features:</strong> Real-time calculation, interactive charts, tax benefits calculator, comparison with other investments.`
    },
    {
      category: 'gst',
      question: 'How to find the correct HSN/SAC code for my product or service?',
      answer: `<strong>Using Our HSN/SAC Finder Tool:</strong><br/><br/>
      1. Go to <a href="/tools/gst-hsn-sac-finder" class="text-blue-600 underline">HSN/SAC Finder</a><br/>
      2. Type your product/service name in search box (e.g., "mobile phone", "software development")<br/>
      3. Use filters: Type (HSN/SAC), Category, GST Rate<br/>
      4. Click on result card to see full details<br/>
      5. Note the 4 or 6-digit code based on your turnover<br/><br/>
      <strong>Alternative Method:</strong> Visit official <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">GST Portal</a> for complete list.<br/><br/>
      <strong>Turnover Rules:</strong><br/>
      • Above ₹5 Cr: 6-digit mandatory<br/>
      • ₹1.5-5 Cr: 4-digit mandatory<br/>
      • Below ₹1.5 Cr: Optional but recommended`
    },
    {
      category: 'calculators',
      question: 'Are your calculators accurate? How often are they updated?',
      answer: `<strong>Yes, 100% Accurate!</strong> Here's our commitment:<br/><br/>
      <strong>Regular Updates:</strong><br/>
      • Tax rates: Updated within 24 hours of government notifications<br/>
      • GST slabs: Updated same day as GST Council announcements<br/>
      • Interest rates: PPF, NPS, FD rates updated quarterly<br/>
      • Market data: Real-time or daily updates (where applicable)<br/><br/>
      <strong>Verification Process:</strong><br/>
      • All formulas reviewed by Chartered Accountants<br/>
      • Cross-verified with official government sources<br/>
      • User feedback incorporated for improvements<br/>
      • Regular audits every quarter<br/><br/>
      <strong>Sources We Use:</strong><br/>
      • Income Tax Department (incometax.gov.in)<br/>
      • GST Portal (gst.gov.in)<br/>
      • RBI (rbi.org.in)<br/>
      • SEBI (sebi.gov.in)<br/>
      • NSI India (nsiindia.gov.in)<br/><br/>
      <strong>Last Major Update:</strong> October 2024 (Budget 2024 changes incorporated)`
    },
    {
      category: 'calculators',
      question: 'Do I need to create an account to use calculators?',
      answer: `<strong>No Account Required!</strong> 🎉<br/><br/>
      <strong>Key Features:</strong><br/>
      • All 100+ calculators are completely FREE<br/>
      • No registration, no login, no signup needed<br/>
      • No email address required<br/>
      • No personal information collected<br/>
      • Use anonymously anytime, anywhere<br/>
      • No limits on usage<br/><br/>
      <strong>Why?</strong> We believe financial tools should be accessible to everyone without barriers. Just visit, calculate, and go!<br/><br/>
      <strong>Optional Features:</strong><br/>
      If we introduce user accounts in future (for saving calculations or personalized dashboards), they will be OPTIONAL. 
      All calculators will remain free without login forever.`
    },
    {
      category: 'gst',
      question: 'What are GSTR-1 and GSTR-3B deadlines for 2025?',
      answer: `<strong>GST Return Filing Deadlines (FY 2024-25):</strong><br/><br/>
      <strong>GSTR-1 (Outward Supplies):</strong><br/>
      • <strong>Monthly Filers:</strong> 11th of next month<br/>
      • <strong>Quarterly Filers:</strong> 13th of month after quarter end<br/>
      • Example: Oct-Dec quarter → File by 13th January<br/><br/>
      <strong>GSTR-3B (Summary Return):</strong><br/>
      • <strong>Monthly Filers:</strong> 20th of next month<br/>
      • <strong>Quarterly Filers (QRMP):</strong> 22nd/24th based on state<br/><br/>
      <strong>Late Filing Penalty:</strong><br/>
      • ₹50/day (CGST) + ₹50/day (SGST) = ₹100/day<br/>
      • Maximum: ₹5,000 (₹2,500 CGST + ₹2,500 SGST)<br/><br/>
      Use our <a href="/tools/gstr-1-deadline-calculator" class="text-blue-600 underline">GSTR-1 Deadline Calculator</a> 
      and <a href="/tools/gstr-3b-deadline-calculator" class="text-blue-600 underline">GSTR-3B Calculator</a> 
      to calculate exact deadlines and penalties.`
    },
    {
      category: 'tax',
      question: 'How to calculate income tax for FY 2024-25 (AY 2025-26)?',
      answer: `<strong>Using Our Income Tax Calculator:</strong><br/><br/>
      1. Visit <a href="/calculators/income-tax-calculator" class="text-blue-600 underline">Income Tax Calculator</a><br/>
      2. Choose tax regime: Old or New (updated for Budget 2024)<br/>
      3. Enter your total income (salary, business, rental, capital gains)<br/>
      4. Add deductions (80C, 80D, HRA, etc.) for old regime<br/>
      5. View tax liability, effective tax rate, and tax savings<br/><br/>
      <strong>New Regime (Default for FY 2024-25):</strong><br/>
      • 0-3 lakh: Nil<br/>
      • 3-6 lakh: 5%<br/>
      • 6-9 lakh: 10%<br/>
      • 9-12 lakh: 15%<br/>
      • 12-15 lakh: 20%<br/>
      • Above 15 lakh: 30%<br/><br/>
      <strong>Rebate:</strong> Income up to ₹7 lakh = Zero tax (Section 87A)<br/><br/>
      <strong>Old Regime:</strong> Higher rates but allows deductions (80C, 80D, HRA, etc.)`
    },
    {
      category: 'investment',
      question: 'What is SIP and how do I calculate SIP returns?',
      answer: `<strong>SIP (Systematic Investment Plan) Explained:</strong><br/><br/>
      <strong>What is SIP?</strong><br/>
      SIP is a method of investing fixed amounts regularly (monthly/quarterly) in mutual funds. 
      It uses rupee cost averaging to reduce market timing risk.<br/><br/>
      <strong>How to Calculate SIP Returns:</strong><br/>
      1. Visit <a href="/calculators/sip-calculator" class="text-blue-600 underline">SIP Calculator</a><br/>
      2. Enter monthly investment amount (₹500 to ₹1 lakh+)<br/>
      3. Set expected return rate (10-15% for equity funds historically)<br/>
      4. Choose investment duration (minimum 1 year, recommended 5+ years)<br/>
      5. View maturity amount, total investment, and wealth gain<br/><br/>
      <strong>SIP Benefits:</strong><br/>
      • Disciplined investing (auto-debit)<br/>
      • Rupee cost averaging (buy more units when market is down)<br/>
      • Power of compounding<br/>
      • Low minimum investment (₹500/month)<br/>
      • Flexibility to pause/increase/decrease<br/><br/>
      <strong>Example:</strong> ₹10,000/month SIP for 20 years at 12% returns = ₹99.9 lakhs 
      (investment: ₹24 lakhs, returns: ₹75.9 lakhs)`
    },
    {
      category: 'calculators',
      question: 'Can I trust the calculations? Are there any errors?',
      answer: `<strong>Quality Assurance:</strong><br/><br/>
      <strong>Our Verification Process:</strong><br/>
      • All formulas verified by Chartered Accountants<br/>
      • Tested against official government calculators<br/>
      • Cross-checked with banking calculators<br/>
      • User feedback incorporated continuously<br/>
      • Open-source logic (transparent calculations)<br/><br/>
      <strong>Accuracy Guarantee:</strong><br/>
      • Financial formulas: 100% accurate (standard mathematical formulas)<br/>
      • Tax rates: Updated within 24 hours of changes<br/>
      • GST slabs: Same-day updates after notifications<br/>
      • Interest rates: Quarterly updates (PPF, NPS, FD)<br/><br/>
      <strong>If You Find an Error:</strong><br/>
      1. Contact us at support@moneycal.in<br/>
      2. Provide calculator name and error details<br/>
      3. We'll verify and fix within 24-48 hours<br/>
      4. You'll receive confirmation once fixed<br/><br/>
      <strong>Disclaimer:</strong> While we ensure accuracy, always verify critical financial decisions with professionals.`
    },
    {
      category: 'gst',
      question: 'What is Input Tax Credit (ITC) and am I eligible?',
      answer: `<strong>ITC (Input Tax Credit) Explained:</strong><br/><br/>
      <strong>What is ITC?</strong><br/>
      ITC allows you to claim credit for GST paid on business purchases (inputs) against GST collected on sales (output). 
      This prevents double taxation.<br/><br/>
      <strong>Example:</strong><br/>
      • You buy raw materials for ₹10,000 + ₹1,800 GST (18%)<br/>
      • You sell finished product for ₹20,000 + ₹3,600 GST (18%)<br/>
      • ITC = ₹1,800 (input GST paid)<br/>
      • GST to deposit = ₹3,600 - ₹1,800 = ₹1,800 only<br/><br/>
      <strong>Eligibility Conditions:</strong><br/>
      • Must be registered under GST<br/>
      • Goods/services used for business purposes<br/>
      • Valid tax invoice from supplier<br/>
      • Supplier must have deposited GST to government<br/>
      • ITC claim within time limit (earlier of GSTR-3B due date or annual return)<br/><br/>
      <strong>Blocked ITC (Cannot Claim):</strong><br/>
      • Motor vehicles (except for business use like taxi, driving school)<br/>
      • Food & beverages, outdoor catering<br/>
      • Personal consumption items<br/>
      • Club membership, health services<br/><br/>
      Check your eligibility using <a href="/tools/itc-eligibility-checker" class="text-blue-600 underline">ITC Eligibility Checker</a>.`
    },
    {
      category: 'investment',
      question: 'NPS vs PPF: Which is better for retirement in 2025?',
      answer: `<strong>Detailed Comparison:</strong><br/><br/>
      <strong>PPF (Public Provident Fund):</strong><br/>
      ✅ Guaranteed returns: 7.1% p.a. (current)<br/>
      ✅ EEE tax benefit (completely tax-free)<br/>
      ✅ Zero risk, government-backed<br/>
      ✅ Lock-in: 15 years (extendable)<br/>
      ❌ Limited to ₹1.5 lakh/year<br/>
      ❌ Lower returns compared to equity<br/>
      <strong>Best for:</strong> Risk-averse investors, guaranteed returns seekers<br/><br/>
      <strong>NPS (National Pension System):</strong><br/>
      ✅ Market-linked returns: 10-14% historically<br/>
      ✅ Higher growth potential<br/>
      ✅ No investment limit<br/>
      ✅ Extra ₹50,000 tax deduction (Section 80CCD1B)<br/>
      ❌ 40% of maturity is taxable<br/>
      ❌ Lock-in till 60 years age<br/>
      ❌ Market risk involved<br/>
      <strong>Best for:</strong> Long-term retirement planning, higher returns seekers<br/><br/>
      <strong>Recommendation:</strong><br/>
      • <strong>Age 25-35:</strong> 70% NPS + 30% PPF (aggressive growth + safety)<br/>
      • <strong>Age 35-45:</strong> 50% NPS + 50% PPF (balanced)<br/>
      • <strong>Age 45+:</strong> 30% NPS + 70% PPF (capital preservation)<br/><br/>
      Compare using <a href="/calculators/ppf-calculator" class="text-blue-600 underline">PPF Calculator</a> and 
      <a href="/calculators/nps-calculator" class="text-blue-600 underline">NPS Calculator</a>.`
    },
    {
      category: 'tax',
      question: 'What are Section 80C tax deductions and how much can I save?',
      answer: `<strong>Section 80C Tax Deduction Guide:</strong><br/><br/>
      <strong>What is Section 80C?</strong><br/>
      Section 80C allows you to claim deductions up to ₹1,50,000 from your taxable income, reducing your tax liability.<br/><br/>
      <strong>Eligible Investments:</strong><br/>
      • PPF: Up to ₹1.5 lakh<br/>
      • ELSS Mutual Funds: Up to ₹1.5 lakh (3-year lock-in)<br/>
      • Life Insurance Premiums: No limit, but 80C capped at ₹1.5L<br/>
      • NSC (National Savings Certificate)<br/>
      • Tax-Saving FDs (5-year lock-in)<br/>
      • Home Loan Principal Repayment<br/>
      • Tuition Fees (2 children)<br/>
      • Sukanya Samriddhi Yojana<br/>
      • Senior Citizens Savings Scheme<br/><br/>
      <strong>Tax Savings Example:</strong><br/>
      • Income: ₹10 lakhs/year<br/>
      • 80C Investment: ₹1.5 lakhs<br/>
      • Tax saved: ₹46,350 (30% bracket)<br/><br/>
      <strong>Additional Deductions:</strong><br/>
      • 80D: Health insurance (₹25,000-₹1 lakh)<br/>
      • 80CCD(1B): Extra NPS (₹50,000)<br/>
      • 80E: Education loan interest (no limit)<br/>
      • 80G: Donations to charity<br/><br/>
      Calculate total tax savings: <a href="/calculators/section-80c-calculator" class="text-blue-600 underline">Section 80C Calculator</a>`
    },
    {
      category: 'calculators',
      question: 'How does the EMI calculator work? What is EMI formula?',
      answer: `<strong>EMI (Equated Monthly Installment) Explained:</strong><br/><br/>
      <strong>EMI Formula:</strong><br/>
      EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]<br/><br/>
      Where:<br/>
      • P = Principal loan amount<br/>
      • R = Monthly interest rate (Annual Rate / 12 / 100)<br/>
      • N = Loan tenure in months<br/><br/>
      <strong>Example Calculation:</strong><br/>
      • Loan: ₹10 lakhs<br/>
      • Interest: 9% per annum<br/>
      • Tenure: 20 years (240 months)<br/>
      • EMI: ₹8,997/month<br/>
      • Total payment: ₹21,59,280<br/>
      • Total interest: ₹11,59,280<br/><br/>
      <strong>Components of EMI:</strong><br/>
      • Principal portion: Increases over time<br/>
      • Interest portion: Decreases over time<br/>
      • First EMI: Mostly interest<br/>
      • Last EMI: Mostly principal<br/><br/>
      <strong>Use Our Calculators:</strong><br/>
      • <a href="/calculators/emi-calculator" class="text-blue-600 underline">EMI Calculator</a> (general)<br/>
      • <a href="/calculators/home-loan-calculator" class="text-blue-600 underline">Home Loan Calculator</a><br/>
      • <a href="/calculators/car-loan-calculator" class="text-blue-600 underline">Car Loan Calculator</a><br/>
      • <a href="/calculators/personal-loan-calculator" class="text-blue-600 underline">Personal Loan Calculator</a>`
    },
    {
      category: 'gst',
      question: 'What is Reverse Charge Mechanism (RCM) under GST?',
      answer: `<strong>RCM (Reverse Charge Mechanism) Explained:</strong><br/><br/>
      <strong>Normal GST:</strong> Supplier collects GST from buyer and deposits to government<br/>
      <strong>Under RCM:</strong> Buyer directly pays GST to government (not to supplier)<br/><br/>
      <strong>When RCM Applies:</strong><br/>
      • Unregistered supplier to registered recipient<br/>
      • Specific notified services (legal, security, GTA)<br/>
      • Import of services from outside India<br/>
      • E-commerce operators (certain cases)<br/><br/>
      <strong>Example:</strong><br/>
      You (registered) hire an unregistered transporter (GTA service)<br/>
      • Service charge: ₹10,000<br/>
      • GST @ 5%: ₹500<br/>
      • You pay ₹10,000 to transporter (no GST)<br/>
      • You deposit ₹500 directly to government<br/>
      • You can claim ₹500 as ITC (if eligible)<br/><br/>
      <strong>RCM Rate:</strong> Usually 5% for GTA, 18% for legal/CA services<br/><br/>
      Check applicability: <a href="/tools/rcm-applicability-checker" class="text-blue-600 underline">RCM Checker</a>`
    },
    {
      category: 'investment',
      question: 'What is CAGR and how is it different from absolute returns?',
      answer: `<strong>CAGR (Compound Annual Growth Rate) Explained:</strong><br/><br/>
      <strong>CAGR:</strong> Smoothed annualized return over a period<br/>
      <strong>Absolute Return:</strong> Total percentage gain/loss<br/><br/>
      <strong>Example:</strong><br/>
      Investment: ₹1,00,000 → ₹1,60,000 in 3 years<br/>
      • Absolute Return: 60% (over 3 years)<br/>
      • CAGR: 16.96% per year<br/><br/>
      <strong>CAGR Formula:</strong><br/>
      CAGR = [(Final Value / Initial Value)^(1/Years)] - 1<br/><br/>
      <strong>Why CAGR is Better:</strong><br/>
      • Normalizes volatile returns<br/>
      • Easy to compare different investments<br/>
      • Shows annualized performance<br/>
      • Industry standard metric<br/><br/>
      <strong>When to Use:</strong><br/>
      • Lump sum investments: Use CAGR<br/>
      • Regular SIPs: Use XIRR (better for multiple cash flows)<br/><br/>
      Calculate: <a href="/calculators/cagr-calculator" class="text-blue-600 underline">CAGR Calculator</a> | 
      <a href="/finance-tools/xirr-calculator" class="text-blue-600 underline">XIRR Calculator</a>`
    },
    {
      category: 'account',
      question: 'Do you collect or store my personal data?',
      answer: `<strong>Privacy First Approach:</strong><br/><br/>
      <strong>What We DON'T Collect:</strong><br/>
      ❌ Name, email (unless you contact us)<br/>
      ❌ Phone number<br/>
      ❌ Financial account details<br/>
      ❌ Calculation inputs (not stored)<br/>
      ❌ Personal identifiable information<br/><br/>
      <strong>What We Collect (Anonymously):</strong><br/>
      ✅ Browser type, device type (for optimization)<br/>
      ✅ Pages visited (Google Analytics - anonymous)<br/>
      ✅ Country/region (not exact location)<br/><br/>
      <strong>Why?</strong> To improve user experience and fix bugs. We never sell data to anyone.<br/><br/>
      <strong>Your Rights:</strong><br/>
      • Request data deletion anytime<br/>
      • Opt-out of analytics (browser settings)<br/>
      • No account = no data stored<br/><br/>
      Read full: <a href="/privacy-policy" class="text-blue-600 underline">Privacy Policy</a>`
    },
    {
      category: 'calculators',
      question: 'How to calculate home loan EMI and total interest payable?',
      answer: `<strong>Home Loan EMI Calculation Guide:</strong><br/><br/>
      <strong>Step-by-Step:</strong><br/>
      1. Visit <a href="/calculators/home-loan-calculator" class="text-blue-600 underline">Home Loan Calculator</a><br/>
      2. Enter loan amount (property cost - down payment)<br/>
      3. Set interest rate (current rates: 8.5-9.5% for most banks)<br/>
      4. Choose tenure (5-30 years typical)<br/>
      5. View EMI, total payment, and interest breakup<br/><br/>
      <strong>Current Home Loan Rates (October 2024):</strong><br/>
      • SBI: 8.50% - 9.65%<br/>
      • HDFC: 8.60% - 9.50%<br/>
      • ICICI: 8.75% - 9.50%<br/>
      • Axis: 8.75% - 9.65%<br/><br/>
      <strong>Example:</strong><br/>
      • Loan: ₹50 lakhs<br/>
      • Rate: 9% p.a.<br/>
      • Tenure: 20 years<br/>
      • EMI: ₹44,986/month<br/>
      • Total interest: ₹57,96,640 (more than principal!)<br/><br/>
      <strong>Tax Benefits:</strong><br/>
      • Principal repayment: ₹1.5 lakh under 80C<br/>
      • Interest payment: ₹2 lakh under 24(b)<br/>
      • First-time buyer: Extra ₹50,000 under 80EEA<br/><br/>
      <strong>Tips to Reduce Interest:</strong><br/>
      • Make prepayments when possible<br/>
      • Choose shorter tenure if affordable<br/>
      • Compare rates across banks<br/><br/>
      Try: <a href="/calculators/loan-prepayment-calculator" class="text-blue-600 underline">Prepayment Calculator</a>`
    },
    {
      category: 'account',
      question: 'Is MoneyCal free? Will you charge in the future?',
      answer: `<strong>100% Free - Forever Commitment:</strong><br/><br/>
      <strong>Current Status:</strong><br/>
      ✅ All 100+ calculators: FREE<br/>
      ✅ All tools: FREE<br/>
      ✅ Educational content: FREE<br/>
      ✅ No registration required: FREE<br/>
      ✅ Unlimited usage: FREE<br/><br/>
      <strong>Will We Ever Charge?</strong><br/>
      <strong>NO!</strong> Our core mission is to provide free financial tools to all Indians. We will NEVER charge for:<br/>
      • Basic calculators (EMI, SIP, PPF, GST, Tax)<br/>
      • Search tools (HSN/SAC finder)<br/>
      • Educational articles and guides<br/><br/>
      <strong>Possible Premium Features (Future):</strong><br/>
      If we introduce advanced features (like portfolio tracking, personalized advice, alerts), 
      they will be OPTIONAL premium add-ons. All current tools will remain free.<br/><br/>
      <strong>How We Sustain:</strong><br/>
      • Ethical advertising (Google AdSense)<br/>
      • Affiliate partnerships (banks, investment platforms)<br/>
      • Premium features (optional, not for basic tools)<br/><br/>
      <strong>Our Promise:</strong> Financial literacy tools will ALWAYS be free for everyone.`
    },
    {
      category: 'gst',
      question: 'How to file GST returns online? Complete step-by-step guide',
      answer: `<strong>GST Return Filing - Complete Process:</strong><br/><br/>
      <strong>Returns to File:</strong><br/>
      • <strong>GSTR-1:</strong> Outward supplies (sales)<br/>
      • <strong>GSTR-3B:</strong> Summary return with tax payment<br/>
      • <strong>GSTR-9:</strong> Annual return (once a year)<br/><br/>
      <strong>Step-by-Step Filing Process:</strong><br/><br/>
      <strong>Step 1: Login to GST Portal</strong><br/>
      • Visit www.gst.gov.in<br/>
      • Login with GSTIN and password<br/>
      • Navigate to Services > Returns > Return Dashboard<br/><br/>
      <strong>Step 2: Prepare Invoice Data</strong><br/>
      • Collect all sales invoices for the period<br/>
      • Calculate HSN-wise summary<br/>
      • Separate B2B, B2C, exports<br/><br/>
      <strong>Step 3: File GSTR-1 (by 11th)</strong><br/>
      • Click "Prepare Online" or "Prepare Offline"<br/>
      • Fill all tables (B2B, B2C, exports, HSN summary)<br/>
      • Save and submit<br/>
      • Download filed return<br/><br/>
      <strong>Step 4: File GSTR-3B (by 20th)</strong><br/>
      • Auto-populated from GSTR-1<br/>
      • Enter purchase details (ITC)<br/>
      • Calculate tax liability<br/>
      • Make payment via challan<br/>
      • File return with valid ARN<br/><br/>
      <strong>Common Mistakes:</strong><br/>
      • Missing GSTR-1 deadline (file before GSTR-3B)<br/>
      • Wrong HSN codes<br/>
      • ITC mismatch<br/>
      • Incorrect tax calculation<br/><br/>
      <strong>Tools to Help:</strong><br/>
      • <a href="/tools/gstr-1-deadline-calculator" class="text-blue-600 underline">GSTR-1 Deadline Calculator</a><br/>
      • <a href="/tools/gst-liability-calculator" class="text-blue-600 underline">GST Liability Calculator</a><br/>
      • <a href="/tools/gst-hsn-sac-finder" class="text-blue-600 underline">HSN/SAC Finder</a>`
    },
    {
      category: 'investment',
      question: 'Best investment options for beginners in India 2025',
      answer: `<strong>Investment Guide for Beginners:</strong><br/><br/>
      <strong>Step 1: Emergency Fund (3-6 months expenses)</strong><br/>
      • Keep in liquid fund or savings account<br/>
      • Required before starting investments<br/><br/>
      <strong>Step 2: Tax-Saving Investments (₹1.5 lakh under 80C)</strong><br/>
      • <strong>PPF:</strong> 7.1% guaranteed, completely tax-free (Conservative)<br/>
      • <strong>ELSS:</strong> 10-12% potential, 3-year lock-in (Moderate)<br/>
      • <strong>NPS:</strong> 10-14% potential, retirement focused (Aggressive)<br/><br/>
      <strong>Step 3: Regular Investments (SIP)</strong><br/>
      • Start with ₹5,000-10,000/month in mutual funds<br/>
      • Large Cap: 40% (low risk)<br/>
      • Mid Cap: 30% (medium risk)<br/>
      • Small Cap: 30% (high risk, high return)<br/><br/>
      <strong>Step 4: Fixed Income (Safety Net)</strong><br/>
      • Bank FD: 6-7% (safe, taxable)<br/>
      • Debt Mutual Funds: 7-9% (tax-efficient after 3 years)<br/><br/>
      <strong>Sample Portfolio (₹25,000/month):</strong><br/>
      • PPF: ₹12,500 (tax-free safety)<br/>
      • Equity SIP: ₹10,000 (growth)<br/>
      • Debt Fund: ₹2,500 (stability)<br/><br/>
      <strong>Calculators to Use:</strong><br/>
      • <a href="/calculators/sip-calculator" class="text-blue-600 underline">SIP Calculator</a><br/>
      • <a href="/calculators/ppf-calculator" class="text-blue-600 underline">PPF Calculator</a><br/>
      • <a href="/calculators/nps-calculator" class="text-blue-600 underline">NPS Calculator</a><br/><br/>
      <strong>Remember:</strong> Start early, invest regularly, stay invested long-term!`
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    activeCategory === 'all' || faq.category === activeCategory
  ).filter(faq =>
    searchQuery === '' || 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHelmet
        title="Help Center - MoneyCal | FAQs, Guides & Support"
        description="Get help with MoneyCal's financial calculators and tools. Comprehensive FAQ section covering EMI, SIP, PPF, GST, taxes, and more. Step-by-step guides for all tools."
        keywords="help center, FAQ, calculator help, how to use, financial tools guide, support"
        url="https://moneycal.in/help-center"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <HelpCircle className="w-16 h-16" />
          </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Help Center</h1>
            <p className="text-2xl text-white/90 mb-8">Find answers to all your questions about our financial tools</p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help... (e.g., 'how to calculate EMI', 'GST filing')"
                  className="w-full pl-16 pr-6 py-5 text-lg text-gray-900 border-2 border-white/30 rounded-2xl focus:border-white focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
              </div>
            </div>
          </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-xl`
                    : 'bg-white text-gray-700 hover:shadow-lg'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.name}
              </motion.button>
                    ))}
                  </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700">
              Showing <strong className="text-blue-600 text-2xl">{filteredFAQs.length}</strong> helpful article{filteredFAQs.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
                  {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-blue-200 transition-all"
              >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start flex-1 pr-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold w-10 h-10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl leading-tight">{faq.question}</h3>
                  </div>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-7 h-7 text-gray-400 flex-shrink-0 mt-1" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 py-6 bg-gray-50 border-t-2 border-gray-100"
                  >
                    <div 
                      className="prose max-w-none text-gray-700 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-10 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-8 text-white/90">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
              >
                Contact Support
              </motion.a>
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all"
              >
                Read Blog
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
