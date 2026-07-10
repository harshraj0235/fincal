import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Award, CheckCircle, Shield, Zap,
  AlertTriangle, Calculator, Target, HelpCircle, DollarSign,
  TrendingDown, Building, Home, HeartHandshake, FileText, BookOpen, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

// Long-tail keywords for SEO: tax planning strategies India 2025, minimize tax liability legally, save 1 lakh tax per year, salary restructuring HRA LTA, 80C 80D optimization
const LONG_FORM_CONTENT = (
  <article className="prose prose-lg max-w-none">
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">कर योजना रणनीतियां: कानूनी रूप से टैक्स कम करें (Tax Planning Strategies: Minimize Tax Liability Legally India 2025)</h2>
      <p className="text-gray-700 mb-4">
        Tax planning strategies India 2025 में आप कानूनी तरीकों से साल में ₹1 लाख से ज्यादा टैक्स बचा सकते हैं। कर योजना (tax planning) और कर चोरी (tax evasion) में फर्क समझना जरूरी है। Tax planning पूरी तरह वैध है – Income Tax Act में दी गई कटौतियों और छूटों का उपयोग करके आप अपनी कर देयता (tax liability) कम कर सकते हैं। इस गाइड में हम salary restructuring, Section 80C optimization, NPS 80CCD(1B), health insurance 80D, home loan interest 24(b), HRA exemption, और दान 80G जैसे सभी हथियारों को समझेंगे।
      </p>
      <p className="text-gray-700 mb-4">
        भारत में FY 2025-26 के लिए नई व्यवस्था default है। लेकिन अगर आप HRA, 80C, 80D, होम लोन इंटरेस्ट जैसी कटौतियां अच्छी मात्रा में लेते हैं तो पुरानी व्यवस्था (old tax regime) आपके लिए बेहतर हो सकती है। पहला कदम: अपनी आय और निवेश के हिसाब से दोनों regime में टैक्स कैलकुलेट करें। MoneyCal Income Tax Calculator से आसानी से compare कर सकते हैं।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Section 80C: ₹1.5 लाख तक कटौती – साल में ₹46,800 तक बचत</h2>
      <p className="text-gray-700 mb-4">
        Section 80C deduction India में सबसे ज्यादा इस्तेमाल होने वाली tax saving deduction है। PPF, ELSS, Employee Provident Fund, जीवन बीमा प्रीमियम, 5 साल Tax Saving FD, NSC, Sukanya Samriddhi, बच्चों की tuition fees, और होम लोन principal repayment – इन सभी में निवेश करके आप प्रति वर्ष ₹1.5 लाख तक की कटौती ले सकते हैं। 30% स्लैब में यह ₹46,800 तक टैक्स बचाता है। Budget 2025 में 80C limit unchanged है – 2014 से ₹1.5 लाख।
      </p>
      <p className="text-gray-700 mb-4">
        ELSS vs PPF comparison: ELSS में 3 साल lock-in, equity exposure, ज्यादा रिटर्न की संभावना। PPF में 15 साल lock-in, सरकारी गारंटी। युवाओं के लिए ELSS ज्यादा बेहतर। Tax saving FD vs ELSS: 5 साल FD सुरक्षित लेकिन कम रिटर्न। ELSS जोखिम के साथ ज्यादा रिटर्न। विस्तृत जानकारी के लिए <Link to="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india" className="text-indigo-600 hover:underline font-medium">Section 80C Complete Guide</Link> पढ़ें।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">NPS 80CCD(1B): अतिरिक्त ₹50,000 कटौती – 80C से अलग</h2>
      <p className="text-gray-700 mb-4">
        National Pension System (NPS) में 80C के अलावा अतिरिक्त ₹50,000 कटौती Section 80CCD(1B) से मिलती है। यह 80C limit से separate है। मतलब 80C में ₹1.5L + NPS में ₹50K = कुल ₹2 लाख तक tax-saving investment। 30% स्लैब में NPS से अतिरिक्त ₹15,500 तक बचत। NPS एक retirement product है – 60 साल पर 60% Lump sum tax-free निकाल सकते हैं। 40% annuity में जाना होगा।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Section 80D Health Insurance: ₹25,000 से ₹1 लाख तक कटौती</h2>
      <p className="text-gray-700 mb-4">
        Section 80D health insurance deduction में self और family के लिए ₹25,000, senior citizen के लिए ₹50,000। Parents के लिए अलग ₹25,000 (अगर senior तो ₹50,000)। Preventive health check-up ₹5,000 इन limits के अंदर आता है। दोनों senior (self + parents) हो तो total ₹1 लाख तक 80D deduction। प्रीमियम non-cash (cheque, online) से pay करना जरूरी।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Loan Interest Section 24(b): ₹2 लाख तक – सिर्फ पुरानी व्यवस्था</h2>
      <p className="text-gray-700 mb-4">
        Self-occupied property के लिए Section 24(b) में home loan interest पर ₹2 लाख तक deduction। नई व्यवस्था में यह नहीं मिलता। Rented/let-out property पर कोई upper limit नहीं। 80C में principal repayment भी आता है (₹1.5L limit के अंदर)। तो होम लोन से दो benefits: 24(b) interest ₹2L + 80C principal। 30% स्लैब में ₹2L interest = ₹62,000 tax saving। विस्तार के लिए <Link to="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india" className="text-indigo-600 hover:underline font-medium">80C Guide</Link> देखें।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">HRA Exemption Calculation: किराये पर रहते हैं तो जरूर लें</h2>
      <p className="text-gray-700 mb-4">
        House Rent Allowance (HRA) exemption Section 10(13A) के तहत मिलता है। Exempt amount = सबसे कम of: (1) Actual HRA received, (2) Rent paid minus 10% of salary, (3) 50% of salary (metro) या 40% (non-metro)। Metro cities: Mumbai, Delhi, Chennai, Kolkata, Bengaluru, Hyderabad, Pune। उदाहरण: Salary ₹10L, HRA ₹3L, Rent ₹4L, Metro → Exempt = Least of ₹3L, ₹3L (₹4L - ₹1L), ₹5L = ₹3L। रेंट रसीद (rent receipt) रखें। Parents को rent देते हैं तो agreement बनाएं – parents को ITR में income दिखानी होगी।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Salary Structure Tax Optimization: CTC का सही बंटवारा</h2>
      <p className="text-gray-700 mb-4">
        Salary structuring meaning: CTC में ऐसे components जोड़ना जो tax-free या कम tax वाले हों। HRA, LTA (Leave Travel Allowance), food coupons (Section 10(5)), medical reimbursement (limited), बोनस – सही balance से tax कम होता है। Employer से बात करके HRA बढ़वा सकते हैं अगर आप rent pay करते हैं। LTA बंदूक की तरह use करें – साल में एक बार claim, सबूत रखें।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Old vs New Tax Regime: कौन बेहतर? FY 2025-26</h2>
      <p className="text-gray-700 mb-4">
        नई व्यवस्था में April 2025 से ₹60,000 rebate से ₹12 लाख तक आय tax-free। पुरानी व्यवस्था में 80C, 80D, HRA, 24(b) सब मिलते हैं। अगर आपकी कटौतियां कम हैं (simple salary, कम निवेश) तो नई व्यवस्था बेहतर। ज्यादा deductions वालों के लिए पुरानी। Income Tax Calculator से दोनों compare करें। एक बार नई में चले गए तो पुरानी में वापस नहीं जा सकते (कुछ शर्तों के साथ)।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">ITR Filing, TDS, Capital Gains – संबंधित टॉपिक</h2>
      <p className="text-gray-700 mb-4">
        Tax planning के साथ ITR filing समय पर करें। AY 2025-26 deadline 15 September 2025। Form 16, Form 26AS verify करें। TDS excess काटा हो तो ITR में refund claim। Capital gains (LTCG, STCG) – equity पर ₹1.25L exemption, 12.5% LTCG। Property sale पर 54EC bonds में निवेश करके exemption। Advance tax ₹10,000 से अधिक liability पर mandatory – 15 June, 15 Sept, 15 Dec, 15 March।
      </p>
      <p className="text-gray-700 mb-4">
        सभी tax topics एक जगह: <Link to="/tax-simplifier" className="text-indigo-600 hover:underline font-medium">Tax Simplifier</Link> पर 60+ articles, 36+ tools, 7 learn lessons। Income Tax Basics, 80C, ITR Filing, TDS, Capital Gains, Advance Tax – सब covered।
      </p>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">सारांश: साल में ₹1 लाख+ टैक्स बचाने का Checklist</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
        <li>80C में पूरे ₹1.5L का उपयोग (PPF, ELSS, Insurance, FD)</li>
        <li>NPS में अतिरिक्त ₹50K (80CCD 1B)</li>
        <li>80D health insurance ₹25K-₹1L</li>
        <li>Home loan 24(b) ₹2L interest (पुरानी व्यवस्था)</li>
        <li>HRA exemption अगर rent pay करते हैं</li>
        <li>80G दान – पंजीकृत संस्थाओं को</li>
        <li>Regime compare करें – पुरानी vs नई</li>
        <li>अप्रैल में प्लान करें, मार्च में नहीं</li>
      </ul>
    </section>
  </article>
);

const TaxPlanningStrategies: React.FC = () => {
  const [salary, setSalary] = useState(1200000);
  
  // Calculate tax savings
  const section80C = 150000 * 0.31; // ₹46,500
  const nps80CCD = 50000 * 0.31; // ₹15,500
  const healthInsurance = 25000 * 0.31; // ₹7,750
  const homeLoan = 200000 * 0.31; // ₹62,000
  const totalSavings = section80C + nps80CCD + healthInsurance + homeLoan;

  const faqData = [
    {
      question: "How can I save ₹1 lakh tax legally?",
      answer: "Combine multiple deductions: (1) 80C: ₹1.5L = Save ₹46,500, (2) NPS 80CCD(1B): ₹50K = Save ₹15,500, (3) Health insurance 80D: ₹25K = Save ₹7,750, (4) Home loan 24(b): ₹2L = Save ₹62,000, (5) HRA exemption: ₹2L = Save ₹62,000. Total savings: ₹1.94 Lakh in 31% bracket!"
    },
    {
      question: "What is salary structuring and how does it save tax?",
      answer: "Salary structuring: Arranging salary components to maximize tax-free allowances. Example: ₹15L CTC = ₹10L basic + ₹2L HRA (partly exempt) + ₹50K LTA (exempt) + ₹50K food coupons (exempt) + ₹2.5L special allowance. Can save ₹30K-50K annually with smart structuring!"
    },
    {
      question: "How to claim maximum HRA exemption?",
      answer: "HRA exempt = Least of: (1) Actual HRA received, (2) Rent paid - 10% of salary, (3) 50% of salary (metro) or 40% (non-metro). Example: Salary ₹10L, HRA ₹3L, Rent ₹4L, Metro → Exempt = Least of ₹3L, ₹3L (₹4L - 10% of ₹10L), ₹5L = ₹3L exempt!"
    },
    {
      question: "Can I claim both 80C and NPS 80CCD(1B)?",
      answer: "YES! They're separate. 80C: ₹1.5L (PPF, ELSS, insurance, etc). 80CCD(1B): EXTRA ₹50K only for NPS. Total tax-saving investment = ₹2L! In 30% bracket: Save ₹46,500 (80C) + ₹15,600 (NPS) = ₹62,100 tax savings!"
    },
    {
      question: "What are all Section 80 deductions available?",
      answer: "Major ones: 80C (₹1.5L), 80CCD(1B) NPS (₹50K), 80D health insurance (₹25K + ₹50K parents), 80DD disability (₹75K-1.25L), 80DDB medical (₹40K-1L), 80E education loan interest (full), 80G donations (50-100%), 80GG rent if no HRA, 80TTA savings interest (₹10K), 80TTB seniors interest (₹50K)."
    },
    {
      question: "How much can I save on home loan?",
      answer: "Two benefits: (1) Section 24(b): Home loan interest up to ₹2L (self-occupied). Save ₹62,400 in 30% bracket. (2) Section 80C: Principal repayment up to ₹1.5L (within 80C limit). Together: ₹3.5L deduction = Save ₹1.09L tax! Plus: Section 80EE (₹50K extra for first-time buyers)."
    },
    {
      question: "Should I opt for old tax regime or new tax regime?",
      answer: "Depends! Old regime: Lower rates BUT can claim all deductions (80C, HRA, home loan). New regime: Higher rates BUT no deductions (except NPS, employer contribution). Old is better if: (1) Have 80C investments, (2) Paying home loan, (3) Claiming HRA. New is better if: No deductions + want simpler ITR."
    },
    {
      question: "How to plan tax for next financial year (April onwards)?",
      answer: "Start now! (1) Estimate income for FY 2025-26, (2) Max out 80C: ₹1.5L (PPF/ELSS/insurance by March), (3) Start NPS: ₹50K (80CCD 1B), (4) Buy health insurance: ₹25K (80D), (5) Plan home loan prepayment (80C + 24b), (6) Calculate advance tax if needed. Plan in April, not March!"
    },
    {
      question: "Can I claim tax benefit on rent paid to parents?",
      answer: "YES! Pay rent to parents (make agreement), claim HRA exemption. Parents must show rental income in their ITR (tax-free if under ₹2.5L). Example: Pay ₹20K/month to parents → HRA exemption ₹2.4L/year = Save ₹74,880 in 31% bracket. Parents' income ₹2.4L (below ₹2.5L) = zero tax. Win-win!"
    },
    {
      question: "How much tax can senior citizens (60+) save?",
      answer: "Extra benefits: (1) Higher basic exemption: ₹3L (vs ₹2.5L), (2) 80D health insurance: ₹50K (vs ₹25K for others), (3) 80TTB bank interest: ₹50K (vs ₹10K), (4) No advance tax on non-business income. Total extra benefit: ₹30K-50K tax savings!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Tax Planning Strategies India 2025: Minimize Tax Liability Legally, Save ₹1 Lakh/Year | MoneyCal"
        description="Tax planning strategies India 2025: Minimize tax liability legally. Salary restructuring HRA LTA, Section 80C ₹1.5L, NPS 80CCD(1B) ₹50K, 80D health insurance, home loan 24(b) ₹2L, HRA exemption. Old vs new tax regime. Save ₹1-2 lakh tax per year. Hindi + English. SEO friendly."
        keywords="tax planning strategies India 2025, minimize tax liability legally, save 1 lakh tax per year, salary restructuring HRA LTA, Section 80C optimization, 80D health insurance deduction, home loan interest 24b tax benefit, NPS 80CCD 1B, old vs new tax regime which better, HRA exemption calculation, कर योजना रणनीतियां 1 लाख बचाएं, tax saving strategies salaried employees India"
        url="/learn/taxation-compliance/tax-planning-strategies-minimize-tax-liability-legally-india"
        faqData={faqData}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Tax Planning Strategies India 2025: Minimize Tax Liability Legally',
          description: 'Advanced tax planning guide to save ₹1 lakh+ per year. 80C, 80D, NPS, HRA, home loan 24(b).',
          author: { '@type': 'Organization', name: 'MoneyCal India' },
          datePublished: '2025-02-11',
          dateModified: '2025-02-11'
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Taxation</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-indigo-600 font-semibold">Lesson 7 of 7 - FINAL!</span>
                <Link to="/learn/taxation-compliance" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <span className="hidden sm:inline">Back to Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Lesson 7 • 50 Minutes • Advanced • FINAL</div>
                <h1 className="text-4xl font-bold text-gray-900">Tax Planning Strategies 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Save ₹1 Lakh+ Legally Every Year</p>
              </div>
            </div>
          </motion.div>

          {/* 2000+ words article content - SEO, paragraphs, Google bot friendly */}
          <section className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            {LONG_FORM_CONTENT}
          </section>

          {/* Tax Savings Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                💰 Total Tax Savings Calculator
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Your Annual Salary (₹)</label>
                <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { name: '80C (PPF, ELSS, Insurance)', amount: '₹1.5L', savings: section80C },
                  { name: 'NPS 80CCD(1B)', amount: '₹50K', savings: nps80CCD },
                  { name: 'Health Insurance 80D', amount: '₹25K', savings: healthInsurance },
                  { name: 'Home Loan Interest 24(b)', amount: '₹2L', savings: homeLoan }
                ].map((item, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm opacity-90">{item.name}</div>
                    <div className="text-xl font-bold">{item.amount}</div>
                    <div className="text-green-300 font-bold">Save: ₹{item.savings.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              <div className="bg-green-500 rounded-xl p-6 text-center">
                <div className="text-sm opacity-90 mb-1">Total Annual Tax Savings</div>
                <div className="text-6xl font-bold mb-2">₹{totalSavings.toLocaleString('en-IN')}</div>
                <p className="text-sm opacity-90">Using all available deductions in 31% tax bracket!</p>
              </div>
            </div>
          </motion.section>

          {/* Related Tax Topics - Internal linking for SEO */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-600" />
                Related Tax Topics – सभी कर विषय
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: 'Income Tax Basics India 2025', titleHi: 'आयकर बेसिक्स', to: '/learn/taxation-compliance/income-tax-basics-india-slabs-old-vs-new-regime-2025' },
                  { title: 'Section 80C Complete Guide', titleHi: 'सेक्शन 80C गाइड', to: '/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india' },
                  { title: 'ITR Filing Step by Step', titleHi: 'ITR फाइलिंग गाइड', to: '/learn/taxation-compliance/itr-filing-complete-guide-online-income-tax-return-india-2025' },
                  { title: 'TDS Kya Hai - Claim Refund', titleHi: 'TDS समझाया', to: '/learn/taxation-compliance/tds-tax-deducted-at-source-certificate-claim-refund-india' },
                  { title: 'Capital Gains Tax LTCG STCG', titleHi: 'पूंजीगत लाभ कर', to: '/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-equity-debt-property-india-2025' },
                  { title: 'Advance Tax Payment Dates', titleHi: 'एडवांस टैक्स तिथियां', to: '/learn/taxation-compliance/advance-tax-payment-due-dates-calculation-penalty-india' },
                  { title: 'GST Basics India 2025', titleHi: 'GST बेसिक्स', to: '/blog/gst-basics-india-hindi-2025' },
                  { title: 'ELSS vs PPF Tax Saving', titleHi: 'ELSS vs PPF तुलना', to: '/blog/elss-vs-ppf-tax-saving-comparison' },
                  { title: 'NPS Tax Benefits 80CCD', titleHi: 'NPS टैक्स बेनिफिट्स', to: '/blog/nps-tax-benefits-80ccd-hindi' },
                  { title: 'HRA Exemption Calculation', titleHi: 'HRA छूट गणना', to: '/blog/hra-exemption-calculation-hindi' },
                  { title: 'Form 16 Explained', titleHi: 'Form 16 समझाया', to: '/blog/form-16-explained-hindi' },
                  { title: 'Old vs New Tax Regime', titleHi: 'पुरानी vs नई व्यवस्था', to: '/blog/old-vs-new-tax-regime-which-better' },
                  { title: 'Section 80D Health Insurance', titleHi: '80D स्वास्थ्य बीमा', to: '/blog/section-80d-health-insurance' },
                  { title: 'Home Loan Interest 24(b)', titleHi: 'होम लोन ब्याज टैक्स', to: '/blog/home-loan-interest-tax-benefit-24b' },
                  { title: 'Tax on Crypto Bitcoin India', titleHi: 'क्रिप्टो पर टैक्स', to: '/blog/tax-on-crypto-bitcoin-india' },
                  { title: 'Freelancer Tax Filing India', titleHi: 'फ्रीलांसर टैक्स', to: '/blog/freelancer-tax-filing-india' },
                  { title: 'Senior Citizen Tax Benefits', titleHi: 'सीनियर टैक्स बेनिफिट्स', to: '/blog/senior-citizen-tax-benefits' },
                  { title: 'All 60+ Tax Articles', titleHi: 'सभी Tax Articles', to: '/tax-simplifier' },
                ].map((item, i) => (
                  <Link key={i} to={item.to} className="flex flex-col gap-1 p-3 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition-colors">
                    <span className="font-semibold text-gray-900 text-sm">{item.title}</span>
                    <span className="text-xs text-indigo-600">{item.titleHi}</span>
                  </Link>
                ))}
              </div>
              <Link to="/tax-simplifier" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
                <FileText className="w-5 h-5" /> Tax Simplifier – सभी Resources
              </Link>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Maximize 80C:</strong> ₹1.5L → Save ₹46,500 (PPF, ELSS, insurance)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>NPS bonus:</strong> Extra ₹50K deduction (80CCD 1B) → Save ₹15,600!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Home loan:</strong> ₹2L interest (24b) → Save ₹62,000 annually</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>HRA:</strong> If paying rent, structure salary for HRA exemption (save ₹60K+)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Category Complete */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white shadow-2xl text-center">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4">🎉 Taxation & Compliance Complete!</h3>
            <p className="text-2xl mb-8">You've mastered all 7 tax lessons! Save ₹1L+ every year legally.</p>
            <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Explore More Categories
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxPlanningStrategies;
