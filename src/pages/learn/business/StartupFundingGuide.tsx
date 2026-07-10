import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Award, AlertTriangle,
  Calculator, Target, HelpCircle, Zap, Rocket, Users, DollarSign, PieChart, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const StartupFundingGuide: React.FC = () => {
  const [fundingStage, setFundingStage] = useState('seed');
  const [equityOffered, setEquityOffered] = useState(15);
  const [valuation, setValuation] = useState(5000000);

  const fundingAmount = (valuation * equityOffered) / 100;
  const remainingEquity = 100 - equityOffered;

  const faqData = [
    {
      question: "What is bootstrapping and should I bootstrap my startup?",
      answer: "Bootstrapping = Self-funding using savings/revenue. No external investors. Pros: 100% ownership, full control, no investor pressure. Cons: Slow growth, limited capital, personal financial risk. Bootstrap if: (1) Can start with under ₹10L, (2) Revenue-generating from day 1, (3) Want full control. Raise funding if: Need fast growth, big market opportunity, can't self-fund."
    },
    {
      question: "How much equity should I give to angel investors?",
      answer: "Seed stage: 10-20% for ₹25L-₹1Cr. Series A: 20-30% for ₹3-10Cr. Rule: Don't dilute more than 30% in early rounds (you need majority control!). Example: Give 15% at ₹3 Cr valuation (raise ₹45L). You retain 85%. Future rounds: Give 20% more (total 35% diluted). Founders: Aim to keep 50%+ till Series B."
    },
    {
      question: "What is startup valuation and how is it calculated?",
      answer: "Valuation = What your startup is worth. Pre-money valuation: Before investment. Post-money: After investment. Calculation methods: (1) Revenue multiple (SaaS = 5-10x ARR), (2) Comparable companies, (3) Negotiation! Example: ₹1Cr revenue, 5x multiple = ₹5Cr valuation. Angel invests ₹50L for 10% = ₹5Cr pre-money valuation confirmed!"
    },
    {
      question: "What is a term sheet in startup funding?",
      answer: "Term sheet = Document outlining investment terms (not legally binding but moral commitment). Contains: (1) Valuation (pre/post money), (2) Investment amount, (3) Equity %, (4) Board seats, (5) Liquidation preference, (6) Anti-dilution clauses, (7) Vesting schedule. Review with lawyer before signing! Negotiate: Valuation, board control, liquidation preference."
    },
    {
      question: "Difference between angel investors and venture capitalists?",
      answer: "Angel: Individual investors, invest own money, ₹25L-₹2Cr, hands-on mentoring, early stage (idea/prototype). VC: Investment firms, invest fund money (LPs), ₹5Cr-₹100Cr+, structured process, growth stage (product-market fit proven). Angel = personal, flexible. VC = professional, board control, exit pressure."
    },
    {
      question: "How to find angel investors in India?",
      answer: "6 ways: (1) Angel networks: Indian Angel Network, Mumbai Angels, LetsVenture, (2) Startup events: TiECON, Nasscom events, (3) LinkedIn: Connect with angels, (4) Warm intro: Via mentors/advisors, (5) Incubators: T-Hub, NASSCOM 10K, (6) Online platforms: AngelList India. Pitch: 1-pager + 10-slide deck. Response rate: 1-2% (pitch 100, get 1-2 meetings!)."
    },
    {
      question: "What do VCs look for in startups?",
      answer: "5 criteria: (1) Large market (TAM above ₹1,000 Cr), (2) Strong team (technical + business skills), (3) Traction (users growing 20%+ MoM), (4) Unique solution (not 15th food delivery app!), (5) Scalable model (can 10x with funding). VCs invest in apenas 1-2% of startups they evaluate. Be exceptional!"
    },
    {
      question: "Can I raise funding without a working product?",
      answer: "Hard but possible! Need: (1) Exceptional team (IIT/IIM + past startup experience), (2) Huge market opportunity, (3) Clear MVP plan, (4) Some customer validation (letters of intent). Better: Build MVP first (takes ₹2-5L, 3-6 months). Investors 10x more likely to fund with working product + early users!"
    },
    {
      question: "What is equity dilution and how to minimize it?",
      answer: "Equity dilution = Your ownership % decreases with each funding round. Example: You start with 100%. Seed: Give 15% → You have 85%. Series A: Give 25% of remaining → You have 63.75%. Minimize by: (1) Bootstrap as long as possible, (2) Raise at higher valuations (grow first, raise later), (3) Don't raise too much too early, (4) Revenue-based financing (no equity dilution!)."
    },
    {
      question: "What is liquidation preference in term sheet?",
      answer: "Liquidation preference = Investors get paid first if company sold/shuts. 1x preference: Investor gets investment back, then remaining split. 2x: Gets 2x investment back! Example: VC invests ₹10Cr for 20%. Company sold for ₹30Cr. 1x preference: VC gets ₹10Cr first, remaining ₹20Cr split 20-80. 2x: VC gets ₹20Cr, you get ₹10Cr (bad deal!). Negotiate for 1x max!"
    },
    {
      question: "Should I accept first funding offer?",
      answer: "NO! Talk to 10-20 investors minimum. Compare: (1) Valuation (higher better), (2) Equity % (lower better), (3) Terms (simple better than complex), (4) Investor value-add (connections, mentoring). Don't rush! Bad terms = regret for 10 years. Take 3-6 months to find right investor. Quality matters more than speed!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Startup Funding Guide 2025: Seed, Angel, VC, Bootstrapping India | Equity Dilution, Valuation, Term Sheet | MoneyCal"
        description="Complete startup funding guide for India: Bootstrapping vs external funding, seed funding (₹25L-₹1Cr), angel investors, venture capital (VC), equity dilution explained, startup valuation methods, term sheets, liquidation preference. How to find angels/VCs, pitch deck, funding stages. Hindi + English"
        keywords="startup funding India 2025, seed funding, angel investors, venture capital VC, bootstrapping, equity dilution, startup valuation, term sheet, liquidation preference, स्टार्टअप फंडिंग गाइड"
        url="/learn/business-finance-entrepreneurship/startup-funding-india-seed-angel-vc-bootstrapping-complete-guide-2025"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Business Finance</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 8</span>
                <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Lesson 1 • 60 Minutes • Advanced</div>
                <h1 className="text-4xl font-bold text-gray-900">Startup Funding Guide 2025</h1>
                <p className="text-xl text-gray-600 mt-1">Seed, Angel, VC, Bootstrapping - From Idea to Unicorn</p>
              </div>
            </div>
          </motion.div>

          {/* Equity Dilution Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 Equity Dilution Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Funding Stage</label>
                  <select value={fundingStage} onChange={(e) => setFundingStage(e.target.value)} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg">
                    <option value="seed">Seed Funding</option>
                    <option value="series-a">Series A</option>
                    <option value="series-b">Series B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Equity Offering (%)</label>
                  <input type="number" value={equityOffered} onChange={(e) => setEquityOffered(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Pre-Money Valuation (₹)</label>
                  <input type="number" value={valuation} onChange={(e) => setValuation(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Funding Amount</div>
                  <div className="text-3xl font-bold">₹{(fundingAmount / 10000000).toFixed(2)}Cr</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Your Equity After</div>
                  <div className="text-3xl font-bold">{remainingEquity}%</div>
                </div>

                <div className="bg-green-500 rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Post-Money Valuation</div>
                  <div className="text-2xl font-bold">₹{((valuation + fundingAmount) / 10000000).toFixed(2)}Cr</div>
                </div>
              </div>
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
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Bootstrap first:</strong> Prove concept before raising. VCs want traction!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Seed stage:</strong> ₹25L-₹1Cr for 10-20% equity. Build MVP + early users</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Don't over-dilute:</strong> Keep 50%+ equity till Series B (maintain control!)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Investor value-add:</strong> Choose investors for connections, not just money</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Lesson Complete */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">🎉 Lesson Complete!</h3>
            <Link to="/learn/business-finance-entrepreneurship/business-loans-india-mudra-msme-working-capital-term-loan-guide-2025" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next: Business Loans
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartupFundingGuide;
