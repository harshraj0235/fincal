import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, Calculator, Target, HelpCircle, BarChart3, Star,
  DollarSign, Users, Zap, Activity, PieChart, LineChart
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const ValueVsGrowth: React.FC = () => {
  const [investmentStyle, setInvestmentStyle] = useState<'value' | 'growth'>('value');

  const faqData = [
    {
      question: "What is value investing in simple terms?",
      answer: "Buying good companies at cheap prices (below intrinsic value). Example: ITC stock trading at PE 20 vs industry PE 30 = Undervalued = Value opportunity. Warren Buffett's strategy!"
    },
    {
      question: "What is growth investing?",
      answer: "Buying fast-growing companies even at high valuations. Example: Asian Paints PE 80 (expensive) but growing 15%/year = Growth stock. Willing to pay premium for growth!"
    },
    {
      question: "How to identify value stocks in India?",
      answer: "Look for: (1) Low PE ratio (<15), (2) Low PB ratio (<3), (3) High dividend yield (>3%), (4) Stable business, (5) Temporary bad news (opportunity!). Examples: ITC, Tata Motors, PSU banks."
    },
    {
      question: "How to identify growth stocks?",
      answer: "Look for: (1) High revenue growth (>15%/year), (2) Increasing profit margins, (3) Strong moat (competitive advantage), (4) Large TAM (market opportunity). Examples: Asian Paints, HDFC Bank, Titan."
    },
    {
      question: "Which strategy gives higher returns - value or growth?",
      answer: "Historically: Value and Growth give similar returns (12-15%) over 20+ years. Value: More volatile but occasional 2-3x returns. Growth: Steady compounding. Best: Mix both 50-50!"
    },
    {
      question: "Can beginners do value investing?",
      answer: "Difficult! Requires: (1) Reading balance sheets, (2) Understanding business models, (3) Patience for 3-5 years. For beginners: Start with index funds or growth-oriented mutual funds instead."
    },
    {
      question: "Warren Buffett principles - applicable to India?",
      answer: "Yes! (1) Buy businesses you understand, (2) Look for moats (competitive advantages), (3) Buy when others are fearful, (4) Hold forever. Works in India too! Examples: Buffett would love Asian Paints, HDFC Bank."
    },
    {
      question: "Value traps - what are they?",
      answer: "Stocks that look cheap but stay cheap forever! Example: Yes Bank looked cheap at PE 5 in 2018, but fell 90% (poor management). Avoid: High debt, declining industry, poor management."
    },
    {
      question: "Growth at any price - is it dangerous?",
      answer: "YES! Paying PE 100 for growth stock = Huge risk. Example: Many startups (Paytm, Zomato) fell 50-70% after IPO despite growth. Rule: Never pay >40-50 PE even for best growth stock!"
    },
    {
      question: "Best mutual funds for value investing in India?",
      answer: "Value-oriented funds: (1) Quantum Long-Term Equity (pure value), (2) PPFAS Flexi-cap (value bias), (3) Mirae Asset Value Fund. Track 5-year returns before investing!"
    },
    {
      question: "Best mutual funds for growth investing?",
      answer: "Growth-oriented: (1) Parag Parikh Flexi-cap, (2) Axis Bluechip, (3) Mirae Asset Large Cap, (4) SBI Focused Equity. Look for funds with 15%+ 10-year returns."
    },
    {
      question: "Should I change from value to growth based on market cycle?",
      answer: "Advanced strategy! Bull market: Growth outperforms. Bear market: Value outperforms. But timing is hard! For most: Stick to 50% value + 50% growth mix always."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Value vs Growth Investing 2025: Warren Buffett Strategy for India | MoneyCal"
        description="Complete value vs growth investing guide for India. Warren Buffett principles, PE PB ratio analysis, value stocks (ITC, Tata Motors), growth stocks (Asian Paints, HDFC Bank), when to use each strategy, value traps to avoid, best value & growth mutual funds India."
        keywords="value investing India, growth investing, Warren Buffett strategy, PE ratio analysis, value stocks India, growth stocks, value vs growth mutual funds, वैल्यू निवेश, stock valuation"
        url="/learn/investing-wealth/value-vs-growth-investing-warren-buffett-strategy-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 8 of 11</span>
                <Link 
                  to="/learn/investing-wealth/nism-certifications-investment-advisor-mf-distributor-india"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">Lesson 8 • 50 Minutes • Advanced</div>
                <h1 className="text-4xl font-bold text-gray-900">Value vs Growth Investing</h1>
                <p className="text-xl text-gray-600 mt-1">Warren Buffett Strategy for India - वैल्यू बनाम ग्रोथ निवेश</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-green-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Value investing: Buy cheap (low PE/PB), sell when fairly valued - Buffett's way!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Growth investing: Pay premium for fast-growing companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Indian value stocks: ITC, Tata Motors, PSU banks (examples with PE ratio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Growth stocks: Asian Paints, HDFC Bank, Titan (why they command premium)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Value vs Growth Comparison */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">⚖️ Value vs Growth - Complete Comparison</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="p-4 font-bold text-gray-900">Parameter</th>
                      <th className="p-4 font-bold text-blue-900">Value Investing</th>
                      <th className="p-4 font-bold text-green-900">Growth Investing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Philosophy</td>
                      <td className="p-4">Buy cheap, sell fair value</td>
                      <td className="p-4">Buy growth, hold long-term</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">PE Ratio</td>
                      <td className="p-4 text-blue-600 font-bold">Low (5-15)</td>
                      <td className="p-4 text-green-600 font-bold">High (30-80)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Dividend Yield</td>
                      <td className="p-4">High (3-5%)</td>
                      <td className="p-4">Low (0-1%)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Growth Rate</td>
                      <td className="p-4">Slow (5-10%/year)</td>
                      <td className="p-4">Fast (15-25%/year)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Risk</td>
                      <td className="p-4">Value trap risk (stays cheap)</td>
                      <td className="p-4">Overvaluation risk (bubble burst)</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Time Horizon</td>
                      <td className="p-4">3-5 years (wait for revaluation)</td>
                      <td className="p-4">5-10+ years (compounding)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Indian Examples</td>
                      <td className="p-4">ITC, Tata Motors, PSU banks</td>
                      <td className="p-4">Asian Paints, HDFC Bank, Titan</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Best For</td>
                      <td className="p-4">Patient investors, contrarians</td>
                      <td className="p-4">Long-term compounders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* Buffett Principles */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">🎓 Warren Buffett's Principles for India</h2>

              <div className="space-y-4">
                {[
                  {
                    principle: 'Buy businesses you understand',
                    india: 'HDFC Bank, Asian Paints (simple business) ✅ vs Complex tech startups ❌'
                  },
                  {
                    principle: 'Look for economic moats',
                    india: 'Asian Paints (brand), ITC (distribution), Nestle (taste moat)'
                  },
                  {
                    principle: 'Buy when others are fearful',
                    india: 'COVID crash March 2020 - Nifty fell to 7,500 (buying opportunity!)'
                  },
                  {
                    principle: 'Hold forever (if business is good)',
                    india: 'HDFC Bank held since 1995 = 1000x returns!'
                  },
                  {
                    principle: 'Focus on intrinsic value, not price',
                    india: 'Calculate fair value using PE, DCF. Buy when market price <intrinsic value'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <span className="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{idx + 1}</span>
                    <div>
                      <p className="font-bold mb-1">{item.principle}</p>
                      <p className="text-sm opacity-90">{item.india}</p>
                    </div>
                  </div>
                ))}
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
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Value:</strong> Buy cheap (PE <15), patient 3-5 years. Indian examples: ITC, Tata Motors.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Growth:</strong> Pay premium for 15%+ growth. Examples: Asian Paints, HDFC Bank, Titan.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Best strategy:</strong> Mix both 50-50. Value for safety, Growth for compounding!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Buffett for India:</strong> Buy great businesses at fair prices. Hold forever!</p>
                </div>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: NISM Certifications (Become Investment Advisor)</h3>
            <p className="mb-6 text-indigo-100">Learn how to get NISM Series V-A, X-A certifications. Start career as mutual fund distributor or investment advisor!</p>
            <Link to="/learn/investing-wealth/nism-certifications-investment-advisor-mf-distributor-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: NISM Certifications
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValueVsGrowth;
